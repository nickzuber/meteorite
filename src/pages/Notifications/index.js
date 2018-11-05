import React from 'react';
import { Redirect } from "@reach/router";
import { compose } from 'recompose';
import { withNotificationsProvider } from '../../providers/Notifications';
import { withAuthProvider } from '../../providers/Auth';
import { withCookiesProvider } from '../../providers/Cookies';
import { withStorageProvider } from '../../providers/Storage';
import { OAUTH_TOKEN_COOKIE } from '../../constants/cookies';
import { routes } from '../../constants';
import { Filters } from '../../constants/filters';
import { Status } from '../../constants/status';
import { Reasons, Badges } from '../../constants/reasons';
import Scene from './SceneAlt';

// @TODO Move these functions.

/**
 * Given a notification, give it a score based on its importance.
 *
 * There are some interesting workarounds that go into this algorithm to account
 * for GitHub's broken notifications API -- but we will get to that later. First,
 * let's start off with the basics of scoring.
 *
 * There are a few "reasons" that we can be getting a notification, each having
 * an initial weight of importance:
 *
 *  - MENTION           ->  8
 *  - ASSIGN            ->  14
 *  - REVIEW_REQUESTED  ->  20
 *  - SUBSCRIBED        ->  3
 *  - COMMENT           ->  3
 *  - AUTHOR            ->  6
 *  - OTHER             ->  2
 *
 * There are some rules that go to giving out these scores, primarily being the
 * first time we see one of these unique reasons, we award the notification with
 * the respective score, but a reason that transitions into itself will be awarded
 * a degraded score of min(ceil(n/3), 2). For example:
 *
 *  - null, MENTION, MENTION -> 0, 8, 3
 *  - null, ASSIGN, ASSIGN, REVIEW_REQUESTED, -> 0, 14, 5, 20
 *  - null, SUBSCRIBED, SUBSCRIBED, SUBSCRIBED -> 0, 3, 2, 2
 *
 * @param {Object} notification Some notification to score.
 * @return {number} The score.
 */
function scoreOf (notification) {
  const {reasons} = notification;
  let score = 0;
  let prevReason = null;
  for (let i = 0; i < reasons.length; i++) {
    const reason = reasons[i].reason;
    console.log(reason)
    if (prevReason && reason === prevReason) {
      const degradedScore = Math.ceil(scoreOfReason[reason] / 3);
      score += Math.max(degradedScore, 2);
    } else {
      score += scoreOfReason[reason];
    }
    prevReason = reason;
  }
  return score;
};

// @TODO implement this
function badgesOf (notification) {
  const badges = [];
  if (notification.reasons.length > 7) {
    badges.push(Badges.HOT);
  }
  if (notification.reasons.length > 3) {
    badges.push(Badges.COMMENTS);
  }
  if (notification.reasons.length <= 2) {
    badges.push(Badges.OLD);
  }
  return badges;
};

const scoreOfReason = {
  [Reasons.ASSIGN]: 14,
  [Reasons.AUTHOR]: 6,
  [Reasons.MENTION]: 8,
  [Reasons.OTHER]: 2,
  [Reasons.REVIEW_REQUESTED]: 20,
  [Reasons.SUBSCRIBED]: 3,
  [Reasons.COMMENT]: 3,
};

const decorateWithScore = notification => ({
  ...notification,
  score: scoreOf(notification),
  badges: badgesOf(notification)
});

const PER_PAGE = 10;

class NotificationsPage extends React.Component {
  state = {
    isSearching: false,
    query: null,
    activeFilter: Filters.PARTICIPATING,
    activeStatus: Status.QUEUED,
    currentPage: 1
  }

  componentDidMount () {
    this.syncer = setInterval(() => {
      console.warn('sync');
      this.props.notificationsApi.fetchNotificationsSync();
    }, 15 * 1000);
  }

  componentWillUnmount () {
    clearInterval(this.syncer);
  }

  onChangePage = page => {
    this.setState({ currentPage: page });
  }

  onSetActiveFilter = filter => {
    this.setState({ activeFilter: filter, currentPage: 1 });
  }

  onSetActiveStatus = status => {
    this.setState({ activeStatus: status, currentPage: 1 });
  }

  onClearQuery = () => {
    this.setState({ query: null });
  }

  onLogout = () => {
    // Remove cookie and invalidate token on client.
    this.props.cookiesApi.removeCookie(OAUTH_TOKEN_COOKIE);
    this.props.authApi.invalidateToken();
  }

  onSearch = event => {
    const text = event.target.value;

    // Ignore empty queries.
    if (text.length <= 0) {
      return;
    }

    this.setState({ isSearching: true });
    setTimeout(() => {
      this.setState({
        query: text,
        isSearching: false
       });
    }, 500);
  }

  render () {
    if (!this.props.authApi.token) {
      return <Redirect noThrow to={routes.LOGIN} />
    }

    const {
      fetchNotifications,
      stageThread,
      markAsRead,
      clearCache,
      notifications,
      loading: isFetchingNotifications,
      error: fetchingNotificationsError,
    } = this.props.notificationsApi;

    // @TODO Move all this out of the render method.
    let filterMethod = () => true;
    switch (this.state.activeFilter) {
      case Filters.PARTICIPATING:
        filterMethod = n => (
          n.reasons.some(({ reason }) => (
            reason === 'review_requested' ||
            reason === 'assign' ||
            reason === 'mention' ||
            reason === 'author'
          ))
        );
        break;
      case Filters.COMMENT:
        filterMethod = n => (
          n.reasons.some(({ reason }) => reason === 'comment')
        );
        break;
      default:
        filterMethod = () => true;
    }

    const filteredNotifications = notifications.filter(filterMethod);
    const allNotificationsCount = filteredNotifications.length;

    const notificationsQueued = filteredNotifications.filter(n => n.status === Status.QUEUED);
    const notificationsStaged = filteredNotifications.filter(n => n.status === Status.STAGED);
    const notificationsClosed = filteredNotifications.filter(n => n.status === Status.CLOSED);

    let notificationsToRender = [];
    switch (this.state.activeStatus) {
      case Status.CLOSED:
        notificationsToRender = notificationsClosed;
        break;
      case Status.STAGED:
        notificationsToRender = notificationsStaged;
        break;
      case Status.QUEUED:
      default:
        notificationsToRender = notificationsQueued;
    }

    const scoredAndSortedNotifications = notificationsToRender
      .map(decorateWithScore)
      .sort((a, b) => b.score - a.score);

    let firstIndex = (this.state.currentPage - 1) * PER_PAGE;
    let lastIndex = (this.state.currentPage * PER_PAGE);
    let notificationsOnPage = scoredAndSortedNotifications.slice(firstIndex, lastIndex);
    let lastPage = Math.ceil(scoredAndSortedNotifications.length / PER_PAGE);
    let firstNumbered = firstIndex + 1;
    let lastNumbered = Math.min(lastIndex, scoredAndSortedNotifications.length);

    if (scoredAndSortedNotifications.length === 0) {
      firstIndex = 0;
      lastIndex = 0;
      notificationsOnPage = [];
      lastPage = 1;
      firstNumbered = 0;
      lastNumbered = 0;
    }

    return (
      <Scene
        first={firstNumbered}
        last={lastNumbered}
        lastPage={lastPage}
        allNotificationsCount={allNotificationsCount}
        notifications={notificationsOnPage}
        query={this.state.query}
        page={this.state.currentPage}
        activeStatus={this.state.activeStatus}
        activeFilter={this.state.activeFilter}
        onChangePage={this.onChangePage}
        onLogout={this.onLogout}
        onSetActiveStatus={this.onSetActiveStatus}
        onSearch={this.onSearch}
        onClearQuery={this.onClearQuery}
        onFetchNotifications={fetchNotifications}
        onMarkAsRead={markAsRead}
        onClearCache={clearCache}
        onStageThread={stageThread}
        onRefreshNotifications={this.props.storageApi.refreshNotifications}
        isSearching={this.state.isSearching}
        isFetchingNotifications={isFetchingNotifications}
        fetchingNotificationsError={fetchingNotificationsError}
        onSetActiveFilter={this.onSetActiveFilter}
      />
    );
  }
};

const enhance = compose(
  withStorageProvider,
  withAuthProvider,
  withCookiesProvider,
  withNotificationsProvider
);

export default enhance(NotificationsPage);

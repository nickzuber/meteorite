import React from 'react';
import moment from 'moment';
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
import Scene from './Scene';

const PER_PAGE = 10;

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
 *  - REVIEW_REQUESTED  ->  30
 *  - SUBSCRIBED        ->  3
 *  - COMMENT           ->  3
 *  - AUTHOR            ->  10
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

function badgesOf (notification) {
  const badges = [];
  const len = notification.reasons.length;
  const timeSinceLastUpdate = moment().diff(moment(notification.reasons[len - 1].time), 'minutes');

  // If there are more than 4 reasons, and the last 4 reasons have happened within
  // an hour of each other. The last update should be within the past 30 minutes.
  // The specific time frame and reasons count is subject to change.
  if (len >= 4 && timeSinceLastUpdate < 30) {
    const oldestReference = moment(notification.reasons[len - 4].time);
    const newestReference = moment(notification.reasons[len - 1].time);
    if (newestReference.diff(oldestReference, 'hours') <= 1) {
      badges.push(Badges.HOT);
    }
  }
  // If there's a lot of activity going on within the thread in general.
  // The specific nunmber should be relative to average number of thread lengths.
  // We can track a running statistic as we see notifications update.
  if (len > 6) {
    badges.push(Badges.COMMENTS);
  }
  // If you've been tagged in for review and the most recent update happened over
  // 4 hours ago, that specific time is subject to change.
  if (notification.reasons.some(r => r.reason === Reasons.REVIEW_REQUESTED) &&
      timeSinceLastUpdate > 60 * 4) {
    badges.push(Badges.OLD);
  }
  return badges;
};

const scoreOfReason = {
  [Reasons.ASSIGN]: 21,
  [Reasons.AUTHOR]: 11,
  [Reasons.MENTION]: 17,
  [Reasons.TEAM_MENTION]: 11,
  [Reasons.OTHER]: 4,
  [Reasons.REVIEW_REQUESTED]: 29,
  [Reasons.SUBSCRIBED]: 3,
  [Reasons.COMMENT]: 6,
  [Reasons.STATE_CHANGE]: 5,
};

const decorateWithScore = notification => ({
  ...notification,
  score: scoreOf(notification),
  badges: badgesOf(notification)
});

class NotificationsPage extends React.Component {
  state = {
    currentTime: moment(),
    prevNotifications: [],
    isFirstTimeUser: false,
    isSearching: false,
    query: null,
    activeFilter: Filters.PARTICIPATING,
    activeStatus: Status.QUEUED,
    currentPage: 1
  }

  componentDidMount () {
    const isFirstTimeUser = !this.props.storageApi.getUserItem('hasOnboarded');

    if (isFirstTimeUser) {
      this.setState({isFirstTimeUser: true});
      // this.props.storageApi.setUserItem('hasOnboarded', true);
    }

    this.props.notificationsApi.fetchNotifications();
    this.syncer = setInterval(() => {
      this.props.notificationsApi.fetchNotificationsSync();
      this.setState({currentTime: moment()});
    }, 8 * 1000);
  }

  componentWillUnmount () {
    clearInterval(this.syncer);
  }

  diffForWebNotification (nextProps, nextState) {
    this.sendWebNotification();
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

  enhancedOnStageThread = (thread_id, repository) => {
    this.props.storageApi.incrStat('stagedCount');
    this.props.storageApi.incrStat(repository + '-stagedCount');
    this.props.notificationsApi.stageThread(thread_id);
  }

  restoreThread = thread_id => {
    this.props.notificationsApi.restoreThread(thread_id);
  }

  setNotificationsPermission = (...args) => {
    this.props.notificationsApi.setNotificationsPermission(...args);
  }

  sendWebNotification = () => {
    var img = '../images/icon.png';
    var text = 'HEY! Your task "null" is now overdue.';
    var notification = new Notification('Meteorite', { body: text, icon: img });
  }

  render () {
    if (!this.props.authApi.token) {
      return <Redirect noThrow to={routes.LOGIN} />
    }

    const {
      fetchNotifications,
      markAsRead,
      markAllAsStaged,
      clearCache,
      notificationsPermission,
      notifications,
      loading: isFetchingNotifications,
      error: fetchingNotificationsError,
    } = this.props.notificationsApi;

    // @TODO Move all this out of the render method.
    // nick, do this ^ so you can fire off a web noti when the filtered/final
    // notifications have a diff
    let filterMethod = () => true;
    switch (this.state.activeFilter) {
      case Filters.PARTICIPATING:
        filterMethod = n => (
          n.reasons.some(({ reason }) => (
            reason === Reasons.REVIEW_REQUESTED ||
            reason === Reasons.ASSIGN ||
            reason === Reasons.MENTION ||
            reason === Reasons.AUTHOR
          ))
        );
        break;
      case Filters.ASSIGNED:
        filterMethod = n => (
          n.reasons.some(({ reason }) => reason === Reasons.ASSIGN)
        );
        break;
      case Filters.REVIEW_REQUESTED:
        filterMethod = n => (
          n.reasons.some(({ reason }) => reason === Reasons.REVIEW_REQUESTED)
        );
        break;
      case Filters.COMMENT:
        filterMethod = n => (
          n.reasons.some(({ reason }) => reason === Reasons.COMMENT)
        );
        break;
      default:
        filterMethod = () => true;
    }

    const filteredNotifications = notifications.filter(filterMethod);

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

    let scoredAndSortedNotifications = notificationsToRender
      .map(decorateWithScore)
      .sort((a, b) => b.score - a.score);

    // We gotta make sure to search notifications before we paginate.
    // Otherwise we'd just end up searching on the current page, which is bad.
    if (this.state.query) {
      scoredAndSortedNotifications = scoredAndSortedNotifications.filter(n => (
        n.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1)
      )
    }

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

    const stagedTodayCount = this.props.storageApi.getStat('stagedCount')[0];

    return (
      <Scene
        currentTime={this.state.currentTime}
        isFirstTimeUser={this.state.isFirstTimeUser}
        setNotificationsPermission={this.setNotificationsPermission}
        notificationsPermission={notificationsPermission}
        queuedCount={notificationsQueued.length}
        stagedCount={notificationsStaged.length}
        closedCount={notificationsClosed.length}
        stagedTodayCount={stagedTodayCount || 0}
        first={firstNumbered}
        last={lastNumbered}
        lastPage={lastPage}
        allNotificationsCount={scoredAndSortedNotifications.length}
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
        onMarkAllAsStaged={markAllAsStaged}
        onClearCache={clearCache}
        onStageThread={this.enhancedOnStageThread}
        onRestoreThread={this.restoreThread}
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

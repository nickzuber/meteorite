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
import { getMessageFromReasons } from './redesign/Scene';
import issueIcon from '../../images/issue-bg.png';
import prIcon from '../../images/pr-bg.png';
import tabIcon from '../../images/iconCircle.png';
import tabDotIcon from '../../images/iconCircleDotAlt.png';

export const PER_PAGE = 10;

export const Sort = {
  TYPE: 1,
  TITLE: 0,
  REPOSITORY: 2,
  SCORE: 3,
  DATE: 4
};

export const View = {
  UNREAD: 1,
  READ: 0,
  ARCHIVED: 2
};

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
  constructor (props) {
    super(props);

    this.notificationSent = false;
    this.isUnreadTab = false;
  }

  state = {
    currentTime: moment(),
    error: null,
    notificationSent: false,
    isFirstTimeUser: false,
    isSearching: false,
    query: null,
    activeFilter: Filters.PARTICIPATING,
    activeStatus: View.UNREAD,
    currentPage: 1,
    sort: Sort.SCORE,
    descending: false,
    user: null
  }

  componentDidMount () {
    const isFirstTimeUser = !this.props.storageApi.getUserItem('hasOnboarded');

    if (isFirstTimeUser) {
      this.setState({isFirstTimeUser: true});
      // this.props.storageApi.setUserItem('hasOnboarded', true);
    }

    this.props.notificationsApi.fetchNotifications();
    this.props.notificationsApi.requestUser().then(user => {
      this.setState({user});
    });

    this.tabSyncer = setInterval(() => {
      if (!document.hidden && this.isUnreadTab) {
        this.updateTabIcon(false);
      }
    }, 2000);

    this.syncer = setInterval(() => {
      this.props.notificationsApi.fetchNotificationsSync()
        .then(error => this.setState({error: null}))
        .catch(error => this.setState({error}));
      this.setState({currentTime: moment()});
    }, 8 * 1000);
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.notificationsApi.newChanges !== nextProps.notificationsApi.newChanges) {
      this.notificationSent = false;
    }
    // The idea here is if we've just updated the prevNotifications state, then
    // we don't want to trigger a rerender.
    return nextState.prevNotifications === this.state.prevNotifications;
  }

  componentWillUnmount () {
    clearInterval(this.syncer);
    clearInterval(this.tabSyncer);
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
      this.onClearQuery();
      return;
    }

    this.setState({ isSearching: true });
    setTimeout(() => {
      this.setState({
        query: text,
        isSearching: false
       });
    }, 800);
  }

  enhancedOnStageThread = (thread_id, repository) => {
    this.props.storageApi.incrStat('stagedCount');
    this.props.storageApi.incrStat(repository + '-stagedCount', '__REPO__');
    this.props.notificationsApi.stageThread(thread_id);
  }

  enhancedOnMarkAsRead = (thread_id, repository) => {
    this.props.storageApi.incrStat('stagedCount');
    this.props.storageApi.incrStat(repository + '-stagedCount', '__REPO__');
    this.props.notificationsApi.markAsRead(thread_id);
  }

  restoreThread = thread_id => {
    this.props.notificationsApi.restoreThread(thread_id);
  }

  setNotificationsPermission = (...args) => {
    this.props.notificationsApi.setNotificationsPermission(...args);
  }

  updateTabIcon (hasUnread = true) {
    this.isUnreadTab = hasUnread;
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'shortcut icon';
    link.href = hasUnread ? tabDotIcon : tabIcon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  sendWebNotification = newNotifcations => {
    if (this.notificationSent || newNotifcations.length === 0) {
      return;
    }

    // Only show these notifications and title change if the tab is out of focus.
    if (!document.hidden) {
      return;
    }

    // Set this even if we don't actually send the notification due to permissions.
    this.notificationSent = true;
    this.updateTabIcon();

    // No permission, no notification.
    if (this.props.notificationsApi.notificationsPermission !== 'granted') {
      return;
    }

    const n = newNotifcations[0];
    const reasonByline = getMessageFromReasons(n.reasons, n.type);

    const additionalInfo = newNotifcations.length > 1
      ? ` (+${newNotifcations.length} more)`
      : '';

    const notification = new Notification(n.name + additionalInfo, {
      body: reasonByline,
      icon: n.type === "Issue" ? issueIcon : prIcon,
      badge: n.type === "Issue" ? issueIcon : prIcon,
      requireInteraction: true,
    });

    notification.addEventListener('click', () => {
      this.updateTabIcon(false);
      this.enhancedOnStageThread(n.id, n.repository);
      window.open(n.url);
    })

    // Manually close for legacy browser support.
    setTimeout(notification.close.bind(notification), 10000);
  }

  getFilteredNotifications = () => {
    const {notifications} = this.props.notificationsApi;

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

    let notificationsQueued = filteredNotifications.filter(n => n.status === Status.QUEUED);
    let notificationsStaged = filteredNotifications.filter(n => n.status === Status.STAGED);
    let notificationsClosed = filteredNotifications.filter(n => n.status === Status.CLOSED);

    let notificationsToRender = [];
    switch (this.state.activeStatus) {
      case View.ARCHIVED:
        notificationsToRender = notificationsClosed;
        break;
      case View.READ:
        notificationsToRender = notificationsStaged;
        break;
      case View.UNREAD:
      default:
        notificationsToRender = notificationsQueued;
    }

    let scoredAndSortedNotifications = notificationsToRender
      .map(decorateWithScore);

    if (this.state.sort === Sort.TITLE) {
      if (this.state.descending) {
        scoredAndSortedNotifications.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        scoredAndSortedNotifications.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
    if (this.state.sort === Sort.SCORE) {
      if (this.state.descending) {
        scoredAndSortedNotifications.sort((a, b) => a.score - b.score);
      } else {
        scoredAndSortedNotifications.sort((a, b) => b.score - a.score);
      }
    }
    if (this.state.sort === Sort.REPOSITORY) {
      if (this.state.descending) {
        scoredAndSortedNotifications.sort((a, b) => {
          const diff = a.repository.localeCompare(b.repository);
          return diff === 0
            ? b.score - a.score
            : diff;
        });
      } else {
        scoredAndSortedNotifications.sort((a, b) => {
          const diff = b.repository.localeCompare(a.repository);
          return diff === 0
            ? b.score - a.score
            : diff;
        });
      }
    }
    if (this.state.sort === Sort.TYPE) {
      if (this.state.descending) {
        scoredAndSortedNotifications.sort((a, b) => a.type.localeCompare(b.type));
      } else {
        scoredAndSortedNotifications.sort((a, b) => b.type.localeCompare(a.type));
      }
    }
    if (this.state.sort === Sort.DATE) {
      if (this.state.descending) {
        scoredAndSortedNotifications.sort((a, b) => moment(a.updated_at).diff(b.updated_at));
      } else {
        scoredAndSortedNotifications.sort((a, b) => moment(b.updated_at).diff(a.updated_at));
      }
    }

    // We gotta make sure to search notifications before we paginate.
    // Otherwise we'd just end up searching on the current page, which is bad.
    if (this.state.query) {
      scoredAndSortedNotifications = scoredAndSortedNotifications.filter(n => (
        n.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1)
      );
      notificationsQueued = notificationsQueued.filter(n => (
        n.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1)
      );
      notificationsStaged = notificationsStaged.filter(n => (
        n.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1)
      );
      notificationsClosed = notificationsClosed.filter(n => (
        n.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1)
      );
    }

    if (this.props.notificationsApi.newChanges) {
      const filteredNewChanges = this.props.notificationsApi.newChanges.filter(n => (
        scoredAndSortedNotifications.some(fn => fn.id === n.id)
      ));
      if (filteredNewChanges.length > 0) {
        this.sendWebNotification(filteredNewChanges);
      }
    }

    return {
      notifications: scoredAndSortedNotifications,
      queuedCount: notificationsQueued.length,
      stagedCount: notificationsStaged.length,
      closedCount: notificationsClosed.length,
    };
  }

  render () {
    if (!this.props.authApi.token) {
      return <Redirect noThrow to={routes.LOGIN} />
    }

    const {
      fetchNotifications,
      markAllAsStaged,
      clearCache,
      notificationsPermission,
      loading: isFetchingNotifications,
      error: fetchingNotificationsError,
    } = this.props.notificationsApi;
    const {
      notifications: scoredAndSortedNotifications,
      queuedCount,
      stagedCount,
      closedCount,
    } = this.getFilteredNotifications();

    const [highestScore, lowestScore] = scoredAndSortedNotifications.reduce(([h, l], notification) => {
      h = Math.max(notification.score, h);
      l = Math.min(notification.score, l);
      return [h, l];
    }, [0, Infinity]);

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


    const reposReadCounts = this.props.storageApi.getAllRepoStagedCounts();
    const todayLastWeek = this.state.currentTime.clone().subtract(1, 'week');

    const stagedTodayCount = this.props.storageApi.getStat('stagedCount')[0];
    const stagedTodayLastWeekCount = this.props.storageApi.getStat(
      'stagedCount',
      todayLastWeek,
      todayLastWeek.clone().add(1, 'day')
    )[0];
    const stagedStatistics = this.props.storageApi.getStat(
      'stagedCount',
      this.state.currentTime.clone().startOf('week').subtract(1, 'week'),
      this.state.currentTime.clone().endOf('week')
    );

    return (
      <Scene
        currentTime={this.state.currentTime}
        readStatistics={stagedStatistics}
        isFirstTimeUser={this.state.isFirstTimeUser}
        setNotificationsPermission={this.setNotificationsPermission}
        notificationsPermission={notificationsPermission}
        unreadCount={queuedCount}
        readCount={stagedCount}
        archivedCount={closedCount}
        readTodayCount={parseInt(stagedTodayCount, 10) || 0}
        readTodayLastWeekCount={parseInt(stagedTodayLastWeekCount, 10) || 0}
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
        onMarkAsRead={this.enhancedOnMarkAsRead}
        onMarkAllAsStaged={markAllAsStaged}
        onClearCache={clearCache}
        onStageThread={this.enhancedOnStageThread}
        onRestoreThread={this.restoreThread}
        onRefreshNotifications={this.props.storageApi.refreshNotifications}
        isSearching={this.state.isSearching}
        isFetchingNotifications={isFetchingNotifications}
        fetchingNotificationsError={fetchingNotificationsError || this.state.error}
        onSetActiveFilter={this.onSetActiveFilter}
        highestScore={highestScore}
        lowestScore={lowestScore}
        hasUnread={this.isUnreadTab}
        sort={this.state.sort}
        setSort={sort => this.setState({sort})}
        descending={this.state.descending}
        setDescending={descending => this.setState({descending})}
        view={this.state.activeStatus}
        setView={this.onSetActiveStatus}
        user={this.state.user}
        reposReadCounts={reposReadCounts}
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

import React from 'react';
import moment from 'moment';
import {Status} from '../constants/status';
import {createMockNotifications} from '../utils/mocks';

export const LOCAL_STORAGE_PREFIX = '__meteorite_noti_cache__';
export const LOCAL_STORAGE_USER_PREFIX = '__meteorite_user_cache__';
export const LOCAL_STORAGE_STATISTIC_PREFIX = '__meteorite_statistic_cache__';

// For each state of a notification, the amount of time passed in days before
// we kick it off to the next triaged ranking.
// After `Archived` is deleted from cache.
export const TriageLimit = {
  Unread: 2,
  Read: 14,
  Archived: 14
};

class StorageProvider extends React.Component {
  constructor(props) {
    super(props);

    this.originalTitle = document.title;
    this.shouldUpdateTitle = false;
  }

  state = {
    loading: false,
    error: null,
    notifications: []
  };

  componentWillMount() {
    this.refreshNotifications();
  }

  componentDidMount() {
    window.onfocus = () => this.setTitle(this.originalTitle);
  }

  setTitle = title => {
    if (document.title.indexOf('(1)') === -1 && document.title !== title) {
      document.title = title;
    }
  };

  /**
   * Loads up the notifications state with the cache.
   */
  refreshNotifications = () => {
    const notifications = Object.keys(window.localStorage)
      .reduce((acc, key) => {
        if (key.indexOf(LOCAL_STORAGE_PREFIX) > -1) {
          const cached_n = JSON.parse(window.localStorage.getItem(key));
          acc.push(cached_n);
        }
        return acc;
      }, [])
      .filter(notification => {
        // `status_last_changed` reflects when we last updated the status of
        // a notification, however we should fallback to `updated_at` in case
        // there is a thread that doesn't have this set yet.
        const lastUpdated = moment(
          notification.status_last_changed || notification.updated_at
        );
        const daysOld = moment().diff(lastUpdated, 'days');

        switch (notification.status) {
          case Status.Unread:
            // Mark as unread
            if (daysOld > TriageLimit.Unread) {
              const newValue = {
                ...notification,
                status_last_changed: moment(),
                status: Status.Read
              };
              this.setItem(notification.id, newValue);
            }
            return true;
          case Status.Read:
            // Mark as archived
            if (daysOld > TriageLimit.Read) {
              const newValue = {
                ...notification,
                status_last_changed: moment(),
                status: Status.Archived
              };
              this.setItem(notification.id, newValue);
            }
            return true;
          case Status.Archived:
            // Delete from cache
            if (daysOld > TriageLimit.Archived) {
              this.deleteItem(notification.id);
            }
            return true;
          case Status.Pinned:
          case Status.PinnedRead:
            return true;
        }

        // Fallback, if there's no valid status.
        return false;
      });

    this.setState({notifications});

    // Faux notifications for sample screenshots.
    // const mockNotifications = createMockNotifications(20);
    // this.setState({ notifications: mockNotifications });
  };

  /**
   * Stats are broken up since they are fetched and set often, we want to avoid
   * the JSON parsing overhead.
   *
   * Our statistics are indexed by the date (current unique day) we had recorded it.
   * This _does_ limit us by making this choice - the most granular we can get with
   * statistics is by day. This is an intentional design decision and we could always
   * change it later at some point if we really wanted to.
   *
   * Statistics take the form __DATE-NAME. For example:
   * ```
   *  __meteorite_noti_cache__2018-11-05-robin-extension-staged -> 52
   *  __meteorite_noti_cache__2018-11-06-robin-dashboard-staged -> 4
   * ```
   */
  getStat = (stat, startTime = moment(), endTime = moment().add(1, 'day')) => {
    const currentTime = moment();
    const response = [];

    // Range reflects `[start, end)`
    for (let m = startTime.clone(); m.isBefore(endTime); m.add(1, 'day')) {
      const key = m.format('YYYY-MM-DD');
      const value = window.localStorage.getItem(
        `${LOCAL_STORAGE_STATISTIC_PREFIX}${key}-${stat}`
      );
      if (value) {
        response.push(value);
      } else {
        // If the date is in the past or present, give it a value of 0. Otherwise, null.
        const fauxValue = m
          .clone()
          .startOf('day')
          .isSameOrBefore(currentTime.clone().startOf('day'))
          ? 0
          : null;
        response.push(fauxValue);
      }
    }
    return response;
  };

  /**
   * Since our stats right now are just numbers, we can assume "setting" will always
   * increment. This is a pretty bold assumption that makes things simpler for now,
   * so we're going to go with it for the time being.
   */
  incrStat = (stat, additionalPrefix = moment().format('YYYY-MM-DD')) => {
    const key = additionalPrefix ? `${additionalPrefix}-` : '';
    const oldValue = window.localStorage.getItem(
      `${LOCAL_STORAGE_STATISTIC_PREFIX}${key}${stat}`
    );
    if (oldValue !== null) {
      window.localStorage.setItem(
        `${LOCAL_STORAGE_STATISTIC_PREFIX}${key}${stat}`,
        parseInt(oldValue, 10) + 1
      );
    } else {
      window.localStorage.setItem(
        `${LOCAL_STORAGE_STATISTIC_PREFIX}${key}${stat}`,
        1
      );
    }
  };

  getAllRepoStagedCounts = () => {
    return Object.keys(window.localStorage)
      .filter(key => key.includes('__REPO__'))
      .reduce((repos, key) => {
        const value = JSON.parse(window.localStorage.getItem(key));
        if (!value) {
          return repos;
        }

        // Janky but will work.
        const repo = key
          .split('__REPO__-')
          .pop()
          .split('-stagedCount')[0];

        repos[repo] = value;
        return repos;
      }, {});
  };

  // val value : Object
  setItem = (id, value) => {
    window.localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}${id}`,
      JSON.stringify(value)
    );
  };

  getItem = id => {
    try {
      return JSON.parse(
        window.localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${id}`)
      );
    } catch (e) {
      return window.localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${id}`);
    }
  };

  getUserItem = id => {
    try {
      return JSON.parse(
        window.localStorage.getItem(`${LOCAL_STORAGE_USER_PREFIX}${id}`)
      );
    } catch (e) {
      return window.localStorage.getItem(`${LOCAL_STORAGE_USER_PREFIX}${id}`);
    }
  };

  setUserItem = (id, value) => {
    window.localStorage.setItem(
      `${LOCAL_STORAGE_USER_PREFIX}${id}`,
      JSON.stringify(value)
    );
  };

  // Actually does the work of deleting the item from the cache.
  deleteItem = id => {
    window.localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${id}`);
  };

  removeItem = id => {
    // We never really want to purge anything from the cache if we can help it,
    // since there's always a chance that a read notification can be resurrected.
    // Instead, let's "remove" a thread by closing it.
    //
    // window.localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${id}`);
    const cached_n = this.getItem(id);
    const closed_cached_n = {
      ...cached_n,
      status_last_changed: moment(),
      status: Status.CLOSED
    };
    this.setItem(id, closed_cached_n);
  };

  clearArchivedCache = () => {
    Object.keys(window.localStorage)
      .reduce((acc, key) => {
        if (key.indexOf(LOCAL_STORAGE_PREFIX) > -1) {
          const cached_n = JSON.parse(window.localStorage.getItem(key));
          acc.push(cached_n);
        }
        return acc;
      }, [])
      .filter(notification => notification.status === Status.Archived)
      .forEach(notification => this.deleteItem(notification.id));
  };

  clearCache = () => {
    window.localStorage.clear();
  };

  render() {
    return this.props.children({
      ...this.state,
      setItem: this.setItem,
      getItem: this.getItem,
      getUserItem: this.getUserItem,
      setUserItem: this.setUserItem,
      removeItem: this.removeItem,
      clearCache: this.clearCache,
      clearArchivedCache: this.clearArchivedCache,
      refreshNotifications: this.refreshNotifications,
      getStat: this.getStat,
      getAllRepoStagedCounts: this.getAllRepoStagedCounts,
      incrStat: this.incrStat
    });
  }
}

const withStorageProvider = WrappedComponent => props => (
  <StorageProvider>
    {storageApi => <WrappedComponent {...props} storageApi={storageApi} />}
  </StorageProvider>
);

export {StorageProvider, withStorageProvider};

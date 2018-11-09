import React from 'react';
import moment from 'moment';
import {Status} from '../constants/status';
import {Reasons} from '../constants/reasons';

export const LOCAL_STORAGE_PREFIX = '__meteorite_noti_cache__';
export const LOCAL_STORAGE_STATISTIC_PREFIX = '__meteorite_statistic_cache__';

const getMockReasons = n => {
  const reasons = Object.values(Reasons);
  const len = reasons.length;
  return new Array(n).fill(0).map(_ => ({
    reason: reasons[Math.floor(Math.random() * len)],
    time: moment().format()
  }));
};

const getMockNotification = randomNumber => ({
  id: randomNumber,
  updated_at: moment().format(),
  status: (randomNumber > 0.8 ? Status.STAGED : Status.QUEUED),
  reasons: getMockReasons(Math.ceil(randomNumber * 10)),
  type: ['Issue', 'PullRequest'][Math.floor(randomNumber * 2)],
  name: 'Mock - Fake notification name',
  url: 'https://github.com/test/repo/pull',
  repository: 'test/mock',
  number: Math.ceil(randomNumber * 1000),
  repositoryUrl: 'https://github.com/test/repo',
});

const mockNotifications = new Array(1000);
for (let i = 0; i < mockNotifications.length; i++) {
  mockNotifications[i] = getMockNotification(Math.random());
}

class StorageProvider extends React.Component {
  constructor (props) {
    super(props);

    this.originalTitle = document.title;
    this.shouldUpdateTitle = false;
  }

  state = {
    loading: false,
    error: null,
    notifications: []
  }

  componentWillMount () {
    this.refreshNotifications();
  }

  componentDidMount () {
    window.onfocus = () => this.setTitle(this.originalTitle);
  }

  setTitle = title => {
    if (document.title.indexOf('(1)') === -1 && document.title !== title) {
      document.title = title;
    }
  }

  /**
   * Loads up the notifications state with the cache.
   */
  refreshNotifications = () => {
    const notifications = Object.keys(window.localStorage).reduce((acc, key) => {
      if (key.indexOf(LOCAL_STORAGE_PREFIX) > -1) {
        const cached_n = JSON.parse(window.localStorage.getItem(key));
        acc.push(cached_n);
      }
      return acc;
    }, []);

    // @TODO fix this
    // Document is out of focus, the we had notifications before this update,
    // and there was a change in notifications in the most recent update.
    // if (!document.hasFocus() &&
    //     this.state.notifications.length > 0 &&
    //     notifications.length !== this.state.notifications.length
    // ) {
    //   this.setTitle('(1) ' + this.originalTitle);
    // } else {
    //   this.setTitle(this.originalTitle);
    // }

    this.setState({ notifications });
    // this.setState({ notifications: mockNotifications });
  }

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
    const response = [];

    // Range reflects `[start, end)`
    for (let m = startTime.clone(); m.isBefore(endTime); m.add(1, 'day')) {
      const key = m.format('YYYY-MM-DD');
      const value = window.localStorage.getItem(`${LOCAL_STORAGE_STATISTIC_PREFIX}${key}-${stat}`);
      if (value !== null) {
        response.push(value);
      }
    }
    return response;
  }

  /**
   * Since our stats right now are just numbers, we can assume "setting" will always
   * increment. This is a pretty bold assumption that makes things simpler for now,
   * so we're going to go with it for the time being.
   */
  incrStat = (stat, time = moment()) => {
    const key = time.format('YYYY-MM-DD');
    const oldValue = window.localStorage.getItem(`${LOCAL_STORAGE_STATISTIC_PREFIX}${key}-${stat}`);
    if (oldValue !== null) {
      window.localStorage.setItem(`${LOCAL_STORAGE_STATISTIC_PREFIX}${key}-${stat}`, parseInt(oldValue, 10) + 1);
    } else {
      window.localStorage.setItem(`${LOCAL_STORAGE_STATISTIC_PREFIX}${key}-${stat}`, 1);
    }
  }

  // val value : Object
  setItem = (id, value) => {
    window.localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${id}`, JSON.stringify(value));
  }

  getItem = id => {
    try {
      return JSON.parse(window.localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${id}`));
    } catch (e) {
      return null;
    }
  }

  removeItem = id => {
    // We never really want to purge anything from the cache if we can help it,
    // since there's always a chance that a read notification can be resurrected.
    // Instead, let's "remove" a thread by closing it.
    //
    // window.localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${id}`);
    const cached_n = this.getItem(id);
    const closed_cached_n = {
      ...cached_n,
      status: Status.CLOSED
    };
    this.setItem(id, closed_cached_n);
  }

  clearCache = () => {
    window.localStorage.clear();
  }

  render () {
    return this.props.children({
      ...this.state,
      setItem: this.setItem,
      getItem: this.getItem,
      removeItem: this.removeItem,
      clearCache: this.clearCache,
      refreshNotifications: this.refreshNotifications,
      getStat: this.getStat,
      incrStat: this.incrStat,
    });
  }
}

const withStorageProvider = WrappedComponent => props => (
  <StorageProvider>
    {(storageApi) => (
      <WrappedComponent {...props} storageApi={storageApi} />
    )}
  </StorageProvider>
);

export {
  StorageProvider,
  withStorageProvider
};

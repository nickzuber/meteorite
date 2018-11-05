import React from 'react';
import moment from 'moment';
import {Status} from '../constants/status';
import {Reasons} from '../constants/reasons';

const LOCAL_STORAGE_PREFIX = '__meteorite_noti_cache__';

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
  state = {
    loading: false,
    error: null,
    notifications: []
  }

  componentWillMount () {
    this.refreshNotifications();
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
    this.setState({ notifications });
    // this.setState({ notifications: mockNotifications });
  }

  // val value : Object
  setItem = (id, value) => {
    window.localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${id}`, JSON.stringify(value));
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

  getItem = id => {
    try {
      return JSON.parse(window.localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${id}`));
    } catch (e) {
      return null;
    }
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
      refreshNotifications: this.refreshNotifications
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

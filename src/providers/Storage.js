import React from 'react';
import {Status} from '../constants/status';

const LOCAL_STORAGE_PREFIX = '__meteorite_noti_cache__';

class StorageProvider extends React.Component {
  constructor (props) {
    super(props);
  }

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
    const notifications = Object.keys(window.localStorage).map(key => {
      if (key.indexOf(LOCAL_STORAGE_PREFIX) > -1) {
        return JSON.parse(window.localStorage.getItem(key));
      }
    });
    this.setState({ notifications });
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
    cached_n = {
      ...cached_n,
      status: Status.CLOSED
    };
    this.setItem(id, cached_n);
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

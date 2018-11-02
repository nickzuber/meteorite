import React from 'react';

const LOCAL_STORAGE_PREFIX = '__meteorite_noti_cache__';

class StorageProvider extends React.Component {
  constructor (props) {
    super(props);

    this.last_modified = null;
  }

  state = {
    loading: false,
    error: null,
    notifications: {}
  }

  // @TODO move all this storage stuff to its own provider
  // this guy is concerned about updating the cache and syncing
  // the storage provider will be concerned about providing the notifications.
  componentWillMount () {
    this.refreshNotifications();
  }

  /**
   * Loads up the notifications state with the cache.
   */
  refreshNotifications = () => {
    const notifications = [];
    Object.keys(localStorage).forEach(key => {
      if (key.indexOf(LOCAL_STORAGE_PREFIX) > -1) {
        const n = JSON.parse(localStorage.getItem(key));
        notifications.push(n);
      }
    });
    this.setState({
      notifications
    });
  }

  setItem = (id, value) => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${id}`, JSON.stringify(value));
  }

  removeItem = id => {
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${id}`);
  }

  getItem = id => {
    try {
      return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${id}`));
    } catch (e) {
      return null;
    }
  }

  render () {
    return this.props.children({
      ...this.state,
      setItem: this.setItem,
      getItem: this.getItem,
      removeItem: this.removeItem,
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

import React from 'react';
import {AuthConsumer} from './Auth';
import {StorageProvider, LOCAL_STORAGE_PREFIX} from './Storage';
import {Status} from '../constants/status';

const BASE_GITHUB_API_URL = 'https://api.github.com';

function cleanResponseUrl (url) {
  return url
    .replace('api.github.com', 'github.com')
    .replace('/repos/', '/')
    .replace('/pulls/', '/pull/');
}

function processHeadersAndBodyJson (response) {
  const entries = response.headers.entries();
  const headers = {};
  for (let [name, value] of entries) {
    headers[name] = value;
  }

  const rawLinks = headers['link'];
  const links = {};

  if (rawLinks) {
    rawLinks.split(',').forEach((p) => {
      const section = p.split(';');
      if (section.length !== 2) {
        throw new Error("section could not be split on ';'");
      }
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const page = section[0].match(/page=(\d)/)[1];
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = {url, page};
    })
  }
  // links.next.page
  headers['link'] = links;

  // 304 will usually mean nothing has changed from our last fetch.
  if (response.status === 304) {
    return Promise.resolve({
      headers,
      json: null
    });
  }

  return response.json().then(json => ({
    headers,
    json
  }));
}

class NotificationsProvider extends React.Component {
  constructor (props) {
    super(props);

    this.last_modified = null;
  }

  state = {
    syncing: false,
    loading: false,
    error: null,
    notificationsPermission:
      this.props.getUserItem('notificationsPermission') ||
      'default',
  }

  shouldComponentUpdate (nextProps, nextState) {
    // Update if our state changes.
    if ((this.state.loading !== nextState.loading) ||
        (this.state.error !== nextState.error)) {
      return true;
    }
    // Update if the token changes at all (sign in & sign out).
    if (this.props.token !== nextProps.token) {
      return true;
    }
    // Only update if our notifications prop changes.
    // All other props "changing" should NOT trigger a rerender.
    return this.props.notifications !== nextProps.notifications;
  }

  // The web notificaitons API doesn't let users revoke notifications permission
  // after they already grant it, for a reason I can only assume that was pure evil.
  // So, if a user wants to stop getting notifications we set that in their local
  // storage, leaning towards it being revoked.
  setNotificationsPermission = permission => {
    this.setState({notificationsPermission: permission});
    this.props.setUserItem('notificationsPermission', permission);
    this.forceUpdate();
  }

  requestPage = (page = 1, optimizePolling = true) => {
    const headers = {
      'Authorization': `token ${this.props.token}`,
      'Content-Type': 'application/json',
    };

    if (optimizePolling && this.last_modified) {
      headers['If-Modified-Since'] = this.last_modified;
    }

    return fetch(`${BASE_GITHUB_API_URL}/notifications?page=${page}`, {
      method: 'GET',
      headers: headers
    })
      .then(processHeadersAndBodyJson)
      .then(({headers, json}) => {
        // If there were updates, make sure we get the newest last-modified.
        if (headers['last-modified']) {
          this.last_modified = headers['last-modified'];
        }

        return {
          headers,
          json
        };
      });
  }

  requestFetchNotifications = (page = 1, optimizePolling = true) => {
    if (this.state.syncing) {
      // Don't try to send off another request if we're already trying to get one.
      return Promise.reject();
    }

    this.setState({syncing: true});
    return this.requestPage(page, optimizePolling)
      .then(({headers, json}) => {
        if (json === null) return [];
        let nextPage = null;
        const links = headers['link'];
        if (links && links.next && links.next.page) {
          nextPage = links.next.page;
        }
        return this.processNotificationsChunk(nextPage, json);
      })
      .finally(() => this.setState({syncing: false}));
  }

  fetchNotifications = (page = 1, optimizePolling = true) => {
    if (!this.props.token) {
      console.error('Unauthenitcated, aborting request.');
      return false;
    }

    if (this.state.loading) {
      // Don't try to fetch if we're already fetching
      return Promise.reject();
    }

    this.setState({ loading: true });
    return this.requestFetchNotifications(page, optimizePolling)
      .then(() => this.setState({error: null}))
      .catch(error =>this.setState({error}))
      .finally(() => this.setState({ loading: false }));
  }

  processNotificationsChunk = (nextPage, notificationsChunk) => {
    return new Promise((resolve, reject) => {
      console.log('chunk', notificationsChunk);
      let everythingUpdated = true;

      if (notificationsChunk.length === 0) {
        // Apparently this means that a user has no notifications (makes sense).
        // So I guess we should purge our cache? This brings up the great point
        // of us having stale cache. How can we detect that a notifcation was seen?
      }

      notificationsChunk.forEach(n => {
        const cached_n = this.props.getItemFromStorage(n.id);
        // If we've seen this notification before.
        if (cached_n) {
          // Something's changed, we want to push
          if (cached_n.updated_at !== n.updated_at) {
            this.updateNotification(n, cached_n.reasons);
            return;
          }
          // This means that something didn't update, which means the page we're
          // currently processing has stale data so we don't need to fetch the next page.
          everythingUpdated = false;
        } else {
          // Else, update the cache.
          this.updateNotification(n);
        }
      });

      if (nextPage && everythingUpdated) {
        // Still need to fetch more updates.
        this.fetchNotifications(nextPage, false);
      } else {
        // All done fetching updates, let's trigger a sync.
        this.props.refreshNotifications();
        resolve();
      }
    });
  }

  requestMarkAsRead = thread_id => {
    const headers = {
      'Authorization': `token ${this.props.token}`,
      'Content-Type': 'application/json',
    };

    return fetch(`${BASE_GITHUB_API_URL}/notifications/threads/${thread_id}`, {
      method: 'PATCH',
      headers: headers
    })
      .then(response => {
        return response.status === 205
          ? Promise.resolve()
          : Promise.reject();
      })
      .then(() => {
        this.props.removeItemFromStorage(thread_id);
        this.props.refreshNotifications();
        return Promise.resolve();
      });
  }

  markAsRead = thread_id => {
    if (!this.props.token) {
      console.error('Unauthenitcated, aborting request.')
      return false;
    }

    if (this.state.loading) {
      // Don't try to fetch if we're already fetching
      return Promise.reject();
    }

    this.setState({ loading: true });
    return this.requestMarkAsRead(thread_id)
      .then(() => this.setState({error: null}))
      .catch(error => this.setState({error}))
      .finally(() => this.setState({ loading: false }));
  }

  requestClearCache = () => {
    return new Promise((resolve, reject) => {
      this.props.clearStorageCache();
      this.props.refreshNotifications();
      this.last_modified = null;
      return resolve();
    });
  }

  clearCache = () => {
    this.setState({ loading: true });
    return this.requestClearCache()
      .then(() => this.setState({error: null}))
      .catch(error => this.setState({error}))
      .finally(() => this.setState({ loading: false }));
  }

  requestStageThread = thread_id => {
    return new Promise((resolve, reject) => {
      const cached_n = this.props.getItemFromStorage(thread_id);
      if (cached_n) {
        const newValue = {
          ...cached_n,
          status: Status.STAGED
        };
        this.props.setItemInStorage(thread_id, newValue);
        this.props.refreshNotifications();
        return resolve();
      } else {
        throw new Error(`Attempted to stage thread ${thread_id} that wasn't found in the cache.`);
      }
    });
  }

  requestStageAll = () => {
    return new Promise((resolve, reject) => {
      Object.keys(localStorage).forEach(nKey => {
        // Only update the notification items in the cache.
        // Don't get the statistics or anything else caught in there.
        if (nKey.includes(LOCAL_STORAGE_PREFIX)) {
          let cached_n = null;
          cached_n = JSON.parse(window.localStorage.getItem(nKey));
          const newValue = {
            ...cached_n,
            status: Status.STAGED
          };
          window.localStorage.setItem(nKey, JSON.stringify(newValue));
        }
      });
      this.props.refreshNotifications();
      return resolve();
    });
  }

  requestRestoreThread = thread_id => {
    return new Promise((resolve, reject) => {
      const cached_n = this.props.getItemFromStorage(thread_id);
      if (cached_n) {
        const newValue = {
          ...cached_n,
          status: Status.QUEUED
        };
        this.props.setItemInStorage(thread_id, newValue);
        this.props.refreshNotifications();
        return resolve();
      } else {
        throw new Error(`Attempted to restore thread ${thread_id} that wasn't found in the cache.`);
      }
    });
  }

  markAllAsStaged = () => {
    this.setState({ loading: true });
    return this.requestStageAll()
      .then(() => this.setState({error: null}))
      .catch(error => this.setState({error}))
      .finally(() => this.setState({ loading: false }));
  }

  stageThread = thread_id => {
    this.setState({ loading: true });
    return this.requestStageThread(thread_id)
      .then(() => this.setState({error: null}))
      .catch(error => this.setState({error}))
      .finally(() => this.setState({ loading: false }));
  }

  restoreThread = thread_id => {
    this.setState({ loading: true });
    return this.requestRestoreThread(thread_id)
      .then(() => this.setState({error: null}))
      .catch(error => this.setState({error}))
      .finally(() => this.setState({ loading: false }));
  }

  updateNotification = (n, prevReason = null) => {
    let reasons = [];
    const newReason = {
      reason: n.reason,
      time: n.updated_at
    }

    if (prevReason) {
      reasons = prevReason.concat(newReason);
    } else {
      reasons = [newReason];
    }

    // Notification model
    const value = {
      id: n.id,
      isAuthor: reasons.some(r => r.reason === 'author'),
      updated_at: n.updated_at,
      status: Status.QUEUED,
      reasons: reasons,
      type: n.subject.type,
      name: n.subject.title,
      url: cleanResponseUrl(n.subject.url),
      repository: n.repository.full_name,
      number: n.subject.url.split('/').pop(),
      repositoryUrl: cleanResponseUrl(n.repository.url)
    };
    this.props.setItemInStorage(n.id, value);
  }

  render () {
    return this.props.children({
      ...this.state,
      notifications: this.props.notifications,
      fetchNotifications: this.fetchNotifications,
      fetchNotificationsSync: this.requestFetchNotifications,
      markAsRead: this.markAsRead,
      markAllAsStaged: this.markAllAsStaged,
      clearCache: this.clearCache,
      stageThread: this.stageThread,
      restoreThread: this.restoreThread,
      setNotificationsPermission: this.setNotificationsPermission,
    });
  }
}

const withNotificationsProvider = WrappedComponent => props => (
  <AuthConsumer>
    {({ token }) => (
      <StorageProvider>
        {({
          refreshNotifications,
          notifications,
          getItem,
          setItem,
          getUserItem,
          setUserItem,
          clearCache,
          removeItem
        }) => (
          <NotificationsProvider
            refreshNotifications={refreshNotifications}
            notifications={notifications}
            getItemFromStorage={getItem}
            setItemInStorage={setItem}
            getUserItem={getUserItem}
            setUserItem={setUserItem}
            clearStorageCache={clearCache}
            removeItemFromStorage={removeItem}
            token={token}
          >
            {(notificationsApi) => (
              <WrappedComponent {...props} notificationsApi={notificationsApi} />
            )}
          </NotificationsProvider>
        )}
      </StorageProvider>
    )}
  </AuthConsumer>
);

export {
  NotificationsProvider,
  withNotificationsProvider
};

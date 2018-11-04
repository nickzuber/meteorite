import React from 'react';
import {AuthConsumer} from './Auth';
import {StorageProvider} from './Storage';
import {MockNotifications} from '../utils/mocks';
import {Status} from '../constants/status';

const BASE_GITHUB_API_URL = 'https://api.github.com';

function subjectUrlToIssue (url) {
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
    loading: false,
    error: null
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

  // @TODO remove this mock when ready
  mockRequestPage = page => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({
        headers: {},
        json: MockNotifications
      }), 1000)
    });
  }

  fetchNotifications = (page = 1, optimizePolling = true) => {
    if (!this.props.token) {
      console.error('Unauthenitcated, aborting request.')
      return false;
    }

    this.setState({ loading: true });
    return this.requestPage(page, optimizePolling)
      .then(({headers, json}) => {
        if (json === null) return;
        let nextPage = null;
        const links = headers['link'];
        if (links && links.next && links.next.page) {
          nextPage = links.next.page;
        }
        return this.processNotificationsChunk(nextPage, json);
      })
      .catch(error => console.error(error) || this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  processNotificationsChunk = (nextPage, notificationsChunk) => {
    console.log('chunk', notificationsChunk)
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
    }
  }

  updateNotification = (n, prevReason = null) => {
    let reasons = [];
    const newReason = {
      reason: n.reason,
      time: n.updated_at
    }

    if (prevReason) {
      reasons = prevReason.concat(newReason);
      console.warn('MULTIPLE REASONS', reasons)
    } else {
      reasons = [newReason];
    }

    const value = {
      id: n.id,
      updated_at: n.updated_at,
      status: Status.QUEUED,
      reasons: reasons,
      type: n.subject.type,
      name: n.subject.title,
      url: subjectUrlToIssue(n.subject.url),
      repository: n.repository.name,
    };
    this.props.setItemInStorage(n.id, value);
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
        console.warn('removing', thread_id);
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

    this.setState({ loading: true });
    return this.requestMarkAsRead(thread_id)
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  requestClearCache = () => {
    return new Promise((resolve, reject) => {
      console.warn('clearing cache');
      this.props.clearStorageCache();
      this.props.refreshNotifications();
      this.last_modified = null;
      return resolve();
    });
  }

  clearCache = () => {
    this.setState({ loading: true });
    return this.requestClearCache()
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  requestStageThread = thread_id => {
    return new Promise((resolve, reject) => {
      console.warn('staging thread', thread_id);
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

  stageThread = thread_id => {
    this.setState({ loading: true });
    return this.requestStageThread(thread_id)
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render () {
    return this.props.children({
      ...this.state,
      notifications: this.props.notifications,
      fetchNotifications: this.fetchNotifications,
      markAsRead: this.markAsRead,
      clearCache: this.clearCache,
      stageThread: this.stageThread
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
          clearCache,
          removeItem
        }) => (
          <NotificationsProvider
            refreshNotifications={refreshNotifications}
            notifications={notifications}
            getItemFromStorage={getItem}
            setItemInStorage={setItem}
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

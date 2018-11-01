import React from 'react';
import {AuthConsumer} from './Auth';
import {MockNotifications} from '../utils/mocks';

const BASE_GITHUB_API_URL = 'https://api.github.com';

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

  return [headers, response.json()];
}

class NotificationsProvider extends React.Component {
  constructor (props) {
    super(props);

    this.last_modified = null;
  }

  state = {
    loading: false,
    error: null,
    notifications: MockNotifications
  }

  requestPage = (page = 1) => {
    const headers = {
      'Authorization': `token ${this.props.token}`,
      'Content-Type': 'application/json',
    };

    if (this.last_modified) {
      headers['If-Modified-Since'] = this.last_modified;
    }

    return fetch(`${BASE_GITHUB_API_URL}/notifications?page=${page}`, {
      method: 'GET',
      headers: headers
    })
      .then(processHeadersAndBodyJson)
      .then(([headers, body]) => {
        // If there were updates, make sure we get the newest last-modified.
        if (headers['last-modified']) {
          this.last_modified = headers['last-modified'];
        }

        return body;
      });
  }

  // @TODO remove this mock when ready
  mockRequestPage = page => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(MockNotifications), 1000)
    });
  }

  fetchNotifications = () => {
    if (!this.props.token) {
      console.error('Unauthenitcated, aborting request.')
      return false;
    }

    this.setState({ loading: true });
    return this.mockRequestPage(1)
      .then(notifications => this.processNotificationsChunk(notifications))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  processNotificationsChunk = notificationsChunk => {
    console.warn(notificationsChunk);
    this.setState({
      notifications: notificationsChunk
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
      .then(processHeadersAndBodyJson)
      .then(([headers, body]) => {
        console.warn(body)
        return body;
      });
  }

  markAsRead = thread_id => {
    if (!this.props.token) {
      console.error('Unauthenitcated, aborting request.')
      return false;
    }

    this.setState({ loading: true });
    return this.requestMarkAsRead(thread_id)
      .then(response => console.warn('response', response))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render () {
    return this.props.children({
      ...this.state,
      fetchNotifications: this.fetchNotifications,
      markAsRead: this.markAsRead
    });
  }
}

const withNotificationsProvider = WrappedComponent => props => (
  <AuthConsumer>
    {({ token }) => (
      <NotificationsProvider token={token}>
        {(notificationsApi) => (
          <WrappedComponent {...props} notificationsApi={notificationsApi} />
        )}
      </NotificationsProvider>
    )}
  </AuthConsumer>
);

export {
  NotificationsProvider,
  withNotificationsProvider
};

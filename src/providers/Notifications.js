import React from 'react';
import { AuthConsumer } from './Auth';

const BASE_GITHUB_API_URL = 'https://api.github.com';

class NotificationsProvider extends React.Component {
  state = {
    loading: false,
    error: null
  }

  requestPage = (page = 1) => {
    return fetch(`${BASE_GITHUB_API_URL}/notifications?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `token ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
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

        return response.json();
      });
  }

  getNotifications = () => {
    if (!this.props.token) {
      console.error('Unauthenitcated, aborting request.')
      return false;
    }

    this.setState({ loading: true });
    return this.requestPage(1)
      .then(notifications => this.processNotificationsChunk(notifications))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  processNotificationsChunk = notifications => {
    console.log(notifications);
  }

  render () {
    return this.props.children({
      ...this.state,
      getNotifications: this.getNotifications
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

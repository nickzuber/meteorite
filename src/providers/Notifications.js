import React from 'react';
import { AuthConsumer } from './Auth';

const BASE_GITHUB_API_URL = 'https://api.github.com';

class NotificationsProvider extends React.Component {
  state = {
    loading: false,
    error: null
  }

  getNotifications = () => {
    if (!this.props.token) {
      console.error('unauthenitcated!')
      return false;
    }

    console.warn(this.props.token)

    this.setState({ loading: true });
    fetch(`${BASE_GITHUB_API_URL}/notifications`, {
      method: 'GET',
      headers: {
        'Authorization': `token ${this.props.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        console.warn(data);
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
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

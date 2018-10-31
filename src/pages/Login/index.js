import React from 'react';
import { Redirect } from '@reach/router';
import { compose } from 'recompose';
import { withAuthProvider } from '../../providers/Auth';
import { withNotificationsProvider } from '../../providers/Notifications';
import { withCookiesProvider } from '../../providers/Cookies';
import TokenHandler from './TokenHandler';
import Scene from './Scene';
import { routes } from '../../constants';

class LoginPage extends React.Component {
  state = {
    loading: false,
    error: null
  }

  onSetLoading = loading => {
    this.setState({ loading });
  }

  onSetError = error => {
    this.setState({ error });
  }

  render () {
    if (this.props.authApi.token) {
      return <Redirect noThrow to={routes.NOTIFICATIONS} />
    }

    return (
      <React.Fragment>
        <TokenHandler
          setToken={this.props.authApi.setToken}
          onSetLoading={this.onSetLoading}
          onSetError={this.onSetError}
        />
        <Scene
          loading={this.state.loading}
          error={this.state.error}
          loggedOut={!this.props.authApi.token}
        />
      </React.Fragment>
    );
  }
}

const enhance = compose(
  withAuthProvider,
  withNotificationsProvider,
  withCookiesProvider
);

export default enhance(LoginPage);

import React from 'react';
import {compose} from 'recompose';
import {withAuthProvider} from '../../providers/Auth';
import {withCookiesProvider} from '../../providers/Cookies';
import {OAUTH_TOKEN_COOKIE} from '../../constants/cookies';
import Scene from './Scene';

class HomePage extends React.Component {
  onLogout = () => {
    // Remove cookie and invalidate token on client.
    this.props.cookiesApi.removeCookie(OAUTH_TOKEN_COOKIE);
    this.props.authApi.invalidateToken();
  };

  render() {
    return (
      <Scene loggedIn={!!this.props.authApi.token} onLogout={this.onLogout} />
    );
  }
}

const enhance = compose(
  withAuthProvider,
  withCookiesProvider
);

export default enhance(HomePage);

import React from 'react';
import { withCookiesProvider } from './Cookies';
import { OAUTH_TOKEN_COOKIE } from '../constants/cookies';

const {Provider, Consumer} = React.createContext();

class AuthProvider extends React.Component {
  state = {
    token: this.props.cookiesApi.getCookie(OAUTH_TOKEN_COOKIE) || '0048e4b6282ee5f8852ed67f5e31a5ca9a7880dd'
  }

  setToken = token => {
    this.props.cookiesApi.setCookie(OAUTH_TOKEN_COOKIE, token);
    this.setState({ token });
  }

  invalidateToken = () => {
    this.setState({ token: null });
  }

  render () {
    return (
      <Provider value={{
        token: this.state.token,
        setToken: this.setToken,
        invalidateToken: this.invalidateToken
      }}>
        {this.props.children}
      </Provider>
    );
  }
}

const withAuthProvider = WrappedComponent => props => (
  <Consumer>
    {authApi => <WrappedComponent {...props} authApi={authApi} />}
  </Consumer>
);

const AuthProviderWithCookies = withCookiesProvider(AuthProvider);

export {
  AuthProviderWithCookies as AuthProvider,
  Consumer as AuthConsumer,
  withAuthProvider
};

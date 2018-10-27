import React from 'react';
import { Link } from "@reach/router";
import { compose } from 'recompose';
import { withAuthProvider } from '../providers/Auth';
import { withCookiesProvider } from '../providers/Cookies';
import { routes } from '../constants';
import { OAUTH_TOKEN_COOKIE } from '../constants/cookies';

class HomePage extends React.Component {
  render () {
    return (
      <div>
        Home!
        {this.props.authApi.token ? (
          <React.Fragment>
            <p><Link to={routes.INBOX}>inbox</Link></p>
            <p><a
              href="javascript:void(0);"
              onClick={() => {
                // Remove cookie and invalidate token on client.
                this.props.cookiesApi.removeCookie(OAUTH_TOKEN_COOKIE);
                this.props.authApi.invalidateToken();
              }}
            >
              soft logout
            </a></p>
          </React.Fragment>
        ) : (
          <p><Link to={routes.LOGIN}>login</Link></p>
        )}
      </div>
    );
  }
};

const enhance = compose(
  withAuthProvider,
  withCookiesProvider
);

export default enhance(HomePage);

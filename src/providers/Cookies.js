import React from 'react';
import moment from 'moment';

class CookiesProvider extends React.Component {
  state = {
    cookies: {}
  }

  componentWillMount () {
    this.hydrateCookies();
  }

  mapifyCookies = () => {
    const cookiesPairs = document.cookie.split(';').map(cookie => cookie.trim());
    const cookies = cookiesPairs.reduce((map, cookiePair) => {
      const [key, value] = cookiePair.split('=');
      map[key] = value;
      return map;
    }, {});
    return cookies;
  }

  hydrateCookies = () => {
    const cookies = this.mapifyCookies();
    this.setState({ cookies });
  }

  setCookie = (name, value) => {
    document.cookie = `${name}=${value}`;
    this.hydrateCookies()
  }

  getCookie = name => {
    return this.state.cookies[name];
  }

  removeCookie = name => {
    document.cookie = `${name}=''; expires=${moment().subtract(1, 'day').toString()}`;
    this.hydrateCookies();
  }

  render () {
    return this.props.children({
      ...this.state,
      setCookie: this.setCookie,
      getCookie: this.getCookie,
      removeCookie: this.removeCookie
    });
  }
}

const withCookiesProvider = WrappedComponent => props => (
  <CookiesProvider>
    {cookiesApi => <WrappedComponent {...props} cookiesApi={cookiesApi} />}
  </CookiesProvider>
);

export {
  CookiesProvider,
  withCookiesProvider
};

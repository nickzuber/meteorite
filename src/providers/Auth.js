import React from 'react';

const {Provider, Consumer} = React.createContext('foo');

class AuthProvider extends React.Component {
  state = {
    token: null
  }

  setToken = token => {
    this.setState({ token });
  }

  render () {
    return (
      <Provider value={{
        token: this.state.token,
        setToken: this.setToken
      }}>
        {this.props.children}
      </Provider>
    );
  }
}

export {
  AuthProvider,
  Consumer as AuthConsumer
};

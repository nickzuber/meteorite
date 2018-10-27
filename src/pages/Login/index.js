import React from 'react';
import { Link } from "@reach/router";
import { Routes } from '../../constants';
import { AuthenticationButton } from '../../components/buttons';
import { AuthConsumer } from '../../providers/Auth';
import TokenHandler from './TokenHandler';
import Scene from './Scene';

export default class LoginPage extends React.Component {
  state = {
    loading: false,
    error: null
  }

  onSetLoading = loading => this.setState({ loading });
  onSetError = error => this.setState({ error });

  render () {
    return (
      <AuthConsumer>
        {({ token, setToken }) => (
          <React.Fragment>
            <TokenHandler
              setToken={setToken}
              onSetLoading={this.onSetLoading}
              onSetError={this.onSetError}
            />
            <Scene
              loading={this.state.loading}
              error={this.state.error}
              loggedOut={!token}
            />
          </React.Fragment>
        )}
      </AuthConsumer>
    );
  }
}

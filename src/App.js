import React, { Component } from 'react';
import { Router } from "@reach/router";
import { routes } from './constants';
import { AuthProvider } from './providers/Auth';
import {
  Home,
  Login,
  Inbox,
} from './pages';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Home path={routes.HOME} />
          <Login path={routes.LOGIN} />
          <Inbox path={routes.INBOX} />
        </Router>
      </AuthProvider>
    );
  }
}

export default App;

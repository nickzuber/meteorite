import React, { Component } from 'react';
import { Router } from "@reach/router";
import { Routes } from './constants';
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
          <Home path={Routes.HOME} />
          <Login path={Routes.LOGIN} />
          <Inbox path={Routes.INBOX} />
        </Router>
      </AuthProvider>
    );
  }
}

export default App;

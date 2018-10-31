import React, { Component } from 'react';
import { Router } from "@reach/router";
import { routes } from './constants';
import { AuthProvider } from './providers/Auth';
import {
  Home,
  Login,
  Notifications,
} from './pages';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Home path={routes.HOME} />
          <Login path={routes.LOGIN} />
          <Notifications path={routes.NOTIFICATIONS} />
        </Router>
      </AuthProvider>
    );
  }
}

export default App;

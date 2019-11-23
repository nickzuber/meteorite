import React, { Component } from 'react';
import { Router } from "@reach/router";
import { routes } from './constants';
import { AuthProvider } from './providers/Auth';
import {
  Home,
  Login,
  Pricing,
  Guide,
  Notifications,
  NotificationsRedesign,
} from './pages';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Home path={routes.HOME} />
          <Login path={routes.LOGIN} />
          <Pricing path={routes.PRICING} />
          <Guide path={routes.GUIDE} />
          <Notifications path={routes.NOTIFICATIONS} />
          <NotificationsRedesign path={routes.REDESIGN_NOTIFICATIONS} />
        </Router>
      </AuthProvider>
    );
  }
}

export default App;

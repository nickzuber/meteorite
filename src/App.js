import React, { Component } from 'react';
import { Router } from "@reach/router";
import { Routes } from './constants';
import {
  Home,
  Login,
  Inbox,
} from './pages';

const Dash = () => <div>Dash</div>

class App extends Component {
  render() {
    return (
      <Router>
        <Home path={Routes.HOME} />
        <Login path={Routes.LOGIN} />
        <Inbox path={Routes.INBOX} />
      </Router>
    );
  }
}

export default App;

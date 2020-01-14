import React, { Component } from 'react';
import {
  Router,
  Location,
  LocationProvider
} from "@reach/router";
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

// @TODO: abstract further once confirmed this works.
function gtag () {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function gaTrack (options) {
  gtag('config', 'UA-154218045-1', options);
}

// Effectively track each new page.
function PageTracker ({location}) {
  React.useEffect(() => {
    gaTrack({
      page_location: location,
      page_path: location.pathname
    });
  }, [location]);

  return null;
}

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <LocationProvider>
          <Location>
            {({location}) => <PageTracker location={location} />}
          </Location>
          <Router>
            <Home path={routes.HOME} />
            <Login path={routes.LOGIN} />
            <Pricing path={routes.PRICING} />
            <Guide path={routes.GUIDE} />
            <Notifications path={routes.NOTIFICATIONS} />
            <NotificationsRedesign path={routes.REDESIGN_NOTIFICATIONS} />
          </Router>
        </LocationProvider>
      </AuthProvider>
    );
  }
}

export default App;

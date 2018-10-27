import React from 'react';
import { Link, Redirect } from "@reach/router";
import { compose } from 'recompose';
import { withNotificationsProvider } from '../providers/Notifications';
import { withAuthProvider } from '../providers/Auth';
import { routes } from '../constants';

class InboxPage extends React.Component {
  render () {
    if (!this.props.authApi.token) {
      return <Redirect noThrow to={routes.LOGIN} />
    }

    return (
      <div>
        Inbox
        <Link to={routes.HOME}>home</Link>
        <button onClick={() => {
          this.props.notificationsApi.getNotifications()
        }}>click</button>
      </div>
    );
  }
};

const enhance = compose(
  withAuthProvider,
  withNotificationsProvider
);

export default enhance(InboxPage);

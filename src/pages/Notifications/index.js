import React from 'react';
import { Redirect } from "@reach/router";
import { compose } from 'recompose';
import { withNotificationsProvider } from '../../providers/Notifications';
import { withAuthProvider } from '../../providers/Auth';
import { withCookiesProvider } from '../../providers/Cookies';
import { withStorageProvider } from '../../providers/Storage';
import { OAUTH_TOKEN_COOKIE } from '../../constants/cookies';
import { routes } from '../../constants';
import { Filters } from '../../constants/filters';
import Scene from './Scene';

class NotificationsPage extends React.Component {
  state = {
    isSearching: false,
    activeFilter: Filters.PARTICIPATING
  }

  onSetActiveFilter = filter => {
    this.setState({ activeFilter: filter });
  }

  onLogout = () => {
    // Remove cookie and invalidate token on client.
    this.props.cookiesApi.removeCookie(OAUTH_TOKEN_COOKIE);
    this.props.authApi.invalidateToken();
  }

  onSearch = event => {
    const text = event.target.value;

    // Ignore empty queries.
    if (text.length <= 0) {
      return;
    }

    this.setState({ isSearching: true });
    setTimeout(() => {
      console.warn(`searched for '${text}'`);
      this.setState({ isSearching: false });
    }, 2000);
  }

  render () {
    if (!this.props.authApi.token) {
      return <Redirect noThrow to={routes.LOGIN} />
    }

    const {
      fetchNotifications,
      stageThread,
      markAsRead,
      clearCache,
      notifications,
      loading: isFetchingNotifications,
      error: fetchingNotificationsError,
    } = this.props.notificationsApi;

    return (
      <Scene
        notifications={notifications}
        onLogout={this.onLogout}
        onSearch={this.onSearch}
        onFetchNotifications={fetchNotifications}
        onMarkAsRead={markAsRead}
        onClearCache={clearCache}
        onStageThread={stageThread}
        onRefreshNotifications={this.props.storageApi.refreshNotifications}
        isSearching={this.state.isSearching}
        isFetchingNotifications={isFetchingNotifications}
        fetchingNotificationsError={fetchingNotificationsError}
        onSetActiveFilter={this.onSetActiveFilter}
        activeFilter={this.state.activeFilter}
      />
    );
  }
};

const enhance = compose(
  withStorageProvider,
  withAuthProvider,
  withCookiesProvider,
  withNotificationsProvider
);

export default enhance(NotificationsPage);

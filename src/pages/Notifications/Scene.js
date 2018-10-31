import React from 'react';
import { Link } from "@reach/router";
import moment from 'moment';
import styled from 'react-emotion';
import Icon from '../../components/Icon';
import Logo from '../../components/Logo';
import LoadingIcon from '../../components/LoadingIcon';
import { routes } from '../../constants';
import { withOnEnter } from '../../enhance';
import '../../styles/gradient.css';

const NotificationsContainer = styled('div')({
  position: 'relative',
  boxSizing: 'border-box',
  background: '#fff',
  margin: '0 auto',
  padding: 0,
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row'
});

const NavigationContainer = styled('div')({
  position: 'relative',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '24px 48px',
  width: '100%',
  background: 'none',
  height: 'initial'
});

const GeneralOptionsContainer = styled(NavigationContainer)({
  background: '#fff',
  padding: '8px 80px',
  flex: '0 0 75px',
  'button': {
    display: 'inline-flex',
    margin: 0,
    marginTop: 12
  }
});

const Sidebar = styled('div')({
  flex: '0 0 75px',
  marginTop: 15
});

const Notifications = styled('div')({
  flex: 1,
});

const Tab = styled('button')({
  cursor: 'pointer',
  border: 0,
  outline: 'none',
  background: 'none',
  display: 'block',
  height: 40,
  width: 40,
  borderRadius: '100%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 250ms ease',
  ':hover': {
    background: 'rgba(190, 197, 208, 0.25)'
  },
  ':active': {
    background: 'rgba(190, 197, 208, 0.5)'
  }
}, ({disabled}) => disabled && ({
  background: 'none !important',
  opacity: 0.5,
  cursor: 'default',
}));

const SearchField = styled('div')({
  float: 'left',
  textAlign: 'left',
  width: '50%',
  boxShadow: '0 1px 3px #4a4a4a5c',
  margin: '0 auto',
  background: '#fff',
  borderRadius: '4px',
  alignItems: 'center',
  padding: 0,
  height: '48px',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'all 0.12s ease-in-out',
  display: 'inline-flex'
});

const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
});

const SearchInput = styled('input')({
  flex: 1,
  textAlign: 'left',
  margin: '0 auto',
  background: 'none',
  padding: 0,
  height: '48px',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'all 0.12s ease-in-out',
  display: 'inline-flex',
  border: '0',
  outline: 'none'
});
const EnhancedSearchInput = withOnEnter(SearchInput);

const NotificationRow = styled('div')({
  display: 'block',
  textAlign: 'left',
  width: '100%',
  margin: '0 auto',
  background: '#fff',
  padding: '8px 16px',
  transition: 'all 0.12s ease-in-out',
});

export default function Scene ({
  notifications,
  onLogout,
  onSearch,
  onFetchNotifications,
  isSearching,
  isFetchingNotifications,
  fetchingNotificationsError,
}) {
  const isLoading = isSearching || isFetchingNotifications;

  notifications = notifications
    .sort((a, b) => b.repository.name.localeCompare(a.repository.name))
    .filter(n => console.warn(n.reason === 'review_requested') || n.reason === 'review_requested');

  return (
    <div className="container-gradient" style={{
      width: '100%',
      position: 'relative',
      flexDirection: 'column',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <NavigationContainer>
        <div className="button-container" style={{ textAlign: 'right' }}>
          <Logo size={48} style={{
            float: 'left',
            marginRight: 48,
            cursor: 'pointer'
          }} />
          <SearchField>
            <Icon.Search size={48} opacity={.45} />
            <EnhancedSearchInput
              disabled={isLoading}
              type="text"
              placeholder="Search for notifications"
              onEnter={onSearch}
            />
            {isSearching && <LoadingIcon size={48} />}
          </SearchField>
          <Link style={{marginRight: 15}} to={routes.HOME}>go home</Link>
          <a style={{marginRight: 15}} href="#" onClick={onLogout}>sign out</a>
        </div>
      </NavigationContainer>
      <GeneralOptionsContainer>
        <Tab disabled={isLoading}>
          <Icon.Refresh
            opacity={0.9}
            onClick={onFetchNotifications}
          />
        </Tab>
        <Tab disabled={isLoading}>
          <Icon.DoneAll
            opacity={0.9}
            onClick={onFetchNotifications}
          />
        </Tab>
      </GeneralOptionsContainer>
      <NotificationsContainer>
        <Sidebar>
          <Tab disabled={isLoading}>
            <Icon.Refresh
              opacity={0.9}
              onClick={onFetchNotifications}
            />
          </Tab>
        </Sidebar>
        <Notifications>
          {isFetchingNotifications ? (
            <LoaderContainer>
              <LoadingIcon />
            </LoaderContainer>
          ) : notifications.length <= 0 ? (
            <div>
              <p>no notifications</p>
            </div>
          ) : (
            <div>
              {notifications.map(n => (
                <NotificationRow key={n.id}>
                  <img width={16} src={n.repository.owner.avatar_url} />
                  <p style={{fontWeight: 'bold'}}>{n.repository.name}</p>
                  <p>{n.subject.title} ({n.subject.type}, {n.reason})</p>
                  <p>Last read at {n.last_read_at ? moment(n.last_read_at).format('dddd h:mma') : 'never'}</p>
                  <p>Last updated at {moment(n.last_updated).format('dddd h:mma')}</p>
                </NotificationRow>
              ))}
            </div>
          )}
        </Notifications>
      </NotificationsContainer>
    </div>
  );
}

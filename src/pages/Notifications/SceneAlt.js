import React from 'react';
import moment from 'moment';
import {Link} from "@reach/router";
import styled from 'react-emotion';
import Icon from '../../components/Icon';
import Logo from '../../components/Logo';
import LoadingIcon from '../../components/LoadingIcon';
import {routes} from '../../constants';
import {Filters} from '../../constants/filters';
import {withOnEnter} from '../../enhance';
import {Status} from '../../constants/status';
import {Badges} from '../../constants/reasons';
import '../../styles/gradient.css';

/* eslint-disable jsx-a11y/anchor-is-valid */

function getRelativeTime (time) {
  const currentTime = moment();
  const targetTime = moment(time);
  const diffMinutes = currentTime.diff(targetTime, 'minutes');
  if (diffMinutes < 1)
    return 'Just now';
  if (diffMinutes < 5)
    return 'Few minutes ago';
  if (diffMinutes < 60)
    return diffMinutes + ' minutes ago';
  if (diffMinutes < 60 * 24)
    return Math.floor(diffMinutes / 60) + ' hours ago';

  const diffDays = currentTime.diff(targetTime, 'days');
  if (diffDays === 1)
    return 'Yesterday';
  if (diffDays <= 7)
    return 'Last ' + targetTime.format('dddd');
  // @TODO implement longer diffs
  return 'Long time ago';
}

const FixedContainer = styled('div')({
  position: 'fixed'
});

const InlineBlockContainer = styled('div')({
  'div': {
    display: 'inline-block'
  }
});

const NotificationsContainer = styled('div')({
  position: 'relative',
  background: '#fff',
  margin: '0 auto',
  padding: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'hidden',
  boxSizing: 'border-box'
});

const NavigationContainer = styled('div')({
  position: 'fixed',
  top: 0,
  boxSizing: 'border-box',
  margin: '0 auto',
  width: '100%',
  background: 'none',
  height: 60,
  backgroundColor: '#24292e',
  color: 'hsla(0,0%,100%,.75)',
  paddingBottom: '12px',
  paddingTop: '12px',
  zIndex: '100',
});

const GeneralOptionsContainer = styled(NavigationContainer)({
  position: 'relative',
  zIndex: '1',
  height: 'initial',
  minHeight: 60,
  width: '100%',
  margin: 0,
  marginLeft: 230,
  maxWidth: 1000,
  background: '#fff',
  padding: '8px 16px',
  paddingTop: 18,
  flex: '0 0 50px',
  'button': {
    display: 'inline-flex',
    margin: 0
  }
});

const Sidebar = styled('div')({
  flex: '0 0 200px',
  padding: '0 20px 20px',
  display: 'flex',
  justifyContent: 'center',
});

const SidebarLink = styled('a')({}, ({active, color}) => ({
  textAlign: 'left',
  userSelect: 'none',
  margin: '0 auto 5px',
  position: 'relative',
  cursor: 'pointer',
  borderRadius: 4,
  alignItems: 'center',
  padding: '0 14px',
  height: 40,
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: 0.5,
  textTransform: 'capitalize',
  textDecoration: 'none',
  transition: 'background 0.12s ease-in-out',
  display: 'flex',
  background: active ? color : 'none',
  color: active ? '#fff' : '#202124',
  ':before': {
    content: '""',
    transition: 'all 150ms ease',
    background: 'rgba(190, 197, 208, 0.25)',
    borderRadius: 4,
    display: 'block',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    transform: 'scale(0)'
  },
  ':hover:before': {
    transform: active ? 'scale(0)' : 'scale(1)',
  },
  ':active:before': {
    background: 'rgba(190, 197, 208, 0.5)'
  },
  'div': {
    marginRight: 5
  }
}));

const Notifications = styled('div')({
  flex: 1,
});

const NavTab = styled('a')({
  position: 'relative',
  textTransform: 'capitalize',
  userSelect: 'none',
  borderRadius: 4,
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '14px',
  textAlign: 'left',
  opacity: 0.6,
  padding: '20px 32px',
  paddingLeft: '16px',
  width: '150px',
  display: 'inline-block',
  margin: 0,
  transition: 'all 150ms ease',
  ':hover': {
    background: 'rgba(190, 197, 208, 0.25)',
  },
}, ({ active, color }) => active && ({
  color,
  opacity: 1,
  ':after': {
    content: '""',
    position: 'absolute',
    background: color,
    height: '3px',
    width: '90%',
    bottom: '0',
    left: '5%',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  }
}));

const Tab = styled('button')({
  position: 'relative',
  userSelect: 'none',
  cursor: 'pointer',
  border: 0,
  outline: 'none',
  background: 'none',
  height: 40,
  width: 40,
  borderRadius: '100%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ':before': {
    content: "''",
    transition: 'all 150ms ease',
    background: 'rgba(190, 197, 208, 0.25)',
    borderRadius: '100%',
    display: 'block',
    height: 40,
    width: 40,
    position: 'absolute',
    transform: 'scale(0)'
  },
  ':hover:before': {
    transform: 'scale(1)',
  },
  ':active:before': {
    background: 'rgba(190, 197, 208, 0.5)'
  }
}, ({disabled}) => disabled && ({
  background: 'none !important',
  opacity: 0.35,
  cursor: 'default',
  ':hover:before': {
    transform: 'scale(0) !important',
  },
  ':active:before': {
    background: 'none !important'
  }
}));

const SearchField = styled('div')({
  float: 'left',
  textAlign: 'left',
  width: '50%',
  boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
  margin: '0 auto',
  background: 'hsla(0,0%,100%,.125)',
  borderRadius: '4px',
  alignItems: 'center',
  padding: 0,
  height: '36px',
  fontSize: '13px',
  textDecoration: 'none',
  transition: 'all 0.06s ease-in-out',
  display: 'inline-flex',
  ':focus-within': {
    background: '#fff'
  }
});

const Message = styled('div')({
  display: 'block',
  textAlign: 'center',
  marginTop: 96,
  'p': {
    paddingTop: 24,
    userSelect: 'none',
    display: 'block',
    margin: 0
  }
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
  height: '36px',
  color: '#fff',
  fontSize: '13px',
  textDecoration: 'none',
  display: 'inline-flex',
  border: '0',
  outline: 'none',
  ':focus': {
    color: '#202124'
  }
});
const EnhancedSearchInput = withOnEnter(SearchInput);

const NotificationRow = styled('tr')({
  position: 'relative',
  cursor: 'pointer',
  display: 'block',
  textAlign: 'left',
  width: '100%',
  margin: '0 auto',
  background: '#fff',
  padding: '8px 16px',
  transition: 'all 0.1s ease-in-out',
  boxSizing: 'border-box',
  ':hover': {
    background: '#f9f9f9',
    // boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
    zIndex: 10
  }
});

const NotificationTab = styled(Tab)({
  display: 'inline-flex',
  margin: 0,
});

const Timestamp = styled('span')({
  position: 'relative',
  margin: 0,
  marginLeft: 10,
  fontSize: 11,
  opacity: 0.5,
});

const NotificationTitle = styled('span')({
  position: 'relative',
  display: 'block'
}, ({img}) => img && ({
  paddingLeft: 20,
  '::before': {
    content: '""',
    position: 'absolute',
    display: 'block',
    background: `url(${img}) center center no-repeat`,
    backgroundSize: 'cover',
    left: 0,
    height: 20,
    width: 20,
  }
}));

const Repository = styled('span')({
  fontWeight: 500,
  marginLeft: 10,
  fontSize: 14
});

const PRIssue = styled(Repository)({
  fontWeight: 400,
});

const Table = styled('table')({
  width: '100%',
  maxWidth: 970,
  minWidth: 970,
  display: 'block',
  'td': {
    display: 'inline-block'
  }
});

const TableItem = styled('td')({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}, ({width}) => ({
  width
}));

function getPRIssueIcon (type, reasons) {
  const grow = 1.0;

  switch (type) {
    case 'PullRequest':
      return (
        <Icon.PrMerged shrink={grow} />
      );
    case 'Issue':
      return (
        <Icon.IssueOpen shrink={grow} />
      );
    default:
      return null;
  }
}

export default function Scene ({
  first,
  last,
  lastPage,
  page,
  notifications,
  query,
  activeStatus,
  allNotificationsCount,
  onChangePage,
  onSetActiveStatus,
  onClearQuery,
  onLogout,
  onSearch,
  onMarkAsRead,
  onFetchNotifications,
  onRefreshNotifications,
  onStageThread,
  isSearching,
  isFetchingNotifications,
  onClearCache,
  fetchingNotificationsError,
  activeFilter,
  onSetActiveFilter,
}) {
  const isLoading = isSearching || isFetchingNotifications;
  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  console.warn('before render in scene', notifications)

  if (query) {
    notifications = notifications.filter(n => (
      n.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
    )
  }

  return (
    <div style={{marginTop: 60}}>
      <NavigationContainer>
        <div style={{
          maxWidth: 1200,
          textAlign: 'right',
          margin: '0 auto',
          padding: '0 20px 0 40px',
        }}>
          <Logo
            size={36}
            style={{
              float: 'left',
              marginRight: 48,
              cursor: 'pointer'
            }}
            onClick={() => {
              onSetActiveStatus(Status.QUEUED);
              onSetActiveFilter(Filters.PARTICIPATING);
            }}
          />
          <SearchField>
            <Icon.Search size={48} opacity={.45} />
            <EnhancedSearchInput
              disabled={isLoading}
              type="text"
              placeholder="Search for notifications"
              onEnter={onSearch}
            />
            {isSearching && <LoadingIcon alt={true} size={48} />}
          </SearchField>
          <div style={{display: 'inline-block'}} className="button-container-alt">
            <Link style={{
              marginRight: 15,
              background: 'none',
              color: '#fff',
              height: 36,
              padding: '0 12px'
            }} to={routes.HOME}>home</Link>
          </div>
          <div style={{display: 'inline-block'}}  className="button-container-alt">
            <a style={{
              marginRight: 15,
              background: 'none',
              color: '#fff',
              height: 36,
              padding: '0 12px'
            }} href="#" onClick={onLogout}>sign out</a>
          </div>
        </div>
      </NavigationContainer>
      <GeneralOptionsContainer>
        <Tab disabled={isLoading}>
          <Icon.Refresh
            opacity={0.9}
            onClick={!isLoading ? (() => onFetchNotifications()) : undefined}
          />
        </Tab>
        <Tab disabled={isLoading}>
          <Icon.Trash
            opacity={0.9}
            onClick={!isLoading ? (() => onClearCache()) : undefined}
          />
        </Tab>
        {query ? (
          <React.Fragment>
            <div style={{display: 'inline-block'}}  className="button-container-alt">
              <a style={{
                marginRight: 15,
                background: 'none',
                color: '#202124',
                textTransform: 'inherit',
                boxShadow: '0 0 0',
                fontWeight: 400,
                height: 36,
                padding: '0 12px',
              }}
              >
                Showing results for '{query}'
              </a>
            </div>
            <Tab disabled={isLoading}>
              <Icon.X
                opacity={0.9}
                onClick={!isLoading ? (() => onClearQuery()) : undefined}
              />
            </Tab>
          </React.Fragment>
        ) : null}
        <div style={{float: 'right'}}>
          <div style={{display: 'inline-block'}}  className="button-container-alt">
            <a style={{
              marginRight: 15,
              background: 'none',
              color: '#202124',
              textTransform: 'inherit',
              boxShadow: '0 0 0',
              fontWeight: 400,
              height: 36,
              padding: '0 12px',
            }}>
              {first}-{last} of about {allNotificationsCount}
            </a>
          </div>
          <Tab disabled={isLoading || isFirstPage}>
            <Icon.Prev
              opacity={0.9}
              onClick={!isLoading && !isFirstPage ? (() => onChangePage(page - 1)) : undefined}
            />
          </Tab>
          <Tab disabled={isLoading || isLastPage}>
            <Icon.Next
              opacity={0.9}
              onClick={!isLoading && !isLastPage ? (() => onChangePage(page + 1)) : undefined}
            />
          </Tab>
        </div>
      </GeneralOptionsContainer>
      <GeneralOptionsContainer style={{paddingTop: 4}}>
        <NavTab
          color="#00d19a"
          active={activeStatus === Status.QUEUED}
          onClick={() => onSetActiveStatus(Status.QUEUED)}
          href="#">
          Queued
        </NavTab>
        <NavTab
          color="#009ef8"
          active={activeStatus === Status.STAGED}
          onClick={() => onSetActiveStatus(Status.STAGED)}
          href="#">
          Staged
        </NavTab>
        <NavTab
          color="#f12c3f"
          active={activeStatus === Status.CLOSED}
          onClick={() => onSetActiveStatus(Status.CLOSED)}
          href="#">
          Closed
        </NavTab>
      </GeneralOptionsContainer>
      <NotificationsContainer>
        <Sidebar>
          <FixedContainer>
            <SidebarLink
              active={activeFilter === Filters.ALL}
              color="#6772e5"
              onClick={() => onSetActiveFilter(Filters.ALL)}>
              {activeFilter === Filters.ALL ? (
                <Icon.InboxWhite shrink={.6} />
              ) : (
                <Icon.Inbox shrink={.6} />
              )}
              all notifications
            </SidebarLink>
            <SidebarLink
              active={activeFilter === Filters.PARTICIPATING}
              color="#00d19a"
              onClick={() => onSetActiveFilter(Filters.PARTICIPATING)}>
              {activeFilter === Filters.PARTICIPATING ? (
                <Icon.PeopleWhite shrink={.6} />
              ) : (
                <Icon.People shrink={.6} />
              )}
              participating
            </SidebarLink>
            <SidebarLink
              active={activeFilter === Filters.COMMENT}
              color="#00A0F5"
              onClick={() => onSetActiveFilter(Filters.COMMENT)}>
              {activeFilter === Filters.COMMENT ? (
                <Icon.BookmarkAltWhite shrink={.6} />
              ) : (
                <Icon.BookmarkAlt shrink={.6} />
              )}
              commented
            </SidebarLink>
          </FixedContainer>
        </Sidebar>
        <Notifications>
          {isFetchingNotifications ? (
            <LoaderContainer>
              <LoadingIcon />
            </LoaderContainer>
          ) : notifications.length <= 0 ? (
            <Message>
              <p style={{
                fontSize: 16,
                fontWeight: 400,
              }}>
                No {activeStatus.toLowerCase()} notifications</p>
              <p style={{
                fontSize: 12,
                fontWeight: 400,
                color: '#5f6368'
              }}>
                <span role="img" aria-label="hooray">🎉</span> You're all set here for the moment</p>
            </Message>
          ) : (
            <Table>
              <tbody>
                {notifications.map(n => (
                  <NotificationRow key={n.id}>
                    <TableItem>
                      <div style={{ float: 'left', marginTop: 2 }}>
                        {getPRIssueIcon(n.type, n.reasons)}
                      </div>
                    </TableItem>
                    <TableItem style={{height: 36}} width={400} onClick={() => {
                      window.open(n.url);
                      onStageThread(n.id)
                    }}>
                      <NotificationTitle>
                        <PRIssue>{n.name}</PRIssue>
                      </NotificationTitle>
                      <Timestamp>{getRelativeTime(n.updated_at)}</Timestamp>
                    </TableItem>
                    <TableItem width={100}>
                      <InlineBlockContainer>
                        {n.badges.map(badge => {
                          switch (badge) {
                            case Badges.HOT:
                              // lots of `reasons` within short time frame
                              return <Icon.Hot shrink={0.75} />
                            case Badges.OLD:
                              // old
                              return <Icon.Alarm shrink={0.75} />
                            case Badges.COMMENTS:
                              // lots of `reasons`
                              return <Icon.Convo shrink={0.75} />
                            default:
                              return null;
                          }
                        })}
                      </InlineBlockContainer>
                    </TableItem>
                    <TableItem width={250}>
                      <Repository>{n.repository}</Repository>
                    </TableItem>
                    <TableItem width={150} style={{textAlign: 'right'}}>
                      <NotificationTab>
                        {n.score}
                      </NotificationTab>
                      <NotificationTab>
                        <Icon.Check
                          opacity={0.9}
                          onClick={!isLoading ? (() => onStageThread(n.id)) : undefined}
                        />
                      </NotificationTab>
                      <NotificationTab>
                        <Icon.X
                          opacity={0.9}
                          onClick={!isLoading ? (() => onMarkAsRead(n.id)) : undefined}
                        />
                      </NotificationTab>
                    </TableItem>
                  </NotificationRow>
                ))}
              </tbody>
            </Table>
          )}
        </Notifications>
      </NotificationsContainer>
    </div>
  );
}

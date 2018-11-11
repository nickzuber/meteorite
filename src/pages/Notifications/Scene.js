import React from 'react';
import moment from 'moment';
// import {VictoryPie, VictoryChart} from "victory";
import {Link} from "@reach/router";
import styled from 'react-emotion';
import Icon from '../../components/Icon';
import Logo from '../../components/Logo';
import LoadingIcon from '../../components/LoadingIcon';
import {routes} from '../../constants';
import {Filters} from '../../constants/filters';
import {withOnEnter, withTooltip} from '../../enhance';
import {Status} from '../../constants/status';
import {Reasons, Badges} from '../../constants/reasons';
import '../../styles/gradient.css';

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */

function stringOfType (type) {
  switch (type) {
    case 'PullRequest':
      return 'pull request';
    case 'Issue':
      return 'issue';
    default:
      return 'task';
  }
}

export function getMessageFromReasons (reasons, type) {
  switch (reasons[reasons.length - 1].reason) {
    case Reasons.ASSIGN:
      return 'You were assigned this ' + stringOfType(type);
    case Reasons.AUTHOR:
      return 'There was activity on this thread you created';
    case Reasons.COMMENT:
      return 'Somebody left a comment';
    case Reasons.MENTION:
      return 'You were @mentioned';
    case Reasons.REVIEW_REQUESTED:
      return 'Your review was requested for this ' + stringOfType(type);
    case Reasons.SUBSCRIBED:
      return 'There was an update and you\'re subscribed';
    case Reasons.OTHER:
    default:
      return 'Something was updated';
  }
}

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
  return 'Over a week ago';
}

const UnofficialReleaseTag = styled('span')({
  color: 'white',
  position: 'absolute',
  left: '21px',
  bottom: '0px',
  fontSize: '9px',
  background: '#f42839',
  fontWeight: '800',
  padding: '2px 4px',
  borderRadius: '4px',
  textTransform: 'uppercase',
});

const FixedContainer = styled('div')({
  height: '80%',
  maxWidth: 270,
  display: 'block',
  position: 'fixed'
});

const InlineBlockContainer = styled('div')({
  'div': {
    display: 'inline-block'
  }
});

const NotificationsContainer = styled('div')({
  position: 'relative',
  margin: '0 auto',
  padding: 0,
  width: '100%',
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
  height: 60,
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
  width: '95%',
  margin: 0,
  padding: '8px 16px',
  paddingTop: 18,
  flex: '0 0 50px',
  'button': {
    display: 'inline-flex',
    margin: 0
  }
});

const Sidebar = styled('div')({
  flex: '0 0 300px',
  padding: '32px 20px',
  paddingRight: 0,
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
  width: 200,
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
}, ({ number }) => ({
  ':after': number > 0 && {
    content: `"${number}"`,
    color: '#ffffff',
    background: '#a8a8a9',
    fontSize: '10px',
    verticalAlign: 'text-top',
    padding: '1px 8px',
    borderRadius: '4px',
    marginLeft: '6px',
    display: 'inline-block',
  }
}), ({ active, color, number }) => active && ({
  color,
  opacity: 1,
  ':before': {
    content: '""',
    position: 'absolute',
    background: color,
    height: '3px',
    width: '90%',
    bottom: '0',
    left: '5%',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  ':after': number > 0 && {
    content: `"${number}"`,
    color: '#ffffff',
    background: color,
    fontSize: '10px',
    verticalAlign: 'text-top',
    padding: '1px 8px',
    borderRadius: '4px',
    marginLeft: '6px',
    display: 'inline-block',
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
  marginTop: 24 * 5,
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
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
  width: '100%',
  borderRadius: 4,
  margin: '0 auto',
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

const ReasonMessage = styled(Timestamp)({

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
}, ({after}) => ({
  ':after': {
    content: `"#${after}"`,
    fontSize: 13,
    opacity: .3,
    marginLeft: 5
  }
}));

const Table = styled('table')({
  width: '96%',
  minWidth: 970,
  'td': {
    display: 'inline-block'
  }
});

const TableItem = styled('td')({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}, ({width, flex}) => ({
  width,
  flex
}));

const SmallLink = styled('a')({
  display: 'block',
  marginRight: 10,
  cursor: 'pointer',
  fontSize: 10,
  lineHeight: '20px',
  fontWeight: 400,
  textDecoration: 'underline',
  transition: 'all 0.12s ease-in-out',
  ':hover': {
    opacity: 0.75
  }
});

const EnhancedTab = withTooltip(Tab);
const EnhancedNavTab = withTooltip(NavTab);
const EnhancedNotificationTab = withTooltip(NotificationTab);
const EnhancedSidebarLink = withTooltip(SidebarLink);
const EnhancedIconHot = withTooltip(Icon.Hot);
const EnhancedIconTimer = withTooltip(Icon.Timer);
const EnhancedIconConvo = withTooltip(Icon.Convo);

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
  currentTime,
  isFirstTimeUser,
  notificationsPermission,
  queuedCount,
  stagedCount,
  closedCount,
  first,
  last,
  lastPage,
  page,
  notifications,
  query,
  activeStatus,
  allNotificationsCount,
  stagedTodayCount,
  onChangePage,
  onSetActiveStatus,
  onClearQuery,
  onLogout,
  onSearch,
  onMarkAsRead,
  onMarkAllAsStaged,
  onFetchNotifications,
  onStageThread,
  onRestoreThread,
  isSearching,
  isFetchingNotifications,
  onClearCache,
  fetchingNotificationsError,
  activeFilter,
  onSetActiveFilter,
  setNotificationsPermission
}) {
  const loading = isSearching || isFetchingNotifications;
  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  const NotificationsIcon = notificationsPermission === 'granted'
    ? Icon.NotificationsOn
    : Icon.NotificationsOff;

  // console.log('notifications', notifications)
  // console.log('isFirstTimeUser', isFirstTimeUser)
  // console.log('notificationsPermission', notificationsPermission)

  if (isFirstTimeUser && notifications.length > 5) {
    // alert('hello, clear ur shit');
  }

  return (
    <div style={{marginTop: 60}}>
      <NavigationContainer className="container-gradient">
        <div style={{
          position: 'relative',
          textAlign: 'right',
          margin: '0 auto',
          width: '92%'
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
          <UnofficialReleaseTag>beta</UnofficialReleaseTag>
          <SearchField>
            <Icon.Search size={48} opacity={.45} />
            <EnhancedSearchInput
              disabled={loading}
              type="text"
              placeholder="Search for notifications"
              onEnter={onSearch}
            />
            {isSearching && <LoadingIcon white={true} size={48} />}
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
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <div style={{
          flex: '0 0 300px'
        }}>
          <Sidebar>
            <FixedContainer>
              <div style={{
                width: 220,
                padding: '0 14px',
                margin: '0 11px 12px',
              }}>
                <h3 style={{
                  margin: 0
                }}>
                  <Icon.Clock style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginRight: '5px',
                    top: '-3px',
                  }} />
                  {currentTime.format('h:mma')}
                </h3>
                <span style={{
                  display: 'block',
                  padding: '6px 0px',
                  fontSize: 15,
                  opacity: 0.7,
                }}>{currentTime.format('dddd, MMMM Do')}</span>
                <span style={{
                  display: 'block',
                  padding: '6px 0 8px',
                  fontSize: 12,
                  opacity: 0.5,
                }}>You've triaged {stagedTodayCount} notifications today</span>
              </div>
              <EnhancedSidebarLink
                tooltip="All the updates for issues and pull requests that are your responsibility to deal with"
                tooltipOffsetX={130}
                active={activeFilter === Filters.PARTICIPATING}
                color="#00d19a"
                onClick={() => onSetActiveFilter(Filters.PARTICIPATING)}>
                {activeFilter === Filters.PARTICIPATING ? (
                  <Icon.BoltWhite shrink={.6} />
                ) : (
                  <Icon.Bolt shrink={.6} />
                )}
                all your updates
              </EnhancedSidebarLink>
              <EnhancedSidebarLink
                tooltip="Updates for issues and pull requests that require your review"
                tooltipOffsetX={100}
                active={activeFilter === Filters.REVIEW_REQUESTED}
                color="#00A0F5"
                onClick={() => onSetActiveFilter(Filters.REVIEW_REQUESTED)}>
                {activeFilter === Filters.REVIEW_REQUESTED ? (
                  <Icon.EyeWhite shrink={.6} />
                ) : (
                  <Icon.Eye shrink={.6} />
                )}
                review requested
              </EnhancedSidebarLink>
              <EnhancedSidebarLink
                tooltip="Updates for issues and pull requests that are assigned to you"
                tooltipOffsetX={100}
                active={activeFilter === Filters.ASSIGNED}
                color="#f12c3f"
                onClick={() => onSetActiveFilter(Filters.ASSIGNED)}>
                {activeFilter === Filters.ASSIGNED ? (
                  <Icon.TagWhite shrink={.6} />
                ) : (
                  <Icon.Tag shrink={.6} />
                )}
                assigned
              </EnhancedSidebarLink>
              <EnhancedSidebarLink
                tooltip="Updates for issues and pull requests that you have commented on"
                tooltipOffsetX={100}
                active={activeFilter === Filters.COMMENT}
                color="#24292e"
                onClick={() => onSetActiveFilter(Filters.COMMENT)}>
                {activeFilter === Filters.COMMENT ? (
                  <Icon.PeopleAltWhite shrink={.6} />
                ) : (
                  <Icon.PeopleAlt shrink={.6} />
                )}
                commented
              </EnhancedSidebarLink>
              <div style={{
                padding: 14,
                margin: 21,
                background: '#f5f5f5',
                borderRadius: 4,
                height: 100,
                fontSize: 11,
                color: 'rgba(36, 41, 46, 0.75)',
                fontStyle: 'italic'
              }}>
                <Icon.Bubbles style={{display: 'inline-block', verticalAlign: 'middle'}} shrink={.6} />
                statistics coming soon™
              </div>
              <div style={{
                padding: 14,
                margin: 21,
              }}>
                <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite/issues">Report bugs</SmallLink>
                <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite/issues">Submit feedback</SmallLink>
                <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite">See source code</SmallLink>
              </div>
            </FixedContainer>
          </Sidebar>
        </div>
        <div style={{
          flex: 1
        }}>
          <GeneralOptionsContainer>
            <EnhancedTab tooltip={!loading ? "Refresh your notifications" : null} disabled={loading}>
              <Icon.Refresh
                opacity={0.9}
                onClick={!loading ? (() => onFetchNotifications()) : undefined}
              />
            </EnhancedTab>
            <EnhancedTab tooltip={!loading ? "Mark all as read" : null} disabled={loading}>
              <Icon.DoneAll
                opacity={0.9}
                onClick={!loading ? (() => {
                  const response = window.confirm('Are you sure you want to mark all your notifications as read?');
                  if (response) {
                    onMarkAllAsStaged();
                  }
                }) : undefined}
              />
            </EnhancedTab>
            <EnhancedTab tooltip={!loading ? "Delete all of your notifications from the cache" : null} disabled={loading}>
              <Icon.Trash
                opacity={0.9}
                onClick={!loading ? (() => {
                  const response = window.confirm('Are you sure you want to clear the cache?');
                  if (response) {
                    onClearCache();
                  }
                }) : undefined}
              />
            </EnhancedTab>
            <EnhancedTab
              tooltip={!loading ? (
                notificationsPermission === 'granted'
                  ? "Turn off web notifications"
                  : "Turn on web notifications"
                ) : null}
              disabled={loading}>
              <NotificationsIcon
                opacity={0.9}
                onClick={!loading ? (() => {
                  switch(notificationsPermission) {
                    case 'granted':
                      return setNotificationsPermission('denied');
                    case 'denied':
                    case 'default':
                    default:
                      Notification.requestPermission().then(result => {
                        return setNotificationsPermission(result);
                      });
                  }
                }) : undefined}
              />
            </EnhancedTab>
            {query ? (
              <React.Fragment>
                <div style={{display: 'inline-block'}}  className="button-container-alt">
                  <a style={{
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
                <EnhancedTab disabled={loading}>
                  <Icon.X
                    opacity={0.9}
                    onClick={!loading ? (() => onClearQuery()) : undefined}
                  />
                </EnhancedTab>
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
              <EnhancedTab disabled={loading || isFirstPage}>
                <Icon.Prev
                  opacity={0.9}
                  onClick={!loading && !isFirstPage ? (() => onChangePage(page - 1)) : undefined}
                />
              </EnhancedTab>
              <EnhancedTab disabled={loading || isLastPage}>
                <Icon.Next
                  opacity={0.9}
                  onClick={!loading && !isLastPage ? (() => onChangePage(page + 1)) : undefined}
                />
              </EnhancedTab>
            </div>
          </GeneralOptionsContainer>
          <GeneralOptionsContainer style={{paddingTop: 4}}>
            <EnhancedNavTab
              tooltip="New updates that you haven't dealt with yet"
              tooltipOffsetX={55}
              number={queuedCount}
              color="#00d19a"
              active={activeStatus === Status.QUEUED}
              onClick={() => onSetActiveStatus(Status.QUEUED)}
              href="javascript:void(0);">
              Unread
            </EnhancedNavTab>
            <EnhancedNavTab
              tooltip="Notifications that you've seen, clicked on, or otherwise have handled"
              tooltipOffsetX={55}
              number={stagedCount}
              color="#009ef8"
              active={activeStatus === Status.STAGED}
              onClick={() => onSetActiveStatus(Status.STAGED)}
              href="javascript:void(0);">
              Read
            </EnhancedNavTab>
            <EnhancedNavTab
              tooltip="Stale and old notifications that are considered closed out and finished"
              tooltipOffsetX={55}
              number={closedCount}
              color="#f12c3f"
              active={activeStatus === Status.CLOSED}
              onClick={() => onSetActiveStatus(Status.CLOSED)}
              href="javascript:void(0);">
              Resolved
            </EnhancedNavTab>
          </GeneralOptionsContainer>
          <NotificationsContainer>
          <Notifications>
            {isFetchingNotifications ? (
              <LoaderContainer>
                <LoadingIcon />
              </LoaderContainer>
            ) : fetchingNotificationsError ? (
              <LoaderContainer style={{flexDirection: 'column'}}>
                <p>OOPSIE WOOPSIE!! Uwu An error occurred when fetching notifications.</p>
                <p><a onClick={() => onFetchNotifications()} href="#">Try again</a></p>
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
                <tbody style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {notifications.map(n => (
                    <NotificationRow key={n.id}>
                      <TableItem>
                        <div style={{ float: 'left', marginTop: 2 }}>
                          {getPRIssueIcon(n.type, n.reasons)}
                        </div>
                      </TableItem>
                      <TableItem
                        style={{height: 36, cursor: 'pointer', userSelect: 'none'}}
                        width={400}
                        flex={.65}
                        onClick={() => {
                          window.open(n.url);
                          onStageThread(n.id, n.repository)
                        }}>
                        <NotificationTitle>
                          <PRIssue after={n.number}>{n.name}</PRIssue>
                        </NotificationTitle>
                        <Timestamp>
                          {getRelativeTime(n.updated_at)}
                          {n.isAuthor && (
                            <Icon.User
                              shrink={0.5}
                              style={{
                                display: 'inline-block',
                                top: -3
                              }}
                            />
                          )}
                        </Timestamp>
                        <ReasonMessage style={{left: -5}}>
                          <Icon.Sync
                            style={{
                              display: 'inline-block',
                              top: -3,
                              right: -4
                            }}
                            shrink={.5}
                          />
                          {getMessageFromReasons(n.reasons, n.type)}
                        </ReasonMessage>
                      </TableItem>
                      <TableItem width={100}>
                        <InlineBlockContainer>
                          {n.badges.map(badge => {
                            switch (badge) {
                              case Badges.HOT:
                                // lots of `reasons` within short time frame
                                return (
                                  <EnhancedIconHot
                                    key={n.id}
                                    tooltip="Lots of recent activity"
                                    tooltipOffsetX={-15}
                                    tooltipOffsetY={-10}
                                    shrink={0.75}
                                  />
                                );
                              case Badges.OLD:
                                // old
                                return (
                                  <EnhancedIconTimer
                                    key={n.id}
                                    tooltip="Old pull request that needs your review"
                                    tooltipOffsetX={-15}
                                    tooltipOffsetY={-10}
                                    shrink={0.75}
                                  />
                                );
                              case Badges.COMMENTS:
                                // lots of `reasons`
                                return (
                                  <EnhancedIconConvo
                                    key={n.id}
                                    tooltip="Very talkative thread"
                                    tooltipOffsetX={-15}
                                    tooltipOffsetY={-10}
                                    shrink={0.75}
                                  />
                                );
                              default:
                                return null;
                            }
                          })}
                        </InlineBlockContainer>
                      </TableItem>
                      <TableItem width={250} flex={.35}>
                        <Repository
                          onClick={() => window.open(n.repositoryUrl)}
                          style={{cursor: 'pointer', userSelect: 'none'}}>
                          {n.repository}</Repository>
                      </TableItem>
                      <TableItem width={150} style={{textAlign: 'right'}}>
                        <EnhancedNotificationTab
                          style={{fontWeight: 600}}
                          tooltip={!loading ? "Score representing this notification's importance" : null}
                          tooltipOffsetX={-20}
                        >
                          +{n.score}
                        </EnhancedNotificationTab>
                        {activeStatus === Status.QUEUED ? (
                          <EnhancedNotificationTab
                            tooltip={!loading ? "Mark as read" : null}
                            tooltipOffsetX={-10}
                          >
                            <Icon.Check
                              opacity={0.9}
                              onClick={!loading ? (() => onStageThread(n.id, n.repository)) : undefined}
                            />
                          </EnhancedNotificationTab>
                        ) : (
                          <EnhancedNotificationTab
                            tooltip={!loading ? "Revert back to unread" : null}
                            tooltipOffsetX={-10}
                          >
                            <Icon.Undo
                              opacity={0.9}
                              onClick={!loading ? (() => onRestoreThread(n.id)) : undefined}
                            />
                          </EnhancedNotificationTab>
                        )}
                        {activeStatus === Status.CLOSED ? (
                          <EnhancedNotificationTab
                            tooltip="There's nothing here at right now, back off dude"
                            tooltipOffsetX={-80}
                          >
                            <span>&nbsp;</span>
                          </EnhancedNotificationTab>
                          ) : (
                          <EnhancedNotificationTab tooltip={!loading ? "Mark as resolved" : null}>
                            <Icon.X
                              opacity={0.9}
                              onClick={!loading ? (() => onMarkAsRead(n.id)) : undefined}
                            />
                          </EnhancedNotificationTab>
                        )}
                      </TableItem>
                    </NotificationRow>
                  ))}
                </tbody>
              </Table>
            )}
          </Notifications>
        </NotificationsContainer>
        </div>
      </div>
    </div>
  );
}

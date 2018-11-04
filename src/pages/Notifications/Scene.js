import React from 'react';
import {Link} from "@reach/router";
import styled from 'react-emotion';
import Icon from '../../components/Icon';
import Logo from '../../components/Logo';
import LoadingIcon from '../../components/LoadingIcon';
import {routes} from '../../constants';
import {Filters} from '../../constants/filters';
import {withOnEnter} from '../../enhance';
import {Status} from '../../constants/status';
import '../../styles/gradient.css';

/**
 * Given a notification, give it a score based on its importance.
 *
 * There are some interesting workarounds that go into this algorithm to account
 * for GitHub's broken notifications API -- but we will get to that later. First,
 * let's start off with the basics of scoring.
 *
 * There are a few "reasons" that we can be getting a notification, each having
 * an initial weight of importance:
 *
 *  - MENTION           ->  8
 *  - ASSIGN            ->  14
 *  - REVIEW_REQUESTED  ->  20
 *  - SUBSCRIBED        ->  6
 *  - AUTHOR            ->  8
 *  - OTHER             ->  2
 *
 * There are some rules that go to giving out these scores, primarily being the
 * first time we see one of these unique reasons, we award the notification with
 * the respective score, but a reason that transitions into itself will be awarded
 * the score of `OTHER`. For example:
 *
 *  - null, MENTION, MENTION -> 0, 8, 2
 *  - null, ASSIGN, ASSIGN, REVIEW_REQUESTED, -> 0, 14, 2, 20
 *  - null, SUBSCRIBED, SUBSCRIBED, SUBSCRIBED -> 0, 6, 2, 2
 *
 * @param {Object} notification Some notification to sort.
 */
function scoreOf (notification) {
  return notification.reasons.length
}

const decorateWithScore = notification => ({
  ...notification,
  score: scoreOf(notification)
});

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
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'hidden',
  boxSizing: 'border-box'
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
  padding: '8px 16px',
  paddingLeft: 260,
  flex: '0 0 50px',
  'button': {
    display: 'inline-flex',
    margin: 0
  }
});

const Sidebar = styled('div')({
  flex: '0 0 200px',
  padding: '0 20px 20px',
  marginTop: 15
});

const SidebarLink = styled('a')({}, ({active, color}) => ({
  textAlign: 'left',
  margin: '0 auto',
  cursor: 'pointer',
  borderRadius: '8px',
  alignItems: 'center',
  padding: '0 14px',
  height: 40,
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: 0.5,
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'background 0.12s ease-in-out',
  display: 'flex',
  background: active ? color : 'none',
  color: active ? '#fff' : '#1a1a1a',
  ':hover': {
    background: active ? color: 'rgba(200, 200, 200, .25)'
  },
  'div': {
    marginRight: 5
  }
}));

const Notifications = styled('div')({
  flex: 1,
});

const Tab = styled('button')({
  position: 'relative',
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
  opacity: 0.5,
  cursor: 'default',
}));

const SearchField = styled('div')({
  float: 'left',
  textAlign: 'left',
  width: '50%',
  boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
  margin: '0 auto',
  background: '#fff',
  borderRadius: '4px',
  alignItems: 'center',
  padding: 0,
  height: '48px',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'all 0.06s ease-in-out',
  display: 'inline-flex',
  ':focus-within': {
    boxShadow: '0 3px 9px #4a4a4a5c',
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
  height: '48px',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'all 0.12s ease-in-out',
  display: 'inline-flex',
  border: '0',
  outline: 'none'
});
const EnhancedSearchInput = withOnEnter(SearchInput);

const NotificationRow = styled('tr')({
  position: 'relative',
  cursor: 'pointer',
  borderBottom: '1px solid #f2f2f2',
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

const NotificationTitle = styled('span')({
  position: 'relative',
}, ({img}) => img && ({
  paddingLeft: 20,
  '::before': {
    content: "''",
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
  fontSize: 15
});

const PRIssue = styled(Repository)({
  fontWeight: 400,
});

const Table = styled('table')({
  display: 'block',
  'td': {
    display: 'inline-block'
  }
});

const TableHeader = styled('h2')({
  fontWeight: 500,
  fontSize: 34,
  color: 'rgba(0, 0, 0, 0.86)',
  letterSpacing: '-0.05px',
  margin: '20px 15px 0',
});

const TableItem = styled('td')({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}, ({width}) => ({
  width
}));

function getPRIssueIcon (type, reasons) {
  const grow = 1.2;

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
  notifications,
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

  let filterMethod = () => true;
  switch (activeFilter) {
    case Filters.REVIEW_REQUESTED:
      filterMethod = n => n.reasons[0].reason === 'review_requested';
      break;
    case Filters.PARTICIPATING:
      filterMethod = n => (
        n.reasons.some(({ reason }) => (
          reason === 'review_requested' ||
          reason === 'assign' ||
          reason === 'mention' ||
          reason === 'author'
        ))
      );
      break;
    case Filters.SUBSCRIBED:
      filterMethod = n => n.reasons[0].reason === 'subscribed';
      break;
    case Filters.ALL:
    default:
      filterMethod = () => true;
  }

  notifications = notifications
    .filter(filterMethod)
    .sort((a, b) => a.repository.localeCompare(b.repository))
    .map(decorateWithScore)
    .sort((a, b) => b.score - a.score);

  console.warn(notifications)

  const notificationsQueued = notifications.filter(n => n.status === Status.QUEUED);
  const notificationsStaged = notifications.filter(n => n.status === Status.STAGED);

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
            onClick={!isLoading ? (() => onFetchNotifications()) : undefined}
          />
        </Tab>
        <Tab disabled={isLoading}>
          <Icon.Trash
            opacity={0.9}
            onClick={!isLoading ? (() => onClearCache()) : undefined}
          />
        </Tab>
        <Tab>
          <div style={{
            position: 'relative',
            height: 24,
            width: 24,
            fontSize: 14,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {notifications.length}
          </div>
        </Tab>
      </GeneralOptionsContainer>
      <NotificationsContainer>
        <Sidebar>
          <FixedContainer>
            <SidebarLink
              active={activeFilter === Filters.ALL}
              color="#6772e5"
              onClick={() => onSetActiveFilter(Filters.ALL)}
            >
              {activeFilter === Filters.ALL ? (
                <Icon.InboxWhite shrink={.6} />
              ) : (
                <Icon.Inbox shrink={.6} />
              )}
              all notifications
            </SidebarLink>
            <SidebarLink
              active={activeFilter === Filters.PARTICIPATING}
              color="#00A0F5"
              onClick={() => onSetActiveFilter(Filters.PARTICIPATING)}
            >
              {activeFilter === Filters.PARTICIPATING ? (
                <Icon.PeopleWhite shrink={.6} />
              ) : (
                <Icon.People shrink={.6} />
              )}
              participating
            </SidebarLink>
          </FixedContainer>
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
            <Table>
              <tbody>
                <TableHeader>Queued</TableHeader>
                {notificationsQueued.map(n => (
                  <NotificationRow key={n.id}>
                  <TableItem width={100}>
                    <InlineBlockContainer>
                      <Icon.Hot shrink={0.9} />
                      <Icon.Alarm shrink={0.9} />
                    </InlineBlockContainer>
                  </TableItem>
                    <TableItem>
                      <div style={{ float: 'left', marginTop: 2 }}>
                        {getPRIssueIcon(n.type, n.reasons)}
                      </div>
                    </TableItem>
                    <TableItem width={400} onClick={() => {
                      window.open(n.url);
                      onStageThread(n.id)
                    }}>
                      <NotificationTitle>
                        <PRIssue alt="njksjnksdknjgf">{n.name}</PRIssue>
                      </NotificationTitle>
                    </TableItem>
                    <TableItem width={200}>
                      <Repository>{n.reasons.map(r => r.reason).join(', ')}</Repository>
                    </TableItem>
                    <TableItem width={150}>
                      <Repository>{n.repository}</Repository>
                    </TableItem>
                    <TableItem width={100} style={{textAlign: 'right'}}>
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
                    {/* <p>Last read at {n.last_read_at ? moment(n.last_read_at).format('dddd h:mma') : 'never'}</p>
                    <p>Last updated at {moment(n.last_updated).format('dddd h:mma')}</p> */}
                  </NotificationRow>
                ))}
                <TableHeader style={{marginTop: 50}}>Staged</TableHeader>
                {notificationsStaged.map(n => (
                  <NotificationRow key={n.id}>
                  <TableItem width={100}>
                    <InlineBlockContainer>
                      <Icon.Hot shrink={0.9} />
                      <Icon.Alarm shrink={0.9} />
                    </InlineBlockContainer>
                  </TableItem>
                    <TableItem>
                      <div style={{ float: 'left', marginTop: 2 }}>
                        {getPRIssueIcon(n.type, n.reasons)}
                      </div>
                    </TableItem>
                    <TableItem width={400} onClick={() => window.open(n.url)}>
                      <NotificationTitle>
                        <PRIssue>{n.name}</PRIssue>
                      </NotificationTitle>
                    </TableItem>
                    <TableItem width={200}>
                      <Repository>{n.reasons.map(r => r.reason).join(', ')}</Repository>
                    </TableItem>
                    <TableItem width={150}>
                      <Repository>{n.repository}</Repository>
                    </TableItem>
                    <TableItem width={100} style={{textAlign: 'right'}}>
                      <NotificationTab>
                        <Icon.X
                          opacity={0.9}
                          onClick={!isLoading ? (() => onMarkAsRead(n.id)) : undefined}
                        />
                      </NotificationTab>
                    </TableItem>
                    {/* <p>Last read at {n.last_read_at ? moment(n.last_read_at).format('dddd h:mma') : 'never'}</p>
                    <p>Last updated at {moment(n.last_updated).format('dddd h:mma')}</p> */}
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

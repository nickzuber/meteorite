/** @jsx jsx */

import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import {css, jsx, keyframes} from '@emotion/core';
import {useSpring, useTransition, animated} from 'react-spring'
import Icon from '../../../components/Icon';
import Logo from '../../../components/Logo';
import LoadingIcon from '../../../components/LoadingIcon';
import {Reasons, Badges} from '../../../constants/reasons';
import {withOnEnter} from '../../../enhance';
import {Sort, View} from '../index';

const WHITE = 'rgb(255, 254, 252)';
const COLLAPSED_WIDTH = '72px';
const EXPANDED_WIDTH = '286px';
const Mode = {
  ALL: 0,
  REVIEWS: 1,
  COMMENTED: 2
};

// ========================================================================
// START OF 'MOVE TO A UTILS FILE'
// ========================================================================

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

function getPRIssueIcon (type, _reasons) {
  const scale = 1.5;
  switch (type) {
    case 'PullRequest':
      return (
        <NotificationIconWrapper>
          <i className="fas fa-code-branch" css={css`
            color: #4C84FF;
            font-size: 18px;
          `}></i>
        </NotificationIconWrapper>
      );
    case 'Issue':
      return (
        <NotificationIconWrapper>
          <Icon.IssueOpen shrink={scale} />
        </NotificationIconWrapper>
      );
    default:
      return null;
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

function getMessageFromReasons (reasons, type) {
  switch (reasons[reasons.length - 1].reason) {
    case Reasons.ASSIGN:
      return 'You were assigned';
    case Reasons.AUTHOR:
      return 'There was activity on this thread you created';
    case Reasons.COMMENT:
      return 'Somebody left a comment';
    case Reasons.MENTION:
      return 'You were mentioned';
    case Reasons.REVIEW_REQUESTED:
      return 'Your review was requested';
    case Reasons.SUBSCRIBED:
      return 'There was an update and you\'re subscribed';
    case Reasons.OTHER:
    default:
      return 'Something was updated';
  }
}

function createColorOfScore (min, max) {
  return function (score) {
    const ratio = (score - min) / (max - min);
    if (ratio > .9) return '#ec1461';
    if (ratio > .8) return '#ec5314';
    if (ratio > .7) return '#ec5314';
    if (ratio > .6) return '#ec7b14';
    if (ratio > .5) return '#ec7b14';
    if (ratio > .4) return '#ec9914';
    if (ratio > .3) return '#ec9914';
    if (ratio > .2) return '#ecad14';
    if (ratio > .1) return '#ecad14';
    return '#ecc114';
  }
}

// ========================================================================
// END OF 'MOVE TO A UTILS FILE'
// ========================================================================

const loadingKeyframe = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Container = styled('div')`
  position: relative;
  display: block;
  background: ${WHITE};
  height: calc(100% - ${COLLAPSED_WIDTH});
`;

const Row = styled('div')`
  position: relative;
  display: block;
  display: flex;
  flex-direction: row;
`;

const Item = styled('div')`
  position: relative;
  display: inline-block;
  transition: all 200ms ease;
`;

const MenuHeaderItem = styled(Item)`
  height: ${COLLAPSED_WIDTH};
  width: ${({expand}) => expand ? EXPANDED_WIDTH : COLLAPSED_WIDTH};
  border-bottom: 1px solid #EDEEF0;
  border-right: 1px solid #EDEEF0;
  z-index: 1;
`;

const ContentHeaderItem = styled(Item)`
  height: ${COLLAPSED_WIDTH};
  width: calc(100% - ${COLLAPSED_WIDTH});
  border-bottom: 1px solid #E5E6EB;
  z-index: 1;
`;

const MenuContainerItem = styled(Item)`
  width: ${({expand}) => expand ? EXPANDED_WIDTH : COLLAPSED_WIDTH};
  height: 100%;
`;

// Faded blue: #F5F6FA
// Faded gray: #fbfbfb
const ContentItem = styled(Item)`
  height: 100%;
  min-height: calc(100vh - ${COLLAPSED_WIDTH});
  width: calc(100% - ${COLLAPSED_WIDTH});
  background: #f7f6f3;
  border-left: 1px solid #E5E6EB;
`;

const CardSection = styled('div')`
  float: left;
  display: inline-block;
  width: 330px;
  padding: 0 16px;
`;

const Card = styled('div')`
  width: 298px;
  height: 100px;
  margin: 32px auto 0;
  background: ${WHITE};
  border: 1px solid #E5E6EB;
  box-shadow: rgba(84, 70, 35, 0) 0px 2px 8px, rgba(84,70,35,0.15) 0px 1px 3px;
  border-radius: 6px;
`;

const IconContainer = styled('div')`
  position: relative;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: all 200ms ease;
  &:after {
    transition: all 200ms ease;
    content: "";
    position: absolute;
    width: 3px;
    background: ${props => !props.noBorder && props.selected ? props.primary : WHITE};
    right: 0;
    top: 4px;
    bottom: 4px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  i {
    transition: all 200ms ease;
    color: ${props => props.selected ? props.primary : '#BFC5D1'}
  }
  &:hover {
    background: ${props => props.selected ? WHITE : 'rgba(233, 233, 233, .25)'};
    i {
      color: ${props => props.selected ? props.primary : '#616671'}
    }
  }
`;

const NotificationsSection = styled('div')`
  display: inline-block;
  width: calc(100% - 362px - 68px);
  padding-top: 36px;
  padding-right: 68px;
  padding-left: 0;
  padding-bottom: 0;
  height: auto;
`;

const TitleSection = styled('div')`
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  height: auto;
`;

const SubTitleSection = styled('div')`
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  height: auto;
  h4 {
    margin: 8px 0;
    font-weight: 500;
    font-size: 1rem;
    color: #19223dab;
  }
`;

const Title = styled('h1')`
  margin: 0;
  font-size: 2rem;
  line-height: 3rem;
  font-weight: 500;
  letter-spacing: -1.05px;
`;

const UnorderedList = styled('ul')`
  position: relative;
  width: 100%;
  margin-top: 0;
  padding: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
`;

const PageSelection = styled(UnorderedList)`
  border-bottom: 2px solid #e5e6eb;
`;

const SearchField = styled('div')`
  position: relative;
  float: left;
  text-align: left;
  align-items: center;
  height: 36px;
  font-size: 13px;
  display: inline-flex;
  margin: 0 24px;
  background: rgba(255, 255, 255, 0.125);
  border-radius: 4px;
  padding: 0px;
  text-decoration: none;
  transition: all 0.06s ease-in-out 0s;
  border: 1px solid #bfc5d161;
  &:hover {
    border: 1px solid #bfc5d1aa;
  }
  &:focus-within {
    border: 1px solid #457cff;
    box-shadow: rgba(84,70,35,0.01) 0px 2px 19px 8px, rgba(84, 70, 35, 0.11) 0px 2px 12px;
  }
  i {
    color: #bfc5d1;
    height: 36px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
`;

const SearchInput = styled('input')`
  position: relative;
  text-align: left;
  transition: all 200ms ease;
  height: 36px;
  font-size: 13px;
  display: inline-flex;
  flex: 1 1 0%;
  font-weight: 500;
  margin: 0px auto;
  background: none;
  width: 184px;
  padding: 0px;
  text-decoration: none;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  outline: none;
  opacity: 0.5;
  &:focus {
    opacity: 1;
    color: rgb(55, 53, 47);
    width: 300px;
  }
`;
const EnhancedSearchInput = withOnEnter(SearchInput);

const PageItemComponent = styled('li')`
  font-size: 14px;
  padding: 0 32px 0 16px;
  width: 112px;
  position: relative;
  height: 100%;
  line-height: 52px;
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: all 200ms ease;
  font-weight: ${props => props.selected ? 600 : 400};
  &:hover {
    background: rgba(233, 233, 233, .5);
  }
  &:active {
    background: rgba(233, 233, 233, .75);
  }
  &:after {
    transition: all 200ms ease;
    content: "";
    position: absolute;
    width: 100%;
    background: ${props => props.selected ? props.primary : 'none'};
    right: 0;
    bottom: -2px;
    left: 0;
    height: 3px;
  }
`;

const InteractionSection = styled('ul')`
  position: relative;
  width: 50px;
  height: 50px;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  li {
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    user-select: none;
  }
`;

const InteractionMenu = styled('div')`
  height: ${props => props.show ? 338 : 0}px;
  opacity: ${props => props.show ? 1 : 0};
  top: 32px;
  left: 32px;
  margin-left: 2px;
  overflow: hidden;
  cursor: initial;
  position: absolute;
  z-index: 2;
  transition: all 200ms ease;
  div {
    margin: 0;
    height: auto;
    div {
      margin: 0;
      padding: 12px 16px;
      cursor: pointer;
      outline: none;
      user-select: none;
      transition: all 200ms ease;
      &:hover {
        background: rgba(233, 233, 233, .25);
      }
      h2 {
        margin: 0 0 4px;
        font-size: 15px;
      }
      p {
        margin: 0;
        font-size: 13px;
        opacity: 0.7;
      }
    }
  }
`;

const SortingItemComponent = styled('div')`
  display: flex;
  height: auto;
  margin-right: 12px;
  cursor: pointer;
  outline: none;
  user-select: none;
  span {
    text-transform: uppercase;
    font-size: 11px;
    margin-right: 8px;
    font-weight: 600;
    color: ${props => props.selected ? '#8c93a5' : '#8c93a5a1'};
  }
  span:hover {
    color: #8c93a5dd;
  }
  span:active {
    color: #8c93a5;
  }
  i {
    font-size: 13px;
    line-height: 15px;
    color: ${props => props.selected ? '#8c93a5' : '#8c93a5a1'};
  }
`;

const NotificationsTable = styled('table')`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const NotificationRowHeader = styled('tr')`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: left;
  margin: 0 auto;
  padding: 8px 24px 8px;
  box-sizing: border-box;
`;

const NotificationRow = styled(NotificationRowHeader)`
  position: relative;
  background: ${WHITE};
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 14px;
  margin-bottom: 12px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  transition: all 200ms ease;
  &:hover {
    box-shadow: rgba(84,70,35,0.01) 0px 2px 19px 8px, rgba(84, 70, 35, 0.11) 0px 2px 12px;
  };
  &:active {
    background: rgb(252, 250, 248);
  };
`;

const LoadingNotificationRow = styled(NotificationRowHeader)`
  position: relative;
  background: ${WHITE};
  height: 62px;
  overflow: hidden;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 14px;
  margin-bottom: 12px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  transition: all 200ms ease;
  opacity: 0.75;
  &:after {
    background: linear-gradient(90deg, transparent, #f9f8f5, transparent);
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateX(-100%);
    animation: ${loadingKeyframe} 2.0s infinite;
  }
`;

const NotificationBlock = styled('tbody')``;

const AnimatedNotificationRow = animated(NotificationRow);
const AnimatedNotificationsBlock = animated(NotificationBlock);

const NotificationCell = styled('td')`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: ${props => {
    if (props.width) {
      return `0 0 ${props.width}px`;
    } else {
      return props.flex || 1;
    }
  }};
`;

const NotificationTitle = styled('span')``;
const NotificationByline = styled('span')`
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #8893a7cc;
  i {
    margin-right: 4px;
    font-size: 10px;
    color: #8893a7cc;
  }
  span {
    margin-left: 12px;
    font-size: 12px;
    font-weight: 500;
    color: #8893a7cc;
    i {
      margin-right: 4px;
      font-size: 9px;
      color: #8893a7cc;
    }
  }
`;

const ProfileContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #edeef0;
  padding: 0 22px;
  position: absolute;
  right: 0;
  transition: all 200ms ease;
  user-select: none;
  cursor: pointer;
  i {
    transition: all 200ms ease;
    color: #bfc5d1a3
  }
  &:hover {
    background: rgba(233, 233, 233, .25);
    i {
      color: #bfc5d1
    }
  }
`;

const ProfileName = styled('span')`
  font-size: 14px;
  font-weight: 500;
  margin: 0 12px;
`;

const ProfilePicture = styled('img')`
  height: 36px;
  width: 36px;
  border-radius: 4px;
`;

const NotificationIconWrapper = styled('div')`
  background: #DBE7FF;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  transform: scale(.65);
`;

const IconLink = styled('span')`
  position: relative;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  user-select: none;
  height: 40px;
  width: 40px;
  transition: all 150ms ease;
  i {
    color: ${props => props.disabled ? '#bfc5d1' : 'inherit'};
  }
  &:before {
    content: "";
    transition: all 150ms ease;
    background: #BFC5D122;
    border-radius: 100%;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scale(0);
  }
  &:hover:before {
    transform: ${props => props.disabled ? 'scale(0)' : 'scale(1)'};
  }
  &:active:before {
    background: ${props => props.disabled ? '#BFC5D122' : '#BFC5D144'};;
  }
`;

const Divider = styled('div')`
  position: relative;
  display: inline-block;
  background: #e5e6eb;
  height: 28px;
  width: 2px;
  margin: 0 8px;
`;

function PageItem ({children, onChange, ...props}) {
  return (
    <PageItemComponent
      onClick={() => onChange(props.view)}
      {...props}
    >
      {children}
    </PageItemComponent>
  );
}

function MenuIconItem ({children, onChange, selected, alwaysActive, noBorder, ...props}) {
  return (
    <IconContainer
      onClick={() => onChange(props.mode)}
      selected={alwaysActive || selected}
      noBorder={noBorder}
      {...props}
    >
      {children}
    </IconContainer>
  );
}

function SortingItem ({children, selected, onChange, descending, setDescending, ...props}) {
  return (
    <SortingItemComponent
      selected={selected}
      onClick={() => {
        if (selected) {
          setDescending(!descending);
        } else {
          setDescending(false);
        }
        onChange(props.sort)
      }}
    >
      <span {...props}>
        {children}
      </span>
      <i css={css`
        transition: all 200ms ease;
        opacity: ${selected ? 1 : 0};
        transform: ${descending ? 'rotate(180deg)' : 'rotate(0deg)'};
      `} className="fas fa-caret-up"></i>
    </SortingItemComponent>
  );
}

export default function Scene ({
  notifications,
  notificationsPermission,
  highestScore,
  lowestScore,
  hasUnread,
  unreadCount,
  readCount,
  archivedCount,
  loading,
  isLastPage,
  isFirstPage,
  page,
  onChangePage,
  sort,
  descending,
  setSort,
  setDescending,
  view,
  setView,
  query,
  onClearQuery,
  onSearch,
  isSearching,
  user,
  onFetchNotifications,
  onMarkAllAsStaged,
  onClearCache,
  setNotificationsPermission,
  onStageThread,
  onArchiveThread,
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [mode, setMode] = React.useState(Mode.ALL);
  const hasNotificationsOn = notificationsPermission === 'granted';

  // @TODO move to index file
  if (sort === Sort.TITLE) {
    if (descending) {
      notifications.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      notifications.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  // const notificationTransitions = useTransition(notifications, item => item.id, {
  //   from: {background: 'green', opacity: 0, transform: 'translate3d(50px, 0, 0)'},
  //   enter: {background: 'yellow', opacity: 1, transform: 'translate3d(0, 0, 0)'},
  //   leave: {opacity: 0, transform: 'translate3d(-50px, 0, 0)', display: 'none'},
  //   unique: true,
  //   trail: 50,
  //   config: {
  //     tension: 300,
  //     duration: 1000,
  //   }
  // });

  React.useEffect(() => {
    const body = window.document.querySelector('body');
    const hideDropdownMenu = () => setDropdownOpen(false);
    body.addEventListener('click', hideDropdownMenu);
    return () => body.removeEventListener('click', hideDropdownMenu);
  }, []);

  return (
    <Container>
      <Row css={css`
        position: fixed;
        top: 0;
        height: ${COLLAPSED_WIDTH};
        background: ${WHITE};
        z-index: 10;
        width: 100%;
      `}>
        <MenuHeaderItem expand={menuOpen}>
          <MenuIconItem
            alwaysActive
            noBorder
            primary="#BFC5D1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars"></i>
          </MenuIconItem>
        </MenuHeaderItem>
        <ContentHeaderItem css={css`
            display: inline-flex;
            align-items: center;
        `}>
          <SearchField>
            <i className="fas fa-search"></i>
            <EnhancedSearchInput
              disabled={loading}
              onClick={event => event.target.select()}
              type="text"
              placeholder="Search for notifications"
              onEnter={onSearch}
            />
            {isSearching && <LoadingIcon size={36} style={{
              transition: 'all 100ms ease',
              position: 'absolute',
              right: 0,
              transform: 'scale(0.8)',
              backgroundColor: 'white'
            }} />}
          </SearchField>
          <Logo
            style={{left: '50%', marginLeft: -18, position: 'absolute', opacity: 0.25}}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            size={36}
          />
          {user && (
            <ProfileContainer>
              <ProfilePicture src={user.avatar_url} />
              <ProfileName>{user.name}</ProfileName>
              <i className="fas fa-caret-down"></i>
            </ProfileContainer>
          )}
        </ContentHeaderItem>
      </Row>
      <Row css={css`
        height: calc(100% - ${COLLAPSED_WIDTH});
        margin-top: ${COLLAPSED_WIDTH};
      `}>
        <MenuContainerItem expand={menuOpen}>
          <MenuIconItem
            mode={Mode.ALL}
            primary="#4caf50"
            selected={mode === Mode.ALL}
            onChange={setMode}
            style={{margin: '8px 0'}}
          >
            <i className="fas fa-seedling"></i>
          </MenuIconItem>
          <MenuIconItem
            mode={Mode.REVIEWS}
            primary="#e91e63"
            selected={mode === Mode.REVIEWS}
            onChange={setMode}
            style={{margin: '8px 0'}}
          >
            <i className="fas fa-fire"></i>
          </MenuIconItem>
          <MenuIconItem
            mode={Mode.COMMENTED}
            primary="#4C84FF"
            selected={mode === Mode.COMMENTED}
            onChange={setMode}
            style={{margin: '8px 0'}}
          >
            <i className="fas fa-splotch"></i>
          </MenuIconItem>
        </MenuContainerItem>
        <ContentItem>
          <CardSection>
            <Card />
            <Card />
          </CardSection>
          <NotificationsSection>
            <TitleSection>
              <Title>{'Updates'}</Title>
              <InteractionSection>
                <li onClick={() => setDropdownOpen(true)}>
                  <IconLink>
                    <i className="fas fa-ellipsis-v"></i>
                  </IconLink>
                  <InteractionMenu show={dropdownOpen}>
                    <Card>
                      <div onClick={event => {
                        event.stopPropagation();
                        onFetchNotifications();
                        setDropdownOpen(false);
                      }}>
                        <h2>Reload notifications</h2>
                        <p>Manually fetch new notifications instead of waiting for the sync</p>
                      </div>
                      <div onClick={event => {
                        event.stopPropagation();
                        const response = window.confirm('Are you sure you want to mark all your notifications as read?');
                        void (response && onMarkAllAsStaged());
                        setDropdownOpen(false);
                      }}>
                        <h2>Mark all as read</h2>
                        <p>Move all your unread notifications to the read tab</p>
                      </div>
                      <div onClick={event => {
                        event.stopPropagation();
                        const response = window.confirm('Are you sure you want to clear the cache?');
                        void (response && onClearCache());
                        setDropdownOpen(false);
                      }}>
                        <h2>Empty cache</h2>
                        <p>Clear all the notifications that are being tracked in your local storage</p>
                      </div>
                      <div onClick={event => {
                        event.stopPropagation();
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
                        setDropdownOpen(false);
                      }}>
                        <h2>Turn {hasNotificationsOn ? 'off' : 'on'} notifications</h2>
                        <p>
                          {hasNotificationsOn
                            ? 'Stop receiving web notifications when you get a new update'
                            : 'Receive web notifications whenever you get a new update'
                          }
                        </p>
                      </div>
                    </Card>
                  </InteractionMenu>
                </li>
              </InteractionSection>
            </TitleSection>
            <SubTitleSection>
              <h4>See all of the notifications that matter to you</h4>
            </SubTitleSection>
            <PageSelection>
              <PageItem
                view={View.UNREAD}
                selected={view === View.UNREAD}
                primary="#4C84FF"
                onChange={setView}
                mark={hasUnread}
              >
                {'Unread'}
                {unreadCount > 0 && (
                  <span css={css`
                    transition: all 200ms ease;
                    background: ${view === View.UNREAD ? '#4880ff' : '#bfc5d1'};
                    color: ${WHITE};
                    font-size: 9px;
                    margin: 0 6px;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 600;
                    vertical-align: middle;
                  `}>
                    {unreadCount}
                  </span>
                )}
              </PageItem>
              <PageItem
                view={View.READ}
                selected={view === View.READ}
                primary="#4C84FF"
                onChange={setView}
              >
                {'Read'}
                {readCount > 0 && (
                  <span css={css`
                    transition: all 200ms ease;
                    background: ${view === View.READ ? '#4880ff' : '#bfc5d1'};
                    color: ${WHITE};
                    font-size: 9px;
                    margin: 0 6px;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 600;
                    vertical-align: middle;
                  `}>
                    {readCount}
                  </span>
                )}
              </PageItem>
              <PageItem
                view={View.ARCHIVED}
                selected={view === View.ARCHIVED}
                primary="#4C84FF"
                onChange={setView}
              >
                {'Archived'}
                {archivedCount > 0 && (
                  <span css={css`
                    transition: all 200ms ease;
                    background: ${view === View.ARCHIVED ? '#4880ff' : '#bfc5d1'};
                    color: ${WHITE};
                    font-size: 9px;
                    margin: 0 6px;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 600;
                    vertical-align: middle;
                  `}>
                    {archivedCount}
                  </span>
                )}
              </PageItem>
              <div css={css`
                height: auto;
                position: absolute;
                display: flex;
                right: 0;
                justify-content: center;
                align-items: center;
              `}>
                {query && (
                  <>
                    <span css={css`
                      font-size: 13px;
                      color: #797d8c;
                      font-weight: 500;
                      vertical-align: text-top;
                      margin-right: 8px;
                      span {
                        font-size: 13px;
                        color: #37352f;
                        font-weight: 600;
                        vertical-align: text-top;
                      }
                    `}>
                      {'Showing results for '}
                      <span>{query}</span>
                    </span>
                    <IconLink
                      onClick={!loading ? (() => onClearQuery()) : undefined}
                    >
                      <i className="fas fa-times"></i>
                    </IconLink>
                    <Divider />
                  </>
                )}
                <IconLink
                  disabled={loading || isFirstPage}
                  onClick={!loading && !isFirstPage ? (() => onChangePage(page - 1)) : undefined}
                >
                  <i className="fas fa-chevron-left"></i>
                </IconLink>
                <IconLink
                  disabled={loading || isLastPage}
                  onClick={!loading && !isLastPage ? (() => onChangePage(page + 1)) : undefined}
                >
                  <i className="fas fa-chevron-right"></i>
                </IconLink>
              </div>
            </PageSelection>
            <NotificationsTable>
              <NotificationRowHeader>
                {/* Type */}
                <NotificationCell width={70}>
                  <SortingItem
                    sort={Sort.TYPE}
                    descending={descending}
                    setDescending={setDescending}
                    selected={sort === Sort.TYPE}
                    onChange={setSort}
                  >
                    {'Type'}
                  </SortingItem>
                </NotificationCell>
                {/* Title */}
                <NotificationCell flex={4}>
                  <SortingItem
                    sort={Sort.TITLE}
                    descending={descending}
                    setDescending={setDescending}
                    selected={sort === Sort.TITLE}
                    onChange={setSort}
                  >
                    {'Title'}
                  </SortingItem>
                </NotificationCell>
                {/* Repository */}
                <NotificationCell flex={2}>
                  <SortingItem
                    sort={Sort.REPOSITORY}
                    descending={descending}
                    setDescending={setDescending}
                    selected={sort === Sort.REPOSITORY}
                    onChange={setSort}
                  >
                    {'Repository'}
                  </SortingItem>
                </NotificationCell>
                {/* Score */}
                <NotificationCell width={60}>
                  <SortingItem
                    sort={Sort.SCORE}
                    descending={descending}
                    setDescending={setDescending}
                    selected={sort === Sort.SCORE}
                    onChange={setSort}
                  >
                    {'Score'}
                  </SortingItem>
                </NotificationCell>
                {/* Actions */}
                <NotificationCell width={70}>
                  &nbsp;
                </NotificationCell>
              </NotificationRowHeader>
              {loading ? (
                <NotificationBlock>
                  <LoadingNotificationRow />
                  <LoadingNotificationRow />
                  <LoadingNotificationRow />
                  <LoadingNotificationRow />
                  <LoadingNotificationRow />
                  <LoadingNotificationRow />
                  <LoadingNotificationRow />
                </NotificationBlock>
              ) : (
                <NotificationCollection
                  notifications={notifications}
                  page={page}
                  colorOfScore={createColorOfScore(lowestScore, highestScore)}
                  markAsRead={onStageThread}
                  markAsArchived={onArchiveThread}
                />
              )}
            </NotificationsTable>
          </NotificationsSection>
        </ContentItem>
      </Row>
    </Container>
  );
}

function NotificationCollection ({
  notifications,
  colorOfScore,
  markAsRead,
  markAsArchived,
  page
}) {
  const props = useSpring({
    from: {opacity: 0},
    to: {opacity: 1},
    config: {
      duration: 200,
    }
  });

  return (
    <AnimatedNotificationsBlock style={props} page={page}>
      {notifications.map(item => (
        <AnimatedNotificationRow key={notifications.id}>
          {/* Type */}
          <NotificationCell width={80}>
            {getPRIssueIcon(item.type, item.reasons)}
          </NotificationCell>
          {/* Title */}
          <NotificationCell
            flex={4}
            onClick={() => {
              window.open(item.url);
              markAsRead(item.id, item.repository);
            }}
            css={css`
              font-weight: 500;
          `}>
            <NotificationTitle>
              {item.name}
            </NotificationTitle>
            <NotificationByline>
              {getMessageFromReasons(item.reasons, item.type)}
              {` ${getRelativeTime(item.updated_at).toLowerCase()}`}
            </NotificationByline>
          </NotificationCell>
          {/* Repository */}
          <NotificationCell
            flex={2}
            onClick={() => window.open(item.repositoryUrl)}
            css={css`
              font-weight: 500;
              color: #8994A6;
          `}>
            {'@' + item.repository}
          </NotificationCell>
          {/* Score */}
          <NotificationCell width={60} css={css`
            font-weight: 600;
            color: ${colorOfScore(item.score)};
            font-size: 12px;
            text-align: center;
          `}>
            {'+' + item.score}
          </NotificationCell>
          <NotificationCell width={80} css={css`
            i {
              padding: 13px 0;
              text-align: center;
              width: 40px;
            }
          `}>
            <IconLink onClick={() => markAsRead(item.id, item.repository)}>
              <i className="fas fa-check"></i>
            </IconLink>
            <IconLink onClick={() => markAsArchived(item.id, item.repository)}>
              <i className="fas fa-times"></i>
            </IconLink>
          </NotificationCell>
        </AnimatedNotificationRow>
      ))}
    </AnimatedNotificationsBlock>
  );
}

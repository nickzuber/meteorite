/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import Typed from 'typed.js';
import {animated} from 'react-spring'
import {css, jsx} from '@emotion/core';
import { compose } from 'recompose';
import {useSpring} from 'react-spring'
import {AreaChart, Area, XAxis, Tooltip} from 'recharts';
import {ReactComponent as BlankCanvasSvg} from '../../../images/svg/blank.svg'
import Logo from '../../../components/Logo';
import LoadingIcon from '../../../components/LoadingIcon'
import {getFact} from '../../../utils/facts';
import {Mode, Sort, View} from '../index';
import {withTooltip} from '../../../enhance';
import EmptyState from './ui/EmptyState';
import {
  stringOfError,
  getPRIssueIcon,
  getRelativeTime,
  getMessageFromReasons,
  iconsOfBadges,
  createColorOfScore,
  getPercentageDelta,
  prettify,
  titleOfFilter,
  subtitleOfMode,
  colorOfTag,
  extractJiraTags
} from './utils';
import {
  WHITE,
  FOOTER_HEIGHT,
  COLLAPSED_WIDTH,
  WIDTH_FOR_MEDIUM_SCREENS,
  WIDTH_FOR_SMALL_SCREENS,
  Title,
  Container,
  Row,
  MenuHeaderItem,
  ContentHeaderItem,
  MenuContainerItem,
  ContentItem,
  CardSection,
  Card,
  CardTitle,
  CardSubTitle,
  IconContainer,
  ScoreDiff,
  NotificationsSection,
  TitleSection,
  SubTitleSection,
  PageSelection,
  SearchField,
  EnhancedSearchInput,
  Dropdown,
  PageItemComponent,
  InteractionSection,
  InteractionMenu,
  SortingItemComponent,
  NotificationsTable,
  NotificationRowHeader,
  NotificationRow,
  LoadingNotificationRow,
  NotificationBlock,
  ErrorContainer,
  NotificationCell,
  NotificationTitle,
  NotificationByline,
  IconLink,
  Divider,
  Connector,
  RepoBarContainer,
  ProfileSection,
  LinkText,
  Bar,
  JiraTag,
  DarkTheme,
  ThemeColor,
  ThemeContext,
  optimized
} from './ui';
import {ToastProvider, useToasts} from 'react-toast-notifications';
import {Status} from '../../../constants/status';
import {Filters} from '../../../constants/filters';
export const AnimatedNotificationRow = animated(NotificationRow);

const hash = process.localEnv.GIT_HASH ? `#${process.localEnv.GIT_HASH}` : '';
const version = require('../../../../package.json').version + hash;

const snackStates = {
  entering: 'transform: translateX(-120%); opacity: 0',
  entered: 'transform: translateX(0%); opacity: 1',
  exiting: 'transform: scale(0.9); opacity: 0',
  exited: 'transform: scale(0.9); opacity: 0'
};

const useTabFocused = () => {
  const [focused, setFocused] = React.useState(true);

  React.useEffect(() => {
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    }
  }, []);

  return focused;
}

const Snack = ({
  children,
  transitionState,
  onDismiss,
  action,
  dark,
  onUndo,
  autoDismissTimeout
}) => {
  const interval = 50; // ms
  const [paused, setPaused] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [countdown, setCountdown] = React.useState(autoDismissTimeout);
  const timer = React.useRef();
  const focused = useTabFocused();

  if (completed) {
    onDismiss();
  }

  React.useEffect(() => {
    const stop = () => clearInterval(timer.current);
    if (paused) return stop();
    if (completed) return stop();
    if (!focused) return stop();
    if (countdown <= 0) {
      setCompleted(true);
      return stop();
    }

    timer.current = setTimeout(() => {
      setCountdown(countdown => countdown -= interval);
      if (countdown <= 0) {
        setCompleted(true);
      }
    }, interval);
    return () => clearInterval(timer.current);
  }, [focused, paused, countdown, completed]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: ${dark ? DarkTheme.SecondaryAlt : WHITE};
        border: 1px solid ${dark ? DarkTheme.Secondary : '#ebecee'};
        box-shadow: rgba(0,0,0,0) 0px 2px 8px, rgba(0,0,0,0.25) 0px 2px 6px;
        border-radius: 6px;
        margin: 8px;
        overflow: hidden;
        height: 40px;
        max-width: 560px;
        min-width: 400px;
        padding: 8px 16px;
        transition: all 200ms ease;
        transform: translateX(-120%);
        ${snackStates[transitionState]};
        cursor: pointer;
        user-select: none;
        &:hover {
          background: ${dark ? '#162632' : '#f6f6f4'};
        }
        &:active {
          transform: scale(0.98);
        }
      `}
    >
      <div css={css`
        background: ${ThemeColor(dark)}29;
        border-radius: 100%;
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
        i {
          color: ${ThemeColor(dark)};
        }
      `}>
        {action === 'read' ? (
          <i className="fas fa-check"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
        <div css={css`
          background: ${ThemeColor(dark)}29;
          height: 35px;
          width: 35px;
          position: absolute;
          z-index: -1;
          transform: translateY(${35 - ((countdown / autoDismissTimeout) * 35)}px);
        `} />
      </div>
      <div css={css`
        margin: 8px 20px;
        display: flex;
        flex-direction: column;
        align-items: end;

        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 400px;
        }
      `} onClick={onDismiss}>
        {children}
      </div>
      <div css={css`
        user-select: none;
        cursor: pointer;
        height: 100%;
        position: relative;
        flex: 1;
        text-align: right;
        min-width: 40px;
      `}>
        <span css={css`
          font-size: 13px;
          font-weight: 500;
          color: ${dark ? WHITE : 'inherit'};
          transition: all 150ms ease;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 0;
          &:hover {
            opacity: 0.6;
          }
          &:active {
            opacity: 0.4;
          }
        `} onClick={() => {
          onDismiss();
          onUndo();
        }}>
          {'Undo'}
        </span>
      </div>
    </div>
  );
}

const withToastProvider = WrappedComponent => props => (
  <ToastProvider
    autoDismissTimeout={6000}
    components={{Toast: Snack}}
    placement="bottom-left"
  >
    <WrappedComponent {...props} />
  </ToastProvider>
);

const withToasts = WrappedComponent => props => {
  const {addToast} = useToasts();
  return (
    <WrappedComponent addToast={addToast} {...props} />
  );
};

function BasePageItem ({children, onChange, ...props}) {
  return (
    <PageItemComponent
      onClick={() => onChange(props.view)}
      {...props}
    >
      {children}
    </PageItemComponent>
  );
}

const PageItem = withTooltip(BasePageItem);

const ToastTitle = styled('div')(p => `
  font-size: 13px;
  font-weight: 500;
  margin: 2px 0;
  color: ${p.dark ? WHITE : 'inherit'};
`);

const ToastByline = styled('div')`
  font-size: 12px;
  font-weight: 500;
  color: #8893a7cc;
  margin: 2px 0;
`;

function BaseMenuIconItem ({children, onChange, selected, alwaysActive, noBorder, ...props}) {
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

const MenuIconItem = withTooltip(BaseMenuIconItem);

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
      {...props}
    >
      <span>
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

function CustomTick ({x, y, payload}) {
  if (!payload) return null;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#BFC5D1"
        fontWeight="600"
        transform="scale(0.65)"
      >
        {payload.value.substring(0, 2)}
      </text>
    </g>
  );
}

function RepoBarGroup ({reposReadCounts, highestRepoReadCount, colorOfRepoCount}) {
  const numReposToShow = 3;
  const [show, setShow] = React.useState(false);
  const repos = Object.keys(reposReadCounts).sort((a, b) => reposReadCounts[b] - reposReadCounts[a]);

  const shownRepos = repos.slice(0, numReposToShow);
  const hiddenRepos = repos.slice(numReposToShow);

  const totalCounts = Object.values(reposReadCounts).reduce((acc, c) => acc + c, 0)

  return (
    <>
      {shownRepos.map(repo => (
        <RepoBar
          key={repo}
          name={repo}
          value={reposReadCounts[repo]}
          max={totalCounts}
          colorOfValue={colorOfRepoCount}
        />
      ))}
      {hiddenRepos.length > 0 && (
        show ? (
          <>
            {hiddenRepos.map(repo => (
              <RepoBar
                key={repo}
                name={repo}
                value={reposReadCounts[repo]}
                max={totalCounts}
                colorOfValue={colorOfRepoCount}
              />
            ))}
            <LinkText onClick={() => setShow(false)}>Show less</LinkText>
          </>
        ) : (
          <LinkText onClick={() => setShow(true)}>Show more</LinkText>
        )
      )}
    </>
  );
}

function RepoBar ({name, value, max}) {
  return (
    <RepoBarContainer>
      <p>{name.split('/')[1]}</p>
      <span>{name.split('/')[0]}</span>
      <Bar
        title={`${value} out of ${max}`}
        value={value / max}
      />
    </RepoBarContainer>
  );
}

function ReadCountGraph ({data, onHover, onExit, dark}) {
  return (
    <AreaChart
      width={250}
      height={200}
      data={data}
      onMouseEnter={({activePayload}) => onHover(activePayload)}
      onMouseMove={({activePayload}) => onHover(activePayload)}
      onMouseLeave={onExit}
    >
      <defs>
        <linearGradient id="curGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="10%" stopColor={ThemeColor(dark)} stopOpacity={0.2}/>
          <stop offset="90%" stopColor={ThemeColor(dark)} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="prevGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="BFC5D166" stopOpacity={0}/>
          <stop offset="95%" stopColor="BFC5D166" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis
        dataKey="name"
        interval={0}
        tickSize={5}
        tick={<CustomTick />}
        tickFormatter={tick => tick.substring(0, 2)}
      />
      <Tooltip
        isAnimationActive={false}
        wrapperStyle={{
          opacity: 1
        }}
        contentStyle={{
          background: 'rgb(255,254,252)',
          border: '1px solid #E5E6EB',
          borderRadius: 6,
          boxShadow: 'rgba(84,70,35,0) 0px 2px 8px, rgba(84,70,35,0.15) 0px 1px 3px',
          minWidth: 100,
          padding: '6px 12px 8px'
        }}
        itemStyle={{
          transform: 'scale(0.85) translate(-10px, 1px)',
          fontWeight: '500',
          padding: 0,
          opacity: .75
        }}
        labelStyle={{
          color: 'rgb(55, 53, 47)',
          fontSize: 14,
          fontWeight: '600',
          padding: 0
        }}
        cursor={{
          stroke: '#BFC5D144',
          strokeWidth: 2
        }}
        animationDuration={400}
        labelFormatter={() => 'Notifications read'}
        formatter={(value, name) => {
          switch (name) {
            case 'cur':
              return [value, 'This week'];
            case 'prev':
              return [value, 'Last week'];
            default:
              return [value, name];
          }
        }}
      />
      <Area
        type="monotone"
        dataKey="prev"
        stroke="#BFC5D166"
        fill="url(#prevGradient)"
        strokeWidth="2"
        animationDuration={0}
        dot={{ stroke: '#00000000', fill: '#00000000', r: 0 }}
        activeDot={{ stroke: '#BFC5D166', fill: '#BFC5D166', r: 2 }}
      />
      <Area
        type="monotone"
        dataKey="cur"
        stroke={ThemeColor(dark)}
        fill="url(#curGradient)"
        strokeWidth="2"
        animationDuration={0}
        dot={{ stroke: '#00000000', fill: '#00000000', r: 0 }}
        activeDot={{ stroke: ThemeColor(dark), fill: ThemeColor(dark), r: 2 }}
      />
    </AreaChart>
  );
}

function pickRandom (collection) {
  return collection[Math.floor(Math.random() * collection.length)];
}

function TypedSpan ({source, toString, options = {}}) {
  const spanRef = React.useRef();
  const typed = React.useRef();

  function clean (string) {
    const illegalChars = new Set(['-']);
    return string.split(' ').filter(char => !illegalChars.has(char)).join(' ')
  }

  // return <span>{clean(toString(source[0]))}</span>

  React.useEffect(() => {
    const defaultOptions = {
      strings: source.map(toString).map(clean),
      startDelay: 100,
      typeSpeed: 50,
      backSpeed: 15,
      backDelay: 3000,
      loop: true,
      ...options
    };
    typed.current = new Typed(spanRef.current, defaultOptions);
    return () => typed.current.destroy();
  }, [source]);

  return <span ref={spanRef} />;
}

function Scene ({
  notifications,
  notificationsPermission,
  currentTime,
  highestScore,
  lowestScore,
  hasUnread,
  unreadCount,
  readCount,
  archivedCount,
  loading,
  error,
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
  onPinThread,
  onReadPinThread,
  readStatistics,
  readTodayCount,
  reposReadCounts,
  readTodayLastWeekCount,
  onRestoreThread,
  onLogout,
  mode,
  setMode,
  activeFilter,
  onSetActiveFilter,
  getUserItem,
  setUserItem,
  addToast
}) {
  const hasNotificationsOn = notificationsPermission === 'granted';
  const searchRef = React.useRef();
  const [exampleNotifications, setExampleNotifications] = React.useState([{
    name: 'Update README',
    repository: 'nickzuber/meteorite',
    score: 53
  }, {
    name: 'Update innerRef to allow React.createRef and React.forwardRef api usage    ',
    repository: 'robinpowered/glamorous-native',
    score: 78
  }, {
    name: 'Refactor and test updated logic',
    repository: 'nickzuber/infrared',
    score: 35
  }]);
  const [darkMode, setDarkMode] = React.useState(getUserItem('dark-mode-enabled'));
  const [fact, setFact] = React.useState(null);
  const [searchMenuOpened, setSearchMenuOpened] = React.useState(false);
  const [hasSearchInput, setHasSearchInput] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [counts, setCounts] = React.useState({
    cur: readTodayCount,
    prev: readTodayLastWeekCount
  });

  const onStageThreadWithToast = (thread_id, repository) => {
    const notification = notifications.find(({id}) => id === thread_id);
    const {title, tags} = extractJiraTags(notification.name);

    addToast((
      <React.Fragment>
        <ToastTitle dark={darkMode}>
          {tags.map(tag => (
            <JiraTag key={tag} css={css`vertical-align: middle;`} color={colorOfTag(tag)}>
              {tag}
            </JiraTag>
          ))}
          {title}
        </ToastTitle>
        <ToastByline>
          {'Notification was marked as read'}
        </ToastByline>
      </React.Fragment>
    ), {
      dark: darkMode,
      action: 'read',
      onUndo: () => onRestoreThread(thread_id)
    });
    onStageThread(thread_id, repository);
  }

  const onArchiveThreadWithToast = (thread_id, repository) => {
    const notification = notifications.find(({id}) => id === thread_id);
    const {title, tags} = extractJiraTags(notification.name);

    addToast((
      <React.Fragment>
        <ToastTitle dark={darkMode}>
          {tags.map(tag => (
            <JiraTag key={tag} css={css`vertical-align: middle;`} color={colorOfTag(tag)}>
              {tag}
            </JiraTag>
          ))}
          {title}
        </ToastTitle>
        <ToastByline>
          {'Notification was marked as archived'}
        </ToastByline>
      </React.Fragment>
    ), {
      dark: darkMode,
      action: 'archive',
      onUndo: () => onStageThread(thread_id, repository)
    });
    onArchiveThread(thread_id, repository);
  }

  readStatistics = readStatistics.map(n => parseInt(n, 10));
  const lastWeekStats = readStatistics.slice(0, 7);
  const thisWeekStats = readStatistics.slice(7);

  // Faux stats for pretty screenshots.
  // const lastWeekStats = [4, 2, 7, 4, 5, 8, 1];
  // const thisWeekStats = [7, 8, 5, 6, 4, 9, 12];

  const percentageDeltaToday = getPercentageDelta(counts.cur, counts.prev);
  const highestRepoReadCount = Object.values(reposReadCounts).reduce((h, c) => Math.max(h, c), 0);
  const colorOfRepoCount = createColorOfScore(0, highestRepoReadCount);

  const data = [
    // {name: 'Sunday', cur: thisWeekStats[0], prev: lastWeekStats[0]},
    {name: 'Monday', cur: thisWeekStats[1], prev: lastWeekStats[1]},
    {name: 'Tuesday', cur: thisWeekStats[2], prev: lastWeekStats[2]},
    {name: 'Wednesday', cur: thisWeekStats[3], prev: lastWeekStats[3]},
    {name: 'Thursday', cur: thisWeekStats[4], prev: lastWeekStats[4]},
    {name: 'Friday', cur: thisWeekStats[5], prev: lastWeekStats[5]},
    // {name: 'Saturday', cur: thisWeekStats[6], prev: lastWeekStats[6]},
  ];

  // Global event listeners for things like the dropdowns & popups.
  React.useEffect(() => {
    window.scrollTo(0, 0);
    const body = window.document.querySelector('body');
    const hideDropdownMenu = () => setDropdownOpen(false);
    const hideSearchFocused = () => setSearchMenuOpened(false);
    const eventType = 'click'; // isMobile ? 'touchend' : 'click';
    body.addEventListener(eventType, hideDropdownMenu);
    body.addEventListener(eventType, hideSearchFocused);
    return () => {
      body.removeEventListener(eventType, hideDropdownMenu);
      body.removeEventListener(eventType, hideSearchFocused);
    }
  }, []);

  // Updating the counts when new stats come in.
  React.useEffect(() => {
    setCounts({
      cur: readTodayCount,
      prev: readTodayLastWeekCount
    });
  }, [readTodayCount, readTodayLastWeekCount]);

  // Updating the fun fact only when the view changes.
  React.useEffect(() => {
    setFact(getFact());
  }, [view]);

  // Save the user's dark mode preference.
  React.useEffect(() => {
    setUserItem('dark-mode-enabled', darkMode);
  }, [darkMode]);

  React.useEffect(() => {
    if (notifications.length > 3) {
      const examples = notifications.slice(0, 5);
      setExampleNotifications(examples);
    }
  }, [view]);

  const setSearchField = text => {
    searchRef.current.value = text;
    searchRef.current.focus();
    setHasSearchInput(true);
  };

  return (
    <ThemeContext.Provider value={darkMode}>
      <Container>
        {/* Top search & profile bar */}
        <Row css={css`
          position: fixed;
          top: 0;
          height: ${COLLAPSED_WIDTH};
          background: ${darkMode ? DarkTheme.Primary : WHITE};
          z-index: 10;
          width: 100%;
        `}>
          <MenuHeaderItem expand={menuOpen}>
            <MenuIconItem
              alwaysActive
              noBorder
              primary="#BFC5D1"
              onClick={() => setMenuOpen(!menuOpen)}
              open={menuOpen}
            >
              <span>{'Menu'}</span>
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
                innerRef={searchRef}
                disabled={loading}
                // onClick={event => event.target.select()}
                type="text"
                onClick={() => setSearchMenuOpened(true)}
                onChange={(e) => {
                  if (e.target.value === '' && hasSearchInput) {
                    setHasSearchInput(false);
                  } else if (e.target.value !== '' && !hasSearchInput) {
                    setHasSearchInput(true);
                  }
                }}
                placeholder="Search for notifications"
                onEnter={onSearch}
              />
              {searchMenuOpened && (
                <Dropdown>
                  {hasSearchInput ? (
                    // Previews
                    <span>{'previews using filter logic on `notifications`'}</span>
                  ) : (
                    // Filter Suggestion Menu
                    <React.Fragment>
                      <span onMouseDown={() => setSearchField('title: ')}>
                        {`title:`}
                        <TypedSpan
                          source={exampleNotifications}
                          toString={n => {
                            const parts = n.name.split(' ');
                            const length = parts.length;
                            if (length > 2) {
                              return parts.slice(
                                Math.floor(length / 2),
                                length
                              ).join(' ');
                            }
                            return parts.slice(0, length).join(' ');
                          }}
                        />
                        <p>{'Search for specific titles'}</p>
                      </span>
                      <span onMouseDown={() => setSearchField('repo: ')}>
                        {`repo:`}
                        <TypedSpan
                          source={exampleNotifications}
                          toString={n => n.repository.split('/')[1]}
                        />
                        <p>{'Search for specific repositories'}</p>
                      </span>
                      <span onMouseDown={() => setSearchField('score: ')}>
                        {`score:`}
                        <TypedSpan
                          source={exampleNotifications}
                          toString={(n, i) => {
                            const comparator = ['>', '='][Math.floor(Math.random() * 2)];
                            return `${comparator} ${n.score}`;
                          }}
                        />
                        <p>{'Search for specific score ranges'}</p>
                      </span>
                      <h5>{'Not including a filter will search everything across all fields'}</h5>
                    </React.Fragment>
                  )}
                </Dropdown>
              )}
              {isSearching && <LoadingIcon size={36} style={{
                transition: 'all 100ms ease',
                position: 'absolute',
                right: 0,
                transform: 'scale(0.8)',
                backgroundColor: 'transparent'
              }} />}
            </SearchField>
            <Logo
              css={css`
                position: absolute !important;
                left: 50%;
                margin-left: -18px;
                opacity: 0.35;
                transition: all 200ms ease;
                &:hover {
                  opacity: 0.5;
                }
                &:active {
                  opacity: 0.7;
                }
                @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
                  display: none;
                }
              `}
              onClick={() => window.scrollTo(0, 0)}
              size={32}
            />
            <ProfileSection dark={darkMode} user={user} onLogout={onLogout} />
          </ContentHeaderItem>
        </Row>
        {/* Sidebar options & notifications content */}
        <Row css={css`
          height: calc(100% - ${COLLAPSED_WIDTH});
          margin-top: ${COLLAPSED_WIDTH};
          background: ${darkMode ? DarkTheme.Primary : '#2f343e'};
          @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
            background: ${WHITE};
          }
        `}>
          <MenuContainerItem expand={menuOpen}>
            <MenuIconItem
              mode={Filters.PARTICIPATING}
              primary="#4caf50"
              selected={activeFilter === Filters.PARTICIPATING}
              onChange={onSetActiveFilter}
              open={menuOpen}
              dark={darkMode}
              tooltip="View all of your relevant notifications"
              tooltipOffsetX={132}
              tooltipOffsetY={-46}
            >
              <span>{titleOfFilter(Filters.PARTICIPATING)}</span>
              <i className="fas fa-leaf"></i>
            </MenuIconItem>
            <MenuIconItem
              mode={Filters.REVIEW_REQUESTED}
              primary="#fab003"
              selected={activeFilter === Filters.REVIEW_REQUESTED}
              onChange={onSetActiveFilter}
              open={menuOpen}
              dark={darkMode}
              tooltip="View notifications that request your review"
              tooltipOffsetX={148}
              tooltipOffsetY={-46}
            >
              <span>{titleOfFilter(Filters.REVIEW_REQUESTED)}</span>
              <i className="fas fa-eye"></i>
            </MenuIconItem>
            <MenuIconItem
              mode={Filters.ASSIGNED}
              primary="#e91156"
              selected={activeFilter === Filters.ASSIGNED}
              onChange={onSetActiveFilter}
              open={menuOpen}
              dark={darkMode}
              tooltip="View notifications that are assigned to you"
              tooltipOffsetX={148}
              tooltipOffsetY={-46}
            >
              <span>{titleOfFilter(Filters.ASSIGNED)}</span>
              <i className="fas fa-tags"></i>
            </MenuIconItem>
            <MenuIconItem
              mode={Filters.COMMENT}
              primary="#1c7ed6"
              selected={activeFilter === Filters.COMMENT}
              onChange={onSetActiveFilter}
              open={menuOpen}
              dark={darkMode}
              tooltip="View notifications that you've commented on"
              tooltipOffsetX={148}
              tooltipOffsetY={-46}
            >
              <span>{titleOfFilter(Filters.COMMENT)}</span>
              <i className="fas fa-comments"></i>
            </MenuIconItem>
          </MenuContainerItem>
          <ContentItem>
            <CardSection>
              <Card>
                <CardTitle>{currentTime.format('dddd')}</CardTitle>
                <CardSubTitle>{currentTime.format('MMMM Do, YYYY')}</CardSubTitle>
                <ScoreDiff under={counts.prev > counts.cur} show={counts.prev > 0 && counts.cur > 0}>
                  {counts.prev > counts.cur ? '-' : '+'}
                  {prettify(percentageDeltaToday)}
                  {'%'}
                </ScoreDiff>
                <ReadCountGraph
                  data={data}
                  dark={darkMode}
                  onExit={() => {
                    setCounts({
                      cur: readTodayCount,
                      prev: readTodayLastWeekCount
                    });
                  }}
                  onHover={payloads => {
                    if (payloads && payloads.length > 0) {
                      const [prev, cur] = payloads;
                      if (counts.prev !== prev.value || counts.cur !== cur.value) {
                        setCounts({
                          cur: cur.value,
                          prev: prev.value
                        });
                      }
                    }
                  }}
                />
              </Card>
              <Card>
                <CardTitle>{'Activity'}</CardTitle>
                <CardSubTitle css={css`margin-bottom: 22px;`}>{'Interactions by repository'}</CardSubTitle>
                <RepoBarGroup
                  reposReadCounts={reposReadCounts}
                  highestRepoReadCount={highestRepoReadCount}
                  colorOfRepoCount={colorOfRepoCount}
                />
              </Card>
            </CardSection>
            <NotificationsSection>
              <TitleSection>
                <Title>{titleOfFilter(activeFilter)}</Title>
                <InteractionSection>
                  <optimized.li
                    css={css`
                      @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
                        display: none !important;
                      }
                    `}
                    onClick={event => {
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
                    }}
                  >
                    <IconLink tooltip={`${hasNotificationsOn ? 'Disable' : 'Enable'} notifications`}>
                      {hasNotificationsOn ? (
                          <i className="fas fa-bell"></i>
                        ) : (
                          <i className="fas fa-bell-slash"></i>
                      )}
                    </IconLink>
                  </optimized.li>
                  <optimized.li
                    css={css`
                      @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
                        display: none !important;
                      }
                    `}
                    onClick={event => {
                      event.stopPropagation();
                      // Toggle the dark mode state.
                      setDarkMode(m => !m);
                    }}
                  >
                    <IconLink tooltip={`${darkMode ? 'Disable' : 'Enable'} dark mode`}>
                      <i className="fas fa-moon"></i>
                    </IconLink>
                  </optimized.li>
                  <optimized.li>
                    <IconLink tooltip="View more options" onClick={() => setDropdownOpen(true)}>
                      <i className="fas fa-ellipsis-v"></i>
                    </IconLink>
                    <InteractionMenu show={dropdownOpen}>
                      <Card css={css`padding: 0;`}>
                        <optimized.div onClick={event => {
                          event.stopPropagation();
                          onFetchNotifications();
                          setDropdownOpen(false);
                        }}>
                          <h2>Reload notifications</h2>
                          <p>Manually fetch new notifications instead of waiting for the sync</p>
                        </optimized.div>
                        <optimized.div onClick={event => {
                          event.stopPropagation();
                          setDarkMode(mode => !mode);
                          setDropdownOpen(false);
                        }}>
                          <h2>{darkMode ? 'Disable' : 'Enable'} dark mode</h2>
                          <p>Turn {darkMode ? 'on' : 'off'} the dark mode theme for this page</p>
                        </optimized.div>
                        <optimized.div onClick={event => {
                          event.stopPropagation();
                          const response = window.confirm('Are you sure you want to mark all your notifications as read?');
                          void (response && onMarkAllAsStaged());
                          setDropdownOpen(false);
                        }}>
                          <h2>Mark all as read</h2>
                          <p>Move all your unread notifications to the read tab</p>
                        </optimized.div>
                        <optimized.div onClick={event => {
                          event.stopPropagation();
                          const response = window.confirm('Are you sure you want to clear the cache?');
                          void (response && onClearCache());
                          setDropdownOpen(false);
                        }}>
                          <h2>Empty cache</h2>
                          <p>Delete all the archived notifications tracked in your local storage</p>
                        </optimized.div>
                        <optimized.div onClick={event => {
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
                        </optimized.div>
                      </Card>
                    </InteractionMenu>
                  </optimized.li>
                </InteractionSection>
              </TitleSection>
              <SubTitleSection>
                <h4>{subtitleOfMode(mode)}</h4>
              </SubTitleSection>
              <PageSelection>
                <PageItem
                  view={View.UNREAD}
                  selected={view === View.UNREAD}
                  primary={ThemeColor(darkMode)}
                  onChange={setView}
                  mark={hasUnread}
                  dark={darkMode}
                  tooltip="View your active unread notifications"
                  tooltipOffsetY={-72}
                >
                  {'Unread'}
                  {unreadCount > 0 && (
                    <span css={css`
                      transition: all 200ms ease;
                      background: ${view === View.UNREAD
                        ? ThemeColor(darkMode)
                        : darkMode ? DarkTheme.Gray : '#bfc5d1'
                      };
                      color: ${WHITE};
                      transition: background 200ms ease;
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
                  primary={ThemeColor(darkMode)}
                  onChange={setView}
                  dark={darkMode}
                  tooltip="View notifications you have already read"
                  tooltipOffsetY={-72}
                >
                  {'Read'}
                  {readCount > 0 && (
                    <span css={css`
                      transition: all 200ms ease;
                      background: ${view === View.READ
                        ? ThemeColor(darkMode)
                        : darkMode ? DarkTheme.Gray : '#bfc5d1'
                      };
                      color: ${WHITE};
                      transition: background 200ms ease;
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
                  primary={ThemeColor(darkMode)}
                  onChange={setView}
                  dark={darkMode}
                  tooltip="View notifications that are considered completed"
                  tooltipOffsetY={-72}
                >
                  {'Archived'}
                  {archivedCount > 0 && (
                    <span css={css`
                      transition: all 200ms ease;
                      background: ${view === View.ARCHIVED
                        ? ThemeColor(darkMode)
                        : darkMode ? DarkTheme.Gray : '#bfc5d1'
                      };
                      color: ${WHITE};
                      transition: background 200ms ease;
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
                  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
                    padding: ${query ? '4px 16px' : 0};
                    position: absolute;
                    background: #f0f0ee;
                    left: 0;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                  }
                `}>
                  {query && (
                    <>
                      <span css={css`
                        font-size: 13px;
                        color: ${darkMode ? DarkTheme.Gray : '#797d8c'};
                        font-weight: 500;
                        vertical-align: text-top;
                        margin-right: 8px;
                        span {
                          font-size: 13px;
                          color: ${darkMode ? WHITE : '#37352f'};
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
                    css={css`@media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) { display: none; }`}
                    disabled={loading || isFirstPage}
                    onClick={!loading && !isFirstPage ? (() => onChangePage(page - 1)) : undefined}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </IconLink>
                  <IconLink
                    css={css`@media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) { display: none; }`}
                    disabled={loading || isLastPage}
                    onClick={!loading && !isLastPage ? (() => onChangePage(page + 1)) : undefined}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </IconLink>
                </div>
              </PageSelection>
              <NotificationsTable>
                {notifications.length > 0 && (
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
                    <NotificationCell flex={1.5} css={css`@media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) { display: none; }`}>
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
                    <NotificationCell width={70} css={css`@media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) { display: none; }`}>
                      <SortingItem
                        sort={Sort.DATE}
                        descending={descending}
                        setDescending={setDescending}
                        selected={sort === Sort.DATE}
                        onChange={setSort}
                        css={css`justify-content: center;`}
                      >
                        {'Date'}
                      </SortingItem>
                    </NotificationCell>
                  </NotificationRowHeader>
                )}
                {loading ? (
                  <NotificationBlock>
                    <LoadingNotificationRow />
                    <LoadingNotificationRow />
                    <LoadingNotificationRow />
                    <LoadingNotificationRow />
                    <LoadingNotificationRow />
                  </NotificationBlock>
                ) : error ? (
                  <ErrorContainer>
                    <BlankCanvasSvg height={136} width={224} />
                    <h3>{'Something went wrong'}</h3>
                    <p>{stringOfError(error.text)}</p>
                    <span onClick={() => onFetchNotifications()}>{'Try loading again'}</span>
                  </ErrorContainer>
                ) : (
                  <NotificationCollection
                    dark={darkMode}
                    isLastPage={isLastPage}
                    page={page}
                    view={view}
                    fact={fact}
                    notifications={notifications}
                    colorOfScore={createColorOfScore(lowestScore, highestScore)}
                    markAsRead={onStageThreadWithToast}
                    markAsArchived={onArchiveThreadWithToast}
                    markAsUnread={onRestoreThread}
                    markAsPinned={onPinThread}
                    markAsReadPinned={onReadPinThread}
                    user={user}
                  />
                )}
              </NotificationsTable>
            </NotificationsSection>
          </ContentItem>
        </Row>
        {/* Footer links */}
        <Row css={css`
          height: calc(100% - ${COLLAPSED_WIDTH});
          background: ${darkMode ? DarkTheme.Primary : '#2f343e'};
        `}>
          <MenuContainerItem expand={menuOpen}>
          </MenuContainerItem>
          <ContentItem css={css`
            min-height: ${FOOTER_HEIGHT};
            height: ${FOOTER_HEIGHT};
            display: flex;
            justify-content: flex-end;
            align-items: center;
            span {
              display: inline-block;
              font-size: 11px;
              color: ${darkMode ? DarkTheme.Gray : '#37352f52'};
              margin: 0 12px;
              font-weight: 500;
            }
            a {
              display: inline-block;
              text-decoration: underline;
              font-size: 11px;
              color: ${darkMode ? DarkTheme.Gray : '#37352f52'};
              margin: 0 12px;
              font-weight: 500;
              cursor: pointer;
              text-underline-position: under;
              transition: all 200ms ease;
              &:hover {
                color: ${darkMode ? DarkTheme.Gray + 'aa' : '#37352f52'};
              }
            }
          `}>
            <a target="_blank" href="https://github.com/nickzuber/meteorite/issues">Submit bugs</a>
            <a target="_blank" href="https://github.com/nickzuber/meteorite/pulls">Make changes</a>
            <a target="_blank" href="https://github.com/nickzuber/meteorite/issues">Leave feedback</a>
            <a target="_blank" href="https://github.com/nickzuber/meteorite">See source code</a>
            <a target="_blank" href="https://twitter.com/nick_zuber">Follow me on twitter</a>
            <span css={css`margin-right: 76px !important;`}>v{version}</span>
          </ContentItem>
        </Row>
      </Container>
    </ThemeContext.Provider>
  );
}

function NotificationCollection ({
  dark,
  isLastPage,
  page,
  fact,
  view,
  notifications,
  colorOfScore,
  markAsRead,
  markAsArchived,
  markAsUnread,
  markAsPinned,
  markAsReadPinned,
  user
}) {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  if (notifications.length === 0) {
    return (
      <EmptyState dark={dark} />
    );
  }

  return (
    <animated.tbody style={props} page={page}>
      {notifications.map((item, xid) => {
        const pinned = item.status === Status.Pinned || item.status === Status.PinnedRead;
        const name = item.name;
        const {title, tags} = extractJiraTags(name);

        return (
          <div css={css`position: relative;`}>
            <AnimatedNotificationRow
              readPinned={item.status === Status.PinnedRead}
              key={notifications.id || xid}
            >
              {/* Type */}
              <NotificationCell width={60} css={css`@media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) { flex: 50px 0 0; }`}>
                {getPRIssueIcon({type: item.type, reasons: item.reasons, dark, pinned})}
              </NotificationCell>
              {/* Title */}
              <NotificationCell
                flex={4}
                onClick={() => {
                  window.open(item.url);
                  if (item.status === Status.Pinned || item.status === Status.PinnedRead) {
                    markAsReadPinned(item.id, item.repository);
                  } else {
                    markAsRead(item.id, item.repository);
                  }
                }}
                css={css`font-weight: 500;`}>
                <NotificationTitle css={css`
                  display: block;
                  transition: all 200ms ease;
                  i {
                    font-size: 10px;
                    margin-right: 6px;
                  }
                `}>
                  {view === View.UNREAD && iconsOfBadges(item.badges)}
                  {tags.map(tag => (
                    <JiraTag key={tag} color={colorOfTag(tag)}>
                      {tag}
                    </JiraTag>
                  ))}
                  {title}
                </NotificationTitle>
                {/* Byline */}
                <NotificationByline>
                  {item.isAuthor && <i className="fas fa-user-circle"></i>}
                  {getMessageFromReasons(item.reasons, item.type)}
                  {` ${getRelativeTime(item.updated_at).toLowerCase()}`}
                </NotificationByline>
              </NotificationCell>
              {/* Repository */}
              <NotificationCell
                flex={1.5}
                onClick={() => window.open(item.repositoryUrl)}
                css={css`
                  font-weight: 500;
                  color: #8994A6;
                  padding-left: 20px;
                  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
                    display: none;
                  }
              `}>
                {item.repository.split('/')[1]}
                <NotificationByline>
                  {'@' + item.repository.split('/')[0]}
                </NotificationByline>
              </NotificationCell>
              {/* Score */}
              <NotificationCell
                tooltip="Score representing this notification's importance compared to the others"
                tooltipOffsetX={-100}
                width={60}
                css={css`
                  font-weight: 600;
                  color: ${colorOfScore(item.score)};
                  font-size: 12px;
                  text-align: center;
                `}
              >
                {'+' + item.score}
              </NotificationCell>
              <NotificationCell width={80} css={css`
                i {
                  padding: 13px 0;
                  text-align: center;
                  width: 40px;
                }
                @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
                  display: none;
                }
              `}>
                <ActionItems
                  item={item}
                  view={view}
                  markAsPinned={markAsPinned}
                  markAsReadPinned={markAsReadPinned}
                  markAsUnread={markAsUnread}
                  markAsRead={markAsRead}
                  markAsArchived={markAsArchived}
                />
              </NotificationCell>
            </AnimatedNotificationRow>
            {(xid === notifications.length - 1) ?
              (!isLastPage ? (
                <>
                  <Connector dot />
                  <Connector dot offsetX={8} opacity={0.8} />
                  <Connector dot offsetX={16} opacity={0.6} />
                </>
              ) : null
              ) : <Connector />
            }
          </div>
        );
      })}
    </animated.tbody>
  );
}

function ActionItems ({
  item,
  view,
  markAsRead,
  markAsArchived,
  markAsUnread,
  markAsPinned,
  markAsReadPinned
}) {
  switch (view) {
    case View.UNREAD:
      switch (item.status) {
        case Status.Pinned:
          return (
            <>
              <IconLink
                tooltip="Mark as read"
                onClick={() => markAsReadPinned(item.id, item.repository)}
              >
                <i className="fas fa-check"></i>
              </IconLink>
              <IconLink
                tooltip="Unpin notification"
                onClick={() => markAsUnread(item.id)}
              >
                <i className="fas fa-map-pin"></i>
              </IconLink>
            </>
          );
        case Status.PinnedRead:
          return (
            <>
              <IconLink
                tooltip="Mark as unread"
                onClick={() => markAsPinned(item.id, item.repository)}
              >
                <i className="fas fa-undo"></i>
              </IconLink>
              <IconLink
                tooltip="Unpin notification"
                onClick={() => markAsRead(item.id, item.repository)}
              >
                <i className="fas fa-map-pin"></i>
              </IconLink>
            </>
          );
        default:
          return (
            <>
              <IconLink
                tooltip="Mark as read"
                onClick={() => markAsRead(item.id, item.repository)}
              >
                <i className="fas fa-check"></i>
              </IconLink>
              <IconLink
                tooltip="Pin to the top of your queue"
                css={css`i { transform: rotate(45deg); }`}
                onClick={() => markAsPinned(item.id)}
              >
                <i className="fas fa-map-pin"></i>
              </IconLink>
            </>
          );
      }
    case View.READ:
      return (
        <>
          <IconLink
            tooltip="Mark as unread"
            onClick={() => markAsUnread(item.id)}
          >
            <i className="fas fa-undo"></i>
          </IconLink>
          <IconLink
            tooltip="Mark as archived"
            onClick={() => markAsArchived(item.id, item.repository)}
          >
            <i className="fas fa-times"></i>
          </IconLink>
        </>
      );
    case View.ARCHIVED:
      return (
        <>
          <IconLink
            tooltip="Mark as read"
            onClick={() => markAsUnread(item.id)}
          >
            <i className="fas fa-undo"></i>
          </IconLink>
          <IconLink
            tooltip="Mark as unread"
            onClick={() => markAsRead(item.id, item.repository)}
          >
            <i className="fas fa-check"></i>
          </IconLink>
        </>
      );
    default:
      return null
  }
}

const enhance = compose(
  withToastProvider,
  withToasts
)

export default enhance(Scene);

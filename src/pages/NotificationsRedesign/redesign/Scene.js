/** @jsx jsx */

import React from 'react';
import {animated} from 'react-spring'
import {css, jsx} from '@emotion/core';
import {useSpring} from 'react-spring'
import {AreaChart, Area, XAxis, Tooltip} from 'recharts';
import {ReactComponent as BlankCanvasSvg} from '../../../images/svg/blank.svg'
import Logo from '../../../components/Logo';
import LoadingIcon from '../../../components/LoadingIcon'
import {getFact} from '../../../utils/facts';
import {Mode, Sort, View} from '../index';
import {isMobile} from 'react-device-detect';
import {
  stringOfError,
  getPRIssueIcon,
  getRelativeTime,
  getMessageFromReasons,
  iconsOfBadges,
  createColorOfScore,
  getPercentageDelta,
  prettify,
  titleOfMode,
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
  optimized
} from './ui';
export const AnimatedNotificationRow = animated(NotificationRow);

const themeColor = '#27B768'; // #4880ff

const hash = process.env.GIT_HASH ? `#${process.env.GIT_HASH}` : '';
const version = require('../../../../package.json').version + hash;

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

  return (
    <>
      {shownRepos.map(repo => (
        <RepoBar
          key={repo}
          name={repo}
          value={reposReadCounts[repo]}
          max={highestRepoReadCount}
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
                max={highestRepoReadCount}
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

function RepoBar ({name, value, max, colorOfValue}) {
  return (
    <RepoBarContainer>
      <p>{name.split('/')[1]}</p>
      <span>{name.split('/')[0]}</span>
      <Bar
        title={value}
        color={themeColor + 'd1'}
        value={value / max}
      />
    </RepoBarContainer>
  );
}

function ReadCountGraph ({data, onHover, onExit}) {
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
          <stop offset="10%" stopColor={themeColor} stopOpacity={0.2}/>
          <stop offset="90%" stopColor={themeColor} stopOpacity={0} />
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
          opacity: 0.9
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
          fontSize: 12,
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
        stroke={themeColor}
        fill="url(#curGradient)"
        strokeWidth="2"
        animationDuration={0}
        dot={{ stroke: '#00000000', fill: '#00000000', r: 0 }}
        activeDot={{ stroke: themeColor, fill: themeColor, r: 2 }}
      />
    </AreaChart>
  );
}

export default function Scene ({
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
  readStatistics,
  readTodayCount,
  reposReadCounts,
  readTodayLastWeekCount,
  onRestoreThread,
  onLogout,
  mode,
  setMode
}) {
  const hasNotificationsOn = notificationsPermission === 'granted';
  const [fact, setFact] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [counts, setCounts] = React.useState({
    cur: readTodayCount,
    prev: readTodayLastWeekCount
  });

  readStatistics = readStatistics.map(n => parseInt(n, 10));
  const lastWeekStats = readStatistics.slice(0, 7);
  const thisWeekStats = readStatistics.slice(7);

  const percentageDeltaToday = getPercentageDelta(counts.cur, counts.prev);
  const highestRepoReadCount = Object.values(reposReadCounts).reduce((h, c) => Math.max(h, c), 0);
  const colorOfRepoCount = createColorOfScore(0, highestRepoReadCount);

  const data = [
    {name: 'Sunday', cur: thisWeekStats[0], prev: lastWeekStats[0]},
    {name: 'Monday', cur: thisWeekStats[1], prev: lastWeekStats[1]},
    {name: 'Tuesday', cur: thisWeekStats[2], prev: lastWeekStats[2]},
    {name: 'Wednesday', cur: thisWeekStats[3], prev: lastWeekStats[3]},
    {name: 'Thursday', cur: thisWeekStats[4], prev: lastWeekStats[4]},
    {name: 'Friday', cur: thisWeekStats[5], prev: lastWeekStats[5]},
    {name: 'Saturday', cur: thisWeekStats[6], prev: lastWeekStats[6]},
  ];

  // Global event listeners for things like the dropdowns & popups.
  React.useEffect(() => {
    window.scrollTo(0, 0);
    const body = window.document.querySelector('body');
    const hideDropdownMenu = () => setDropdownOpen(false);
    // For mobile `touchend`
    const eventType = 'click'; // isMobile ? 'touchend' : 'click';
    body.addEventListener(eventType, hideDropdownMenu);
    return () => body.removeEventListener(eventType, hideDropdownMenu);
  }, []);

  // Updating the counts when new stats come in.
  React.useEffect(() => {
    setCounts({
      cur: readTodayCount,
      prev: readTodayLastWeekCount
    });
  }, [readTodayCount, readTodayLastWeekCount]);

  React.useEffect(() => {
    setFact(getFact());
  }, [view]);

  return (
    <Container>
      {/* Top search & profile bar */}
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
            css={css`
              position: absolute !important;
              left: 50%;
              margin-left: -18px;
              opacity: 0.35;
              transition: all 200ms ease;
              &:hover {
                opacity: 0.5;
              }
              @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
                display: none;
              }
            `}
            onClick={() => window.scrollTo(0, 0)}
            size={32}
          />
          <ProfileSection user={user} onLogout={onLogout} />
        </ContentHeaderItem>
      </Row>
      {/* Sidebar options & notifications content */}
      <Row css={css`
        height: calc(100% - ${COLLAPSED_WIDTH});
        margin-top: ${COLLAPSED_WIDTH};
        background: #2f343e;
        @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
          background: ${WHITE};
        }
      `}>
        <MenuContainerItem expand={menuOpen}>
          <MenuIconItem
            mode={Mode.ALL}
            primary="#4caf50"
            selected={mode === Mode.ALL}
            onChange={setMode}
            open={menuOpen}
          >
            <span>{titleOfMode(Mode.ALL)}</span>
            <i className="fas fa-leaf"></i>
          </MenuIconItem>
          <MenuIconItem
            mode={Mode.HOT}
            primary="#e91e63"
            selected={mode === Mode.HOT}
            onChange={setMode}
            open={menuOpen}
          >
            <span>{titleOfMode(Mode.HOT)}</span>
            <i className="fas fa-fire"></i>
          </MenuIconItem>
          <MenuIconItem
            mode={Mode.COMMENTS}
            primary={themeColor}
            selected={mode === Mode.COMMENTS}
            onChange={setMode}
            open={menuOpen}
          >
            <span>{titleOfMode(Mode.COMMENTS)}</span>
            <i className="fas fa-user-friends"></i>
          </MenuIconItem>
          <MenuIconItem
            mode={Mode.OLD}
            primary="#fcc419"
            selected={mode === Mode.OLD}
            onChange={setMode}
            open={menuOpen}
          >
            <span>{titleOfMode(Mode.OLD)}</span>
            <i className="fas fa-stopwatch"></i>
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
              <Title>{titleOfMode(mode)}</Title>
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
                  <IconLink>
                    {hasNotificationsOn ? (
                        <i className="fas fa-bell"></i>
                      ) : (
                        <i className="fas fa-bell-slash"></i>
                    )}
                  </IconLink>
                </optimized.li>
                <optimized.li>
                  <IconLink onClick={() => setDropdownOpen(true)}>
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
                        <p>Clear all the notifications that are being tracked in your local storage</p>
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
                primary={themeColor}
                onChange={setView}
                mark={hasUnread}
              >
                {'Unread'}
                {unreadCount > 0 && (
                  <span css={css`
                    transition: all 200ms ease;
                    background: ${view === View.UNREAD ? themeColor : '#bfc5d1'};
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
                primary={themeColor}
                onChange={setView}
              >
                {'Read'}
                {readCount > 0 && (
                  <span css={css`
                    transition: all 200ms ease;
                    background: ${view === View.READ ? themeColor : '#bfc5d1'};
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
                primary={themeColor}
                onChange={setView}
              >
                {'Archived'}
                {archivedCount > 0 && (
                  <span css={css`
                    transition: all 200ms ease;
                    background: ${view === View.ARCHIVED ? themeColor : '#bfc5d1'};
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
                  <NotificationCell flex={2} css={css`@media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) { display: none; }`}>
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
                  isLastPage={isLastPage}
                  page={page}
                  view={view}
                  fact={fact}
                  notifications={notifications}
                  colorOfScore={createColorOfScore(lowestScore, highestScore)}
                  markAsRead={onStageThread}
                  markAsArchived={onArchiveThread}
                  markAsUnread={onRestoreThread}
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
        background: #2f343e;
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
            color: #37352f52;
            margin: 0 12px;
            font-weight: 500;
          }
          a {
            display: inline-block;
            text-decoration: underline;
            font-size: 11px;
            color: #37352f52;
            margin: 0 12px;
            font-weight: 500;
            cursor: pointer;
            text-underline-position: under;
            transition: all 200ms ease;
            &:hover {
              color: #37352faa;
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
  );
}

function NotificationCollection ({
  isLastPage,
  page,
  fact,
  view,
  notifications,
  colorOfScore,
  markAsRead,
  markAsArchived,
  markAsUnread,
  user
}) {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  if (notifications.length === 0) {
    return (
      <div css={css`
        text-align: center;
        margin: 128px auto 0;
        font-size: 15px;
        font-weight: 500;
        color: #bfc5d1;
        user-select: none;
        width: 60%;
        span {
          text-align: center;
          margin: 8px auto 0;
          font-size: 12px;
          font-weight: 400;
          display: block;
          color: #bfc5d1;
          user-select: none;
        }
      `}>
        {'No new updates to show'}
        <span>{`Fun fact: ${fact}`}</span>
      </div>
    );
  }

  return (
    <animated.tbody style={props} page={page}>
      {notifications.map((item, xid) => {
        const name = item.name;
        const {title, tags} = extractJiraTags(name);

        return (
          <div css={css`position: relative;`}>
            <AnimatedNotificationRow key={notifications.id || xid}>
              {/* Type */}
              <NotificationCell width={60} css={css`@media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) { flex: 50px 0 0; }`}>
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
                <NotificationTitle css={css`
                  display: flex;
                  align-items: center;
                  i {
                    font-size: 10px;
                    margin-right: 6px;
                  }
                `}>
                  {iconsOfBadges(item.badges)}
                  {tags.map(tag => (
                    <JiraTag key={tag} color={colorOfTag(tag)}>
                      {tag}
                    </JiraTag>
                  ))}
                  {title}
                </NotificationTitle>
                {/* Byline */}
                <NotificationByline>
                  {/* {user && user.avatar_url && (
                    <img
                      css={css`
                        border-radius: 100%;
                        height: 12px;
                        width: 12px;
                        margin-right: 5px;
                      `}
                      src={user.avatar_url}
                    />
                  )} */}
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
                  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
                    display: none;
                  }
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
                @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
                  display: none;
                }
              `}>
                <ActionItems
                  item={item}
                  view={view}
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

function ActionItems ({item, view, markAsRead, markAsArchived, markAsUnread}) {
  switch (view) {
    case View.UNREAD:
      return (
        <>
          <IconLink onClick={() => markAsRead(item.id, item.repository)}>
            <i className="fas fa-check"></i>
          </IconLink>
          <IconLink onClick={() => markAsArchived(item.id, item.repository)}>
            <i className="fas fa-times"></i>
          </IconLink>
        </>
      );
    case View.READ:
      return (
        <>
          <IconLink onClick={() => markAsUnread(item.id)}>
            <i className="fas fa-undo"></i>
          </IconLink>
          <IconLink onClick={() => markAsArchived(item.id, item.repository)}>
            <i className="fas fa-times"></i>
          </IconLink>
        </>
      );
    case View.ARCHIVED:
      return (
        <>
          <IconLink onClick={() => markAsUnread(item.id)}>
            <i className="fas fa-undo"></i>
          </IconLink>
          <IconLink onClick={() => markAsRead(item.id, item.repository)}>
            <i className="fas fa-check"></i>
          </IconLink>
        </>
      );
    default:
      return null
  }
}

/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import {compose} from 'recompose';
import {css, jsx, keyframes} from '@emotion/core';
import {isMobile} from 'react-device-detect';
import {navigate} from '@reach/router';
import {routes} from '../../../../constants';
import {withTooltip} from '../../../../enhance';
import {withOnEnter, withOptimizedTouchEvents} from '../../../../enhance';

export const ThemeContext = React.createContext(false);
export const withTheme = C => p => (
  <ThemeContext.Consumer>
    {dark => <C {...p} dark={dark} />}
  </ThemeContext.Consumer>
);

const enhance = compose(
  withTheme,
  withTooltip,
  withOptimizedTouchEvents
);

export const ThemeColor = darkMode => (darkMode ? '#E91356' : '#27B768');
export const WHITE = 'rgb(255, 254, 252)';
export const FOOTER_HEIGHT = '96px';
export const COLLAPSED_WIDTH = '72px';
export const EXPANDED_WIDTH = '286px';

export const DarkTheme = {
  Primary: '#0F1C26',
  Secondary: '#11212D',
  SecondaryAlt: '#112535',
  Gray: '#667386',
  Alpha: {
    Light: '#757d8410',
    Dark: '#757d8429'
  }
};

export const WIDTH_FOR_MEDIUM_SCREENS = '1100px';
export const WIDTH_FOR_SMALL_SCREENS = '750px';

export const optimized = {
  li: enhance(props => <li {...props} />),
  div: enhance(props => <div {...props} />)
};

const loadingKeyframe = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

export const Title = enhance(
  styled('h1')(
    p => `
  margin: 0;
  font-size: 32px;
  line-height: 46px;
  font-weight: 500;
  letter-spacing: -0.75px;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    font-size: 28px;
  }

  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  font-size: 36px;
  line-height: 52px;
  color: ${p.dark ? WHITE : 'inherit'};
`
  )
);

export const Container = enhance(styled('div')`
  position: relative;
  display: block;
  background: ${WHITE};
  height: calc(100% - ${COLLAPSED_WIDTH});
  overflow-x: hidden;
`);

export const Row = enhance(styled('div')`
  position: relative;
  display: block;
  display: flex;
  flex-direction: row;
`);

export const Item = enhance(styled('div')`
  position: relative;
  display: inline-block;
  transition: all 200ms ease;
`);

export const MenuHeaderItem = enhance(styled(Item)`
  height: ${COLLAPSED_WIDTH};
  width: ${({expand}) => (expand ? EXPANDED_WIDTH : COLLAPSED_WIDTH)};
  flex: ${({expand}) => (expand ? `${EXPANDED_WIDTH} 0 0` : 1)};
  transition: all 150ms ease;
  border-bottom: 1px solid ${({dark}) => (dark ? DarkTheme.Primary : '#292d35')};
  border-right: 1px solid ${({dark}) => (dark ? DarkTheme.Primary : '#292d35')};
  background: ${({dark}) => (dark ? DarkTheme.Primary : '#2f343e')};
  z-index: 1;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    display: none;
  }
`);

export const ContentHeaderItem = enhance(styled(Item)`
  height: ${COLLAPSED_WIDTH};
  width: calc(100% - ${COLLAPSED_WIDTH});
  border-bottom: 1px solid ${({dark}) => (dark ? DarkTheme.Primary : '#E5E6EB')};
  z-index: 1;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    width: 100%;
  }
`);

export const MenuContainerItem = enhance(styled(Item)`
  width: ${({expand}) => (expand ? EXPANDED_WIDTH : COLLAPSED_WIDTH)};
  flex: ${({expand}) => (expand ? `${EXPANDED_WIDTH} 0 0` : 1)};
  height: 100%;
  transition: all 150ms ease;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    display: none;
  }
`);

// Faded blue: #F5F6FA
// Faded gray: #fbfbfb
export const ContentItem = enhance(styled(Item)`
  height: 100%;
  min-height: calc(100vh - ${COLLAPSED_WIDTH} - ${FOOTER_HEIGHT});
  width: calc(100% - ${COLLAPSED_WIDTH});
  background: ${({dark}) => (dark ? DarkTheme.Secondary : WHITE)};
  border-left: 1px solid ${({dark}) => (dark ? DarkTheme.Primary : '#292d35')};
  padding-bottom: 12px;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    width: 100%;
    border-left: 1px solid ${WHITE};
    border-right: 1px solid ${WHITE};
  }
`);

export const CardSection = enhance(styled('div')`
  float: left;
  display: inline-block;
  width: 330px;
  padding: 0 16px;
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    display: none;
  }
`);

export const Card = enhance(styled('div')`
  position: relative;
  width: 250px;
  padding: 20px 24px;
  min-height: 100px;
  margin: 32px auto 0;
  background: ${({dark}) => (dark ? DarkTheme.SecondaryAlt : WHITE)};
  border: 1px solid ${({dark}) => (dark ? DarkTheme.Secondary : '#E5E6EB')};
  box-shadow: ${({dark}) =>
    dark
      ? 'rgba(0, 0, 0, 0) 0px 2px 8px, rgba(0, 0, 0, 0.25) 0px 2px 6px'
      : 'rgba(84, 70, 35, 0) 0px 2px 8px, rgba(84, 70, 35, 0.15) 0px 1px 3px'};
  border-radius: 6px;
`);

export const CardTitle = enhance(
  styled(Title)(
    p => `
  color: ${p.dark ? WHITE : 'inherit'};
  letter-spacing: -0.25px;
  line-height: 1.25em;
  font-size: 1.75em;
`
  )
);

export const CardSubTitle = enhance(
  styled(CardTitle)(
    p => `
  font-size: 16px;
  font-family: medium-content-sans-serif-font,Inter UI,system-ui,sans-serif;
  color: ${p.dark ? DarkTheme.Gray : '#6c757d'};
  margin-top: 0px;
`
  )
);

export const ScoreDiff = enhance(styled(CardTitle)`
  position: absolute;
  font-family: Inter, Inter UI, sans-serif;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  letter-spacing: -0.75px;
  top: 30px;
  right: 24px;
  opacity: ${props => (props.show ? '1' : '0')};
  color: ${props => (props.under ? '#bfc5d1' : ThemeColor(props.dark))};
`);

export const IconContainer = enhance(styled('div')`
  position: relative;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.open ? 'space-between' : 'center')};
  padding: ${props => (props.open ? '0 28px' : 'inherit')};
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: all 200ms ease;
  i {
    transition: all 200ms ease;
    color: ${props => (props.selected ? props.primary : '#bfc5d15e')};
  }
  span {
    transition: all 200ms ease;
    display: ${props => (props.open ? 'inline-block' : 'none')};
    opacity: ${props => (props.open ? 1 : 0)};
    color: ${props => (props.selected ? WHITE : '#bfc5d15e')};
    font-weight: 600;
    margin: 12px;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &:hover {
    background: ${props =>
      props.selected ? 'rgba(255, 255, 255, 0)' : 'rgba(233, 233, 233, .1)'};
  }
`);

export const NotificationsSection = enhance(styled('div')`
  display: inline-block;
  width: calc(100% - 362px - 68px);
  padding-top: 36px;
  padding-right: 68px;
  padding-left: 0;
  padding-bottom: 0;
  height: auto;
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    width: calc(100% - (2 * 16px));
    padding-right: 16px;
    padding-left: 16px;
    padding-top: 16px;
  }
`);

export const TitleSection = enhance(
  styled('div')(
    p => `
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  height: auto;

  * {
    color: ${p.dark ? WHITE : 'inherit'};
  }
`
  )
);

export const SubTitleSection = enhance(
  styled('div')(
    p => `
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  height: auto;
  h4 {
    margin: 4px 0 8px;
    font-weight: 500;
    font-size: 16px;

    font-size: 18px;
    font-family: medium-content-sans-serif-font,Inter UI,system-ui,sans-serif;
    color: ${p.dark ? DarkTheme.Gray : '#9d9b97'};
    margin-top: 0px;
  }
`
  )
);

export const UnorderedList = enhance(styled('ul')`
  position: relative;
  width: 100%;
  margin-top: 0;
  padding: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
`);

export const PageSelection = enhance(styled(UnorderedList)`
  border-bottom: 2px solid #bfc5d150;
  flex-wrap: nowrap;
`);

export const SearchField = enhance(
  styled('div')(
    p => `
  position: relative;
  float: left;
  text-align: left;
  align-items: center;
  height: 36px;
  font-size: 13px;
  display: inline-flex;
  margin: 0 24px;
  background: ${p.dark ? DarkTheme.SecondaryAlt : '#fffefc'};
  border-radius: 2px;
  padding: 0px;
  text-decoration: none;
  transition: all 0.06s ease-in-out 0s;
  border: 1px solid ${p.dark ? DarkTheme.Primary : 'rgb(230, 231, 234)'};
  &:hover {
    border: 1px solid ${p.dark ? DarkTheme.Secondary : '#bfc5d1aa'};
  }
  &:focus-within {
    border: 1px solid ${p.dark ? DarkTheme.Secondary : '#bfc5d1aa'};
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
`
  )
);

const SearchInput = enhance(
  styled('input')(
    p => `
  position: relative;
  text-align: left;
  transition: all 200ms ease;
  height: 36px;
  color: ${p.dark ? WHITE : 'inherit'};
  font-size: 13px;
  display: inline-flex;
  flex: 1 1 0%;
  font-weight: 500;
  margin: 0px auto;
  background: none;
  width: 340px;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    width: 240px;
  }
  padding: 0px;
  text-decoration: none;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  outline: none;
  opacity: 1;
  &::placeholder {
    color: ${p.dark ? DarkTheme.Gray : '#bfc5d1'};
  }
  &:focus {
    opacity: 1;
    color: ${p.dark ? WHITE : 'rgb(55, 53, 47)'};
    @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
      width: 184px;
    }
  }
`
  )
);

export const FilterItem = enhance(
  styled('span')(
    p => `
      display: block;
      padding: 12px 16px;
      font-weight: 500;
      font-size: 13px;
      color: ${p.dark ? WHITE : 'inherit'};
      cursor: pointer;
      transition: all 200ms ease;
      text-transform: lowercase;

      &:hover {
        background: ${p.dark ? '#273947' : '#eff0f2'};
      }

      p {
        text-transform: initial;
        padding: 0;
        margin: 0;
        font-weight: 500;
        margin-top: 4px;
        font-size: 12px;
        color: #8893a7cc;
      }
    `
  )
);

export const Dropdown = enhance(
  styled('div')(
    p => `
  max-height: 400px;
  overflow-y: auto;
  background: red;
  width: 388px;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    width: 288px;
  }
  min-height: 40px;
  position: absolute;
  top: calc(100% - 1px);
  left: -1px;
  background: ${p.dark ? DarkTheme.SecondaryAlt : '#fffefc'};
  border: 1px solid ${p.dark ? DarkTheme.Secondary : '#bfc5d1aa'};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding-bottom: 12px;
  box-shadow: ${
    p.dark
      ? 'rgba(0,0,0,0) 0px 2px 8px, rgba(0,0,0,0.25) 0px 2px 6px'
      : 'rgba(84,70,35,0) 0px 2px 8px, rgba(84,70,35,0.15) 0px 1px 3px'
  };

  &::-webkit-scrollbar {
    background-color: ${p.dark ? DarkTheme.SecondaryAlt : '#fffefc'};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${p.dark ? DarkTheme.Alpha.Dark : '#bfc5d1ab'};
    border: 4px solid ${p.dark ? DarkTheme.SecondaryAlt : '#fffefc'};
    border-top-width: 2px;
    border-bottom-width: 2px;
    border-radius: 100px;
  }

  h5 {
    border-top: 1px solid ${p.dark ? DarkTheme.Secondary : '#bfc5d155'};
    margin: 0;
    padding: 12px 16px 2px;
    font-style: italic;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #8893a7cc;
  }
`
  )
);

export const EnhancedSearchInput = withOnEnter(SearchInput);

export const PageItemComponent = enhance(
  styled('li')(
    p => `
  font-size: 14px;
  padding: 0 32px 0 8px;
  width: 98px;
  position: relative;
  height: 100%;
  line-height: 52px;
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: all 200ms ease;
  font-weight: ${p.selected ? 600 : 400};
  color: ${p.dark ? WHITE : 'inherit'};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  &:hover {
    background: #757d8410;
  }
  &:active {
    background: #757d8429;
  }
  &:after {
    transition: all 200ms ease;
    content: "";
    position: absolute;
    width: 100%;
    background: ${p.selected ? p.primary : 'none'};
    right: 0;
    bottom: -2px;
    left: 0;
    height: 3px;
  }
`
  )
);

export const InteractionSection = enhance(styled('ul')`
  position: relative;
  width: 150px;
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
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    width: 50px;
  }
`);

export const InteractionMenu = enhance(
  styled('div')(
    p => `
  height: ${p.show ? 5 * 85 + 5 : 0}px;
  opacity: ${p.show ? 1 : 0};
  top: 32px;
  left: 72px;
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
        background: ${
          p.dark ? DarkTheme.Alpha.Light : 'rgba(233, 233, 233, .25)'
        };
      }
      &:active {
        background: ${
          p.dark ? DarkTheme.Alpha.Dark : 'rgba(233, 233, 233, .5)'
        };
      }
      a, h2 {
        text-decoration: none;
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
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    transform: scale(1.15);
    left: -178px;
    top: 24px;
  }
`
  )
);

export const SortingItemComponent = enhance(styled('div')`
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
    color: ${props => (props.selected ? '#8c93a5' : '#8c93a5a1')};
  }
  &:hover {
    span {
      color: #8c93a5dd;
    }
  }
  span:active {
    color: #8c93a5;
  }
  i {
    font-size: 13px;
    line-height: 15px;
    color: ${props => (props.selected ? '#8c93a5' : '#8c93a5a1')};
  }
`);

export const NotificationsTable = enhance(styled('table')`
  position: relative;
  display: flex;
  flex-direction: column;
`);

export const NotificationRowHeader = enhance(styled('tr')`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: left;
  margin: 0 auto;
  padding: 8px 24px 8px;
  box-sizing: border-box;
`);

export const NotificationRow = enhance(
  styled(NotificationRowHeader)(
    p => `
  position: relative;
  z-index: 1;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 14px;
  margin-bottom: 12px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  opacity: ${p.readPinned ? 0.5 : 1};
  transition: all 200ms ease;
  background: none;
  &:hover {
    background: #757d8410;
  };
  &:active {
    background: #757d8429;
  };
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    padding: 6px 2px;
  }
`
  )
);

export const LoadingNotificationRow = enhance(styled(NotificationRowHeader)`
  position: relative;
  background: #bfc5d118;
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
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      #bfc5d133,
      rgba(255, 255, 255, 0)
    );
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateX(-100%);
    animation: ${loadingKeyframe} 1.25s infinite;
  }
`);

export const NotificationBlock = enhance(styled('tbody')`
  transition: all 200ms ease;
`);

export const ErrorContainer = enhance(
  styled('div')(
    p => `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 48px;
  h3 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 0;
    color: ${p.dark ? WHITE : 'inherit'};
  }
  p {
    margin-bottom: 6px;
    opacity: 0.5;
    color: ${p.dark ? WHITE : 'inherit'};
  }
  span {
    text-decoration: underline;
    text-underline-position: under;
    cursor: pointer;
    opacity: 0.5;
    color: ${p.dark ? WHITE : 'inherit'};
  }
`
  )
);

export const NotificationCell = enhance(styled('td')`
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
`);

export const NotificationTitle = enhance(
  styled('span')(
    p => `
  font-size: 14px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${p.dark ? '#FFFEFC' : 'inherit'};
`
  )
);
export const NotificationByline = enhance(styled('span')`
  display: flex;
  align-items: center;
  margin-top: 4px;
  font-size: 12px;
  color: #8893a7cc;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  i {
    margin-right: 6px;
    font-size: 12px;
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
`);

export const ProfileContainer = enhance(
  styled('div')(
    p => `
  display: flex;
  height: 100%;
  width: 188px;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid ${p.dark ? DarkTheme.Primary : '#edeef0'};
  padding: 0 22px;
  position: absolute;
  right: 0;
  z-index: 3;
  transition: all 200ms ease;
  user-select: none;
  cursor: pointer;
  i {
    margin: 6px;
    transition: all 200ms ease;
    color: #bfc5d1a3
  }
  &:hover {
    background: ${p.dark ? DarkTheme.Alpha.Light : 'rgba(233, 233, 233, .25)'};
    i {
      color: #bfc5d1
    }
  }
  &:active {
    background: ${p.dark ? DarkTheme.Alpha.Dark : 'rgba(233, 233, 233, .5)'};
    i {
      color: #bfc5d1
    }
  }
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    width: 48px;
  }
`
  )
);

export const ProfileName = enhance(
  styled('span')(
    p => `
  font-size: 14px;
  font-weight: 500;
  margin: 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${p.dark ? WHITE : 'inherit'};
  margin-right: auto;
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    display: none;
  }
`
  )
);

export const ProfilePicture = enhance(styled('img')`
  height: 36px;
  width: 36px;
  border-radius: 4px;
  background: silver;
  opacity: ${props => (props.src ? 1 : 0.25)};
`);

export function ProfileSection({dark, user, onLogout}) {
  const [menuShow, setMenuShow] = React.useState(false);
  React.useEffect(() => {
    const body = window.document.querySelector('body');
    const hideMenu = () => setMenuShow(false);
    const eventType = 'click'; // isMobile ? 'touchend' : 'click';
    body.addEventListener(eventType, hideMenu);
    return () => body.removeEventListener(eventType, hideMenu);
  }, []);

  return (
    <>
      <ProfileContainer onClick={() => setMenuShow(true)}>
        {user && user.avatar_url ? (
          <ProfilePicture src={user.avatar_url} />
        ) : (
          <i
            css={css`
              font-size: 20px;
            `}
            className="fas fa-cog"
          />
        )}
        <ProfileName>{user && user.name ? user.name : 'Settings'}</ProfileName>
        <i
          className="fas fa-caret-down"
          css={css`
            transform: ${menuShow ? 'rotate(180deg)' : 'rotate(0deg)'};
          `}
        />
      </ProfileContainer>
      <InteractionMenu
        show={menuShow}
        css={css`
          top: calc(${COLLAPSED_WIDTH} + 1px);
          height: ${menuShow ? 'auto' : '0px'};
          border-bottom-right-radius: 4px;
          border-bottom-left-radius: 4px;
          right: 0;
          left: auto;
          background: ${dark ? DarkTheme.SecondaryAlt : WHITE};
          border: ${menuShow ? '1px' : '0px'} solid
            ${dark ? DarkTheme.Secondary : '#edeef0'};
          border-top: 0;
          width: ${22 + 187 + 22}px;
          cursor: pointer;
          outline: none;
          user-select: none;
          box-shadow: ${dark
            ? 'rgba(0, 0, 0, 0) 0px 2px 8px, rgba(0, 0, 0, 0.25) 0px 2px 6px'
            : 'rgba(84, 70, 35, 0) 0px 2px 8px, rgba(84, 70, 35, 0.15) 0px 1px 3px'};
          transition: height 200ms ease, opacity 200ms ease;
          @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
            left: auto;
          }
          div {
            margin: 0;
            padding: 12px 16px;
            cursor: pointer;
            outline: none;
            user-select: none;
            transition: all 200ms ease;
            &:hover {
              background: ${dark
                ? DarkTheme.Alpha.Light
                : 'rgba(233, 233, 233, .25)'};
            }
            &:active {
              background: ${dark
                ? DarkTheme.Alpha.Dark
                : 'rgba(233, 233, 233, .5)'};
            }
          }
          h2 {
            color: ${dark ? WHITE : 'inherit'};
            margin: 0 0 4px;
            font-size: 15px;
          }
          p {
            color: ${dark ? WHITE : 'inherit'};
            margin: 0;
            font-size: 13px;
            opacity: 0.7;
          }
          @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
            transform: scale(1);
            right: 0;
            left: auto;
            top: ${COLLAPSED_WIDTH};
          }
        `}
      >
        <optimized.div
          onClick={event => {
            event.stopPropagation();
            navigate(routes.HOME);
            setMenuShow(false);
          }}
        >
          <h2>Go home</h2>
          <p>Head over back to the home page</p>
        </optimized.div>
        <optimized.div
          onClick={event => {
            event.stopPropagation();
            navigate(routes.GUIDE);
            setMenuShow(false);
          }}
        >
          <h2>Read guide</h2>
          <p>Check out the guide for how to use Meteorite</p>
        </optimized.div>
        <optimized.div
          onClick={event => {
            event.stopPropagation();
            onLogout();
            setMenuShow(false);
          }}
        >
          <h2>Logout</h2>
          <p>Log off your account and return to home page</p>
        </optimized.div>
      </InteractionMenu>
    </>
  );
}

export const NotificationIconWrapper = enhance(styled('div')`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  transform: scale(0.65);
  transition: all 100ms ease;
`);

export const IconLink = enhance(
  styled('span')(
    p => `
  position: relative;
  cursor: ${p.disabled ? 'default' : 'pointer'};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  user-select: none;
  height: 40px;
  width: 40px;
  transition: all 150ms ease;
  i {
    color: ${
      p.disabled
        ? p.dark
          ? DarkTheme.Gray
          : '#bfc5d1'
        : p.dark
          ? WHITE
          : 'inherit'
    };
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
    transform: ${p.disabled ? 'scale(0)' : 'scale(1)'};
  }
  &:active:before {
    background: ${p.disabled ? '#BFC5D122' : '#BFC5D144'};
  }
`
  )
);

export const Divider = enhance(
  styled('div')(
    p => `
  position: relative;
  display: inline-block;
  background: ${p.dark ? '#bfc5d150' : '#e5e6eb'};
  height: 28px;
  width: 2px;
  margin: 0 8px;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    display: none;
  }
`
  )
);

export const Connector = enhance(
  styled('div')(
    p => `
  position: absolute;
  display: block;
  background: ${p.dark ? '#2E3D4B' : '#e5e6eb'};
  border-radius: 4px;
  left: 34px;
  top: ${(p.offsetX || 0) + 55}px;
  height: ${p.dot ? 4 : 26}px;
  opacity: ${p.opacity || 1};
  z-index: 0;
  width: 2px;
  margin: 0 8px;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    left: 18px;
  }
`
  )
);

export const RepoBarContainer = enhance(
  styled('div')(
    p => `
  position: relative;
  width: 100%;
  margin-bottom: 28px;
  p {
    color: ${p.dark ? WHITE : 'inherit'};
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    display: block;
    margin: 8px 0 0;
  }
  span {
    color: ${p.dark ? DarkTheme.Gray : '#bfc5d1'};
    margin: 2px 0 8px;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    display: block;
  }
`
  )
);

export const LinkText = enhance(
  styled('div')(
    p => `
  text-decoration: underline;
  font-size: 12px;
  color: ${p.dark ? DarkTheme.Gray : '#37352f59'};
  font-weight: 500;
  text-underline-position: under;
  cursor: pointer;
  transition: all 200ms ease;
  &:hover {
    color: ${p.dark ? DarkTheme.Gray + 'aa' : '#37352faa'};
  }
`
  )
);

export const JiraTag = enhance(
  styled('span')(
    p => `
  background: ${p.color || '#e2e2e2'}28;
  color: ${p.color || '#e2e2e2'};
  vertical-align: bottom;
  font-size: 10px;
  font-weight: 600;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 0px;
  display: inline-block;
  padding: 2px 4px;
`
  )
);

export const Bar = enhance(
  styled('div')(
    p => `
  position: relative;
  width: 100%;
  height: 5px;
  border-radius: 8px;
  background: ${p.dark ? DarkTheme.Primary : '#e5e7ea'};
  &:after {
    content: "";
    position: absolute;
    width: ${Math.max(Math.min(p.value * 100, 100), 0)}%;
    border-radius: 8px;
    background: ${ThemeColor(p.dark)}d1;
    left: 0;
    top: 0;
    bottom: 0;
  }
`
  )
);

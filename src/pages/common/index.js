/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {navigate, Link as RouterLink} from '@reach/router';
import {routes} from '../../constants';
import Logo from '../../components/Logo';

import '../../styles/gradient.css';
import '../../styles/font.css';

const themeColor = '#27B768';

const hash = process.localEnv.GIT_HASH ? `#${process.localEnv.GIT_HASH}` : '';
const version = require('../../../package.json').version + hash;

export const forSmallScreens = rules => `
  @media (max-width: 1100px) {
    ${rules}
  }
`;

export const forMobile = rules => `
  @media (max-width: 800px) {
    ${rules}
  }
`;

const DefaultContainer = styled('div')`
  overflow-x: hidden;
  * {
    font-family: medium-content-sans-serif-font, "Inter UI", system-ui, sans-serif;
    font-size: 15px;
  }
`;

const Container = styled('div')`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${p => p.column ? 'column' : 'row'};
  max-width: 1080px;
  min-height: 100px;
  margin: 0 auto;
  padding: 1rem 0;
  margin-bottom: 5rem;
  ${forSmallScreens(`
    padding-left: 2.0rem;
    padding-right: 2.0rem;
  `)}
  ${forMobile(`
    margin-bottom: 2.5rem;
  `)}
`;

const FlexItem = styled('div')`
  flex: ${(({flex = 1}) => flex)};
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

const ButtonLink = styled('a')`
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
  color: #333333;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 0px solid transparent;
  padding: 0.125rem 0.75rem;
  font-size: 18px;
  line-height: 1.75;
  border-radius: 5px;
  transition: all 0.15s ease-in-out;
  ${forMobile(`
    padding: 0.125rem 0.25rem;
  `)}

  &:hover {
    background-color: #f4f4f4;
    border-color: #f4f4f4;
  }

  &:active {
    background-color: #eee;
    border-color: #eee;
  }
`;

const Button = styled(RouterLink)`
  cursor: pointer;
  position: relative;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
  color: #333333;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 0px solid transparent;
  margin: 0rem 0.25rem;
  width: max-content;
  padding: 0.125rem 0.75rem;
  font-size: 18px;
  line-height: 1.75;
  border-radius: 5px;
  transition: all 0.15s ease-in-out;
  ${forMobile(`
    padding: 0.125rem 0.25rem;
  `)}

  &:hover {
    background-color: #f4f4f4;
    border-color: #f4f4f4;
  }

  &:active {
    background-color: #eee;
    border-color: #eee;
  }
`;

const MainButton = styled(Button)`
  background-color: ${themeColor};
  border-color: ${themeColor};
  color: #fff;
  font-size: 18px;

  &:hover {
    background-color: #249959;
    border-color: #249959;
  }

  &:active {
    background-color: #20894f;
    border-color: #20894f;
  }
`;

const LogoTitle = styled('span')`
  display: inline-block;
  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  color: #333333;
  font-size: 22px;
  font-weight: 800;
  cursor: pointer;
  user-select: none;
  margin-top: 4px;

  ${forMobile(`
    display: none;
  `)}
`;

const LogoSection = () => (
  <div onClick={() => navigate(routes.HOME)} css={css`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    width: 125px;
    ${forMobile(`
      width: 36px;
    `)}
    div {
      display: inline-block;
      margin-right: 8px;
    }
  `}>
    <Logo white size={26} style={{filter: 'invert(0.8)'}} />
    <LogoTitle>Meteorite</LogoTitle>
  </div>
);

const LoginContainer = styled('div')``;

const FlexBreak = styled('div')`
  flex-basis: 100%;
  height: 0;
  min-height: ${p => p.height || 0}px;
`;

const Title = styled('h1')`
  font-size: 38px;
  line-height: 38px;
  margin: 0 auto 12px;
  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  font-weight: 500;
  text-align: center;
`;

const GroupedLinks = styled(`div`)`
  text-align: center;
  margin: 8px auto 0;

  a {
    text-decoration: none;
    font-size: 17px;
    position: relative;
    display: inline-block;
    padding: 0.75rem 2.25rem;
    border: 1px solid #EAEDF3;
    margin-left: -1px;
    margin-top: 8px;
    transition: all 75ms ease-in-out;
  }

  a:hover {
    background-color: #EAEDF366;
  }

  a:active {
    background-color: #EAEDF3;
  }

  a:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  a:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const FooterSubtleText = styled('p')`
  margin: 24px auto;
  color: #6c757d;
`;

export function BasicPageWrapper ({loggedIn, onLogout, children}) {
  return (
    <DefaultContainer>
      {/* Header */}
      <Container>
        <FlexItem css={css`
          align-items: center;
          display: flex;
          justify-content: space-between;
        `}>
          <LogoSection />
          {loggedIn ? (
            <LoginContainer>
              <Button to={routes.GUIDE}>{'Guide'}</Button>
              <Button to={routes.PRICING}>{'Pricing'}</Button>
              <Button to={routes.NOTIFICATIONS} css={css`
                &::after {
                  content: "";
                  position: absolute;
                  background: #E91E63;
                  top: 6px;
                  right: 6px;
                  height: 8px;
                  width: 8px;
                  border-radius: 100%;
                  ${forMobile(`
                    right: -1px;
                  `)}
                }`}>{'Notifications'}</Button>
              <ButtonLink href="#" onClick={onLogout}>{'Logout'}</ButtonLink>
            </LoginContainer>
          ) : (
            <LoginContainer>
              <Button to={routes.GUIDE}>{'Guide'}</Button>
              <Button to={routes.PRICING}>{'Pricing'}</Button>
              <MainButton to={routes.LOGIN}>{'Login / Sign up'}</MainButton>
            </LoginContainer>
          )}
        </FlexItem>
      </Container>

      {children}

      {/* Footer */}
      <Container column>
        <Logo white size={42} style={{filter: 'invert(0.8)', margin: '0 auto'}} />
        <Title css={css`font-size: 26px; margin: 12px auto;`}>{'Manage your notifications.'}</Title>
        <FlexBreak height={20} />
        <GroupedLinks>
          <a target="_blank" href="https://donorbox.org/meteorite">Donate</a>
          <a target="_blank" href="https://github.com/nickzuber/meteorite/issues">Feedback</a>
          <a target="_blank" href="https://github.com/nickzuber/meteorite/commits/master">Changelog</a>
        </GroupedLinks>
        <GroupedLinks>
          <a target="_blank" href="https://github.com/nickzuber/meteorite">GitHub</a>
          <a target="_blank" href="https://twitter.com/nick_zuber">Twitter</a>
        </GroupedLinks>
        <FlexBreak height={20} />
        <FooterSubtleText>
          {`© 2019 Nick Zuber – Meteorite v${version}`}
        </FooterSubtleText>
      </Container>
    </DefaultContainer>
  );
};

/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {navigate, Link as RouterLink} from '@reach/router';
import {routes} from '../../constants';
import Logo from '../../components/Logo';
import ConfettiSection from '../../components/Confetti';

import headerPng from '../../images/safari-header.png';
import pwaHeaderPng from '../../images/screenshots/pwa-demo.png';
import regularScreenshotPng from '../../images/traditional-screenshot.png';
import scoreScreenshotPng from '../../images/screenshots/screenshot-score.png';
import iPhoneXMockupPng from '../../images/screenshots/iphone-x-mockup.png';
import iPhoneScreenshotPng from '../../images/screenshots/iphone-x.png';
import { ReactComponent as MentionSvg } from '../../images/svg/mention.svg';
import { ReactComponent as GoodTeamSvg } from '../../images/svg/good-team.svg';
import { ReactComponent as ProcessgSvg } from '../../images/svg/process.svg';
import { ReactComponent as MobileSvg } from '../../images/svg/mobile.svg';

import {InteractionMenu, Card} from '../NotificationsRedesign/redesign/ui';

import RobinLogo from '../../images/logos/robin-logo.png';
import ForwardLogo from '../../images/logos/forward-logo.png';
import FacebookLogo from '../../images/logos/facebook-logo.png';

import '../../styles/gradient.css';
import '../../styles/font.css';

const hash = process.env.GIT_HASH ? `#${process.env.GIT_HASH}` : '';
const version = require('../../../package.json').version + hash;

const themeColor = '#457cff';

const WIDTH_FOR_MEDIUM_SCREENS = '1100px';
const WIDTH_FOR_SMALL_SCREENS = '800px';

const HomeInteractionMenu = styled(InteractionMenu)`
  position: fixed;
  z-index: 10;
  left: 86px !important;
  top: 86px !important;
`;

const PageContainer = styled('div')`
  overflow: hidden;
  background: #fcf8f3;
  position: relative;
  min-height: calc(100vh - 84px);
  height: 100%;
  width: 100%;
  display: block;
  overflow: hidden;
`;

const FixedContainer = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Container = styled('div')`
  position: relative;
  background: rgb(252, 248, 243);
  width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 24px;
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    width: 100%;
  }
`;

const NewTag = styled('span')`
  align-self: center;
  margin-bottom: 8px;
  padding: 1px 3px;
  background: rgb(235, 87, 87);
  color: white;
  border-radius: 3px;
  margin-left: 6px;
  margin-bottom: 6px;
  font-size: 9px;
  line-height: 1.3;
  vertical-align: text-top;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const LogoTitle = styled('span')`
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
`;

const Header = styled('h1')`
  position: relative;
  text-align: left;
  width: 680px;
  max-width: 680px;
  margin: 0;
  z-index: 2;
  font-size: 72px;
  line-height: 78px;
  margin: 0 auto 12px;
  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  font-weight: 500;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    width: 100%;
    font-size: 4rem;
    line-height: 4.25rem;
  }
`;

const SubHeader = styled(Header)`
  hyphens: auto;
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;
  width: 680px;
  max-width: 680px;
  margin: 0 auto;
  font-family: medium-content-sans-serif-font, Inter UI, system-ui, sans-serif;
  font-weight: 500;
  color: #b3b0a9;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    width: 100%;
    font-size: 20px;
    line-height: 26px;
  }
`;

const MainItemContainer = styled(Container)`
  margin: 88px auto 32px;
  align-items: flex-start;
  flex-direction: column;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    margin-top: 0;
  }
`;

const ItemWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 28px;
  width: inherit;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    flex-direction: column;
    flex-flow: column-reverse;
  }
`;

const ItemNumber = styled('span')`
  font-size: 11rem;
  font-weight: 500;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    display: none;
  }
`;

const ItemContainer = styled('div')`
  position: relative;
  width: 540px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  flex-direction: column;
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    width: 100%;
  }
`;

const ItemHeader = styled(Header)`
  position: relative;
  text-align: left;
  width: inherit;
  margin: 0;
  z-index: 2;
  font-size: 62px;
  line-height: 64px;
  margin: 0 0 12px;
  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  font-weight: 500;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    margin-top: 16px;
    font-size: 42px;
    line-height: 48px;
  }
`;

const ItemSubHeader = styled(SubHeader)`
  width: inherit;
`;

const HorizontalListItem = styled('div')`
  flex: 1;
  border-right: ${props => props.last ? '0px' : '1px'} solid rgba(214, 212, 209, 0.3);
  padding: 0 32px;
  @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
    border-right: none;
    border-bottom: ${props => props.last ? '0px' : '1px'} solid rgba(214, 212, 209, 0.3);
    padding-bottom: 32px;
    margin-bottom: 32px;
  }
`;

const Quote = styled('p')`
  margin: 0;
  font-family: medium-content-title-font, Inter UI, sans-serif;
  font-size: 18px;
  font-weight: 400;
  &:before {
    content: open-quote;
  }
  &:after {
    content: close-quote;
  }
`;

const CompanyPerson = styled('div')`
  transform: scale(0.95);
  display: flex;
  padding: 8px 0;
  margin: 0;
  img {
    display: block;
    height: 30px;
    width: 30px;
    border-radius: 2px;
  }
  span {
    display: block;
    padding: 0 16px;
    font-size: 14px;
    line-height: 18px;
    color: #37352f80;
  }
`;

const IconLink = styled('span')`
  position: relative;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  user-select: none;
  height: 40px;
  width: 40px;
  transition: all 150ms ease;
  i {
    font-size: 16px;
    color: inherit;
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
    transform: scale(1);
  }
  &:active:before {
    background: #BFC5D144;
  }
`;

const DemoScreenshotHeader = styled('img')`
  background: #f7f6f3;
  width: 960px;
  max-width: 960px;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 20px, rgb(245, 245, 245) 0px -1px 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 3;
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    width: 100%;
  }
`;

const DemoScreenshot = styled(DemoScreenshotHeader)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const IPhoneScreenshotContainer = styled('img')`
  position: absolute;
  bottom: -32px;
  right: -32px;
  width: 214px;
  max-width: 214px;
  min-width: 107px;
  display: block;
  background: none;
  z-index: 5;
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    display: none;
  }
`;

const IPhoneScreenshot = styled(IPhoneScreenshotContainer)`
  bottom: -48px;
  z-index: 4;
  transform: scale(0.88);
`;

const SmallText = styled('p')`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  color: #37352f;
  z-index: 2;
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    display: none;
  }
`;

const SmallLink = styled('a')`
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  color: #37352f;
  z-index: 2;
  text-decoration: none;
  text-underline-position: initial;
  transition: all 200ms ease;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
    display: none;
  }
`;

export default function Scene ({loggedIn, onLogout, ...props}) {
  const [showBorder, setShowBorder] = React.useState(false);
  const [menu, openMenu] = React.useState(false);

  React.useEffect(() => {
    const body = window.document.querySelector('body');
    const hideMenu = () => openMenu(false);
    // For mobile `touchend`
    body.addEventListener('click', hideMenu);
    return () => body.removeEventListener('click', hideMenu);
  }, []);

  // React.useEffect(() => {
  //   const PAGE_OFFSET = 100;
  //   const onScroll = () => {
  //     if (window.pageYOffset >= PAGE_OFFSET) {
  //       setShowBorder(true);
  //     } else if (window.pageYOffset < PAGE_OFFSET) {
  //       setShowBorder(false);
  //     }
  //   };
  //   window.addEventListener('scroll',  onScroll);
  //   return () => window.removeEventListener('scroll', onScroll);
  // }, []);

  return (
    <PageContainer css={css`padding-top: 84px;`}>
      <FixedContainer css={css`
        transition: all 200ms ease;
        background: #fcf8f3;
        box-shadow: ${showBorder
          ? 'rgba(84, 70, 35, 0) 0px 2px 8px, rgba(84,70,35,0.15) 0px 1px 3px'
          : 'none'
        };
      `}>
        <Container>
          <div css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
              display: inline-block;
              margin-right: 8px;
            }
          `}>
            <Logo white size={26} style={{filter: 'invert(0.8)'}} />
            <LogoTitle>Meteorite</LogoTitle>
          </div>
          <div css={css`
            a {
              position: relative;
              text-decoration: none;
              padding: 4px 12px;
              border-radius: 4px;
              flex-shrink: 0;
              font-size: 15px;
              margin-left: 2px;
              margin-right: 2px;
              font-weight: 500;
              transition: all 200ms ease;
              &:hover {
                background: rgba(55, 53, 47, 0.08);
              }
              &:active {
                background: rgba(55, 53, 47, 0.16);
              }
              @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
                display: none;
              }
            }
          `}>
            <a href="#learn-more">Desktop</a>
            <a href="#apps">iOS & Android</a>
            <div css={css`
              border-right: 1px solid rgb(221, 221, 221);
              height: 14px;
              vertical-align: baseline;
              margin-left: 10px;
              margin-right: 10px;
              display: inline-block;
              @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
                display: none;
              }
            `} />
            {loggedIn ? (
              <>
                <RouterLink to={routes.NOTIFICATIONS}>Notifications</RouterLink>
                <RouterLink to={routes.REDESIGN_NOTIFICATIONS}>
                  Redesign
                  <NewTag>new</NewTag>
                </RouterLink>
                <a href="#" onClick={onLogout}>Sign out</a>
              </>
            ) : (
              <>
                <RouterLink to={routes.LOGIN}>Sign in</RouterLink>
              </>
            )}
          </div>
          <div css={css`
            display: none;
            @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
              display: block;
            }
          `}>
            {/* @TODO implement the menu */}
            <IconLink onClick={() => openMenu(true)}>
              <i className="fas fa-bars"></i>
            </IconLink>
          </div>
        </Container>
      </FixedContainer>

      <HomeInteractionMenu show={menu}>
        <Card css={css`padding: 0;`}>
          <div>
            <a href="#learn-more">Desktop</a>
          </div>
          <div>
            <a href="#apps">iOS & Android</a>
          </div>
          {loggedIn ? (
            <>
              <div>
                <RouterLink to={routes.NOTIFICATIONS}>Notifications</RouterLink>
              </div>
              <div>
                <RouterLink to={routes.REDESIGN_NOTIFICATIONS}>
                  Redesign
                  <NewTag>new</NewTag>
                </RouterLink>
              </div>
              <div>
                <a href="#" onClick={onLogout}>Sign out</a>
              </div>
            </>
          ) : (
            <div>
              <RouterLink to={routes.LOGIN}>Sign in</RouterLink>
            </div>
          )}
        </Card>
      </HomeInteractionMenu>

      <Container css={css`
        margin: 32px auto;
        flex-direction: column;
      `}>
        <div css={css`
          width: inherit;
          position: relative;
          margin: 0 auto 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          flex-direction: column;
        `}>
          <ConfettiSection />

          {/* Header for larger devices */}
          <Header css={css`
            @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
              display: none;
            }`}>
            {'Control your GitHub notifications'}
          </Header>
          {/* Header for small devices */}
          <Header css={css`
            display: none;
            @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
              margin-top: -36px;
              display: block;
            }`}>
            {'Control'}<br />{'your GitHub notifications'}
          </Header>

          <div css={css`margin: 0 32px; width: inherit;`}>
            <SubHeader css={css`color: rgb(55, 53, 47);`}>
              {'Prioritize the tasks that keep you and your team most productive by organizing your notifications'}
            </SubHeader>
            <div css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 680px;
              max-width: 680px;
              margin: 0 auto;
              @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
                width: 100%;
              }
            `}>
              <div css={css`
                z-index: 2;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin: 24px 0;
                a, span {
                  z-index: 2;
                  cursor: pointer;
                  text-decoration: none;
                  user-select: none;
                  margin-right: 12px;
                  display: inline-flex;
                  align-items: center;
                  white-space: nowrap;
                  height: 36px;
                  border-radius: 3px;
                  color: ${themeColor};
                  font-size: 14px;
                  line-height: 1;
                  padding-left: 12px;
                  padding-right: 12px;
                  background: rgb(230, 234, 244);
                  font-weight: 500;
                  box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px, rgba(65, 119, 255, 0.29) 0px 0px 0px 1px inset;
                  transition: all 200ms ease;
                  &:hover {
                    background: rgb(217, 223, 239);
                  }
                  &:active {
                    background: rgb(193, 206, 243);
                  }
                }
                i {
                  z-index: 2;
                  margin-left: 8px;
                  color: ${themeColor};
                }
              `}>
                <span onClick={() => navigate(routes.REDESIGN_NOTIFICATIONS)}>{'Let\'s get started'}</span>
                <a href="#learn-more" css={css`
                  background: none !important;
                  box-shadow: none !important;
                  color: #37352f !important;
                  &:hover {
                    background: #37352f12 !important;
                  }
                  &:active {
                    background: #37352f18 !important;
                  }
                  i {
                    font-size: 14px;
                    color: #37352f;
                  }
                `}>
                  {'Learn more'}
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div css={css`
              z-index: 2;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              margin: 12px 0;
              i {
                z-index: 2;
                color: #37352f;
                margin-right: 4px;
                font-size: 10px;
              }
            `}>
              <SmallLink
                css={css`margin-right: 16px;`}
                target="_blank"
                href="https://github.com/nickzuber/meteorite"
              >
                <i class="fas fa-code-branch"></i>
                {'View and contribute on GitHub'}
              </SmallLink>
              <SmallText>
                <i className="fas fa-user-friends"></i>
                {'Free and open sourced'}
              </SmallText>
            </div>
            </div>
          </div>
        </div>
        <div css={css`position: relative;`}>
          <DemoScreenshotHeader src={headerPng} />
          <DemoScreenshot src={regularScreenshotPng} />
          <IPhoneScreenshotContainer src={iPhoneXMockupPng} />
          <IPhoneScreenshot src={iPhoneScreenshotPng} />
        </div>
      </Container>

      <Container css={css`
        position: relative;
        margin: 48px auto 0;
        padding: 48px 16px 0;
        align-items: center;
        flex-direction: column;
        // border-top: 1px solid rgba(214, 212, 209, 0.3);
        // border-bottom: 1px solid rgba(214, 212, 209, 0.3);
      `}>
        <div css={css`
          position: relative;
          margin: 0 0 18px;
          width: inherit;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          flex-direction: column;
        `}>
          <MentionSvg height={164} css={css`
            @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
              transform: scale(0.9);
            }
            @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
              transform: scale(0.7);
            }
          `} />
          <ItemHeader css={css`
            margin-top: 32px;
            font-size: 48px;
            line-height: 50px;
            text-align: center;
            @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
              margin-top: 16px;
              line-height: 46px;
              font-size: 48px;
            }
          `}>
            {'Hear what folks have to say'}
          </ItemHeader>
          <SubHeader css={css`
            text-align: center;
            margin-bottom: 32px;
          `}>
            {'Loved by other human beings, just like you'}
          </SubHeader>
          <div css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 32px;
            @media (max-width: ${WIDTH_FOR_SMALL_SCREENS}) {
              flex-direction: column;
            }
          `}>
            <HorizontalListItem>
              <Quote>{`So good! I love the importance sorting!`}</Quote>
              <CompanyPerson>
                <img src={FacebookLogo} />
                <span>
                  {'— Mike Grabowski'}<br />
                  {'Software Architect, React Native'}
                </span>
              </CompanyPerson>
            </HorizontalListItem>
            <HorizontalListItem>
              <Quote>{`I've been using it for a bit and it's so useful, especially if you use GitHub for work.`}</Quote>
              <CompanyPerson>
                <img src={RobinLogo} />
                <span>
                  {'— Trevor Suarez'}<br />
                  {'Robin, Backend Software Engineer'}
                </span>
              </CompanyPerson>
            </HorizontalListItem>
            <HorizontalListItem last>
              <Quote>{`Awww sh*t, nice.`}</Quote>
              <CompanyPerson>
                <img src={ForwardLogo} />
                <span>
                  {'— Chris Walker'}<br />
                  {'Forward, Software Engineer'}
                </span>
              </CompanyPerson>
            </HorizontalListItem>
          </div>
        </div>
      </Container>

      <MainItemContainer>
        <ItemWrapper>
        <ItemNumber>{1}</ItemNumber>
        <ItemContainer>
          <ItemHeader id="learn-more">
            {'An assistant for your GitHub notifications'}
          </ItemHeader>
          <ItemSubHeader>
            {'Do the same things you do everyday, just a whole lot easier'}
          </ItemSubHeader>
        </ItemContainer>
        <ProcessgSvg height={164} width={224} />
        </ItemWrapper>

        <div css={css`position: relative;`}>
          <DemoScreenshotHeader src={headerPng} />
          <DemoScreenshot src={regularScreenshotPng} />
        </div>
      </MainItemContainer>

      <MainItemContainer>
        <ItemWrapper>
        <ItemNumber>{2}</ItemNumber>
        <ItemContainer>
          <ItemHeader>
            {'Your time matters, so things stay simple'}
          </ItemHeader>
          <ItemSubHeader>
            {'Simply sign in and start working — no complicated or weirdly intrusive set up needed'}
          </ItemSubHeader>
        </ItemContainer>
        <GoodTeamSvg height={164} width={224} />
        </ItemWrapper>

        <div css={css`position: relative;`}>
          <DemoScreenshotHeader src={headerPng} />
          <DemoScreenshot src={scoreScreenshotPng} />
        </div>
      </MainItemContainer>

      <MainItemContainer>
        <ItemWrapper>
        <ItemNumber>{3}</ItemNumber>
        <ItemContainer>
          <ItemHeader id="apps">
            {'Work anywhere and everywhere'}
          </ItemHeader>
          <ItemSubHeader>
            {'You love accessibility and so does Meteorite — available on iOS, Android, web, and desktop as an installable PWA'}
          </ItemSubHeader>
        </ItemContainer>
        <MobileSvg height={164} width={224} />
        </ItemWrapper>

        <div css={css`position: relative;`}>
          <DemoScreenshotHeader src={pwaHeaderPng} />
          <DemoScreenshot src={regularScreenshotPng} />
        </div>
      </MainItemContainer>

      <Container css={css`
        margin: 88px auto 0;
        width: 100%;
        max-width: 100%;
        background: #f0ebe4;
      `}>
      <Container css={css`
        align-items: flex-start;
        flex-direction: column;
        background: none;
      `}>
        <div css={css`
          width: 100%;
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          align-items: center;
          span {
            display: inline-block;
            font-size: 11px;
            color: #37352f52;
            margin: 4px 12px;
            font-weight: 500;
            @media (max-width: ${WIDTH_FOR_MEDIUM_SCREENS}) {
              margin-right: 12px !important;
            }
          }
          a {
            display: inline-block;
            text-decoration: underline;
            font-size: 11px;
            color: #37352f52;
            margin: 4px 12px;
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
        </div>
      </Container>
      </Container>

    </PageContainer>
  );
};

/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import { useTransition, animated, config } from 'react-spring'
import {navigate, Link as RouterLink} from '@reach/router';
import {routes} from '../../constants';
import Logo from '../../components/Logo';

import ItemPng from '../../images/screenshots/item.png';
import ScreenshotPng from '../../images/screenshots/screenshot-bigger.png';
import HighlightPng from '../../images/screenshots/highlight.png';

import RobinLogo from '../../images/logos/robin-logo.png';
import ForwardLogo from '../../images/logos/forward-logo.png';
import FacebookLogo from '../../images/logos/facebook-logo.png';

import '../../styles/gradient.css';
import '../../styles/font.css';

const themeColor = '#27B768';

const hash = process.env.GIT_HASH ? `#${process.env.GIT_HASH}` : '';
const version = require('../../../package.json').version + hash;

const ProductHuntButton = () => (
  <a href="https://www.producthunt.com/posts/meteorite?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-meteorite" target="_blank">
    <img
      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=145651&theme=dark"
      alt="Meteorite - Smarter GitHub notifications. | Product Hunt Embed"
      style={{width: 200, height: 43}}
      width="200px"
      height="43px" />
  </a>
);

const DefaultContainer = styled('div')`
  overflow-x: hidden;
  * {
    font-family: medium-content-sans-serif-font, "Inter UI", system-ui, sans-serif;
    font-size: 15px;
  }
`;

const Outer = styled('div')`
  background: ${p => p.alt ? '#f6f2ed' : 'none'};
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
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

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
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

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

const HeroButton = styled(MainButton)`
  font-size: 22px;
  margin: -4px 8px 0;
  margin-left: 0;
`;

const LogoTitle = styled('span')`
  display: inline-block;
  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  color: #333333;
  font-size: 22px;
  font-weight: 800;
  cursor: pointer;
  user-select: none;
`;

const LogoSection = () => (
  <div css={css`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    width: 125px;
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

const HeroTitle = styled('h1')`
  font-size: 68px;
  line-height: 68px;
  margin: 0 auto 6px;
  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  font-weight: 500;
`;

const HeroSubtitle = styled('h1')`
  color: #6c757d;
  font-size: 24px;
  line-height: 28px;
  margin: 0 auto 16px;
  font-family: medium-content-sans-serif-font, Inter UI, system-ui, sans-serif;
  font-weight: 500;
`;

const Title = styled('h1')`
  font-size: 38px;
  line-height: 38px;
  margin: 0 auto 12px;
  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  font-weight: 500;
  text-align: center;
`;

const Subtitle = styled('h1')`
  color: #6c757d;
  font-size: 20px;
  line-height: 24px;
  margin: 0 auto 16px;
  font-family: medium-content-sans-serif-font, Inter UI, system-ui, sans-serif;
  font-weight: 500;
  max-width: 540px;
  text-align: center;
`;

const ItemImage = styled('img')`
  width: 847px;
  box-shadow: rgba(84, 70, 35, 0) 0px 4px 18px, rgba(84, 70, 35, 0.15) 0px 2px 8px;
  border-radius: 6px;
  margin-left: ${props => props.left || 0}px;
  margin-top: ${props => props.top || 0}px;
  transform: rotate(${props => props.deg || 0}deg) scale(${props => props.scale || 1});
`;

const HeroLeft = styled(FlexItem)`
  z-index: 1;
  flex-grow: 1;
  width: 50%;
`;

const HeroRight = styled(FlexItem)`
  flex-grow: 1;
  width: 50%;
`;

const DotsBackground = styled('div')`
  position: absolute;
  height: 400px;
  width: 70%;
  margin-left: -60px;
  background: radial-gradient(transparent 50%, #fffefd), url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKElEQVQoU2NkIBIwEqmOgQ4KX715/x/mHDERQbiNGFZTXyGuUKC+rwHAcQwLu0IifQAAAABJRU5ErkJggg==) repeat;
`;

const CompanyQuotesContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
`;

const HorizontalListItem = styled('div')`
  flex: 1;
  border-right: ${props => props.last ? '0px' : '1px'} solid rgba(214, 212, 209, 0.3);
  padding: 0 32px;
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
    font-size: 16px;
    line-height: 20px;
    color: #37352f80;
  }
`;

const WorkflowToggle = (props) => {
  const [state, setState] = React.useState(0);

  const items = [
    {
      id: 0,
      title: 'Filter The Noise',
      description: 'Stay focused on the important things. We\'ll only show the notifications that matter to you.',
      image: ScreenshotPng
    },
    {
      id: 1,
      title: 'Highlight The Callouts',
      description: 'When things stand out, you shouldn\'t miss it. We mark notifications when there\'s something interesting going down.',
      image: HighlightPng
    },
    {
      id: 2,
      title: 'Sort By Importance',
      description: 'Don\'t get lost at sea – the most important notifications stay at the top of the list.',
      image: ScreenshotPng
    },
  ];

  const activeItem = items[state];
  const transitions = useTransition(items[state], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 }
    // config: config.gentle
  });

  return (
    <div css={css`
      margin-top: 32px;
      display: flex;
      flex-direction: row;
    `}>
      <div css={css`
        flex: 1;
      `}>
        {items.map((item, xid) => (
          <div
            key={xid}
            onClick={() => setState(xid)}
            css={css`
              border-radius: 8px;
              padding: 18px 20px;
              margin: 0 32px 8px 0;
              cursor: pointer;
              background: ${state === xid ? '#ffffff' : 'none'};
              transition: all 0.15s ease-in-out;
          `}>
            <h3 css={css`
              font-size: 22px;
              line-height: 26px;
              margin: 0 auto 4px;
              font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
              font-weight: 500;
            `}>{item.title}</h3>
            <p css={css`
              font-size: 16px;
              line-height: 20px;
              margin: 0;
            `}>{item.description}</p>
          </div>
        ))}
      </div>
      <div css={css`
        position: relative;
        flex: 3;
      `}>
        <img
          src={activeItem.image}
          css={css`
            opacity: 0;
            max-width: 100%;
          `} />
        {transitions.map(({ _item, props, key }) => (
          <animated.div
            key={key}
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: #fffefc;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              background-position-x: 0;
              background-position-y: 0;
              will-change: opacity;
              box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.175);
              border-radius: 4px;
            `}
            style={{ ...props, backgroundImage: `url(${activeItem.image})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Scene ({loggedIn, onLogout, ...props}) {
  const baseItemOffset = {
    scale: 0.1,
    top: -185,
    left: 20
  };

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
              <Button to={routes.REDESIGN_NOTIFICATIONS}>{'Notifications'}</Button>
              <ButtonLink href="#" onClick={onLogout}>{'Logout'}</ButtonLink>
            </LoginContainer>
          ) : (
            <LoginContainer>
              <MainButton to={routes.LOGIN}>{'Login / Sign up'}</MainButton>
            </LoginContainer>
          )}
        </FlexItem>
      </Container>

      {/* Hero */}
      <Container>
        <HeroLeft>
          <HeroTitle>{'Manage your notifications.'}</HeroTitle>
          <HeroSubtitle>{'Prioritize the tasks that keep you and your team most\
                          productive by organizing your notifications'}</HeroSubtitle>
          <FlexBreak />
          <HeroButton to={routes.LOGIN}>{'Login / Sign up'}</HeroButton>
          <ProductHuntButton />
        </HeroLeft>
        <HeroRight>
          <DotsBackground />
          <ItemImage
            scale={baseItemOffset.scale + 0.8}
            left={baseItemOffset.left + 8}
            top={25}
            src={ItemPng} />
          <ItemImage
            deg={0}
            scale={baseItemOffset.scale + 0.95}
            left={baseItemOffset.left}
            top={baseItemOffset.top + 4}
            src={ItemPng} />
        </HeroRight>
      </Container>

      {/* Testimonials */}
      <Container column>
        <FlexBreak height={60} />
        <Title>{'Hear what others are saying'}</Title>
        <Subtitle>{'Loved by other human beings, just like you'}</Subtitle>
        <CompanyQuotesContainer>
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
        </CompanyQuotesContainer>
      </Container>

      {/* Explainer */}
      <Outer alt>
        <Container column>
          <FlexBreak height={60} />
          <Title>{'The Notification Lifecycle'}</Title>
          <Subtitle>{'GitHub notifications can actually be your friend – with a little bit of discipline.\
                      All we need to do is filter out the noise & organize things in a way that makes sense.'}</Subtitle>
          <WorkflowToggle />
          <FlexBreak height={60} />
        </Container>
      </Outer>
    </DefaultContainer>
  );
};

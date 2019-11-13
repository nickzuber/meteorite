/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {Link as RouterLink} from '@reach/router';
import {routes} from '../../constants';
import {
  BasicPageWrapper,
  forSmallScreens,
  forMobile
} from '../common';
import WorkflowToggle from './WorkflowToggle';

import {ReactComponent as CloudOffSvg} from '../../images/svg/icons/cloud_off.svg'
import {ReactComponent as NotificationsActiveSvg} from '../../images/svg/icons/notifications_active.svg'
import {ReactComponent as PriorityHighSvg} from '../../images/svg/icons/priority_high.svg'
import {ReactComponent as TuneSvg} from '../../images/svg/icons/tune.svg'
import {ReactComponent as SpeedSvg} from '../../images/svg/icons/speed.svg'
import {ReactComponent as GpsFixedSvg} from '../../images/svg/icons/gps_fixed.svg'
import {ReactComponent as WbIridescentSvg} from '../../images/svg/icons/wb_iridescent.svg'
import {ReactComponent as TimelineSvg} from '../../images/svg/icons/timeline.svg'

import ItemPng from '../../images/screenshots/item.png';
import ItemTwoPng from '../../images/screenshots/item-2.png';
import ScreenshotPng from '../../images/screenshots/new/dashboard.png';
import ScoresPng from '../../images/screenshots/new/scores.png';
import ReasonsPng from '../../images/screenshots/new/reasons.png';

import RobinLogo from '../../images/logos/robin-logo.png';
import ForwardLogo from '../../images/logos/forward-logo.png';
import FacebookLogo from '../../images/logos/facebook-logo.png';

import '../../styles/gradient.css';
import '../../styles/font.css';

const themeColor = '#27B768';
const ALT_BACKGROUND_COLOR = '#f6f2ed';

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

const Outer = styled('div')`
  background: ${p => p.alt ? ALT_BACKGROUND_COLOR : 'none'};
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
    padding-left: 2.5rem;
    padding-right: 2.5rem;
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
  padding: 0.125rem 1rem;
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

  ${forMobile(`
    font-size: 52px;
    line-height: 58px;
  `)}
`;

const HeroSubtitle = styled('h1')`
  color: #6c757d;
  font-size: 24px;
  line-height: 28px;
  margin: 0 auto 16px;
  width: 80%;
  margin-left: 0;
  font-family: medium-content-sans-serif-font, Inter UI, system-ui, sans-serif;
  font-weight: 500;

  ${forMobile(`
    margin: 0 auto 32px;
    font-size: 20px;
    line-height: 24px;
  `)}
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
  ${forMobile(`
    margin: 0 auto;
    width: 100%;
    text-align: center;
  `)}
`;

const HeroRight = styled(FlexItem)`
  flex-grow: 1;
  width: 50%;
  ${forMobile(`
    display: none;
  `)}
`;

const DotsBackground = styled('div')`
  position: absolute;
  height: 400px;
  width: 100%;
  margin-left: -60px;
  background: radial-gradient(transparent 50%, #fffefd), \
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKElEQVQoU2NkIBIwEqmOgQ4KX715/x/mHDERQbiNGFZTXyGuUKC+rwHAcQwLu0IifQAAAABJRU5ErkJggg==) repeat;
  ${forMobile(`
    width: 90%;
    margin: 0 auto;
  `)}
`;

const FooterImageContainer = styled('div')`
  position: relative;
  height: 250px;
  width: 100%;
  text-align: center;
  background: radial-gradient(transparent 50%, ${ALT_BACKGROUND_COLOR}), \
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKElEQVQoU2NkIBIwEqmOgQ4KX715/x/mHDERQbiNGFZTXyGuUKC+rwHAcQwLu0IifQAAAABJRU5ErkJggg==) repeat;
  ${forMobile(`
    display: none;
  `)}
`;

const CompanyQuotesContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
  ${forMobile(`
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
  `)}
`;

const HorizontalFlexContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
`;

const FeatureItem = styled('div')(({color}) => `
  flex: 1;
  ${forMobile(`
    flex: 1 0 34%;
  `)}
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  padding: 0 12px;

  svg {
    background: ${color}28;
    fill: ${color};
    border-radius: 100%;
    padding: 12px;
    height: 24px;
    width: 24px;
  }

  h3 {
    font-size: 24px;
    line-height: 25px;
    text-align: center;
    margin: 18px auto 8px;
    font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
    font-weight: 500;
  }

  p {
    font-size: 17px;
    line-height: 22px;
    margin: 0;
    text-align: center;
  }
`);

const HorizontalListItem = styled('div')(({last}) => `
  flex: 1;
  border-right: ${last ? '0px' : '1px'} solid rgba(214, 212, 209, 0.3);
  padding: 0 32px;
  ${forMobile(`
    border-right: 0;
    border-bottom: ${last ? '0px' : '1px'} solid rgba(214, 212, 209, 0.3);
    padding: 32px 0;
  `)}
`);

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

export default function Scene (props) {
  const baseItemOffset = {
    scale: 0.1,
    top: -185,
    left: 20
  };

  return (
    <BasicPageWrapper {...props}>

      {/* Hero */}
      <Container css={css`
        ${forMobile(`
          flex-direction: column;
        `)}
      `}>
        <HeroLeft>
          <HeroTitle>{'Manage your notifications.'}</HeroTitle>
          <HeroSubtitle>{'Meteorite helps organize, filter, and prioritize your\
                          GitHub notifications to make your life easier'}</HeroSubtitle>
          <FlexBreak />
          <div css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            ${forMobile(`
              display: block;
              margin: 0 auto;
              width: 300px;
            `)}
          `}>
            <HeroButton css={css`${forMobile(`margin-bottom: 12px;`)}`} to={routes.LOGIN}>{'Login / Sign up'}</HeroButton>
            <ProductHuntButton />
          </div>
        </HeroLeft>
        <HeroRight>
          <DotsBackground />
          <ItemImage
            scale={baseItemOffset.scale + 0.8}
            left={baseItemOffset.left + 8}
            top={25}
            src={ItemTwoPng} />
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

      {/* Lifecycle */}
      <Outer alt>
        <Container column>
          <FlexBreak height={60} />
          <Title>{'The Notification Lifecycle'}</Title>
          <Subtitle>{'GitHub notifications can actually be your friend – with a little bit of discipline.\
                      All we need to do is filter out the noise & organize things in a way that makes sense.'}</Subtitle>
          <WorkflowToggle />
          <FlexBreak height={100} />
          <Title css={css`font-size: 32px; line-height: 38px; margin-bottom: 24px;`}>{'Start using Meteorite absolutely free'}</Title>
          <HeroButton to={routes.LOGIN} css={css`margin: 0 auto;`}>{'Login / Sign up'}</HeroButton>
          <FlexBreak height={80} />
        </Container>
      </Outer>

      {/* Features */}
      <Container column>
        <FlexBreak height={20} />
        <Title>{'Features built for getting things done.'}</Title>
        <Subtitle>{'All of the features of Meteorite are specifically designed'}<br />
                  {'for optimizing your workday'}</Subtitle>
        <HorizontalFlexContainer>
          <FeatureItem color={'#9C27B0'}>
            <CloudOffSvg />
            <h3>{'Serverless'}</h3>
            <p>{'Any notification scoring and storing is done completely offline.'}</p>
          </FeatureItem>
          <FeatureItem color={'#ffc915'}>
            <NotificationsActiveSvg />
            <h3>{'Desktop Notifications'}</h3>
            <p>{'Get notified when we do – ability to turn on desktop notifications.'}</p>
          </FeatureItem>
          <FeatureItem color={'#27B768'}>
            <PriorityHighSvg />
            <h3>{'Auto Sorting'}</h3>
            <p>{'Keep your most important notifications at the top of the list.'}</p>
          </FeatureItem>
          <FeatureItem color={'#00A0F5'}>
            <TuneSvg />
            <h3>{'Filter Noise'}</h3>
            <p>{'Any notifications that don\'t directly involve you are hidden.'}</p>
          </FeatureItem>
          <FlexBreak />
          <FeatureItem color={'#EE3F46'}>
            <SpeedSvg />
            <h3>{'Dead Simple'}</h3>
            <p>{'No integrations – just log in and start working.'}</p>
          </FeatureItem>
          <FeatureItem color={'#10293c'}>
            <GpsFixedSvg />
            <h3>{'Live Updates'}</h3>
            <p>{'All of your notifications are processed in real time.'}</p>
          </FeatureItem>
          <FeatureItem color={'#fd9446'}>
            <WbIridescentSvg />
            <h3>{'Reasoning'}</h3>
            <p>{'We\'ll also tell you why you\'re getting each notification.'}</p>
          </FeatureItem>
          <FeatureItem color={'#fc46fd'}>
            <TimelineSvg />
            <h3>{'Statistics'}</h3>
            <p>{'Better understand how you work with data visualizations.'}</p>
          </FeatureItem>
        </HorizontalFlexContainer>
      </Container>

      {/* Closer */}
      <Outer alt>
        <Container column>
          <FlexBreak height={80} />
          <Title>{'Better notifications for everyone.'}</Title>
          <FlexBreak height={20} />
          <HeroButton to={routes.LOGIN} css={css`margin: 0 auto;`}>{'Login / Sign up'}</HeroButton>
          <FlexBreak height={40} />
          <FooterImageContainer>
            <ItemImage
              scale={baseItemOffset.scale + 0.8}
              top={60}
              src={ItemPng} />
            <ItemImage
              deg={0}
              scale={baseItemOffset.scale + 0.95}
              top={-30}
              src={ItemTwoPng} />
            </FooterImageContainer>
            <FlexBreak height={40} />
        </Container>
      </Outer>
    </BasicPageWrapper>
  );
};

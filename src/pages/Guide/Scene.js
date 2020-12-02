/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {Link as RouterLink} from '@reach/router';
import {routes} from '../../constants';
import {BasicPageWrapper, forSmallScreens, forMobile} from '../common';
import WorkflowToggle from '../Home/WorkflowToggle';

import SettingsPng from '../../images/screenshots/new/settings.png';
import ParticipatingPng from '../../images/screenshots/new/settings-participating.png';
import WatchingPng from '../../images/screenshots/new/settings-watching.png';

import '../../styles/gradient.css';
import '../../styles/font.css';

const themeColor = '#27B768';
const ALT_BACKGROUND_COLOR = '#f6f2ed';

const Outer = styled('div')`
  background: ${p => (p.alt ? ALT_BACKGROUND_COLOR : 'none')};
`;

const Container = styled('div')`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${p => (p.column ? 'column' : 'row')};
  max-width: 1080px;
  min-height: 100px;
  margin: 0 auto;
  padding: 1rem 0;
  margin-bottom: 4rem;
  ${forSmallScreens(`
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  `)} ${forMobile(`
    margin-bottom: 2.5rem;
  `)};
`;

const LightContainer = styled(Container)`
  ${forSmallScreens(`
    padding-left: 0;
    padding-right: 0;
  `)} ${forMobile(`
    margin-bottom: 2.5rem;
  `)};
`;

const FlexItem = styled('div')`
  flex: ${({flex = 1}) => flex};
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
  -webkit-transition: color 0.15s ease-in-out,
    background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

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
  margin: 0 auto 6px 0;
  font-family: medium-marketing-display-font, Georgia, Cambria, Times New Roman,
    Times, serif;
  font-weight: 500;

  ${forMobile(`
    font-size: 46px;
    line-height: 54px;
    margin: 0 auto 6px;
  `)};
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
  `)};
`;

const Title = styled('h1')`
  font-size: 38px;
  line-height: 38px;
  margin: 0 auto 12px;
  font-family: medium-marketing-display-font, Georgia, Cambria, Times New Roman,
    Times, serif;
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

const LeftTitle = styled(Title)`
  margin: 0 0 4px;
  text-align: left;
  font-size: 34px;
  line-height: 34px;
`;

const LeftSubtitle = styled(Subtitle)`
  margin: 0 0 12px;
  text-align: left;
  font-size: 20px;
  line-height: 23px;
`;

const HeroLeft = styled(FlexItem)`
  z-index: 1;
  flex-grow: 1;
  width: 50%;
  min-height: 262px;
  ${forMobile(`
    margin: 0 auto;
    width: 100%;
    text-align: center;
    min-height: unset;
  `)};
`;

const HeroRight = styled(FlexItem)`
  flex-grow: 1;
  width: 50%;
  ${forMobile(`
    margin: 0 auto;
    width: 100%;
  `)};
`;

const PricingContainer = styled('div')`
  position: relative;
  background: ${ALT_BACKGROUND_COLOR};
  width: 70%;
  margin-right: 0;
  margin-left: auto;
  min-height: 100px;
  border-radius: 4px;
  padding: 28px 24px;
  text-align: left;
  ${forMobile(`
    width: 100%;
  `)} h4 {
    margin: -2px 0 0;
    font-size: 20px;
    color: #26b768;
    font-family: medium-marketing-display-font, Georgia, Cambria,
      Times New Roman, Times, serif;
  }

  p {
    font-size: 14px;
    line-height: 16px;
    margin: 8px auto 0;
    color: #6c757d;
  }
`;

const Price = styled(Title)(
  p => `
  font-size: ${p.crossed ? 32 : 52}px;
  line-height: ${p.crossed ? 32 : 54}px;
  text-decoration: ${p.crossed ? 'line-through' : 'unset'};
  display: inline-block;
  margin-right: 8px;
  text-align: left;
`
);

const Badge = styled('span')`
  font-size: 14px;
  line-height: 16px;
  text-align: left;
  background: #26b768;
  color: #fff;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  vertical-align: super;
  display: inline-block;
`;

const FloatingLinkBox = styled('div')`
  background: rgb(255, 254, 253);
  flex: 1;
  position: relative;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 4px;
  padding: 16px 24px;
  margin: 0 24px 0 0;
  ${forMobile(`
    margin: 0 0 24px 0;
  `)} h4 {
    margin: 0;
    color: #47494b;
    font-size: 18px;
  }

  p {
    font-size: 16px;
    line-height: 18px;
    margin: 6px auto;
    color: #6c757d;
  }

  a {
    text-decoration: none;
    font-size: 16px;
    color: #00a0f5;
    transition: all 200ms ease;
  }
  a:hover {
    color: #0886c9;
  }
  a::after {
    content: ' →';
  }
`;

const HorizontalFlexContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 1rem;
`;

const FAQItem = styled('div')`
  flex: 1 0 34%;
  ${forMobile(`
    flex: 1 0 51%;
  `)} flex-direction: column;
  display: flex;
  align-items: left;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 0 12px;

  h3 {
    font-size: 21px;
    justify-content: center;
    line-height: 25px;
    margin: 18px 0 8px;
    font-family: medium-marketing-display-font, Georgia, Cambria,
      Times New Roman, Times, serif;
    font-weight: 600;
    letter-spacing: 0.7px;
  }

  p {
    font-size: 18px;
    justify-content: center;
    line-height: 22px;
    margin: 0 0 12px;
    color: #6c757d;

    a {
      font-size: 18px;
      justify-content: center;
      line-height: 22px;
    }
  }
`;

const DotsBackground = styled('div')`
  position: absolute;
  height: 400px;
  width: 100%;
  margin-left: -60px;
  background: radial-gradient(transparent 50%, #fffefd), \
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKElEQVQoU2NkIBIwEqmOgQ4KX715/x/mHDERQbiNGFZTXyGuUKC+rwHAcQwLu0IifQAAAABJRU5ErkJggg==) repeat;
  ${forMobile(`
    display: none;
  `)};
`;

const Checklist = styled('div')`
  z-index: 1;
  background: #fff;
  margin: 0 auto;
  box-shadow: rgba(84, 70, 35, 0) 0px 4px 18px,
    rgba(84, 70, 35, 0.15) 0px 2px 8px;
  border-radius: 6px;
  min-height: 100px;
  min-width: 200px;
  padding: 28px 32px;
`;

const ChecklistTitle = styled(Title)`
  font-size: 28px;
  line-height: 30px;
  text-align: left;
  padding-right: 48px;
`;

const ChecklistItem = styled('span')`
  display: block;
  color: #737b83;

  &::before {
    content: '✓';
    font-size: 18px;
    line-height: 24px;
    border-radius: 100%;
    background: #27b768;
    color: #fff;
    font-weight: 600;
    height: 22px;
    width: 22px;
    display: inline-block;
    text-align: center;
    margin-right: 6px;
    transform: scale(0.75);
  }
`;

const GuideContainer = styled('div')`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  ${forSmallScreens(`
    flex-direction: column;
  `)};
`;

const GuideItem = styled('div')(
  p => `
  flex: ${p.flex || 1};
  position: relative;
  ${forSmallScreens(`
    margin-bottom: 24px;
  `)}

  h3 {
    font-size: 28px;
    line-height: 34px;
    margin: 0 auto 8px;
    font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
    font-weight: 500;
  }

  p {
    padding-right: 15%;
    font-size: 16px;
    line-height: 20px;
    margin: 0;
  }

  img {
    max-width: 100%;
    will-change: opacity;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.175);
    border-radius: 4px;
  }
`
);

export default function Scene(props) {
  return (
    <BasicPageWrapper {...props}>
      {/* Hero */}
      <Container
        css={css`
          ${forMobile(`
          flex-direction: column;
        `)};
        `}
      >
        <HeroLeft>
          <HeroTitle>
            {'No installation.'}
            <br />
            {'Easy setup.'}
          </HeroTitle>
          <HeroSubtitle
            css={css`
              margin-top: -35px;
            `}
          >
            {"You're at most a few click away."}
          </HeroSubtitle>
          <FlexBreak />
        </HeroLeft>
        <HeroRight>
          <DotsBackground />
          <Checklist>
            <ChecklistTitle>{'Only a few simple steps.'}</ChecklistTitle>
            <ChecklistItem>{'Navigate to your GitHub settings.'}</ChecklistItem>
            <ChecklistItem>{'Turn on web notifications.'}</ChecklistItem>
            <ChecklistItem>{"And you're done."}</ChecklistItem>
          </Checklist>
        </HeroRight>
      </Container>

      {/* Guide */}
      <Outer alt>
        <Container column>
          <FlexBreak height={60} />
          <Title>{'Ready. Set. Go.'}</Title>
          <Subtitle>
            {
              'You only need to flip a few switches before we can organize your notifications\
                      and make your life easier.'
            }
          </Subtitle>

          <WorkflowToggle
            easeTimingMs={100}
            items={[
              {
                id: 0,
                title: '1. Visit your settings',
                description:
                  'Head over to GitHub and view your account settings in the notifications tab.',
                image: SettingsPng
              },
              {
                id: 1,
                title: '2. Enable Participating alerts',
                description:
                  'Turn on "Web and Mobile" notifications for the participating tab.',
                image: ParticipatingPng
              },
              {
                id: 2,
                title: '3. Enable Watching alerts',
                description:
                  'Turn on "Web and Mobile" notifications for the watching tab.',
                image: WatchingPng
              }
            ]}
          />

          <FlexBreak height={100} />
          <Title
            css={css`
              font-size: 32px;
              line-height: 38px;
              margin-bottom: 24px;
            `}
          >
            {'Start using Meteorite absolutely free'}
          </Title>
          <HeroButton
            to={routes.LOGIN}
            css={css`
              margin: 0 auto;
            `}
          >
            {'Login / Sign up'}
          </HeroButton>
          <FlexBreak height={80} />
        </Container>
      </Outer>
    </BasicPageWrapper>
  );
}

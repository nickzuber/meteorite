/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {Link as RouterLink} from '@reach/router';
import {routes} from '../../constants';
import {BasicPageWrapper, forSmallScreens, forMobile} from '../common';

import ItemPng from '../../images/screenshots/item.png';
import ItemTwoPng from '../../images/screenshots/item-2.png';

import '../../styles/gradient.css';
import '../../styles/font.css';

const themeColor = '#27B768';
const ALT_BACKGROUND_COLOR = '#f6f2ed';

const ProductHuntButton = () => (
  <a
    href="https://www.producthunt.com/posts/meteorite?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-meteorite"
    target="_blank"
  >
    <img
      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=145651&theme=dark"
      alt="Meteorite - Smarter GitHub notifications. | Product Hunt Embed"
      style={{width: 200, height: 43}}
      width="200px"
      height="43px"
    />
  </a>
);

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
  `)}
  ${forMobile(`
    margin-bottom: 2.5rem;
  `)}
`;

const LightContainer = styled(Container)`
  ${forSmallScreens(`
    padding-left: 0;
    padding-right: 0;
  `)}
  ${forMobile(`
    margin-bottom: 2.5rem;
  `)}
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
    margin: 0 auto;
    width: 100%;
  `)}
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
  `)}

  h4 {
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
  `)}

  h4 {
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
  `)}
  flex-direction: column;
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

export default function Scene(props) {
  return (
    <BasicPageWrapper {...props}>
      {/* Pricing */}
      <Container
        css={css`
          ${forMobile(`
          flex-direction: column;
        `)}
        `}
      >
        <HeroLeft>
          <HeroTitle>
            {'Simple pricing.'}
            <br />
            {'Great value.'}
          </HeroTitle>
          <HeroSubtitle>
            {'Get started for absolutely free. No trials needed.'}
          </HeroSubtitle>
          <FlexBreak />
        </HeroLeft>
        <HeroRight>
          <PricingContainer>
            <Price>{'$0/mo'}</Price>
            <Badge>{'Great deal'}</Badge>
            <h4>{'Unlimited everything'}</h4>
            <p>
              {
                'A simple and better way to manage GitHub notifications for more \
                engineers who want to be more productive.'
              }
            </p>
          </PricingContainer>
        </HeroRight>
      </Container>

      <Container
        css={css`
          ${forMobile(`flex-direction: column;`)}
        `}
      >
        <FloatingLinkBox>
          <h4>{'Pay what you want.'}</h4>
          <p>{'Donate to the engineers working on this project.'}</p>
          <a target="_blank" href="https://donorbox.org/meteorite">
            {'Visit now'}
          </a>
        </FloatingLinkBox>
        <FloatingLinkBox>
          <h4>{'Want to contribute?'}</h4>
          <p>{'All of the code is open sourced and free to edit.'}</p>
          <a target="_blank" href="https://github.com/nickzuber/meteorite">
            {'Check it out'}
          </a>
        </FloatingLinkBox>
      </Container>

      {/* FAQ */}
      <Container column>
        <LeftTitle
          css={css`
            padding-left: 12px;
          `}
        >
          {'Still have questions?'}
        </LeftTitle>
        <LeftSubtitle
          css={css`
            padding-left: 12px;
          `}
        >
          {'Here are some commonly asked questions.'}
        </LeftSubtitle>

        <LightContainer column>
          <HorizontalFlexContainer>
            <FAQItem>
              <h3>{'What exactly is Meteorite?'}</h3>
              <p>
                {
                  'Meteorite is an app designed around prioritizing and organizing your \
                   GitHub notifications. It has a variety of features to help keep you \
                   focused on the notifications that matter to you, and see the most important \
                   updates at the top of your list by keeping track of the thread context.'
                }
              </p>
              <p>
                {
                  'Basically, Meteorite is the GitHub notifications of your dreams.'
                }
              </p>
            </FAQItem>
            <FAQItem>
              <h3>{'Why does this exist?'}</h3>
              <p>
                {
                  'GitHub notifications right now can be chaotic and noisy, which end up\
                   making them pretty useless. Meteorite solves this problem by filtering, \
                   sorting, and adding context to the notifications you would normally get.'
                }
              </p>
              <p>
                {
                  'This project originated from me personally getting sick and tired of the current\
                   GitHub notifications system, so I took a crack and making it better.'
                }
              </p>
            </FAQItem>
            <FAQItem>
              <h3>{'Can I try it for free?'}</h3>
              <p>
                {'Absolutely – Meteorite is completely free and open source.'}
              </p>
            </FAQItem>
            <FAQItem>
              <h3>{'Can I host an instance of Meteorite myself?'}</h3>
              <p>
                {
                  'Sure – feel free to fork/contribute/self-host anything with this project. Since this project\
                  is completely serverless, you can host your own instance for free using platforms like '
                }
                <a href="https://zeit.co/">{'Zeit'}</a>
                {', '}
                <a href="https://surge.sh/">{'Surge'}</a>
                {', \
                  or anything in between.'}
              </p>
            </FAQItem>
            <FAQItem>
              <h3>{'I like this project. How can I contribute?'}</h3>
              <p>
                {
                  'You can contribute by submitting bug reports, feature requests, code that implements any \
                  of those things, or you can help by '
                }
                <a href="https://donorbox.org/meteorite">{'donating'}</a>
                {' to the project itself.'}
              </p>
            </FAQItem>
            <FAQItem>
              <h3>{'Where can I ask more questions?'}</h3>
              <p>
                {'You can either personally reach out to me on '}
                <a href="https://twitter.com/nick_zuber">{'Twitter'}</a>
                {' or \
                   leave your question on the official '}
                <a href="https://github.com/nickzuber/meteorite">
                  {'GitHub repository'}
                </a>
                {' as an issue.'}
              </p>
            </FAQItem>
          </HorizontalFlexContainer>
        </LightContainer>
      </Container>
    </BasicPageWrapper>
  );
}

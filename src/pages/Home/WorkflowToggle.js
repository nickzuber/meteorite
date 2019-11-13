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

const WorkflowToggle = () => {
  const [state, setState] = React.useState(0);
  const [imageOpacity, setImageOpacity] = React.useState(1);
  const timer = React.useRef();
  const easeTimingMs = 200;

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
      image: ReasonsPng
    },
    {
      id: 2,
      title: 'Sort By Importance',
      description: 'Don\'t get lost at sea – the most important notifications stay at the top of the list.',
      image: ScoresPng
    },
  ];

  const activeItem = items[state];

  return (
    <div css={css`
      margin-top: 32px;
      display: flex;
      flex-direction: row;
      ${forSmallScreens(`
        flex-direction: column;
      `)}
    `}>
      <div css={css`
        flex: 1;
        ${forSmallScreens(`
          margin-bottom: 24px;
        `)}
      `}>
        {items.map((item, xid) => (
          <div
            key={xid}
            onClick={() => {
              if (xid === state) return;
              clearTimeout(timer.current);
              setImageOpacity(0);
              timer.current = setTimeout(() => {
                setState(xid);
                setImageOpacity(1);
              }, easeTimingMs);
            }}
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
            max-width: 100%;
            opacity: ${imageOpacity};
            will-change: opacity;
            box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.175);
            transition: opacity ${easeTimingMs}ms linear;
            border-radius: 4px;
          `} />
      </div>
    </div>
  );
};

export default WorkflowToggle;

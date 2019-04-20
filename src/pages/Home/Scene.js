/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {Link as RouterLink} from '@reach/router';
import {routes} from '../../constants';
import Logo from '../../components/Logo';

import headerPng from '../../images/safari-header.png';
import regularScreenshotPng from '../../images/traditional-screenshot.png';
import IPhoneXMockupPng from '../../images/screenshots/iphone-x-mockup.png';
import IPhoneScreenshotPng from '../../images/screenshots/iphone-x.png';

import RobinLogo from '../../images/logos/robin-logo.png';
import RemoteHQLogo from '../../images/logos/remote-hq-logo.png';
import ReactNativeLogo from '../../images/logos/react-logo.png';

import '../../styles/gradient.css';
import '../../styles/font.css';

// const hash = process.env.GIT_HASH ? `#${process.env.GIT_HASH}` : '';
// const version = require('../../../package.json').version + hash;

function range (min, max, rand) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rand * (max - min + 1)) + min;
}

function color (rand) {
  const c = [
    '#4caf50',
    '#e91e63',
    '#4C84FF',
    '#e6d435',
  ];
  const newer_c = [
    '#B424E6',
    '#1ACA6B',
    '#E62465',
    '#FFCD4C',
    '#4C84FF',
    '#E9519A',
  ];
  return c[~~(c.length * rand)];
}

function opacity (xid, max) {
  // Max value (best possible score).
  const cap = 1;
  // Best value to base distribution on (the center value).
  const best = Math.floor(max / 2);
  // How spread out the distribution is from the best value.
  const distribution = 8;
  const result = Math.min(1, cap * Math.pow(
    Math.E,
    (-0.5) * (Math.pow(xid - best, 2) / (Math.pow(distribution, 2)))
  ));
  return Math.max(1 - result, 0.05) * 1.75;
}

// function createImagePlaceholder (highlight) {
//   return (
//     <ImagePlaceholder className="hover">
//       {/* navigation backdrop */}
//       <div style={{
//         position: 'absolute',
//         background: '#dee1e6',
//         borderTopLeftRadius: 8,
//         borderTopRightRadius: 8,
//         top: 0,
//         left: 0,
//         right: 0,
//         height: 35
//       }} />
//       {/* buttons */}
//       <div style={{
//         position: 'absolute',
//         background: '#ff5e52',
//         top: 13,
//         left: 10,
//         borderRadius: '100%',
//         height: 10,
//         width: 10,
//       }} />
//       <div style={{
//         position: 'absolute',
//         background: '#ffbe05',
//         top: 13,
//         left: 10 + 16,
//         borderRadius: '100%',
//         height: 10,
//         width: 10,
//       }} />
//       <div style={{
//         position: 'absolute',
//         background: '#16cc38',
//         top: 13,
//         left: 10 + 32,
//         borderRadius: '100%',
//         height: 10,
//         width: 10,
//       }} />
//       {/* url */}
//       <div style={{
//         position: 'absolute',
//         background: '#f1f3f4',
//         top: 40,
//         left: 30,
//         right: 30,
//         height: 20,
//         borderRadius: 100
//       }} />
//       {/* webpage header */}
//       <div style={{
//         position: 'absolute',
//         background: '#24292e',
//         top: 65,
//         left: 0,
//         right: 0,
//         height: 30,
//       }} />
//       <div style={{
//         position: 'absolute',
//         background: '#3f4954',
//         top: 71,
//         left: 50,
//         height: 18,
//         width: 300,
//         borderRadius: 5
//       }} />
//       {/* status headers */}
//       <div style={{
//         position: 'absolute',
//         background: 'rgb(0, 209, 154)',
//         top: 120,
//         left: 100,
//         width: 30,
//         height: 10,
//         borderRadius: 4
//       }} />
//       <div style={{
//         position: 'absolute',
//         background: 'rgb(0, 209, 154)',
//         top: 140,
//         left: 100,
//         width: 100,
//         height: 5,
//         borderRadius: 4
//       }} />
//       <div style={{
//         position: 'absolute',
//         background: 'rgb(0, 158, 248)',
//         top: 120,
//         left: 210,
//         width: 30,
//         height: 10,
//         borderRadius: 4
//       }} />
//       <div style={{
//         position: 'absolute',
//         background: 'rgb(0, 158, 248)',
//         top: 140,
//         left: 210,
//         width: 100,
//         height: 5,
//         borderRadius: 4
//       }} />
//       <div style={{
//         position: 'absolute',
//         background: 'rgb(241, 44, 63)',
//         top: 120,
//         left: 320,
//         width: 30,
//         height: 10,
//         borderRadius: 4
//       }} />
//       <div style={{
//         position: 'absolute',
//         background: 'rgb(241, 44, 63)',
//         top: 140,
//         left: 320,
//         width: 100,
//         height: 5,
//         borderRadius: 4
//       }} />
//       {/* notificaton row */}
//       <div style={{
//         position: 'absolute',
//         background: '#fff',
//         top: highlight === 'badges' ? 190 : 170,
//         left: highlight === 'badges' ? -20 : 0,
//         right: highlight === 'badges' ? -20 : 0,
//         height: 50,
//         borderRadius: 4,
//         boxShadow: highlight === 'badges'
//           ? 'rgba(130, 126, 126, 0.27) 0px 3px 8px'
//           : '0 0 0',
//       }}>
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 15,
//           left: highlight === 'badges' ? 30 : 100,
//           width: highlight === 'badges' ? 160 : 120,
//           height: 10,
//           borderRadius: 50
//         }} />
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 30,
//           left: highlight === 'badges' ? 30 : 100,
//           width: 50,
//           height: 7,
//           borderRadius: 50
//         }} />
//         <div style={{
//           position: 'absolute',
//           top: 12,
//           left: 315,
//           width: 30,
//           height: 30
//         }}>
//           {highlight === 'badges' ? (
//             <Icon.Hot shrink={1.1} />
//           ) : (
//             <div
//               style={{
//                 background: '#f42839',
//                 height: 15,
//                 width: 15,
//                 marginTop: 5,
//                 borderRadius: '100%'
//               }}
//             />
//           )}
//         </div>
//         <div style={{
//           position: 'absolute',
//           top: 12,
//           left: 345,
//           width: 30,
//           height: 30
//         }}>
//           {highlight === 'badges' ? (
//             <Icon.Convo shrink={1.1} />
//           ) : (
//             <div
//               style={{
//                 background: '#009ef8',
//                 height: 15,
//                 width: 15,
//                 marginTop: 5,
//                 borderRadius: '100%'
//               }}
//             />
//           )}
//         </div>
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 20,
//           right: 120,
//           width: 100,
//           height: 10,
//           borderRadius: 50
//         }} />
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 15,
//           right: 20,
//           width: 20,
//           height: 20,
//           borderRadius: '100%'
//         }} />
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 15,
//           right: 50,
//           width: 20,
//           height: 20,
//           borderRadius: '100%'
//         }} />
//       </div>
//       {/* notificaton row */}
//       <div style={{
//         position: 'absolute',
//         background: '#fff',
//         top: highlight === 'badges' ? 280 : 220,
//         left: highlight === 'badges' ? -20 : 0,
//         right: highlight === 'badges' ? -20 : 0,
//         height: 50,
//         borderRadius: 4,
//         boxShadow: highlight === 'badges'
//           ? 'rgba(130, 126, 126, 0.27) 0px 3px 8px'
//           : '0 0 0',
//       }}>
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 15,
//           left: highlight === 'badges' ? 30 : 100,
//           width: highlight === 'badges' ? 220 : 140,
//           height: 10,
//           borderRadius: 50
//         }} />
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 30,
//           left: highlight === 'badges' ? 30 : 100,
//           width: 30,
//           height: 7,
//           borderRadius: 50
//         }} />
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 30,
//           left: highlight === 'badges' ? 64 : 134,
//           width: 7,
//           height: 7,
//           borderRadius: '100%'
//         }} />
//         <div style={{
//           position: 'absolute',
//           top: 12,
//           left: 330,
//           width: 30,
//           height: 30
//         }}>
//           {highlight === 'badges' ? (
//             <Icon.Timer shrink={1.1} />
//           ) : (
//             <div
//               style={{
//                 background: '#00d299',
//                 height: 15,
//                 width: 15,
//                 marginTop: 5,
//                 borderRadius: '100%'
//               }}
//             />
//           )}
//         </div>
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 20,
//           right: 120,
//           width: 100,
//           height: 10,
//           borderRadius: 50
//         }} />
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 15,
//           right: 20,
//           width: 20,
//           height: 20,
//           borderRadius: '100%'
//         }} />
//         <div style={{
//           position: 'absolute',
//           background: '#dee1e6',
//           top: 15,
//           right: 50,
//           width: 20,
//           height: 20,
//           borderRadius: '100%'
//         }} />
//       </div>
//     </ImagePlaceholder>
//   );
// }

// const Arrow = ({style}) => {
//   return (
//     <svg style={style} xmlns="http://www.w3.org/2000/svg" width="55" height="223" viewBox="0 0 55 223">
//       <g fill="none" fill-rule="evenodd" stroke="rgb(0, 158, 248)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="translate(1 -2)">
//         <path stroke-dasharray="20 12 40" d="M51,8 C17,19.5689347 1.37247841e-11,46.42498 -5.70089572e-12,88.5681361 C-2.5121299e-11,130.711292 -2.32151849e-11,175.855247 1.74465369e-14,224"></path>
//         <polyline points="41.584 12.035 48.584 4.035 55.584 12.035" transform="rotate(65 48.584 8.035)"></polyline>
//       </g>
//     </svg>
//   );
// }

// const NotificationsRowExample = styled('div')({
//   position: 'relative',
//   height: 59,
//   width: 745,
//   borderRadius: 8,
//   margin: '158px auto 124px',
//   background: `url(${rowExample}) center center no-repeat`,
//   backgroundSize: 'cover',
//   backgroundColor: '#fff',
//   boxShadow: '0 2px 8px rgba(0, 0, 0, 0.51)',
// });

// const ImageContainer = styled('div')({
//   position: 'absolute',
//   height: 390,
//   width: 685,
//   top: 155,
//   left: '50%',
//   background: `url(${screenshot}) center center no-repeat`,
//   backgroundSize: 'cover',
//   backgroundColor: '#fff',
//   boxShadow: 'rgba(84,70,35,0) 0px 2px 8px, rgba(68, 58, 32, 0.16) 0px 1px 9px 4px',
//   marginLeft: 100,
//   borderRadius: 8,
//   display: 'block',
//   '@media (max-width: 1000px)': {
//     display: 'none'
//   }
// });

// const WidthContainer = styled('div')({
//   margin: '0 auto',
//   width: '100%',
//   maxWidth: 1500,
//   display: 'flex',
//   alignItems: 'center',
//   flexDirection: 'row',
// }, ({override = false}) => ({
//   '@media (max-width: 1400px)': {
//     flexDirection: override ? 'row' : 'column'
//   }
// }));

// const Section = styled('div')({
//   position: 'relative',
//   width: '100%',
//   minHeight: 300,
//   display: 'flex',
//   alignItems: 'center',
//   flexDirection: 'column',
//   margin: '28px auto 0',
//   padding: '60px 0'
// }, ({alt}) => alt && ({
//   background: 'rgb(255, 254, 252)',
//   'h2': {
//     marginTop: 0,
//     marginLeft: 15,
//     fontSize: 42,
//     textAlign: 'left',
//     fontWeight: 600
//   }
// }));

// const Item = styled('div')({
//   flex: 1,
//   display: 'block',
//   padding: '24px 72px',
//   'h2': {
//     marginTop: 0,
//     marginLeft: 15,
//     fontSize: 42,
//     textAlign: 'left',
//     fontWeight: 600
//   },
//   'p': {
//     fontSize: 18
//   }
// }, ({flex}) => ({
//   flex
// }));
// const ItemText = styled('div')({
//   display: 'flex',
//   minWidth: 200,
//   flexDirection: 'row',
//   margin: '20px 0',
//   'p': {
//     flex: .9,
//     margin: 0
//   },
//   'div': {
//     flex: .1,
//     marginTop: 3
//   },
// });

// const ImagePlaceholder = styled('div')({
//   position: 'relative',
//   display: 'block',
//   height: 400,
//   width: 600,
//   background: '#fff',
//   borderRadius: 8,
//   boxShadow: '0 2px 8px rgba(179, 179, 179, 0.25)'
//   // '-webkit-mask-image': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)'
// });

// const Header = styled('h1')({
//   padding: '0 20px',
//   margin: '0 0 24px',
//   letterSpacing: '-1.0px',
//   width: '50%',
// });

// const SubHeader = styled(Header)({
//   fontWeight: 500,
//   maxWidth: 460,
//   fontSize: 24,
//   marginBottom: 30,
//   letterSpacing: '-0.25px'
// });

// const LandingHeader = styled('div')({
//   position: 'relative',
//   width: '90%',
//   margin: '22px 20px 54px',
//   maxWidth: 1500,
//   display: 'flex',
//   justifyContent: 'space-between',
// });

// const LandingMessage = styled(LandingHeader)({
//   marginLeft: '5%',
//   flexDirection: 'column',
//   textAlign: 'left',
//   maxWidth: 1500,
//   'h1': {
//     display: 'block'
//   },
//   '@media (max-width: 1000px)': {
//     textAlign: 'center',
//     'h1': {
//       marginLeft: 'auto',
//       marginRight: 'auto',
//       width: 500
//     },
//     'div': {
//       marginLeft: 'auto !important',
//       marginRight: 'auto !important',
//     },
//   }
// });

// const SmallLink = styled('a')({
//   cursor: 'pointer',
//   fontSize: '12px',
//   lineHeight: '18px',
//   fontWeight: '700',
//   textDecoration: 'none',
//   ':hover': {
//     textDecoration: 'underline'
//   }
// });

// const SmallText = styled('span')({
//   fontSize: '12px',
//   fontWeight: '500',
//   'a': {
//     color: 'rgba(255, 255, 255, .9)',
//     fontWeight: 600,
//     margin: '0 3px',
//     textDecoration: 'none'
//   },
//   'a:hover': {
//     color: 'rgba(255, 255, 255, 1)',
//     textDecoration: 'underline'
//   }
// });

// const BottomLinkContainer = styled(LandingHeader)({
//   maxWidth: 350,
//   width: '100%',
//   margin: '32px 20px 0',
// });

// const LinkButton = styled('a')({boxShadow: '0 0 0 transparent'});
// const U = styled('span')({
//   color: 'inherit'
// });

// const UnofficialReleaseTag = styled('span')({
//   color: 'white',
//   position: 'absolute',
//   left: '44px',
//   bottom: '9px',
//   fontSize: '11px',
//   background: '#f42839',
//   fontWeight: '800',
//   padding: '2px 4px',
//   borderRadius: '4px',
//   textTransform: 'uppercase',
// });

// ===========================================================================
// ABOVE IS OLD CODE
// ===========================================================================

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
  padding: 12px 0;
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
  margin: 0;
  z-index: 2;
  font-size: 72px;
  line-height: 78px;
  margin: 0 auto 12px;

  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  font-weight: 500;
`;

const ItemHeader = styled(Header)`
  position: relative;
  text-align: left;
  width: 680px;
  margin: 0;
  z-index: 2;
  font-size: 62px;
  line-height: 64px;
  margin: 0 0 12px;

  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  font-weight: 500;
`;

const HorizontalListItem = styled('div')`
  flex: 1;
  border-right: ${props => props.last ? '0px' : '1px'} solid rgb(206, 206, 206);
  padding: 0 32px;
`;

const Quote = styled('p')`
  margin: 0;
  font-size: 15px;
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
    display: inline-block;
    padding: 0 16px;
    font-size: 14px;
    line-height: 18px;
    color: #37352f80;
  }
`;

function getConfetti (seed) {
  const stroke = color(seed);
  const rotation = ~~(seed * 180);

  const svgs = [
    (
      <svg css={css`transform: rotate(${rotation}deg);`} width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0L11.1962 9H0.803848L6 0Z" fill={stroke}/>
      </svg>
    ),
    (
      <svg css={css`transform: rotate(${rotation}deg);`} width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 0L11.1962 9H0.803848L6 0Z"
          fill={stroke}
        />
      </svg>
    ),
    (
      <svg css={css`transform: rotate(${rotation}deg);`} width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C0.517508 6.06139 6.6799 11.5502 2 16"
          stroke={stroke}
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    (
      <svg css={css`transform: rotate(${rotation}deg);`} width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 0L8 6.5L4 13L0 6.5L4 0Z"
          fill={stroke}
        />
      </svg>
    ),
    (
      <svg css={css`transform: rotate(${rotation}deg);`} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 6.6393C8 9.44331 2.33469 14 0.577298 14C-1.1801 14 1.63591 9.44331 1.63591 6.6393C1.63591 3.83529 -0.119245 0 1.63815 0C3.39555 0 8 3.83529 8 6.6393Z"
          fill={stroke}
        />
      </svg>
    ),
    (
      <svg css={css`transform: rotate(${rotation}deg);`} width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.15408 5.477C8.15168 8.67191 7 13.5 5.15408 11.5C3.30816 9.5 2.90284 9.34138 1.15517 5.47695C-2.00009 -1.49991 3.99732 1.50011 5.15408 3.977C6.15408 1.47707 11.5 -2 9.15408 5.477Z"
          fill={stroke}/>
      </svg>
    ),
    (
      <svg css={css`transform: rotate(${rotation}deg);`} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" fill={stroke}/>
      </svg>
    )
  ];
  // css={css`transform: rotate(${rotation}deg);`}

  return svgs[~~(seed * svgs.length)];
}

const Confetti = ({offset, row, seed, index, max}) => {
  const start = row * 160;
  const end = start + 160;
  const topDelta = range(start, end, seed) - 120;
  const fade = opacity(index, max);
  offset -= 320;
  return (
    <div css={css`
      z-index: 1;
      opacity: ${fade};
      transform: scale(1.2);
      position: absolute;
      left: ${offset}px;
      top: ${topDelta}px;
    `}
    >
      {getConfetti(seed)}
    </div>
  );
}

function ConfettiSection () {
  const SPACING = 82;
  const AMOUNT = 18;

  const row = new Array(AMOUNT).fill(0).map((_, i) => i * SPACING);

  return (
    <div css={css`
      z-index: 0;
    `}>
      {row.map((offset, i) => <Confetti index={i} row={0} offset={offset} seed={Math.random()} max={AMOUNT} />)}
      {row.map((offset, i) => <Confetti index={i} row={1} offset={offset} seed={Math.random()} max={AMOUNT} />)}
      {row.map((offset, i) => <Confetti index={i} row={2} offset={offset} seed={Math.random()} max={AMOUNT} />)}
      {row.map((offset, i) => <Confetti index={i} row={3} offset={offset} seed={Math.random()} max={AMOUNT} />)}
      {row.map((offset, i) => <Confetti index={i} row={4} offset={offset} seed={Math.random()} max={AMOUNT} />)}
      {row.map((offset, i) => <Confetti index={i} row={5} offset={offset} seed={Math.random()} max={AMOUNT} />)}
    </div>
  );
}

const SubHeader = styled(Header)`
  hyphens: auto;
  font-size: 22px;
  line-height: 26px;
  font-weight: 600;
  width: 680px;
  margin: 0 auto;

  font-family: Inter UI, system-ui, sans-serif;
  font-size: 20px;
  font-weight: 500;
`;

const DemoScreenshotHeader = styled('img')`
  background: #f7f6f3;
  width: 960px;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 20px, rgb(245, 245, 245) 0px -1px 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 3;
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
  display: block;
  background: none;
  z-index: 5;
`;
const IPhoneScreenshot = styled(IPhoneScreenshotContainer)`
  z-index: 4;
  transform: scale(0.88);
  bottom: -48px;
`;

const SmallText = styled('p')`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  color: #37352f;
  z-index: 2;
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
`;

// const Confetti = styled('div')`
//   position: absolute;
//   left: ${props => props.offset}px;
//   top: ${props => props.top
//     ? (-1) * range(28, 42, props.seed) + 'px'
//     : 'auto'
//   };
//   bottom: ${props => props.bottom
//     ? (-1) * range(28, 42, props.seed) + 'px'
//     : 'auto'
//   };
//   transform: rotate(${props => ~~(props.seed * 180)}deg);
//   height: 16px;
//   width: 7px;
//   background: ${props => color(props.seed)};
// `;

export default function Scene ({loggedIn, onLogout, ...props}) {
  const [showBorder, setShowBorder] = React.useState(false);

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
            }
          `}>
            <RouterLink to={routes.HOME}>Desktop</RouterLink>
            <RouterLink to={routes.HOME}>iOS & Android</RouterLink>
            <div css={css`
              border-right: 1px solid rgb(221, 221, 221);
              height: 14px;
              vertical-align: baseline;
              margin-left: 10px;
              margin-right: 10px;
              display: inline-block;
            `} />
            {loggedIn ? (
              <>
                <RouterLink to={routes.NOTIFICATIONS}>Notifications</RouterLink>
                <RouterLink to={routes.REDESIGN_NOTIFICATIONS}>
                  Redesign
                  <NewTag>new</NewTag>
                </RouterLink>
                <RouterLink to={routes.LOGIN}>Sign out</RouterLink>
              </>
            ) : (
              <>
                <RouterLink to={routes.LOGIN}>Sign in</RouterLink>
              </>
            )}
          </div>
        </Container>
      </FixedContainer>

      <Container css={css`
        margin: 32px auto;
        padding: 8px;
        flex-direction: column;
      `}>
        <div css={css`
          position: relative;
          margin: 0 auto 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          flex-direction: column;
        `}>
          <ConfettiSection />
          <Header>
            {'Control your GitHub notifications'}
          </Header>
          <div css={css`margin: 0 32px;`}>
            <SubHeader>
              {'Prioritize the tasks that keep you and your team most productive by organizing your notifications'}
            </SubHeader>
            <div css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}>
              <div css={css`
                z-index: 2;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin: 24px 0;
                span {
                  z-index: 2;
                  cursor: pointer;
                  user-select: none;
                  margin-right: 12px;
                  display: inline-flex;
                  align-items: center;
                  white-space: nowrap;
                  height: 36px;
                  border-radius: 3px;
                  color: #457cff;
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
                  color: #457cff;
                }
              `}>
                <span>{'Let\'s get started'}</span>
                <span css={css`
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
                </span>
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
        <div css={css`
          position: relative;
        `}>
          <DemoScreenshotHeader src={headerPng} />
          <DemoScreenshot src={regularScreenshotPng} />
          <IPhoneScreenshotContainer src={IPhoneXMockupPng} />
          <IPhoneScreenshot src={IPhoneScreenshotPng} />
        </div>
      </Container>

      <Container css={css`
        position: relative;
        margin: 88px auto 32px;
        padding: 48px 16px;
        align-items: center;
        flex-direction: column;
        border-top: 1px solid rgb(221, 221, 221);
        border-bottom: 1px solid rgb(221, 221, 221);
      `}>
        <div css={css`
          position: relative;
          margin: 0 0 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          flex-direction: column;
        `}>
          <ItemHeader css={css`
            margin-top: 32px;
            font-size: 48px;
            line-height: 50px;
            text-align: center;
          `}>
            {'Hear what folks have to say'}
          </ItemHeader>
          <SubHeader css={css`
            text-align: center;
            margin-bottom: 32px;
          `}>
            {'People have been using this app for a while now and have been kind enough to share their thoughts.'}
          </SubHeader>
          <div css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 32px;
          `}>
            <HorizontalListItem>
              <Quote>{`Nick is absolutely KILLING THE GAME with this app. I LOVE it!`}</Quote>
              <CompanyPerson>
                <img src={RemoteHQLogo} />
                <span>
                  {'— Trevor Suarez'}<br />
                  {'RemoteHQ, Software Engineer'}
                </span>
              </CompanyPerson>
            </HorizontalListItem>
            <HorizontalListItem>
              <Quote>{`So good! I love the importance sorting!`}</Quote>
              <CompanyPerson>
                <img css={css`filter: hue-rotate(222deg);`} src={ReactNativeLogo} />
                <span>
                  {'— Mike Grabowski'}<br />
                  {'Software Architect and Core Contributor to React Native'}
                </span>
              </CompanyPerson>
            </HorizontalListItem>
            <HorizontalListItem last>
              <Quote>{`I actually use this all the time.`}</Quote>
              <CompanyPerson>
                <img src={RobinLogo} />
                <span>
                  {'— Henry Lee'}<br />
                  {'Robin, Frontend Software Engineer'}
                </span>
              </CompanyPerson>
            </HorizontalListItem>
          </div>
        </div>
      </Container>

      <Container css={css`
        margin: 88px auto 32px;
        padding: 8px;
        align-items: flex-start;
        flex-direction: column;
      `}>
        <div css={css`
          position: relative;
          margin: 0 0 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          flex-direction: column;
        `}>
          <ItemHeader>
            {'Surface the things that matter most'}
          </ItemHeader>
          <div css={css`margin: 0 32px;`}>
            <SubHeader>
              {'Prioritize the tasks that keep you and your team most productive by organizing your notifications'}
            </SubHeader>
          </div>
        </div>
        <DemoScreenshotHeader src={headerPng} />
        <DemoScreenshot src={regularScreenshotPng} />
      </Container>
    </PageContainer>
  );
};

// export function OldScene ({loggedIn, onLogout, ...props}) {
//   return (
//     <div>
//       <div style={{
//         width: '100%',
//         minHeight: 600,
//         position: 'relative',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         overflow: 'hidden',
//         paddingBottom: 50
//       }}>
//         <LandingHeader style={{paddingLeft: '5%'}}>
//           <Logo white size={75}>
//           </Logo>
//           {loggedIn ? (
//             <div className="button-container-alt">
//               <RouterLink
//                 style={{
//                   marginRight: 15,
//                   background: 'none'
//                 }}
//               <LinkButton
//                 style={{
//                   marginRight: 15,
//                   background: 'none'
//                 }} href="#" onClick={onLogout}>sign out</LinkButton>
//             </div>
//           ) : (
//             <div className="button-container-alt">
//               <RouterLink
//                 style={{
//                   marginRight: 15,
//                   background: 'none'
//                 }} to={routes.}>sign in</RouterLink>
//             </div>
//           )}
//         </LandingHeader>
//         <LandingMessage>
//           <Header>Control your GitHub notifications</Header>
//           <SubHeader>Prioritize the tasks that keep you and your team most productive</SubHeader>
//           <div className="button-container-alt" style={{marginLeft: 20}}>
//             <RouterLink to={routes.LOGIN}>let's get started</RouterLink>
//             <LinkButton
//               onClick={() => {
//                 const section = document.querySelector('#learnMore');
//                 const y = section.getBoundingClientRect().top + window.scrollY;
//                 window.scroll({
//                   top: y,
//                   behavior: 'smooth'
//                 });
//               }}
//               style={{
//                 marginLeft: 20,
//                 background: 'none'
//             }}>
//               learn more
//               <Icon.LeftArrow shrink={0.6} style={{marginLeft: 5, filter: 'invert(1)', transform: 'rotateY(180deg)'}} />
//             </LinkButton>
//           </div>
//           <BottomLinkContainer>
//             <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite">View and contribute on GitHub</SmallLink>
//             <SmallText>
//               <Icon.PeopleWhite
//                 shrink={0.55}
//                 style={{
//                   filter: 'invert(1)',
//                   display: 'inline-block',
//                   top: -3,
//                   right: -2
//                 }}
//               />
//               Free and open sourced
//             </SmallText>
//           </BottomLinkContainer>
//         </LandingMessage>
//         <ImageContainer className="hover" />
//         <Curve />
//       </div>
//       <Section className="section">
//         <WidthContainer>
//           <Item style={{flex: '0 0 2.5%', padding: 0}} />
//           <Item>
//             {createImagePlaceholder('badges')}
//           </Item>
//           <Item className="item-text">
//             <h2>Surface the things that matter the most.</h2>
//             <ItemText>
//               <Icon.Ring />
//               <p>The most important issues and pull requests that require your presence are called out and brought to your attention.</p>
//             </ItemText>
//             <ItemText>
//               <Icon.Ear />
//               <p>We listen for updates with your notifications and let you know <i>why</i> and <i>when</i> things change.</p>
//             </ItemText>
//             <ItemText>
//               <Icon.Zap />
//               <p>Super charge your day by focusing on getting things done, rather than sifting through notifications or emails.</p>
//             </ItemText>
//           </Item>
//           <Item style={{flex: '0 0 2.5%', padding: 0}} />
//         </WidthContainer>
//       </Section>
//       <Section className="section" alt={true} style={{paddingTop: 140, overflowX: 'hidden'}}>
//         <Curve style={{
//           bottom: 'auto',
//           marginBottom: 0,
//           marginTop: -1,
//           top: 0,
//           transform: 'translateX(-50%) rotate(180deg)'
//         }} />
//         <WidthContainer>
//           <Item style={{flex: '0 0 2.5%', padding: 0}} />
//           <Item className="item-text">
//             <h2>Your time matters, so<br />we keep things simple.</h2>
//             <ItemText>
//               <Icon.CloudOffWhite />
//               <p>All of the information we use to make your notifications more useful is kept offline and kept on your own computer.</p>
//             </ItemText>
//             <ItemText>
//               <Icon.NoPhone />
//               <p>Simply sign in and start working — no complicated or intrusive set up needed.</p>
//             </ItemText>
//             <ItemText>
//               <Icon.NoMusic />
//               <p>No distractions — we only show you updates on things that matter to you.</p>
//             </ItemText>
//           </Item>
//           <Item>
//             {createImagePlaceholder('reason')}
//           </Item>
//           <Item style={{flex: '0 0 2.5%', padding: 0}} />
//         </WidthContainer>
//       </Section>
//       <Section id="learnMore" className="section" alt={true} style={{marginTop: 0, paddingBottom: 100}}>
//         <h2 style={{textAlign: 'center', maxWidth: 900}}>
//           Meteorite is an assistant for your <br />GitHub notifications.
//         </h2>
//         <WidthContainer>
//           <Item style={{flex: '0 0 2.5%', padding: 0}} />
//           <Item className="item-text">
//             <ItemText>
//               <Icon.Rank style={{filter: 'invert(1)'}} />
//               <p>Scores your notifications based on their importance, so we can surface the most critical updates at the top of your queue.</p>
//             </ItemText>
//             <ItemText>
//               <Icon.Sync style={{filter: 'invert(1)'}} />
//               <p>Provides you with quick context for why you're receiving each notification.</p>
//             </ItemText>
//             <ItemText>
//               <Icon.NotificationsOn style={{filter: 'invert(1)'}} />
//               <p>Allows you to opt in for desktop notifications whenever you recieve important update to help notify you right away.</p>
//             </ItemText>
//           </Item>
//           <Item className="item-text">
//             <ItemText>
//               <Icon.Shield style={{filter: 'invert(1)'}} />
//               <p>Protects you from useless spammy notifications that you don't care about.</p>
//             </ItemText>
//             <ItemText>
//               <Icon.Headphones style={{filter: 'invert(1)'}} />
//               <p>Let's you focus in on specific types of notifications that matter to you, like when your review is requested for a pull request or you were assigned an issue.</p>
//             </ItemText>
//             <ItemText>
//               <Icon.Bubbles style={{filter: 'invert(1)'}} />
//               <p>Unlocks dope statistics that help you understand how you interact with notifications on a daily basis.</p>
//             </ItemText>
//           </Item>
//           <Item style={{flex: '0 0 2.5%', padding: 0}} />
//         </WidthContainer>
//         <NotificationsRowExample>
//           <div style={{
//             position: 'absolute',
//             left: 0,
//             top: 0,
//             marginTop: -85,
//             marginLeft: 20,
//             display: 'block',
//           }}>
//             <Arrow style={{
//               position: 'absolute',
//               transform: 'rotate(90deg)',
//               marginTop: '-65px',
//               marginLeft: '480px',
//               left: 0,
//               top: 0,
//             }} />
//             <SmallText className="hover" style={{
//               fontWeight: 600,
//               borderRadius: 4,
//               padding: '12px 24px',
//               background: 'rgb(0, 158, 248)',
//               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.51)',
//             }}>Calculated score based on this issue's importance to you</SmallText>
//           </div>
//           <div style={{
//             position: 'absolute',
//             right: 0,
//             bottom: 0,
//             marginBottom: -80,
//             marginRight: 20,
//             display: 'block',
//           }}>
//             <Arrow style={{
//               position: 'absolute',
//               transform: 'rotate(270deg)',
//               marginBottom: '-70px',
//               marginLeft: '-160px',
//               left: 0,
//               bottom: 0,
//             }} />
//             <SmallText className="hover" style={{
//               fontWeight: 600,
//               borderRadius: 4,
//               padding: '12px 24px',
//               background: 'rgb(0, 158, 248)',
//               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.51)',
//             }}>The reason you just got this notification</SmallText>
//           </div>
//         </NotificationsRowExample>
//         <div className="button-container" style={{marginTop: 100 - 24}}>
//           <RouterLink to={routes.LOGIN}>sign in and try it out</RouterLink>
//           <LinkButton
//             style={{
//               marginLeft: 15,
//               background: 'none',
//               boxShadow: '0 0 0 transparent'
//             }} href="https://github.com/nickzuber/meteorite/">check out the github</LinkButton>
//         </div>
//       </Section>
//       <Section alt={true} style={{
//         marginTop: 0,
//         minHeight: 100,
//         justifyContent: 'center',
//         paddingBottom: 28,
//         paddingTop: 28,
//         background: '#212629',
//       }}>
//         <WidthContainer override={true} style={{alignItems: 'flex-end'}}>
//           <Item style={{flex: '0 0 2.5%', padding: 0}} />
//           <Item style={{
//             flexDirection: 'column',
//             alignItems: 'flex-start',
//             marginLeft: 20
//           }}>
//             <Logo size={50} style={{marginBottom: 18}} />
//             <SmallText style={{color: 'rgba(255, 255, 255, .75)'}}>
//               Created by
//               <a target="_blank" href="https://nickzuber.com/">
//                 Nick Zuber
//               </a>
//               and
//               <a target="_blank" href="https://github.com/nickzuber/meteorite/graphs/contributors/">
//                 contributors
//               </a>
//               <br />
//               Home page inspiration from
//               <a target="_blank" href="https://robinpowered.com/">
//                 Robin
//               </a>
//               and
//               <a target="_blank" href="https://getkap.co/">
//                 Kap
//               </a>
//               <br />
//               <a target="_blank" href="https://github.com/nickzuber/meteorite/" style={{marginLeft: 0}}>
//                 Source
//               </a>
//               available under
//               <a target="_blank" href="https://github.com/nickzuber/meteorite/blob/master/LICENSE/">
//                 MIT
//               </a>
//             </SmallText>
//           </Item>
//           <Item style={{textAlign: 'right'}} className="footer-links">
//             <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite/" style={{marginLeft: 28}}>Source code</SmallLink>
//             <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite/issues" style={{marginLeft: 28}}>Submit feedback</SmallLink>
//             <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite/issues" style={{marginLeft: 28}}>Bug reports</SmallLink>
//             <SmallText style={{marginLeft: 28, opacity: .25}}>v{version}</SmallText>
//           </Item>
//           <Item style={{flex: '0 0 2.5%', padding: 0}} />
//         </WidthContainer>
//       </Section>
//     </div>
//   );
// };

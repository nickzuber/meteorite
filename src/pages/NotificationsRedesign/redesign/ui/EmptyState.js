/** @jsx jsx */

import React from 'react';
import styled from '@emotion/styled';
import {css, jsx, keyframes} from '@emotion/core';
import Blob1Svg from '../../../../images/svg/blob-shape.svg';
import Blob2Svg from '../../../../images/svg/blob-shape-2.svg';
import Blob3Svg from '../../../../images/svg/blob-shape-3.svg';
import Blob4Svg from '../../../../images/svg/blob-shape-4.svg';
import Blob5Svg from '../../../../images/svg/blob-shape-5.svg';
import Blob6Svg from '../../../../images/svg/blob-shape-6.svg';

const B1 = Blob1Svg;
const B2 = Blob3Svg;

const blobFrames1 = keyframes`
  0% {
    transform: rotate(14deg) scale(1);
  }
  50% {
    transform: rotate(0deg) scale(0.98);
  }
  100% {
    transform: rotate(14deg) scale(1);
  }
`;

const blobFrames2 = keyframes`
  0% {
    transform: rotate(-2deg) scale(1);
  }
  50% {
    transform: rotate(0deg) scale(1.04);
  }
  100% {
    transform: rotate(-2deg) scale(1);
  }
`;

const BaseBlob = styled('div')`
  pointer-events: none;
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 550px;
`;

const Blob1 = styled(BaseBlob)`
  background: url(${(B1)}) center center no-repeat;
  animation: ${blobFrames1} 25s infinite;
`;

const Blob2 = styled(BaseBlob)`
  background: url(${(B2)}) center center no-repeat;
  animation: ${blobFrames2} 15s infinite;
`;

const Header = styled('h1')(({dark}) => `
  text-align: center;
  letter-spacing: -0.25px;
  font-family: medium-marketing-display-font,Georgia,Cambria,Times New Roman,Times,serif;
  font-weight: 500;
  font-size: 20px;
  color: ${dark ? '#ffffff' : '#131212'};
`);

const Byline = styled('p')(({dark}) => `
  text-align: center;
  font-family: medium-content-sans-serif-font,Inter UI,system-ui,sans-serif;
  font-weight: 500;
  width: 200px;
  text-align: center;
  margin: 5px auto;
  font-size: 16px;
  line-height: 16px;
  color: ${dark ? '#667386' : '#9d9b97'};
`);

const Container = styled('div')(({opacity}) => `
  position: relative;
  background: none;
  height: 550px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  opacity: ${opacity};
  transition: all 150ms ease-in;
`);

function EmptyState ({dark}) {
  const [opacity, setOpacity] = React.useState(0);
  const timer = React.useRef();
  React.useEffect(() => {
    timer.current = setTimeout(() => setOpacity(1), 10);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <Container opacity={opacity}>
      <Blob1 css={css`opacity: ${dark ? 0.15 : 1};`} />
      <Blob2 css={css`opacity: ${dark ? 0.15 : 1};`} />
      <Header dark={dark}>
        {"🌱 You're all caught up"}
        <Byline dark={dark}>
          {"We're listening for changes — any updates will appear here."}
        </Byline>
      </Header>
    </Container>
  );
}

export default EmptyState;

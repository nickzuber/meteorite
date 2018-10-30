import React from 'react';
import meteoriteSvg from './meteorite.svg';
import meteoritePng from './meteorite-v2-2.png';

export default function LoadingIcon ({ style, size, ...props }) {
  return (
    <div style={{
      background: `url(${meteoriteSvg}) center center no-repeat`,
      backgroundSize: 'contain',
      // transform: 'rotate(180deg)',
      position: 'relative',
      height: size,
      width: size,
      ...style
    }} {...props} />
  );
}

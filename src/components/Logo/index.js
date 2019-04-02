import React from 'react';
import meteoriteLogo from './icon-gray.png';
import meteoriteLogoWhite from './logo-white.png';

export default function LoadingIcon ({ style, size, white = false, ...props }) {
  return (
    <div style={{
      background: `url(${white ? meteoriteLogoWhite : meteoriteLogo}) center center no-repeat`,
      backgroundSize: 'contain',
      position: 'relative',
      cursor: props.onClick ? 'pointer' : 'default',
      height: size,
      width: size,
      ...style
    }} {...props} />
  );
}

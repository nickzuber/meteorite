import React from 'react';
import meteoriteLogo from './icon-gray.png';

export default function LoadingIcon ({ style, size, ...props }) {
  return (
    <div style={{
      background: `url(${meteoriteLogo}) center center no-repeat`,
      backgroundSize: 'contain',
      position: 'relative',
      cursor: props.onClick ? 'pointer' : 'default',
      height: size,
      width: size,
      ...style
    }} {...props} />
  );
}

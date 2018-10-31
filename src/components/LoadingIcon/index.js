import React from 'react';
import loader from './loader.svg';

export default function LoadingIcon ({ style, size, ...props }) {
  return (
    <div style={{
      background: `url(${loader}) center center no-repeat`,
      position: 'relative',
      height: size || 100,
      width: size || 100,
      margin: '0 auto',
      ...style
    }} {...props} />
  );
}

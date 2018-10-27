import React from 'react';
import loader from './loader.svg';

export default function LoadingIcon ({ style, ...props }) {
  return (
    <div style={{
      background: `url(${loader}) center center no-repeat`,
      position: 'relative',
      height: 100,
      width: 100,
      margin: '0 auto',
      ...style
    }} {...props} />
  );
}

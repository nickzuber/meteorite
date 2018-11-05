import React from 'react';
import loader from './loader.svg';
import loaderAlt from './loader-alt.svg';

export default function LoadingIcon ({ style, size, alt, ...props }) {
  return (
    <div style={{
      background: `url(${(alt ? loaderAlt : loader)}) center center no-repeat`,
      position: 'relative',
      height: size || 100,
      width: size || 100,
      margin: '0 auto',
      ...style
    }} {...props} />
  );
}

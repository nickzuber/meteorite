import React from 'react';
import loader from './loader.svg';
import loaderAlt from './loader-alt.svg';
import loaderWhite from './loader-white.svg';

export default function LoadingIcon({style, size, alt, white, ...props}) {
  let url = loader;
  if (white) {
    url = loaderWhite;
  } else if (alt) {
    url = loaderAlt;
  }

  return (
    <div
      style={{
        background: `url(${url}) center center no-repeat`,
        position: 'relative',
        height: size || 100,
        width: size || 100,
        margin: '0 auto',
        ...style
      }}
      {...props}
    />
  );
}

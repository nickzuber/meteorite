import React from 'react';
import curve from './curve.svg';

export default function Curve({style, ...props}) {
  return (
    <div
      style={{
        background: `url(${curve}) center bottom`,
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '190vw',
        paddingBottom: '4.5%',
        backgroundSize: 'cover',
        marginBottom: '-1px',
        ...style
      }}
    />
  );
}

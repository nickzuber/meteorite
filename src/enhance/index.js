import React from 'react';

export const withOnEnter = WrappedComponent => ({onEnter, ...props}) => (
  <WrappedComponent
    {...props}
    onKeyPress={event => {
      if (event.key === 'Enter') {
        onEnter(event);
      }
    }}
  />
);

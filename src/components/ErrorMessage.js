import React from 'react';
import styled from '@emotion/styled';

const Message = styled('p')({
  color: '#eb3349',
  fontWeight: 500,
  a: {
    color: '#eb3349',
    fontWeight: 500
  }
});

export default function ErrorMessage({children, props}) {
  return <Message {...props}>{children}</Message>;
}

import React from 'react';
import { Link } from "@reach/router";
import styled from 'react-emotion';
import { routes } from '../../constants';
import { AuthenticationButton } from '../../components/buttons';

const Container = styled('div')({
  background: '#f4f4f4',
  width: '100%',
  height: 100
});

export default function Scene ({ loading, error, loggedOut, ...props }) {
  return (
    <Container>
      <Link to={routes.HOME}>home</Link>
      <div>
        {error ? (
          <div>
            error, try again?
            <AuthenticationButton />
          </div>
        ) : loading ? (
          <span>loading...</span>
        ) : loggedOut ? (
          <AuthenticationButton />
        ) : (
          <span>logged in!</span>
        )}
      </div>
    </Container>
  );
}

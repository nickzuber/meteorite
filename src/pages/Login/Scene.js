import React from 'react';
import { Link } from "@reach/router";
import styled from 'react-emotion';
import { Routes } from '../../constants';
import { AuthenticationButton } from '../../components/buttons';

const Container = styled.div({
  background: 'red',
  width: '100%',
  height: 100
});

export default function Scene ({ loading, error, loggedOut, ...props }) {
  return (
    <Container>
      <Link to={Routes.HOME}>home</Link>
      <p>
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
          <span>logged in!!</span>
        )}
      </p>
    </Container>
  );
}

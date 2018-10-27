import React from 'react';
import { Link } from "@reach/router";
import styled from 'react-emotion';
import { routes } from '../../constants';
import { AuthenticationButton } from '../../components/buttons';
import LoadingIcon from '../../components/LoadingIcon';
import '../../styles/gradient.css';

const Container = styled('div')({
  position: 'relative',
  background: '#fff',
  borderRadius: 4,
  margin: '0 auto',
  padding: '24px 48px',
  width: 300,
  height: 300
});

const ButtonsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  bottom: 24,
  left: 48,
  right: 48,
  'a': {
    margin: 0
  }
});

export default function Scene ({ loading, error, loggedOut, ...props }) {
  return (
    <div className="container-gradient" style={{
      width: '100%',
      height: 600,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Container>
        <h3>Authenticate with GitHub</h3>
        {error ? (
          <React.Fragment>
            <p>Log in with GitHub and we'll start organizing and sorting all of your notifications.</p>
            <ButtonsContainer>
              <Link to={routes.HOME}>go back</Link>
              <AuthenticationButton />
            </ButtonsContainer>
          </React.Fragment>
        ) : loading ? (
          <LoadingIcon />
        ) : loggedOut ? (
          <React.Fragment>
            <p>Log in with GitHub and we'll start organizing and sorting all of your notifications.</p>
            <ButtonsContainer>
              <Link to={routes.HOME}>go back</Link>
              <AuthenticationButton />
            </ButtonsContainer>
          </React.Fragment>
        ) : (
          <span>logged in!</span>
        )}
      </Container>
    </div>
  );
}

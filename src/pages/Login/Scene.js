import React from 'react';
import { Link } from "@reach/router";
import styled from 'react-emotion';
import { routes } from '../../constants';
import { AuthenticationButton } from '../../components/buttons';
import LoadingIcon from '../../components/LoadingIcon';
import ErrorMessage from '../../components/ErrorMessage';
import '../../styles/gradient.css';

const Container = styled('div')({
  position: 'relative',
  background: '#fff',
  borderRadius: 4,
  margin: '0 auto',
  padding: '24px 48px 76px',
  width: 300
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
      position: 'relative',
      flexDirection: 'column',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Container>
        <h3>Authenticate with GitHub</h3>
        {!error ? (
          <React.Fragment>
            <p>Log in with GitHub and we'll start organizing and sorting all of your notifications.</p>
            <ErrorMessage>Oops, looks like something went wrong. Try again?</ErrorMessage>
            <ButtonsContainer>
              <div className="button-container">
                <Link style={{boxShadow: '0 0 0'}} to={routes.HOME}>go back</Link>
              </div>
              <div className="button-container">
                <AuthenticationButton style={{boxShadow: '0 0 0'}} />
              </div>
            </ButtonsContainer>
          </React.Fragment>
        ) : loading ? (
          <LoadingIcon />
        ) : loggedOut ? (
          <React.Fragment>
            <p>Log in with GitHub and we'll start organizing and sorting all of your notifications.</p>
            <ButtonsContainer>
              <div className="button-container">
                <Link style={{boxShadow: '0 0 0'}} to={routes.HOME}>go back</Link>
              </div>
              <div className="button-container">
                <AuthenticationButton style={{boxShadow: '0 0 0'}} />
              </div>
            </ButtonsContainer>
          </React.Fragment>
        ) : (
          <span>logged in!</span>
        )}
      </Container>
    </div>
  );
}

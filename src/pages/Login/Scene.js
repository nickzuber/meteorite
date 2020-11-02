/** @jsx jsx */

import {Link} from '@reach/router';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import React from 'react';
import {routes} from '../../constants';
import {AuthenticationButton} from '../../components/buttons';
import LoadingIcon from '../../components/LoadingIcon';
import ErrorMessage from '../../components/ErrorMessage';
import ConfettiSection from '../../components/Confetti';
import '../../styles/gradient.css';

const WHITE = 'rgb(255, 254, 252)';

const Card = styled('div')`
  position: relative;
  width: 280px;
  min-height: 100px;
  margin: 32px auto 0;
  background: #ffffff;
  border: 1px solid #e5e6eb;
  box-shadow: rgba(84, 70, 35, 0) 0px 2px 8px,
    rgba(84, 70, 35, 0.15) 0px 1px 3px;
  border-radius: 6px;
  padding: 24px 32px 52px;
`;

const ButtonsContainer = styled('div')`
  display: flex;
  justifycontent: space-between;
  position: absolute;
  bottom: 24;
  left: 48;
  right: 48;

  a {
    position: relative;
    text-decoration: none;
    padding: 4px 12px;
    border-radius: 4px;
    flex-shrink: 0;
    font-size: 15px;
    margin-left: 2px;
    margin-right: 2px;
    font-weight: 500;
    transition: all 200ms ease;
    &:hover {
      background: rgba(55, 53, 47, 0.08);
    }
    &:active {
      background: rgba(55, 53, 47, 0.16);
    }
  }
`;

export default function Scene({loading, error, loggedOut, ...props}) {
  return (
    <div
      css={css`
        position: relative;
        overflow: hidden;
        background: ${WHITE};
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        max-width: 1420px;
        width: 100%;
        margin: 0 auto;
      `}
    >
      <ConfettiSection spacing={100} amount={20} />
      <Card>
        <h3>Authenticate with GitHub</h3>
        {error ? (
          <React.Fragment>
            <p>
              Log in with GitHub and we'll start organizing and sorting all of
              your notifications.
            </p>
            <ErrorMessage>
              Oops, looks like something went wrong. Try again?
            </ErrorMessage>
            <ButtonsContainer>
              <Link style={{boxShadow: '0 0 0'}} to={routes.HOME}>
                Go back
              </Link>
              <AuthenticationButton style={{boxShadow: '0 0 0'}} />
            </ButtonsContainer>
          </React.Fragment>
        ) : loading ? (
          <LoadingIcon style={{marginTop: 50}} />
        ) : loggedOut ? (
          <React.Fragment>
            <p>
              Log in with GitHub and we'll start organizing and sorting all of
              your notifications.
            </p>
            <ButtonsContainer>
              <Link style={{boxShadow: '0 0 0'}} to={routes.HOME}>
                Go back
              </Link>
              <AuthenticationButton style={{boxShadow: '0 0 0'}} />
            </ButtonsContainer>
          </React.Fragment>
        ) : (
          <span>logged in!</span>
        )}
      </Card>
    </div>
  );
}

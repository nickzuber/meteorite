/** @jsx jsx */

import {Link} from '@reach/router';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import React from 'react';
import {routes} from '../../constants';
import {AuthenticationButton} from '../../components/buttons';
import LoadingIcon from '../../components/LoadingIcon';
import ErrorMessage from '../../components/ErrorMessage';

const Button = styled(Link)`
  pointer: cursor;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
  color: #333333;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 0px solid transparent;
  padding: 0.125rem 0.75rem;
  font-size: 1rem;
  line-height: 1.75;
  border-radius: 5px;
  -webkit-transition: color 0.15s ease-in-out,
    background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: #f4f4f4;
    border-color: #f4f4f4;
  }

  &:active {
    background-color: #eee;
    border-color: #eee;
  }
`;

const Card = styled('div')`
  position: relative;
  width: 300px;
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
  justify-content: space-between;
  position: relative;
  margin-bottom: -28px;

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
        background: radial-gradient(transparent 50%, #fffefd),
          url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKElEQVQoU2NkIBIwEqmOgQ4KX715/x/mHDERQbiNGFZTXyGuUKC+rwHAcQwLu0IifQAAAABJRU5ErkJggg==)
            repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        margin: 0 auto;
      `}
    >
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
              <Button to={routes.HOME}>Go back</Button>
              <AuthenticationButton />
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
              <Button style={{boxShadow: '0 0 0'}} to={routes.HOME}>
                Go back
              </Button>
              <AuthenticationButton />
            </ButtonsContainer>
          </React.Fragment>
        ) : (
          <span>logged in!</span>
        )}
      </Card>
    </div>
  );
}

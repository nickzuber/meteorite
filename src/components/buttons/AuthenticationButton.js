import React from 'react';
import styled from '@emotion/styled';

const themeColor = '#27B768';

const Button = styled('a')`
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
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const MainButton = styled(Button)`
  background-color: ${themeColor};
  border-color: ${themeColor};
  color: #fff;
  font-size: 18px;

  &:hover {
    background-color: #249959 !important;
    border-color: #249959 !important;
  }

  &:active {
    background-color: #20894f !important;
    border-color: #20894f !important;
  }
`;

const CLIENT_ID = '9478c90e57ef3d546ef0';
const SCOPES = 'notifications';

const AuthenticationButton = props => (
  <MainButton
    href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}`}
    {...props}
  >
    Authorize with GitHub
  </MainButton>
);

export default AuthenticationButton;

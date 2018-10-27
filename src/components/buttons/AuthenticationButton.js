import React from 'react';

const CLIENT_ID = '9478c90e57ef3d546ef0';
const REDIRECT_URI = 'http://localhost:3000/login';
const SCOPES = 'notifications';

const AuthenticationButton = () => (
  <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}`}>
    Login with GitHub
  </a>
);

export default AuthenticationButton;

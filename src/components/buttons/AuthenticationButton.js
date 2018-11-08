import React from 'react';

const CLIENT_ID = '9478c90e57ef3d546ef0';
const REDIRECT_URI = 'https://meteorite.surge.sh/login';
const SCOPES = 'notifications';

const AuthenticationButton = props => (
  <a
    href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}`}
    {...props}
  >
    Authorize with GitHub
  </a>
);

export default AuthenticationButton;

import React from 'react';

const CLIENT_ID = '9478c90e57ef3d546ef0';
const SCOPES = 'notifications';

const AuthenticationButton = props => (
  <a
    href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}`}
    {...props}
  >
    Authorize with GitHub
  </a>
);

export default AuthenticationButton;

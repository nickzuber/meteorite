import React from 'react';
import { Link } from "@reach/router";
import { Routes } from '../constants';

export default props => (
  <div>
    Login
    <Link to={Routes.HOME}>home</Link>
  </div>
);

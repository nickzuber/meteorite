import React from 'react';
import { Link } from "@reach/router";
import { Routes } from '../constants';

export default props => (
  <div>
    Home!
    <Link to={Routes.LOGIN}>login</Link>
    <Link to={Routes.INBOX}>inbox</Link>
  </div>
);

/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { appSetup } from '../common';

import './main.css';

appSetup();

// Need to change profile view container to formviewcontainer
const profileViewContainer = document.getElementById('app');

ReactDOM.render(
  <App user={"HELLO WORLD PROP"} />,
  profileViewContainer,
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { getOffers } from './mocks/offers';
import { getComments } from './mocks/comments-get';

ReactDOM.render(
  <React.StrictMode>
    <App
      offers = {getOffers()}
      reviews = {getComments()}
    />
  </React.StrictMode>,
  document.getElementById('root'));

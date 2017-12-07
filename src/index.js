import './scss/index.scss'; // Force Webpack to load SCSS
import ReactDOM from 'react-dom';
import React from 'react';

import Map from './map.jsx';
import fieldDefinitions from '../config/field-definitions';

process.env.DEBUG = 'nydf:*';

ReactDOM.render(
  <Map
    fieldDefinitions={fieldDefinitions}
  />,
  document.getElementById('goal8-map'),
);

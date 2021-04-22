import React from 'react';
import { render } from 'react-dom';
import 'tailwindcss/tailwind.css';
import firebase from 'firebase/app';

import App from './App';
import config from './config';

firebase.initializeApp(config().firebase);

render(<App />, document.getElementById('root'));

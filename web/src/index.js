import React from 'react';
import ReactDOM from 'react-dom';
import './compiled/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './skeleton.css';

// google analytics check
const GA_KEY = 'REACT_APP_GA_ID';
if (!process.env[GA_KEY]) {
  console.error(
    `You need to specify ${GA_KEY} in your environment, consider putting it in a .env file in the root of the react app`
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

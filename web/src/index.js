import React from 'react';
import ReactDOM from 'react-dom';
import './compiled/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './skeleton.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

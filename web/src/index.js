import React from 'react';
import ReactDOM from 'react-dom';
import './compiled/index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

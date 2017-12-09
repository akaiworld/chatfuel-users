import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import registerServiceWorker from './helpers/register-service-worker.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

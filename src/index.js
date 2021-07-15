import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router} from './routing';

ReactDOM.render(
  	<React.StrictMode>
		<Router>
    		<App />
		</Router>
  	</React.StrictMode>,
  	document.getElementById('root')
);

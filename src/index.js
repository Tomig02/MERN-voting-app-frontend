import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router} from './routing';
import {Room} from './room';

ReactDOM.render(
  	<React.StrictMode>
		<Room>
			<Router>
				<App />
			</Router>
		</Room>
  	</React.StrictMode>,
  	document.getElementById('root')
);

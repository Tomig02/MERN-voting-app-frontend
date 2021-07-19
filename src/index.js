import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router} from './contexts/routing';
import {Room} from './contexts/room';

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

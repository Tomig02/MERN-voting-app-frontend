import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router} from './contexts/routing';
import {Room} from './contexts/room';
import {CookiesProvider} from 'react-cookie';

import dotenv from 'dotenv';
dotenv.config();

ReactDOM.render(
  	<React.StrictMode>
		<CookiesProvider>
			<Room>
				<Router>
					<App />
				</Router>
			</Room>
		</CookiesProvider>
  	</React.StrictMode>,
  	document.getElementById('root')
);

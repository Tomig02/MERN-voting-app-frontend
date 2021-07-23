import React, { Fragment, useContext } from "react";
import {RouteContext, pageMap} from "./contexts/routing";
import './scss/style.css';

import Header from './components/general/Header';
import Login from './routes/Login';
import Main from './routes/Main';
import Results from './routes/Results';

export default function App() {
   	const {path} = useContext(RouteContext);

	return (
		<Fragment>
			{path === pageMap.main? <Header />: null}
			<div className="App">
				{path === pageMap.main? <Main/>: null}
				{path === pageMap.login? <Login/>: null}
				{path === pageMap.results? <Results/>: null}
			</div>
		</Fragment>
  	);
}


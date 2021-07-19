import React, { useContext } from "react";
import {RouteContext, pageMap} from "./contexts/routing";

import Login from './routes/Login';
import Main from './routes/Main';

export default function App() {
   	const {path} = useContext(RouteContext);

	return (
    	<div className="App">
			{path === pageMap.main? <Main/>: null}
			{path === pageMap.login? <Login/>: null}
		</div>
  	);
}


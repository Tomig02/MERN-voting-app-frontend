import React, { Fragment, useContext } from "react";
import {RouteContext, pageMap} from "./contexts/routing";
import './scss/style.css';

import Header from './components/general/Header';
import Login from './routes/Login';
import Main from './routes/Main';
import Results from './routes/Results';
import { RoomContext } from "./contexts/room";

export default function App() {
	const {room} = useContext(RoomContext);
	const {path} = useContext(RouteContext);

	const selectRoute = () => {
		let page;
		const isEmpty = !(Object.keys(room).length > 0);

		switch(path){
			case !isEmpty && pageMap.main:
				page = <Main />;
				break;
			case !isEmpty && pageMap.results:
				page = <Results />; 
				break; 
			default:
				page = <Login />
				break;
		}

		return page;
	}

	return (
		<Fragment>
			{[pageMap.main, pageMap.results].includes(path)? <Header />: null}
			<div className="App">
				{selectRoute()}
			</div>
		</Fragment>
  	);
}


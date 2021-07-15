import React, { useContext } from "react";
import {RouteContext} from "../routing";

export default function LoginRoute(){
	const {setLogged, setPath} = useContext(RouteContext);
	
	const login = () => {
		setLogged(true);
		setPath("main")
	}

	return(
		<div>
			<div>LOGIN</div>
			<button onClick={login}>Login</button>
		</div>
	)
}
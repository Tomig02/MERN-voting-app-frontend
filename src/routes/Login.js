import React, { useContext, useState } from "react";
import {RouteContext} from "../contexts/routing";

export default function LoginRoute(){
	const {login} = useContext(RouteContext);

	const [creando, setCreando] = useState(false);

	const checkLogin = async (event) => {
		event.preventDefault();
		const userCode = new FormData(event.target).get("code");
		
		const res = await mensajeBackend("http://localhost:3001/login", {
			id: userCode
		});

		if(res){
			login(res, {code: userCode});
		}
		else{
			alert("ups! parece que ocurrio un error");
		}
	}

	const ingresarSala = async (event) => {
		event.preventDefault();
		const formD = new FormData(event.target);

		const res = await mensajeBackend("http://localhost:3001/addNewUser", {
			name: formD.get("name"),
			image: formD.get("image"),
			roomID: formD.get("groupID")
		});
		console.log(res);
		if(res){
			alert(`Solicitud de ingreso enviada con exito!, 
				podes entrar pero no podras participar hasta ser aceptado`);
			login(res, {name: formD.get("name")});
		}
		else{
			alert("ups! parece que ocurrio un error");
		}
	}

	const PopUpCrear = () => {
		const crearSala = async (event) => {
			event.preventDefault();
			const formD = new FormData(event.target);

			const message = {
				name: formD.get("name"),
            	description: formD.get("description"),
            	username: formD.get("username"),
				image: formD.get("image")
			}
			
			const res = await mensajeBackend("http://localhost:3001/createRoom", message);

			if(res){
				login(res, {name: formD.get("username")});	
			}
			else{
				alert("ups! parece que ocurrio un error");
			}
		}

		return(
			<form onSubmit={crearSala}>
				<h2>Ingresa los datos de tu nueva sala</h2>

				<label htmlFor="name">Room name</label>
				<input type="text" name="name"/>

				<label htmlFor="description">Room description</label>
				<input type="text" name="description"/>

				<label htmlFor="username">Username</label>
				<input type="text" name="username"/>

				<label htmlFor="image">Image URL</label>
				<input type="text" name="image"/>

				<button>Send</button>
			</form>
		)
	}

	const mensajeBackend = async (url, message) => {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		});

		if(response.ok){
			return await response.json();
		}else{
			return null;
		}
	}

	return(
		<div>
			<h1>titulo de esta web app y texto de bienvenida supongo</h1>
			
			<form onSubmit={checkLogin}>
				<h2>Codigo de usuario</h2>
				<input type="text" name="code"/>

				<button>Send</button>
			</form>

			<form onSubmit={ingresarSala}>
				<h2>Codigo de sala</h2>

				<label htmlFor="name">Name</label>
				<input type="text" name="name"/>

				<label htmlFor="image">Image url</label>
				<input type="text" name="image"/>

				<label htmlFor="groupID">group id code</label>
				<input type="text" name="groupID"/>

				<button>Send</button>
			</form>

			<h2>Crear una sala nueva</h2>
			<button onClick={() => {setCreando(!creando)}}>Crear sala</button>

			{creando? PopUpCrear(): null} 
		</div>
	)
}
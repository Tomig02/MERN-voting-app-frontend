import React, { useContext, useState } from "react";
import {RouteContext} from "../routing";

export default function LoginRoute(){
	const {login} = useContext(RouteContext);

	const checkLogin = async (event) => {
		event.preventDefault();
		const userCode = new FormData(event.target).get("code");
		console.log(userCode);
		
		console.log( await mensajeBackend("http://localhost:3001/login", {
			id: userCode
		}));
	}

	const ingresarSala = async (event) => {
		event.preventDefault();
		const formD = new FormData(event.target);

		console.log( await mensajeBackend("http://localhost:3001/addNewUser", {
			name: formD.get("name"),
			image: formD.get("image"),
			roomID: formD.get("groupID")
		}));
	}

	const mensajeBackend = async (url, message) => {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		});

		return await response.json();
	}

	const [creando, setCreando] = useState(false);

	const PopUpCrear = () => {
		const crearSala = async (event) => {
			event.preventDefault();
			const formD = new FormData(event.target);

			const message = {
				name: formD.get("name"),
            	description: formD.get("description"),
            	user: {
					name: formD.get("username"),
					image: formD.get("image")
				}
			}
			console.log( await mensajeBackend("http://localhost:3001/createRoom", message));
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
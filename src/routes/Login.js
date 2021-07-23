import React, { useContext, useState } from "react";
import {RouteContext} from "../contexts/routing";
import Button from '../components/general/Button';
import PopUpCrear from '../components/popups/newRoom';
import {mensajeBackend} from '../helpers';
export default function LoginRoute(){
	const {login} = useContext(RouteContext);

	const [creando, setCreando] = useState(false);
	const [comunicar, setComunicar] = useState(false);
	const [mensaje, setMensaje] = useState(false);

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
			alert("ups! parece que ocurrio un error, asegurate de que tu codigo de usuario es correcto");
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
			setMensaje(`Solicitud de ingreso enviada con exito, solo queda esperar a ser aceptado! 
			Tu codigo es: ${res}`)
			setComunicar(true);
		}
		else{
			alert("ups! parece que ocurrio un error, Asegurate de que el codigo de sala sea correcto");
		}
	}

	const PopUpMensaje = (props) => {
		return(
			<div className="popup-bg">
				<div className="popup msg">
					<p>{props.mensaje}</p>
					<button onClick={() => {props.close(false)}}>OK</button>
				</div>
			</div>
		);
	}

	return(
		<div className="login">
			
			<form onSubmit={checkLogin}>
				<h2>Accede utilizando tu codigo de usuario</h2>
				
				<input type="text" name="code"/>

				<button>Send</button>
			</form>

			
			<form className="join" onSubmit={ingresarSala}>
				<h2>Solicita permiso para unirse a un grupo</h2>
				
				<label htmlFor="name">Name</label>
				<input type="text" name="name"/>

				<label htmlFor="image">Image url</label>
				<input type="text" name="image"/>

				<label htmlFor="groupID">group id code</label>
				<input type="text" name="groupID"/>

				<button>Send</button>
			</form>

			<h2>Crear una sala nueva</h2>
			<Button action={() => {setCreando(true)}} text="Crear sala"/>

			{creando? <PopUpCrear close={setCreando}/>: null}
			{comunicar? <PopUpMensaje mensaje={mensaje} close={setComunicar}/>: null}
		</div>
	)
}
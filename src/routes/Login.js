import React, { useContext, useState } from "react";
import {RouteContext} from "../contexts/routing";
import Button from '../components/general/Button';
import PopUpCrear from '../components/popups/newRoom';
import {mensajeBackend} from '../helpers';

/**
 * pagina donde el usuario se logea, pide acceso a una sala o crea una sala nueva
 * @returns {JSX.Element} pagina login
 */
export default function LoginRoute(){
	const {login} = useContext(RouteContext);

	const [creando, setCreando] = useState(false);
	const [comunicar, setComunicar] = useState(false);
	const [mensaje, setMensaje] = useState(false);

	/**
	 * inicia el login utilizando el codigo ingresado por el usuario
	 * y en caso de ser un usuario valido guarda los datos del usuario
	 * 
	 * @async
	 * @param {Event} event evento del onSubmit del formulario
	 */
	const checkLogin = async (event) => {
		event.preventDefault();
		const userCode = new FormData(event.target).get("code");
		
		// envia el codigo ingresado
		const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/login`, {
			id: userCode
		});

		// login o mensaje para el usuario
		if(res){
			login(res, {code: userCode});
		}
		else{
			alert("ups! parece que ocurrio un error, asegurate de que tu codigo de usuario es correcto");
		}
	}

	/**
	 * agrega al usuario a una sala para poder ser aceptado luego por el admin
	 * y crea una alerta acorde al resultado
	 * @async
	 * @param {Event} event evento del onSubmit del formulario
	 */
	const ingresarSala = async (event) => {
		event.preventDefault();
		const formD = new FormData(event.target);

		// envia los datos ingresados por el usuario
		const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/addNewUser`, {
			name: formD.get("name"),
			image: formD.get("image"),
			roomID: formD.get("groupID")
		});

		// mensaje para el usuario
		if(res){
			setMensaje(`
				Solicitud de ingreso enviada con exito, solo queda 
				esperar a ser aceptado! Tu codigo es: ${res}
			`)
			setComunicar(true);
		}
		else{
			alert("ups! parece que ocurrio un error, Asegurate de que el codigo de sala sea correcto");
		}
	}

	/**
	 * 
	 * @param {{
	 * 		mensaje: String,
	 * 		close: function
	 * }} props mensaje para el usuario y el estado para cerrar el popup
	 */
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
			
			{/* formulario para el login*/}
			<form onSubmit={checkLogin}>
				<h2>Accede utilizando tu codigo de usuario</h2>
				<input type="text" name="code" maxLength={100} required/>

				<button>Send</button>
			</form>

			{/* formulario para ingresar a una sala*/}
			<form className="join" onSubmit={ingresarSala}>
				<h2>Solicita permiso para unirse a un grupo</h2>
				
				<label htmlFor="name">Name</label>
				<input type="text" name="name" maxLength={30} required/>
				<small>Required and needs to be less than 30 characters</small>

				<label htmlFor="image">Image url</label>
				<input type="text" name="image" maxLength={600} required/>
				<small>Required</small>

				<label htmlFor="groupID">group id code</label>
				<input type="text" name="groupID" maxLength={100} required />
				<small>Required</small>

				<button>Send</button>
			</form>

			<h2>Crear una sala nueva</h2>
			<Button action={() => {setCreando(true)}} text="Crear sala"/>

			{creando? <PopUpCrear close={setCreando}/>: null}
			{comunicar? <PopUpMensaje mensaje={mensaje} close={setComunicar}/>: null}
		</div>
	)
}
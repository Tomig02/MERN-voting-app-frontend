import React, { useContext } from 'react';
import { RouteContext } from '../../contexts/routing';
import {mensajeBackend} from '../../helpers';
import Button from '../general/Button';

/**
 * popup para crear una nueva sala
 * 
 * @param {{close: function}} props 
 */
export default function PopUpCrear(props){
    const {close} = props;
    const {login} = useContext(RouteContext);

    /**
     * crea una nueva sala de votacion con los datos ingresados por el usuario
     * @async
     * @param {Event} event evento del onSubmit del formulario
     */
    const crearSala = async (event) => {
        event.preventDefault();
        const formD = new FormData(event.target);
        
        // envia los datos al backend
        const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/createRoom`, {
            name: formD.get("name"),
            description: formD.get("description"),
            username: formD.get("username"),
            image: formD.get("image")
        });

        if(res){
            login(res, {name: formD.get("username")});	
        }
        else{
            alert("ups! parece que ocurrio un error");
        }
    }

    return(
        <div className="popup-bg">
            <form className="popup new-room" onSubmit={crearSala}>
                <h2>Ingresa los datos de tu nueva sala</h2>

                <label htmlFor="name">Room name</label>
                <input type="text" name="name" maxLength={50} required/>
                <small>Required and needs to be less than 50 characters</small>

                <label htmlFor="description">Room description</label>
                <input type="text" name="description" maxLength={150} required/>
                <small>Required and needs to be less than 150 characters</small>

                <label htmlFor="username">Username</label>
                <input type="text" name="username" maxLength={30} required/>
                <small>Required and needs to be less than 30 characters</small>

                <label htmlFor="image">Image URL</label>
                <input type="text" name="image" maxLength={600} required/>
                <small>Required</small>
                
                <div className="row">
                    <button>Create</button>
                    <Button action={() => {close(false)}} text="Cancel"/>
                </div>
            </form>
        </div>
    )
}
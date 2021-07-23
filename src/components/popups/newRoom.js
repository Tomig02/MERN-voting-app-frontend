import React, { useContext } from 'react';
import { RouteContext } from '../../contexts/routing';
import {mensajeBackend} from '../../helpers';
import Button from '../general/Button';

export default function PopUpCrear(props){
    const {close} = props;
    const {login} = useContext(RouteContext);

    const crearSala = async (event) => {
        event.preventDefault();
        const formD = new FormData(event.target);

        const message = {
            name: formD.get("name"),
            description: formD.get("description"),
            username: formD.get("username"),
            image: formD.get("image")
        }
        
        const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/createRoom`, message);

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
                <input type="text" name="name"/>

                <label htmlFor="description">Room description</label>
                <input type="text" name="description"/>

                <label htmlFor="username">Username</label>
                <input type="text" name="username"/>

                <label htmlFor="image">Image URL</label>
                <input type="text" name="image"/>

                <button>Create</button>
                <Button action={() => {close(false)}} text="Cancel"/>
            </form>
        </div>
    )
}
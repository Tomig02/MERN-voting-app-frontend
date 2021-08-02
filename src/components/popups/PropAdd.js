import React, {useContext} from 'react';
import {RoomContext} from '../../contexts/room';
import {mensajeBackend} from '../../helpers';

/**
 * popup para crear una nueva propuesta en la sala
 * 
 * @param {{
 *      close: function,
 * }} props funcion para cerrar el popup
 */
export default function PropAdd(props){
    const {user, room, setRoom} = useContext(RoomContext);

    /** 
     * agrega una propuesta a la sala con los datos ingresados por el usuario
     * 
     * @async
     * @param {Event} event evento del onSubmit del formulario
     */
    const addProposal = async (event) => {
        event.preventDefault();
        const formD = new FormData(event.target);

        // envia los datos de la nueva propuesta al backend
        const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/newProposal`, {
            name: formD.get("title"),
            image: formD.get("image"),
            description: formD.get("description"),
            roomID: room._id,
            userID: user._id
        });

        if(res){
            setRoom(res);
        }else{
            alert("error!");
        }

        props.close(false);
    }

    return(
        <div className="popup-bg">
            <form className="popup" onSubmit={addProposal}>
                <label>Title: </label>
                <input type="text" name="title" maxLength={30} required/>
                <small>Required and needs to be less than 30 characters</small>

                <label>Description: </label>
                <input type="text" name="description" maxLength={120} required/>
                <small>Required and needs to be less than 120 characters</small>

                <label>Image: </label>
                <input type="text" name="image" maxLength={600} required/>
                <small>Required</small>

                <div className="row">
                    <button>Create</button>
                    <button onClick={() => {props.close(false)}}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
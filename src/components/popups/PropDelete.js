import React, { useContext } from 'react';
import { RoomContext } from '../../contexts/room';
import {mensajeBackend} from '../../helpers';

import Button from '../general/Button';

/**
 * popup para confirmar que se quiere eliminar la propuesta
 * 
 * @param {{close: function}} props funcion para cerrar el popup
 * @returns {JSX.Element} nuevo elemento popup
 */
export default function PropDelete( props ){
    const {room, user, setRoom} = useContext(RoomContext);

    /**
     * envia al backend el pedido de eliminar la propuesta del usuario
     */
    const deleteProposal = async () => {

        // envia al backend los datos
        const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/deleteProposal`, {
            userID: user._id,
            roomID: room._id
        });
    
        if(res){
            alert("propuesta borrada con exito");
            setRoom(res);
        }else{
            alert("error!");
        }    
    }

    return(
        <div className="popup-bg">
            <div className="popup">
                <p>Estas seguro de que queres borrar tu propuesta?</p>
                <div className="row">
                    <Button action={deleteProposal} text="Borrar"/>
                    <button onClick={() => {props.setShowDelete(false)}}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
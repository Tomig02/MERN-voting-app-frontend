import React, { useContext } from 'react';
import { RoomContext } from '../../contexts/room';
import {mensajeBackend} from '../../helpers';

import Button from '../general/Button';

export default function PropDelete( props ){
    const {room, user, setRoom} = useContext(RoomContext);

    const deleteProposal = async () => {
        const res = await mensajeBackend("http://localhost:3001/deleteProposal", {
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
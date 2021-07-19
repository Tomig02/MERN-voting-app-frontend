import React, { useContext } from 'react';
import { RoomContext } from '../../contexts/room';

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
            <p>Estas seguro de que queres borrar tu propuesta?</p>
            <div>
                <button onClick={deleteProposal}>SI</button>
                <button onClick={() => {props.setShowDelete(false)}}>NO</button>
            </div>
        </div>
    );
}
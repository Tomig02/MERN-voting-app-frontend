import React, { useContext } from "react";
import { RoomContext } from "../../contexts/room";


export default function Request(props){
    const {room, setRoom} = useContext(RoomContext);
    const {name, _id} = props;

    const handleReq = async ( isAccepted ) => {
        const res = await mensajeBackend("http://localhost:3001/handleReq", {
            roomID: room._id,
            userID: _id,
            accept: isAccepted
        });

        if(res){
            setRoom(res);
        }else{
            alert("Failed to accept user")
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
            <p>{name}</p>
            <button onClick={() => {handleReq(true)}}>V</button>
            <button onClick={() => {handleReq(false)}}>X</button>
        </div>
    );
}
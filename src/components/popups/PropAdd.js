import React, {useContext} from 'react';
import { RoomContext } from '../../contexts/room';

export default function PropAdd(){
    const {user, room, setRoom} = useContext(RoomContext);

    const addProposal = async (event) => {
        event.preventDefault();
        const formD = new FormData(event.target);

        const res = await mensajeBackend("http://localhost:3001/newProposal", {
            name: formD.get("title"),
            image: formD.get("image"),
            description: formD.get("description"),
            roomID: room._id,
            userID: user._id
        });

        if(res){
            console.log(res);
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
        <form onSubmit={addProposal}>
            <label>Title: </label>
            <input type="text" name="title"/>
            
            <label>Description: </label>
            <input type="text" name="description"/>
            
            <label>Image: </label>
            <input type="text" name="image"/>
 
            <button>Create</button>
        </form>
    );
}
import React, { useContext } from "react";
import {RoomContext} from "../../contexts/room"; 

export default function Proposal( props ){
    const {user, setRoom} = useContext(RoomContext);

    const handleClick = async () => {
        const res = await mensajeBackend("http://localhost:3001/vote",{
            propID: props._id,
            userName: user.name 
        })  
        console.log(res);
        if(res){
            setRoom(res);
        }else{
            alert('error during vote process');
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
        console.log(response);
		if(response.ok){
			return await response.json();
		}else{
			return null;
		}
	}

    return(
        <div className="proposal-base">
            <div className="row">
                <h2 className="proposal-title">{props.name}</h2>
                <button className="vote-btn" onClick={handleClick}>Vote</button>
            </div>
            <p className="proposal-description">{props.description}</p>
            <p>Votes: {props.votes}</p>
            <img className="proposal-image" alt="" src={props.image}/> 
        </div>
    );
}
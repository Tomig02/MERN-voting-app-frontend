import React, { useContext } from "react";
import {RoomContext} from "../../contexts/room"; 
import Button from "../general/Button";

export default function Proposal( props ){
    const {user, setRoom} = useContext(RoomContext);
    const placeholder = "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=30";

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

		if(response.ok){
			return await response.json();
		}else{
			return null;
		}
	}

    const validURL = (url) => {
        const string = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        const regex = new RegExp(string);
        
        return url.match(regex);
    }

    return(
        <div className="proposal">
            <div className="row">
                <h2 className="proposal-title">{props.name}</h2>
                <Button action={handleClick} text="vote"/>
            </div>
            <p className="proposal-description">{props.description}</p>
            <p><strong>Votes:</strong>  {props.votes}</p>
            <img className="proposal-image" alt="" src={validURL(props.image)? props.image: placeholder}/> 
        </div>
    );
}
import React, { useContext, useEffect, useState } from "react";
import {RoomContext} from "../contexts/room"; 
import {validURL, mensajeBackend} from '../helpers';
import Button from "./general/Button";

export default function Proposal( props ){
    const {user, setRoom} = useContext(RoomContext);
    const placeholder = "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=30";

    const handleClick = async () => {
        const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/vote`,{
            propID: props._id,
            userName: user.name 
        })  

        if(res){
            setRoom(res);
        }else{
            alert('error during vote process');
        }
    }

    const [hasVoted, setHasVoted] = useState(false);
    useEffect(() => {
        setHasVoted(props.voters.indexOf(user.name) !== -1)
    }, [props.voters, user.name]);

    return(
        <div className="proposal">
            <div className="row">
                <h3 className="proposal-title">{props.name}</h3>
                <Button caution={hasVoted} action={handleClick} text="vote"/>
            </div>
            <p className="proposal-description">{props.description}</p>
            <p><strong>Votes:</strong>  {props.votes}</p>
            <img className="proposal-image" alt="" src={validURL(props.image)? props.image: placeholder}/> 
        </div>
    );
}
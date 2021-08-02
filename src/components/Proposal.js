import React, { useContext, useEffect, useState } from "react";
import {RoomContext} from "../contexts/room"; 
import {validURL, mensajeBackend} from '../helpers';
import Button from "./general/Button";

/**
 * elemento jsx que muestra los datos de una propuesta y 
 * permite votar o deshacer un voto
 * @param {
 *      _id: String, 
 *      description: String, 
 *      image: String, 
 *      votes: Number
 *      name: String
 * } props datos de la propuesta
 * @returns {JSX.Element} elemento Proposal
 */
export default function Proposal( props ){
    const {user, setRoom} = useContext(RoomContext);
    const placeholder = "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=30";

    /**
     * conecta con el backend para votar la propuesta elegida o deshacer el 
     * voto si ya se habia votado esta propuesta
     */
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

    // controla si el usuario ya voto esta propuesta
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
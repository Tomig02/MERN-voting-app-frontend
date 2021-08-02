import React, { useContext } from "react";
import { RoomContext } from "../../contexts/room";
import UserBtn from "./UserBtn";
import {mensajeBackend} from "../../helpers";

/**
 * elemento jsx que muestra los datos de un usuario que pide acceso al grupo
 * asi el admin puede aceptar o rechazar este pedido
 * 
 * @param {{name: String, _id: String, image: String}} props datos del elemento 
 * @returns {JSX.Element} nuevo elemento Request
 */
export default function Request(props){
    const {room, setRoom} = useContext(RoomContext);
    const {name, _id, image} = props;

    /**
     * conecta con el backend para aceptar o rechazar el pedido de ingreso
     *  
     * @async
     * @param {boolean} isAccepted si el usuario fue aceptado o no
     */
    const handleReq = async ( isAccepted ) => {
        const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/handleReq`, {
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

    return(
        <UserBtn 
            actions={[() => {handleReq(true)}, () => {handleReq(false)}]}
            btnT={["Yes", "No"]}
            text={name}
            image={image}
        />
    );
}
import React, { useContext } from "react";
import { RoomContext } from "../../contexts/room";
import UserBtn from "./UserBtn";
import {mensajeBackend} from "../../helpers";

export default function Request(props){
    const {room, setRoom} = useContext(RoomContext);
    const {name, _id, image} = props;

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

    return(
        <UserBtn 
            actions={[() => {handleReq(true)}, () => {handleReq(false)}]}
            btnT={["Yes", "No"]}
            text={name}
            image={image}
        />
        // <div>
        //     <p>{name}</p>
        //     <button onClick={() => {handleReq(true)}}>V</button>
        //     <button onClick={() => {handleReq(false)}}>X</button>
        // </div>
    );
}
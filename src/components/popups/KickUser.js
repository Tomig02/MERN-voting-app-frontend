import React, { useContext } from 'react';
import { RoomContext } from '../../contexts/room';
import {mensajeBackend} from '../../helpers';
import UserBtn from '../general/UserBtn';

export default function KickMenu(props){
        const {room, setRoom} = useContext(RoomContext);
        const {setOpen} = props;

        const kickUser = async ( kickID ) => {
            const res = await mensajeBackend("http://localhost:3001/kickUser", {
                roomID: room._id,
                userID: kickID
            });
    
            if(res){
                setRoom(res);
            }
            else{
                alert("failed to kickUser");
            }
        }

        return(
            <div className="popup-bg">
                <div className="popup">
                    <h2>Seleccione un usuario</h2>
                    
                    {room.users.map( elem => {
                        return elem.active
                            ? <UserBtn 
                                key={elem._id}
                                btnT="Kick"
                                actions={() => {kickUser(elem._id)}} 
                                image={elem.image}
                                text={elem.name} 
                            />
                            : null;
                    })}
                    
                    <button onClick={() => {setOpen(false)}}>Cancel</button>
                </div>
            </div>
        );
    }
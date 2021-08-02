import React, { useContext } from 'react';
import { RoomContext } from '../../contexts/room';
import {mensajeBackend} from '../../helpers';
import UserBtn from '../general/UserBtn';

/**
 * popup para eliminar usuarios de la sala, muestra a todos los usuarios de la sala
 * y elimina el que sea elegido por el admin
 * 
 * @param {{setOpen: function}} props funcion para cerrar el popup
 * @returns {JSX.Element} nuevo elemento popup
 */
export default function KickMenu(props){
        const {room, setRoom} = useContext(RoomContext);
        const {setOpen} = props;

        /**
         * elimina al usuario elegido por el admin
         * 
         * @param {String} kickID 
         */
        const kickUser = async ( kickID ) => {

            // envia los datos al backend
            const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/kickUser`, {
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
                    
                    {/* muestra a todos los usuarios dentro del popup */}
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
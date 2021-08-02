import React, { Fragment, useContext, useState } from 'react';
import { RoomContext } from '../contexts/room';
import Request from './general/Request';
import KickMenu from './popups/KickUser';
import {mensajeBackend} from '../helpers';
import { RouteContext } from '../contexts/routing';

/**
 * estas son las acciones disponibles para el admin que estan disponibles en el sidebar
 * 
 * @returns {JSX.Element} Fragment con las acciones para el admin
 */
export default function AdminPanel(){
    const {room} = useContext(RoomContext);
    const {update} = useContext(RouteContext);

    const [showKick, setShowKick] = useState(false);

    /** 
     * crea los pedidos de acceso que se muestran en el sidebar
     * @returns {JSX.Element} devuelve los pedidos de ingreso o un mensaje
    */
    const showRequests = () => {
        // crea un Request para todos los usuarios que no esten activos
        const reqs = room.users.filter( elem => {
            return !elem.active;
        }).map(elem => {return <Request _id={elem._id} name={elem.name} image={elem.image} />});

        // devuelve los Requests o un mensaje de que no hay ningun pedido
        return reqs.length > 0
            ? reqs
            : <p className="no-req">No hay pedidos de ingreso</p>
    }

    /**
     * conecta con el backend para terminar la votacion y 
     * bloquear la sala para solo poder ver los resultados
     * 
     * @async
     */
    const endVote = async () => {
        const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/Finish`, {
            roomID: room._id
        });

        if(res){
            update({room: res});
        }
    }

    return(
        <Fragment>
            <button onClick={() => {setShowKick(true)}}>Kick User</button>
            <button onClick={endVote}>End vote</button>
            <hr />
            <h2>Requests</h2>
            {showRequests()}

            {showKick? <KickMenu setOpen={setShowKick}/>: null}
        </Fragment>
    );
}
import React, { Fragment, useContext, useState } from 'react';
import { RoomContext } from '../contexts/room';
import Request from './general/Request';
import KickMenu from './popups/KickUser';
import {mensajeBackend} from '../helpers';
import { RouteContext } from '../contexts/routing';

export default function AdminPanel(){
    const {room} = useContext(RoomContext);
    const {update} = useContext(RouteContext);

    const [showKick, setShowKick] = useState(false);

    const showRequests = () => {
        const reqs = room.users.filter( elem => {
            return !elem.active;
        }).map(elem => {return <Request _id={elem._id} name={elem.name} image={elem.image} />});

        return reqs.length > 0? reqs: <p className="no-req">No hay pedidos de ingreso</p>
    }

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
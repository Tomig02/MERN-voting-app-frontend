import React, { Fragment, useContext, useState } from 'react';
import { RoomContext } from '../../contexts/room';
import Request from '../general/Request';

export default function AdminPanel(){
    const {room, setRoom} = useContext(RoomContext);

    const [showKick, setShowKick] = useState(false);

    const showRequests = () => {
        return room.users.map( elem => {
            return !elem.active? <Request _id={elem._id} name={elem.name}/> : null
        });
    }
    const endVote = () => {
        //TODO backend not done
    }

    // const mensajeBackend = async (url, message) => {
	// 	const response = await fetch(url, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(message)
	// 	});

	// 	if(response.ok){
	// 		return await response.json();
	// 	}else{
	// 		return null;
	// 	}
	// }

    const KickMenu = (props) => {
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

        return(
            <div>
                <h2>Seleccione un usuario</h2>
                
                {room.users.map( elem => {
                    return elem.active? <button onClick={() => {kickUser(elem._id)}}>{elem.name}</button>: null;
                })}
                
                <button onClick={() => {setOpen(false)}}>Cancel</button>
            </div>
        );
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
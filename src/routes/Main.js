import React, { useContext } from 'react';
import {RoomContext} from '../room';
import Proposal from '../components/proposal/Proposal'
import Sidebar from '../components/sidebar/Sidebar';

/*
	TODO LIST
		-- proposal funtions
		-- full admin panel
		-- full side panel

*/
export default function MainRoute(){
	const {room, user} = useContext(RoomContext);
	
	const renderProposals = () => {
		return room.proposals.map(element => {
			return <Proposal key={element._id} {...element} />
		});
	}

	return(
		<div>
			<div className="room-description">
				<h1>{room.name}</h1>
				<p>Description: {room.description}</p>
				<p>Room code: {room._id}</p>
			</div>

			<div className="proposals-grid">
				{renderProposals()}
			</div>
			
			<Sidebar {...room} isAdmin={user.admin}/>

			<div id="json-data">{JSON.stringify(room, 4)}</div>
		</div>
	)
}
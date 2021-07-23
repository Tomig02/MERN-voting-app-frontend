import React, { useContext } from 'react';
import {RoomContext} from '../contexts/room';
import Proposal from '../components/Proposal'
import Sidebar from '../components/Sidebar';

export default function MainRoute(){
	const {room, user} = useContext(RoomContext);

	const renderProposals = () => {
		return room.proposals.map( element => {
			return <Proposal key={element._id} {...element} />
		})
	}

	return(
		<div className="main-body">
			<div className="room-description">
				<h1>{room.name}</h1>
				<p><strong>Description:</strong> {room.description}</p>
				<p><strong>Room code:</strong> {room._id}</p>
			</div>

			<div className="proposals-grid">
				{renderProposals()}
			</div>
			
			<Sidebar isAdmin={user.admin} name={user.name} code={user._id} />

			<button className="burger-btn"><img src="./menu.svg" alt="burger menu"/></button>
		</div>
	)
}
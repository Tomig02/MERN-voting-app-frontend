import React, { useContext, useState, useEffect} from 'react';
import {RoomContext} from '../contexts/room';
import Proposal from '../components/Proposal'
import Sidebar from '../components/Sidebar';

/**
 * pagina principal de la aplicacion, aca se interactua 
 * con la sala y se ven los datos de esta 
 * 
 * @returns {JSX.Element} pagina main
 */
export default function MainRoute(){
	const {room, user} = useContext(RoomContext); 

	const [showSidebar, setShowSidebar] = useState(false);

	/**
	 * utiliza los datos de las propuestas para crear los elementos a mostrar
	 * @returns {JSX.Element[]} propuestas como elementos de react
	 */
	const renderProposals = () => {
		return room.proposals.map( element => {
			return <Proposal key={element._id} {...element} />
		})
	}

	const [width, setWidth] = useState(window.innerWidth);
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
			window.addEventListener('resize', handleWindowSizeChange);
			return () => {
				window.removeEventListener('resize', handleWindowSizeChange);
			}
		}, []);

	let isMobile = (width <= 900);

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
			
			{isMobile
				? showSidebar? <Sidebar isAdmin={user.admin} name={user.name} code={user._id} />: null
				: <Sidebar isAdmin={user.admin} name={user.name} code={user._id} />
			}

			<button className="burger-btn" onClick={() => {setShowSidebar(!showSidebar)}}>
				<img src="./menu.svg" alt="burger menu"/>
			</button>
		</div>
	)
}
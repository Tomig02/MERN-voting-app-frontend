import React, { useContext, useEffect, useState} from 'react';
import { RoomContext } from '../contexts/room';

export default function Results(){
    const {room} = useContext(RoomContext);

    const [winner, setWinner] = useState(null);
    const [proposal, setProposal] = useState([]);

    const Card = (props) => {
        return (
            <div className="last-card">
                <img src={props.image} alt=""/>
                <div className="text-container">
                    <h3>{props.name}</h3>
                    <p>{props.description}</p>
                    <p>Votes: {props.votes}</p>
                    <p>Percentage: {Math.round((props.votes / room.users.length)* 100) }%</p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        let max = -1;

        let winElem = undefined; 
        for(const elem of room.proposals){
            if(elem.votes > max){ 
                max = elem.votes;
                winElem = elem;
            };
        }

        const rest = room.proposals.filter(elem => {
            return elem._id !== winElem._id;
        });

        setProposal(rest.map(elem => {
            return <Card key={elem._id} {...elem} />;
        }));
        setWinner([<Card key={winElem._id} {...winElem} />]);
    }, [room.proposals]);

    return(
        <div className="results">
            <h1>Esta votacion se a terminado</h1>
            <h2>La propuesta mas votada es: </h2>
            <div className="winner">
                {winner}
            </div>
            <h2>Otras propuestas: </h2>
            <div className="proposals-grid">
            {proposal}
            </div>
        </div>
    );
}
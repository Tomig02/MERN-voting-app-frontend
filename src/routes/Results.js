import React, { useContext, useEffect, useState} from 'react';
import { RoomContext } from '../contexts/room';

/**
 * pagina de resultados de la votacion, aca se muestran los resultados
 * lugo de que el admin termine la votacion
 * 
 * @returns {JSX.Element} pagina resultados
 */
export default function Results(){
    const {room} = useContext(RoomContext);

    const [winner, setWinner] = useState(null);
    const [proposal, setProposal] = useState([]);

    /**
     * tarjetas que muestran los resultados de la votacion
     * @param {{
     *      image: string, 
     *      name: string,
     *      description: string,
     *      votes: number
     * }} props datos de la propuesta
     */
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

        // selecciona la propuesta ganadora de la votacion
        // recorriendo todas las propuestas buscando la que tenga mas votos 
        let max = -1;
        let winElem = undefined; 
        for(const elem of room.proposals){
            if(elem.votes > max){ 
                max = elem.votes;
                winElem = elem;
            };
        }

        // separa a la propuesta ganadora del resto de las propuestas
        const rest = room.proposals.filter(elem => {
            return elem._id !== winElem._id;
        });

        // guarda la propuesta ganadora y al resto como <Cards/> en diferentes estados
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
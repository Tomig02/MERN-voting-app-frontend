import React from 'react';
import AdminPanel from '../adminPanel/AdminPanel';

export default function Sidebar( props){

    const addProposal = () => {
        //TODO fetch to add proposal
    }

    const deleteProposal = () => {
        //TODO fetch to delete proposal
    }

    return(
        <div>
            <h3>Participants: {props.users.length}</h3>
            <h3>Votes: {props.votes}/{props.users.length}</h3>
            <h3>Proposals: {props.proposals.length}/{props.users.length}</h3>
            <h3>Admin: {props.admin}</h3>

            <div>
                <button onClick={addProposal}>Add proposal</button>
                <button onClick={deleteProposal}>Delete proposal</button>
            </div>

            {props.isAdmin? <AdminPanel/>: null}
        </div>
    );
}
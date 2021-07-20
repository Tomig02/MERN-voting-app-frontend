import React, { useState } from 'react';
import AdminPanel from '../adminPanel/AdminPanel';
import AddPopUp from '../popups/PropAdd';
import DeletePopUp from '../popups/PropDelete';

export default function Sidebar( props){

    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    return(
        <div className="side-bar">
            <h3>Participants: {props.users.length}</h3>
            <h3>Votes: {props.votes}/{props.users.length}</h3>
            <h3>Proposals: {props.proposals.length}/{props.users.length}</h3>
            <h3>Admin: {props.admin}</h3>

            <button onClick={() => {setShowAdd(!showAdd)}}>Add proposal</button>
            <button onClick={() => {setShowDelete(!showDelete)}}>Delete proposal</button>


            {showAdd? <AddPopUp close={setShowAdd}/>: null}
            {showDelete? <DeletePopUp setShowDelete={setShowDelete} />: null}
            {props.isAdmin? <AdminPanel/>: null}
        </div>
    );
}
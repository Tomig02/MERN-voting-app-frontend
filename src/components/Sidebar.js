import React, {useContext, useState} from 'react';
import { RoomContext } from '../contexts/room';
import AdminPanel from './AdminPanel';
import AddPopUp from './popups/PropAdd';
import DeletePopUp from './popups/PropDelete';

export default function Sidebar( props){
    const {room} = useContext(RoomContext);

    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    return(
        <div className="abs-container">
            <div className="side-bar-inner">
                <h3>User: {props.name}</h3>
                <h3>Code: {props.code}</h3>
            </div>
            <div className="side-bar-inner">
                <h3>Participants: {room.users.length}</h3>
                <h3>Votes: {room.votes}/{room.users.length}</h3>
                <h3>Proposals: {room.proposals.length}/{room.users.length}</h3>
                <h3>Admin: {props.admin}</h3>

                <button onClick={() => {setShowAdd(!showAdd)}}>Add proposal</button>
                <button onClick={() => {setShowDelete(!showDelete)}}>Delete proposal</button>


                {showAdd? <AddPopUp close={setShowAdd}/>: null}
                {showDelete? <DeletePopUp setShowDelete={setShowDelete} />: null}
                {props.isAdmin? <AdminPanel/>: null}
            </div>
        </div>
    );
}
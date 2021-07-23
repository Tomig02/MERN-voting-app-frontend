import React, {useContext} from 'react';
import {RoomContext} from '../../contexts/room';
import {mensajeBackend} from '../../helpers';

export default function PropAdd(props){
    const {user, room, setRoom} = useContext(RoomContext);

    const addProposal = async (event) => {
        event.preventDefault();
        const formD = new FormData(event.target);

        const res = await mensajeBackend("http://localhost:3001/newProposal", {
            name: formD.get("title"),
            image: formD.get("image"),
            description: formD.get("description"),
            roomID: room._id,
            userID: user._id
        });

        if(res){
            console.log(res);
            setRoom(res);
        }else{
            alert("error!");
        }

        props.close(false);
    }

    return(
        <div className="popup-bg">
            <form className="popup" onSubmit={addProposal}>
                <label>Title: </label>
                <input type="text" name="title"/>
                
                <label>Description: </label>
                <input type="text" name="description"/>
                
                <label>Image: </label>
                <input type="text" name="image"/>

                <div className="row">
                    <button>Create</button>
                    <button onClick={() => {props.close(false)}}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
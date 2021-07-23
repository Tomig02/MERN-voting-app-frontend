import {createContext, useState} from 'react';

export const RoomContext = createContext();

export const Room = ({children}) => {

    const [room, setRoom] = useState({});
    const [user, setUser] = useState({});
    
    return(
        <RoomContext.Provider value={{
            room: room,
            user: user,
            setUser: setUser,
            setRoom: setRoom
        }}>
            {children}
        </RoomContext.Provider>
    )
}
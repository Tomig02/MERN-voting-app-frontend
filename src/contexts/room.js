import {createContext, useState} from 'react';

export const RoomContext = createContext();

export const Room = ({children}) => {

    const [room, setRoom] = useState(null);
    const [user, setUser] = useState(null);
    
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
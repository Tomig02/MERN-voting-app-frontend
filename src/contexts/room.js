import {createContext, useState} from 'react';

export const RoomContext = createContext();

/**
 * Context.Provider que contiene los datos de la sala actual y el usuario loggeado
 *  
 * @param {{}} param0 
 * @returns {JSX.Element} context provider sala
 */
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
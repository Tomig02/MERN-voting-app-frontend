import {useState, createContext, useContext, useEffect} from "react";
import {RoomContext} from './room';

export const pageMap = {
    login: "login",
    main: "main",
    results: "results"
}
export const RouteContext = createContext(pageMap);

export const Router = ({children}) => {
    const {setUser, setRoom} = useContext(RoomContext);

    let urlPath = window.location.pathname.slice(1).toLowerCase()

    const [path, setPath] = useState(urlPath || pageMap.main);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        window.onpopstate = (event) => {
            setPath(event.state.path);
        }
    }, []);
    
    useEffect(() => {
        console.log("rerender, path: ", path);
        if(!logged & path !== pageMap.login){
            setPath(pageMap.login);
            window.history.replaceState({path: path}, "Something", path);
        }
        else{
            if(logged){
                window.history.pushState({path: path}, "Something", path);
            }
        }
    }, [path, logged]);

    const update = ({room= undefined, newLogged= undefined} = {}) => {
        if(room){
            setRoom(room);
        }
        if(newLogged & logged !== newLogged){
            setLogged(newLogged);
        }
        if(room.fin === true){
            setPath(pageMap.results);
        }
    }

    const login = (room, {code, name}) => {
        if(code){
            setUser(room.users.find(user => {return user._id === code}));
        }else{
            setUser(room.users.find(user => {return user.name === name}));
        }

        
        update({room: room, newLogged: true});

        if(room.fin !== true){
            setPath(pageMap.main);
        }
	}

    return (
        <RouteContext.Provider value={{
            path: path,
            login: login,
            update: update,
            setLogged: setLogged
        }}>
            {children}
        </RouteContext.Provider>
    );
}
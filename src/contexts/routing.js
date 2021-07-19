import {useState, createContext, useContext, useEffect} from "react";
import {RoomContext} from './room';

export const pageMap = {
    login: "login",
    main: "main"
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

    const login = (room, {code, name}) => {
        if(code){
            setUser(room.users.find(user => {return user._id === code}));
        }else{
            setUser(room.users.find(user => {return user.name === name}));
        }

        setRoom(room);
		setLogged(true);
		setPath(pageMap.main);
	}

    return (
        <RouteContext.Provider value={{
            path: path,
            login: login
        }}>
            {children}
        </RouteContext.Provider>
    );
}
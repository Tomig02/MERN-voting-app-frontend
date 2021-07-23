import {useState, createContext, useContext, useEffect} from "react";
import {RoomContext} from './room';
import {useCookies} from 'react-cookie';
import {mensajeBackend} from '../helpers';
import { useCallback } from "react";

export const pageMap = {
    login: "login",
    main: "main",
    results: "results"
}
export const RouteContext = createContext(pageMap);

export const Router = ({children}) => {
    const {setUser, setRoom} = useContext(RoomContext);
    const [cookies, setCookie] = useCookies(['_id'])

    let urlPath = window.location.pathname.slice(1).toLowerCase()

    const [path, setPath] = useState(urlPath || pageMap.login);
    const [logged, setLogged] = useState(false);

    useEffect(() => {

        const inner = async () => {
            if(cookies._id){
                const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                    id: cookies._id
                });
                console.log(res);
                if(res){
                    login(res, {code: cookies._id})
                }else{
                    setPath(pageMap.login);
                }
            }
        };
        inner();

        // history pop action
        window.onpopstate = (event) => {
            setPath(event.state.path);
        }
    }, []);
    
    useEffect(() => {

        if(!logged & path !== pageMap.login){
            setPath(pageMap.login);
            window.history.replaceState({path: path}, "Something", path);
        }
        else{
            if(logged){
                window.history.pushState({path: path}, "Something", path);
            }
        }
    }, [path, logged, useCallback(setCookie)]);

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
        
        let userAct = undefined;
        if(code){
            userAct = room.users.find(user => {return user._id === code});
        }else{
            userAct = room.users.find(user => {return user.name === name});
        }
        setUser(userAct);
        setCookie('_id', userAct._id, {path: '/'});
        
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
            setLogged: setLogged,
        }}>
            {children}
        </RouteContext.Provider>
    );
}
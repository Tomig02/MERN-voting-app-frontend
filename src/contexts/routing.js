import {useState, createContext, useContext, useEffect} from "react";
import {RoomContext} from './room';
import {useCookies} from 'react-cookie';
import {mensajeBackend} from '../helpers';

export const pageMap = {
    login: "login",
    main: "main",
    results: "results"
}
export const RouteContext = createContext(pageMap);

/**
 * Context.Provider que se encarga del manejo de las rutas y 
 * actualizar el url del navegador
 * 
 * @param {{}} param0 
 * @returns {JSX.Element} context provider routing
 */
export const Router = ({children}) => {
    const {setUser, setRoom} = useContext(RoomContext);
    const [cookies, setCookie] = useCookies(['_id'])

    let urlPath = window.location.pathname.slice(1).toLowerCase()

    const [path, setPath] = useState(urlPath || pageMap.login);
    const [logged, setLogged] = useState(false);

    useEffect(() => {

        // funcion asyncronica dentro del useEffect
        const inner = async () => {

            // si existe una cookie la utiliza para iniciar sesion, 
            // sino redirecciona hacia el login
            if(cookies._id){
                const res = await mensajeBackend(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                    id: cookies._id
                });

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

        // si no esta logeado reddirecciona hacia el login
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

    /**
     * actualiza los datos de la sala y muestra los resultados si se termino la votacion
     * 
     * @param {{room: {}, newLogged: boolean}} param0 
     */
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

    /**
     * hace el login del usuario, cargando los datos de la sala y el usuario al 
     * contexto de sala y redireccionando a Main o Results segun sea necesario
     * 
     * @param {{}} room 
     * @param {{code: String, name: String}} param1 
     */
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
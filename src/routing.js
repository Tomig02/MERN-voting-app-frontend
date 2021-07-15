import {useState, createContext, useEffect} from "react";

export const pageMap = {
    login: "login",
    main: "main"
}
export const RouteContext = createContext(pageMap);

export const Router = ({children}) => {
    let urlPath = window.location.pathname.slice(1).toLowerCase()
    
    const [path, setPath] = useState(urlPath || pageMap.main);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        console.log("rerender, path: ", path);
        if(!logged & path !== pageMap.login){
            setPath(pageMap.login);
            window.history.replaceState({}, "Something", path);
        }
        else{
            window.history.pushState({}, "Something", path);
        }
    }, [path, logged]);

    return (
        <RouteContext.Provider value={{
            path: path,
            setPath: setPath,
            setLogged: setLogged
        }}>
            {children}
        </RouteContext.Provider>
    );
}
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

    const login = () => {
        
		setLogged(true);
		setPath("main");
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
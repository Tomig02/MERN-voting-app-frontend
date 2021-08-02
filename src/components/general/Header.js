import React, {useContext} from 'react';
import {useCookies} from 'react-cookie';
import {RouteContext} from '../../contexts/routing';

import Button from './Button';

/**
 * header de la aplicacion con un boton para cerrar la sesion
 * 
 * @returns {JSX.Element} elemento Header
 */
export default function Header(){
    const [cookie, setCookie, removeCookie] = useCookies(['_id']);
    const {setLogged} = useContext(RouteContext);

    // cierra la sesion actual
    const exitMain = () => {       
        removeCookie("_id");
        setLogged(false);
    };

    return(
        <div className="header">
            <h1>MERN voting app</h1>
            <Button action={exitMain} text={"Exit"}/>
        </div>
    )
}
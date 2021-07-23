import React, {useContext} from 'react';
import {useCookies} from 'react-cookie';
import {RouteContext} from '../../contexts/routing';

import Button from './Button';

export default function Header(){
    const [cookie, setCookie, removeCookie] = useCookies(['_id']);
    const {setLogged} = useContext(RouteContext);

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
import React, { useContext } from 'react';
import { RouteContext } from '../../contexts/routing';

import Button from './Button';

export default function Header(){
    const {setLogged} = useContext(RouteContext);

    const exitMain = () => {
        setLogged(false);
    };

    return(
        <div className="header">
            <h1>MERN voting app</h1>
            <Button action={exitMain} text={"Exit"}/>
        </div>
    )
}
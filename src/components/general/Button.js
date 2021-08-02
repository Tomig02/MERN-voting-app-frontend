import React, { useEffect, useState } from "react";

/**
 * boton normal, se puede cambiar el color de fondo con props.caution o props.noBG
 * @param {{
 *      caution: boolean, 
 *      noBG: boolean,
 *      action: function,
 *      text: String
 * }} props datos para el boton 
 * @returns 
 */
export default function Button(props){
    const {action, text} = props;

    const [active, setActive] = useState(false);
    const [caution, setCaution] = useState(false);
    
    // desactiva el boton hasta completar la accion
    const handleClick = async () => {
        setActive(true);
        await action();
        setActive(false);
    }

    useEffect(() => {
        setCaution(Boolean(props.caution));
    }, [props.caution])

    return(
        <button 
            className={(props.noBG? "no-bg": "") + (caution? "caution": "")} 
            onClick={handleClick} 
            disabled={active}>
            {active? "...": text}
        </button>
    );
}
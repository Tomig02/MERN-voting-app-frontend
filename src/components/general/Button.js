import React, { useEffect, useState } from "react";

export default function Button(props){
    const {action, text} = props;

    const [active, setActive] = useState(false);
    const [caution, setCaution] = useState(false);
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
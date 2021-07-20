import React, { useState } from "react";

export default function Button(props){
    const {action, text} = props;

    const [active, setActive] = useState(false);

    const handleClick = async () => {
        setActive(true);
        await action();
        setActive(false);
    }

    return(
        <button onClick={handleClick} disabled={active}>
            {active? "...": text}
        </button>
    );
}
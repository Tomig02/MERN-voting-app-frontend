import React from 'react';
import Button from './Button';
import {validURL} from '../../helpers';

/**
 * crea un elemento con los datos del usuario y botones con diferentes acciones
 * las acciones y texto de un boton deben tener el mismo indice dentro del arreglo
 *  
 * @param {{
 *      btnT: String | Array<String>, 
 *      actions: function | Array<function>, 
 *      text: String, 
 *      image: String
 * }} props 
 * @returns {JSX.Element}
 */
export default function UserBtn(props){
    const {btnT, actions, text, image} = props;
    const placeholder = "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=30";

    // crea los botones, si actions es un array crea mas de un boton, 
    // sino crea un solo boton
    const buttons = Array.isArray(actions)
        ? actions.map((action, i) => {
            return <Button noBG={true} action={action} text={btnT[i]}/>;
        })
        : <Button noBG={true} action={actions} text={btnT}/>;

    return(
        <div className="user-btn">
            <img className="user-btn-image" alt="" src={validURL(image)? image: placeholder}/> 
            {text}
            <div className="btn-container">
                {buttons}
            </div>
        </div>
    );
}
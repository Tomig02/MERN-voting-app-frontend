import React from 'react';
import Button from './Button';
import {validURL} from '../../helpers';

export default function UserBtn(props){
    const {btnT, actions, text, image} = props;
    const placeholder = "https://generative-placeholders.glitch.me/image?width=600&height=300&style=triangles&gap=30";

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
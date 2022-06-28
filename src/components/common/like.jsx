import React from 'react';
import 'font-awesome/css/font-awesome.css';
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
 import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

const Like = props => {
    let classes = "fa-heart ";
    let heartIcon = regularHeart;
    
    if(props.liked) 
    {
        classes += "fa-solid";
        heartIcon = solidHeart;
    }
    // else
    // {
    //     classes += "fa-regular";
    // }

    return (
        // <i 
        //     onClick={props.onClick} 
        //     style={{cursor: "pointer"}} 
        //     className={classes} 
        //     aria-hidden="true">                
        // </i>
         <FontAwesomeIcon 
            onClick={props.onClick} 
            style={{cursor: "pointer"}} 
            icon={heartIcon} 
            aria-hidden="true" />
    );
}
 
export default Like;
import React from 'react';
import './button.css';
import ButtonLoader from "../Auth/Buttonloader/ButtonLoader";

const Button = ({onClick, className,loading, text}) => {
    return (
        <button className={`round-blue-btn circular-std-Book ${className}`} onClick={(e) => onClick && onClick(e)}>
            {loading ? <ButtonLoader/> :text}
            {/*{text}*/}
        </button>
    );
};

export default Button;
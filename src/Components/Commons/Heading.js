import React from 'react';
import './heading.css';

const Heading = ({text, className}) => {
    return (
        <h1 className={`circular-std-Black fs-lg-4-5 ${className ? className : ''}`}>
            {text}
        </h1>
    );
}

export default Heading;
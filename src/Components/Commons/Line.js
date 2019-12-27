import React from 'react';

const Line = ({type, className}) => {
    return (
        <div
            className={`${type === 'white' ? 'white-line' : "score-board-line"}
            ${className ? className : ''}
         `}/>
    );
}

export default Line;
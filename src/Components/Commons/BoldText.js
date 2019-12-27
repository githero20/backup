import React from 'react';

const BoldText = (props) => {
    const {className} = props;
    return (
        <h1 className={`circular-std-Black fs-3 ${className ? className : ''}`}>{props.children}</h1>
    );
};

export default BoldText;
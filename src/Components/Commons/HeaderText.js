import React from 'react';

const HeaderText = (props) => {
    const {className} = props;
    return (
        <h1 className={`circular-std-Black ${className ? className : ''}`}>{props.children}</h1>
    );
};

export default HeaderText;
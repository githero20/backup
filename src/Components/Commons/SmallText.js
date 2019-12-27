import React from 'react';

const SmallText = (props) => {
    const {className} = props;
    return (
        <p className={`circular-std-Book  ${className ? className : ''}`}>{props.children}</p>
    );
};

export default SmallText;
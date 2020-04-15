import React from 'react';
import PropTypes from 'prop-types';

const HeaderText = (props) => {
    const {className} = props;
    return (
        <h1 className={`circular-std-Black ${className ? className : ''}`}>{props.children}</h1>
    );
};

HeaderText.propTypes = {
    className:PropTypes.string,
};


export default HeaderText;
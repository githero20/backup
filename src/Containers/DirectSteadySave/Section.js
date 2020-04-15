import React from 'react';
import PropTypes from 'prop-types';

Section.propTypes = {
    className:PropTypes.string
};

function Section(props) {
    return (
        <section className={props.className}>
            {props.children}
        </section>
    );
}

export default Section;
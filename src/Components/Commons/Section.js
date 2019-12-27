import React from 'react';
import {Container} from "react-bootstrap";
import './section.css';

const Section = (props) => {
    const {className, type, hideOverflow} = props;

    return (
        <section
            className={`${className ? className : ''} 
            ${hideOverflow ? 'overflow-x-hidden' : ''} 
            mh-lg-100-vh ${type === 'fluid' ? '' : 'pt-lg-3'} 
            px-lg-3 mh-lg-100-vh position-relative`}>
            {type === 'fluid'
                ? <>{props.children}</> :
                <Container>
                    {props.children}
                </Container>}
        </section>
    );
}

export default Section;
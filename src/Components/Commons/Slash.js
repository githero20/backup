import React from 'react';
import slash from "../../admin/app-assets/images/slash@2x.png";

const Slash = (props) => {
    const {className} = props;
    return (
        <div className={`${className ? className : ''} text-lg-center `}>
            <img src={slash} style={{width: '35px'}} alt="slash"/>
        </div>
    );
};

export default Slash;
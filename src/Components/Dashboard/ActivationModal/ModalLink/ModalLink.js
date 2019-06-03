import React from 'react';
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";

const ModalLink = (props) => {

    return (

        <React.Fragment>

            <button onClick={props.click} className={'btn-custom-blue auth-btn round px-md-2'}>
                {props.loading?<ButtonLoader/>:<span>Resend another email</span>}
            </button>

        </React.Fragment>
    )


};

export default ModalLink;
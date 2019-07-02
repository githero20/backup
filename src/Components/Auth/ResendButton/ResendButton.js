import React from 'react';
import ButtonLoader from "../Buttonloader/ButtonLoader";
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";


const ResendButton = (props) => {
     return (
         <React.Fragment>
             <button type={'submit'} disabled={props.loading} className="btn btn-round btn-custom-blue auth-btn "
                     name="action">{props.loading?<ButtonLoader/>:
                 <span>{props.message}<img alt="" className="img-2x ml-2" src={signInIcon}/></span>}
             </button>
         </React.Fragment>
     );
};



export default ResendButton;
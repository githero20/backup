import {React} from 'react';
import { withToastManager } from 'react-toast-notifications';

const Toast = ( { content,status, toastManager }) => (
    // { content,status, toastManager }=props;

        <React.Fragment>
            {
                status==='success'?(
                    toastManager.add(content, {
                        appearance: 'success',
                        autoDismiss: true,
                        pauseOnHover: false,
                        autoDismissTimeout: 3000,
                    })
                ):(
                    toastManager.add(content, {
                        appearance: 'error',
                        autoDismiss: true,
                        pauseOnHover: false,
                        autoDismissTimeout: 3000,
                    })
                )


            }
        </React.Fragment>
);


export default  withToastManager(Toast);
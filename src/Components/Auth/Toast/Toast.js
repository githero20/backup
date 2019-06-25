import React from 'react';
import {withToastManager} from 'react-toast-notifications';

const Toast = (props) => {
        const {status, content, toastManager} = props;

        return (
            <React.Fragment>
                    <div style={{opacity: 0.5}} >
                            {
                                    status == 'success' ?
                                        toastManager.add(content, {
                                                appearance: 'success',
                                                autoDismiss: true,
                                                pauseOnHover: false,
                                                autoDismissTimeout: 3000,
                                        })
                                        :
                                        toastManager.add(content, {
                                                appearance: 'error',
                                                autoDismiss: true,
                                                pauseOnHover: false,
                                                autoDismissTimeout: 3000,
                                        })
                            }


                    </div>

            </React.Fragment>
        );

};


export default withToastManager(Toast);
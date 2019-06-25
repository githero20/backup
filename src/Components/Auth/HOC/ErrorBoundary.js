import React, {Component} from 'react';
import {withToastManager} from 'react-toast-notifications';
class ErrorBoundary extends Component {


    componentDidCatch(error, errorInfo) {
        this.toastMessage(errorInfo,'error');
    }

    toastMessage = (message, status) =>{
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    };

    render() {
        return null;
    }
}

export default withToastManager(ErrorBoundary);
import {React} from 'react';
import { withToastManager } from 'react-toast-notifications';

const Toast = ({ content, toastManager }) => (
    <button onClick={() => toastManager.add(content, {
        appearance: 'success',
        autoDismiss: true,
        pauseOnHover: false,
    })}>
        Add Toast
    </button>
);

export const ToastNofication = withToastManager(Toast);
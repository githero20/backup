import React from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import WithdrawalSettingsForm from "./WithdrawalSettingsForm";

class BankModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {

            banks:[]
        };

    }
    render() {
        return (
            <Modal
                {...this.props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'steady-save-modal'}
            >
                <Modal.Header className={' px-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Withdrawal Setting</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        <WithdrawalSettingsForm onHide={this.props.onHide}/>
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

const FormWithToast = withToastManager(BankModal);
export default FormWithToast;
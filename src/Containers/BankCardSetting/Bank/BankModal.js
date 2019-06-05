import React from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider} from "react-toast-notifications";
import BankForm from "./BankForm";

class BankModal extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'steady-save-modal'}
            >
                <Modal.Header className={' px-md-3 py-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Add Bank</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        <BankForm onHide={this.props.onHide}/>
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

export default BankModal;
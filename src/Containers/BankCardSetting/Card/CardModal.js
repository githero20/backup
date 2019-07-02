import React from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import CardForm from "./CardForm";
class CardModal extends React.Component {

    constructor(props){
        super(props);
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
                        <h4>Add Card</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        <CardForm onHide={this.props.onHide} onResolve={this.props.onResolve} />
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

const FormWithToast = withToastManager(CardModal);
export default FormWithToast;
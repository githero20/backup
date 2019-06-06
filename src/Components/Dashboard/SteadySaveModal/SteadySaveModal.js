import React from 'react';
import Modal from "react-bootstrap/Modal";
import SteadySaveForm from "./SteadySaveForm/SteadySaveForm";
import {ToastProvider} from 'react-toast-notifications';
class SteadySaveModal extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'steady-save-modal'}
            >
                <Modal.Header className={' px-md-3 pt-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>Steady Save </h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        <SteadySaveForm steadySave={this.props.steadySave} onHide={this.props.onHide}/>
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SteadySaveModal;
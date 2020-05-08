import React from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider} from 'react-toast-notifications';
import DirectInstantSaveForm from "./DirectInstantSaveForm/DirectInstantSaveForm";

const DirectInstantSaveModal = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'steady-save-modal'}>
            <Modal.Header className={' px-md-3 pt-md-3'} closeButton={props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Direct Instant Save </h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={'pb-md-4 px-md-3'}>
                <ToastProvider>
                    <DirectInstantSaveForm onHide={props.onHide}/>
                </ToastProvider>
            </Modal.Body>
        </Modal>
    );
};

export default DirectInstantSaveModal;

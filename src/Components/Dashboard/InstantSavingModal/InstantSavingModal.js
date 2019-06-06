import React from 'react';
import Modal from "react-bootstrap/Modal";
import InstantSavingForm from "./InstantSavingForm/InstantSavingForm";
import {ToastProvider} from "react-toast-notifications";

class InstantSavingModal extends React.Component {


    constructor(props){
        super(props);

    }



    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'instant-save-modal steady-save-modal'}
            >
                <Modal.Header className={' px-md-3 py-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>New Instant Save Plan</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        <InstantSavingForm updateInstantSave={this.props.updateInstantSave} onHide={this.props.onHide} />
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

export default InstantSavingModal;
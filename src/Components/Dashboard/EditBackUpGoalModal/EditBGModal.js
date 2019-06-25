import React from 'react';
import Modal from "react-bootstrap/Modal";
import EditBGForm from "./BackUpGoalForm/EditBGForm";
import {ToastProvider} from 'react-toast-notifications';


class EditBGModal extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'steady-save-modal'}
            >
                <Modal.Header className={' px-md-3 py-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Edit Backup Goal</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        <EditBGForm selectedBG={this.props.selectedBG} fetchGoals={this.props.fetchGoals} updateSelectedBG={this.props.updateSelectedBG} onHide={this.props.onHide}/>
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

export default EditBGModal;
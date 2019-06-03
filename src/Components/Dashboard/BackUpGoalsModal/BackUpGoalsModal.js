import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import BackUpGoalsForm from "./BackUpGoalForm/BackUpGoalsForm";

class BackUpGoalsModal extends React.Component {
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
                        <h4>Start New Back Up Goal</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <BackUpGoalsForm onHide={this.props.onHide}/>
                </Modal.Body>
            </Modal>
        );
    }
}

export default BackUpGoalsModal;
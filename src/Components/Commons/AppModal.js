import React from 'react';
import {Modal} from "react-bootstrap";
import './loginModal.css';


const AppModal = (props) => {
    const {title, children, func, handleClose, buttonLabel, loading} = props;
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn-secondary btn" onClick={handleClose}>
                    Close
                </button>
                <button className="btn-danger btn" onClick={func}>
                    {loading ? "..." : buttonLabel}
                </button>
            </Modal.Footer>
        </Modal>);
};

export default AppModal;
import React from 'react';
import {Modal} from "react-bootstrap";
import './loginModal.css';

const LoginModal = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/*<Modal.Header closeButton>*/}
            {/*    <Modal.Title id="contained-modal-title-vcenter">*/}
            {/*        Modal heading*/}
            {/*    </Modal.Title>*/}
            {/*</Modal.Header>*/}
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {/*<Modal.Footer>*/}
            {/*    <Button onClick={props.onHide}>Close</Button>*/}
            {/*</Modal.Footer>*/}
        </Modal>);
};

export default LoginModal;
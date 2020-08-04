import React from 'react'
import Modal from "react-bootstrap/Modal";
import { ToastProvider } from "react-toast-notifications";

const CustomModal = (props) => {
  const { onHide, children, title } = props;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={'instant-save-modal steady-save-modal'}
    >
      <Modal.Header className={' px-md-3 py-md-3'} closeButton={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>{title}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={'pb-md-4 px-md-3'}>
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default CustomModal

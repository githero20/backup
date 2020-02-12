import React from 'react';
import {Modal} from "react-bootstrap";
import './loginModal.css';

// function Example() {
//     const [show, setShow] = useState(false);
//
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//
//     return (
//         <>
//             <Button variant="primary" onClick={handleShow}>
//                 Launch demo modal
//             </Button>
//
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Modal heading</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleClose}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }


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
import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";

class PreviewModal extends Component {

    render() {
        return (
            <Modal
                {...this.props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'steady-save-modal'}
            >
                <Modal.Header closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Image Preview</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-2 '}>
                   <div className="imge-previewer">
                       <img src={this.props.image} id='img-previewer' style={{width:'50%',display:'block',margin:'0 auto',height:'auto'}} alt="document"/>
                   </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default PreviewModal;
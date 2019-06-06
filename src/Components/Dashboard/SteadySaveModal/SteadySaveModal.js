import React from 'react';
import Modal from "react-bootstrap/Modal";
import SteadySaveForm from "./SteadySaveForm/SteadySaveForm";
import {ToastProvider} from 'react-toast-notifications';
import EditSteadySave from "../../../Containers/SteadySave/EditSteadySave";

class SteadySaveModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showEditModal: false,
            showMainModal: true,
        };
        this.showEditModal = this.showEditModal.bind(this);
        this.showMainModal = this.showMainModal.bind(this);
    }


    showEditModal(status = false){
        this.setState({showEditModal:status, showMainModal:!status});
    }

    showMainModal(status = true){
        this.setState({showMainModal:status, showEditModal: !status})
    }
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
                        {
                            this.state.showMainModal
                                ? <SteadySaveForm show={this.state.showMainModal} onEdit={this.showEditModal} steadySave={this.props.steadySave} onHide={this.props.onHide}/>
                                :<EditSteadySave show={this.state.showEditModal} onSave={this.showMainModal} steadySave={this.props.steadySave} onHide={this.props.onHide}/>

                        }
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SteadySaveModal;
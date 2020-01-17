import React from 'react';
import Modal from "react-bootstrap/Modal";
import SteadySaveForm from "./SteadySaveForm/SteadySaveForm";
import {ToastProvider} from 'react-toast-notifications';
import EditSteadySave from "../../../Containers/SteadySave/EditSteadySave";
import CreateSteadySaveModal from "../CreateSteadySaveModal/CreateSteadySaveModal";

class SteadySaveModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showEditModal: false,
            showMainModal: true,
            showStart: false,
        };
        this.showEditModal = this.showEditModal.bind(this);
        this.showMainModal = this.showMainModal.bind(this);
        this.showCreateModal = this.showCreateModal.bind(this);
    }


    showEditModal(status = false,start=false){
        if(start){ this.setState({showStart:start})}
        this.setState({showEditModal:status, showMainModal:!status});
    }

    showMainModal(status = true){
        this.setState({showMainModal:status, showEditModal: !status})
    }

    showCreateModal(status=false){
        this.setState({showStart:status,showEditModal:false,showMainModal:false})
    }


    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'steady-save-modal round'}
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
                                ? <SteadySaveForm  show={this.state.showMainModal}
                                                   onStart={this.showCreateModal}
                                                   onEdit={this.showEditModal}
                                                   setupSteadySave={this.props.setupSteadySave}
                                                   steadySave={this.props.steadySave}
                                                   totalSteadySave={this.props.totalSteadySave}
                                                   onHide={this.props.onHide}
                                />
                                :<EditSteadySave
                                    show={this.state.showEditModal}
                                    onSave={this.showMainModal}
                                    setupSteadySave={this.props.setupSteadySave}
                                    steadySave={this.props.steadySave}
                                    onHide={this.props.onHide}
                                    updateSteadySaveForm={this.props.updateSteadySaveForm}
                                />
                        }
                        {
                            this.state.showStart?
                                <CreateSteadySaveModal
                                    show={this.state.showStart}
                                    setupSteadySave={this.props.setupSteadySave}
                                    steadySave={this.props.steadySave}
                                    onHide={this.props.onHide}
                                />: null
                        }
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SteadySaveModal;
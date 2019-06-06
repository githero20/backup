import React from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider} from "react-toast-notifications";
import BankForm from "./BankForm";
import {getListOfBanks} from "../../../actions/BankAction";
import {withToastManager} from 'react-toast-notifications';
class BankModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            banks:[]
        }

    }
    componentDidMount() {
        getListOfBanks((status, payload) =>{
            console.log("res", status, payload);
            if(status){
                this.setState({banks:payload});
            }else {
                // const {toastManager} = this.props;
                // toastManager.add("Unable to fetch list of bank",{
                //     appearance: "error"
                // });
                this.props.onHide(false);
            }
        })
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
                <Modal.Header className={' px-md-3 py-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Add Bank</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    {/*<ToastProvider>*/}
                        <BankForm onHide={this.props.onHide} banks={this.state.banks}/>
                    {/*</ToastProvider>*/}
                </Modal.Body>
            </Modal>
        );
    }
}

const FormWithToast = withToastManager(BankModal);
export default BankModal;
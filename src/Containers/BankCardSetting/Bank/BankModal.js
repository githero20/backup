import React from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import BankForm from "./BankForm";
import {getListOfBanks} from "../../../actions/BankAction";
import BankOtpForm from "./BankOtpForm";

class BankModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            banks:[],
            showOtpModal:false,
            showBankForm:true,
            bankotp_id:null
        };
        this.showOtp = this.showOtp.bind(this);
        this.showForm = this.showForm.bind(this);
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
    showOtp(payload){
        this.setState({showOtpModal:true, bankotp_id: payload, showBankForm: false});
    }

    showForm(){
        this.setState({showOtpModal:false, showBankForm:true});
    }


    render() {
        return (
            <Modal
                {...this.props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'steady-save-modal'}
            >
                <Modal.Header className={' px-md-3 py-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Add Bank</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        {this.state.showBankForm
                            ? <BankForm show={this.showBankForm} onHide={this.props.onHide} banks={this.state.banks} showOtp={this.showOtp} />
                            : <BankOtpForm show={this.showOtpModal} bankotp_id={this.state.bankotp_id} onHide={this.props.onHide}/>
                        }
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

const FormWithToast = withToastManager(BankModal);
export default FormWithToast;
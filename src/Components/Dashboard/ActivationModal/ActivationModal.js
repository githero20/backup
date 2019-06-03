import React from 'react';
import Modal from "react-bootstrap/Modal";
import {withToastManager} from 'react-toast-notifications';
import {request} from "../../../ApiUtils/ApiUtils";
import {resendActEndpoint} from "../../../RouteLinks/RouteLinks";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import ModalLink from "./ModalLink/ModalLink";

class ActivationModal extends React.Component {

    state={
        loading:false,
    };


    handleResendActLink = (state,response) =>{

        const { toastManager } = this.props;
        this.setState({
            loading:false
        });

        console.log(response);
        if(state){

            console.log(response);

            toastManager.add(`${response.data.success}`, {
                appearance: 'success',
            });


        }else{

            if(response){
                console.log(response);
                toastManager.add(`${response.data.error}`, {
                    appearance: 'error',
                });
            }

        }

    };


    resendActivationLink = () => {

        const param = {email:this.props.email};
        console.log('got here',param);

        this.setState({
            loading:true,
        })
        request(resendActEndpoint,param,false,'POST',this.handleResendActLink)

    };


    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'steady-save-modal'}
            >
                <Modal.Header className={'text-center'}>
                    <Modal.Title id="contained-modal-title-vcenter" className={'mx-auto pt-md-2'}>
                        <h4 className={'text-center'}>Activate Account</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3 text-center'}>
                    {/* form */}

                    {/* icon*/}
                    <h2>We've sent you an activation email </h2>
                    <p className={'text-muted'}>If you did not receive the email,</p>
                    <ModalLink click={this.resendActivationLink} loading={this.state.loading} />
                </Modal.Body>
            </Modal>
        );
    }
}

const modalWithToast = withToastManager(ActivationModal);

export default modalWithToast;
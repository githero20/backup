import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/svg/backupCashlogo.svg";
import ForgotPasswordForm from "../../Components/Auth/ForgotPasswordForm/ForgotPasswordForm";
import { ToastProvider } from 'react-toast-notifications';
import ButtonLoader from "../../Components/Auth/Buttonloader/ButtonLoader";
import signInIcon from "../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import {request} from "../../ApiUtils/ApiUtils";
import {resendActEndpoint} from "../../RouteLinks/RouteLinks";

class ResendActivation extends Component {

    state={
        loading:false,
    }

    resendActivationLink = () => {

        const param = {email:this.state.email};
        request(resendActEndpoint,param,false,true,this.handleResendActLink)

    };


    handleResendActLink = (state,response) =>{

        const { toastManager } = this.props;

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



    render() {

        return (
            <React.Fragment>
                    <section className="login-background login-section">
                        <h3 className="welcome-text d-none d-md-block">Welcome <br/>Back</h3>
                        <div className="container">
                            <div className="row  pt-md-2">
                                <div className=" col-md-6 offset-md-6">
                                    {/*   header component */}
                                    <div className=" py-md-1 px-md-1 px-md-5 py-md-5 header-shadow mt-2 mb-md-5 bg-white">
                                        <img alt="" src={backUpCashLogo} width="200px"/>
                                    </div>
                                    <h3 className="mobile-welcome-text d-block d-md-none">Welcome <br/>Back</h3>
                                    <ToastProvider>
                                        <div className="login-form">
                                            <div className="row text-center">
                                                <div className="col-12">
                                                    {/*provide breadcrumb to go back*/}
                                                    <h5 className="form-header-purple mb-3">Your Account Has Not Been Activated</h5>
                                                    <p>Check your mail for activation link or </p>
                                                </div>

                                                <div className="col-12">
                                                    <div >
                                                        <button type={'button'} onClick={this.resendActivationLink} className="btn btn-round blue-round-btn auth-btn "
                                                                name="action">{this.state.loading?<ButtonLoader/>:
                                                            <span>Click to Resend</span>}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ToastProvider>

                                </div>
                            </div>
                        </div>
                    </section>
            </React.Fragment>
        );

    }

}
export default ResendActivation;
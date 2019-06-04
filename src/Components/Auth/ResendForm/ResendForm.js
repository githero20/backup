import React, {Component} from 'react';
import backUpCashLogo from "../../../admin/app-assets/images/svg/backupCashlogo.svg";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import ResendButton from "../ResendButton/ResendButton";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {getLocalStorage, request} from "../../../ApiUtils/ApiUtils";
import {ACTIVATONEMAIL} from "../HOC/authcontroller";
import {LoginLink, resendActEndpoint} from "../../../RouteLinks/RouteLinks";
import {Redirect} from "react-router";

class ResendForm extends Component {

    state = {
        loading: false,
        redirectLogin: false
    };

    resendActivationLink = () => {

        //

        if (getLocalStorage(ACTIVATONEMAIL)) {

            const email = getLocalStorage(ACTIVATONEMAIL);
            {

                const param = {email: email};

                request(resendActEndpoint, param, false, 'POST', this.handleResendActLink)

            }

        }

    };


    handleResendActLink = (state, response) => {

        const {toastManager} = this.props;

        if (state) {

            console.log(response);
            toastManager.add(`${response.data.message}`, {
                appearance: 'success',
            });
            setTimeout(()=>{ this.setState({
                redirectLogin: true
            })},3000);


        } else {

            if (response) {
                console.log(response.data);
                toastManager.add(`${response.data.error}`, {
                    appearance: 'error',
                });
            }

        }

    };

    render() {
        if (this.state.redirectLogin) {
            return (
                <React.Fragment>
                    <Redirect to={LoginLink}/>
                </React.Fragment>
            )


        }
        return (
            <React.Fragment>
                <h3 className="welcome-text d-none d-md-block">Welcome <br/>Back</h3>
                <div className="container">
                    <div className="row  pt-md-2">
                        <div className=" col-md-6 offset-md-6">
                            {/*   header component */}
                            <div
                                className=" py-md-1 px-md-1 px-md-5 py-md-5 header-shadow mt-2 mb-md-5 bg-white">
                                <img alt="" src={backUpCashLogo} width="200px"/>
                            </div>
                            <h3 className="mobile-welcome-text d-block d-md-none">Welcome <br/>Back</h3>
                            <div className="login-form">
                                <div className="row text-center">
                                    <div className="col-12">
                                        {/*provide breadcrumb to go back*/}
                                        <h5 className="form-header-purple mb-3">Your Account Has Not Been
                                            Activated</h5>
                                        <p>Check your mail for activation link or </p>
                                    </div>

                                    <div className="col-12">
                                        <div>
                                            <button type={'button'} onClick={this.resendActivationLink}
                                                    className="btn btn-round blue-round-btn auth-btn "
                                                    name="action">{this.state.loading ? <ButtonLoader/> :
                                                <span>Click to Resend</span>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


const ResendWithToast = withToastManager(ResendForm);


export default ResendWithToast;
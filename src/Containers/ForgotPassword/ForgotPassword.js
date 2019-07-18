import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/Logo@2x.png";
import ForgotPasswordForm from "../../Components/Auth/ForgotPasswordForm/ForgotPasswordForm";
import {ToastProvider} from 'react-toast-notifications';
import {Link} from 'react-router-dom';
import {HomeLink} from "../../RouteLinks/RouteLinks";
import PhonePassResetForm from "../../Components/Auth/PhonePassResetForm/PhonePassResetForm";

class ForgotPassword extends Component {

    state = {
        PhoneResetForm: false,
        phone:'',
    };


    showPhoneResetForm = () => {
        this.setState({
            PhoneResetForm: true
        });
    };

    hidePhoneResetForm = () => {
        this.setState({
            PhoneResetForm: false
        });
    };

    setPhone = (phone)=>{
        this.setState({
            phone
        })
    };

    render() {
        return (
            <React.Fragment>
                <section className="login-background login-section">
                    <h3 className="welcome-text d-none d-md-block">Welcome <br/>Back</h3>
                    <div className="container">
                        <div className="row  pt-md-2">
                            <div className=" col-md-5 offset-md-6">
                                {/*   header component */}
                                <div className=" py-md-1 px-md-1  header-shadow mt-2 mb-md-5 bg-white">
                                    <Link to={HomeLink}><img alt="" src={backUpCashLogo} width="200px"/></Link>
                                </div>
                                <h3 className="mobile-welcome-text d-block d-md-none">Welcome <br/>Back</h3>
                                <ToastProvider>
                                    {
                                        this.state.PhoneResetForm ?
                                        <PhonePassResetForm phone={this.state.phone} />
                                        : <ForgotPasswordForm setPhone={this.setPhone} showPhoneResetForm={this.showPhoneResetForm} hidePhoneResetForm={this.hidePhoneResetForm}/>
                                    }
                                </ToastProvider>

                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );

    }

}

export default ForgotPassword;
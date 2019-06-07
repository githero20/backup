import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/Logo.png";
import LoginForm from "../../Components/Auth/LoginForm/LoginForm";
import secureIcon from "../../admin/app-assets/images/svg/secure-sign-icon.svg";
import {ToastProvider} from 'react-toast-notifications';
import {HomeLink} from "../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';
class Login extends Component {


    render() {
        return (
            <React.Fragment>
                    <section className="login-background login-section">
                        <h3 className="welcome-text d-none d-md-block">Welcome <br/>Back</h3>

                        <div className="secure-section">
                            <img src={secureIcon} /> &nbsp;
                            <span>Your Sign Up is Secure</span>
                        </div>
                        <div className="container">
                            <div className="row  pt-md-2">
                                <div className=" col-md-6 offset-md-6">
                                    {/*   header component */}
                                    <div className=" py-md-1 px-md-1 px-md-5 py-md-5 header-shadow mt-2 mb-md-5 bg-white">
                                        <Link to={HomeLink}><img alt="" src={backUpCashLogo} width="200px"/></Link>
                                    </div>
                                    <h3 className="mobile-welcome-text d-block d-md-none">Welcome <br/>Back</h3>
                                    <ToastProvider>
                                        <LoginForm />
                                    </ToastProvider>

                                </div>
                            </div>
                        </div>
                    </section>
            </React.Fragment>
        );
    }
}
export default Login;
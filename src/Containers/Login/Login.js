import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/Logo@2x.png";
import LoginForm from "../../Components/Auth/LoginForm/LoginForm";
import secureIcon from "../../admin/app-assets/images/svg/secure-sign-icon.svg";
import {HomeLink} from "../../RouteLinks/RouteLinks";
import {ToastProvider} from 'react-toast-notifications';
import {Link} from 'react-router-dom';
import {hideLoader, showHomeLoader} from "../../Helpers/Helper";
class Login extends Component {



    componentDidMount() {
        hideLoader();
    }

    render() {
        return (
            <React.Fragment>
                    <section className="login-background login-section">
                        <h3 className="welcome-text d-none d-lg-block">Welcome <br/>Back</h3>

                        <div className="secure-section">
                            <img src={secureIcon} /> &nbsp;
                            <span>Your Sign Up is Secure</span>
                        </div>
                        <div className="container">
                            <div className="row  pt-1">
                                <div className=" col-lg-5 offset-lg-6">
                                    {/*   header component */}
                                    <div className="px-md-2 py-md-2 header-shadow mb-md-5 bg-white">
                                        <Link to={HomeLink}>
                                            <img alt="" src={backUpCashLogo} width="150px"/>
                                        </Link>
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
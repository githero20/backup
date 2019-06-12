import React, {Component} from 'react';
import secureIcon from "../../admin/app-assets/images/svg/secure-sign-icon.svg";
import backUpCashLogo from "../../admin/app-assets/images/Logo.png";
import SignUpForm from "../../Components/Auth/SignUpForm/SignUpForm";
import SimpleReactValidator from "simple-react-validator";
import {ToastProvider} from "react-toast-notifications";
import {Link} from "react-router-dom";
import {HomeLink} from "../../RouteLinks/RouteLinks";


class SignUp extends Component {

    // //validator
    // constructor(props) {
    //     super(props);
    //
    //     this.validator = new SimpleReactValidator();
    //
    //     this.state = {
    //         submitted:false,
    //     }
    // }

    //Send date to the second stage to activation container

    render() {
        return (
            <React.Fragment>
                        <section className="sign-up-background login-section">
                            <h3 className="welcome-text d-none d-md-block">Welcome, <br/>Start Saving Now!</h3>
                                <div id="timeline-wrap">
                                    <div id="timeline"></div>

                                    {/*This is the individual marker*/}
                                    <div className="marker mfirst timeline-icon  text-center">
                                        <div className="circular-icon active">1</div>
                                        <label>Create <br/> Account</label>
                                    </div>
                                     {/*/ marker*/}
                                        {/*This is the individual marker*/}
                                    <div className="marker mlast timeline-icon  text-center">
                                        <div className="circular-icon">2</div>
                                        <label>Activate Account</label>
                                    </div>
                                     {/*marker */}
                                </div>

                                <div className="secure-section">
                                    <img src={secureIcon} /> &nbsp;
                                    <span>Your Sign Up is Secure</span>
                                </div>

                                <div className="container px-2 px-md-0">
                                    <div className="row pt-md-2">
                                        <div className="col-md-6 offset-md-6">
                                            {/*header component */}
                                            <div className=" py-md-1 px-md-1 px-md-5 py-md-5 header-shadow mt-2 mb-md-5 bg-white">
                                                <Link to={HomeLink}><img alt="back up cash logo" src={backUpCashLogo} width="200px"/></Link>
                                            </div>
                                            <h3 className="mobile-welcome-text d-block d-md-none">Welcome <br/>Back</h3>
                                            <ToastProvider>
                                                <SignUpForm />
                                            </ToastProvider>
                                        </div>
                                    </div>
                                </div>


                        </section>
            </React.Fragment>
        );
    }
}
export default SignUp;
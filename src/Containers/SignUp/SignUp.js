import React, {Component} from 'react';
import secureIcon from "../../admin/app-assets/images/svg/secure-sign-icon.svg";
import backUpCashLogo from "../../admin/app-assets/images/svg/backupCashlogo.svg";
import SignUpForm from "../../Components/Auth/SignUpForm/SignUpForm";
import SimpleReactValidator from "simple-react-validator";


class SignUp extends Component {

    //validator
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            submitted:false,
        }
    }



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

                                <div className="row pt-md-2">
                                        <div className="col-md-5 offset-md-6">
                                                 {/*header component */}
                                                <div className="px-3 py-3 px-md-5 py-md-5 header-shadow mt-2 mb-5 bg-white">
                                                    <img src={backUpCashLogo} width="200px"/>
                                                </div>

                                               <SignUpForm  />
                                        </div>
                                </div>
                        </section>
            </React.Fragment>
        );
    }
}
export default SignUp;
import React, {Component} from 'react';
import secureIcon from "../../admin/app-assets/images/svg/secure-sign-icon.svg";
import backUpCashLogo from "../../admin/app-assets/images/svg/backupCashlogo.svg";
import ActivationForm from "../../Components/Auth/ActivationForm/ActivationForm";
import EmailModal from "../../Components/Auth/EmailModal/EmailModal";


class ActivateAccount extends Component {


    render(){
        return (
            <React.Fragment>
                {/*// <!-- login section-->*/}
                <section className="sign-up-background login-section">
                    <h3 className="welcome-text d-none d-md-block">Welcome, <br/>Start Saving Now!</h3>
                    <div id="timeline-wrap">
                        <div id="timeline">
                        </div>

                        {/*// <!-- This is the individual marker-->*/}
                        <div className="marker mfirst timeline-icon  text-center">
                            <div className="circular-icon ">1</div>
                            <label>Create <br/> Account</label>
                        </div>
                        {/*// <!-- / marker -->*/}

                        {/*// <!-- This is the individual marker-->*/}
                        <div className="marker mlast timeline-icon  text-center">
                            <div className="circular-icon active">2</div>
                            <label>Activate Account</label>
                        </div>
                        {/*// <!-- / marker -->*/}
                    </div>

                    <div className="secure-section"><img src={secureIcon} alt="secure sign up"/>
                        &nbsp;<span>Your Sign Up is Secure</span></div>
                    <div className="row pt-md-2">
                        <div className="col-md-5 offset-md-6">
                            {/*// <!--  header component          -->*/}
                            <div className="px-3 py-3 px-md-5 py-md-5 header-shadow mt-2 mb-5 bg-white">
                                <img src={backUpCashLogo} width="200px"/>
                            </div>
                                <ActivationForm />
                        </div>
                    </div>
                </section>

                <EmailModal/>

            </React.Fragment>
        );
    }



}
export default ActivateAccount;
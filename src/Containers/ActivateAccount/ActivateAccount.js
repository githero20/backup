import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import secureIcon from '../../admin/app-assets/images/svg/secure-sign-icon.svg';
import backUpCashLogo from '../../admin/app-assets/images/svg/backupCashlogo.svg';
import blueHeadArrow from '../../admin/app-assets/images/svg/blue-head-arrow.svg';
import btnArrowRight from '../../admin/app-assets/images/svg/btn-arrow-right-icon.svg';
import inboxImage from '../../admin/app-assets/images/svg/airflight-icon.svg';


class ActivateAccount extends Component {
    render(){
        return (
            <React.Fragment>

                {/*// <!-- login section-->*/}
                <section className="sign-up-background login-section">
                    <h3 className="welcome-text d-none d-md-block">Welcome, <br/>Start Saving Now!</h3>
                    <div id="timeline-wrap">
                        <div id="timeline"></div>

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

                            <form className="login-form px-5 px-md-2">
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="form-header-purple mb-md-3">Please Activate your Account</h5>
                                        <p className="gray-text mb-5 mb-md-5">Activate your Backup Cash account with a minimum<br/>
                                            deposit of <strong>&#8358;1000</strong> to start saving now</p>
                                    </div>
                                    <div className="col-12 col-lg-12">
                                        <div className="input-field mb-lg-5">
                                            <input id="firstName" type="text" classNameName="validate"/>
                                                <label for="firstName" className="active">Enter your 10-digit Account Number </label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-12">
                                        <div className="input-field">
                                            <select>
                                                <option value="" disabled defaultValue={true}></option>
                                                <option value="1">Bank 1</option>
                                                <option value="2">Bank @</option>
                                                <option value="3">Option 3</option>
                                            </select>
                                            <label>Select your bank</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="input-field mb-lg-5">
                                            <input id="LastName" type="text" className="validate"/>
                                                <label for="LastName" className="active">Enter Amount</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="input-field mb-lg-3">
                                            <input id="email" type="email" className="validate"/>
                                                <label for="email" className="active">Backup Cash Account >></label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                                        <div className="referal-code-section">
                                            <a className="blue-link" id="referral-btn">Got a referral code ?
                                                <img className="img-2x ml-1" src={blueHeadArrow}/>
                                            </a>
                                            <div className="input-field" id="referal-input-container">
                                                <input id="referral-code" type="text" className="validate"/>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6 text-center text-md-right mb-3 mb-md-0">
                                        <div className="text-md-right mb-2 pr-md-4">
                                            <label className="font-size-1-1 mb-3">Returning User ? <Link className="blue-link " to={'/login'}>Sign
                                                In</Link> </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-center text-md-right offset-md-6">
                                        <div className="text-md-right">
                                            <button className="btn btn-round blue-round-btn " type="button" data-toggle="modal"
                                                    data-target="#large" name="action">Activate
                                                <img className="img-2x ml-2" src={btnArrowRight}/>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <div className="modal sign-up-modal email-content-message fade text-left curved-radius" id="large" tabindex="-1"
                     role="dialog" aria-labelledby="myModalLabel17">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div>
                        <div className=" text-center pt-5">
                            <h2 className="form-header-purple circular-std mb-2 mt-5">Just one more step</h2>
                            <p className="gray-text mt-3">SFS Backup Cash account created successfully,</p>
                            <p className="mb-5 gray-text">Kindly check your mail inbox for verification</p>
                            <div className="text-center">
                                <a href="index.html" className="btn btn-round blue-round-btn">Open Inbox
                                    <img className="img-2x ml-2" src={inboxImage}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
export default ActivateAccount;
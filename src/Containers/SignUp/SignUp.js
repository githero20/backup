import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import secureIcon from '../../admin/app-assets/images/svg/secure-sign-icon.svg';
import backUpCashLogo from '../../admin/app-assets/images/svg/backupCashlogo.svg';
import blueHeadArrow from '../../admin/app-assets/images/svg/blue-head-arrow.svg';
import btnArrowRight from '../../admin/app-assets/images/svg/btn-arrow-right-icon.svg';


class SignUp extends Component {
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
                                    <img src={secureIcon} alt="secure sign up"/> &nbsp;
                                    <span>Your Sign Up is Secure</span>
                                </div>

                                <div className="row pt-md-2">
                                        <div className="col-md-5 offset-md-6">
                                                 {/*header component */}
                                                <div className="px-3 py-3 px-md-5 py-md-5 header-shadow mt-2 mb-5 bg-white">
                                                    <img src={backUpCashLogo} width="200px"/>
                                                </div>

                                                <form className="login-form px-5 px-md-2">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h5 className="form-header-purple mb-5">Create Free Account</h5>
                                                    </div>
                                                    <div className="col-12 col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="firstName" >First Name</label>
                                                            <input id="firstName" type="text" className={'form-control'} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="LastName">Last Name</label>
                                                            <input id="LastName" type="text" className="form-control"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 ">
                                                        <div className="form-group">
                                                            <label htmlFor="email" >Email</label>
                                                            <input id="email" type="email" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 ">
                                                        <div className="form-group">
                                                            <label htmlFor="phone" >Mobile Phone</label>
                                                            <input id="phone" type="text" className={'form-control'}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 ">
                                                        <div className="form-group">
                                                            <label htmlFor="password" >Password</label>
                                                            <input id="password" type="password" className={'form-control'}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                                                        <div className="referal-code-section">
                                                            <a className="blue-link" id="referral-btn">Got a referral code ? <img
                                                                className="img-2x ml-1"
                                                                src={blueHeadArrow}/></a>
                                                            <div className="input-field" id="referal-input-container">
                                                                <input id="referral-code" type="text" className="validate"/>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6 text-center text-md-right mb-3 mb-md-0">
                                                        <div className="text-md-right mb-2 pr-md-4">
                                                            <label className="font-size-1-1 mb-3">Returning User ?
                                                                <Link to={'/login'} className="blue-link ">Sign In</Link>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 text-center text-md-right offset-md-6">
                                                        <div className="text-md-right">
                                                            <Link to={'/activate-account'}  className="btn btn-round blue-round-btn ">Sign
                                                                up
                                                                <img className="img-2x ml-2"
                                                                     src={btnArrowRight}/>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                </div>
                        </section>
            </React.Fragment>
        );
    }
}
export default SignUp;
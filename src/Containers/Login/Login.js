import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import signInIcon from "../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import backUpCashLogo from "../../admin/app-assets/images/svg/backupCashlogo.svg";

class Login extends Component {
    render() {
        return (
            <React.Fragment>
                    <section className="login-background login-section">
                        <h3 className="welcome-text d-none d-md-block">Welcome <br/>Back</h3>
                        <div className="row  pt-md-2">
                            <div className=" col-md-5 offset-md-6">
                                  {/*   header component */}
                                <div className="px-3 py-3 px-md-5 py-md-5 header-shadow mt-2 mb-5 bg-white">
                                    <img alt="" src={backUpCashLogo} width="200px"/>
                                </div>

                                <form className="login-form px-2">
                                    <div className="row">
                                        <div className="col-12">
                                            <h5 className="form-header-purple mb-5">Please Log In</h5>
                                        </div>
                                        <div className="col-12">
                                            <div className="input-field">
                                                <input id="email" type="text" className="validate"/>
                                                    <label htmlFor="email" className="">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="input-field ">
                                                <input id="password" type="text" className="validate"/>
                                                    <label htmlFor="password" className="">Password</label>
                                                    <a href="#">Forgot Password ?</a>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="text-center text-md-right pr-sm-0   mb-2 pr-md-5">
                                                <label className="font-size-1-1 mb-3">New User ? <Link to={'/sign-up'}
                                                    className="blue-link ">Sign Up</Link> </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div
                                                className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                                <label className="mb-4 mb-md-0">
                                                    <input type="checkbox" className="filled-in login-check-box"
                                                           defaultChecked={true}/>
                                                        <span>Always Stay signed In</span>
                                                </label>
                                                <Link to={'/dashboard'} className="btn btn-round blue-round-btn "
                                                   name="action">Sign in
                                                    <img alt="" className="img-2x ml-2" src={signInIcon}/>
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
export default Login;
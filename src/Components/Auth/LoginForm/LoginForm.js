import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {
    addWithdrawalLink,
    DashboardLink,
    ForgotPasswordLink,
    LoginEndpoint,
    ResendActivationLink
} from "../../../RouteLinks/RouteLinks";
import {api} from "../../../ApiUtils/ApiUtils";
import {USERINFO, USERTOKEN} from "../HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {ADMIN, ADMIN_LOGIN_URL, CUSTOMER, EmailPhoneValidator} from "../../../Helpers/Helper";


class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        source: 'web',
        redirect: false,
        error: false,
        errorMessage: '',
        loading: false,
        resendActErr: false,
        AddPin: false,
        activateAcc: false,
        token: null,
    };

    constructor(props) {
        super(props);
        this.validator = EmailPhoneValidator;
        this.processLogin = this.processLogin.bind(this);
        this.toastMessage = this.toastMessage.bind(this);
    }

    //Retrieves user inputs
    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };


    //TODO login should handle is user sign's up but hasn't activated yet

    //TODO on login user should be redirected to the email verification


    toastMessage(message, status) {
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    }

    handleRole = (status, res) => {
        if (status) {

            //get user role


            // if the role is a customer process to dashboard


            // else redirect user to admin login page

            if (res == 'admin') {


            } else if (res == 'customer') {


            }

        }
    };


    processLogin(state, response) {
        if (state) {

            if (response != undefined) {
                // handle admin login
                switch (response.data.role) {
                    case ADMIN:
                        window.location.replace(ADMIN_LOGIN_URL);
                        break;
                    case CUSTOMER:
                        if (response.data.bank_withdrawal_pin == true) {
                            localStorage.setItem(USERTOKEN, JSON.stringify(response.data.token));
                            localStorage.setItem(USERINFO, JSON.stringify(response.data.user));
                            setTimeout(() => {
                                this.setState({
                                    redirect: true,
                                    loading: false
                                });
                            }, 3000);
                        } else {
                            // get user info and redirect to add withdrawal page
                            this.setState({
                                token: response.data.token,
                                AddPin: true,
                            });
                        }
                        break;

                    default:
                        break;
                }

                //Old Login Process

                //
                // if (response.data.role == ADMIN) {
                //     //admin
                //     window.location.replace(ADMIN_LOGIN_URL);
                //
                // } else if (response.data.role == CUSTOMER && response.data.bank_withdrawal_pin === true) {
                //     // completely active user
                //     localStorage.setItem(USERTOKEN, JSON.stringify(response.data.token));
                //     localStorage.setItem(USERINFO, JSON.stringify(response.data.user));
                //     setTimeout(() => {
                //         this.setState({
                //             redirect: true,
                //             loading: false
                //         });
                //     }, 3000);
                //
                // }
                //


                // getUserRole(this.handleRole);
                // getUserRole(response.data.token,this.handleRole);
                //
                // localStorage.setItem(USERTOKEN, JSON.stringify(response.data.token));
                // localStorage.setItem(USERINFO, JSON.stringify(response.data.user));
                // setTimeout(() => {
                //     this.setState({
                //         redirect: true,
                //         loading: false
                //     });
                // }, 3000);
            }

            // //Temporary get user details
            // getUserData((status, payload) => {
            //     console.log("status", status,payload);
            //     if(status){
            //        // const setComplete =  setLocalStorage(USERINFO,payload);
            //        //  let done = false ;
            //         console.log("after",this);
            //         setupUser(USERINFO,payload);
            //         setTimeout(()=>{
            //             this.setState({
            //                 redirect: true,
            //                 loading: false
            //             });
            //         },2000);
            //
            //
            //         // if(done){
            //         //     this.setState({
            //         //         redirect: true,
            //         //         loading: false
            //         //     });
            //         // }
            //
            //     }
            // });
        } else {

            this.setState({loading: false});

            if (response) {
                console.log('login error', response);
                if (response.status == 401) {
                    if (response.data.message == "invalid_credentials") {
                        this.toastMessage(`Invalid Credentials`, 'error');
                    } else if (response.data.message == 'Incorrect email or password,Try again') {
                        this.toastMessage('Incorrect Email or Password', 'error');
                    } else if (response.data.message == 'Account has not been activated, click on resend') {
                        // send toast message
                        this.toastMessage('Account has not been activated', 'error');

                        setTimeout(() => {
                            this.setState({
                                activateAcc: true
                            })
                        }, 3000);
                        // redirect user to the activation page
                    } else {
                        this.toastMessage(`${JSON.stringify(response.data.message)}`, 'error');
                    }
                } else {
                    this.toastMessage(`${JSON.stringify(response.data.message)}`, 'error');
                }
            }
        }
    };


    Login = (url, param, login) => {
        this.setState({
            loading: true
        });
        api(url, param, false, true, login);
    };

    //submit ResetPassword form
    submitForm = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.Login(LoginEndpoint, this.state, this.processLogin);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    //hides error display
    hideError = () => {
        this.setState({
            error: false
        });
    };

    componentDidMount() {
        localStorage.removeItem(USERTOKEN);
        localStorage.removeItem(USERINFO);
    }

    validate = () => {
        if (this.validator.allValid()) {
            const PasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
            //validate confirm password
            const {password} = this.state;
            // perform all neccassary validations
            if (!PasswordRegex.exec(password)) {
                this.setState({
                    RenderPasswordError: true,
                })
            } else {
                return true;
            }
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }

    };


    render() {

        const {email, password} = this.state;

        if (this.state.redirect) {
            return (
                <React.Fragment>
                    <Redirect to={DashboardLink} push/>
                </React.Fragment>
            );
        }

        if (this.state.AddPin) {
            return (
                <React.Fragment>
                    <Redirect to={{
                        pathname: addWithdrawalLink,
                        state: {token: this.state.token}
                    }} push
                    />
                </React.Fragment>
            );
        }

        if (this.state.activateAcc) {
            return (
                <React.Fragment>
                    <Redirect to={{
                        pathname: `${ResendActivationLink}`,
                        state: {email: email}
                    }} push/>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>

                <form className="login-form" onSubmit={this.submitForm}>
                    <div className="row">
                        <div className="col-12">
                            <h5 className="form-header-purple mb-2">Log In</h5>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="email">Email or Phone Number</label>
                                <input id="email" name={'email'} onChange={this.changeHandler} type="text"
                                       className="form-control"/>
                                {this.validator.message('email or phone', email, 'required|emailPhone')}

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="password" className="">Password</label>
                                    <Link className='dark-link' to={ForgotPasswordLink}>Forgot Password ?</Link>
                                </div>
                                <input id="password" name={'password'} type="password" onChange={this.changeHandler}
                                       className="form-control"/>

                            </div>
                        </div>
                        <div className="col-12">
                            <div className=" text-right pr-sm-0  mt-md-1 mb-1 pr-1 pr-md-1">
                                <label className="font-size-1-1 mb-md-1 dark-link">New User ?
                                    &nbsp;<Link to={'/sign-up'} className="blue-link ">Sign Up</Link>
                                </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div
                                className="d-flex  flex-column flex-md-row justify-content-end align-items-center">

                                <button type={'submit'} disabled={this.state.loading}
                                        className="btn btn-round blue-round-btn auth-btn order-md-12"
                                        name="action">{this.state.loading ? <ButtonLoader/> :
                                    <span>Sign in<img alt="" className="img-2x ml-1" src={signInIcon}/></span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}


export default withToastManager(LoginForm);
import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {
    addWithdrawalLink,
    botCreatePasswordLink,
    DashboardLink,
    ForgotPasswordLink,
    LoginEndpoint,
    ResendActivationLink, sbDashboardLink, scoreboardLink
} from "../../../RouteLinks/RouteLinks";
import {api} from "../../../ApiUtils/ApiUtils";
import {SESSION_INTERVAL, USERINFO, USERTOKEN} from "../HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {ADMIN, ADMIN_LOGIN_URL, currentLocation, CUSTOMER, redirectTo} from "../../../Helpers/Helper";
import moment from 'moment';
import SimpleReactValidator from "simple-react-validator";
import {Form} from "react-bootstrap";
import Button from "../../Commons/Button";


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
        this.validator = new SimpleReactValidator();
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

    toastMessage(message, status) {
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    }


    processLogin(state, response) {
        if (state) {
            if (response != undefined) {
                //set session time
                const timeStamp = moment().format('MM-DD-YYYY HH:mm:ss');
                // handle admin login
                switch (response.data.role) {
                    case ADMIN:
                        window.location.replace(ADMIN_LOGIN_URL);
                        break;
                    case CUSTOMER:
                        if (response.data.bank_withdrawal_pin == true) {
                            localStorage.setItem(USERTOKEN, JSON.stringify(response.data.token));
                            localStorage.setItem(SESSION_INTERVAL, JSON.stringify(timeStamp));
                            localStorage.setItem(USERINFO, JSON.stringify(response.data.user));

                            if(currentLocation === scoreboardLink){
                                redirectTo(sbDashboardLink);
                            }else {
                                setTimeout(() => {
                                    this.setState({
                                        redirect: true,
                                        loading: false
                                    });
                                }, 3000);
                            }

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
            }

        } else {
            this.setState({loading: false});
            if (response) {
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
                }
            }
        }
    };


    Login = (url, param, login) => {
        this.setState({loading: true});
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
        this.setState({error: false});
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
                this.setState({RenderPasswordError: true})
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

        const {email, password, loading} = this.state;
        const {reviewForm} = this.props;

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

                {reviewForm ?
                    <Form className={'py-3 px-lg-3 px-2'}>
                        <p className='font-weight-bold circular-std-Black text-gray'>Welcome</p>
                        <h3 className='font-weight-bold mb-lg-5 fs-lg-2 text-faded-blue circular-std-Black '>Log In</h3>
                        <Form.Group >
                            <Form.Label>Email address or Phone Number</Form.Label>
                            <Form.Control type="text" id="email" name={'email'} onChange={this.changeHandler}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="password" name={'password'} onChange={this.changeHandler}/>
                        </Form.Group>
                        <Button text={'Log In'} loading={loading} onClick={(e) => this.submitForm(e)}/>
                    </Form> :
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
                                    {/*{this.validator.message('email or phone', email, 'required|emailPhone')}*/}

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
                                <div
                                    className="d-flex flex-column flex-md-row justify-content-end justify-content-md-between pr-sm-0  mt-md-1 mb-1 pr-1 pr-md-1">
                                    <div className='my-1 my-md-0 d-none d-md-flex'>
                                        <label className="font-size-1-1 mb-md-1 dark-link">Bot User ?
                                            &nbsp;<Link to={botCreatePasswordLink} className="blue-link ">Create
                                                Password</Link>
                                        </label>
                                        {/*No Password Yet (Bot User)?  Create */}
                                    </div>
                                    <div className='text-right text-md-left my-1 my-md-0'>
                                        <label className="font-size-1-1 mb-md-1 dark-link">New User ?
                                            &nbsp;<Link to={'/sign-up'} className="blue-link ">Sign Up</Link>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="d-flex  flex-column flex-md-row justify-content-end align-items-center">
                                    <button type={'submit'} disabled={this.state.loading}
                                            className="btn btn-round blue-round-btn auth-btn order-md-12"
                                            name="action">{this.state.loading ? <ButtonLoader/> :
                                        <span>Sign in<img alt="" className="img-2x ml-1" src={signInIcon}/></span>}
                                    </button>
                                </div>
                                <div className='my-3 d-md-none text-center'>
                                    <label className="font-size-1-1 mb-md-1 dark-link">Bot User ?
                                        &nbsp;<Link to={botCreatePasswordLink} className="blue-link ">Create
                                            Password</Link>
                                    </label>
                                    {/*No Password Yet (Bot User)?  Create */}
                                </div>
                            </div>
                        </div>
                    </form>
                }

            </React.Fragment>
        );
    }
}


export default withToastManager(LoginForm);
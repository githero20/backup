import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from "simple-react-validator";
import Alert from "../../Alert/Alert";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {DashboardLink, ForgotPasswordLink, LoginEndpoint, ResendActivationLink} from "../../../RouteLinks/RouteLinks";
import {api, setLocalStorage} from "../../../ApiUtils/ApiUtils";
import {USERINFO, USERTOKEN} from "../HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {getUserData} from "../../../actions/UserAction";
import {_setUser} from "../../../utils";
import {setupUser} from "../../../Helpers/Helper";

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        redirect: false,
        error: false,
        errorMessage: '',
        loading: false,
        resendActErr: false
    };

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.processLogin = this.processLogin.bind(this);
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




    processLogin(state, response) {



        const {toastManager} = this.props;

        if (state) {
            console.log(response);
            if(response){
                localStorage.setItem(USERTOKEN, response.data.token);
                localStorage.setItem(USERINFO, response.data.user);

                setTimeout(()=>{
                    this.setState({
                        redirect: true,
                        loading: false
                    });
                },3000);
                console.log("before",this);
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
                 if(response.status===401){
                     toastManager.add(`Your Account has not been activated Kindly Check your email for an activation link`, {
                         appearance: 'error',
                         autoDismiss: true,
                         autoDismissTimeout:3000
                     });

                 }else{
                     toastManager.add(`${JSON.stringify(response.data.message)}`, {
                         appearance: 'error',
                         autoDismiss: true,
                         autoDismissTimeout:3000
                     });

                 }


            } else {
                toastManager.add("No Internet Connection", {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout:3000
                })
            }
        }

    };

    Login = (url, param, login)  =>{

        this.setState({
            loading: true
        });

        api(url, param, false, true, login);


    };


    //submit ResetPassword form
    submitForm = (e) => {
        e.preventDefault();
        this.Login(LoginEndpoint, this.state, this.processLogin);
    };


    //hides error display
    hideError = () => {
        this.setState({
            error: false
        });
    };


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

        const {email} = this.state;

        if (this.state.redirect) {
            return (
                <React.Fragment>
                    <Redirect to={DashboardLink} push/>
                </React.Fragment>
            );
        }

        if (this.state.resendActErr) {
            console.log(email);
            return (
                <React.Fragment>
                    <Redirect to={{
                        pathname: `${ResendActivationLink}/${email}`,
                        state:{email:email}
                    }} push/>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <form className="login-form " onSubmit={this.submitForm}>
                    <div className="row">
                        <div className="col-12">
                            <h5 className="form-header-purple mb-5">Please Log In</h5>
                            {this.state.error ?
                                <Alert message={this.state.errorMessage} hideError={this.hideError}/> : null}
                        </div>
                        <div className="col-12">
                            <div className="input-field">
                                <input id="email" name={'email'} onChange={this.changeHandler} type="email"
                                       className="validate"/>
                                <label htmlFor="email" className="">Email</label>
                                {this.validator.message('email', email, 'required|email')}

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-field ">
                                <input id="password" name={'password'} type="password" onChange={this.changeHandler}
                                       className="validate"/>
                                <label htmlFor="password" className="">Password</label>

                                <Link className={'dark-link'} to={ForgotPasswordLink}>Forgot Password ?</Link>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className=" text-right pr-sm-0  mt-md-1 mb-1 pr-1 pr-md-3">
                                <label className="font-size-1-1 mb-md-1">New User ? <Link to={'/sign-up'}
                                                                                          className="blue-link ">Sign
                                    Up</Link> </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div
                                className="d-flex  flex-column flex-md-row justify-content-between align-items-center">

                                <button type={'submit'} className="btn btn-round blue-round-btn auth-btn order-md-12"
                                        name="action">{this.state.loading ? <ButtonLoader/> :
                                    <span>Sign in<img alt="" className="img-2x ml-1" src={signInIcon}/></span>}
                                </button>
                                <label className=" mt-3 mt-md-0 label-container d-flex align-items-center ">
                                    <input type="checkbox" className="login-check-box order-md-1"
                                           defaultChecked={false}/>
                                    <span className='checkmark'></span>
                                    <span className='fs-xs'>Always stay signed In</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>

            </React.Fragment>
        );
    }
}

const LoginWithToast = withToastManager(LoginForm);

export default LoginWithToast;
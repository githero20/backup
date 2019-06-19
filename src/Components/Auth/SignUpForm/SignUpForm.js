import React, {Component} from 'react';
import blueHeadArrow from "../../../admin/app-assets/images/svg/blue-head-arrow.svg";
import {Link, Redirect} from "react-router-dom";
import btnArrowRight from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from 'simple-react-validator';
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {RegisterEndpoint, ResendActivationLink} from "../../../RouteLinks/RouteLinks";
import {api} from "../../../ApiUtils/ApiUtils";
import {USERINFO, USERTOKEN} from "../HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';

class SignUpForm extends Component {


    // after sign up user should be redirected to resend email component


    // display  message you have successfully signed up

    // check your email to activate your account

    // or click the link to resend activation


    //validator
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            messages: {
                email: 'Please provide a valid Email.',
                name: 'Please fill in your first name.',
                last_name: 'Please fill in your last name.',
                phone: 'The phone number must match the required pattern (080********)',
                password: 'Password must contain at least one lowercase letter, one uppercase letter , one number and must be a minimum of 8 characters',
            },
            // validators: {
            //     password: {  // name the rule
            //         message: 'The :attribute must be a valid IP address and must be :values.',
            //         rule: (val, params, validator) => {
            //             return validator.helpers.testRegex(val,/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
            //         },
            //         messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
            //         required: true  // optional
            //     }
            // }

        });

        this.state = {
            showReferralInput: false,
            email: '',
            name: '',
            last_name: '',
            phone: '',
            password: '',
            password_confirmation: '',
            referralCode: '',
            submitted: false,
            ConfirmPassError: false,
            passwordError: false,
            loading: false,
            redirect: false,
            error: false,
            errorMessage: '',
            hideError: false,
        }

    }

    //toggleReferralInput
    toggleReferralInput = () => {
        this.setState({
            showReferralInput: !this.state.showReferralInput,
        })
    };


    //Retrieves user inputs
    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        console.log(value);

        //validate password
        if (name === 'password') {
            this.validatePassword();
        }

        //validate confirm password
        if (name === 'password_confirmation') {
            console.log('validating');
            this.validatePasswords(value);
        }
        this.setState({
            [name]: value
        });
        // this.validatePasswords();
    };


    saveToLocalStorage = (user, token) => {

        if (user && token) {

            localStorage.setItem(USERINFO, JSON.stringify(user));
            console.log(token, user);
            localStorage.setItem(USERTOKEN, token);

            this.setState({
                redirect: true
            })
        }
    };


    signUp = (url, param, func) => {
        api(url, param, false, true, func);
    };


    updateError = (error) => {
        this.setState({
            error: true,
            errorMessage: JSON.stringify(error.response.data.errors)
        });

    };


    validatePasswords = (value) => {

        const {password} = this.state;
        // perform all neccassary validations
        if (password !== value) {
            console.log('false' + password, value);
            this.setState({
                ConfirmPassError: true,
            })
            return false;
        } else {
            console.log('true' + password);
            this.setState({
                ConfirmPassError: false,
            });
            return true;

        }

    };

    validatePassword = () => {
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        //^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})

        const {password} = this.state;

        if (strongRegex.exec(password)) {
            this.setState({
                passwordError: false,
            })
            return true;

        } else {
            this.setState({
                passwordError: true,
            })
            return false;

        }

    };


    getSignUpInfo = (state, response) => {

        const {toastManager} = this.props;

        this.setState({
            loading: false
        });

        if (!state) {
            console.log('error');
            if (response) {
                console.log(`request failed: ${JSON.stringify(response)}`);
                this.setState({
                    error: true,
                    errorMessage: JSON.stringify(response.data.message),
                    loading: false
                });

                if (response.data) {
                    console.log(response.data.errors);
                    let errors = response.data.errors;
                    let errorData = Object.values(errors);
                    errorData.map((err, idx) => {
                        return (
                            toastManager.add(`${err}`, {
                                appearance: 'error',
                                index: idx,
                                autoDismiss: true,
                                autoDismissTimeout: 3000,
                            })
                        )
                    });

                }

            }
            // else{
            //     toastManager.add("No Internet Connection.", {
            //         appearance: 'error',
            //         autoDismiss:true,
            //         autoDismissTimeout:3000,
            //     })
            // }
        } else {

            console.log('got here to save');
            if (response) {
                console.log('saved');

                const serverResponse = response.data;
                const token = serverResponse.token;
                const user = serverResponse.user;

                console.log(user, token);
                this.saveToLocalStorage(user, token);

                // localStorage.setItem(USERTOKEN, response.data.token);

                // redirect to activate email

                // this.props.history.push({
                //     pathname: `${ResendActivationLink}`,
                //     state: {email:this.state.email }
                // });


                this.setState({
                    redirect: true
                });

            }

        }
    };


    //submit sign up form
    submitForm = () => {
        if (this.validator.allValid()) {
            //validate confirm password

            // perform all necessary validation
            const ConfPassValid = this.validatePasswords(this.state.password_confirmation);
            const PassVal = this.validatePassword();
            console.log(ConfPassValid,PassVal);
            if (ConfPassValid && PassVal) {
                //    make api call
                this.setState({
                    loading: true
                });

                this.signUp(RegisterEndpoint, this.state, this.getSignUpInfo);

            }


        } else {

            //display All errors

            this.validatePasswords(this.state.password_confirmation);
            this.validatePassword();

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }

    };


    //hides error display
    hideError = () => {
        this.setState({
            error: false
        });
    };


    render() {

        const {name, email, referralCode, password, password_confirmation, last_name, phone} = this.state;


        if (this.state.redirect) {


            // Activate account with paystack

            // return (
            //     <React.Fragment>
            //         <Redirect to={ActivateAccountLink} push/>
            //     </React.Fragment>
            // );
            //
            return (
                <React.Fragment>
                    {/*<Redirect to={ResendActivationLink} />*/}
                    <Redirect push to={{
                        pathname: `${ResendActivationLink}`,
                        state: {email: this.state.email}
                    }}

                    />
                </React.Fragment>
            );
        }


        return (
            <React.Fragment>
                <form className="login-form ">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="form-header-purple mb-5">Create Free Account</h5>
                            {/*{this.state.error ?*/}
                            {/*    <Alert message={this.state.errorMessage} hideError={this.hideError}/> : null}*/}
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="name">First Name</label>
                                <input id="name" type="text" name={'name'} className={'form-control'}
                                       onChange={this.changeHandler}/>
                                {this.validator.message('name', name, 'required|string')}
                            </div>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="name">Last Name (Surname)</label>
                                <input id="lastname" type="text" name={'last_name'} className={'form-control'}
                                       onChange={this.changeHandler}/>
                                {this.validator.message('last name', last_name, 'required|string')}
                            </div>
                        </div>

                        <div className="col-12  col-lg-6 ">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" name={'email'} type="email" className="form-control"
                                       onChange={this.changeHandler}/>
                                {this.validator.message('email', email, 'required|email')}
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 ">
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Mobile Phone</label>
                                <input id="phone" name={'phone'} type="tel" className={'form-control'}
                                       onChange={this.changeHandler}/>
                                {this.validator.message('phone', phone, 'required|phone|regex:^[0]\\d{10}$')}
                            </div>
                        </div>


                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" name={'password'} className={'form-control'}
                                       onChange={this.changeHandler} onBlur={this.validatePassword}/>
                                {/*{this.validator.message('password', password, `required|string|min:8`)}*/}
                                {/*^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})*/}
                                {this.state.passwordError ?
                                    <label className={'srv-validation-message'}>Password must contain at least one
                                        lowercase letter,
                                        one uppercase letter , one number ,one special character and must be a minimum
                                        of 8 characters
                                    </label> : null}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="password_confirmation">Confirm Password</label>
                                <input id="password_confirmation" name={'password_confirmation'} type="password"
                                       className="form-control" onChange={this.changeHandler}
                                />
                                {this.state.ConfirmPassError ?
                                    <label className={'srv-validation-message'}>Password Doesn't match</label> : null}
                            </div>
                        </div>

                        <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                            <div className="referal-code-section">
                                <a className="blue-link" id="referral-btn" onClick={this.toggleReferralInput}>Got a
                                    referral code ? <img
                                        className="img-2x ml-1"
                                        src={blueHeadArrow}/>
                                </a>
                                {
                                    this.state.showReferralInput ?
                                        <div className="form-group" id="referal-input-container">
                                            <input id="referralCode" name={'referralCode'} onChange={this.changeHandler}
                                                   type="text" className="form-control"/>
                                            {this.validator.message('referralCode', referralCode, 'string')}
                                        </div>
                                        : null}
                            </div>

                        </div>
                        <div className="col-md-6 text-center text-md-right mb-md-0">
                            <div className="text-md-right mb-md-2 pr-md-2">
                                <label className="font-size-1-1 mb-3 mb-md-1">Returning User ?
                                    <Link to={'/login'} className="blue-link "> &nbsp; Sign In</Link>
                                </label>
                            </div>
                        </div>

                        <div className="col-12 text-center text-md-right ">
                            <div>
                                <button type={'button'} onClick={this.submitForm}
                                        className=" btn btn-round blue-round-btn auth-btn">
                                    {this.state.loading ? <ButtonLoader/> :
                                        <span>Sign Up<img alt="" className="img-2x ml-1" src={btnArrowRight}/></span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}


const SignUpWithToaster = withToastManager(SignUpForm);

export default SignUpWithToaster;
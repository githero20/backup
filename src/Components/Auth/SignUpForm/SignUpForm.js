import React, {Component} from 'react';
import blueHeadArrow from "../../../admin/app-assets/images/svg/blue-head-arrow.svg";
import {Link, Redirect} from "react-router-dom";
import btnArrowRight from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from 'simple-react-validator';

class SignUpForm extends Component {

    //validator
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            showReferralInput:false,
            formControls: {
                email: {
                    value: ''
                },
                firstName: {
                    value: ''
                },
                lastName: {
                    value: ''
                },
                phoneNumber: {
                    value: ''
                },
                password: {
                    value: ''
                },
                referralCode: {
                    value: ''
                }
            },
            submitted: false
        }

    }

    //toggleReferralInput
    toggleReferralInput = () => {
        this.setState({
            showReferralInput:!this.state.showReferralInput,
        })
    };


    //Retrieves user inputs
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    };

    handleSelectInput = event => {

        const name = event.target.name;
    }

    //submit sign up form
    submitForm = () => {
        console.log(this.state.formControls);
        if (this.validator.allValid()) {
            this.setState({
                submitted:true,
            })

        } else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    };

    //Validates inputs


    render() {

        const {firstName,lastName,email,referralCode,password,phoneNumber} = this.state.formControls;


        if (this.state.submitted){

            return (
                <React.Fragment>
                    <Redirect to={'/activate-account'} push />
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <form className="login-form px-5 px-md-2">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="form-header-purple mb-5">Create Free Account</h5>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="firstName" >First Name</label>
                                <input id="firstName" type="text" name={'firstName'}  className={'form-control'}  onChange={this.changeHandler} />
                                {this.validator.message('firstName', firstName.value, 'required|string')}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="LastName">Last Name</label>
                                <input id="lastName" name={'lastName'} type="text" className="form-control"  onChange={this.changeHandler} />
                                {this.validator.message('lastName', lastName.value, 'required|string')}
                            </div>
                        </div>
                        <div className="col-12 ">
                            <div className="form-group">
                                <label htmlFor="email" >Email</label>
                                <input id="email" name={'email'} type="email" className="form-control"  onChange={this.changeHandler} />
                                {this.validator.message('email', email.value, 'required|email')}
                            </div>
                        </div>
                        <div className="col-12 ">
                            <div className="form-group">
                                <label htmlFor="phoneNumber" >Mobile Phone</label>
                                <input id="phoneNumber" name={'phoneNumber'} type="tel" className={'form-control'} onChange={this.changeHandler} />
                                {this.validator.message('phoneNumber', phoneNumber.value, 'required|phone')}
                            </div>
                        </div>
                        <div className="col-12 ">
                            <div className="form-group">
                                <label htmlFor="password" >Password</label>
                                <input id="password" type="password" name={'password'}  className={'form-control'} onChange={this.changeHandler}/>
                                {this.validator.message('password',password.value, 'required')}
                            </div>
                        </div>
                        <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                            <div className="referal-code-section">
                                <a className="blue-link" id="referral-btn" onClick={this.toggleReferralInput}>Got a referral code ? <img
                                    className="img-2x ml-1"
                                    src={blueHeadArrow}/>
                                </a>
                                {
                                    this.state.showReferralInput ?
                                        <div className="input-field" id="referal-input-container">
                                            <input id="referralCode" name={'referralCode'} onChange={this.changeHandler} type="text" className="form-control"/>
                                            {this.validator.message('referralCode',referralCode.value, 'string')}
                                        </div>
                                    : null }

                            </div>

                        </div>
                        <div className="col-md-6 text-center text-md-right mb-3 mb-md-0">
                            <div className="text-md-right mb-2 pr-md-4">
                                <label className="font-size-1-1 mb-3">Returning User ?
                                    <Link to={'/login'} className="blue-link "> &nbsp; Sign In</Link>
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6 text-center text-md-right offset-md-6">
                            <div className="text-md-right">
                                <button type={'button'} onClick={this.submitForm} className="btn btn-round blue-round-btn ">Sign up <img className="img-2x ml-2" src={btnArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default SignUpForm;
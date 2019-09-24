"use strict";
import React, {Component} from 'react';
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from "simple-react-validator";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {withToastManager} from 'react-toast-notifications';
import {
    handlePinConcatenation,
    hideLoader,
    toastMessage,
    validateInputEntry,
    validatePasswords,
    validatePin
} from "../../../Helpers/Helper";
import {_handleFormChange} from "../../../utils";
import {request} from "../../../ApiUtils/ApiUtils";
import {LoginLink, phonePassResetEndpoint} from "../../../RouteLinks/RouteLinks";
import {Redirect} from "react-router";

class PhonePassResetForm extends Component {


    // validate email or password

    // get input if phone number and response is valid

    // display input email , password , new password and withdrawal pin

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();

        this.state = {
            email: '',
            userData: null,
            error: false,
            errorMessage: '',
            loading: false,
            message: '',
            pinErr: false,
            redirect: false,
            form: {
                pin_one: '',
                pin_two: '',
                pin_three: '',
                pin_four: '',
                withdrawal_pin: '',
                email: '',
                phone: '',
                password: '',
                password_confirmation: '',
            }
        }
    }

    validatePasswords = (e) => {
        const {password} = this.state.form;
        validatePasswords(password, e.target.value) ? this.setState({passErr: false}) : this.setState({passErr: true})
    };


    handleChange = (e) => {
        let form = _handleFormChange(e.target.name, e, this);
        handlePinConcatenation(e.target.name, e, this);
        if (e.target.name == 'password_confirmation') {
            validatePasswords(e.target.value, this.state.form.password) ? this.setState({passErr: false}) : this.setState({passErr: true})
        }

        return form;
    };


    // validate forgot password

    submitForm = () => {

        if (!this.validator.allValid()) {
            // rerender to show messages for the first time
            this.validator.showMessages();
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        } else {
            if (validatePin(this)) {
                // call reset password endpoint
                this.setState({
                    loading: true
                });
                request(phonePassResetEndpoint, this.state.form, false, "POST", this.handleResetResponse);
            }
        }
    };


    //handle response

    // if response is successful render a input password form

    handleResetResponse = (state, response) => {
        this.setState({
            loading: false
        });
        //handle response
        if (state) {
            // toastMessage(`${response.data.data}`, 'success', this);
            toastMessage(`Password created successfully !!`, 'success', this);

            setTimeout(() => {
                this.setState({redirect: true})
            }, 3000);
        } else {
            console.log('err', response);
            toastMessage(`${response.data.message}`, 'error', this);
        }
    };


    //api send mail to user


    // user click link to reset password


    //user input password and confirmation password

    componentWillReceiveProps(nextProps) {
        let form = this.state.form;
        form.phone = nextProps.phone;
        form.email = `${nextProps.phone}@backupcash.ng`;
        this.setState({
            form
        });
    }

    componentDidMount() {
        hideLoader();
    }

    render() {
        const {email, password, phone} = this.state.form;

        if (this.state.redirect) {
            return (
                <Redirect to={LoginLink}/>
            )
        }
        return (
            <React.Fragment>
                <form className="login-form" autoComplete="off">
                    <div className="row">
                        <div className="col-12">
                            {/*provide breadcrumb to go back*/}
                            <h5 className="form-header-purple mb-1">Get Password</h5>
                            {/*<p className='mb-1'>Get a new password </p>*/}
                        </div>
                        {/*<div className="col-md-6">*/}
                        {/*    <div className="form-group">*/}
                        {/*        <label htmlFor="email" className="">Email </label>*/}
                        {/*        <input id="email" name={'email'} autoComplete="off" onChange={this.handleChange}*/}
                        {/*               type="hidden"*/}
                        {/*               className="form-control"/>*/}
                        {/*        /!*{this.validator.message('email', email, 'required|email')}*!/*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="email" className="">Phone </label>
                                <input id="phone" name={'phone'} autoComplete="off" defaultValue={phone}
                                       onChange={this.handleChange} type="number"
                                       className="form-control"/>
                                {this.validator.message('phone', phone, 'required|numeric|phone')}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="password" className="">New Password</label>
                                <input id="password" name={'password'} onChange={this.handleChange} type="password"
                                       className="form-control"/>
                                {this.validator.message('password', password, 'required|string|min:8')}
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="password_confirmation">Confirm New Password</label>
                                <input id="password_confirmation" name={'password_confirmation'} type="password"
                                       className="form-control" onChange={this.handleChange}
                                       onBlur={this.validatePasswords}/>
                                {this.state.passErr ?
                                    <label className={'srv-validation-message'}>Password Doesn't match</label> : null}
                            </div>

                        </div>
                        <div className="col-12">
                            <div className="form-group mb-2">
                                <label>Withdrawal Pin</label>
                                {this.state.pinErr ?
                                    <p><span className='srv-validation-message'>Your pin must be four digits</span></p>
                                    : null}
                                <div className="row">
                                    <div className="col-3">
                                        <input id="pin_one" type="password" autoComplete='off' name={'pin_one'}
                                               className={'form-control pin-control'}
                                               value={this.state.form.pin_one}
                                               onChange={this.handleChange}
                                               onKeyUp={validateInputEntry}
                                               onKeyDown={validateInputEntry}
                                        />

                                    </div>
                                    <div className="col-3">
                                        <input id="pin_two" type="password" autoComplete='off' name={'pin_two'}
                                               className={'form-control pin-control'}
                                               value={this.state.form.pin_two}
                                               onChange={this.handleChange}
                                               onKeyUp={validateInputEntry}
                                               onKeyDown={validateInputEntry}
                                        />

                                    </div>
                                    <div className="col-3">
                                        <input id="pin_three" type="password" autoComplete='off' name={'pin_three'}
                                               className={'form-control pin-control'}
                                               value={this.state.form.pin_three}
                                               onChange={this.handleChange}
                                               onKeyUp={validateInputEntry}
                                               onKeyDown={validateInputEntry}
                                        />

                                    </div>
                                    <div className="col-3">
                                        <input id="pin_four" type="password" autoComplete='off' name={'pin_four'}
                                               className={'form-control pin-control'}
                                               value={this.state.form.pin_four}
                                               onChange={this.handleChange}
                                               onKeyUp={validateInputEntry}
                                               onKeyDown={validateInputEntry}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-12">
                            <div
                                className="d-flex flex-column flex-md-row justify-content-end align-items-center">
                                <button type={'button'} disabled={this.state.loading} onClick={this.submitForm}
                                        className="btn btn-round blue-round-btn auth-btn "
                                        name="action">{this.state.loading ? <ButtonLoader/> :
                                    <span>Submit <img alt="" className="img-2x ml-1" src={signInIcon}/></span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}


export default withToastManager(PhonePassResetForm);

import React, {Component} from 'react';
import ButtonLoader from "../Buttonloader/ButtonLoader";
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from "simple-react-validator";
import {withToastManager} from 'react-toast-notifications';
import {LoginLink, ResetPasswordEndpoint} from "../../../RouteLinks/RouteLinks";
import {request} from "../../../ApiUtils/ApiUtils";
import {Redirect} from "react-router";
import {passwordValidator, toastMessage, validatePasswords} from "../../../Helpers/Helper";


class ResetPasswordForm extends Component {

    state = {
        password: '',
        token: '',
        password_confirmation: '',
        email: '',
        passErr: false,
        loading: false,
        redirect: false,

    };

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
    }

    //Retrieves user inputs
    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        if (name == 'password_confirmation') {
            (!validatePasswords(this.state.password, value)) ?
                this.setState({passErr: true}) :
                this.setState({passErr: false});
        }
    };


    handleResetResponse = (state, response) => {
        const {toastManager} = this.props;
        this.setState({
            loading: false
        });

        if (state) {
            toastMessage(response.data.success, 'success', this);
            setTimeout(() => {
                this.setState({redirect: true})
            }, 2500);
        } else if (!state && response && response.data && response.data.errors) {
            response.data.errors.map((err, indx) => {
                return (
                    toastManager.add('Your Link has expired.Please Request a new Link', {
                        appearance: 'error',
                        index: indx,
                    })
                )
            });
        }

    };


    submitForm = (e) => {

        e.preventDefault();

        if (this.validator.allValid()) {
            if (validatePasswords(this.state.password, this.state.password_confirmation)) {
                this.setState({
                    loading: true,
                    token: this.props.token
                }, () => {
                    request(ResetPasswordEndpoint, this.state, false, 'POST', this.handleResetResponse)
                });
            }
        } else {
            // rerender to show messages for the first time
            this.validator.showMessages();
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    };


    validatePasswords = () => {
        const {password, password_confirmation} = this.state;
        // perform all neccassary validations
        if (password !== password_confirmation) {
            this.setState({
                passErr: true,
            })
        } else {
            this.setState({
                passErr: false,
            });
        }
    };


    render() {
        const {password, email} = this.state;
        if (this.state.redirect) {
            return (
                <Redirect to={LoginLink}/>
            )
        }
        return (
            <React.Fragment>
                <form className="login-form reset-form" onSubmit={this.submitForm}>
                    <div className="row">

                        <div className="col-12">
                            <h5 className="form-header-purple mb-5">Reset password</h5>
                        </div>

                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="email" className="">Email Address</label>
                                <input id="email" name={'email'} onChange={this.changeHandler} type="email"
                                       className="form-control"/>
                                {this.validator.message('email', email, 'required|email')}
                            </div>

                        </div>


                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="password" className="">New Password</label>
                                <input id="password" name={'password'} onChange={this.changeHandler} type="password"
                                       className="form-control"/>
                                {this.validator.message('password', password, 'required|string|min:8')}
                            </div>
                        </div>


                        <div className="col-12 ">
                            <div className="form-group">
                                <label htmlFor="password_confirmation">Confirm New Password</label>
                                <input id="password_confirmation" name={'password_confirmation'} type="password"
                                       className="form-control" onChange={this.changeHandler}
                                       onBlur={this.validatePasswords}/>

                            </div>
                            {this.state.passErr ?
                                <label className={'srv-validation-message'}>Password Doesn't match</label> : null}
                        </div>


                        <div className="col-12">
                            <div className="d-flex mt-1  flex-md-row justify-content-end align-items-center">
                                {/* submit button */}
                                <button type="submit" disabled={this.state.loading}
                                        className="btn btn-round blue-round-btn auth-btn "
                                        name="action">{this.state.loading ? <ButtonLoader/> :
                                    <span>Submit<img alt="" className="img-2x ml-2" src={signInIcon}/></span>}
                                </button>
                            </div>
                        </div>


                    </div>
                </form>
            </React.Fragment>
        );
    }
}

const ResetFormToast = withToastManager(ResetPasswordForm);
export default ResetFormToast;
import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from "simple-react-validator";
import Axios from "axios";
import Alert from "../../Alert/Alert";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {ActivateAccountLink} from "../../../RouteLinks/RouteLinks";

class ForgotPasswordForm extends Component {



    constructor(props) {

        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            email: '',
            redirect:false,
            error:false,
            errorMessage:'',
            loading:false,
            message:''
        }

    }



    //Retrieves user inputs
    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };



    // retreive email

    submitForm = () => {

        this.submitEmail(this.state.email);



    };

    //send email to api

    submitEmail = (url,param) =>{


        Axios.post(url,param,{
            headers: {
                "Content-Type": "Application/json",
                "credentials": 'same-origin',
            }})

            .then( (response) => {

                console.log(' data:', response);
                // catch message and send message to user with alert

                this.setState({
                    // redirect:true,
                    loading:false,
                    message:response.data.message
                })

            }).catch( (error) => {

            console.log(`request failed: ${JSON.stringify(error.response.data)}`);
            let message = JSON.stringify(error.response.data.message);
            this.setState({
                error:true,
                errorMessage:message,
                loading:false
            });

        });



    };



    //api send mail to user


    // user click link to reset password


    //user input password and confimration pasword





    render() {

        const { email,password,password_confirmation} = this.state;


        if (this.state.redirect) {

            return (
                <React.Fragment>
                    <Redirect to={ActivateAccountLink} push/>
                </React.Fragment>
            );

        }

        if(this.state.reset){
            return (
                <React.Fragment>
                    <form className="login-form ">
                        <div className="row">
                            <div className="col-12">
                                <h5 className="form-header-purple mb-5">Enter New password</h5>
                                {this.state.error?<Alert message={this.state.errorMessage} hideError={this.hideError}/>:null}
                                {this.state.message !=='' ?<Alert message={this.state.message} hideError={this.hideError}/>:null}
                            </div>
                            <div className="col-12">
                                <div className="input-field">
                                    <input id="email" name={'password'}  onChange={this.changeHandler} type="email" className="validate" />
                                    <label htmlFor="email" className="">Email</label>
                                    {this.validator.message('email', email, 'required|email')}

                                </div>
                            </div>
                            <div className="col-12">
                                <div className="input-field">
                                    <input id="password_confirmation" name={'password_confirmation'}  onChange={this.changeHandler} type="password" className="validate" />
                                    <label htmlFor="password_confirmation" className="">Email</label>
                                    {this.validator.message('password_confirmation', email, 'required|')}

                                </div>
                            </div>

                            <div className="col-12">
                                <div
                                    className="d-flex  flex-md-row justify-content-end align-items-center">

                                    <button type={'button'} onClick={this.submitForm} className="btn btn-round blue-round-btn auth-btn "
                                            name="action">{this.state.loading?<ButtonLoader/>:
                                        <span>Send Email<img alt="" className="img-2x ml-2" src={signInIcon}/></span>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <form className="login-form ">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="form-header-purple mb-5">Forgot Password</h5>
                            <p>Get a password reset email</p>
                            {this.state.error?<Alert message={this.state.errorMessage} hideError={this.hideError}/>:null}
                            {this.state.message !=='' ?<Alert message={this.state.message} hideError={this.hideError}/>:null}
                        </div>
                        <div className="col-12">
                            <div className="input-field">
                                <input id="email" name={'email'}  onChange={this.changeHandler} type="email" className="validate" />
                                <label htmlFor="email" className="">Email</label>
                                {this.validator.message('email', email, 'required|email')}

                            </div>
                        </div>

                        <div className="col-12">
                            <div
                                className="d-flex  flex-md-row justify-content-end align-items-center">

                                <button type={'button'} onClick={this.submitForm} className="btn btn-round blue-round-btn auth-btn "
                                      name="action">{this.state.loading?<ButtonLoader/>:
                                    <span>Send Email<img alt="" className="img-2x ml-2" src={signInIcon}/></span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </React.Fragment>
        );
    }
}

export default ForgotPasswordForm;
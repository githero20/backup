import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from "simple-react-validator";
import Alert from "../../Alert/Alert";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {DashboardLink, ForgotPasswordLink, LoginEndpoint} from "../../../RouteLinks/RouteLinks";
import {api} from "../../../ApiUtils/ApiUtils";
import {USERTOKEN} from "../HOC/authcontroller";

class LoginForm extends Component {



    constructor(props) {

        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            email: '',
            password: '',
            redirect:false,
            error:false,
            errorMessage:'',
            RenderPasswordError:false,
            loading:false
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

    processLogin = (state,response) => {


    this.setState({loading:false});

        if (!state){
            let message = JSON.stringify(response);
            this.setState({
                error:true,
                errorMessage:message,
                loading:false
            });

        }else {
            localStorage.setItem(USERTOKEN, response.data.token)
            this.setState({
                redirect:true
            });
        }
    };

    Login(url,param,login) {


        api(url,param,false,true,login);
        // post(url,param,{
        //     headers: {
        //         "Content-Type": "Application/json",
        //         "credentials": 'same-origin',
        //     },})
        //
        //     .then( login).catch( (error) => {
        //
        //
        // });

    }


    //submit ForgotPassword form
    submitForm = () => {

        this.Login(LoginEndpoint,this.state,this.processLogin);

    };


    //hides error display
    hideError = () => {
      this.setState({
          error:false
      }) ;
    };


    validate = () => {

        if (this.validator.allValid()) {

            const PasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})') ;

                //validate confirm password

                const {password} = this.state;
                // perform all neccassary validations

                if(!PasswordRegex.exec(password)){

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

        const { email} = this.state;


        if (this.state.redirect) {

            return (
                <React.Fragment>
                    <Redirect to={DashboardLink} push />
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <form className="login-form ">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="form-header-purple mb-5">Please Log In</h5>
                            {this.state.error?<Alert message={this.state.errorMessage} hideError={this.hideError}/>:null}
                        </div>
                        <div className="col-12">
                            <div className="input-field">
                                <input id="email" name={'email'}  onChange={this.changeHandler} type="email" className="validate"/>
                                <label htmlFor="email" className="">Email</label>
                                {this.validator.message('email', email, 'required|email')}

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-field ">
                                <input id="password" name={'password'} type="password"  onChange={this.changeHandler} className="validate"/>
                                <label htmlFor="password" className="">Password</label>
                                {this.state.RenderPasswordError ?
                                    <div className={'srv-validation-message'}>Password must have Uppercase, Lowercase, Number and Special Character</div>
                                    : null}

                                <Link to={ForgotPasswordLink} >Forgot Password ?</Link>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className=" text-right pr-sm-0  mt-md-1 mb-1 pr-1 pr-md-3">
                                <label className="font-size-1-1 mb-md-1">New User ? <Link to={'/sign-up'}
                                                                                       className="blue-link ">Sign Up</Link> </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div
                                className="d-flex  flex-md-row justify-content-between align-items-center">
                                <label className=" mb-md-0">
                                    <input type="checkbox" className="filled-in login-check-box"
                                           defaultChecked={true}/>
                                    <span>Always Stay signed In</span>
                                </label>
                                <button type={'button'} onClick={this.submitForm} className="btn btn-round blue-round-btn auth-btn "
                                      name="action">{this.state.loading?<ButtonLoader/>:
                                    <span>Sign in<img alt="" className="img-2x ml-2" src={signInIcon}/></span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </React.Fragment>
        );
    }
}

export default LoginForm;
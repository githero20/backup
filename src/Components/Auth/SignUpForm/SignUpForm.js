import React, {Component} from 'react';
import blueHeadArrow from "../../../admin/app-assets/images/svg/blue-head-arrow.svg";
import {Link, Redirect} from "react-router-dom";
import btnArrowRight from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from 'simple-react-validator';
import Axios from "axios";
import Alert from "../../Alert/Alert";
import ButtonLoader from "../Buttonloader/ButtonLoader";

class SignUpForm extends Component {

    //validator
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            messages: {
                email: 'Please Provide A valid Email.',
                name: 'Please Provide A valid Email.',
                phone: 'Please Provide A valid Phone Number.',
                password: 'Password must have Uppercase, Lowercase, Number and Special Character',
            }
        });

        this.state = {
            showReferralInput: false,
            email: '',
            name: '',
            phone: '',
            password: '',
            password_confirmation: '',
            referralCode: '',
            submitted: false,
            RenderValidationError: false,
            RenderPasswordError:false,
            loading:false,
            redirect:false,
            error:false,
            errorMessage:'',
            hideError:false,
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
        this.setState({
            [name]: value
        });
    };



    saveToLocalStorage=(user,token)=>{

        const userData = window.localStorage.setItem('user',JSON.stringify(user));
        const tokenData = window.localStorage.setItem('token',token);
        console.log(userData,tokenData);

    };




     signUp(url) {

            Axios.post(url,this.state,{
                headers: {
                    "Content-Type": "Application/json",
                    "credentials": 'same-origin',
                }})

            .then( (response) => {
                this.setState({
                    loading:false
                });
                console.log(' data:', response);
                //save token
                const serverResponse = response.data;
                const token = serverResponse.token;
                const user = serverResponse.user;

                console.log(serverResponse);
                console.log(user,token);
                this.saveToLocalStorage(user,token);

                this.setState({
                    redirect:true,
                })

            }).catch( (error) => {

                console.log(`request failed: ${JSON.stringify(error.response.data)}`);
                    this.setState({
                        error:true,
                        errorMessage:JSON.stringify(error.response.data),
                        loading:false
                    });
            });

    }



    updateError = (error)=>{
        this.setState({
            error:true,
            errorMessage:JSON.stringify(error.response.data.errors)
        });

    };

        validatePasswords=()=>{

            const PasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})') ;

            const {password, password_confirmation} = this.state;

            // perform all neccassary validations

            if (password !== password_confirmation) {
                this.setState({
                    RenderValidationError: true,
                })

            }else if(!PasswordRegex.exec(password)){

                this.setState({
                    RenderPasswordError: true,
                })

            } else {

                this.setState({
                    RenderPasswordError: false,
                    RenderValidationError: false,
                });

                return true;
            }

        };

    //submit sign up form
    submitForm = () => {

        if (this.validator.allValid()) {

                //validate confirm password

                // perform all neccassary validation
              const  PasswordValid = this.validatePasswords();

              if(PasswordValid){
                  //    make api call
                  this.setState({
                      loading:true
                  });

                  this.signUp(`http://backupcash.atp-sevas.com/sfsbapi/v1/auth/register`);

              }


        } else {

            //validate confirm password

            // perform all neccassary validations

            this.validatePasswords();

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }

    };



    componentDidMount() {
        console.log(localStorage.getItem('ResponseData'));
    }

    //hides error display
    hideError = () => {
        this.setState({
            error:false
        }) ;
    };


    render() {

        const {name, email, referralCode, password, password_confirmation, phone} = this.state;


        if (this.state.redirect) {

            return (
                <React.Fragment>
                    <Redirect to={'/activate-account'} push/>
                </React.Fragment>
            );
        }


        return (
            <React.Fragment>
                <form className="login-form ">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="form-header-purple mb-5">Create Free Account</h5>
                            {this.state.error?<Alert message={this.state.errorMessage} hideError={this.hideError}/>:null}
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" name={'name'} className={'form-control'}
                                       onChange={this.changeHandler}/>
                                {this.validator.message('name', name, 'required|string')}
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
                        <div className="col-12  ">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" name={'email'} type="email" className="form-control"
                                       onChange={this.changeHandler}/>
                                {this.validator.message('email', email, 'required|email')}
                            </div>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" name={'password'} className={'form-control'}
                                       onChange={this.changeHandler} onBlur={this.validatePasswords}/>
                                {
                                    this.state.RenderPasswordError ?
                                    <label className={'srv-validation-message'}>Password must have Uppercase, Lowercase, Number and Special Character</label>
                                    : null
                                }

                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="password_confirmation">Confirm Password</label>
                                <input id="password_confirmation" name={'password_confirmation'} type="password"
                                       className="form-control" onChange={this.changeHandler} onBlur={this.validatePasswords}/>
                                {this.state.RenderValidationError ? <label className={'srv-validation-message'}>Password Doesn't match</label> : null}
                            </div>
                        </div>

                        <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                            <div className="referal-code-section">
                                <a className="blue-link" id="referral-btn" onClick={this.toggleReferralInput}>Got a
                                    referral code ? <img
                                        className="img-2x ml-1"
                                        src={blueHeadArrow} />
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
                                    {this.state.loading?<ButtonLoader/>:
                                        <span>Sign Up<img alt="" className="img-2x ml-2" src={btnArrowRight}/></span>}
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
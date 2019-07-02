import React, {Component} from 'react';
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from "simple-react-validator";
import Alert from "../../Alert/Alert";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import { passwordResetEndpoint} from "../../../RouteLinks/RouteLinks";
import {request} from "../../../ApiUtils/ApiUtils";
import {withToastManager} from 'react-toast-notifications';

class ForgotPasswordForm extends Component {


    constructor(props) {

        super(props);

        this.validator = new SimpleReactValidator({
            messages: {
                email: 'Input a valid Email',

            },
        });

        this.state = {
            email: '',
            userData:null,
            error:false,
            errorMessage:'',
            loading:false,
            message:'',
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



    // validate forgot password

    submitForm = () => {


        if (this.validator.allValid()) {


                //    make api call
                this.setState({
                    loading: true
                });


                request(passwordResetEndpoint,this.state,false,"POST",this.submitEmailResponse);

        } else {

            // rerender to show messages for the first time
            this.validator.showMessages();
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }


    };




    //handle response

    // if response is successful render a input password form

    submitEmailResponse = (state,response) => {

        const { toastManager } = this.props;

        this.setState({
            loading:false
        });


        //handle response

        if(state){

            console.log(response);

            toastManager.add(`${response.data.success}`, {
                appearance: 'success',
            });


        }else{

            console.log(response);
            toastManager.add(`${response.data.error}`, {
                appearance: 'error',
            });


        }




    };


    //api send mail to user


    // user click link to reset password


    //user input password and confirmation password





    render() {

        const { email} = this.state;



        return (
            <React.Fragment>
                    <form className="login-form">
                        <div className="row">
                            <div className="col-12">
                                {/*provide breadcrumb to go back*/}
                                <h5 className="form-header-purple mb-1">Forgot Password</h5>
                                <p className='mb-1'>Get a password reset email</p>
                            </div>
                            <div className="col-12">
                                <div className="input-field">
                                    <input id="email" name={'email'}  onChange={this.changeHandler} type="email" className="validate" />
                                    <label htmlFor="email" className="">Your Email</label>
                                    {this.validator.message('email', email, 'required|email')}

                                </div>
                            </div>

                            <div className="col-12">
                                <div
                                    className="d-flex flex-column flex-md-row justify-content-end align-items-center">
                                    <button type={'button'} disabled={this.state.loading} onClick={this.submitForm} className="btn btn-round blue-round-btn auth-btn "
                                            name="action">{this.state.loading?<ButtonLoader/>:
                                        <span>Send Email<img alt="" className="img-2x ml-1" src={signInIcon}/></span>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
            </React.Fragment>
        );
    }
}

const FPWithToast  = withToastManager(ForgotPasswordForm);

export default FPWithToast;
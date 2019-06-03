import React, {Component} from 'react';
import ButtonLoader from "../Buttonloader/ButtonLoader";
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from "simple-react-validator";
import {withToastManager} from 'react-toast-notifications';
import {ResetPasswordEndpoint, passwordResetEndpoint} from "../../../RouteLinks/RouteLinks";
import {request} from "../../../ApiUtils/ApiUtils";
import queryString from "query-string";


class ResetPasswordForm extends Component {

    state={
        password:'',
        token:'',
        password_confirmation:'',
        email:'',
        ConfirmPassError:false,
        loading:false,
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
    };



    handleResetResponse = (state,response)=> {

        const { toastManager } = this.props;

        this.setState({
            loading:false
        });

        if(state){

            console.log(response);

            toastManager.add(`${response.data.success}`, {
                appearance: 'success',
            });


        }else{

            if(response){
                console.log(response.data.errors);
                if(response.data.errors){
                    response.data.errors.map((err,indx)=>{
                        return(
                            toastManager.add(`${err}`, {
                                appearance: 'error',
                                index:indx,
                            })
                        )
                    });
                }else {
                    toastManager.add(`${response.data.error}`, {
                        appearance: 'error',
                    })

                }



            }

        }


    };




    submitForm = (e) => {

        e.preventDefault();

        if (this.validator.allValid()) {


            if( this.validatePasswords()){

                this.setState({
                    loading:true,
                    token:this.props.token
                },()=>{
                    request(ResetPasswordEndpoint,this.state,false,'POST',this.handleResetResponse)
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
                ConfirmPassError: true,
            })

        } else {

            this.setState({
                ConfirmPassError: false,
            });

            return true;
        }

    };





    render() {

        const {password,email}=this.state;

        return (
            <React.Fragment>
                <form className="login-form" onClick={this.submitForm}>
                    <div className="row">

                        <div className="col-12">
                            <h5 className="form-header-purple mb-5">Enter New password</h5>

                        </div>

                        <div className="col-12">
                            <div className="input-field">
                                <input id="email" name={'email'}  onChange={this.changeHandler} type="email" className="validate" />
                                <label htmlFor="email" className="">Email Address</label>
                            </div>
                            {this.validator.message('email', email, 'required|email')}

                        </div>


                        <div className="col-12">
                            <div className="input-field">
                                <input id="password" name={'password'}  onChange={this.changeHandler} type="password" className="validate" />
                                <label htmlFor="password" className="">Password</label>
                            </div>
                            {this.validator.message('password', password, 'required|string|min:8')}
                        </div>


                        <div className="col-12 ">
                            <div className="input-field">
                                <label htmlFor="password_confirmation">Confirm Password</label>
                                <input id="password_confirmation" name={'password_confirmation'} type="password"
                                       className="validate" onChange={this.changeHandler}
                                       onBlur={this.validatePasswords}/>

                            </div>
                            {this.state.ConfirmPassError ?
                                <label className={'srv-validation-message'}>Password Doesn't match</label> : null}
                        </div>


                        <div className="col-12">
                            <div className="d-flex  flex-md-row justify-content-end align-items-center">
                                {/* submit button */}
                                <button type="submit"  className="btn btn-round blue-round-btn auth-btn "
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

const ResetFormToast = withToastManager(ResetPasswordForm);
export default ResetFormToast;
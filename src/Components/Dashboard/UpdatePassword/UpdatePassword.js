import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import {getLocalStorage, request} from "../../../ApiUtils/ApiUtils";
import {ResetPasswordEndpoint} from "../../../RouteLinks/RouteLinks";
import {USERINFO, USERTOKEN} from "../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";
import {ToastProvider} from 'react-toast-notifications';
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";



function validatePasswords (password, password_confirmation){


    // perform all neccassary validations

    if (password === password_confirmation) {

        return true

    } else {

        return false
    }

}

class UpdatePassword extends Component {


    //fetch user info
    state = {
        token:null,
        email:null,
        password:null,
        password_confirmation:null,
        loading:false,
        passErr:false
    }


    // get and validate password


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

    handleUpdateResponse = (state,response)=> {

        const {toastManager} = this.props;

        this.setState({
            loading: false
        });

        if (state) {


            toastManager.add(`${response.data.success}`, {
                appearance: 'success',
                autoDismiss:true,
                autoDismissTimeout:3000,
            });

            setTimeout(() => {
                this.setState({redirect: true})
            }, 2500);

        } else {
            console.log("error"+JSON.stringify(response));
            if (response) {
                if (response.data.errors) {
                    response.data.errors.map((err, indx) => {
                        return (
                            toastManager.add(`${err}`, {
                                appearance: 'error',
                                autoDismiss:true,
                                index: indx,
                                autoDismissTimeout:3000,
                            })
                        )
                    });
                } else {
                    toastManager.add(`${response.data.error}`, {
                        appearance: 'error',
                        autoDismiss:true,
                        autoDismissTimeout:3000,
                    })

                }


            }

        }

    }




    // update password

    submitForm = (e) => {

        e.preventDefault();

        if (this.validator.allValid()) {


            if( validatePasswords(this.state.password,this.state.password_confirmation)){

                this.setState({
                    loading:true,
                },()=>{
                    request(ResetPasswordEndpoint,this.state,false,'POST',this.handleUpdateResponse)
                });

            }else{

                this.setState({
                    passErr:true
                })


            }



        } else {

            // rerender to show messages for the first time
            this.validator.showMessages();
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }


    };


    validatePass = ()=> {
        const {password,password_confirmation}=this.state;
        if(validatePasswords(password,password_confirmation)){
            this.setState({
                passErr:false,
            })
        }else {
            this.setState({
                passErr:true,
            })
        }
    }




    componentDidMount(){

        const token = getLocalStorage(USERTOKEN);
        const data = JSON.parse(getLocalStorage(USERINFO));

        this.setState({
            token,
            email:data.email
        },()=>{
            console.log(this.state);
        })
    }

    //validate on every instance
    //then also on submit
    //call api
    //handle response



    render() {
        const {password,password_confirmation} = this.state;
        return (
            <React.Fragment>
                <div>
                        <div className="row my-5">
                            <div className='col-12'>
                                <h3>Update Password</h3>
                                <div className='line'></div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">New Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        onChange={this.changeHandler}
                                        className="form-control mb-1"
                                        name="password"
                                    />

                                    {this.validator.message('password', password, 'required|string|min:8')}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">New Password</label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        onChange={this.changeHandler}
                                        onBlur={this.validatePass}
                                        className="form-control mb-1"
                                        name="password_confirmation"
                                    />

                                </div>
                                {this.state.passErr? <div className={'srv-validation-message'}>Password Doesn't match</div> : null}
                            </div>
                            <div className="col-12 text-center mt-2  text-md-right">
                                <button type="submit" onClick={this.submitForm} className="btn-withdraw round ">
                                    {this.state.loading?<ButtonLoader/>:
                                        <span>Update Password</span>}
                                </button>
                            </div>
                        </div>
                </div>

            </React.Fragment>
        );
    }
}

export default withToastManager(UpdatePassword);
import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import {getLocalStorage, request} from "../../../ApiUtils/ApiUtils";
import {UpdatePasswordEndpoint} from "../../../RouteLinks/RouteLinks";
import {USERINFO, USERTOKEN} from "../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";


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
        old_password:null,
        password_confirmation:null,
        loading:false,
        passErr:false,
        passwordError:false
    };

    // get and validate password


    constructor(props) {

        super(props);

        this.validator = new SimpleReactValidator();


    }

    //
    // //Retrieves user inputs
    // changeHandler = event => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //
    //     this.setState({
    //         [name]: value
    //     });
    // };
    //Retrieves user inputs
    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        console.log(value);

        //validate password
        if (name === 'password') {
            this.validatePassword();
        }

        this.setState({
            [name]: value
        });
        // this.validatePasswords();
    };


    validatePassword = () => {
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        //^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})

        const {password} = this.state;

        if (strongRegex.exec(password)) {
            this.setState({
                passwordError: false,
            })
        } else {
            this.setState({
                passwordError: true,
            })
        }

    };

    handleUpdateResponse = (state,response)=> {

        const {toastManager} = this.props;

        this.setState({
            loading: false
        });

        if (state) {

            console.log(response.data.message);
            toastManager.add(`${response.data.message}`, {
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
                    console.log(response.data.errors);
                } else {
                    toastManager.add(`${response.data.error}`, {
                        appearance: 'error',
                        autoDismiss:true,
                        autoDismissTimeout:3000,
                    })

                }


            }

        }

    };




    // update password

    submitForm = (e) => {

        e.preventDefault();

        if (this.validator.allValid()) {


            if( validatePasswords(this.state.password,this.state.password_confirmation)){

                this.setState({
                    loading:true,
                },()=>{
                    request(UpdatePasswordEndpoint,this.state,true,'POST',this.handleUpdateResponse)
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
    };




    componentDidMount(){

        const token = getLocalStorage(USERTOKEN);
        const data = getLocalStorage(USERINFO);

        if(data){
            this.setState({
                token,
                email:data.email
            },()=>{
                console.log(this.state);
            })
        }

    }



    render() {
        const {password} = this.state;
        return (
            <React.Fragment>
                <div>
                        <div className="row my-5">
                            <div className='col-12'>
                                <h3>Update Password</h3>
                                <div className='line'></div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="password">Old Password</label>
                                    <input
                                        type="password"
                                        id="old_password"
                                        onChange={this.changeHandler}
                                        className="form-control mb-1"
                                        name="old_password"
                                    />

                                    {/*{this.validator.message('Old password', password, 'required|string|min:8')}*/}
                                    {this.state.passwordError ?
                                        <label className={'srv-validation-message'}>Password must contain at least one
                                            lowercase letter,
                                            one uppercase letter , one number ,one special character and must be a minimum
                                            of 8 characters
                                        </label> : null}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="password">New Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        onChange={this.changeHandler}
                                        className="form-control mb-1"
                                        name="password"
                                    />

                                    {this.validator.message('Password', password, 'required|string|min:8')}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="password_confirmation">Confirm Password</label>
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
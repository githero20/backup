import React, {Component} from 'react';
import {getLocalStorage, request} from "../../../ApiUtils/ApiUtils";
import {UpdatePasswordEndpoint} from "../../../RouteLinks/RouteLinks";
import {USERINFO, USERTOKEN} from "../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import {passwordValidator, validatePasswords} from "../../../Helpers/Helper";




class UpdatePassword extends Component {


    //fetch user info
    state = {
        token: null,
        email: null,
        password: null,
        old_password: null,
        password_confirmation: null,
        loading: false,
        passErr: false,
        // passwordError:false
    };

    // get and validate password


    constructor(props) {

        super(props);

        this.validator = passwordValidator;


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
        if (name == 'password_confirmation') {
            (!validatePasswords(this.state.password, value)) ? this.setState({passErr: true}) : this.setState({passErr: false});
        }
        this.setState({
            [name]: value
        });
    };


    // validatePassword = () => {
    //     let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    //     //^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})
    //
    //     const {password} = this.state;
    //
    //     if (strongRegex.exec(password)) {
    //         this.setState({
    //             passwordError: false,
    //         })
    //     } else {
    //         this.setState({
    //             passwordError: true,
    //         })
    //     }
    //
    // };

    handleUpdateResponse = (state, response) => {
        const {toastManager} = this.props;
        this.setState({
            loading: false
        });
        if (state) {
            console.log(response.data.message);
            toastManager.add(`${response.data.message}`, {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 3000,
            });

            this.setState({
                password: '',
                old_password: '',
                password_confirmation: '',
            });

        } else {
            console.log("error" + JSON.stringify(response));
            if (response) {
                if (response.data.message) {
                    console.log(response.data.message);
                    toastManager.add(`${response.data.message}`, {
                        appearance: 'error',
                        autoDismiss: true,
                        autoDismissTimeout: 3000,
                    })
                }

            }

        }

    };


    // update password

    submitForm = (e) => {

        e.preventDefault();

        if (this.validator.allValid()) {


            if (validatePasswords(this.state.password, this.state.password_confirmation)) {
                this.setState({
                    loading: true,
                }, () => {
                    request(UpdatePasswordEndpoint, this.state, true, 'POST', this.handleUpdateResponse)
                });

            } else {

                this.setState({
                    passErr: true
                })
            }

        } else {

            // rerender to show messages for the first time
            this.validator.showMessages();
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }


    };


    validatePass = () => {
        const {password, password_confirmation} = this.state;
        if (validatePasswords(password, password_confirmation)) {
            this.setState({
                passErr: false,
            })
        } else {
            this.setState({
                passErr: true,
            })
        }
    };


    componentDidMount() {
        const token = getLocalStorage(USERTOKEN);
        const data = getLocalStorage(USERINFO);
        if (data) {
            this.setState({
                token,
                email: data.email
            })
        }

    }


    render() {
        const {password, old_password,password_confirmation} = this.state;
        return (
            <React.Fragment>
                <div>
                    <div className="row my-5">
                        <div className='col-12'>
                            <h4 className=''>Update Password</h4>
                            <div className='line'></div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="password">Old Password</label>
                                <input
                                    type="password"
                                    id="old_password"
                                    onChange={this.changeHandler}
                                    value={old_password}
                                    className="form-control mb-1"
                                    name="old_password"
                                />
                                {this.validator.message('old password', old_password, `required|string|min:8|password`)}
                                {/*{this.validator.message('Old password', password, 'required|string|min:8')}*/}
                                {/*{this.state.passwordError ?*/}
                                {/*    <label className={'srv-validation-message'}>Password must contain at least one*/}
                                {/*        lowercase letter,*/}
                                {/*        one uppercase letter , one number ,one special character and must be a minimum*/}
                                {/*        of 8 characters*/}
                                {/*    </label> : null}*/}
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
                                    value={password}
                                    name="password"
                                />
                                {this.validator.message('password', password, `required|string|min:8|password`)}
                                {/*{this.validator.message('Password', password, 'required|string|min:8')}*/}
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
                                    value={password_confirmation}
                                    className="form-control mb-1"
                                    name="password_confirmation"
                                />

                            </div>
                            {this.state.passErr ?
                                <div className={'srv-validation-message'}>Password Doesn't match</div> : null}
                        </div>
                        <div className="col-12 text-center mt-2  text-md-right">
                            <button type="submit" onClick={this.submitForm} disabled={this.state.loading}
                                    className="btn-custom-blue round ">
                                {this.state.loading ? <ButtonLoader/> :
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
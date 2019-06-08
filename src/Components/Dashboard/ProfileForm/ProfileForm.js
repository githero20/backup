import React, {Component} from 'react';
import AvatarImage from "../../../admin/app-assets/images/portrait/small/avatar-s-19.png";
import deleteIcon from "../../../admin/app-assets/images/svg/delete-icon.svg";
import editIcon from "../../../admin/app-assets/images/svg/edit-icon.svg";
import {getLocalStorage, request} from "../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../Auth/HOC/authcontroller";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import SimpleReactValidator from "simple-react-validator";
import {UpdatePasswordEndpoint} from "../../../RouteLinks/RouteLinks";


class ProfileForm extends Component {


    state = {
        password: '',
        token: '',
        password_confirmation: '',
        ConfirmPassError: false,
        loading: false,
        userProfile: null

    };


    setupProfile = (data) => {
        const profile = JSON.parse(data);
        this.setState({
            userProfile: profile,
        })

    }


    componentDidMount() {
        // fetch User info
        const data = getLocalStorage(USERINFO);
        if (data) {
            this.setupProfile(data);
        }
    }


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
        const {userProfile} = this.state;
        return (
            <React.Fragment>

                            <div>
                                <form className="form lock-form px-md-1">
                                    <div className="form-body">
                                        <div className="row mb-2">
                                            <div className="col-md-4">
                                                <div className=" mb-1 d-inline d-md-block">
                                                    <img src={AvatarImage}
                                                         className="height-100 rounded-circle" alt=""/>
                                                </div>
                                                <div className="d-inline ml-1 ml-md-0 d-md-flex">
                                                    <button type="button"
                                                            className="btn-sm-outline mr-1"><img
                                                        className="img-2x"
                                                        src={deleteIcon}/>
                                                    </button>
                                                    <button type="button"
                                                            className="btn-sm-outline"><img
                                                        className="img-2x"
                                                        src={editIcon}/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h4 className="my-2 mt-md-0 mb-md-2">General</h4>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Name</label>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                className="form-control mb-1"
                                                                name="name"
                                                                defaultValue={userProfile?userProfile.name:null}
                                                            />
                                                            {/*{this.validator.message('name', name, 'required|string')}*/}

                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div
                                                            className="custom-form-group form-group">
                                                            <label htmlFor="email"
                                                                   className="active">Email</label>
                                                            {/*<div>*/}
                                                            {/*    <input type="email"*/}
                                                            {/*           id="email"*/}
                                                            {/*           name='email'*/}
                                                            {/*           className="form-control"*/}
                                                            {/*           placeholder="Email"*/}
                                                            {/*           disabled={true}*/}
                                                            {/*           defaultValue={userProfile.email}*/}
                                                            {/*           aria-describedby="button-addon2"/>*/}
                                                            {/*    <div*/}
                                                            {/*        className="input-group-append">*/}
                                                            {/*        <button*/}
                                                            {/*            className="btn light-gray-bg deep-gray-color"*/}
                                                            {/*            type="button">Change*/}
                                                            {/*            Email*/}
                                                            {/*        </button>*/}
                                                            {/*    </div>*/}
                                                            {/*</div>*/}
                                                            <div>
                                                                <input type="email"
                                                                       id="email"
                                                                       name='email'
                                                                       className="form-control"
                                                                       placeholder="Email"
                                                                       disabled={true}
                                                                       defaultValue={userProfile? userProfile.email:null}
                                                                       aria-describedby="button-addon2"
                                                                />
                                                            </div>
                                                            {/*<div className="input-group">*/}
                                                            {/*    <input type="email"*/}
                                                            {/*           id="email"*/}
                                                            {/*           name='email'*/}
                                                            {/*           className="form-control"*/}
                                                            {/*           placeholder="Email"*/}
                                                            {/*           disabled={true}*/}
                                                            {/*           defaultValue={userProfile.email}*/}
                                                            {/*           aria-describedby="button-addon2"/>*/}
                                                            {/*    <div*/}
                                                            {/*        className="input-group-append">*/}
                                                            {/*        <button*/}
                                                            {/*            className="btn light-gray-bg deep-gray-color"*/}
                                                            {/*            type="button">Change*/}
                                                            {/*            Email*/}
                                                            {/*        </button>*/}
                                                            {/*    </div>*/}
                                                            {/*</div>*/}
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phoneNumber">Phone
                                                        Number</label>
                                                    <input
                                                        type="number"
                                                        id="phoneNumber"
                                                        className="form-control mb-1"
                                                        name="phoneNumber"
                                                        defaultValue={userProfile?userProfile.phone:null}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group form-group-outline">
                                                    <label htmlFor="email" className="active">Referral
                                                        Code</label>
                                                    <div className="input-group">
                                                        <input type="email" id="referral_code"
                                                               className="form-control"
                                                               defaultValue={userProfile?userProfile.referral_code:null}
                                                               aria-describedby="button-addon2"
                                                        />

                                                        <div className="input-group-append">
                                                            <button
                                                                className="btn light-gray-bg deep-gray-color"
                                                                type="button">Copy
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <UpdatePassword/>
                                    </div>
                                </form>
                            </div>
            </React.Fragment>
        );
    }
}

export default ProfileForm;
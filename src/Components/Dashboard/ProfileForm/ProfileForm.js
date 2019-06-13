import React, {Component} from 'react';
import AvatarImage from "../../../admin/app-assets/images/portrait/small/avatar-s-19.png";
import deleteIcon from "../../../admin/app-assets/images/svg/delete-icon.svg";
import editIcon from "../../../admin/app-assets/images/svg/edit-icon.svg";
import {getLocalStorage, request} from "../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../Auth/HOC/authcontroller";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import SimpleReactValidator from "simple-react-validator";


class ProfileForm extends Component {


    state = {
        password: '',
        token: '',
        password_confirmation: '',
        ConfirmPassError: false,
        loading: false,
        userProfile: null

    };


    // setupProfile = (data) => {
    //     const profile = JSON.parse(data);
    //     this.setState({
    //         userProfile: profile,
    //     })
    //
    // };
    //

    // componentDidMount() {
    //     // fetch User info
    //     const data = getLocalStorage(USERINFO);
    //     if (data) {
    //         this.setupProfile(data);
    //     }
    // }


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

    copyToClipboard = str => {
        const el = document.createElement('textarea');  // Create a <textarea> element
        el.value = str;                                 // Set its value to the string that you want copied
        el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
        el.style.position = 'absolute';
        el.style.left = '-9999px';                      // Move outside the screen to make it invisible
        document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
        const selected =
            document.getSelection().rangeCount > 0        // Check if there is any content selected previously
                ? document.getSelection().getRangeAt(0)     // Store selection if found
                : false;                                    // Mark as false to know no selection existed before
        el.select();                                    // Select the <textarea> content
        document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el);                  // Remove the <textarea> element
        if (selected) {                                 // If a selection existed before copying
            document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
            document.getSelection().addRange(selected);   // Restore the original selection
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
        const {userProfile} = this.props;
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
                                                <label htmlFor="name">First Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    disabled
                                                    className="form-control mb-1"
                                                    name="name"
                                                    defaultValue={userProfile ? userProfile.name : null}
                                                />
                                                {/*{this.validator.message('name', name, 'required|string')}*/}

                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="lastname">Last Name</label>
                                                <input
                                                    type="text"
                                                    id="lastname"
                                                    disabled
                                                    className="form-control mb-1"
                                                    name="last_name"
                                                    defaultValue={userProfile ? userProfile.last_name : null}
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
                                                           disabled
                                                           defaultValue={userProfile ? userProfile.email : null}
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
                                            disabled
                                            className="form-control mb-1"
                                            name="phoneNumber"
                                            defaultValue={userProfile ? userProfile.phone : null}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group form-group-outline">
                                        <label htmlFor="email" className="active">Referral
                                            Code</label>
                                        <div className="input-group">
                                            <input type="text" id="referral_code" name="referral_code"
                                                   className="form-control"
                                                   value={userProfile ? userProfile.referral_code : null}
                                                   aria-describedby="button-addon2"
                                            />

                                            <div className="input-group-append">
                                                <button onClick={this.copyToClipboard}
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
import React, {Component} from 'react';
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import SimpleReactValidator from "simple-react-validator";
import {withToastManager} from 'react-toast-notifications';
import {capitalize} from "../../../Helpers/Helper";
import UpdateWithdrawalPin from "../UpdateWithdrawalPin/UpdateWithdrawalPin";

class ProfileForm extends Component {


    state = {
        password: '',
        token: '',
        password_confirmation: '',
        ConfirmPassError: false,
        loading: false,
        userProfile: null,
        copySuccess: false

    };

    constructor(props) {

        super(props);

        this.validator = new SimpleReactValidator();
        this.toastMessage = this.toastMessage.bind(this);
    }

    //Retrieves user inputs
    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    toastMessage(message, status) {
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    }


    copyToClipboard = (e) => {

        // let text = document.getElementById("referral_code").value;

        let textField = document.createElement('textarea');

        const referralText =
            this.props.userProfile ? capitalize(this.props.userProfile.name) : null
            + ' ' +
            this.props.userProfile ? capitalize(this.props.userProfile.last_name) : null;
        const otherText = 'invites you to save for the rainy day on BackUpCash.' +
            '\n It is a financial planning tool designed to help you automate ' +
            'savings towards a financial goal. Sign-up and get started using the link below: \n';
        textField.innerText = referralText + ' ' + otherText  + this.props.userProfile.referral_link;

        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        this.toastMessage('Copied!', 'success');
        this.setState({copySuccess: true});
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
                    <div className="form lock-form px-md-1 text-capitalize">
                        <div className="form-body">
                            <div className="row mb-2">
                                {/*<div className="col-md-4">*/}
                                {/*<div className=" mb-1 d-inline d-md-block">*/}
                                {/*    <img src={AvatarImage}*/}
                                {/*         className="height-100 rounded-circle" alt=""/>*/}
                                {/*</div>*/}
                                {/*<div className="d-inline ml-1 ml-md-0 d-md-flex">*/}
                                {/*    <button type="button"*/}
                                {/*            className="btn-sm-outline mr-1"><img*/}
                                {/*        className="img-2x"*/}
                                {/*        src={deleteIcon}/>*/}
                                {/*    </button>*/}
                                {/*    <button type="button"*/}
                                {/*            className="btn-sm-outline"><img*/}
                                {/*        className="img-2x"*/}
                                {/*        src={editIcon}/>*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4 className="mt-md-0 ">General</h4>
                                            <div className='line'></div>
                                        </div>
                                        <div className="col-12 col-lg-6">
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
                                        <div className="col-12 col-lg-6">
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
                                        <div className="col-md-12 col-lg-6">
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
                                        <div className="col-md-12 col-lg-6">
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
                                    </div>

                                </div>

                            </div>
                            <div className="row">
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
                            <UpdateWithdrawalPin/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withToastManager(ProfileForm);
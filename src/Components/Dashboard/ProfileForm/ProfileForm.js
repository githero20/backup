import React, {Component} from 'react';
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import SimpleReactValidator from "simple-react-validator";
import {withToastManager} from 'react-toast-notifications';
import {capitalize} from "../../../Helpers/Helper";
import UpdateWithdrawalPin from "../UpdateWithdrawalPin/UpdateWithdrawalPin";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import {updateUserProfile} from "../../../actions/UserAction";

class ProfileForm extends Component {


    state = {
        password: '',
        token: '',
        password_confirmation: '',
        ConfirmPassError: false,
        loading: false,
        userProfile: null,
        copySuccess: false,
        email:'',

    };

    constructor(props) {

        super(props);

        // this.validator = new SimpleReactValidator();
        this.toastMessage = this.toastMessage.bind(this);
    }

    //Retrieves user inputs
    // changeHandler = event => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     let userProfile = {...this.state.userProfile};
    //     userProfile[name] = value;
    //     this.setState({userProfile});
    // };

    toastMessage(message, status) {
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    }

    // submitForm = (e) => {
    //     e.preventDefault();
    //     if (this.validator.allValid()) {
    //         updateUserProfile(this.state.userProfile, (state, res) => {
    //             console.log('res', state, res);
    //         })
    //     } else {
    //         this.validator.showMessages();
    //         this.forceUpdate();
    //     }
    // };

    // componentWillReceiveProps(nextProps) {
    //     this.setState({userProfile: nextProps.userProfile})
    // }


    copyToClipboard = (e) => {
        let textField = document.createElement('textarea');
        const referralText =
            this.props.userProfile ? capitalize(this.props.userProfile.name) : null
            + ' ' +
            this.props.userProfile ? capitalize(this.props.userProfile.last_name) : null;
        const otherText = 'invites you to save for the rainy day on BackUpCash.' +
            '\n It is a financial planning tool designed to help you automate ' +
            'savings towards a financial goal. Sign-up and get started using the link below: \n';
        textField.innerText = referralText + ' ' + otherText + this.props.userProfile.referral_link;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        this.toastMessage('Copied!', 'success');
        this.setState({copySuccess: true});
    };


    getEmail = (e) =>{
        this.setState({
            email:e.target.value
        })
    };

    updateEmail = () => {

        //validate email
        
        // get email

        // update email

    };


    render() {
        const {userProfile} = this.props;

        let emailInput = null;
        if (userProfile && userProfile.email == '') {
            emailInput = (
                <div>
                    <div className="input-group">
                        <input id="email" type="password" name={'email'}
                               className={'form-control pl-0'}
                               onChange={this.getEmail}
                        />
                        <div className="input-group-append">
                            <button id='pass-toggle' name="pass-toggle"
                                   onClick={this.updateEmail}  className="btn btn-custom-blue">Update Email
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else {
            emailInput = (
                <div>
                    <input type="email"
                           id="email"
                           name='email'
                           className="form-control"
                           placeholder="Email"
                           disabled
                        // onChange={this.changeHandler}
                           defaultValue={userProfile ? userProfile.email : null}
                    />
                </div>
            )
        }

        return (
            <React.Fragment>
                <div>
                    <div className="form lock-form px-md-1 text-lowercase">
                        <div className="form-body">
                            <div>
                                <div className="row mb-2">
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
                                                        // onChange={this.changeHandler}
                                                        className="form-control mb-1"
                                                        name="name"
                                                        defaultValue={userProfile ? userProfile.name : null}
                                                    />
                                                    {/*{this.validator.message('name', userProfile.name, 'required|string')}*/}

                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastname">Last Name</label>
                                                    <input
                                                        type="text"
                                                        id="lastname"
                                                        className="form-control mb-1"
                                                        name="last_name"
                                                        disabled
                                                        // onChange={this.changeHandler}
                                                        defaultValue={userProfile ? userProfile.last_name : null}
                                                    />
                                                    {/*{this.validator.message('name', name, 'required|string')}*/}
                                                    {/*{this.validator.message('last name', userProfile.last_name, 'required|string')}*/}
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-lg-6">
                                                <div className="custom-form-group form-group">
                                                    <label htmlFor="email" className="active">Email</label>
                                                    {emailInput}
                                                </div>
                                            </div>

                                            <div className="col-md-12 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone Number</label>
                                                    <input
                                                        type="number"
                                                        id="phone"
                                                        disabled
                                                        className="form-control mb-1"
                                                        name="phone"
                                                        // onChange={this.changeHandler}
                                                        defaultValue={userProfile ? userProfile.phone : null}
                                                    />
                                                    {/*{this.validator.message('phone', userProfile.phone, 'required|phone')}*/}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/*<div className="col-12 text-center mt-2  text-md-right">*/}
                                    {/*    <button type="button" onClick={this.submitForm} disabled={this.state.loading}*/}
                                    {/*            className="btn-custom-blue round ">*/}
                                    {/*        {this.state.loading ? <ButtonLoader/> :*/}
                                    {/*            <span>Update Profile</span>}*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}

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
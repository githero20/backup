import React, {Component} from 'react';
import AvatarImage from "../../../admin/app-assets/images/portrait/small/avatar-s-19.png";
import deleteIcon from "../../../admin/app-assets/images/svg/delete-icon.svg";
import editIcon from "../../../admin/app-assets/images/svg/edit-icon.svg";


function setupProfile(data) {




}


function fetchUserinfo(Data){



}

class ProfileForm extends Component {


    state={



    }


    componentDidMount() {

        // fetch User info



    }


    render() {
        return (
            <React.Fragment>
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
                                    <div className="col-6">
                                        <div className="input-field ">
                                            <input placeholder="Placeholder"
                                                   id="first_name" type="text"
                                                   className="validate" />
                                            <label htmlFor="first_name"
                                                   className="active">First
                                                Name</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-field ">
                                            <input placeholder="Placeholder"
                                                   id="last_name" type="text"
                                                   className="validate" />
                                            <label htmlFor="last_name"
                                                   className="active">Last
                                                Name</label>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div
                                            className="custom-form-group form-group">
                                            <label htmlFor="email"
                                                   className="active">Email</label>
                                            <div className="input-group">
                                                <input type="email" id="email"
                                                       className="form-control"
                                                       placeholder="Email"
                                                       aria-describedby="button-addon2" />
                                                <div
                                                    className="input-group-append">
                                                    <button
                                                        className="btn light-gray-bg deep-gray-color"
                                                        type="button">Change
                                                        Email
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="accountToDebit">Country</label>
                                    <select id="accountToDebit" name="interested"
                                            className="form-control">
                                        <option value="none" defaultValue={true}
                                                disabled="">Country
                                        </option>
                                        <option value="Master Card">Master Card
                                        </option>
                                        <option value="Visa Card">Visa Card</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone
                                        Number</label>
                                    <input type="number" id="phoneNumber"
                                           className="form-control mb-1"
                                           name="phoneNumber"/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group form-group-outline">
                                    <label htmlFor="email" className="active">Referral
                                        Code</label>
                                    <div className="input-group">
                                        <input type="email" id="referralCode"
                                               className="form-control"
                                               placeholder="ODFVEV"
                                               aria-describedby="button-addon2" />
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
                        <div className="row">
                            <div className='col-12'>
                                <div className='mb-2 mt-3'>

                                    <h4>Update Password</h4>
                                    <hr/>
                                </div>

                            </div>
                            <div className="col-md-6 d-none d-md-block">
                                <div className="form-group">
                                    <label htmlFor="startDate">New Password</label>
                                    <input type="password" id="newPassword"
                                           className="form-control"
                                           name="newPassword"/>
                                </div>
                            </div>
                            <div className="col-md-6 d-none d-md-block">
                                <div className="form-group">
                                    <label htmlFor="startDate">Confirm
                                        Password</label>
                                    <input type="password" id="confirmPassword"
                                           className="form-control"
                                           name="confirmPassword"/>
                                </div>
                            </div>
                            <div className="col-md-4 d-block d-md-none">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password"
                                           className="form-control"
                                           name="confirmPassword"/>
                                </div>
                            </div>

                            <div className="col-md-4 d-block d-md-none">
                                <div className="form-group">
                                    <button type="button"
                                            className="label-btn">Change Password
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div
                        className="form-actions d-flex justify-content-between align-items-center ">
                        <button type="button"
                                className="btn reset-btn mr-1 d-none d-md-block">
                            reset
                        </button>
                        <button type="button"
                                className="btn btn-outline-gray px-2 round mr-1 d-block d-md-none">
                            Cancel
                        </button>
                        <button type="submit" className="btn-withdraw round ">
                            Update Profile
                        </button>
                    </div>
                </form>

            </React.Fragment>
        );
    }
}

export default ProfileForm;
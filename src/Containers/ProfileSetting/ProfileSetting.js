import React, {Component} from 'react';
import HorizonalNav from "../../Components/Dashboard/HorizontalNav/HorizonalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import deleteIcon from "../../admin/app-assets/images/svg/delete-icon.svg";
import avatar from "../../admin/app-assets/images/avatar@2x.png";
import editIcon from "../../admin/app-assets/images/svg/edit-icon.svg";

class ProfileSetting extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizonalNav/>
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">
                                    <div
                                        className="bg-white shadow-sm dashboard-callout callout-border-right clearfix callout-round callout-transparent mt-1 px-2 py-2 py-1">
                                        <strong>Congrats! </strong>
                                        <span className="mr-3">you referred 5 persons from [ 1 -2-2019 to 5-2-2019 ] ,
                                        <span className="admin-purple d-block d-md-inline">Your referral points earned</span> </span>
                                        <span className=" d-block d-md-inline">25 points</span>
                                        <label className="pull-right"><span className="mr-2"> copy referral code</span>
                                            <span className="code-btn">AEC45SF</span></label>
                                    </div>
                                </div>
                            </div>

                            <div className="content-header row">
                            </div>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-8 col-12">
                                        <h3 className="gray-header-text mb-2 ">Profile

                                        </h3>
                                        <div className="card curved-radius">
                                            <div className="card-content collapse show">
                                                <div className="card-header">
                                                    <h4 className="card-title">Profile Settings</h4>
                                                </div>
                                                <div className="card-body px-md-3 py-md-3">

                                                    <form className="form lock-form px-md-1">
                                                        <div className="form-body">
                                                            <div className="row mb-2">
                                                                <div className="col-md-4">
                                                                    <div className=" mb-1 d-inline d-md-block">
                                                                        <img src={avatar}
                                                                             className="height-100" alt=""/>
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
                                                                <div className="col-md-4 d-none d-md-block">
                                                                    <div className="form-group">
                                                                        <label htmlFor="projectinput1">Old
                                                                            Password</label>
                                                                        <input type="password" id="oldPassword"
                                                                               className="form-control mb-1"
                                                                               name="oldPassword"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 d-none d-md-block">
                                                                    <div className="form-group">
                                                                        <label htmlFor="startDate">New Password</label>
                                                                        <input type="password" id="newPassword"
                                                                               className="form-control"
                                                                               name="newPassword"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 d-none d-md-block">
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default ProfileSetting;
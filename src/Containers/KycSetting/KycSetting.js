import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";

class KycSetting extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav/>
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">
                                    {/* TODO Add Message box */}
                                    {/*<MessageBox/>*/}
                                </div>
                            </div>
                            <div className="content-header row">
                            </div>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-12 col-12">
                                        <h3 className="gray-header-text mb-2 ">New Savings Plan

                                        </h3>
                                        <section id="basic-form-layouts">
                                            <div className="row match-height">
                                                <div className="col-md-6">
                                                    <div className="card curved-radius"
                                                         data-height="60px">
                                                        <div className="card-header">
                                                            <h4 className="card-title"
                                                                id="basic-layout-form">General</h4>
                                                            <a className="heading-elements-toggle"><i
                                                                className="la la-ellipsis-v font-medium-3"></i></a>
                                                            <div className="heading-elements">
                                                                <ul className="list-inline mb-0">
                                                                    <li><a data-action="collapse"><i
                                                                        className="ft-minus"></i></a></li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="card-content collapse show" >
                                                            <div className="card-body px-5">

                                                                <form className="form lock-form">
                                                                    <div className="form-body">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label
                                                                                        htmlFor="gender">Gender</label>
                                                                                    <select id="gender"
                                                                                            name="interested"
                                                                                            className="form-control">
                                                                                        <option value="none" selected=""
                                                                                                disabled="">Male
                                                                                        </option>
                                                                                        <option value="design">design
                                                                                        </option>
                                                                                        <option
                                                                                            value="development">development
                                                                                        </option>
                                                                                        <option
                                                                                            value="illustration">illustration
                                                                                        </option>
                                                                                        <option
                                                                                            value="branding">branding
                                                                                        </option>
                                                                                        <option value="video">video
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label
                                                                                        htmlFor="relationship">Relationship</label>
                                                                                    <select id="relationship"
                                                                                            name="interested"
                                                                                            className="form-control">
                                                                                        <option value="none" selected=""
                                                                                                disabled="">
                                                                                            Single
                                                                                        </option>
                                                                                        <option value="design">design
                                                                                        </option>
                                                                                        <option
                                                                                            value="development">development
                                                                                        </option>
                                                                                        <option
                                                                                            value="illustration">illustration
                                                                                        </option>
                                                                                        <option
                                                                                            value="branding">branding
                                                                                        </option>
                                                                                        <option value="video">video
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="employment">Employment
                                                                                        Status</label>
                                                                                    <select id="employment"
                                                                                            name="interested"
                                                                                            className="form-control">
                                                                                        <option value="none" selected=""
                                                                                                disabled="">Self
                                                                                            Employed
                                                                                        </option>
                                                                                        <option value="design">design
                                                                                        </option>
                                                                                        <option
                                                                                            value="development">development
                                                                                        </option>
                                                                                        <option
                                                                                            value="illustration">illustration
                                                                                        </option>
                                                                                        <option
                                                                                            value="branding">branding
                                                                                        </option>
                                                                                        <option value="video">video
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="annualincome">Annual
                                                                                        Income</label>
                                                                                    <select id="annualincome"
                                                                                            name="interested"
                                                                                            className="form-control">
                                                                                        <option value="none" selected=""
                                                                                                disabled="">Less
                                                                                            than ₦ 15,000
                                                                                        </option>
                                                                                        <option value="design">design
                                                                                        </option>
                                                                                        <option
                                                                                            value="development">development
                                                                                        </option>
                                                                                        <option
                                                                                            value="illustration">illustration
                                                                                        </option>
                                                                                        <option
                                                                                            value="branding">branding
                                                                                        </option>
                                                                                        <option value="video">video
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    <label htmlFor="companyName">Mothers
                                                                                        maiden Name</label>
                                                                                    <input type="text" id="companyName"
                                                                                           className="form-control"
                                                                                           placeholder="Company Name"
                                                                                           name="company"/>
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    <label htmlFor="companyName">Date of
                                                                                        Birth</label>
                                                                                    <input type="date" id="dateofbirth"
                                                                                           className="form-control"
                                                                                           placeholder="Company Name"
                                                                                           name="company"/>
                                                                                </div>

                                                                            </div>

                                                                            <div className="col-md-12">

                                                                                <div className="form-group">
                                                                                    <label
                                                                                        htmlFor="address">Address</label>
                                                                                    <textarea id="address" rows="5"
                                                                                              className="form-control"
                                                                                              name="comment"/>
                                                                                </div>

                                                                            </div>


                                                                        </div>


                                                                    </div>

                                                                    <div className="form-actions clearfix">
                                                                        <button type="button"
                                                                                className="btn  btn-bg-shade-2 px-3 py-1 round pull-right">Update
                                                                            KYC
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="card curved-radius" >
                                                        <div className="card-header">
                                                            <h4 className="card-title"
                                                                id="basic-layout-colored-form-control">
                                                                Identification</h4>
                                                            <a className="heading-elements-toggle"><i
                                                                className="la la-ellipsis-v font-medium-3"></i></a>
                                                            <div className="heading-elements">
                                                                <ul className="list-inline mb-0">
                                                                    <li><a data-action="collapse"><i
                                                                        className="ft-plus"></i></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="card-content collapse" >
                                                            <div className="card-body px-5">


                                                                <form className="form lock-form">
                                                                    <div className="form-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="identification">Identification
                                                                                        Type - ID Type</label>
                                                                                    <select id="identification"
                                                                                            name="interested"
                                                                                            className="form-control">
                                                                                        <option value="none" selected=""
                                                                                                disabled="">Driver's
                                                                                            License
                                                                                        </option>
                                                                                        <option value="design">design
                                                                                        </option>
                                                                                        <option
                                                                                            value="development">development
                                                                                        </option>
                                                                                        <option
                                                                                            value="illustration">illustration
                                                                                        </option>
                                                                                        <option
                                                                                            value="branding">branding
                                                                                        </option>
                                                                                        <option value="video">video
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="userinput2">Identification
                                                                                        Number</label>
                                                                                    <input type="text" id="userinput2"
                                                                                           className="form-control "
                                                                                           placeholder="Company"
                                                                                           name="company"/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="userinput2">Identification
                                                                                        Number</label>
                                                                                    <input type="text" id="userinput2"
                                                                                           className="form-control "
                                                                                           placeholder="Company"
                                                                                           name="company"/>
                                                                                </div>
                                                                            </div>
                                                                            <div className=" col-md-12">

                                                                                <div className="form-group">
                                                                                    <div className="custom-file">
                                                                                        <input type="file"
                                                                                               className="custom-file-input"
                                                                                               id="inputGroupFile01"/>
                                                                                            <label
                                                                                                className="custom-file-label"
                                                                                                htmlFor="inputGroupFile01">Browse</label>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    <label htmlFor="issuedate">Id Issue
                                                                                        Date</label>
                                                                                    <input type="date" id="issuedate"
                                                                                           className="form-control"
                                                                                           placeholder="Company Name"
                                                                                           name="company"/>
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    <label htmlFor="expirydate">Id
                                                                                        Expiry Date</label>
                                                                                    <input type="date" id="expirydate"
                                                                                           className="form-control"
                                                                                           placeholder="Company Name"
                                                                                           name="company"/>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    <label>Please Re-Enter
                                                                                        Password</label>
                                                                                    <input className="form-control "
                                                                                           id="userinput7"
                                                                                           type="password"
                                                                                           placeholder="password"/>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                    </div>

                                                                    <div className="form-actions right">
                                                                        <button type="button"
                                                                                className="btn  btn-bg-shade-2 round px-3 py-1 ">
                                                                            Save
                                                                        </button>
                                                                    </div>
                                                                </form>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
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
export default KycSetting;
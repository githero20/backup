import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import listIcon from "../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../admin/app-assets/images/svg/grid-icon.svg";
import tableArrowLeft from "../../admin/app-assets/images/svg/table-arrow-left.svg";
import sortIcon from "../../admin/app-assets/images/svg/sort-icon.svg";
import addSavingsIcon from "../../admin/app-assets/images/svg/add-lock-saving.svg";

class BackupGoals extends Component {
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
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Back Up Goals
                                        </h3>
                                    </div>

                                </div>


                                <div className="row">
                                    <div id="Back-up-goals" className="col-12 col-md-12">
                                        <div className="card">
                                            <div className="card-content mt-1 px-2 px-md-5 py-md-3">
                                                <div
                                                    className="table-header d-flex justify-content-between align-items-md-center px-md-2  mb-3">
                                                    <h4 className="table-title">
                                                        <button className=" right-btn-holder deep-blue-bg white "
                                                                data-toggle="modal" data-target="#large">
                                                            <img src={addSavingsIcon}/>
                                                            New Goals
                                                        </button>
                                                    </h4>
                                                    <ul className=" mb-0 locked-saving-display d-none d-md-inline-block">
                                                        <li>1 &nbsp; Locked saving</li>
                                                    </ul>
                                                    <div className="table-button-container d-none d-md-inline-block">
                                     <span
                                         className="mr-md-1 table-grid-view-icon img-2x list-btn active d-block d-md-inline">
                                         <img src={listIcon} className=" img-2x "/>
                                     </span>
                                                        <span
                                                            className="mr-md-1 table-grid-view-icon img-2x  grid-btn d-block d-md-inline">
                                        <img src={gridIcon} className=" img-2x "/>
                                    </span>
                                                        <span className="table-view-display d-block d-md-inline">
                                        <img src={tableArrowLeft}
                                             className="mr-1 img-1x"/> grid view
                                    </span>
                                                    </div>
                                                    <div className="table-sort-display d-block d-md-inline"><span>
                                    <img className=" img-2x " src={sortIcon} />
                                </span>sort
                                                    </div>
                                                    <div className="table-sort-display d-none d-md-inline">
                                                        <button type="button" className="btn-green">Export CSV</button>
                                                    </div>
                                                </div>
                                                {/* modal */}
                                                <div className="modal custom-modal fade text-left" id="large"
                                                     tabIndex="-1" role="dialog" aria-labelledby="myModalLabel17"
                                                     aria-hidden="true">
                                                    <div className="modal-dialog modal-lg" role="document">
                                                        <div className="modal-content curved-radius">
                                                            <div className="modal-header">
                                                                <h4 className="modal-title" id="myModalLabel17">New
                                                                    Locked Saving</h4>
                                                                <button type="button" className="close"
                                                                        data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">×</span>
                                                                </button>
                                                            </div>
                                                            <form className="lock-form">
                                                                <div className="modal-body">
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <fieldset
                                                                                className="form-group floating-label-form-group">
                                                                                <label htmlFor="name">Locked Savings
                                                                                    name</label>
                                                                                <input type="text"
                                                                                       className="form-control"
                                                                                       id="name"
                                                                                       placeholder="Toyota Venza"/>
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <fieldset
                                                                                className="form-group floating-label-form-group">
                                                                                <label htmlFor="date">Maturity
                                                                                    Date</label>
                                                                                <input type="date"
                                                                                       className="form-control mb-1"
                                                                                       id="date"/>
                                                                                    <label>Date when funds should be
                                                                                        returned to your
                                                                                        BackupCash savings</label>
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="col">
                                                                            <fieldset
                                                                                className="form-group floating-label-form-group">
                                                                                <label htmlFor="email">Capital
                                                                                    Investment [ N ]</label>
                                                                                <input type="text"
                                                                                       className="form-control mb-1"
                                                                                       id="capital" placeholder="0"/>
                                                                                <label>Amount to be removed
                                                                                    instantly from your
                                                                                    BackupCash “ Central Vault ” and
                                                                                    locked away</label>
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>

                                                                    <br/>
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <fieldset
                                                                                    className="form-group floating-label-form-group ">
                                                                                    <label htmlFor="email">Upfront
                                                                                        Interest [ N ]</label>
                                                                                    <div className="interest-fieldset">
                                                                                        <input type="text"
                                                                                               className="form-control mb-1"
                                                                                               id="email"
                                                                                               placeholder="0.01"/>
                                                                                            <label
                                                                                                className="label-interest">0.68%
                                                                                                for
                                                                                                19days</label>
                                                                                    </div>
                                                                                    <label>This upfront interest will be
                                                                                        deposited in your
                                                                                        BackupCash "Central Vault" and
                                                                                        can be
                                                                                        withdrawn immediately.</label>
                                                                                </fieldset>
                                                                            </div>
                                                                        </div>

                                                                </div>
                                                                <div className="modal-footer text-center text-md-right">
                                                                    <input type="reset"
                                                                           className="btn btn-outline-secondary px-md-3 round btn-lg"
                                                                           data-dismiss="modal" value="cancel" />
                                                                        <input type="submit"
                                                                               className="btn btn-bg-shade-2 btn-lg white px-md-3 round"
                                                                               value="lock Savings" />
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="box-grid-container  light-blue-bg px-md-3 py-md-3">
                                                    <div className="table-view table-responsive mb-5">
                                                        <table id="recent-orders"
                                                               className="table table-hover table-xl mb-0 spaced-table">
                                                            <thead>
                                                            <tr>
                                                                <th className="border-top-0 d-none d-md-inline">#</th>
                                                                <th className="border-top-0 d-none d-md-inline">Name</th>
                                                                <th className="border-top-0 d-md-none">Description</th>
                                                                <th className="border-top-0 d-none d-md-inline">Amount</th>
                                                                <th className="border-top-0 ">Interest</th>
                                                                <th className="border-top-0 ">Start Date</th>
                                                                <th className="border-top-0 ">End Date</th>
                                                                <th className="border-top-0 d-none d-md-inline">Status</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td className="text-truncate d-none d-md-inline ">
                                                                    <span
                                                                        className="text-light-purple mr-1 ">001 </span>
                                                                </td>
                                                                <td className="text-truncate d-none d-md-inline">
                                                                    Summer vacation
                                                                </td>
                                                                <td className="d-md-none">
                                                                    <div>
                                                                        Summer vacation
                                                                    </div>
                                                                    <strong className="black">
                                                                        ₦<span>400,000</span>
                                                                    </strong>
                                                                </td>
                                                                <td className="d-none d-md-inline">
                                                                    400,000
                                                                </td>
                                                                <td>
                                                                    <label>+40%</label>
                                                                </td>
                                                                <td className="text-truncate text-deep-purple">1st jan
                                                                    2019
                                                                </td>
                                                                <td className="text-truncate">22nd Aug 2019</td>
                                                                <td className="text-truncate d-none d-md-inline"><span
                                                                    className="text-very-light-purple mr-1">Completed </span>
                                                                </td>

                                                            </tr>
                                                            <tr>
                                                                <td className="text-truncate d-none d-md-inline ">
                                                                    <span
                                                                        className="text-light-purple mr-1 ">001 </span>
                                                                </td>
                                                                <td className="text-truncate d-none d-md-inline">
                                                                    Summer vacation
                                                                </td>
                                                                <td className="d-md-none">
                                                                    <div>
                                                                        Summer vacation
                                                                    </div>
                                                                    <strong className="black">
                                                                        ₦<span>400,000</span>
                                                                    </strong>
                                                                </td>
                                                                <td className="d-none d-md-inline">
                                                                    400,000
                                                                </td>
                                                                <td>
                                                                    <label>+40%</label>
                                                                </td>
                                                                <td className="text-truncate text-deep-purple">1st jan
                                                                    2019
                                                                </td>
                                                                <td className="text-truncate">22nd Aug 2019</td>
                                                                <td className="text-truncate d-none d-md-inline"><span
                                                                    className="text-deep-purple mr-1">In Progress </span>
                                                                </td>

                                                            </tr>

                                                            <tr>
                                                                <td className="text-truncate d-none d-md-inline ">
                                                                    <span
                                                                        className="text-light-purple mr-1 ">001 </span>
                                                                </td>
                                                                <td className="text-truncate d-none d-md-inline">
                                                                    Summer vacation
                                                                </td>
                                                                <td className="d-md-none">
                                                                    <div>
                                                                        Summer vacation
                                                                    </div>
                                                                    <strong className="black">
                                                                        ₦<span>400,000</span>
                                                                    </strong>
                                                                </td>
                                                                <td className="d-none d-md-inline">
                                                                    400,000
                                                                </td>
                                                                <td>
                                                                    <label>+40%</label>
                                                                </td>
                                                                <td className="text-truncate text-deep-purple">1st jan
                                                                    2019
                                                                </td>
                                                                <td className="text-truncate">22nd Aug 2019</td>
                                                                <td className="text-truncate d-none d-md-inline"><span
                                                                    className="text-deep-purple mr-1">In Progress </span>
                                                                </td>

                                                            </tr>
                                                            <tr>
                                                                <td className="text-truncate d-none d-md-inline ">
                                                                    <span
                                                                        className="text-light-purple mr-1 ">001 </span>
                                                                </td>
                                                                <td className="text-truncate d-none d-md-inline">
                                                                    Summer vacation
                                                                </td>
                                                                <td className="d-md-none">
                                                                    <div>
                                                                        Summer vacation
                                                                    </div>
                                                                    <strong className="black">
                                                                        ₦<span>400,000</span>
                                                                    </strong>
                                                                </td>
                                                                <td className="d-none d-md-inline">
                                                                    400,000
                                                                </td>
                                                                <td>
                                                                    <label>+40%</label>
                                                                </td>
                                                                <td className="text-truncate text-deep-purple">1st jan
                                                                    2019
                                                                </td>
                                                                <td className="text-truncate">22nd Aug 2019</td>
                                                                <td className="text-truncate d-none d-md-inline"><span
                                                                    className="text-deep-purple mr-1">In Progress </span>
                                                                </td>

                                                            </tr>

                                                            <tr>
                                                                <td className="text-truncate d-none d-md-inline ">
                                                                    <span
                                                                        className="text-light-purple mr-1 ">001 </span>
                                                                </td>
                                                                <td className="text-truncate d-none d-md-inline">
                                                                    Summer vacation
                                                                </td>
                                                                <td className="d-md-none">
                                                                    <div>
                                                                        Summer vacation
                                                                    </div>
                                                                    <strong className="black">
                                                                        ₦<span>400,000</span>
                                                                    </strong>
                                                                </td>
                                                                <td className="d-none d-md-inline">
                                                                    400,000
                                                                </td>
                                                                <td>
                                                                    <label>+40%</label>
                                                                </td>
                                                                <td className="text-truncate text-deep-purple">1st jan
                                                                    2019
                                                                </td>
                                                                <td className="text-truncate">22nd Aug 2019</td>
                                                                <td className="text-truncate d-none d-md-inline"><span
                                                                    className="text-deep-purple mr-1">In Progress </span>
                                                                </td>

                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div className="grid-section box-grid-view">
                                                        <div
                                                            className="box-grid-view box-grid-content d-flex justify-content-between">
                                                            <div
                                                                className="custom-box box-shadow-1 bg-white px-3 py-1  mb-2">
                                                                <p className="light-gray">100% Complete</p>
                                                                <h3 className="mb-2">Summer Vacation</h3>
                                                                <div className="d-flex">
                                                                    {/*<img className="box-icon" src="../../admin/app-assets/images/svg/checked-icon.svg"/>*/}
                                                                    <div className="box-detail d-inline-block">
                                                                        <p className="light-gray">400,000</p>
                                                                        <p className="gray">560,000</p>
                                                                        <p className="light-green">+40%</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="custom-box box-shadow-1 bg-white px-3 py-1  mb-2">
                                                                <p className="light-gray">40% Complete</p>
                                                                <h3 className="mb-2">Summer Vacation</h3>
                                                                <div className="d-flex">
                                                                    {/*<img className="box-icon" src="../../admin/app-assets/images/svg/locked-icon.svg"/>*/}
                                                                    <div className="box-detail d-inline-block">
                                                                        <p className="light-gray">400,000</p>
                                                                        <p className="gray">560,000</p>
                                                                        <p className="light-green">+40%</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="custom-box box-shadow-1 bg-white px-3 py-1 mb-2">
                                                                <p className="light-gray">100% Complete</p>
                                                                <h3 className="mb-2">Summer Vacation</h3>
                                                                <div className="d-flex">
                                                                    {/*<img className="box-icon" src="../../admin/app-assets/images/svg/checked-icon.svg"/>*/}
                                                                    <div className="box-detail d-inline-block">
                                                                        <p className="light-gray">400,000</p>
                                                                        <p className="gray">560,000</p>
                                                                        <p className="light-gray">+40%</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="custom-box box-shadow-1 bg-white px-3 py-1  mb-2">
                                                                <p className="light-gray">40% Complete</p>
                                                                <h3 className="mb-2">Summer Vacation</h3>
                                                                <div className="d-flex">
                                                                    {/*<img className="box-icon" src="../../admin/app-assets/images/svg/locked-icon.svg"/>*/}
                                                                    <div className="box-detail d-inline-block">
                                                                        <p className="light-gray">400,000</p>
                                                                        <p className="gray">560,000</p>
                                                                        <p className="light-gray">+40%</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>


                                                    <nav aria-label="Page navigation">
                                                        <ul className=" custom-pagination pagination justify-content-center pagination-separate pagination-round pagination-flat pagination-lg mb-1">
                                                            <li className="page-item">
                                                                <a className="page-link" href="#" aria-label="Previous">
                                                                    <span aria-hidden="true"><span
                                                                        className="d-none d-md-inline">«</span> Prev</span>
                                                                    <span className="sr-only">Previous</span>
                                                                </a>
                                                            </li>
                                                            <li className="page-item"><a className="page-link"
                                                                                         href="#">1</a></li>
                                                            <li className="page-item"><a className="page-link"
                                                                                         href="#">2</a></li>
                                                            <li className="page-item active"><a className="page-link"
                                                                                                href="#">3</a></li>
                                                            <li className="page-item"><a className="page-link"
                                                                                         href="#">4</a></li>
                                                            <li className="page-item"><a className="page-link"
                                                                                         href="#">5</a></li>
                                                            <li className="page-item">
                                                                <a className="page-link" href="#" aria-label="Next">
                                                                    <span aria-hidden="true">Next <span
                                                                        className="d-none d-md-inline">»</span></span>
                                                                    <span className="sr-only">Next</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="card box-shadow-0">
                                            <div className="card-content">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card box-shadow-0">
                                            <div className="card-content">
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
    export default BackupGoals;
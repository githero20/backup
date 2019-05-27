import React, {Component} from 'react';
import HorizonalNav from "../../Components/Dashboard/HorizontalNav/HorizonalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import transTotalSavingsIcon from '../../admin/app-assets/images/svg/transparent-total-saving-icon.svg';
import totalBalanceIcon from '../../admin/app-assets/images/svg/total-balance-icon.svg';
import settingsIcon from '../../admin/app-assets/images/svg/settings-icon-instant-save.svg';
import uploadIcon from '../../admin/app-assets/images/svg/red-upload-icon.svg';
import listIcon from '../../admin/app-assets/images/svg/list-icon.svg';
import gridIcon from '../../admin/app-assets/images/svg/grid-icon.svg';
import tableArrowLeft from '../../admin/app-assets/images/svg/table-arrow-left.svg';
import sortIcon from '../../admin/app-assets/images/svg/sort-icon.svg';
import greenDots from '../../admin/app-assets/images/svg/green-dot.svg';
import redDots from '../../admin/app-assets/images/svg/red-table-dot.svg';

class SteadySave extends Component {
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
                                        <label className="pull-right">
                                            <span className="mr-2"> copy referral code</span>
                                            <span className="code-btn">AEC45SF</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="content-header row">
                            </div>
                            <div className="content-body">

                                <div className="row">
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text fs-mb-1 mb-2 ">Steady Save <span
                                            className="dot">.</span> Summary

                                        </h3>
                                        <div className="card pull-up blue-card saving-card">
                                            <img className="floated-icon"
                                                 src={transTotalSavingsIcon}/>
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <h4 className="text-white blue-card-heading ">Total Balance</h4>
                                                    <div className="media d-flex pb-2 pb-md-5">
                                                        <div className="align-self-center">
                                                            <img className="blue-card-icon"
                                                                 src={totalBalanceIcon}/>
                                                        </div>
                                                        <div className="media-body text-left pt-1 ">
                                                            <h3 className="text-white clearfix"><strong
                                                                className="blue-card-price ml-2 mr-2">₦
                                                                10000.00</strong>

                                                            </h3></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text fs-mb-1 mb-2">Quick Actions</h3>

                                        <div className="mb-quick-actions d-flex flex-md-column flex-wrap ">
                        <span className="mb-btn-wrapper">
                            <button type="button" className=" btn-blue-gradient-2 round">
                                <img src={settingsIcon}/>
                                Settings
                            </button>

                        </span>
                                            <span className="mb-details-container ">
                            <div className="d-inline-block q-detail-img">
                                <img src={uploadIcon}/>
                            </div>
                            <div className=" d-inline-block">
                                <strong className="dark-brown font-size-1-16"><span>₦</span> 100,000.00</strong>
                                <p className="gray-text circular-std mb-p-size">Total Instant Save</p>
                            </div>
                        </span>
                                        </div>
                                    </div>


                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-8">
                                        <div className="card">

                                            <div className="card-content mt-1">
                                                <div
                                                    className="table-header d-flex justify-content-between align-items-md-center px-2  mb-3">
                                                    <h4 className="table-title">Recent Transaction
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
                                        <img src={tableArrowLeft} className="mr-1 img-1x"/> grid view
                                    </span>
                                                    </div>
                                                    <div className="table-sort-display d-block d-md-inline">
                                                        <span>
                                                            <img className=" img-2x " src={sortIcon}/>
                                                        </span>sort
                                                    </div>
                                                    {/*<div className="table-sort-display d-block d-md-inline">*/}
                                                    {/*    <span>*/}
                                                    {/*        <img className=" img-2x " src={sortIcon}/>*/}
                                                    {/*    </span>Filter*/}
                                                    {/*</div>*/}
                                                </div>

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
                                                                           data-dismiss="modal" value="cancel"/>
                                                                    <input type="submit"
                                                                           className="btn btn-bg-shade-2 btn-lg white px-md-3 round"
                                                                           value="lock Savings"/>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="table-responsive">
                                                    <table id="recent-orders"
                                                           className="table table-hover table-xl mb-0 spaced-table">
                                                        <thead>
                                                        <tr>
                                                            <th className="border-top-0 d-none d-md-block">Date</th>
                                                            <th className="border-top-0">Description</th>
                                                            <th className="border-top-0">Balance</th>
                                                            <th className="border-top-0">Amount</th>
                                                            <th className="border-top-0 d-none d-md-block">Reference</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td className="text-truncate d-none d-md-block"><span
                                                                className="text-muted mr-1">3|5|2019 </span>
                                                                <span className="table-time">8:00am</span></td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <div className="d-inline-block d-md-none">
                                                                        <img
                                                                            src={greenDots}
                                                                            className="green-dot "/>
                                                                    </div>
                                                                    <div className="d-inline-block">
                                                                        <div className="d-md-block">Credit</div>
                                                                        <div
                                                                            className="table-time d-block d-md-none ">8:00am
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </td>
                                                            <td>
                                                                <label
                                                                    className="bg-light-green px-2 sm-pd">75000</label>
                                                            </td>
                                                            <td className="text-truncate ">
                                                                50,000
                                                            </td>
                                                            <td className="text-truncate d-none d-md-block">ABCD999</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-truncate d-none d-md-block"><span
                                                                className="text-muted mr-1">3|5|2019 </span>
                                                                <span className="table-time">8:00am</span></td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <div className="d-inline-block d-md-none">
                                                                        <img
                                                                            src={redDots}
                                                                            className="red-dot "/>
                                                                    </div>
                                                                    <div className="d-inline-block">
                                                                        <div className="d-md-block">Debit</div>
                                                                        <div
                                                                            className="table-time d-block d-md-none ">8:00am
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </td>
                                                            <td>
                                                                <label className="bg-light-red px-2 sm-pd">75000</label>
                                                            </td>
                                                            <td className="text-truncate ">
                                                                50,000
                                                            </td>
                                                            <td className="text-truncate d-none d-md-block">ABCD999</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
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

export default SteadySave;
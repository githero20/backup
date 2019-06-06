import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import listIcon from "../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../admin/app-assets/images/svg/grid-icon.svg";
import tableArrowLeft from "../../admin/app-assets/images/svg/table-arrow-left.svg";
import sortIcon from "../../admin/app-assets/images/svg/sort-icon.svg";
import lockedSavingIcon from "../../admin/app-assets/images/svg/add-lock-saving.svg";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import {_getToken, _isDateAfter, _isDateAfterToday, _transformDate} from "../../utils";
import {getLockedSavings} from "../../actions/LockedSavingsAction";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";


class LockedSavings extends Component {

    constructor(props){
        super(props);
        this.state = {
            showLockedSavingsModal: false,
            lockedSavings:[]
        };

        console.log(_getToken());
        this.showLSModal = this.showLSModal.bind(this);
        this.closeLSModal = this.closeLSModal.bind(this);
    }


    componentWillMount() {
        console.log("Mounted");
        getLockedSavings((status, payload) => {
            console.log("payload", status, payload);
            if(status){
                //TODO(work on making this merging this payload.data.to lockedSavings[])
                this.setState({lockedSavings: payload.data});
            }
        })
    }

    showLSModal(){
        this.setState({
            showLockedSavingsModal: true
        });
    };


    closeLSModal(){
        this.setState({
            showLockedSavingsModal: false
        });
    };


    render() {
        return (
            <React.Fragment>
                <ToastProvider>
                    <LockedSavingModal
                        show={this.state.showLockedSavingsModal}
                        onHide={this.closeLSModal}
                    />
                </ToastProvider>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav />
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            {/* TODO(This should be a component on its own)*/}
                            <MessageBox />

                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Locked Savings</h3>
                                    </div>

                                </div>

                                <div className="row">
                                    <div id="locked-savings" className="col-12 col-md-12">
                                        <div className="card">
                                            <div className="card-content mt-1 px-2 px-md-5 py-md-3">
                                                <div
                                                    className="table-header d-flex justify-content-between align-items-md-center px-md-2  mb-3">
                                                    <h4 className="table-title">
                                                        <button
                                                            className=" right-btn-holder deep-blue-bg white "
                                                            data-toggle="modal" data-target="#large"
                                                            onClick={this.showLSModal}>

                                                            <img src={lockedSavingIcon}/>

                                                            New Locked Savings
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
                                                            <img src={tableArrowLeft} className="mr-1 img-1x"/> grid view
                                                        </span>
                                                    </div>
                                                    <div className="table-sort-display d-block d-md-inline">
                                                        <span>
                                                            <img className=" img-2x " src={sortIcon}/>
                                                        </span>sort
                                                    </div>
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


                                                <div className="box-grid-container  light-blue-bg px-md-3 py-md-3">
                                                    <div className="table-view table-responsive mb-5">
                                                        <table id="recent-orders"
                                                               className="table table-hover table-xl mb-0 spaced-table text-center">
                                                            <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Name</th>
                                                                <th>Amount</th>
                                                                <th>Interest</th>
                                                                <th>Start Date</th>
                                                                <th>End Date</th>
                                                                <th>Status</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                this.state.lockedSavings.map(ls => {
                                                                    console.log("Index", ls);
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                                {ls.id}
                                                                            </td>
                                                                            <td>
                                                                                {ls.title}
                                                                            </td>
                                                                            <td>
                                                                                {ls.amount}
                                                                            </td>
                                                                            <td>
                                                                                <label>+{parseFloat(ls.interest).toFixed(2)}%</label>
                                                                            </td>
                                                                            <td>
                                                                                {_transformDate(ls.start_date)}
                                                                            </td>
                                                                            <td>{_transformDate(ls.end_date)}</td>
                                                                            <td>{
                                                                                _isDateAfterToday(ls.end_date) ? "Completed" : "Ongoing"
                                                                            }</td>

                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {/*pagination */}

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
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const WithToast = withToastManager(LockedSavings);

export default WithToast;
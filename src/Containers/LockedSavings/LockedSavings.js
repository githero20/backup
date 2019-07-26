import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";

import lockedSavingIcon from "../../admin/app-assets/images/svg/add-lock-saving.svg";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import {withToastManager} from "react-toast-notifications";
import {_getToken} from "../../utils";
import {getLockedSavings} from "../../actions/LockedSavingsAction";
import {
    amountInterestFormatter,
    dateFormatter,
    handleFiltering,
    interestFormatter,
    moneyFormatter, toastReloadMessage, todaysDateForTable, toggleTable,
} from "../../Helpers/Helper";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import {getUserData} from "../../actions/UserAction";
import LockedTransactionTable from "../../Components/Dashboard/LockedTransactionTable/LockedTransactionTable";
import {Comparator, dateFilter} from "react-bootstrap-table2-filter";


class LockedSavings extends Component {

    state = {
        showLockedSavingsModal: false,
        lockedSavings: [],
        showLoader: true,
        mobileTable:true
    };

    constructor(props) {
        super(props);
        _getToken();
        this.showLSModal = this.showLSModal.bind(this);
        this.closeLSModal = this.closeLSModal.bind(this);
    }

    //get user info
    componentDidMount() {

       this.LoadData();
       toggleTable(this);
    }

    LoadData = () =>{
        getUserData(this.handleUserInfo);

        getLockedSavings((status, payload) => {
            if (status) {
                //TODO(work on making this merging this payload.data.to lockedSavings[])
                this.setState({lockedSavings: payload});
            }
        });
    };


    updateLockedSaving = () => {
        this.setState({showLoader: true});
        getLockedSavings((status, payload) => {
            console.log("payload", status, payload);
            if (status) {
                //TODO(work on making this merging this payload.data.to lockedSavings[])
                this.setState({lockedSavings: payload, showLoader: false});
            }
        })
    };

    handleUserInfo = (status, res) => {
        this.setState({
            showLoader: false,
        });

        if(status) { this.setState({userName: res.name})}
        // else toastReloadMessage('error',this,this.LoadData)
    };


    handleFilter = (date, comparator) => {
        handleFiltering(date, comparator, this);
    };


    showLSModal() {
        this.setState({
            showLockedSavingsModal: true
        });
    };


    closeLSModal(status = false) {
        this.setState({
            showLockedSavingsModal: false
        });
    };


    render() {


        const columns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
                filter: dateFilter({
                    defaultValue: {date: todaysDateForTable(), comparator: Comparator.LEQUAL},
                    getFilter: (filter) => {
                        this.createdDateFilter = filter;
                    }
                })
            },
            {
                text: 'Name',
                dataField: 'title',
                sort: true,

            },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter: moneyFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Interest',
                dataField: 'interest',
                formatter: interestFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Start Date',
                dataField: 'start_date',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'End Date',
                dataField: 'end_date',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
        ];
        const mobileColumns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
                filter: dateFilter({
                    defaultValue: {date:todaysDateForTable(), comparator: Comparator.LEQUAL},
                    getFilter: (filter) => {
                        this.createdDateFilter = filter;
                    }
                })
            },
            {
                text: 'Name',
                dataField: 'title',
                sort: true,

            },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter: moneyFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Summary',
                dataField: 'interest',
                formatter: amountInterestFormatter,
                sort: true,
                classes:' d-table-cell d-md-none',
                headerClasses:'d-table-cell d-md-none',
            },
            {
                text: 'Start Date',
                dataField: 'start_date',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'End Date',
                dataField: 'end_date',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
        ];

        return (
            <React.Fragment>
                <LockedSavingModal
                    show={this.state.showLockedSavingsModal}
                    onHide={this.closeLSModal}
                    updateLockedSaving={this.updateLockedSaving}
                />
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={this.state.userName}/>
                    <VerticalNav userName={this.state.userName}/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            {this.state.showLoader ? <DashboardLoader/> : null}
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-12 ">
                                        <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                            <p>Earn your interest upfront, but you need to lock your money with us for a
                                                period set by you.
                                                <br/>You can withdraw at the end of the period you have set.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Locked Savings</h3>
                                    </div>
                                </div>

                                <div className="row">
                                    <div id="locked-savings" className="col-12 col-md-12">
                                        <div className="card">
                                            <div className="card-content mt-1 px-2 py-md-3">
                                                <div
                                                    className="table-header d-flex justify-content-between align-items-md-center px-md-2 mb-1">
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
                                                        <li>{this.state.lockedSavings != undefined ? this.state.lockedSavings.length : 0} &nbsp; Locked
                                                            saving
                                                        </li>

                                                    </ul>
                                                </div>
                                                <div className="row">
                                                    {this.state.mobileTable?
                                                        (<LockedTransactionTable handleFilter={this.handleFilter} transactions={this.state.lockedSavings || []} columns={mobileColumns}/>):
                                                        (<LockedTransactionTable handleFilter={this.handleFilter} transactions={this.state.lockedSavings || []} columns={columns}/>)
                                                    }

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

export default withToastManager(LockedSavings);
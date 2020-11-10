import React, { Component } from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import lockedSavingIcon from "../../admin/app-assets/images/svg/add-lock-saving.svg";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import { withToastManager } from "react-toast-notifications";
import { _getToken } from "../../utils";
import { getLockedSavings } from "../../actions/LockedSavingsAction";
import {
    amountInterestFormatter,
    dateFormatter,
    handleFiltering,
    interestFormatter, formatNumber,
    moneyFormatter, todaysDateForTable, toggleTable,
} from "../../Helpers/Helper";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import { getUserData } from "../../actions/UserAction";
import LockedTransactionTable from "../../Components/Dashboard/LockedTransactionTable/LockedTransactionTable";
// import { Comparator, dateFilter } from "react-bootstrap-table2-filter";
import Footer from "../../Components/Dashboard/Footer/Footer";
import TableDisplay from '../../Components/Reuseable/TableDisplay';
import moment from 'moment';


class LockedSavings extends Component {

    state = {
        showLockedSavingsModal: false,
        lockedSavings: [],
        showLoader: true,
        mobileTable: true
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

    LoadData = () => {
        getUserData(this.handleUserInfo);

        getLockedSavings((status, payload) => {
            if (status) {
                //TODO(work on making this merging this payload.data.to lockedSavings[])
                this.setState({ lockedSavings: payload });
            }
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.reload) {
            this.LoadData();
        }
    }



    updateLockedSaving = () => {
        this.setState({ showLoader: true });
        getLockedSavings((status, payload) => {
            if (status) {
                //TODO(work on making this merging this payload.data.to lockedSavings[])
                this.setState({ lockedSavings: payload, showLoader: false });
            }
        })
    };

    handleUserInfo = (status, res) => {
        this.setState({
            showLoader: false,
        });

        if (status) { this.setState({ userName: res.name }) }
        // else toastReloadMessage('error',this,this.LoadData)
    };


    // handleFilter = (date, comparator) => {
    //     handleFiltering(date, comparator, this);
    // };


    showLSModal() {
        this.setState({
            showLockedSavingsModal: true
        });
    };


    closeLSModal(status = false) {
        this.setState({
            showLockedSavingsModal: false
        });
        if (status) {
            this.updateLockedSaving();
        }
    };


    render() {

        const newColumns = [
            {
                title: 'Date',
                render: (value, record) => (
                    <span className='d-flex flex-column'>
                        <span style={{ minWidth: '90px' }}>{moment(record.created_at).format('MMM Do YYYY')}&nbsp;</span>
                        <small className='text-muted'>{moment(record.created_at).format('h:mm a')}</small>
                    </span>
                )

            },
            {
                title: 'Name',
                dataIndex: 'title',
                sort: true,

            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                render: (value, record) => (
                    <p style={{ minWidth: '150px' }}
                    className={'text-green'}> {value != null ? `+ ₦ ${formatNumber(parseFloat(value).toFixed(2))}` : "N/A"}</p>
                ),
                formatter: moneyFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                title: 'Interest',
                dataIndex: 'interest',
                render: (value, record) => (
                    <p style={{ minWidth: '150px' }}
                    className={'text-primary'}> {value != null ? `+ ₦ ${formatNumber(parseFloat(value).toFixed(2))}` : "N/A"}</p>
                ),
                formatter: interestFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                title: 'Start Date',
                render: (value, record) => (
                    <span className='d-flex flex-column'>
                        <span style={{ minWidth: '90px' }}>{moment(record.start_date).format('MMM Do YYYY')}&nbsp;</span>
                        <small className='text-muted'>{moment(record.start_date).format('h:mm a')}</small>
                    </span>
                ),
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                title: 'End Date',
                render: (value, record) => (
                    <span className='d-flex flex-column'>
                        <span style={{ minWidth: '90px' }}>{moment(record.end_date).format('MMM Do YYYY')}&nbsp;</span>
                        <small className='text-muted'>{moment(record.end_date).format('h:mm a')}</small>
                    </span>
                ),
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
        ];
        const columns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
                // filter: dateFilter({
                //     defaultValue: { date: todaysDateForTable(), comparator: Comparator.LEQUAL },
                //     getFilter: (filter) => {
                //         this.createdDateFilter = filter;
                //     }
                // })
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
                // filter: dateFilter({
                //     defaultValue: { date: todaysDateForTable(), comparator: Comparator.LEQUAL },
                //     getFilter: (filter) => {
                //         this.createdDateFilter = filter;
                //     }
                // })
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
                classes: ' d-table-cell d-md-none',
                headerClasses: 'd-table-cell d-md-none',
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
                    dashboard={false}
                    updateLockedSaving={this.updateLockedSaving}
                />
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                    data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={this.state.userName} />
                    <VerticalNav userName={this.state.userName} />
                    <div className="app-content content">
                        <div className="content-wrapper">
                            {this.state.showLoader ? <DashboardLoader /> : null}
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-12 ">
                                        <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                            <p>Earn your interest upfront, but you need to lock your money with us for a
                                            period set by you.
                                                <br />You can withdraw at the end of the period you have set.</p>
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
                                                            <img src={lockedSavingIcon} />
                                                            New Locked Savings
                                                        </button>
                                                    </h4>
                                                    <ul className=" mb-0 locked-saving-display d-none d-md-inline-block">
                                                        <li>{this.state.lockedSavings != undefined ? this.state.lockedSavings.length : 0} &nbsp; Locked
                                                            saving
                                                        </li>

                                                    </ul>
                                                </div>
                                                <div className="">
                                                    <TableDisplay
                                                        header="Locked Savings"
                                                        columns={newColumns}
                                                        dataSource={this.state.lockedSavings}
                                                        // loading={processing}
                                                        pagination
                                                    />
                                                    {
                                                        // this.state.mobileTable ?
                                                        //     (<LockedTransactionTable transactions={this.state.lockedSavings || []} columns={mobileColumns} />) :
                                                        //     (<LockedTransactionTable transactions={this.state.lockedSavings || []} columns={columns} />)
                                                    }

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withToastManager(LockedSavings);
import React, { Component } from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import whiteSaveMoreIcon from "../../admin/app-assets/images/svg/mb-save-more-white-icon.svg";
import instantSaveIcon from "../../admin/app-assets/images/svg/mb-instant-save-icon.svg";
import InstantSavingModal from "../../Components/Dashboard/InstantSavingModal/InstantSavingModal";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import { request } from "../../ApiUtils/ApiUtils";
import {
    amountFormatter,
    balanceFormatter,
    dateFormatter,
    descriptionFormatter,
    formatNumber,
    handleFiltering,
    mobileDescFormatter,
    STANDARD_ACCOUNT,
    statusFormatter,
    toastMessage,
    todaysDateForTable,
    toggleTable
} from "../../Helpers/Helper";
import InstantSaveCard from "../../Components/Dashboard/InstantSaveCard/InstantSaveCard";
import { getUserInfoEndpoint, instantSaveTransEndpoint } from "../../RouteLinks/RouteLinks";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import { Comparator } from 'react-bootstrap-table2-filter';
// import { Comparator, dateFilter } from 'react-bootstrap-table2-filter';
import moment from "moment";
import { withToastManager } from 'react-toast-notifications';
import Footer from "../../Components/Dashboard/Footer/Footer";
import CustomTable from '../../Components/Reuseable/CustomTable'

class InstantSave extends Component {

    state = {
        error: false,
        errorMessage: '',
        accountInfo: null,
        transactions: [],
        userName: '',
        totalBalance: '0.00',
        totalInstantSave: '0.00',
        email: null,
        showSavingModal: false,
        showLoader: true,
        newInstantSave: false,
        date: moment().format('MM-DD-YYYY'),
        comparator: Comparator.EQ,
        mobileTable: true,
    };

    constructor(props) {
        super(props);
        this.hideModal = this.hideModal.bind(this);
    }


    hideModal(status = false) {
        this.setState({
            showSavingModal: false,
        });

        if (status) {
            this.getInstantSaves();
        }
    };

    showModal = () => {
        this.setState({
            showSavingModal: true
        });
    };

    analyseInstantSaveInfo = (status, data) => {
        if (status) {
            //set name
            if (data) {
                this.setState({ userName: data.data.data.name });
            }
            //set proper account
            if (data.data.data.accounts) {
                // loop through data and set appropriate states
                let accounts = data.data.data.accounts.data;
                //display total balance
                accounts.map((content, idx) => {
                    if (content.account_type_id === STANDARD_ACCOUNT) {
                        this.setState({
                            totalBalance: content.balance
                        })
                    }
                });
            }
        }

    };


    getTotalInstantSave(transactions) {
        if (transactions) {
            //filter credits
            let instantSaves = transactions.filter((content) => (content.status === 'success' && content.type === 'credit'));
            //get sum of credits
            const sum = instantSaves.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) }));
            return sum.amount;
        }
    }


    setupInstantSave = () => {
        request(getUserInfoEndpoint, null, true, 'GET', this.analyseInstantSaveInfo)
    };


    loadInstantSaves = () => {
        request(instantSaveTransEndpoint, null, true, 'GET', this.handleTransactions);
    };


    handleTransactions = (state, res) => {
        this.setState({ showLoader: false });
        if (state) {
            let transactions = [];
            let total = 0;
            if (res.data.data.length > 0) {
                transactions = res.data.data
                    .filter(content => content.status == 'success' && content.type == 'credit');
                if (transactions.length > 1) {
                    total = transactions.reduce((a, b) => ({
                        amount: parseFloat(a.amount) + parseFloat(b.amount)
                    })).amount;
                }
            }
            this.setState({
                transactions,
                totalInstantSave: total
            });

        } else if (!state && res) {
            this.setState({ showLoader: false });
            toastMessage('unable to get instant save transactions', 'error', this);
        }
    };

    // handleFilter = (date, comparator) => {
    //     handleFiltering(date, comparator, this);
    // };


    loadInstantSaveTable = (status, payload) => {
        //hide loader

        //handle response
        if (status) {
            if (payload) {
                let transactions = payload.data.data.transactions.data.filter((content) => content.status == 'success');
                this.setState({
                    transactions,
                    showLoader: false
                });
            }

        } else {
            // toastMessage('Unable to get Instant saves at the moment','error',this);
            this.setState({ showLoader: false });
        }

    };

    getInstantSaves = () => {
        //get user instant saves
        this.setupInstantSave();
        this.loadInstantSaves();
    };

    componentWillMount() {
        this.getInstantSaves();
    }

    updateInstantSave = () => {
        //TODO Add Table Loader
        //get user info
        request(getUserInfoEndpoint, null, true, 'GET', this.loadInstantSaveTable)
    };


    createInstantSave = () => {
        this.setState({
            newInstantSave: true
        })
    };

    componentDidMount() {
        toggleTable(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reload) {
            this.getInstantSaves();
        }
    }

    render() {
        const columns = [
            {
                title: 'Date',
                dataIndex: 'created_at',
            },
            {
                title: 'Description',
                render: (value, record) => (
                    <div>
                        <button className="btn btn-sm round btn-primary">{record.type}</button>
                    </div>
                  ),
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
            }, {
                title: 'Balance',
                dataIndex: 'balance',
            },
            {
                title: 'Status',
                render: (value, record) => (
                    <div>
                      {record.status === 'success' ? (
                        <button className="btn btn-sm round btn-success">{record.status}</button>
                      ) : (
                        <button className="btn btn-sm round btn-danger">{record.status}</button>
                      )}
                    </div>
                  ),
                dataIndex: 'status',
            },
            {
                title: 'Reference',
                dataIndex: 'reference',
            }];
        // const columns = [
        //     {
        //         text: 'Date',
        //         dataField: 'created_at',
        //         formatter: dateFormatter,
        //         sort: true,
        //         searchable: true,
        //         classes: 'd-none d-md-table-cell',
        //         headerClasses: 'd-none d-md-table-cell',
        //         // filter: dateFilter({
        //         //     defaultValue: { date: todaysDateForTable(), comparator: Comparator.LEQUAL },
        //         //     getFilter: (filter) => {
        //         //         this.createdDateFilter = filter;
        //         //     }
        //         // })
        //     },
        //     {
        //         text: 'Description',
        //         dataField: 'type',
        //         formatter: descriptionFormatter,
        //         sort: true,
        //         classes: 'd-none d-md-table-cell',
        //         headerClasses: 'd-none d-md-table-cell',

        //     },
        //     {
        //         text: 'Amount',
        //         dataField: 'amount',
        //         formatter: amountFormatter,
        //         sort: true

        //     }, {
        //         text: 'Balance',
        //         dataField: 'balance',
        //         formatter: balanceFormatter,
        //         sort: true

        //     },
        //     {
        //         text: 'Status',
        //         dataField: 'status',
        //         formatter: statusFormatter,
        //         sort: true,
        //         classes: 'd-none d-md-table-cell',
        //         headerClasses: 'd-none d-md-table-cell',
        //     },
        //     {
        //         text: 'Reference',
        //         dataField: 'reference',
        //         sort: true,
        //         classes: 'd-none d-md-table-cell',
        //         headerClasses: 'd-none d-md-table-cell',

        //     }];

        const mobileColumn = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                searchable: true,
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
                text: 'Description',
                dataField: 'type',
                formatter: mobileDescFormatter,
                sort: true,
                classes: ' d-table-cell d-md-none',
                headerClasses: 'd-table-cell d-md-none',

            },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter: amountFormatter,
                sort: true

            }, {
                text: 'Balance',
                dataField: 'balance',
                formatter: balanceFormatter,
                sort: true

            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: statusFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Reference',
                dataField: 'reference',
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            }];

        const balance = parseFloat(this.state.totalBalance).toFixed(2);

        return (
            <div
                className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done instant-save"
                data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                <HorizontalNav userName={this.state.userName} />
                <VerticalNav />
                <div className="app-content content ">
                    <div className="content-wrapper">
                        <div className="mb-5"></div>
                        {
                            this.state.showSavingModal ?
                                (
                                    <React.Fragment>
                                        <InstantSavingModal
                                            show={this.state.showSavingModal}
                                            onHide={this.hideModal}
                                            updateInstantSave={this.updateInstantSave}
                                            setupInstantSave={this.setupInstantSave}
                                        />
                                    </React.Fragment>

                                ) : null
                        }

                        {this.state.showLoader ? <DashboardLoader /> : null}
                        <div className="content-header row">
                        </div>
                        <div className="content-body">
                            <div className="row">
                                <div className="col-lg-5 col-12 order-lg-8">
                                    <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                        <p>Start saving as soon as you earn an income or when you get some loose cash. Make an instant transfer to your Backup Cash account and earn 8% interest.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12 order-lg-1">
                                    <h3 className="gray-header-text fs-mb-1 mb-2 ">Instant Save <span
                                        className="dot">.</span> Summary
                                    </h3>
                                    <InstantSaveCard
                                        balance={formatNumber(parseFloat(this.state.totalBalance).toFixed(2))} />
                                </div>
                                <div className="col-lg-3 col-12 order-lg-5">
                                    <h3 className="gray-header-text fs-mb-1 mb-2 mt-7px">Quick Actions</h3>
                                    <div className="mb-quick-actions d-flex flex-md-column flex-wrap mb-3 mb-md-0 ">
                                        <span className="mb-btn-wrapper">
                                            <button type="button" data-toggle="modal" data-target="#large"
                                                onClick={this.showModal}
                                                className=" btn-blue-gradient-2 round">
                                                <img src={whiteSaveMoreIcon} />Save Now
                                                </button>
                                        </span>
                                        <span className="mb-details-container ">
                                            <div className="d-inline-block q-detail-img">
                                                <img src={instantSaveIcon} />
                                            </div>
                                            <div className=" d-inline-block">
                                                <strong
                                                    className="dark-brown font-size-1-16"><span>₦</span> {formatNumber(parseFloat(this.state.totalInstantSave).toFixed(2))}</strong>
                                                <p className="gray-text circular-std mb-p-size">Total Instant Save</p>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {
                                    <CustomTable columns={columns} dataSource={this.state.transactions} pagination />
                                    //     this.state.mobileTable ?
                                    //         (

                                    //             <TransactionTable
                                    //                 transactions={this.state.transactions}
                                    //                 columns={mobileColumn} />
                                    //         ) :
                                    //         (
                                    //             <TransactionTable
                                    //                 transactions={this.state.transactions} columns={columns} />
                                    //         )
                                }
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div >
        );
    }
}

export default withToastManager(InstantSave);
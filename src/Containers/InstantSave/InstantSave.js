import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import whiteSaveMoreIcon from "../../admin/app-assets/images/svg/mb-save-more-white-icon.svg";
import instantSaveIcon from "../../admin/app-assets/images/svg/mb-instant-save-icon.svg";
import InstantSavingModal from "../../Components/Dashboard/InstantSavingModal/InstantSavingModal";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import {request} from "../../ApiUtils/ApiUtils";
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
    toastReloadMessage,
    todaysDateForTable,
    toggleTable
} from "../../Helpers/Helper";
import InstantSaveCard from "../../Components/Dashboard/InstantSaveCard/InstantSaveCard";
import {getUserInfoEndpoint, instantSaveTransEndpoint} from "../../RouteLinks/RouteLinks";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import {Comparator, dateFilter} from 'react-bootstrap-table2-filter';
import moment from "moment";
import {withToastManager} from 'react-toast-notifications';

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
        console.log(this.props);
        console.log('res', status, data);
        if (status) {
            //set name
            if (data) {
                this.setState({userName: data.data.data.name});
            }

            //set proper account
            if (data.data.data.accounts) {
                // loop through data and set appropriate states
                let accounts = data.data.data.accounts.data;
                //display total balance
                accounts.map((content, idx) => {
                    if (content.account_type_id == STANDARD_ACCOUNT) {
                        // console.log(content.balance);
                        this.setState({
                            totalBalance: content.balance
                        })
                    }
                });
            }
        } else if (!status && data) {
            console.log('err', data)
        } else {
            toastReloadMessage('error', this, this.getInstantSaves);
        }


    };


    getTotalInstantSave(transactions) {
        if (transactions) {
            //filter credits
            let instantSaves = transactions.filter((content) => (content.status == 'success' && content.type == 'credit'));
            //get sum of credits
            const sum = instantSaves.reduce((a, b) => ({amount: parseFloat(a.amount) + parseFloat(b.amount)}));
            // console.log('sum'+sum);
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
        if (state) {
            let transactions = res.data.data
                .filter(content => content.status == 'success' && content.type == 'credit');
            this.setState({
                transactions,
                showLoader: false,
                totalInstantSave: transactions.reduce((a, b) => ({amount: parseFloat(a.amount) + parseFloat(b.amount)})).amount || 0
            });
        }
    };

    handleFilter = (date, comparator) => {
        handleFiltering(date, comparator, this);
    };


    loadInstantSaveTable = (status, payload) => {
        //hide loader
        this.setState({
            showLoader: false
        });

        //handle response
        if (status) {
            if (payload) {
                // console.log(JSON.parse(JSON.stringify(payload)));
                let transactions = payload.data.data.transactions.data.filter((content) => content.status == 'success');
                this.setState({
                    transactions
                });
                // console.log('success', payload);
            }

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

    render() {

        const columns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                searchable: true,
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
                text: 'Description',
                dataField: 'type',
                formatter: descriptionFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

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

        const mobileColumn = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                searchable: true,
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


        // console.log(typeof this.state.totalBalance);
        const balance = parseFloat(this.state.totalBalance).toFixed(2);

        return (
            <div
                className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done instant-save"
                data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                <HorizontalNav userName={this.state.userName}/>
                <VerticalNav/>
                <div className="app-content content ">
                    <div className="content-wrapper">

                        {/* message baox*/}
                        {/*<MessageBox/>*/}
                        <div className="row mb-4">
                            <div className="col-12"></div>
                        </div>
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

                        {this.state.showLoader ? <DashboardLoader/> : null}
                        <div className="content-header row">
                        </div>
                        <div className="content-body">
                            <div className="row">
                                <div className="col-lg-5 col-12 order-lg-8">
                                    <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                        <p>Start saving your money here whenever you want!<br/>
                                            We want you to be disciplined, so we’ll charge you 5% if you choose
                                            to withdraw outside of your set withdrawal days.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12 order-lg-1">
                                    <h3 className="gray-header-text fs-mb-1 mb-2 ">Instant Save <span
                                        className="dot">.</span> Summary
                                    </h3>
                                    <InstantSaveCard
                                        balance={formatNumber(parseFloat(this.state.totalBalance).toFixed(2))}/>
                                </div>
                                <div className="col-lg-3 col-12 order-lg-5">
                                    <h3 className="gray-header-text fs-mb-1 mb-2 mt-7px">Quick Actions</h3>
                                    <div className="mb-quick-actions d-flex flex-md-column flex-wrap mb-3 mb-md-0 ">
                                            <span className="mb-btn-wrapper">
                                                <button type="button" data-toggle="modal" data-target="#large"
                                                        onClick={this.showModal}
                                                        className=" btn-blue-gradient-2 round">
                                                    <img src={whiteSaveMoreIcon}/>Save More
                                                </button>
                                            </span>
                                        <span className="mb-details-container ">
                                                <div className="d-inline-block q-detail-img">
                                                    <img src={instantSaveIcon}/>
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

                            <div className="row">
                                {/*transaction table */}
                                {
                                    this.state.mobileTable ?
                                        (
                                            <TransactionTable handleFilter={this.handleFilter}
                                                              transactions={this.state.transactions}
                                                              columns={mobileColumn}/>
                                        ) :
                                        (
                                            <TransactionTable handleFilter={this.handleFilter}
                                                              transactions={this.state.transactions} columns={columns}/>
                                        )
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(InstantSave);
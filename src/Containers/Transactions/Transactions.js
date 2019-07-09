import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import {getTransactionsApi} from "../../RouteLinks/RouteLinks";
import {request} from "../../ApiUtils/ApiUtils";
import {
    amountFormatter,
    balanceFormatter,
    dateFormatter,
    descriptionFormatter,
    detailFormatter, handleFiltering,
    sourceFormatter,
    statusFormatter
} from "../../Helpers/Helper";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import {withToastManager} from 'react-toast-notifications';
import TransactionReceipt from "../../Components/Dashboard/TransactionReceipt/TransactionReceipt";
import {Comparator, dateFilter} from "react-bootstrap-table2-filter";
import moment from 'moment';

class Transactions extends Component {

    state = {
        transactions: [],
        showLoader: false,
        userName: null,
        selectedTransID: null,
        showTransDetail: false,
    };

    //when the component mounts

    // load all the user transactions

    loadTransactions() {

        //get transactions from api
        this.setState({
            showLoader: true
        });

        request(getTransactionsApi, null, true, 'GET', this.handleTransactions);
    }


    // display all transactions when its loaded

    handleTransactions = (state, res) => {
        this.setState({
            showLoader: false
        });

        if (state && res) {
            this.setState({
                transactions: res.data.data
            });
        } else if (!state && res) {
            this.toastMessage(res.data.message, 'error');
        } else {
            this.toastMessage('No Internet', 'error');
        }

    };

    handleEachTrans = (state, res) => {
        console.log('Each transactions', res);
        this.setState({
            showLoader: false
        });

        if (state && res) {
            this.setState({
                selectedTrans: res.data.data
            });
        } else if (!state && res) {
            this.toastMessage(res.data.message, 'error');
        }

    };

    toastMessage = (message, status) => {
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    };


    componentDidMount() {


        this.setState({
            showLoader: true,
        });

        // getUserData(this.handleUserInfo);

        this.loadTransactions();
    }


    handleUserInfo = (status, res) => {
        this.setState({
            showLoader: false,
        });

        if (status) {

            this.setState({
                userName: res.name
            })

        }

    };

    hideDetails = ()=>{
        this.setState({
            showTransDetail: false
        });
    };

    handleFilter = (date, comparator) => {
        handleFiltering(date, comparator, this);
    };



    render() {

        const columns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                filter: dateFilter({
                    defaultValue: {date: moment().format('MM-DD-YYYY'), comparator: Comparator.LEQUAL},
                    getFilter: (filter) => {
                        this.createdDateFilter = filter;
                    }
                })
            },{
                text: 'Description',
                dataField: 'sourcetypes',
                formatter: sourceFormatter,
                sort: true,

            },
            {
                text: 'Phase',
                dataField: 'type',
                formatter: descriptionFormatter,
                sort: true,
                classes: 'd-none d-md-inline-block',
                headerClasses: 'd-none d-md-inline-block',

            },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter: amountFormatter,
                sort: true,

            }, {
                text: 'Balance',
                dataField: 'balance',
                formatter: balanceFormatter,
                sort: true,

            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: statusFormatter,
                sort: true,
                classes: 'd-none d-md-inline-block',
                headerClasses: 'd-none d-md-inline-block',
            },
            {
                text: 'transactions',
                dataField: 'id',
                formatter: detailFormatter,
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        this.setState({
                            showTransDetail: true,
                            selectedTransID:row.id
                        });
                        //set appropriate state to change view

                        // make request to get transaction

                        // get transaction detail
                        // request(`${getEachTransApi}${row.id}`, null, true, 'GET', this.handleEachTrans);
                    }
                }
            },
            {
                text: 'Reference',
                dataField: 'reference',
                sort: true,
                classes: 'd-none d-md-inline-block',
                headerClasses: 'd-none d-md-inline-block',

            }];

        return (
            <React.Fragment>
                {this.state.showLoader ? <DashboardLoader/> : null}
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={this.state.userName}/>
                    <VerticalNav userName={this.state.userName}/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">

                                    {/*messgae box*/}
                                    {/*<MessageBox/>*/}

                                </div>
                            </div>

                            {
                                this.state.showTransDetail ?
                                    (
                                        <TransactionReceipt hideDetails={this.hideDetails}  selectedTransID={this.state.selectedTransID} />
                                    ) :

                                    <React.Fragment>
                                        <div className="content-header row">
                                        </div>
                                        <div className="content-body">
                                            <div className="row">
                                                <div className="col-lg-4 col-12">
                                                    <h3 className="gray-header-text mb-2 ">Transactions
                                                    </h3>
                                                </div>

                                            </div>

                                            <div className="row">
                                                {/*<BigTransactionTable transactions={this.state.transactions} /> */}

                                                <TransactionTable handleFilter={this.handleFilter} transactions={this.state.transactions}
                                                                  columns={columns}/>
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


                                    </React.Fragment>


                            }

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withToastManager(Transactions);
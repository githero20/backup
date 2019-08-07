import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import {getTransactionsApi} from "../../RouteLinks/RouteLinks";
import {request} from "../../ApiUtils/ApiUtils";
import {
    amountBalanceFormatter,
    amountFormatter,
    balanceFormatter,
    dateFormatter,
    descriptionFormatter,
    detailFormatter,
    handleFiltering,
    statusFormatter,
    todaysDateForTable,
    toggleTable,
    transSourceFormatter
} from "../../Helpers/Helper";
import {withToastManager} from 'react-toast-notifications';
import TransactionReceipt from "../../Components/Dashboard/TransactionReceipt/TransactionReceipt";
import {Comparator, dateFilter} from "react-bootstrap-table2-filter";
import RemotePagination from "../../Components/Dashboard/RemoteTable/RemotePagination";
import {getPaginatedTrans} from "../../actions/TransactionActions";


class Transactions extends Component {

    state = {
        transactions: [],
        showLoader: true,
        userName: null,
        selectedTransID: null,
        showTransDetail: false,
        mobileTable: true,
        transData: {
            first_page_url: "http://backupcash.atp-sevas.com//sfsbapi/v1/user/transactions?page=1",
            from: 1,
            data: [],
            current_page: 1,
            last_page: 8,
            last_page_url: "http://backupcash.atp-sevas.com//sfsbapi/v1/user/transactions?page=8",
            next_page_url: "http://backupcash.atp-sevas.com//sfsbapi/v1/user/transactions?page=2",
            path: "http://backupcash.atp-sevas.com//sfsbapi/v1/user/transactions",
            per_page: 30,
            prev_page_url: null,
            to: 30,
            total: 223,
        }
    };

    //when the component mounts

    // load all the user transactions

    loadTransactions() {
        //get transactions from api
        this.setState({showLoader: true});
        request(getTransactionsApi, null, true, 'GET', this.handleTransactions);
    }


    // display all transactions when its loaded

    handleTransactions = (state, res) => {
        this.setState({
            showLoader: false
        });
        console.log('transaction data', res);
        if (state && res) {
            console.log('trans arr', res.data.data.data);
            this.setState({
                transactions: res.data.data.data,
                transData: {...this.state.transData, ...res.data.data}
            });
        } else if (!state && res) {
            console.log('err', res);
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
        this.loadTransactions();
        toggleTable(this);
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

    hideDetails = () => {
        this.setState({
            showTransDetail: false
        });
    };

    handleFilter = (date, comparator) => {
        handleFiltering(date, comparator, this);
    };

    handleTableChange = (type, props) => {
        getPaginatedTrans(`${this.state.transData.path}?page=${props.page}`,
            this.handlePaginatedData)
    };

    handlePaginatedData = (status, res) => {
        console.log(status, res);
        if (status) {
            this.setState({
                transData: {...this.state.transData, ...res}
            })
        }
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
            }, {
                text: 'Description',
                dataField: 'sourcetypes',
                formatter: transSourceFormatter,
                sort: true,

            },
            {
                text: 'Phase',
                dataField: 'type',
                formatter: descriptionFormatter,
                sort: true,
                classes: 'd-none',
                headerClasses: 'd-none',

            },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter: amountFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            }, {
                text: 'Balance',
                dataField: 'balance',
                formatter: balanceFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: statusFormatter,
                sort: true,
                classes: 'd-none',
                headerClasses: 'd-none',
            },
            {
                text: 'transactions',
                dataField: 'id',
                formatter: detailFormatter,
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        this.setState({
                            showTransDetail: true,
                            selectedTransID: row.id
                        });
                    }
                }
            },
            {
                text: 'Reference',
                dataField: 'reference',
                sort: true,
                classes: 'd-none',
                headerClasses: 'd-none ',

            }];


        const mobileColumns = [
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
            }, {
                text: 'Description',
                dataField: 'sourcetypes',
                formatter: transSourceFormatter,
                sort: true,

            },
            {
                text: 'Phase',
                dataField: 'type',
                formatter: descriptionFormatter,
                sort: true,
                classes: 'd-none',
                headerClasses: 'd-none',

            }, {
                text: 'Amount',
                dataField: 'amount',
                formatter: amountBalanceFormatter,
                sort: true,
                classes: ' d-table-cell d-md-none',
                headerClasses: 'd-table-cell d-md-none',

            }, {
                text: 'Balance',
                dataField: 'balance',
                formatter: balanceFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: statusFormatter,
                sort: true,
                classes: 'd-none',
                headerClasses: 'd-none',
            },
            {
                text: 'transactions',
                dataField: 'id',
                formatter: detailFormatter,
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        this.setState({
                            showTransDetail: true,
                            selectedTransID: row.id
                        });
                    }
                }
            },
            {
                text: 'Reference',
                dataField: 'reference',
                sort: true,
                classes: 'd-none',
                headerClasses: 'd-none ',

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
                                </div>
                            </div>

                            {
                                this.state.showTransDetail ?
                                    (
                                        <TransactionReceipt hideDetails={this.hideDetails}
                                                            selectedTransID={this.state.selectedTransID}/>
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
                                                {
                                                    this.state.mobileTable ?
                                                        (<RemotePagination
                                                            data={this.state.transData.data}
                                                            handleFilter={this.handleFilter}
                                                            columns={columns}
                                                            onTableChange={this.handleTableChange}
                                                            page={this.state.transData.current_page}
                                                            sizePerPage={this.state.transData.per_page}
                                                            totalSize={this.state.transData.total}
                                                        />) :
                                                        (<RemotePagination
                                                            data={this.state.transData.data}
                                                            handleFilter={this.handleFilter}
                                                            columns={mobileColumns}
                                                            onTableChange={this.handleTableChange}
                                                            page={this.state.transData.current_page}
                                                            sizePerPage={this.state.transData.per_page}
                                                            totalSize={this.state.transData.total}
                                                        />)
                                                }
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
import React, { Component } from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import { ToastProvider, withToastManager } from "react-toast-notifications";
import { getWithdrawalList } from "../../actions/WithdrawalAction";
import WithdrawalList from "./WithdrawalList";
import WithdrawalForm from "./WithdrawalForm";
import { getUserData } from "../../actions/UserAction";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import {
    amountFormatter,
    amountLastAmountFormatter,
    balanceFormatter,
    confirmedFormatter,
    dateFormatter, toggleTable,
    withdrawSourceFormatter
} from "../../Helpers/Helper";
import Footer from "../../Components/Dashboard/Footer/Footer";

class Withdrawal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showWithdrawalForm: false,
            withdrawals: [],
            userName: null,
            showLoader: false,
            mobileTable: true
        };

        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.getWithdrawalList = this.getWithdrawalList.bind(this);
    }


    componentWillMount() {
        this.setState({
            showLoader: true,
        });
        this.LoadWithdrawals();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reload == true) {
            this.setState({
                showLoader: true,
            });
            this.LoadWithdrawals();
        }
    }

    LoadWithdrawals = () => {
        getUserData(this.handleUserInfo);
        this.getWithdrawalList();
    };

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


    getWithdrawalList() {
        getWithdrawalList((status, payload) => {
            if (status && payload.data.length > 0) {
                this.setState({ withdrawals: payload.data });
            }
        })
    }

    showForm() {
        this.setState({ showWithdrawalForm: true });
    }

    hideForm(status) {
        this.setState({ showWithdrawalForm: false });
        if (status)
            this.getWithdrawalList();
    }


    activateLoader = () => {
        this.setState({
            loading: !this.state.loading
        });
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
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Account',
                dataField: 'account_type',
                formatter: withdrawSourceFormatter,
                sort: true,
            },
            {
                text: 'Status',
                dataField: 'is_confirmed',
                formatter: confirmedFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter: amountFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Last Amount',
                dataField: 'last_amount',
                formatter: balanceFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Description',
                dataField: 'source',
                formatter: withdrawSourceFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            }
        ];
        const mobileColumns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Account',
                dataField: 'account_type',
                formatter: withdrawSourceFormatter,
                sort: true,
            },
            {
                text: 'Status',
                dataField: 'is_confirmed',
                formatter: confirmedFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            }, {
                text: 'Amount',
                dataField: 'amount',
                formatter: amountLastAmountFormatter,
                sort: true,
                classes: ' d-table-cell d-md-none',
                headerClasses: 'd-table-cell d-md-none',

            }, {
                text: 'Last Amount',
                dataField: 'last_amount',
                formatter: balanceFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',


            }, {
                text: 'Description',
                dataField: 'source',
                formatter: withdrawSourceFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            }
        ];

        return (
            <React.Fragment>
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
                                            <p>To make a withdrawal, you need to add a bank. If you have no bank added
                                                yet, kindly go to Settings, then click Bank/Card.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Withdrawal
                                        </h3>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="withdrawal col-12 col-md-12">
                                        <div className="card">
                                            <div className="card-content mt-1 px-1 px-md-2 py-1">
                                                <div
                                                    className="table-header d-flex flex-md-row justify-content-start mb-3">
                                                    {
                                                        !this.state.showWithdrawalForm
                                                            ?
                                                            <button className="round white btn-withdraw "
                                                                onClick={this.showForm}>Withdraw
                                                            </button>
                                                            :
                                                            <a href='#' className="gray-text back-btn "
                                                                onClick={this.hideForm}>
                                                                <i className='fa fa-chevron-left' />
                                                                Back
                                                            </a>
                                                    }
                                                </div>
                                                <ToastProvider>
                                                    {
                                                        !this.state.showWithdrawalForm
                                                            ? (
                                                                this.state.mobileTable ? (
                                                                    <WithdrawalList showForm={this.showForm}
                                                                        withdrawals={this.state.withdrawals}
                                                                        columns={mobileColumns}
                                                                        transactions={this.state.withdrawals} />
                                                                ) :
                                                                    (
                                                                        <WithdrawalList showForm={this.showForm}
                                                                            withdrawals={this.state.withdrawals}
                                                                            columns={columns}
                                                                            transactions={this.state.withdrawals} />
                                                                    )
                                                            )
                                                            : <WithdrawalForm activateLoader={this.activateLoader}
                                                                hideForm={this.hideForm}
                                                                updateWithdrawalList={this.getWithdrawalList} />

                                                    }
                                                </ToastProvider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default withToastManager(Withdrawal);
import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import listIcon from "../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../admin/app-assets/images/svg/grid-icon.svg";
import tableArrowLeft from "../../admin/app-assets/images/svg/table-arrow-left.svg";
import {withToastManager} from "react-toast-notifications";
import {getWithdrawalList} from "../../actions/WithdrawalAction";
import WithdrawalList from "./WithdrawalList";

class Withdrawal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showWithdrawalList: true,
            withdrawals: []
        };

        this.showList = this.showList.bind(this);
    }

    componentWillMount() {
        this.getWithdrawalList();
    }

    componentDidMount() {
        console.log("Props", this.props);
        this.props.toastManager.add("Completed", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 5000
        });
    }

    getWithdrawalList() {
        getWithdrawalList((status, payload) => {
            console.log(status, payload);
            if (status) {
                this.props.toastManager.add("Withdrawals", {
                    appearance: "success",
                    autoDismiss: true
                });
                this.setState({withdrawals: payload.data});
            } else {
                this.props.toastManager.add(payload, {
                    appearance: "error",
                    autoDismiss: true
                })
            }
        })
    }

    showList(status = true, fetchWithdrawals = false) {
        this.setState({showWithdrawalList: status});
        if (fetchWithdrawals)
            this.getWithdrawalList();
    }

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
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Withdrawal
                                        </h3>
                                    </div>

                                </div>

                                <div className="row">
                                    <div id="recent-sales" className="col-12 col-md-12">
                                        <div className="card">
                                            <div className="card-content mt-1 px-md-5 px-1 py-1">
                                                <div className="table-header d-flex flex-column flex-md-row justify-content-between mb-3">
                                                    <span className="table-button-container mb-2 mb-md-0">
                                                        <span className="mr-1 table-grid-view-icon img-2x active">
                                                            <img src={listIcon} className=" img-2x "/>
                                                         </span>
                                                        <span className="mr-1 table-grid-view-icon img-2x ">
                                                            <img src={gridIcon} className=" img-2x "/>
                                                        </span>
                                                        <span className="table-view-display">
                                                            <img src={tableArrowLeft}
                                                                 className="mr-1 img-1x"/> table view
                                                        </span>
                                                    </span>
                                                    <button className="round white btn-withdraw flex-grow-0 "
                                                            onClick={this.showList}>Withdraw
                                                    </button>
                                                </div>
                                                {
                                                    this.state.showWithdrawalList
                                                    ? <WithdrawalList show={this.state.showWithdrawalList} onHide={this.showList} withdrawals={this.state.withdrawals}/>
                                                    : null
                                                }
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


export default withToastManager(Withdrawal);
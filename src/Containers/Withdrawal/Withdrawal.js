import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import listIcon from "../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../admin/app-assets/images/svg/grid-icon.svg";
import tableArrowLeft from "../../admin/app-assets/images/svg/table-arrow-left.svg";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import {getWithdrawalList} from "../../actions/WithdrawalAction";
import WithdrawalList from "./WithdrawalList";
import WithdrawalForm from "./withdrawalForm";
import ChooseWithdrawal from "./chooseWithdrawal";
import WithdrawalDateForm from "./WithdrawalDateForm";
import Banner from "./Banner";
import {getUserBanks} from "../../actions/BankAction";

class Withdrawal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showWithdrawalForm: true,
            withdrawals: [],
            banks:[]
        };

        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.getUserBanks = this.getUserBanks.bind(this);
    }

    getUserBanks(){
        getUserBanks((status, payload) => {
            console.log(status, payload);
            if(status){
                if(payload && payload.length > 0){
                    this.setState({banks:payload});
                }
            }else{
                this.props.toastManager.add("Unable to fetch Bank Accounts",{
                    appearance: 'error',
                    autoDismiss:true,
                    autoDismissTimeout:3000
                })
            }
        })
    }

    componentWillMount() {
        this.getWithdrawalList();
        this.getUserBanks();
    }

    componentDidMount() {
        console.log("Props", this.props);
    }

    getWithdrawalList() {
        getWithdrawalList((status, payload) => {
            console.log(status, payload);
            if (status) {
                // this.props.toastManager.add("Withdrawals", {
                //     appearance: "success",
                //     autoDismiss: true
                // });
                this.setState({withdrawals: payload.data});
            } else {
                this.props.toastManager.add("Unable to get withdrawals at this moment", {
                    appearance: "error",
                    autoDismiss: true
                })
            }
        })
    }

    showForm() {
        if(this.state.banks.length > 0){
            this.setState({showWithdrawalForm: true});
        }else{
            this.props.history.push("/bank-card-setting");
        }
    }

    hideForm(status){
        this.setState({showWithdrawalForm: false});
        if (status)
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
                                   {/* message box */}
                                   {/*<MessageBox/>*/}
                                </div>
                            </div>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Withdrawal
                                        </h3>
                                    </div>

                                </div>

                                {/*banner component */}
                                <Banner/>


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
                                                            onClick={this.showForm}>Withdraw
                                                    </button>
                                                </div>
                                                <ToastProvider>
                                                    {
                                                        !this.state.showWithdrawalForm
                                                            ? <WithdrawalList showForm={this.showForm} withdrawals={this.state.withdrawals}/>
                                                            : <WithdrawalForm hideForm={this.hideForm}/>
                                                    }
                                                </ToastProvider>
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
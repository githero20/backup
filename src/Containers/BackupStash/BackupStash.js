import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import {Link} from "react-router-dom";
import whiteSaveMoreIcon from "../../admin/app-assets/images/svg/mb-save-more-white-icon.svg";
import instantSaveIcon from "../../admin/app-assets/images/svg/mb-instant-save-icon.svg";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";
import InstantSavingModal from "../../Components/Dashboard/InstantSavingModal/InstantSavingModal";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import {getLocalStorage, request} from "../../ApiUtils/ApiUtils";
import {USERACTIVATED, USERINFO} from "../../Components/Auth/HOC/authcontroller";
import {formatNumber, INTEREST_ACCOUNT, STANDARD_ACCOUNT} from "../../Helpers/Helper";
import InstantSaveCard from "../../Components/Dashboard/InstantSaveCard/InstantSaveCard";
import {
    getTransactionsApi,
    getUserInfoEndpoint,
    instantSaveTransEndpoint,
    WithdrawalLink
} from "../../RouteLinks/RouteLinks";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import TransferLockedSavingsModal
    from "../../Components/Dashboard/TransferLockedSavingsModal/TransferLockedSavingsModal";
import TransferToCentralVaultModal
    from "../../Components/Dashboard/TransferToCentralVaultModal/TransferToCentralVaultModal";

class BackupStash extends Component {

    state = {
        showTransferLockedSavings: false,
        showTransToCentralVault: false,
        error: false,
        errorMessage: '',
        accountInfo: null,
        transactions: [],
        userName: '',
        totalStash: '0.00',
        totalInstantSave: '0.00',
        email: null,
        showSavingModal: false,
        showLoader: true,
        newInstantSave: false,
    };

    constructor(props) {
        super(props);
    }


    hideTransLockedSavingModal = () => {
        this.setState({
            showTransferLockedSavings: false
        });
    };

    showTransLockedSavingModal = () => {
        console.log('Transfer to Locked Saving Modal');
        this.setState({
            showTransferLockedSavings: true
        });
    };

    hideTransToCentralVaultModal = (status) => {
        this.setState({
            showTransToCentralVault: false
        });
        if(status){
            this.setupStash();
        }
    };
    showTransToCentralVaultModal = () => {
        console.log('Transfer to Central Vault Modal');
        this.setState({
            showTransToCentralVault: true
        });
    };


    analyseStashInfo = (status, data) => {


        //stop loader
        this.setState({
            showLoader:false
        });

        //handle response
        if (status) {

            console.log(data.data.data);
            if(data){
               const userName = data.data.data.name;
                this.setState({
                    userName,
                });
            }

            if (data.data.data.accounts) {

                console.log(data.data.data.accounts)
                // loop through data and set appropriate states
                let accounts = data.data.data.accounts.data;

                //display total balance
                accounts.map((content, idx) => {
                    if (content.account_type_id === INTEREST_ACCOUNT) {
                        console.log(content.balance);
                        this.setState({
                            totalStash: formatNumber(content.balance)
                        })
                    }else if (content.account_type_id === STANDARD_ACCOUNT) {
                        console.log(content.balance);
                        this.setState({
                            vaultBalance:content.balance,
                        })
                    }
                });

                console.log(data.data.data.transactions.data);
                //TODO loop through transactions and add up only credits
                let transactions = data.data.data.transactions.data;
                let totalInstantSave = this.getTotalInstantSave(transactions);
                this.setState({
                    transactions,
                    totalInstantSave: formatNumber(totalInstantSave)
                });


            } else {
                console.log(data);
                return null;
            }


        }


    };


    getTotalInstantSave(transactions) {
        console.log(transactions);
        if (transactions) {
            const sum = transactions.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
            return sum.amount;
        }
    }


    setupStash = () => {

        console.log('setting up instant Save');

        //TODO Add Table Loader
        this.setState({
            showLoader:true,
        })
        //call get user info
        request(getUserInfoEndpoint, null, true, 'GET', this.analyseStashInfo)


    };



    componentDidMount() {


        //get user instant saves
        this.setupStash();

    }


    loadInstantSaveTable = (status, payload) => {
        //hide loader
        this.setState({
            showLoader: false
        });

        //handle response
        if (status) {
            if (payload) {
                console.log(JSON.parse(JSON.stringify(payload)));
                this.setState({
                    transactions: payload.data.data.transactions.data
                });
                console.log('success', payload);
            }

        }

    };

    componentWillMount() {

        //get user instant saves
        this.setupStash();


    }



    render() {

        return (
            <div
                className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done instant-save"
                data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                <HorizontalNav userName={this.state.userName}/>
                <VerticalNav userName={this.state.userName} />
                <div className="app-content content ">
                    <div className="content-wrapper">

                        {/* message baox*/}
                        {/*<MessageBox/>*/}
                        <div className="row mb-4">
                            <div className="col-12"></div>
                        </div>
                        {
                            this.state.showTransferLockedSavings ?
                                (
                                    <React.Fragment>
                                        <TransferLockedSavingsModal
                                            show={this.state.showTransferLockedSavings}
                                            onHide={this.hideTransLockedSavingModal}
                                        />
                                    </React.Fragment>

                                ) : null
                        }

                        {
                            this.state.showTransToCentralVault ?
                                (
                                    <React.Fragment>
                                        <TransferToCentralVaultModal
                                            stashBalance={this.state.totalStash}
                                            show={this.state.showTransToCentralVault}
                                            onHide={this.hideTransToCentralVaultModal}
                                        />
                                    </React.Fragment>

                                ) : null
                        }

                        {this.state.showLoader ? <DashboardLoader/> : null}
                        <div className="content-header row">
                        </div>
                        <div className="content-body">
                            <div className="row">
                                <div className="col-lg-4 col-12 order-lg-8">
                                    <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                        <p>Collection pot for interest paid from all other products.
                                            Zero penalty fees on withdrawals and no interest to be accrued on the amount
                                            here. You can transfer funds to central vault or locked savings</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <h3 className="gray-header-text fs-mb-1 mb-2 ">Backup Stash <span
                                        className="dot">.</span> Summary

                                    </h3>
                                    <InstantSaveCard balance={this.state.totalStash}/>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <h3 className="gray-header-text fs-mb-1 mb-2">Quick Actions</h3>

                                    <div className="mb-quick-actions d-flex flex-md-column flex-wrap ">
                                        <span className="mb-btn-wrapper">
                                            <button type="button" data-toggle="modal" data-target="#large" onClick={this.showTransLockedSavingModal}
                                                    className=" btn-blue-gradient-2 round">
                                                <img src={whiteSaveMoreIcon} alt={'Transfer to Saving Modal'}/>
                                                Transfer to Locked Savings
                                            </button>

                                        </span>

                                        <span className="mb-btn-wrapper">
                                            <button type="button" data-toggle="modal" data-target="#large" onClick={this.showTransToCentralVaultModal}
                                                    className=" btn-blue-gradient-2 round">
                                                <img src={whiteSaveMoreIcon} alt={'Transfer to Central Vault'}/>
                                                Transfer to Central Vault
                                            </button>
                                        </span>

                                        <span className="mb-btn-wrapper">
                                            <Link to={WithdrawalLink}>
                                                <button type="button" className=" btn-blue-gradient-2 round">
                                                    <img src={whiteSaveMoreIcon} alt="Withdraw Link"/>
                                                    Withdraw
                                                </button>
                                            </Link>
                                        </span>

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {/*transaction table */}
                                {/*<TransactionTable transactions={this.state.transactions}/>*/}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BackupStash;
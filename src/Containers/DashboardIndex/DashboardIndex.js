import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardContainer from "../../Components/Dashboard/DashboardContainer/DashboardContainer";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import {activateUserEndpoint, lockedSavingEndpoint, resendActEndpoint} from "../../RouteLinks/RouteLinks";
import {api, getLocalStorage, request, setLocalStorage} from "../../ApiUtils/ApiUtils";
import {
    BACKUP_GOALS_ACCOUNT,
    formatNumber,
    INTEREST_ACCOUNT,
    LOCKED_ACCOUNT,
    STANDARD_ACCOUNT
} from "../../Helpers/Helper";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";
import {USERACTIVATED, USERINFO} from "../../Components/Auth/HOC/authcontroller";
import ActivationModal from "../../Components/Dashboard/ActivationModal/ActivationModal";
import {ToastProvider} from 'react-toast-notifications';
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";


class DashboardIndex extends Component {

    state = {
        showSteadySavingModal: false,
        showActiveGoalModal: false,
        showlockedSavingsModal: false,
        error: false,
        errorMessage: '',
        showActivationModal: false,
        activationSuccss: false,
        accountInfo: null,
        vaultAmount: '0.00',
        backupAmount: '0.00',
        lockedSavingsAmount: '0.00',
        stashAmount: '0.00',
        transactions: [],
        userName: '',
        totalInterest: '0.00',
        totalSteadySave: '0.00',
        ActiveGoals: 0,
        CompletedGoals: 0,
        email: null,
        showLoader: true,
    };


    showSteadySaveModal = () => {
        this.setState({
            showSteadySavingModal: true
        });

        console.log(this.props);
    };


    showActiveGoalModal = () => {
        this.setState({
            showActiveGoalModal: true
        });

    };

    closeActiveGoalModal = () => {
        this.setState({
            showActiveGoalModal: false
        });
    };

    closeSteadySaveModal = () => {
        this.setState({
            showSteadySavingModal: false
        });
    };


    showLSModal = () => {
        this.setState({
            showlockedSavingsModal: true
        });
    };


    closeLSModal = () => {
        this.setState({
            showlockedSavingsModal: false
        });
    };


    setupDashBoard = () => {

        console.log('setting up dashboard');
        //get data from localStorage
        if (getLocalStorage(USERINFO)) {
            this.setState({
                showLoader: false,
            });
            console.log('there is user info');
            console.log(JSON.parse(getLocalStorage(USERINFO)));

            if (getLocalStorage(USERACTIVATED)) {
                let status = JSON.parse(getLocalStorage(USERACTIVATED));
                // if (status === false) {
                //     let userInfo = JSON.parse(getLocalStorage(USERINFO));
                //     //show activation modal
                //     // this.setUpActivation(true, userInfo.email);
                // //TODO handle verification
                // } else
                //
                console.log(status);

                if (status === true || status === false ) {
                    console.log('got here to retrieve it ');
                    let data = JSON.parse(getLocalStorage(USERINFO));
                    console.log(data);
                    if (data.accounts !== null || data.accounts !== undefined) {
                        console.log(data);
                        this.setState({
                            accountInfo: data.accounts,
                            userName: data.name,

                        });
                        this.analyseDashboardInfo(data);
                    }

                    //get locked savings
                    this.getLockedSavings(lockedSavingEndpoint, this.handleLockedSavings);
                }
            }


        } else {

            this.setState({
                showLoader:false

            });
            console.log('didnt see usr info');
            //check if user is activated
            if (getLocalStorage(USERACTIVATED)) {

                let status = JSON.parse(getLocalStorage(USERACTIVATED));
                if (status === false) {
                    //show activation modal
                    this.setUpActivation(true, null);
                } else if (status === true) {
                    console.log('got here to retrieve it ');
                    let data = JSON.parse(getLocalStorage(USERINFO));


                }
            }


        }


    };

    setUpActivation = (status, userInfo) => {

        this.setState({
            showActivationModal: status,
            email: userInfo
        })

    };



    getLockedSavings = (url, callback) => {

        request(url, null, true, null, callback);

    };


    handleLockedSavings = (state, res) => {

        if (state) {
            console.log(res);

        } else {

            console.log(res);
        }


    };


    analyseDashboardInfo = (data) => {


        if (data.accounts) {

            // loop through data and set appropriate states
            let accounts = data.accounts.data;

            console.log(data);
            let transactions = data.transactions.data;


            this.setState({
                transactions
            });

            accounts.map((content, idx) => {
                if (content.account_type_id === STANDARD_ACCOUNT) {
                    this.setState({
                        vaultAmount: formatNumber(parseFloat(content.balance).toFixed(2))
                    })
                }else if(content.account_type_id === BACKUP_GOALS_ACCOUNT){
                    this.setState({
                        backupAmount:formatNumber(parseFloat(content.balance).toFixed(2))
                    })
                }else if(content.account_type_id === LOCKED_ACCOUNT){
                    this.setState({
                        lockedSavingsAmount: formatNumber(parseFloat(content.balance).toFixed(2))
                    })
                }else if (content.account_type_id === INTEREST_ACCOUNT){
                    this.setState({
                        stashAmount: formatNumber(parseFloat(content.balance).toFixed(2)),
                        totalInterest:formatNumber(parseFloat(content.balance).toFixed(2))
                    })
                }

            });
        } else {
            console.log(data);
            return null;
        }


    };

    handleUserInfo = (state, response) => {

        if (state) {

            // display info to user to activate their email

            // console.log(JSON.stringify(response));
            setLocalStorage(USERINFO, JSON.stringify(response.data));

            this.setState({
                error: false,
            });

            //setup dashboard

        } else {
            //
            this.setState({
                error: true,
                errorMessage: response.data.message
            });
        }

    };


    activateAccount = () => {

        const url = activateUserEndpoint;
        api(url, null, true, false, this.handleUserActivation)

    };


    handleUserActivation = (state, res) => {
        if (state) {
            console.log(res);
            this.setState({
                activationSuccess: true,
                error: false,
            })
        }

    };


    resendActivationLink = () => {
        const param = {email: this.state.email};
        request(resendActEndpoint, param, false, true, this.handleResendActLink)

    };

    handleResendActLink = (state, response) => {


        if (state) {

            console.log(response);

            this.toastManager.add(`${response.data.success}`, {
                appearance: 'success',
            });


        } else {

            if (response) {
                console.log(response);
                this.toastManager.add(`${response.data.error}`, {
                    appearance: 'error',
                });
            }

        }

    };


    componentDidMount() {


        // check if user is activated

        //if user account is activated

        //setup dashboard
        console.log('dashboard mounted');

        setTimeout(this.setupDashBoard,2000);


    }


    componentWillMount() {

    }

    render() {
        const {
            vaultAmount, backupAmount, lockedSavingsAmount, stashAmount,
            transactions, userName, totalInterest, CompletedGoals, ActiveGoals, totalSteadySave
        } = this.state;

        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={userName}/>
                    <VerticalNav userName={userName} />

                    {this.state.showLoader ? <DashboardLoader/> : null}
                    <DashboardContainer

                        vaultAmount={vaultAmount}
                        backupAmount={backupAmount}
                        lockedSavingsAmount={lockedSavingsAmount}
                        totalInterest={totalInterest}
                        totalSteadySave={totalSteadySave}
                        stashAmount={stashAmount}
                        transactions={transactions}
                        CompletedGoals={CompletedGoals}
                        ActiveGoals={ActiveGoals}
                        error={this.state.error}
                        errorMessage={this.state.errorMessage}
                        // activateAccount={this.activateAccount}
                        hideSSModal={this.closeSteadySaveModal}
                        showSSModal={this.showSteadySaveModal}
                        hideAGModal={this.closeActiveGoalModal}
                        showAGModal={this.showActiveGoalModal}
                        hideLSModal={this.closeLSModal}
                        showLSModal={this.showLSModal}

                    />

                    {/* steady save modal */}
                    <SteadySaveModal
                        show={this.state.showSteadySavingModal}
                        onHide={this.closeSteadySaveModal}
                    />

                    <ToastProvider>
                        <LockedSavingModal
                            show={this.state.showlockedSavingsModal}
                            onHide={this.closeLSModal}
                        />
                    </ToastProvider>
                    <BackUpGoalsModal
                        show={this.state.showActiveGoalModal}
                        onHide={this.closeActiveGoalModal}
                    />
                    <ToastProvider>
                        <ActivationModal
                            show={this.state.showActivationModal}
                            email={this.state.email}
                        />
                    </ToastProvider>


                </div>
            </React.Fragment>
        );
    }
}

export default DashboardIndex;
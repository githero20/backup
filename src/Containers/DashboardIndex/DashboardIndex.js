import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardContainer from "../../Components/Dashboard/DashboardContainer/DashboardContainer";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import {activateUserEndpoint, getUserInfoEndpoint, lockedSavingEndpoint} from "../../RouteLinks/RouteLinks";
import {api, apiGet, getLocalStorage, request, setLocalStorage} from "../../ApiUtils/ApiUtils";
import {formatNumber, STANDARD_ACCOUNT} from "../../Helpers/Helper";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";


class DashboardIndex extends Component {


    state = {
        showSteadySavingModal: false,
        showActiveGoalModal: false,
        showlockedSavingsModal: false,
        error: false,
        errorMessage: '',
        activationSuccss: false,
        accountInfo: null,
        vaultAmount: '0.00',
        backupAmount: '0.00',
        lockedSavingsAmount: '0.00',
        stashAmount: '0.00',
        transactions: [],
        userName:'',
        totalInterest:'0.00',
        totalSteadySave:'0.00',
        ActiveGoals:0,
        CompletedGoals:0,
    };

    showSteadySaveModal = () => {
        this.setState({
            showSteadySavingModal: true
        });

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


    setupDashBoard() {

        //get data from localStorage
        let data = JSON.parse(getLocalStorage('userInfo'));


        if (data.accounts !== null || data.accounts !== undefined) {
            console.log(data);
            this.setState({
                accountInfo: data.accounts,
                userName:data.name,
            });
            this.analyseDashboardInfo(data);
        }

        //get locked savings
        this.getLockedSavings(lockedSavingEndpoint,this.handleLockedSavings);

    }


    getLockedSavings = (url,callback) => {

        request(url,null,true,null,callback);

    };



    handleLockedSavings = (state,res) => {

        if(state){
            console.log(res);

        }else {

            console.log(res);
        }


    };


    analyseDashboardInfo = (data) => {

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
                    vaultAmount: formatNumber(content.balance)
                })
            }

        });


    };

    handleUserInfo = (state, response) => {

        if (state) {

            // display info to user to activate their email

            // console.log(JSON.stringify(response));
            setLocalStorage('userInfo', JSON.stringify(response.data));

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


    componentDidMount() {

        // check if user is activated


        //if user account is activated

        //setup dashboard
        this.setupDashBoard();

    }


    render() {
        const {
            vaultAmount, backupAmount, lockedSavingsAmount, stashAmount,
            transactions,userName,totalInterest,CompletedGoals,ActiveGoals,totalSteadySave
        } = this.state;

        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={userName} />
                    <VerticalNav/>

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
                        activateAccount={this.activateAccount}
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

                    <LockedSavingModal
                        show={this.state.showlockedSavingsModal}
                        onHide={this.closeLSModal}
                    />
                    <BackUpGoalsModal
                        show={this.state.showActiveGoalModal}
                        onHide={this.closeActiveGoalModal}
                    />

                </div>
            </React.Fragment>
        );
    }
}

export default DashboardIndex;
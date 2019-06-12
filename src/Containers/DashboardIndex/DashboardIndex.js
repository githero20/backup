import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardContainer from "../../Components/Dashboard/DashboardContainer/DashboardContainer";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import {
    activateUserEndpoint, CentralVaultInterest,
    getUserInfoEndpoint,
    lockedSavingEndpoint,
    resendActEndpoint
} from "../../RouteLinks/RouteLinks";
import {api, getLocalStorage, request, setLocalStorage} from "../../ApiUtils/ApiUtils";
import {
    BACKUP_GOALS_ACCOUNT,
    formatNumber,
    INTEREST_ACCOUNT,
    LOCKED_ACCOUNT,
    STANDARD_ACCOUNT
} from "../../Helpers/Helper";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";
import {SHOWAD, USERACTIVATED, USERINFO} from "../../Components/Auth/HOC/authcontroller";
import ActivationModal from "../../Components/Dashboard/ActivationModal/ActivationModal";
import {ToastProvider} from 'react-toast-notifications';
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import StartNowModal from "../../Components/Dashboard/StartNowModal/StartNowModal";


class DashboardIndex extends Component {

    state = {
        showSteadySavingModal: false,
        showActiveGoalModal: false,
        showlockedSavingsModal: false,
        showStartModal: true,
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
        isActive:false,
        showAdModal:false,
        vaultInterest:'0.00'
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

    closeStartModal = () => {
        this.setState({
            showStartModal: false
        });
        setLocalStorage(SHOWAD,'dont_show');

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


    adModalController = ( ) =>{


        //TODO setup popup for first user login

        //when user logs in for the first time

        if(!getLocalStorage(SHOWAD)){
            setLocalStorage(SHOWAD,'show');
            console.log(getLocalStorage(SHOWAD));
            // show the add
            this.setState({
                showStartModal: true
            })

        }else if(getLocalStorage(SHOWAD)!=='show'){
            console.log('second run'+getLocalStorage(SHOWAD));
            this.setState({
                showStartModal: false
            })

        }

        //check if storage is set


        //if not set session storage

        // show modal

        // when modal is cancelled by the user

        //set the storage to false

        //  if the storage is set and is true


        // show modal

        //if the storage and is false don't show the modal

        // modal should contain he links to each feature on the app back up goals , steady save , locked savings





    };


    handleVaultInterest = (status,response) =>{

        if(status){
            console.log('got here');
            if(response){
                console.log(response.data.data);
                this.setState({
                    vaultInterest:formatNumber(parseFloat(response.data.data).toFixed(2))
                })

            }
        }
    }



    setupDashBoard = () => {



        //controls add display
        this.adModalController();

        //make request
        request(getUserInfoEndpoint, null, true, 'GET', this.analyseDashboardInfo);


        //get vault interest

        request(CentralVaultInterest,null,true,'GET',this.handleVaultInterest);

        //make request
        //show loader
        //get the response
        //hide loader
        //analyse info


        console.log('setting up dashboard');


    };

    checkActiveUser = (status) => {


        //get data from localStorage

        //check the active status

        //display the notification if user is not active
        if (parseInt(status)) {
            // console.log(JSON.parse(getLocalStorage(USERINFO)));

                // const data = JSON.parse(getLocalStorage(USERINFO));

                // if(parseInt(data.active)){

                    console.log('user is activated')
                // }else{
                //     console.log('user is not activated');
                // }
        // if (getLocalStorage(USERACTIVATED)) {
        //     let status = JSON.parse(getLocalStorage(USERACTIVATED));
        //     // if (status === false) {
        //     //     let userInfo = JSON.parse(getLocalStorage(USERINFO));
        //     //     //show activation modal
        //     //     // this.setUpActivation(true, userInfo.email);
        //     // //TODO handle verification
        //     // } else
        //     //
        //     console.log(status);
        //
        //     if (status === true || status === false ) {
        //
        //     }
        // }


        } else {

            this.setState({
                error:true,
                errorMessage:'Your Account is not Activated'
            })
            console.log('user is not active');

            //
            // this.setState({
            //     showLoader:false
            //
            // });
            // console.log('didnt see usr info');
            // //check if user is activated
            // if (getLocalStorage(USERACTIVATED)) {
            //
            //     let status = JSON.parse(getLocalStorage(USERACTIVATED));
            //     if (status === false) {
            //         //show activation modal
            //         this.setUpActivation(true, null);
            //     } else if (status === true) {
            //         console.log('got here to retrieve it ');
            //         let data = JSON.parse(getLocalStorage(USERINFO));
            //
            //
            //     }
            // }


        }
    }

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


    analyseDashboardInfo = (status, res) => {

        //
        // console.log('got here to retrieve it ');
        // let data = JSON.parse(getLocalStorage(USERINFO));
        // console.log(data);
        // if (data.accounts !== null || data.accounts !== undefined) {
        //     console.log(data);
        //     this.setState({
        //         accountInfo: data.accounts,
        //         userName: data.name,
        //
        //     });
        //     this.analyseDashboardInfo(status, data);
        // }


        //get locked savings
        this.getLockedSavings(lockedSavingEndpoint, this.handleLockedSavings);

        if (status) {


            if (res) {
                this.setState({
                    accountInfo: res.data.data.accounts,
                    userName: res.data.data.name,
                    showLoader:false
                });

                if(res.data.data.active){

                    //check for activated user
                    this.checkActiveUser(res.data.data.active);

                }


                if (res.data.data.accounts) {

                    // loop through data and set appropriate states
                    let accounts = res.data.data.accounts.data;

                    let transactions = res.data.data.transactions.data;


                    this.setState({
                        transactions
                    });

                    accounts.map((content, idx) => {
                        if (content.account_type_id === STANDARD_ACCOUNT) {
                            this.setState({
                                vaultAmount: formatNumber(parseFloat(content.balance).toFixed(2))
                            })
                        } else if (content.account_type_id === BACKUP_GOALS_ACCOUNT) {
                            this.setState({
                                backupAmount: formatNumber(parseFloat(content.balance).toFixed(2))
                            })
                        } else if (content.account_type_id === LOCKED_ACCOUNT) {
                            this.setState({
                                lockedSavingsAmount: formatNumber(parseFloat(content.balance).toFixed(2))
                            })
                        } else if (content.account_type_id === INTEREST_ACCOUNT) {
                            this.setState({
                                stashAmount: formatNumber(parseFloat(content.balance).toFixed(2)),
                                totalInterest: formatNumber(parseFloat(content.balance).toFixed(2))
                            })
                        }

                    });


                }


            } else {
                console.log(res);
                return null;
            }


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

        this.setupDashBoard();


    }


    componentWillMount() {

    }

    render() {
        const {
            vaultAmount, backupAmount, lockedSavingsAmount, stashAmount,
            transactions, userName, totalInterest,vaultInterest, CompletedGoals, ActiveGoals, totalSteadySave
        } = this.state;

        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={userName}/>
                    <VerticalNav userName={userName}/>
                    {this.state.showLoader ? <DashboardLoader/> : null}
                    <DashboardContainer
                        isActive={this.state.isActive}
                        vaultAmount={vaultAmount}
                        backupAmount={backupAmount}
                        lockedSavingsAmount={lockedSavingsAmount}
                        totalInterest={totalInterest}
                        totalSteadySave={totalSteadySave}
                        stashAmount={stashAmount}
                        transactions={transactions}
                        CompletedGoals={CompletedGoals}
                        ActiveGoals={ActiveGoals}
                        vaultInterest={vaultInterest}
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


                    <StartNowModal
                        show={this.state.showStartModal}
                        onHide={this.closeStartModal}
                    />

                </div>
            </React.Fragment>
        );
    }
}

export default DashboardIndex;
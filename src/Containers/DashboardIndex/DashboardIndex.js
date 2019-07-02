import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardContainer from "../../Components/Dashboard/DashboardContainer/DashboardContainer";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import {
    activateUserEndpoint,
    CentralVaultInterest,
    GetBackUpGoals,
    getUserInfoEndpoint,
    LockedInterest,
    resendActEndpoint
} from "../../RouteLinks/RouteLinks";
import {api, getLocalStorage, request, setLocalStorage} from "../../ApiUtils/ApiUtils";
import {
    BACKUP_GOALS_ACCOUNT,
    getCompletedGoals,
    INTEREST_ACCOUNT,
    LOCKED_ACCOUNT,
    STANDARD_ACCOUNT
} from "../../Helpers/Helper";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";
import {SHOWAD, USERINFO, USERTOKEN} from "../../Components/Auth/HOC/authcontroller";
import ActivationModal from "../../Components/Dashboard/ActivationModal/ActivationModal";
import {ToastProvider} from 'react-toast-notifications';
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import StartNowModal from "../../Components/Dashboard/StartNowModal/StartNowModal";
import moment from "moment";


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
        vaultAmount: 0,
        backupAmount: 0,
        lockedSavingsAmount: 0,
        stashAmount: 0,
        transactions: [],
        userName: '',
        totalInterest: 0,
        totalSteadySave: 0,
        ActiveGoals: 0,
        CompletedGoals: 0,
        email: null,
        showLoader: true,
        isActive: false,
        showAdModal: false,
        vaultInterest: 0,
        lockedSavingsInterest: 0
    };

    constructor(props) {
        super(props);
        this.getToken = this.getToken.bind(this);
    }


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

    closeStartModal = () => {
        this.setState({
            showStartModal: false
        });
        setLocalStorage(SHOWAD, 'dont_show');

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


    adModalController = () => {


        //TODO setup popup for first user login

        //when user logs in for the first time

        if (!localStorage.getItem(SHOWAD)) {
            setLocalStorage(SHOWAD, 'show');
            // console.log(getLocalStorage(SHOWAD));
            // show the add
            this.setState({
                showStartModal: true
            })

        } else if (JSON.stringify(localStorage.getItem(SHOWAD)) !== 'show') {
            // console.log('second run'+getLocalStorage(SHOWAD));
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


    handleVaultInterest = (status, response) => {
        console.log('Vault Interest response', status, response);

        if (status) {
            if (response) {
                this.setState({
                    vaultInterest: parseFloat(JSON.parse(response.data.data)).toFixed(2)
                })

            }
        }
    };


    handleLockedInterest = (status, response) => {
        console.log('Locked Interest response', status, response);

        if (status) {
            if (response) {
                this.setState({
                    lockedSavingsInterest: parseFloat(JSON.parse(response.data.data)).toFixed(2)
                })

            }
        }
    };


    setupDashBoard = () => {


        //controls add display
        this.adModalController();

        request(getUserInfoEndpoint, null, true, 'GET', this.analyseDashboardInfo);

        request(CentralVaultInterest, null, true, 'GET', this.handleVaultInterest);

        request(LockedInterest, null, true, 'GET', this.handleLockedInterest);

        // request(lockedSavingEndpoint,null,true,'GET',this.handleLockedSavings);

        request(GetBackUpGoals, null, true, 'GET', this.handleBackUpGoals);


    };


    handleBackUpGoals = (status, response) => {
        console.log('backup goals', status, response);
        if (status) {
            const now = moment().format('YYYY-MM-DD');
            const backUpGoals = response.data.data;

            //active

            // //check  to  filter all goals where current data is greater than today
            let activeGoals = backUpGoals.filter((content) => {
                return (moment(content.end_date).format('YYYY-MM-DD') > now && parseInt(content.is_pause) === 0 && parseInt(content.stop) === 0);
            });


            this.setState({
                ActiveGoals: activeGoals.length
            });


            //filter when backup goals is pause is false

            // let CompletedGoals = backUpGoals.filter((content)=>{
            //     return ((moment(content.end_date).format('YYYY-MM-DD') < now
            //         && parseInt(content.is_pause) === 0
            //         && parseInt(content.stop) === 0) ||
            //         (parseInt(content.stop) === 1)
            //     ) ;
            // });

            let CompletedGoals = getCompletedGoals(backUpGoals);

            this.setState({
                CompletedGoals: CompletedGoals.length
            });
            //filter when is paused is true
        } else {

        }
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
                error: true,
                errorMessage: 'Your Account is not Activated'
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

        request(url, null, true, "GET", callback);

    };
    getBackUpSavings = (url, callback) => {

        request(url, null, true, 'GET', callback);

    };


    handleLockedSavings = (state, res) => {

        if (state) {
            console.log(res);

        } else {

            console.log(res);
        }


    };


    analyseDashboardInfo = (status, res) => {
        console.log('dashboard response', status, res);
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


        if (status) {

            if (res) {
                this.setState({
                    accountInfo: res.data.data.accounts,
                    userName: res.data.data.name,
                    showLoader: false
                });

                // if(res.data.data.active){
                //
                //     //check for activated user
                //     this.checkActiveUser(res.data.data.active);
                //
                // }


                if (res.data.data.accounts) {

                    // loop through data and set appropriate states
                    let accounts = res.data.data.accounts.data;

                    let transactions = res.data.data.transactions.data;
                    transactions = transactions.filter((content) => content.status == 'success');

                    this.setState({
                        transactions
                    });

                    accounts.map((content, idx) => {
                        if (content.account_type_id === STANDARD_ACCOUNT) {
                            this.setState({
                                vaultAmount: parseFloat(content.balance).toFixed(2)
                            })
                        } else if (content.account_type_id === BACKUP_GOALS_ACCOUNT) {
                            this.setState({
                                backupAmount: parseFloat(content.balance).toFixed(2)
                            })
                        } else if (content.account_type_id === LOCKED_ACCOUNT) {
                            this.setState({
                                lockedSavingsAmount: parseFloat(content.balance).toFixed(2)
                            })
                        } else if (content.account_type_id === INTEREST_ACCOUNT) {
                            this.setState({
                                stashAmount: parseFloat(content.balance).toFixed(2),
                                totalInterest: parseFloat(content.balance).toFixed(2)
                            })
                        }

                    });


                }


            }

        } else {
            console.log(res)
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

    async getToken() {
        return await getLocalStorage(USERTOKEN);
    }

    componentDidMount() {

        // check if user is activated

        //if user account is activated

        //setup dashboard

        //get token if token isset
        let token = this.getToken();
        token.then(() => {
            this.setupDashBoard()
        });
        // if(token){
        //     this.setupDashBoard();
        // }


    }


    render() {
        const {
            vaultAmount, backupAmount, lockedSavingsAmount, stashAmount, lockedSavingsInterest,
            transactions, userName, totalInterest, vaultInterest, CompletedGoals, ActiveGoals, totalSteadySave
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
                        vaultInterest={vaultInterest}
                        backupAmount={backupAmount}
                        lockedSavingsAmount={lockedSavingsAmount}
                        lockedSavingsInterest={lockedSavingsInterest}
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
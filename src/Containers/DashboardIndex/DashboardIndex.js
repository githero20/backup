import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardContainer from "../../Components/Dashboard/DashboardContainer/DashboardContainer";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import {
    activateUserEndpoint,
    CentralVaultInterest, GetBackUpGoals,
    getUserInfoEndpoint,
    GetUserKYC, LockedInterest,
    resendActEndpoint
} from "../../RouteLinks/RouteLinks";
import {api, getLocalStorage, request, setLocalStorage} from "../../ApiUtils/ApiUtils";
import {
    BACKUP_GOALS_ACCOUNT,
    getCompletedGoals,
    INTEREST_ACCOUNT,
    KYC,
    LOCKED_ACCOUNT,
    STANDARD_ACCOUNT, toastMessage
} from "../../Helpers/Helper";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";
import {SHOWAD, USERINFO, USERTOKEN} from "../../Components/Auth/HOC/authcontroller";
import ActivationModal from "../../Components/Dashboard/ActivationModal/ActivationModal";
import {ToastProvider,withToastManager} from 'react-toast-notifications';
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import StartNowModal from "../../Components/Dashboard/StartNowModal/StartNowModal";
import moment from "moment";
import {_axios, _getHeader} from "../../utils";
import {getFirstTimeUser, storeFirstTimeLogin} from "../../actions/UserAction";


class DashboardIndex extends Component {

    state = {
        showSteadySavingModal: false,
        showActiveGoalModal: false,
        showlockedSavingsModal: false,
        showStartModal: false,
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
        updateKyc: false,
        lockedSavingsInterest: 0
    };

    constructor(props) {
        super(props);
        this.getToken = this.getToken.bind(this);
        this.setupDashBoard = this.setupDashBoard.bind(this);
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

        storeFirstTimeLogin(this.handleFirstTimeLogin);
        // setLocalStorage(SHOWAD, 'dont_show');

    };

    handleFirstTimeLogin = (status,response) =>{
        console.log('res',status,response);
        if(status && response){
            console.log('res',response);
        }
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
        getFirstTimeUser(this.handleFirstTimeUSer);
        // if (!localStorage.getItem(SHOWAD)) {
        //     setLocalStorage(SHOWAD, 'show');
        //     // show the add
        //     this.setState({
        //         showStartModal: true
        //     })
        //
        // } else if (JSON.stringify(localStorage.getItem(SHOWAD)) !== 'show') {
        //     this.setState({
        //         showStartModal: false
        //     })
        //
        // }
    };

    handleFirstTimeUSer=(status,response)=>{
        if(status && response == null){
            this.setState({
                showStartModal: true
            })
        }
    };

    async setupDashBoard (){

        //controls add display
        const config = {
            headers: _getHeader()
        };

        this.adModalController();

        try {
            const [UserInfoRes, CentralVaultIntRes,LockedIntRes,BackUpRes] = await Promise.all([
                _axios.get(getUserInfoEndpoint,config),
                _axios.get(CentralVaultInterest,config),
                _axios.get(LockedInterest,config),
                _axios.get(GetBackUpGoals,config),
            ]);
            let transactions = [];
            const now = moment().format('YYYY-MM-DD');
            let accounts,vaultAmount,backupAmount,lockedSavingsAmount,stashAmount,totalInterest = 0;
            this.showUpdateKYC(UserInfoRes.data.data);
            if (UserInfoRes.data.data.accounts) {
                // loop through data and set appropriate states
                accounts = UserInfoRes.data.data.accounts.data;
                transactions = UserInfoRes.data.data.transactions.data;
                transactions = transactions.filter((content) => content.status == 'success');
                accounts.map((content, idx) => {
                    if (content.account_type_id == STANDARD_ACCOUNT) {
                        vaultAmount = parseFloat(content.balance).toFixed(2);
                    } else if (content.account_type_id == BACKUP_GOALS_ACCOUNT) {
                        backupAmount= parseFloat(content.balance).toFixed(2);
                    } else if (content.account_type_id == LOCKED_ACCOUNT) {
                        lockedSavingsAmount= parseFloat(content.balance).toFixed(2);
                    } else if (content.account_type_id == INTEREST_ACCOUNT) {
                        stashAmount= parseFloat(content.balance).toFixed(2);
                        totalInterest= parseFloat(content.balance).toFixed(2);
                    }
                });

            }
            const backUpGoals = BackUpRes.data.data;
            // //check  to  filter all goals where current data is greater than today
            let activeGoals = backUpGoals.filter((content) => {
                return (moment(content.end_date).format('YYYY-MM-DD') > now && parseInt(content.is_pause) === 0 && parseInt(content.stop) === 0);
            });
            let CompletedGoals = getCompletedGoals(backUpGoals);
            this.setState({
                showLoader: false,
                accountInfo: UserInfoRes.data.data.accounts,
                userName: UserInfoRes.data.data.name,
                lockedSavingsInterest: parseFloat(JSON.parse(LockedIntRes.data.data)).toFixed(2),
                vaultInterest: parseFloat(JSON.parse(CentralVaultIntRes.data.data)).toFixed(2),
                vaultAmount,
                transactions,
                backupAmount,
                lockedSavingsAmount,
                stashAmount,
                totalInterest,
                ActiveGoals: activeGoals.length,
                CompletedGoals: CompletedGoals
            });
        }catch (e) {
            console.log('err res',e);
            this.setState({
                showLoader: false,
            });
            toastMessage('unable to get user information at the moment','error',this);
        }

    };


    activateAccount = () => {
        api(activateUserEndpoint, null, true, false, this.handleUserActivation)
    };


    handleUserActivation = (state, res) => {
        if (state) {
            this.setState({
                activationSuccess: true,
                error: false,
            })
        }
    };

    showUpdateKYC = (data) => {
        const update = localStorage.getItem(KYC);
        if (update == null) {
            if (data.accounts) {
                // loop through data and set appropriate states
                let accounts = data.accounts.data;
                accounts.map((content, idx) => {
                    if (content.account_type_id === STANDARD_ACCOUNT) {
                        if (parseFloat(content.balance).toFixed(2) >= 1000000) {
                            this.setState({
                                updateKyc: true,
                            });
                        }
                    }
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
        //
        let token = this.getToken();
        token.then(() => {
            this.setupDashBoard();
        });

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
                        updateKyc={this.state.updateKyc}
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

export default withToastManager(DashboardIndex);
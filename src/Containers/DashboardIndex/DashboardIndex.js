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
    LockedInterest
} from "../../RouteLinks/RouteLinks";
import {api, getLocalStorage} from "../../ApiUtils/ApiUtils";
import {
    BACKUP_GOALS_ACCOUNT,
    getCompletedGoals,
    INTEREST_ACCOUNT,
    LOCKED_ACCOUNT,
    STANDARD_ACCOUNT
} from "../../Helpers/Helper";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";
import {USERTOKEN} from "../../Components/Auth/HOC/authcontroller";
import ActivationModal from "../../Components/Dashboard/ActivationModal/ActivationModal";
import {withToastManager} from 'react-toast-notifications';
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import StartNowModal from "../../Components/Dashboard/StartNowModal/StartNowModal";
import moment from "moment";
import {_axios, _getHeader} from "../../utils";
import {getFirstTimeUser, isKycUpdated, storeFirstTimeLogin} from "../../actions/UserAction";
import CreateSteadySaveModal from "../../Components/Dashboard/CreateSteadySaveModal/CreateSteadySaveModal";
import swal from 'sweetalert';

class DashboardIndex extends Component {

    state = {
        showSteadySavingModal: false,
        showActiveGoalModal: false,
        showlockedSavingsModal: false,
        showStartModal: false,
        showActivationModal: false,
        showAdModal: false,
        error: false,
        activationSuccss: false,
        accountInfo: null,
        errorMessage: '',
        userName: '',
        vaultAmount: 0,
        backupAmount: 0,
        lockedSavingsAmount: 0,
        stashAmount: 0,
        transactions: [],
        totalInterest: 0,
        totalSteadySave: 0,
        ActiveGoals: 0,
        CompletedGoals: 0,
        vaultInterest: 0,
        lockedSavingsInterest: 0,
        email: null,
        showLoader: true,
        isActive: false,
        updateKyc: false,
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
        this.setState({showStartModal: false});
        storeFirstTimeLogin(this.handleFirstTimeLogin);
    };

    handleFirstTimeLogin = (status, response) => {
        if (status && response) {}
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


    closeLSModal = (status = false) => {
        this.setState({
            showlockedSavingsModal: false,
            showLoader: true,
        });
        if (status) this.setupDashBoard();
    };


    adModalController = () => {
        //when user logs in for the first time
        getFirstTimeUser(this.handleFirstTimeUSer);
    };

    handleFirstTimeUSer = (status, response) => {
        if (status && response == null) {
            this.setState({
                showStartModal: true
            })
        }
    };

    async setupDashBoard() {

        //controls add display
        const config = {headers: _getHeader()};
        this.adModalController();

        try {
            const [UserInfoRes, CentralVaultIntRes, LockedIntRes, BackUpRes] = await Promise.all([
                _axios.get(getUserInfoEndpoint, config),
                _axios.get(CentralVaultInterest, config),
                _axios.get(LockedInterest, config),
                _axios.get(GetBackUpGoals, config),
            ]);

            let transactions = [];
            const now = moment().format('YYYY-MM-DD');
            let accounts, vaultAmount, backupAmount, lockedSavingsAmount, stashAmount, totalInterest = 0;
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
                        backupAmount = parseFloat(content.balance).toFixed(2);
                    } else if (content.account_type_id == LOCKED_ACCOUNT) {
                        lockedSavingsAmount = parseFloat(content.balance).toFixed(2);
                    } else if (content.account_type_id == INTEREST_ACCOUNT) {
                        stashAmount = parseFloat(content.balance).toFixed(2);
                        totalInterest = parseFloat(content.balance).toFixed(2);
                    }
                });
            }

            const backUpGoals = BackUpRes.data.data;
            // //check  to  filter all goals where current data is greater than today
            let activeGoals = backUpGoals.filter((content) => {
                return (moment(content.end_date).format('YYYY-MM-DD') > now &&
                    parseInt(content.is_pause) === 0 && parseInt(content.stop) === 0);
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

        } catch (e) {
            this.setState({showLoader: false});
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
        isKycUpdated((state, res) => {
            if (state && res) {
                if (res == null || res.is_kyc_updated == 0) {
                    if (data.accounts) {
                        // loop through data and set appropriate states
                        let accounts = data.accounts.data;
                        accounts.map((content, idx) => {
                            if (content.account_type_id === STANDARD_ACCOUNT) {
                                if (parseFloat(content.balance).toFixed(2) >= 1000000) {
                                    this.setState({updateKyc: true});
                                }
                            }
                        });
                    }
                }
            }
        });

    };


    async getToken() {
        return await getLocalStorage(USERTOKEN);
    }

    componentDidMount() {
        let token = this.getToken();
        token.then(() => {
            this.setupDashBoard();
        });


    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reload) {
            this.setState({showLoader: true});
            this.setupDashBoard()
        }
    }


    render() {
        const {
            vaultAmount, backupAmount, lockedSavingsAmount, stashAmount, lockedSavingsInterest,reload,
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
                        reload={reload}
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
                        hideSSModal={this.closeSteadySaveModal}
                        showSSModal={this.showSteadySaveModal}
                        hideAGModal={this.closeActiveGoalModal}
                        showAGModal={this.showActiveGoalModal}
                        hideLSModal={this.closeLSModal}
                        showLSModal={this.showLSModal}
                    />

                    <CreateSteadySaveModal
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
                    <ActivationModal
                        show={this.state.showActivationModal}
                        email={this.state.email}
                    />
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
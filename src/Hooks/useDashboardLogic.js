import {useEffect, useState} from 'react';
import {getFirstTimeUser, isKycUpdated, storeFirstTimeLogin} from "../actions/UserAction";
import {_axios, _getHeader} from "../utils";
import {centralVaultInterest, getBackUpGoals, getUserInfoEndpoint, lockedInterest} from "../RouteLinks/RouteLinks";
import {
    BACKUP_GOALS_ACCOUNT,
    BACKUP_GOALS_INTEREST,
    getCompletedGoals,
    INTEREST_ACCOUNT,
    LOCKED_ACCOUNT,
    STANDARD_ACCOUNT
} from "../Helpers/Helper";
import moment from "moment";
import {getLocalStorage} from "../ApiUtils/ApiUtils";
import {USERTOKEN} from "../Components/Auth/HOC/authcontroller";


function useDashboardLogic(reload) {

    const [state, setState] = useState({
        showSteadySavingModal: false,
        showActiveGoalModal: false,
        showlockedSavingsModal: false,
        showDirectInstantSaveModal: false,
        showStartModal: false,
        showActivationModal: false,
        showAdModal: false,
        error: false,
        activationSuccess: false,
        accountInfo: null,
        errorMessage: '',
        email: null,
        showLoader: true,
        isActive: false,
        updateKyc: false,
    });


    useEffect(() => {
        let token = getToken();
        if (token) setupDashBoard()
            .then(data => setState({...state, ...data, showLoader: false}));
    }, [reload]);


    const showSteadySaveModal = () => {
        setState({...state, showSteadySavingModal: true});
    };


    const showActiveGoalModal = () => {
        setState({...state, showActiveGoalModal: true});
    };

    const showDirectInstantSaveModal = () => {
        setState({...state, showDirectInstantSaveModal: true});
    };
    const hideDirectInstantSaveModal = (status = false) => {
        setState({...state, showDirectInstantSaveModal: false});
        if (status) setupDashBoard();
    };

    const closeActiveGoalModal = () => {
        setState({...state, showActiveGoalModal: false});
    };

    const closeStartModal = () => {
        setState({...state, showStartModal: false});
        storeFirstTimeLogin(handleFirstTimeLogin);
    };

    const handleFirstTimeLogin = (status, response) => {
        if (status && response) {
        }
    };

    const closeSteadySaveModal = () => {
        setState({
            ...state,
            showSteadySavingModal: false
        });
    };


    const showLSModal = () => {
        setState({
            ...state,
            showlockedSavingsModal: true
        });
    };


    const closeLSModal = (status = false) => {
        setState({
            ...state,
            showlockedSavingsModal: false,
            showLoader: true,
        });
        if (status) setupDashBoard();
    };


    const adModalController = () => {
        getFirstTimeUser(handleFirstTimeUSer);
    };

    const handleFirstTimeUSer = (status, response) => {
        if (status && response == null) {
            setState({
                ...state,
                showStartModal: true
            })
        }
    };


    async function setupDashBoard() {
        const config = {headers: _getHeader()};
        adModalController();
        try {
            const [userInfoRes, centralVaultIntRes, lockedIntRes, backUpRes] = await Promise.all([
                _axios.get(getUserInfoEndpoint, config),
                _axios.get(centralVaultInterest, config),
                _axios.get(lockedInterest, config),
                _axios.get(getBackUpGoals, config),
            ]);

            showUpdateKYC(userInfoRes.data.data);
            return {
                userData: userInfoRes.data.data,
                backupData: backUpRes.data.data,
                lockedSavingsData: lockedIntRes.data.data,
                centralVaultData: centralVaultIntRes.data.data
            };

        } catch (e) {
            setState({showLoader: false, ...state});
        }

    }


    const showUpdateKYC = (data) => {
        isKycUpdated((state, res) => {
            if (!state) return;
            if (res || res.is_kyc_updated != 0) return;
            if (!data.accounts) return;
            let accounts = data.accounts.data;
            accounts.map((content, idx) => {
                if (content.account_type_id === STANDARD_ACCOUNT) {
                    if (parseFloat(content.balance).toFixed(2) >= 1000000) {
                        setState({updateKyc: true});
                    }
                }
            });

        });

    };


    const convertToFixed = (data) => parseFloat(data).toFixed(2);

    const getAccountsAndInterests = (data) => {
        let transactions = [];

        let accounts = [], vaultAmount = 0, backupAmount = 0,
            backupInterest = 0, lockedSavingsAmount = 0, stashAmount = 0,
            totalInterest = 0, userName = "";

        if (data && data.accounts) {
            // loop through data and set appropriate states
            accounts = data.accounts.data;
            userName = data.name;
            transactions = data.transactions.data;
            transactions = transactions.filter((content) => content.status == 'success');
            accounts.map((content) => {

                if (content.account_type_id == STANDARD_ACCOUNT)
                    vaultAmount = convertToFixed(content.balance);

                if (content.account_type_id == BACKUP_GOALS_ACCOUNT)
                    backupAmount = convertToFixed(content.balance);

                if (content.account_type_id == BACKUP_GOALS_INTEREST)
                    backupInterest = convertToFixed(content.balance);

                if (content.account_type_id == LOCKED_ACCOUNT)
                    lockedSavingsAmount = convertToFixed(content.balance);

                if (content.account_type_id == INTEREST_ACCOUNT) {
                    stashAmount = convertToFixed(content.balance);
                    totalInterest = convertToFixed(content.balance);
                }
            });
        }

        return {
            accounts, userName, transactions,
            vaultAmount, backupAmount,
            stashAmount, lockedSavingsAmount,
            totalInterest, backupInterest
        }
    };


    const getActiveGoals = (data) => {
        const now = moment().format('YYYY-MM-DD');
        // //check  to  filter all goals where current data is greater than today
        return data && data.filter((content) => {
            return (moment(content.end_date).format('YYYY-MM-DD') > now &&
                parseInt(content.is_pause) === 0 && parseInt(content.stop) === 0);
        }).length;
    };

    function getToken() {
        return getLocalStorage(USERTOKEN);
    }


    const {backupData, lockedSavingsData, centralVaultData, userData} = state;
    let completedGoals = getCompletedGoals(backupData || []);
    const activeGoals = getActiveGoals(backupData || []);
    const lockedSavingsInterest = lockedSavingsData ? parseFloat(lockedSavingsData).toFixed(2) : 0;
    const vaultInterest = centralVaultData ? parseFloat(centralVaultData).toFixed(2) : 0;
    const accountProps = getAccountsAndInterests(userData);


    return {
        accountProps,
        vaultInterest,
        state,
        lockedSavingsInterest,
        showLSModal,
        closeActiveGoalModal,
        closeStartModal,
        activeGoals,
        completedGoals,
        closeLSModal,
        showSteadySaveModal,
        showActiveGoalModal,
        closeSteadySaveModal,
        showDirectInstantSaveModal,
        hideDirectInstantSaveModal,
    };
}

export default useDashboardLogic;

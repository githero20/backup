import React, {Component} from 'react';
import {Route} from "react-router";
import Login from "../Containers/Login/Login";
import SignUp from "../Containers/SignUp/SignUp";
import {BrowserRouter as Router} from "react-router-dom";
import Home from "../Containers/Home/Home";
import DashboardIndex from "../Containers/DashboardIndex/DashboardIndex";
import InstantSave from "../Containers/InstantSave/InstantSave";
import SteadySave from "../Containers/SteadySave/SteadySave";
import LockedSavings from "../Containers/LockedSavings/LockedSavings";
import BackupGoals from "../Containers/BackupGoals/BackupGoals";
import Transactions from "../Containers/Transactions/Transactions";
import Withdrawal from "../Containers/Withdrawal/Withdrawal";
import ProfileSetting from "../Containers/ProfileSetting/ProfileSetting";
import BankCardSetting from "../Containers/BankCardSetting/BankCardSetting";
import ActivateAccount from "../Containers/ActivateAccount/ActivateAccount";
import {
    ActivateAccountLink,
    BackupGoalsLink,
    BackupStashLink,
    BankCardLink,
    DashboardLink,
    EmailActivationLink,
    ForgotPasswordLink,
    HomeLink,
    InstantSaveLink,
    KycSettingLink,
    LockedSavingsLink,
    LoginLink,
    ProfileSettingLink,
    ResendActivationLink,
    ResetPasswordLink,
    SignUpLink,
    SteadySaveLink,
    TransactionsLink,
    WithdrawalLink
} from "../RouteLinks/RouteLinks";
import ForgotPassword from "../Containers/ForgotPassword/ForgotPassword";
import AuthController from "../Components/Auth/HOC/authcontroller";
import ResetPassword from "../Containers/ResetPassword/ResetPassword";
import EmailActivation from "../Containers/EmailActivation/EmailActivation";
import ResendActivation from "../Containers/ResendActivation/ResendActivation";
import KycSetting from "../Containers/KycSetting/KycSetting";
import BackupStash from "../Containers/BackupStash/BackupStash";
import {ToastProvider} from "react-toast-notifications";

class AppRouter extends Component {

    render() {

        return (
            <React.Fragment>
                <ToastProvider>
                    <Router>
                        <Route exact path={HomeLink} component={Home}/>
                        {/*dashboard Routes*/}
                        {/*dashboard Routes*/}
                        <Route path={DashboardLink} component={AuthController(DashboardIndex)}/>
                        <Route path={InstantSaveLink} component={AuthController(InstantSave)}/>
                        <Route path={SteadySaveLink} component={AuthController(SteadySave)}/>
                        <Route path={LockedSavingsLink} component={AuthController(LockedSavings)}/>
                        <Route path={BackupGoalsLink} component={AuthController(BackupGoals)}/>
                        <Route path={TransactionsLink} component={AuthController(Transactions)}/>
                        <Route path={WithdrawalLink} component={AuthController(Withdrawal)}/>
                        <Route path={ProfileSettingLink} component={AuthController(ProfileSetting)}/>
                        <Route path={BankCardLink} component={AuthController(BankCardSetting)}/>
                        <Route path={KycSettingLink} component={AuthController(KycSetting)}/>
                        <Route path={BackupStashLink} component={AuthController(BackupStash)}/>
                        <Route path={EmailActivationLink} component={EmailActivation}/>
                        <Route path={ResendActivationLink} component={ResendActivation}/>

                        {/*auth routes*/}
                        <Route path={LoginLink} component={Login}/>
                        <Route path={SignUpLink} component={SignUp}/>
                        <Route path={ActivateAccountLink} component={ActivateAccount}/>
                        <Route path={ForgotPasswordLink} component={ForgotPassword}/>
                        <Route path={ResetPasswordLink} component={ResetPassword}/>
                    </Router>
                </ToastProvider>
            </React.Fragment>
        );
    }
}

export default AppRouter;
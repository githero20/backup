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
    ActivateAccountLink, BackupGoalsLink, BankCardLink,
    DashboardLink,
    ForgotPasswordLink,
    InstantSaveLink, LockedSavingsLink, LoginLink, ProfileSettingLink, SignUpLink,
    SteadySaveLink, TransactionsLink, WithdrawalLink
} from "../RouteLinks/RouteLinks";
import ForgotPassword from "../Containers/ForgotPassword/ForgotPassword";
import AuthController from "../Components/Auth/HOC/authcontroller";


class AppRouter extends Component {

    render() {

        return (
            <React.Fragment>
                <Router>
                    <Route exact path="/" component={Home} />
                    {/*dashboard Routes*/}
                    <Route path={DashboardLink} component={AuthController(DashboardIndex)} />
                    <Route path={InstantSaveLink} component={InstantSave} />
                    <Route path={SteadySaveLink} component={SteadySave} />
                    <Route path={LockedSavingsLink} component={LockedSavings} />
                    <Route path={BackupGoalsLink} component={BackupGoals} />
                    <Route path={TransactionsLink} component={Transactions} />
                    <Route path={LockedSavingsLink} component={LockedSavings} />
                    <Route path={WithdrawalLink} component={Withdrawal} />
                    <Route path={ProfileSettingLink} component={ProfileSetting} />
                    <Route path={BankCardLink} component={BankCardSetting} />

                    {/*auth routes*/}
                    <Route path={LoginLink} component={Login} />
                    <Route path={SignUpLink} component={SignUp} />
                    <Route path={ActivateAccountLink} component={ActivateAccount} />
                    <Route path={ForgotPasswordLink} component={ForgotPassword} />
                </Router>

            </React.Fragment>
        );
    }
}

export default AppRouter;
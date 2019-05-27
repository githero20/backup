import React, {Component} from 'react';
import DashboardRouter from "./DashboardRouter/DashboardRouter";
import HomeRouter from "./HomeRouter/HomeRouter";
import AuthRoute from "./AuthRoute/AuthRoute";
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


class AppRouter extends Component {


    render() {
        return (
            <React.Fragment>
                {/*<HomeRouter />*/}
                {/*<DashboardRouter />*/}
                {/*<AuthRoute />*/}
                {/*home route*/}
                <Router>
                    <Route exact path="/" component={Home} />

                    {/*dashboard Routes*/}
                    <Route path="/dashboard" component={DashboardIndex} />
                    <Route path="/instant-save" component={InstantSave} />
                    <Route path="/steady-save" component={SteadySave} />
                    <Route path="/locked-savings" component={LockedSavings} />
                    <Route path="/backup-goals" component={BackupGoals} />
                    <Route path="/transactions" component={Transactions} />
                    <Route path="/locked-savings" component={LockedSavings} />
                    <Route path="/withdrawal" component={Withdrawal} />
                    <Route path="/profile-setting" component={ProfileSetting} />
                    <Route path="/bank-card-setting" component={BankCardSetting} />

                    {/*auth routes*/}
                    <Route path="/login" component={Login} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/activate-account" component={ActivateAccount} />
                </Router>

            </React.Fragment>
        );
    }
}

export default AppRouter;
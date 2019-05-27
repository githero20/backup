import React, {Component} from 'react';
import {Route,BrowserRouter as Router} from "react-router-dom";
import '../../admin/app-assets/css/vendors.css';
import '../../admin/app-assets/css/app.css';
import '../../admin/app-assets/css/core/menu/menu-types/vertical-menu-modern.css';
import '../../admin/app-assets/css/core/colors/palette-gradient.css';
import '../../admin/app-assets/fonts/simple-line-icons/style.css';
import '../../admin/assets/css/style.css';
import DashboardIndex from "../../Containers/DashboardIndex/DashboardIndex";
import InstantSave from "../../Containers/InstantSave/InstantSave";
import SteadySave from "../../Containers/SteadySave/SteadySave";
import LockedSavings from "../../Containers/LockedSavings/LockedSavings";
import BackupGoals from "../../Containers/BackupGoals/BackupGoals";
import Transactions from "../../Containers/Transactions/Transactions";
import Withdrawal from "../../Containers/Withdrawal/Withdrawal";
import ProfileSetting from "../../Containers/ProfileSetting/ProfileSetting";
import BankCardSetting from "../../Containers/BankCardSetting/BankCardSetting";
import Login from "../../Containers/Login/Login";
import SignUp from "../../Containers/SignUp/SignUp";

class DashboardRouter extends Component {

    render() {
        return (
            <React.Fragment>
                <Router>

                    <Route exact path="/dashboard" component={DashboardIndex} />
                    <Route path="/instant-save" component={InstantSave} />
                    <Route path="/steady-save" component={SteadySave} />
                    <Route path="/locked-savings" component={LockedSavings} />
                    <Route path="/backup-goals" component={BackupGoals} />
                    <Route path="/transactions" component={Transactions} />
                    <Route path="/locked-savings" component={LockedSavings} />
                    <Route path="/withdrawal" component={Withdrawal} />
                    <Route path="/profile-setting" component={ProfileSetting} />
                    <Route path="/bank-card-setting" component={BankCardSetting} />
                </Router>
            </React.Fragment>
        );
    }
}

export default DashboardRouter;
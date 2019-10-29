import React, {Component, Fragment} from 'react';
import {Redirect, Route} from "react-router";
import Login from "../Containers/Login/Login";
import SignUp from "../Containers/SignUp/SignUp";
import {BrowserRouter as Router, Switch} from "react-router-dom";
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
    addWithdrawalLink,
    BackupGoalsLink,
    BackupStashLink,
    BankCardLink, botCreatePasswordLink, challengeLink,
    DashboardLink,
    EmailActivationLink,
    FaqLink,
    ForgotPasswordLink,
    HomeLink,
    InstantSaveLink,
    InviteLink,
    KycSettingLink,
    LockedSavingsLink,
    LoginLink,
    ProfileSettingLink, ReferralsLink,
    ResendActivationLink,
    ResetPasswordLink,
    SignUpLink,
    SteadySaveLink,
    TransactionsLink,
    WithdrawalLink
} from "../RouteLinks/RouteLinks";
import ForgotPassword from "../Containers/ForgotPassword/ForgotPassword";
import AuthController, {USERINFO} from "../Components/Auth/HOC/authcontroller";
import ResetPassword from "../Containers/ResetPassword/ResetPassword";
import EmailActivation from "../Containers/EmailActivation/EmailActivation";
import ResendActivation from "../Containers/ResendActivation/ResendActivation";
import KycSetting from "../Containers/KycSetting/KycSetting";
import BackupStash from "../Containers/BackupStash/BackupStash";
import {ToastProvider} from "react-toast-notifications";
import SetupWithdrawal from "../Containers/SetupWithdrawal/SetupWithdrawal";
import ErrorPage from "../Containers/ErrorPage/ErrorPage";
import Faq from "../Containers/Faq/faq";
import {TransitionGroup, Transition} from "react-transition-group";
import {play, exit} from "../timelines";
import Referrals from "../Containers/Referrals/Referrals";
import ReactGA from 'react-ga';
import HomePage from "../Containers/Home/HomePage";
import Challenge from "../Containers/challenge/Challenge";


class AppRouter extends Component {


    componentDidMount() {
        ReactGA.initialize('UA-148092447-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
        const user = localStorage.getItem(USERINFO);
        return (
            <React.Fragment>
                <ToastProvider>
                    <Router>
                        <Route render={({location}) => {
                            const {pathname, key} = location;
                            return (
                                <Fragment>
                                    <TransitionGroup component={null}>
                                        <Transition
                                            key={key}
                                            appear={true}
                                            onEnter={(node, appears) => play(pathname, node, appears)}
                                            onExit={(node, appears) => exit(node, appears)}
                                            timeout={{enter: 750, exit: 150}}
                                        >
                                            <Switch>
                                                <Route exact path={HomeLink} component={Home}/>
                                                {/*dashboard Routes*/}
                                                <Route exact path={DashboardLink}
                                                       component={AuthController(DashboardIndex)}/>
                                                <Route path={InstantSaveLink} component={AuthController(InstantSave)}/>
                                                <Route path={SteadySaveLink} component={AuthController(SteadySave)}/>
                                                <Route path={LockedSavingsLink}
                                                       component={AuthController(LockedSavings)}/>
                                                <Route path={BackupGoalsLink} component={AuthController(BackupGoals)}/>
                                                <Route path={TransactionsLink}
                                                       component={AuthController(Transactions)}/>
                                                <Route path={ReferralsLink} component={AuthController(Referrals)}/>
                                                <Route path={WithdrawalLink} component={AuthController(Withdrawal)}/>
                                                <Route path={ProfileSettingLink}
                                                       component={AuthController(ProfileSetting)}/>
                                                <Route path={BankCardLink} component={AuthController(BankCardSetting)}/>
                                                <Route path={KycSettingLink} component={AuthController(KycSetting)}/>
                                                <Route path={BackupStashLink} component={AuthController(BackupStash)}/>
                                                <Route path={EmailActivationLink} component={EmailActivation}/>
                                                <Route path={ResendActivationLink} component={ResendActivation}/>
                                                <Route path={challengeLink} component={Challenge}/>

                                                {/*auth routes*/}
                                                <Route path={LoginLink} render={() => (
                                                    user ? window.location.href = DashboardLink : <Login/>
                                                )}/>
                                                <Route path={SignUpLink} render={(props) => (
                                                    user ? window.location.href = DashboardLink : <SignUp {...props}/>
                                                )}/>
                                                <Route path={InviteLink} component={SignUp}/>
                                                <Route path={ActivateAccountLink} component={ActivateAccount}/>
                                                <Route path={ForgotPasswordLink} component={ForgotPassword}/>

                                                <Route path={botCreatePasswordLink}
                                                       render={props => <ForgotPassword bot={true} {...props} />}/>
                                                <Route path={ResetPasswordLink} component={ResetPassword}/>
                                                <Route path={addWithdrawalLink} component={SetupWithdrawal}/>
                                                <Route path={FaqLink} component={Faq}/>
                                                <Route component={ErrorPage}/>
                                            </Switch>
                                        </Transition>
                                    </TransitionGroup>
                                </Fragment>
                            )
                        }}
                        />

                    </Router>
                </ToastProvider>
            </React.Fragment>
        );
    }
}

export default AppRouter;
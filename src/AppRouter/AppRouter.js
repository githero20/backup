import React, { Component, Fragment } from "react";
import { Route } from "react-router";
import Login from "../Containers/Login/Login";
import SignUp from "../Containers/SignUp/SignUp";
import { BrowserRouter as Router, Switch } from "react-router-dom";
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
  BankCardLink,
  botCreatePasswordLink,
  ChallengeLink,
  DashboardLink,
  directInstantSave,
  directSteadySave,
  EmailActivationLink,
  FaqLink,
  ForgotPasswordLink,
  HomeLink,
  InstantSaveLink,
  InviteLink,
  KycSettingLink,
  LockedSavingsLink,
  LoginLink,
  ProfileSettingLink,
  ReferralsLink,
  ResendActivationLink,
  ResetPasswordLink,
  sbDashboardLink,
  scoreboardLink,
  SignUpLink,
  SteadySaveLink,
  TermsAndCondLink,
  TransactionsLink,
  WithdrawalLink,
  MillexLink,
} from "../RouteLinks/RouteLinks";
import ForgotPassword from "../Containers/ForgotPassword/ForgotPassword";
import AuthController, {
  USERINFO,
} from "../Components/Auth/HOC/authcontroller";
import ResetPassword from "../Containers/ResetPassword/ResetPassword";
import EmailActivation from "../Containers/EmailActivation/EmailActivation";
import ResendActivation from "../Containers/ResendActivation/ResendActivation";
import KycSetting from "../Containers/KycSetting/KycSetting";
import Snap from "../Containers/Snap/Snap";
import BackupStash from "../Containers/BackupStash/BackupStash";
import { ToastProvider } from "react-toast-notifications";
import SetupWithdrawal from "../Containers/SetupWithdrawal/SetupWithdrawal";
import ErrorPage from "../Containers/ErrorPage/ErrorPage";
import Faq from "../Containers/Faq/faq";
import { Transition, TransitionGroup } from "react-transition-group";
import { exit, play } from "../timelines";
import Referrals from "../Containers/Referrals/Referrals";
import ReactGA from "react-ga";
import Challenge from "../Containers/challenge/Challenge";
import PrivacyPolicy from "../Containers/privacy policy/PrivacyPolicy";
import YearlyReview from "../Containers/YearlyReview/YearlyReview";
import ScoreBoard from "../Containers/YearlyReview/ScoreBoard";
import ErrorBoundary from "../Components/Auth/HOC/ErrorBoundary";
import DirectSteadySave from "../Containers/DirectSteadySave/DirectSteadySave";
import DirectInstantSave from "../Containers/DirectInstantSave/DirectInstantSave";

class AppRouter extends Component {
  componentDidMount() {
    ReactGA.initialize("UA-148092447-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    const user = localStorage.getItem(USERINFO);

    return (
      <React.Fragment>
        <ToastProvider>
          <Router>
            <Route
              render={({ location }) => {
                const { pathname, key } = location;
                return (
                  <Fragment>
                    <ErrorBoundary>
                      <TransitionGroup component={null}>
                        <Transition
                          key={key}
                          appear={true}
                          onEnter={(node, appears) =>
                            play(pathname, node, appears)
                          }
                          onExit={(node, appears) => exit(node, appears)}
                          timeout={{ enter: 750, exit: 150 }}
                        >
                          <Switch>
                            <Route
                              exact
                              path={HomeLink}
                              render={() => <Home isLoggedIn={user} />}
                            />
                            <Route
                              exact
                              path={DashboardLink}
                              component={AuthController(DashboardIndex)}
                            />
                            <Route
                              path={InstantSaveLink}
                              component={AuthController(InstantSave)}
                            />
                            <Route
                              path={SteadySaveLink}
                              component={AuthController(SteadySave)}
                            />
                            <Route
                              path={LockedSavingsLink}
                              component={AuthController(LockedSavings)}
                            />
                            <Route
                              path={BackupGoalsLink}
                              component={AuthController(BackupGoals)}
                            />
                            <Route
                              path={TransactionsLink}
                              component={AuthController(Transactions)}
                            />
                            <Route
                              path={ReferralsLink}
                              component={AuthController(Referrals)}
                            />
                            <Route
                              path={WithdrawalLink}
                              component={AuthController(Withdrawal)}
                            />
                            <Route
                              path={ProfileSettingLink}
                              component={AuthController(ProfileSetting)}
                            />
                            <Route
                              path={BankCardLink}
                              component={AuthController(BankCardSetting)}
                            />
                            <Route
                              path={MillexLink}
                              component={AuthController(Snap)}
                            />
                            <Route
                              path={KycSettingLink}
                              component={AuthController(KycSetting)}
                            />
                            <Route
                              path={BackupStashLink}
                              component={AuthController(BackupStash)}
                            />
                            <Route
                              path={EmailActivationLink}
                              component={EmailActivation}
                            />
                            <Route
                              path={ResendActivationLink}
                              component={ResendActivation}
                            />

                            <Route
                              path={ChallengeLink}
                              render={() => <Challenge isLoggedIn={user} />}
                            />
                            <Route
                              path={TermsAndCondLink}
                              component={PrivacyPolicy}
                            />

                            <Route
                              path={LoginLink}
                              render={() =>
                                user ? (
                                  (window.location.href = DashboardLink)
                                ) : (
                                  <Login />
                                )
                              }
                            />
                            <Route
                              path={SignUpLink}
                              render={(props) =>
                                user ? (
                                  (window.location.href = DashboardLink)
                                ) : (
                                  <SignUp {...props} />
                                )
                              }
                            />
                            <Route path={InviteLink} component={SignUp} />
                            <Route
                              path={ActivateAccountLink}
                              component={ActivateAccount}
                            />
                            <Route
                              path={ForgotPasswordLink}
                              component={ForgotPassword}
                            />
                            <Route
                              path={botCreatePasswordLink}
                              render={(props) => (
                                <ForgotPassword bot={true} {...props} />
                              )}
                            />
                            <Route
                              path={ResetPasswordLink}
                              component={ResetPassword}
                            />
                            <Route
                              path={addWithdrawalLink}
                              component={SetupWithdrawal}
                            />
                            <Route
                              path={FaqLink}
                              render={(props) => (
                                <Faq {...props} isLoggedIn={user} />
                              )}
                            />
                            <Route
                              exact
                              path={scoreboardLink}
                              component={YearlyReview}
                            />
                            <Route
                              exact
                              path={sbDashboardLink}
                              component={ScoreBoard}
                            />
                            <Route
                              path={directSteadySave}
                              component={DirectSteadySave}
                            />
                            <Route
                              path={directInstantSave}
                              component={DirectInstantSave}
                            />
                            <Route
                              render={(props) => (
                                <ErrorPage
                                  errorName={"Error 404!"}
                                  errorTitle={"Page Not Found"}
                                  {...props}
                                />
                              )}
                            />
                          </Switch>
                        </Transition>
                      </TransitionGroup>
                    </ErrorBoundary>
                  </Fragment>
                );
              }}
            />
          </Router>
        </ToastProvider>
      </React.Fragment>
    );
  }
}

export default AppRouter;

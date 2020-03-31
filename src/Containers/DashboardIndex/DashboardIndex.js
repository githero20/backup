import React from 'react';
import {withToastManager} from 'react-toast-notifications';
import StartNowModal from "../../Components/Dashboard/StartNowModal/StartNowModal";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import CreateSteadySaveModal from "../../Components/Dashboard/CreateSteadySaveModal/CreateSteadySaveModal";
import DashboardContainer from "../../Components/Dashboard/DashboardContainer/DashboardContainer";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import ActivationModal from "../../Components/Dashboard/ActivationModal/ActivationModal";
import useDashboardLogic from "../../Hooks/useDashboardLogic";

const DashboardIndex = (props) => {

    const {reload} = props;

    const {state,accountProps,...otherProps} = useDashboardLogic(reload);

    return (
        <React.Fragment>
            <div className="vertical-layout vertical-menu-modern
                 2-columns fixed-navbar  menu-expanded pace-done"
                 data-open="click" data-menu="vertical-menu-modern"
                 data-col="2-columns">
                <HorizontalNav userName={accountProps.userName}/>
                <VerticalNav userName={accountProps.userName}/>
                {state.showLoader ?
                    <DashboardLoader/> :
                    null}
                <DashboardContainer
                    isActive={state.isActive}
                    updateKyc={state.updateKyc}
                    reload={reload}
                    {...accountProps}
                    vaultInterest={otherProps.vaultInterest || 0}
                    lockedSavingsInterest={otherProps.lockedSavingsInterest || 0}
                    CompletedGoals={otherProps.CompletedGoals}
                    ActiveGoals={otherProps.ActiveGoals}
                    error={state.error}
                    errorMessage={state.errorMessage}
                    hideSSModal={otherProps.closeSteadySaveModal}
                    showSSModal={otherProps.showSteadySaveModal}
                    hideAGModal={otherProps.closeActiveGoalModal}
                    showAGModal={otherProps.showActiveGoalModal}
                    hideLSModal={otherProps.closeLSModal}
                    showLSModal={otherProps.showLSModal}
                />
                <CreateSteadySaveModal
                    show={state.showSteadySavingModal}
                    onHide={otherProps.closeSteadySaveModal}/>

                <LockedSavingModal
                    show={state.showlockedSavingsModal}
                    onHide={otherProps.closeLSModal}/>
                <BackUpGoalsModal
                    show={state.showActiveGoalModal}
                    onHide={otherProps.closeActiveGoalModal}/>
                <ActivationModal
                    show={state.showActivationModal}
                    email={state.email}/>
                <StartNowModal
                    show={state.showStartModal}
                    onHide={otherProps.closeStartModal}/>

            </div>
        </React.Fragment>
    );

};

export default withToastManager(DashboardIndex);
import React, {Component} from 'react';
import TransactionTable from "../TransactionTable/TransactionTable";
import MessageBox from "./MessageBox/MessageBox";
import CentralVaultCard from "../CentralVaultCard/CentralVaultCard";
import BackUpGoalCard from "../BackUpGoalCard/BackUpGoalCard";
import BackUpStashCard from "../BackUpStashCard/BackUpStashCard";
import LockedSavingsCard from "../LockedSavingCard/LockedSavingsCard";
import TotalSavingsBlueCard from "../TotalSavingsBlueCard/TotalSavingsBlueCard";
import TotalInterestCard from "../TotalSavingsCard/TotalInterestCard";

class DashboardContainer extends Component {


    //validate there is data

    // set the appropiate props

    // send the the children components


    render() {

        let {error, activateAccount} = this.props;

        //set appropriate data for vault cards

        const {
            vaultAmount, backupAmount, lockedSavingsAmount, stashAmount, totalSteadySave,
            transactions, totalInterest, ActiveGoals, CompletedGoals
        } = this.props;

        return (

            <React.Fragment>
                <div className="app-content content">
                    <div className="content-wrapper">
                        {/* notification component */}

                        {/*<MessageBox error={error} errorMessage={this.props.errorMessage} activateAccount={activateAccount}/>*/}

                        {/*Vault Card */}

                        <div className="content-body">
                            <div className="row">
                                <CentralVaultCard
                                    vaultAmount={vaultAmount}
                                    totalSteadySave={totalSteadySave}

                                />
                                {/*    TODO  ADD STEADY SAVE  */}


                                <BackUpGoalCard
                                    backupAmount={backupAmount}
                                    ActiveGoals={ActiveGoals}
                                    CompletedGoals={CompletedGoals}
                                    onHide={this.props.hideAGModal}
                                    showModal={this.props.showAGModal}
                                />

                                <LockedSavingsCard
                                    lockedSavingsAmount={lockedSavingsAmount}
                                    onHide={this.props.hideLSModal}
                                    showModal={this.props.showLSModal}
                                />

                                <BackUpStashCard stashAmount={stashAmount}/>

                            </div>

                            <div className="row">
                                <div className="col-md-4 col-lg-4 col-12 order-md-8">
                                    <TotalSavingsBlueCard totalSavings={vaultAmount}/>
                                    <TotalInterestCard totalInterest={totalInterest}/>
                                </div>
                                <TransactionTable transactions={transactions}/>

                            </div>


                        </div>

                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default DashboardContainer;
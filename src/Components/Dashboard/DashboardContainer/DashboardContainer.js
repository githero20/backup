import React, {Component} from 'react';
import TransactionTable from "../TransactionTable/TransactionTable";
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

        const columns = [
            {
                Header: 'Date',
                accessor: 'created_at' // String-based value accessors!
            }, {
                Header: 'Description',
                accessor: 'type',
                Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }, {
                Header: 'Amount',
                accessor: 'amount',
                // id: 'friendName', // Required because our accessor is not a string
                // Header: 'Friend Name',
                // accessor: d => d.friend.name // Custom value accessors!
                Cell: props =>  <label>&#8358;{parseFloat(props.value).toFixed(2)}</label>
            }, {
                Header: 'Reference',
                accessor: 'reference',
                // // Header: props => <span>Friend Age</span>, // Custom header components!
                // accessor: 'friend.age'
            }, {
                Header: 'Status',
                accessor: 'status',
                // // Header: props => <span>Friend Age</span>, // Custom header components!
                // accessor: 'friend.age'
                Cell: props =>  <label className="bg-light-green px-2 sm-pd">{props.value}</label>
            },
            {
                Header: 'Reference',
                accessor: 'reference',
                // // Header: props => <span>Friend Age</span>, // Custom header components!
                // accessor: 'friend.age'
            }];


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
                                <div className="col-md-6  col-12 ">
                                    <TotalSavingsBlueCard totalSavings={vaultAmount}/>

                                </div>
                                <div className="col-md-6  col-12 ">
                                    <TotalInterestCard totalInterest={totalInterest}/>

                                </div>

                            </div>

                            <div className="row">
                                <TransactionTable transactions={transactions} columns={columns} />

                            </div>


                        </div>

                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default DashboardContainer;
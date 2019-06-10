import React, {Component} from 'react';
import TransactionTable from "../TransactionTable/TransactionTable";
import CentralVaultCard from "../CentralVaultCard/CentralVaultCard";
import BackUpGoalCard from "../BackUpGoalCard/BackUpGoalCard";
import BackUpStashCard from "../BackUpStashCard/BackUpStashCard";
import LockedSavingsCard from "../LockedSavingCard/LockedSavingsCard";
import TotalSavingsBlueCard from "../TotalSavingsBlueCard/TotalSavingsBlueCard";
import TotalInterestCard from "../TotalSavingsCard/TotalInterestCard";
import moment from "moment";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import {amountFormatter, dateFormatter, descriptionFormatter, statusFormatter} from "../../../Helpers/Helper";
import { textFilter } from 'react-bootstrap-table2-filter';


class DashboardContainer extends Component {


    //validate there is data

    // set the appropiate props

    // send the the children components


    runFilter = ()=>{

        //take the value of select
        const filterValue = document.getElementById('filter-param').value;

        //setup table for filter

        // use value to filter table

    }



    render() {

        let {error, activateAccount} = this.props;

        //set appropriate data for vault cards
        let typeFilter;

        const {
            vaultAmount, backupAmount, lockedSavingsAmount, stashAmount, totalSteadySave,
            transactions, totalInterest, ActiveGoals, CompletedGoals
        } = this.props;

  const columns = [
            {
                text: 'Date',
                dataField: 'created_at' ,
                formatter:dateFormatter,
                sort:true,
            },
            {
                text: 'Description',
                dataField: 'type',
                formatter:descriptionFormatter,
                sort:true,

            },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter:amountFormatter,
                sort:true,

            },
            {
                text: 'Status',
                dataField: 'status',
                formatter:statusFormatter,
                sort:true,
            },
            {
                text: 'Reference',
                dataField: 'reference',
                sort:true,

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
                                <TransactionTable runFilter={this.runFilter} transactions={transactions} columns={columns} />

                            </div>


                        </div>

                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default DashboardContainer;
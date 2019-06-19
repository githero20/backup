import React, {Component} from 'react';
import TransactionTable from "../TransactionTable/TransactionTable";
import CentralVaultCard from "../CentralVaultCard/CentralVaultCard";
import BackUpGoalCard from "../BackUpGoalCard/BackUpGoalCard";
import BackUpStashCard from "../BackUpStashCard/BackUpStashCard";
import LockedSavingsCard from "../LockedSavingCard/LockedSavingsCard";
import {
    amountFormatter,
    balanceFormatter,
    dateFormatter,
    descriptionFormatter,
    statusFormatter
} from "../../../Helpers/Helper";
import MessageBox from "./MessageBox/MessageBox";
import blueIcon from '../../../admin/app-assets/images/icons/blue-icon@2x.png';
import orangeIcon from '../../../admin/app-assets/images/icons/orange-icon@2x.png';
import purpleIcon from '../../../admin/app-assets/images/icons/purple-icon@2x.png';
import yellowIcon from '../../../admin/app-assets/images/icons/yellow-icon@2x.png';
import adImg from '../../../admin/app-assets/images/svg/adtwo.svg';
import adImgTwo from '../../../admin/app-assets/images/svg/adone.svg';


class DashboardContainer extends Component {


    //validate there is data

    // set the appropiate props

    // send the the children components


    runFilter = () => {

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
            transactions, totalInterest, ActiveGoals, CompletedGoals, vaultInterest
        } = this.props;

        const columns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
            },
            {
                text: 'Description',
                dataField: 'type',
                formatter: descriptionFormatter,
                sort: true,

            },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter: amountFormatter,
                sort: true,

            },{
                text: 'Balance',
                dataField: 'balance',
                formatter: balanceFormatter,
                sort: true,

            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: statusFormatter,
                sort: true,
                sortCaret: (order, column) => {
                    if (!order) return (<span>&nbsp;&nbsp;</span>);
                    else if (order === 'asc') return (<span>&nbsp;&nbsp;<i className='fa fa-arrow-up'></i></span>);
                    else if (order === 'desc') return (<span>&nbsp;&nbsp;<i className='fa fa-arrow-down'></i></span>);
                    return null;
                }
            },
            {
                text: 'Reference',
                dataField: 'reference',
                sort: true,

            }];

        const {isActive} = this.props;


        return (


            <React.Fragment>
                <div className="app-content content">
                    <div className="content-wrapper">
                        {/* notification component */}

                        {/*{*/}
                        {/*    !isActive?*/}
                        <MessageBox/>
                        {/*    :null*/}
                        {/*}*/}

                        {/*Vault Card */}

                        <div className="content-body">
                            <div className="row">


                                <CentralVaultCard
                                    vaultAmount={vaultAmount}
                                    totalSteadySave={totalSteadySave}
                                    vaultInterest={vaultInterest}
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



                                <div className="col-12 col-lg-6">
                                    <div className="dash-ads mb-3">
                                        <img src={adImg} className='dash-ad-img' alt="advert one "/>
                                        <div className={'dash-action left-action'}>
                                            <h5>New Investment
                                                Opportunities</h5>
                                            <a className={'ad-gray-link'}>Know more <i className='fa fa-arrow-right'></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="dash-ads mb-3">
                                        <img src={adImgTwo} className='dash-ad-img' alt="advert two"/>
                                        <div className={'dash-action right-action'}>
                                            <a className={'ad-link-white'}>Know more <i className='fa fa-arrow-right'></i></a>
                                        </div>
                                    </div>
                                </div>

                                {/*adverts*/}


                            </div>
                            {/*<div className="row">*/}
                            {/*    <div className="col-md-6  col-12 ">*/}
                            {/*        <TotalSavingsBlueCard totalSavings={vaultAmount}/>*/}

                            {/*    </div>*/}
                            {/*    <div className="col-md-6  col-12 ">*/}
                            {/*        <TotalInterestCard totalInterest={totalInterest}/>*/}

                            {/*    </div>*/}

                            {/*</div>*/}

                            <div className="row">
                                <TransactionTable runFilter={this.runFilter} transactions={transactions.reverse()}
                                                  columns={columns}/>

                            </div>


                        </div>

                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default DashboardContainer;
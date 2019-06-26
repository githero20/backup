import React from 'react';
import TransactionTable from "../TransactionTable/TransactionTable";
import CentralVaultCard from "../CentralVaultCard/CentralVaultCard";
import BackUpGoalCard from "../BackUpGoalCard/BackUpGoalCard";
import BackUpStashCard from "../BackUpStashCard/BackUpStashCard";
import LockedSavingsCard from "../LockedSavingCard/LockedSavingsCard";
import {
    amountFormatter,
    balanceFormatter,
    descriptionFormatter,
    sourceFormatter,
    statusFormatter
} from "../../../Helpers/Helper";
import MessageBox from "./MessageBox/MessageBox";
import adImg from '../../../admin/app-assets/images/svg/adtwo.svg';
import adImgTwo from '../../../admin/app-assets/images/svg/adone.svg';
// import { dateFilter, Comparator } from 'react-bootstrap-table-next';
import filterFactory, {Comparator, dateFilter} from 'react-bootstrap-table2-filter';


const DashboardContainer = (props) => {


    //validate there is data

    // set the appropiate props

    // send the the children components


    const runFilter = () => {

        //take the value of select
        const filterValue = document.getElementById('filter-param').value;

        //setup table for filter

        // use value to filter table

    };


    let {error, activateAccount} = props;

    //set appropriate data for vault cards
    let createdDateFilter;

    const {
        vaultAmount, backupAmount, lockedSavingsAmount, stashAmount, totalSteadySave,
        transactions, totalInterest, ActiveGoals, CompletedGoals, vaultInterest, lockedSavingsInterest
    } = props;



    const columns = [
        {
            text: 'Date',
            dataField: 'created_at',
            // formatter: dateFormatter,
            sort: true,
            filter: dateFilter({
                getFilter: (filter) => {
                    createdDateFilter = filter;
                }
            })
        },
        {
            text: 'Phase',
            dataField: 'type',
            formatter: descriptionFormatter,
            sort: true,

        }, {
            text: 'Description',
            dataField: 'sourcetypes',
            formatter: sourceFormatter,
            sort: true,

        },
        {
            text: 'Amount',
            dataField: 'amount',
            formatter: amountFormatter,
            sort: true,

        }, {
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

    const handleFilter = () => {
        createdDateFilter({
            date: new Date(2019, 6, 30),
            comparator: Comparator.GT
        });
    };

    const {isActive} = props;

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
                                onHide={props.hideAGModal}
                                showModal={props.showAGModal}
                            />

                            <LockedSavingsCard
                                lockedSavingsAmount={lockedSavingsAmount}
                                lockedSavingsInterest={lockedSavingsInterest}
                                onHide={props.hideLSModal}
                                showModal={props.showLSModal}
                            />

                            <BackUpStashCard stashAmount={stashAmount}/>


                            <div className="col-12 col-lg-6">
                                <div className="dash-ads mb-3">
                                    <img src={adImg} className='dash-ad-img' alt="advert one "/>
                                    <div className={'dash-action left-action'}>
                                        <h5>New Investment
                                            Opportunities</h5>
                                        <a className={'ad-gray-link'}>Know more <i
                                            className='fa fa-arrow-right'></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="dash-ads mb-3">
                                    <img src={adImgTwo} className='dash-ad-img' alt="advert two"/>
                                    <div className={'dash-action right-action'}>
                                        <a className={'ad-link-white'}>Know more <i
                                            className='fa fa-arrow-right'></i></a>
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
                            <button className={'btn'} onClick={handleFilter}>filter</button>

                            <TransactionTable filter={filterFactory()} runFilter={runFilter}
                                              transactions={transactions.reverse()}
                                              columns={columns}/>

                        </div>


                    </div>

                </div>
            </div>

        </React.Fragment>
    );
};

export default DashboardContainer;
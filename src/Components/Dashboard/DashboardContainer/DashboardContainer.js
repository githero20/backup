import React, { Component } from 'react';
import styled from '@emotion/styled';
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
    handleFiltering,
    mobileDescFormatter,
    sourceFormatter,
    statusFormatter,
    todaysDateForTable,
    toggleTable
} from "../../../Helpers/Helper";
import MessageBox from "./MessageBox/MessageBox";
// import filterFactory, { Comparator, dateFilter } from 'react-bootstrap-table2-filter';
import { Comparator, dateFilter } from 'react-bootstrap-table2-filter';
import moment from "moment";
import Footer from "../Footer/Footer";
import appImage from "../../../admin/app-assets/images/dashboard/Mask Group 12@2x.png";
import instantSaveImage from "../../../admin/app-assets/images/dashboard/Mask Group 13@2x.png";
import SnapCard from '../Snap/SnapCard';

class DashboardContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment().format('MM-DD-YYYY'),
            comparator: Comparator.EQ,
            mobileTable: true,
        }
    }

    handleFilter = (date, comparator) => {
        handleFiltering(date, comparator, this);
    };

    componentDidMount() {
        toggleTable(this);
    }

    render() {
        const columns = [

            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
                filter: dateFilter({
                    defaultValue: { date: todaysDateForTable(), comparator: Comparator.LEQUAL },
                    getFilter: (filter) => {
                        this.createdDateFilter = filter;
                    }
                })
            },
            {
                text: 'Phase',
                dataField: 'type',
                formatter: descriptionFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            }, {
                text: 'Description',
                dataField: 'sourcetypes',
                formatter: sourceFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

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
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Reference',
                dataField: 'reference',
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            }];

        const mobileColumns = [

            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
                filter: dateFilter({
                    defaultValue: { date: todaysDateForTable(), comparator: Comparator.LEQUAL },
                    getFilter: (filter) => {
                        this.createdDateFilter = filter;
                    }
                })
            },
            {
                text: 'Description',
                dataField: 'sourcetypes',
                formatter: sourceFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            },
            {
                text: 'Description',
                dataField: 'type',
                formatter: mobileDescFormatter,
                sort: true,
                classes: ' d-table-cell d-md-none',
                headerClasses: 'd-table-cell d-md-none',

            }, {
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
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Reference',
                dataField: 'reference',
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            }];

        const {
            vaultAmount, backupAmount,
            lockedSavingsAmount, stashAmount, totalSteadySave,
            transactions, reload, ActiveGoals,
            CompletedGoals, vaultInterest,
            lockedSavingsInterest, showSSModal,
            backupInterest, showDirectInstantSaveModal
        } = this.props;


        return (
            <React.Fragment>
                <div className="app-content content">
                    <div className="content-wrapper">
                        <div className="mb-md-5" />
                        <div className="col-12 d-md-none" />
                        <MessageBox challenge={true} reload={reload}
                            showSSModal={showSSModal} />
                        <MessageBox updateKyc={this.props.updateKyc}
                            reload={reload}
                            balance={vaultAmount}
                        />
                        <div className="content-body">
                            <div className="row">
                                <CentralVaultCard
                                    vaultAmount={vaultAmount}
                                    totalSteadySave={totalSteadySave}
                                    vaultInterest={vaultInterest}
                                />

                                <BackUpGoalCard
                                    backupAmount={backupAmount}
                                    ActiveGoals={ActiveGoals}
                                    CompletedGoals={CompletedGoals}
                                    backupInterest={backupInterest}
                                    onHide={this.props.hideAGModal}
                                    showModal={this.props.showAGModal}
                                />

                                <LockedSavingsCard
                                    lockedSavingsAmount={lockedSavingsAmount}
                                    lockedSavingsInterest={lockedSavingsInterest}
                                    onHide={this.props.hideLSModal}
                                    showModal={this.props.showLSModal}
                                />

                                <BackUpStashCard stashAmount={stashAmount} />

                                <MillexHolder>
                                    <SnapCard />
                                    <SnapCard />
                                </MillexHolder>

                                <div className="col-12 col-lg-6">
                                    <div className="dash-ads mb-3 pt-2">
                                        <a href="https://play.google.com/store/apps/details?id=com.sfs.backup_cash"
                                            target='_blank'>
                                            <img src={appImage}
                                                className='dash-ad-img mt-1'
                                                alt="advert two" />
                                        </a>
                                        <div className={'dash-action right-action'} />
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div onClick={showDirectInstantSaveModal}
                                        className="dash-ads mb-3 pt-2">
                                        <img src={instantSaveImage}
                                            className='dash-ad-img mt-1'
                                            alt="advert two" />
                                        <div className={'dash-action right-action'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {
                                // !this.state.mobileTable ?
                                //     <TransactionTable handleFilter={this.handleFilter}
                                //         filter={filterFactory()}
                                //         transactions={transactions}
                                //         columns={columns}
                                //     /> :
                                //     <TransactionTable handleFilter={this.handleFilter}
                                //         filter={filterFactory()}
                                //         transactions={transactions}
                                //         columns={mobileColumns}
                                //     />
                            }
                        </div>
                    </div>
                    <Footer />
                </div>

            </React.Fragment>
        );
    }
}
const MillexHolder = styled.div`
display:grid;
grid-template-columns:repeat(2,1fr);
grid-gap:1rem;
width:100%;
`
export default DashboardContainer;

import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import uploadIcon from "../../admin/app-assets/images/svg/red-upload-icon.svg";
import instantSaveIcon from "../../admin/app-assets/images/svg/mb-instant-save-icon.svg";
import {request} from "../../ApiUtils/ApiUtils";
import SteadySaveCard from "../../Components/Dashboard/SteadySaveCard/SteadySaveCard";
import {
    dateFormatter,
    descriptionFormatter,
    formatNumber,
    getTodaysDate,
    getToken,
    getTotalFailed,
    getTotalSuccessful,
    getTotalSuccessfulSS,
    moneyFormatter,
    STANDARD_ACCOUNT,
    statusFormatter,
    steadyStatusFormatter, titleFormatter,
    viewFormatter
} from "../../Helpers/Helper";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import {getSteadySaveEndpoint, getUserInfoEndpoint} from "../../RouteLinks/RouteLinks";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import whiteSaveMoreIcon from "../../admin/app-assets/images/svg/mb-save-more-white-icon.svg";
import CreateSteadySaveModal from "../../Components/Dashboard/CreateSteadySaveModal/CreateSteadySaveModal";
import SSaveTransTable from "../../Components/Dashboard/SSaveTransTable/SSaveTransTable";
import {getSteadySavHistory, getSteadySavTrans} from "../../actions/SteadySaveAction";
import SteadyAmountCard from "./SteadyAmountCard";
import PayNowModal from "../../Components/Dashboard/PayNowModal/PayNowModal";
import {ToastProvider} from 'react-toast-notifications';

class SteadySave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorMessage: '',
            accountInfo: null,
            transactions: [],
            userName: '',
            totalBalance: '0.00',
            totalSteadySave: '0.00',
            totalSuccessful: 0,
            totalAttempts: 0,
            totalFailed: 0,
            email: null,
            showSavingModal: false,
            showCreateSavingModal: false,
            showLoader: false,
            settings: false,
            showPayModal: false,
            steadySave: {
                id: null,
                contribution: 0,
                start_date: getTodaysDate(),
                frequency: null,
                hour_of_day: 0,
                payment_auth: null,
                raw: null
            },
            showSSaveTrans: false,
            selectedSteadySave: null,
            steadySaveHistory: [],
            steadySaveTrans: []
        };

    }

    hideModal = (status = false) => {
        this.setState({
                showSavingModal: false
            }
        );
    };
    hidePayModal = () => {
        this.setState({
                showPayModal: false
            }
        );
    };

    hideCreateModal = (status = false) => {
        this.setState({
                showCreateSavingModal: false
            }
        );
    };

    showModal = () => {
        this.setState({
            showSavingModal: true
        });
    };

    showPayModal = () => {
        this.setState({
            showPayModal: true
        });
    };


    handleSteadySave = (state, res) => {
        this.setState({
            showLoader: false
        });
        if (state && res) {
            // const totalSteadySave = getTotalSteadySave(res.data.data);
            this.setState({
                transactions: res.data.data,
                // totalSteadySave: formatNumber(parseFloat(totalSteadySave).toFixed(2)),
                // steadySave: res.data.data.length == 0 ? {} : res.data.data[0]
            });
            const temp = res.data.data;
            if (temp && temp.length > 0) {

                let steadySave = {
                    id: temp[0].id,
                    contribution: temp[0].start_amount,
                    frequency: temp[0].frequency,
                    start_date: temp[0].start_date,
                    hour_of_day: temp[0].hour_of_day,
                    payment_auth: temp[0].gw_authorization_code,
                    raw: temp[0]
                };

                this.setState({steadySave});
            }

        } else {
            console.log(res);
        }

    };

    setupSteadySave = () => {
        this.setState({
            showLoader: true
        });
        request(getSteadySaveEndpoint, null, true, 'GET', this.handleSteadySave);
        // get data from localStorage

        //get steady save and history
        // request(getSteadySaveEndpoint, null, true, 'GET', this.handleSteadySave);

    };


    GetBalance = () => {
        //call get user info
        request(getUserInfoEndpoint, null, true, 'GET', this.analyseSteadySaveInfo)


    };


    analyseSteadySaveInfo = (status, data) => {

        if (status) {
            //set name
            if (data) {
                this.setState({
                    userName: data.data.data.name
                });
            }

            //set account
            if (data.data.data.accounts) {
                // loop through data and set appropriate states
                let accounts = data.data.data.accounts.data;
                //display total balance
                accounts.map((content, idx) => {
                    if (content.account_type_id == STANDARD_ACCOUNT) {
                        this.setState({
                            totalBalance: formatNumber(parseFloat(content.balance).toFixed(2))
                        })
                    }
                });


                // //TODO loop through transactions and add up only credits

            } else {
                console.log(data);
                return null;
            }


        }


    };


    componentDidMount() {
        //get token if token isset
        let token = getToken();
        token.then(() => {
            this.setupSteadySave();
            this.GetBalance();
        });

    }

    showNewSteadySaveModal = () => {
        this.setState({
            showSavingModal: true,
        })
    };

    showCreateSteadySaveModal = () => {
        this.setState({
            showCreateSavingModal: true,
        })
    };

    handleSSaveTrans = (status, res) => {
        //TODO calc total steady save
        if (status && res) {
            this.setState({
                showLoader: false,
                steadySaveTrans: res.data,
            })

        }
    };

    getHistAndTrans = () => {

        getSteadySavTrans(this.state.selectedSteadySave.id, this.handleSSaveTrans);
        getSteadySavHistory(this.state.selectedSteadySave.id, this.handleSSaveHistory);

    };

    handleSSaveHistory = (status, res) => {
        //TODO calc total steady save

        if (status && res) {

            let data = res.savings_plan_history.data;
            const totalSteadySave = getTotalSuccessfulSS(data);

            const totalSuccessful = getTotalSuccessful(data);
            const totalFailed = getTotalFailed(data);

            if (res) {
                this.setState({
                    showLoader: false,
                    steadySaveHistory: data,
                    totalAttempts: data.length,
                    totalSuccessful,
                    totalFailed,
                    totalSteadySave: formatNumber(parseFloat(totalSteadySave).toFixed(2))
                })
            }
        }
    };

    hideTransactions = () => {
        this.setState({
            showSSaveTrans: false
        })
    }

    render() {

        const {transactions, userName} = this.state;
        //update the button to show status in progress if is paused is 0 or paused if its 1

        //table header and columns
        const columns = [
            {
                text: 'Title',
                dataField: 'title',
                sort: true,
                formatter:titleFormatter
            },
            {
                text: 'Frequency',
                dataField: 'frequency',
                sort: true
            },
            {
                text: 'Contribution',
                dataField: 'start_amount',
                formatter: moneyFormatter,
                sort: true
            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: steadyStatusFormatter,
                sort: true
            },

            {
                text: 'transactions',
                dataField: 'id',
                formatter: viewFormatter,
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        this.setState({
                            showSSaveTrans: true,
                            selectedSteadySave: row,
                            showLoader: true
                        })
                        //set appropriate state to change view

                        // make request to get transaction
                        getSteadySavTrans(row.id, this.handleSSaveTrans);
                        getSteadySavHistory(row.id, this.handleSSaveHistory);

                        //TODO Add history endpoint to get history of steady save


                    }
                }
            },
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true
            }

        ]; //table header and columns
        const historyColumns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true
            },
            {
                text: 'Phase',
                dataField: 'type',
                formatter: descriptionFormatter,
                sort: true

            },
            {
                text: 'Balance',
                dataField: 'balance',
                formatter: moneyFormatter,
                sort: true
            }, {
                text: 'Amount',
                dataField: 'amount',
                formatter: moneyFormatter,
                sort: true
            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: statusFormatter,
                sort: true
            }

        ];


        return (

            <React.Fragment>
                {this.state.showLoader ? <DashboardLoader/> : null}
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={userName}/>
                    <VerticalNav/>


                    {/*steady Save settings*/}

                    {this.state.showSSaveTrans


                        ? (
                            <React.Fragment>
                                <div className="app-content content">
                                    <div className="content-wrapper">
                                        <div className="row mb-4">
                                            <div className="col-12">
                                                {/*<MessageBox/>*/}
                                            </div>
                                        </div>
                                        <div className="content-header row mt-5">

                                        </div>
                                        <div className="content-body">
                                            {/*<MessageBox/>*/}
                                            <div className="row">
                                                <div className="col-12 ">
                                                    <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                                        <p>Want to save towards a new phone, car or rent Setup a savings
                                                            goal and be on your way to greatness.</p>
                                                    </div>
                                                </div>
                                                {/*<div className="col-lg-4 col-12">*/}
                                                {/*    <h3 className="gray-header-text mb-2 ">Backup Goals*/}
                                                {/*    </h3>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className="row">

                                                {/*<div className="col-lg-4 col-12 order-lg-8">*/}
                                                {/*    <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>*/}
                                                {/*        <p>Start saving your money here automatically, daily, weekly or*/}
                                                {/*            monthly.We want you to be disciplined, so we’ll charge you 5% if*/}
                                                {/*            you choose to withdraw outside of your set withdrawal days.</p>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

                                                {/*<SteadySaveCard totalBalance={this.state.totalBalance}*/}
                                                {/*                newSteadySave={this.showNewSteadySaveModal}/>*/}

                                                <div className="col-12">
                                                    <div className="text-right">
                                                        <a href='#!' onClick={this.hideTransactions}
                                                           className='gray-text back-btn'>
                                                            <i className='fa fa-chevron-left'></i>&nbsp; Back to Steady
                                                            Save
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-12">
                                                    <h3 className="gray-header-text fs-mb-1 mb-2 ">Steady Save <span
                                                        className="dot">.</span> Summary
                                                    </h3>
                                                    <SteadyAmountCard bgInfo={this.state.selectedSteadySave}/>
                                                </div>
                                                {/*<div className="col-lg-4 col-12">*/}
                                                {/*    <h3 className="gray-header-text fs-mb-1 mb-2 ">&nbsp;*/}
                                                {/*    </h3>*/}
                                                {/*</div>*/}

                                                <div className="col-lg-4 col-12 order-lg-5">
                                                    <h3 className="gray-header-text d-none d-md-block fs-mb-1 mb-2">&nbsp;</h3>
                                                    <div className="mb-quick-actions d-flex flex-md-column flex-wrap ">
                                                        <span className="ss-action-details mb-details-container ">
                                                            <div className="d-inline-block q-detail-img">
                                                                <img src={uploadIcon}/>
                                                            </div>
                                                            <div className=" d-inline-block">
                                                                  <p className="gray-text circular-std mb-p-size">Total Steady Save</p>
                                                                <strong
                                                                    className="dark-brown font-size-1-16"><span>₦</span> {this.state.totalSteadySave} </strong>

                                                            </div>
                                                        </span>
                                                        <span className="ss-action-details mb-details-container align-items-md-center">
                                                            <div className="d-inline-block q-detail-img">
                                                                <img src={instantSaveIcon}/>
                                                            </div>
                                                            <div className="d-inline-block ">
                                                                <p className="gray-text circular-std mb-p-size">
                                                                    <strong
                                                                        className="dark-brown font-size-1-16">{this.state.totalAttempts} &nbsp; </strong>
                                                                    Total Attempts</p>
                                                            </div>
                                                        </span>
                                                        {/*<span className="mb-details-container align-items-center ">*/}
                                                        {/*    <div className="d-inline-block q-detail-img">*/}
                                                        {/*        <img src={uploadIcon}/>*/}
                                                        {/*    </div>*/}
                                                        {/*    <div className=" d-inline-block">*/}

                                                        {/*        <p className="gray-text circular-std mb-p-size">*/}
                                                        {/*             <strong className="dark-brown font-size-1-16"> {this.state.totalSuccessful} &nbsp;</strong>*/}
                                                        {/*            Total Successful</p>*/}
                                                        {/*    </div>*/}
                                                        {/*</span>*/}
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-12 order-lg-5 mb-1 mb-md-0">
                                                    <h3 className="gray-header-text d-none d-md-block fs-mb-1 mb-2">&nbsp;</h3>
                                                    <div className="mb-quick-actions d-flex flex-md-column flex-wrap ">
                                                        {/*<span className="mb-details-container ">*/}
                                                        {/*    <div className="d-inline-block q-detail-img">*/}
                                                        {/*        <img src={uploadIcon}/>*/}
                                                        {/*    </div>*/}
                                                        {/*    <div className=" d-inline-block">*/}
                                                        {/*        <strong*/}
                                                        {/*            className="dark-brown font-size-1-16"><span>₦</span> {this.state.totalSteadySave} </strong>*/}
                                                        {/*        <p className="gray-text circular-std mb-p-size">Total Steady Save</p>*/}
                                                        {/*    </div>*/}
                                                        {/*</span>*/}
                                                        {/*<span className="mb-details-container align-items-center">*/}
                                                        {/*    <div className="d-inline-block q-detail-img">*/}
                                                        {/*        <img src={uploadIcon}/>*/}
                                                        {/*    </div>*/}
                                                        {/*    <div className="d-inline-block ">*/}
                                                        {/*        <p className="gray-text circular-std mb-p-size">*/}
                                                        {/*            <strong className="dark-brown font-size-1-16">{this.state.totalAttempts} &nbsp; </strong>*/}
                                                        {/*            Total Attempts</p>*/}
                                                        {/*    </div>*/}
                                                        {/*</span>*/}
                                                        <span className="ss-action-details mb-details-container align-items-md-center ">
                                                            <div className="d-inline-block q-detail-img">
                                                                <img src={instantSaveIcon}/>
                                                            </div>
                                                            <div className=" d-inline-block">

                                                                <p className="gray-text circular-std mb-p-size">
                                                                     <strong
                                                                         className="dark-brown font-size-1-16"> {this.state.totalSuccessful} &nbsp;</strong>
                                                                    Total Successful</p>
                                                            </div>
                                                        </span>

                                                        {/* TODO due pay  */}
                                                        <span className="ss-action-details mb-details-container align-items-md-center ">
                                                            <div className="d-inline-block q-detail-img">
                                                                <img src={uploadIcon}/>
                                                            </div>
                                                            <div className=" d-inline-block">
                                                                <div className="gray-text circular-std mb-p-size">
                                                                     <strong className="dark-brown font-size-1-16">
                                                                         ₦ {formatNumber(parseFloat(this.state.totalFailed).toFixed(2))} &nbsp;
                                                                     </strong>
                                                                     Due Pay
                                                                    <p>
                                                                         {
                                                                             this.state.totalFailed > 0 ?
                                                                                 <a href='#' className=''
                                                                                    onClick={() => this.showPayModal()}>Pay
                                                                                     Now</a> :
                                                                                 null
                                                                         }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                                <ToastProvider>
                                                    {this.state.showPayModal ?
                                                        <PayNowModal show={this.state.showPayModal}
                                                                     selectedSSave={this.state.selectedSteadySave}
                                                                     totalFailed={this.state.totalFailed}
                                                                     getHistoryTrans={this.getHistAndTrans}
                                                                     onHide={this.hidePayModal}
                                                        /> : null}

                                                </ToastProvider>
                                                {/*<BackupGoalQuickActions showBackUpHistory={this.showBackUpHistory}  hideBG={this.hideBackupGoal} fetchGoals={this.fetchBackUpGoals} selectedBG={this.state.selectedBG}/>*/}

                                            </div>
                                            <div className="row">
                                                <div id="Back-up-goals" className="col-12 col-md-12">
                                                    <div className="card">
                                                        <div className="card-content mt-1 px-0 px-md-2 py-md-3">
                                                            {/*<div*/}
                                                            {/*    className="table-header d-flex justify-content-between align-items-md-center px-md-2  mb-3">*/}
                                                            {/*    <h4 className="table-title">*/}
                                                            {/*        <button onClick={this.showBackUpModal}*/}
                                                            {/*                className=" right-btn-holder deep-blue-bg white "*/}
                                                            {/*                data-toggle="modal" data-target="#large">*/}
                                                            {/*            <img src={addSavingsIcon}/>*/}
                                                            {/*            New Goals*/}
                                                            {/*        </button>*/}
                                                            {/*    </h4>*/}
                                                            {/*    /!*<ul className=" mb-0 locked-saving-display d-none d-md-inline-block">*!/*/}
                                                            {/*    /!*    <li>{this.state.backupGoals.length} &nbsp; Goals</li>*!/*/}
                                                            {/*    /!*</ul>*!/*/}

                                                            {/*</div>*/}
                                                            {/* STEADY SAVE TABLE */}
                                                            <SSaveTransTable emptyMessage={'No Steady Saves Available'}
                                                                             title={'Steady Save Transactions'}
                                                                             transactions={this.state.steadySaveTrans}
                                                                             columns={historyColumns}
                                                            />
                                                            {/*<BackUpGoalsTable backupGoals={this.state.backupGoals} />*/}

                                                            {/*table component*/}

                                                            {/*{*/}
                                                            {/*    this.state.selectedHistory?*/}
                                                            {/*        (*/}
                                                            {/*            <TransactionTable transactions={this.state.selectedBG.backup_goals_history} columns={columns} />*/}
                                                            {/*        ):*/}
                                                            {/*        <div className='text-center'>*/}
                                                            {/*            <i className='fa fa-5x fa-history'></i>*/}
                                                            {/*            <p className='text-muted'>No BackUp Goal History</p>*/}
                                                            {/*        </div>*/}

                                                            {/*}*/}


                                                            {/* Grid component    */}

                                                            <div className="row">

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )


                        : (
                            <div className="app-content content">
                                <div className="content-wrapper">
                                    <div className="row mb-4">
                                        <div className="col-12">
                                            {/*<MessageBox/>*/}
                                        </div>
                                    </div>

                                    {
                                        this.state.showSavingModal ?
                                            (
                                                <React.Fragment>
                                                    <SteadySaveModal setupSteadySave={this.setupSteadySave}
                                                                     steadySave={this.state.steadySave}
                                                                     totalSteadySave={this.state.totalSteadySave}
                                                                     show={this.state.showSavingModal}
                                                                     onHide={this.hideModal}
                                                    />
                                                </React.Fragment>

                                            ) : null
                                    }

                                    {
                                        this.state.showCreateSavingModal ?
                                            (
                                                <React.Fragment>
                                                    <CreateSteadySaveModal
                                                        setupSteadySave={this.setupSteadySave}
                                                        steadySave={this.state.steadySave}
                                                        totalSteadySave={this.state.totalSteadySave}
                                                        show={this.state.showCreateSavingModal}
                                                        onHide={this.hideCreateModal}/>
                                                </React.Fragment>

                                            ) : null


                                    }

                                    <div className="content-header row">
                                    </div>
                                    <div className="content-body">

                                        <div className="row">

                                            <div className="col-lg-5 col-12 order-lg-8">
                                                <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                                    <p>Start saving your money here automatically, daily, weekly or
                                                        monthly.<br/>We want you to be disciplined, so we’ll charge you
                                                        5% if
                                                        you choose to withdraw outside of your set withdrawal days.</p>
                                                </div>
                                            </div>

                                            <SteadySaveCard totalBalance={this.state.totalBalance}
                                                            newSteadySave={this.showNewSteadySaveModal}
                                            />

                                            {/*<div className="col-lg-4 col-12">*/}
                                            {/*    <h3 className="gray-header-text fs-mb-1 mb-2 ">Steady Save <span*/}
                                            {/*        className="dot">.</span> Summary*/}

                                            {/*    </h3>*/}
                                            {/*    <div className="card pull-up blue-card saving-card">*/}
                                            {/*        <img className="floated-icon" src={transTotalSavingsIcon}/>*/}
                                            {/*        <div className="card-content">*/}
                                            {/*            <div className="card-body">*/}
                                            {/*                <h4 className="text-white blue-card-heading ">Total Balance</h4>*/}
                                            {/*                <div className="media d-flex pb-2 pb-md-3">*/}
                                            {/*                    <div className="align-self-center">*/}
                                            {/*                        <img className="blue-card-icon" src={totalBalanceIcon}/>*/}
                                            {/*                    </div>*/}
                                            {/*                    <div className="media-body text-left pt-1 ">*/}
                                            {/*                        <h3 className="text-white clearfix"><strong*/}
                                            {/*                            className="blue-card-price ml-2 mr-2">₦*/}
                                            {/*                            10000.00</strong>*/}

                                            {/*                        </h3>*/}
                                            {/*                    </div>*/}
                                            {/*                </div>*/}
                                            {/*                <div className={'d-flex justify-content-end'}>*/}
                                            {/*                    <a href="#" className=" text-white ">New Steady*/}
                                            {/*                        Save <img src={settingsIcon}/></a>*/}
                                            {/*                </div>*/}
                                            {/*            </div>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}


                                            <div className="col-lg-3 col-12 order-lg-5">
                                                <h3 className="gray-header-text d-none d-md-block fs-mb-1 mb-md-2">&nbsp;</h3>
                                                <div
                                                    className="mb-quick-actions d-flex flex-column flex-wrap mb-1 mb-md-0">
                                                    <span className="mb-btn-wrapper steady-btn-wrapper">
                                                        {/*<button type="button" onClick={this.showCreateSteadySaveModal} className=" btn-blue-gradient-2 round">*/}
                                                        {/*    <img src={whiteSaveMoreIcon}/>*/}
                                                        {/*    Create Steady Save*/}
                                                        {/*</button>*/}
                                                        <button type="button" onClick={this.showModal}
                                                                className=" btn-blue-gradient-2 round">
                                                            <img src={whiteSaveMoreIcon}/>
                                                            Edit Savings Plan
                                                        </button>
                                                    </span>

                                                    {/*<span className="mb-details-container ">*/}
                                                    {/*    <div className="d-inline-block q-detail-img">*/}
                                                    {/*        <img src={uploadIcon}/>*/}
                                                    {/*    </div>*/}
                                                    {/*    <div className=" d-inline-block">*/}
                                                    {/*        <strong*/}
                                                    {/*            className="dark-brown font-size-1-16"><span>₦</span> {this.state.totalSteadySave}</strong>*/}
                                                    {/*        <p className="gray-text circular-std mb-p-size">Total Steady Save</p>*/}
                                                    {/*    </div>*/}
                                                    {/*</span>*/}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">

                                            {/*<TransactionTable transactions={transactions} columns={columns}/>*/}

                                            {/* //TODO show steady save transactions */}
                                            <SSaveTransTable title={'Steady Saves'} transactions={transactions}
                                                             columns={columns}/>

                                            {/*<SteadySaveTransTable transactions={transactions}/>*/}
                                            {/* //TODO show steady save history */}


                                            {/*pagination */}
                                            {/*<nav aria-label="Page navigation">*/}
                                            {/*    <ul className=" custom-pagination pagination justify-content-center pagination-separate pagination-round pagination-flat pagination-lg mb-1">*/}
                                            {/*        <li className="page-item">*/}
                                            {/*            <a className="page-link" href="#" aria-label="Previous">*/}
                                            {/*                <span aria-hidden="true"><span*/}
                                            {/*                    className="d-none d-md-inline">«</span> Prev</span>*/}
                                            {/*                <span className="sr-only">Previous</span>*/}
                                            {/*            </a>*/}
                                            {/*        </li>*/}
                                            {/*        <li className="page-item"><a className="page-link"*/}
                                            {/*                                     href="#">1</a></li>*/}
                                            {/*        <li className="page-item"><a className="page-link"*/}
                                            {/*                                     href="#">2</a></li>*/}
                                            {/*        <li className="page-item active"><a className="page-link"*/}
                                            {/*                                            href="#">3</a></li>*/}
                                            {/*        <li className="page-item"><a className="page-link"*/}
                                            {/*                                     href="#">4</a></li>*/}
                                            {/*        <li className="page-item"><a className="page-link"*/}
                                            {/*                                     href="#">5</a></li>*/}
                                            {/*        <li className="page-item">*/}
                                            {/*            <a className="page-link" href="#" aria-label="Next">*/}
                                            {/*                <span aria-hidden="true">Next <span*/}
                                            {/*                    className="d-none d-md-inline">»</span></span>*/}
                                            {/*                <span className="sr-only">Next</span>*/}
                                            {/*            </a>*/}
                                            {/*        </li>*/}
                                            {/*    </ul>*/}
                                            {/*        /!*</nav>*!/*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            {/*</div>*/}
                                        </div>


                                    </div>
                                </div>
                            </div>

                        )


                    }


                </div>
            </React.Fragment>
        );
    }
}

export default SteadySave;
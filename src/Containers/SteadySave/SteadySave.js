import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import uploadIcon from "../../admin/app-assets/images/svg/red-upload-icon.svg";
import instantSaveIcon from "../../admin/app-assets/images/svg/mb-instant-save-icon.svg";
import {request} from "../../ApiUtils/ApiUtils";
import SteadySaveCard from "../../Components/Dashboard/SteadySaveCard/SteadySaveCard";
import {
    actionFormatter, contributionFormatter,
    dateFormatter,
    descriptionFormatter,
    formatNumber, getSteadySaveData,
    getTodaysDate,
    getToken,
    getTotalFailed,
    getTotalSuccessful,
    getTotalSuccessfulSS,
    mobileDescFormatter,
    mobileSSMoneyFormatter,
    moneyFormatter,
    ssMobileDescFormatter,
    STANDARD_ACCOUNT,
    statusFormatter,
    steadyStatusFormatter,
    titleFormatter, toastMessage, toastReloadMessage, toggleTable,
    viewFormatter
} from "../../Helpers/Helper";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import {getSteadySaveEndpoint, getUserInfoEndpoint} from "../../RouteLinks/RouteLinks";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import whiteSaveMoreIcon from "../../admin/app-assets/images/svg/mb-save-more-white-icon.svg";
import CreateSteadySaveModal from "../../Components/Dashboard/CreateSteadySaveModal/CreateSteadySaveModal";
import SSaveTransTable from "../../Components/Dashboard/SSaveTransTable/SSaveTransTable";
import {convertUserSteadySave, getSteadySavHistory, getSteadySavTrans} from "../../actions/SteadySaveAction";
import SteadyAmountCard from "./SteadyAmountCard";
import PayNowModal from "../../Components/Dashboard/PayNowModal/PayNowModal";
import {ToastProvider,withToastManager} from 'react-toast-notifications';
import swal from "sweetalert";
import Footer from "../../Components/Dashboard/Footer/Footer";

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
            totalIndSteadySave: '0.00',
            totalSuccessful: 0,
            totalAttempts: 0,
            totalFailed: 0,
            email: null,
            showSavingModal: false,
            showOneSavingModal: false,
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
            oneSteadySave: {
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
            steadySaveTrans: [],
            mobileTable:false,
        };

    }

    hideModal = (status = false) => {
        this.setState({
                showSavingModal: false
            }
        );
    };
    hideOneModal = (status = false) => {
        this.setState({
            showOneSavingModal: false
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
    showOneSSModal = () => {
        this.setState({
            showOneSavingModal: true
        });
    };

    showPayModal = () => {
        this.setState({
            showPayModal: true
        });
    };


    handleSteadySave = (state, res) => {
        this.setState({showLoader: false});

        if (state && res) {
            this.setState({transactions: res.data.data});

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

        } else if(!state && res){
            console.log('err',res);
        }

    };

    setupSteadySave = () => {
        this.setState({showLoader: true});
        request(getSteadySaveEndpoint, null, true, 'GET', this.handleSteadySave);
        // get data from localStorage
    };

    GetBalance = () => {
        //call get user info
        request(getUserInfoEndpoint, null, true, 'GET', this.analyseSteadySaveInfo)
    };


    analyseSteadySaveInfo = (status, data) => {

        if (status) {
            //set name
            if (data) {this.setState({userName: data.data.data.name});}

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

            }
        }
    };

    convertSteadySave = (id) =>{
        convertUserSteadySave(id,(state,res)=>{
            if(state&&res){
                toastMessage('Steady Save Converted Successfully.','success',this);
                this.setupSteadySave();
            }
        });
    };


    getSteadySave = () =>{
        this.setupSteadySave();
        this.GetBalance();
    };

    componentDidMount() {
        //get token if token isset
        let token = getToken();
        token.then(() => {
          this.getSteadySave();
        });
        toggleTable(this);
    }

    showNewSteadySaveModal = () => {
        this.setState({
            showSavingModal: true,
        })
    };


    handleSSaveTrans = (status, res) => {
        //TODO calc total steady save
        if (status && res) {
            const trans = getSteadySaveData(res.data);
            this.setState({
                showLoader: false,
                steadySaveTrans: trans,
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
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.reload){
            this.getSteadySave();
        }
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
                formatter: titleFormatter,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Frequency',
                dataField: 'frequency',
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Contribution',
                dataField: 'start_amount',
                formatter: contributionFormatter,
                sort: true,
                // classes: 'd-none d-md-table-cell',
                // headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: steadyStatusFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            },

            {
                text: 'Transactions',
                dataField: 'id',
                formatter: viewFormatter,
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        this.setState({
                            showSSaveTrans: true,
                            selectedSteadySave: row,
                            showLoader: true
                        });
                        //set appropriate state to change view
                        // make request to get transaction
                        getSteadySavTrans(row.id, this.handleSSaveTrans);
                        getSteadySavHistory(row.id, this.handleSSaveHistory);
                        //TODO Add history endpoint to get history of steady save
                    }
                }
            },
            {
                text: 'Quick Action',
                dataField: 'user_id',
                formatter: actionFormatter,
                formatExtraData: { trans: transactions},
                events: {
                    onClick: (e, column, columnIndex, row) => {
                        if(e.target.name == 'convert-btn'){
                            swal('Are you sure', 'This will convert your steady save to the new steady save ' +
                                'that runs automatically.You can edit your steady save once it is converted.', 'info', {
                                buttons: {
                                    cancel: "no",
                                    yes: "yes"
                                },
                            }).then((value) => {
                                switch (value) {
                                    case "yes":
                                        this.convertSteadySave(row.id);
                                        break;
                                    case "no":
                                        // swal("Withdrawal Cancelled");
                                        break;
                                }
                            });
                        }else {

                            let oneSteadySave = {
                                id: row.id,
                                contribution: row.start_amount,
                                frequency: row.frequency,
                                start_date: row.start_date,
                                hour_of_day: row.hour_of_day,
                                payment_auth: row.gw_authorization_code,
                                raw: row
                            };
                            this.setState({oneSteadySave});
                            this.showOneSSModal();

                        }

                    }
                }
            }

        ]; //table header and columns

        const mobileColumns = [
            {
                text: 'Title',
                dataField: 'title',
                sort: true,
                formatter: titleFormatter,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Frequency',
                dataField: 'frequency',
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Description',
                dataField: 'start_amount',
                formatter: ssMobileDescFormatter,
                sort: true,
                classes: ' d-table-cell d-md-none',
                headerClasses: 'd-table-cell d-md-none',
            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: steadyStatusFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

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
                        });
                        //set appropriate state to change view

                        // make request to get transaction
                        getSteadySavTrans(row.id, this.handleSSaveTrans);
                        getSteadySavHistory(row.id, this.handleSSaveHistory);

                    }
                }
            },
            {
                text: 'Quick Action',
                dataField: 'user_id',
                formatter: actionFormatter,
                formatExtraData: { trans: transactions},
                events: {
                    onClick: (e, column, columnIndex, row) => {
                        if(e.target.name == 'convert-btn'){

                            swal('Are you sure', 'This will convert your steady save to the new steady save ' +
                                'that runs automatically.You can edit your steady save once it is converted.', 'info', {
                                buttons: {
                                    cancel: "no",
                                    yes: "yes"
                                },
                            }).then((value) => {
                                switch (value) {
                                    case "yes":
                                        this.convertSteadySave(row.id);
                                        break;
                                    case "no":
                                        // swal("Withdrawal Cancelled");
                                        break;
                                }
                            });
                        }else {

                            let oneSteadySave = {
                                id: row.id,
                                contribution: row.start_amount,
                                frequency: row.frequency,
                                start_date: row.start_date,
                                hour_of_day: row.hour_of_day,
                                payment_auth: row.gw_authorization_code,
                                raw: row
                            };
                            this.setState({oneSteadySave});
                            this.showOneSSModal();

                        }

                    }
                }
            }

            // {
            //     text: 'Date',
            //     dataField: 'created_at',
            //     formatter: dateFormatter,
            //     sort: true,
            //     classes: 'd-none d-md-table-cell',
            //     headerClasses: 'd-none d-md-table-cell',
            // }

        ];

        const historyColumns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Phase',
                dataField: 'type',
                formatter: descriptionFormatter,
                sort: true,
                // classes: 'd-none d-md-table-cell',
                // headerClasses: 'd-none d-md-table-cell',
            },
            // {
            //     text: 'Balance',
            //     dataField: 'balance',
            //     formatter: moneyFormatter,
            //     sort: true,
            //     classes: 'd-none d-md-table-cell',
            //     headerClasses: 'd-none d-md-table-cell',
            // },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter: moneyFormatter,
                sort: true,
                // classes: 'd-none d-md-table-cell',
                // headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: statusFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',

            }

        ];

        const mobileHistoryColumns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
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
            },
            // {
            //     text: 'Balance',
            //     dataField: 'balance',
            //     formatter: moneyFormatter,
            //     sort: true,
            //     classes: 'd-none d-md-table-cell',
            //     headerClasses: 'd-none d-md-table-cell',
            // },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter: mobileSSMoneyFormatter,
                sort: true,
                classes: ' d-table-cell d-md-none',
                headerClasses: 'd-table-cell d-md-none',
            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: statusFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            }
        ];


        return (

            <React.Fragment>
                {this.state.showLoader ? <DashboardLoader/> : null}
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={userName}/>
                    <VerticalNav/>
                    {this.state.showSSaveTrans
                        ? (
                            <React.Fragment>
                                <div className="app-content content">
                                    <div className="content-wrapper">
                                        <div className="row mb-4 d-none">
                                            <div className="col-12">
                                            </div>
                                        </div>
                                        <div className="content-header row mt-5">

                                        </div>
                                        <div className="content-body">
                                            <div className="row">
                                                <div className="col-12 ">
                                                    <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                                        <p>Want to save towards a new phone, car or rent Setup a savings
                                                            goal and be on your way to greatness.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="text-right">
                                                        <a href='#!' onClick={this.hideTransactions}
                                                           className='gray-text back-btn'>
                                                            <i className='fa fa-chevron-left'></i>
                                                            &nbsp; Back
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-12">
                                                    <h3 className="gray-header-text fs-mb-1 mb-2 ">Steady Save
                                                        <span className="dot">.</span> Summary
                                                    </h3>
                                                    <SteadyAmountCard bgInfo={this.state.selectedSteadySave}/>
                                                </div>

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
                                                        <span
                                                            className="ss-action-details mb-details-container align-items-md-center">
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
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-12 order-lg-5 mb-1 mb-md-0">
                                                    <h3 className="gray-header-text d-none d-md-block fs-mb-1 mb-2">&nbsp;</h3>
                                                    <div className="mb-quick-actions d-flex flex-md-column flex-wrap ">
                                                        <span
                                                            className="ss-action-details mb-details-container align-items-md-center ">
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
                                                        <span
                                                            className="ss-action-details mb-details-container align-items-md-center ">
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
                                                                                 <a onClick={() => this.showPayModal()}>Pay Now</a> :
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
                                            </div>
                                            <div className="row">
                                                <div id="Back-up-goals" className="col-12 col-md-12">
                                                    <div className="card">
                                                        <div className="card-content mt-1 px-0 px-md-2 py-md-3">
                                                            {/* STEADY SAVE TABLE */}
                                                            {this.state.mobileTable ?
                                                                (
                                                                    <SSaveTransTable emptyMessage={'No Steady Saves Available'} title={'Steady Save Transactions'}
                                                                                  transactions={this.state.steadySaveTrans} columns={mobileHistoryColumns} />):
                                                                ( <SSaveTransTable emptyMessage={'No Steady Saves Available'} title={'Steady Save Transactions'}
                                                                                  transactions={this.state.steadySaveTrans} columns={historyColumns} />)
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Footer/>
                                </div>
                            </React.Fragment>
                        )


                        : (
                            <div className="app-content content">
                                <div className="content-wrapper">
                                    <div className="row mb-4 d-none">
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
                                        this.state.showOneSavingModal ?
                                            (
                                                <React.Fragment>
                                                    <SteadySaveModal setupSteadySave={this.setupSteadySave}
                                                                     steadySave={this.state.oneSteadySave}
                                                                     totalSteadySave={this.state.totalIndSteadySave}
                                                                     show={this.state.showOneSavingModal}
                                                                     onHide={this.hideOneModal}
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
                                            <SteadySaveCard
                                                totalBalance={this.state.totalBalance}
                                                newSteadySave={this.showNewSteadySaveModal}
                                            />
                                            <div className="col-lg-3 col-12 order-lg-5">
                                                <h3 className="gray-header-text d-none d-md-block fs-mb-1 mb-md-2">&nbsp;</h3>
                                                <div
                                                    className="mb-quick-actions d-flex flex-column flex-wrap mb-1 mb-md-0">
                                                    <span className="mb-btn-wrapper steady-btn-wrapper">
                                                        <button type="button" onClick={this.showModal} disabled={transactions.length>1?true:false} className=" btn-blue-gradient-2 round">
                                                            <img src={whiteSaveMoreIcon}/>{transactions.length>1?' Savings Plan':'Edit Savings Plan'}
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {/* //TODO show steady save transactions */}
                                            {this.state.mobileTable?
                                                (<SSaveTransTable title={'Steady Saves'} transactions={transactions} columns={mobileColumns}/>):
                                                (<SSaveTransTable title={'Steady Saves'} transactions={transactions} columns={columns}/>)}

                                        </div>
                                    </div>
                                </div>
                                <Footer/>
                            </div>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default withToastManager(SteadySave);
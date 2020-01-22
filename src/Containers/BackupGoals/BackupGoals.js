import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import addSavingsIcon from "../../admin/app-assets/images/svg/add-lock-saving.svg";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";
import {getBackUpGoalAndHistory} from "../../actions/BackUpGoalsAction";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import {getUserData} from "../../actions/UserAction";
import {
    amountCurrentStatusFormatter,
    dateFormatter,
    formatNumber, getTotalFailed,
    getTotalSuccessful, getTotalSuccessfulBG,
    getTotalSuccessfulSS,
    moneyFormatter,
    statusFormatter, toastReloadMessage, toggleTable
} from "../../Helpers/Helper";
import {ToastProvider, withToastManager} from 'react-toast-notifications';
import BGInfoCard from "./BGInfoCard";
import BackupGoalQuickActions from "./BackupGoalQuickActions";
import BGStartAmountCard from "./BGStartAmountCard";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import moment from 'moment';
import {GetBackUpGoals} from "../../RouteLinks/RouteLinks";
import {request} from "../../ApiUtils/ApiUtils";
import PayNowModal from "../../Components/Dashboard/PayNowModal/PayNowModal";
import BGPayNowModal from "../../Components/Dashboard/BGPayNowModal/BGPayNowModal";
import {getSteadySavHistory, getSteadySavTrans} from "../../actions/SteadySaveAction";
import Footer from "../../Components/Dashboard/Footer/Footer";

class BackupGoals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBackUpModal: false,
            accountInfo: null,
            userName: null,
            backupGoals: [],
            loading: false,
            showLoader: true,
            showBackupGoal: false,
            BackupGoalHistory: [],
            selectedBG: null,
            selectedBGHistory: [],
            totalSuccessful: 0,
            totalAttempts: 0,
            totalFailed: 0,
            totalBGSave:'0.00',
            showPayModal:false,
            mobileTable:false
        };
        this.fetchBackUpGoals = this.fetchBackUpGoals.bind(this);
        this.handleBGHistory = this.handleBGHistory.bind(this);
    }

    showBackUpModal = () => {
        this.setState({
            showBackUpModal: true,
        })
    };

    hideBackupGoal = () => {
        this.setState({
            showBackupGoal: false,
        })
    }

    hideModal = (status = false) => {
        this.setState({
            showBackUpModal: false,
        });

        if (status) {
            this.fetchBackUpGoals();
        }
    };


    fetchBackUpGoals() {
        this.setState({showLoader: true});
        request(GetBackUpGoals, null, true, 'GET', (status, payload) => {
            this.setState({showLoader: false});
            if (status) {
                if (payload) {this.setState({backupGoals: payload.data.data})}
            }

        });
    }


    componentDidMount() {
        this.fetchBackUpGoals();
        toggleTable(this);


    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.reload){
            this.fetchBackUpGoals();
        }
    }

    toastMessage = (message, status) => {
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    };

    handleUserInfo = (status, res) => {
        this.setState({showLoader: false});
        if (status) {this.setState({userName: res.name})}
        else if (!status) {
            if (res) {this.toastMessage(res.message || 'An error occurred!!', 'error');}
        } else {this.toastMessage("No Internet Connection", 'error');}
    };

    handleBGoalAndHist = (status, res) => {
        if (status) {

        }
    };

    showBackUp = () => {
        this.setState({
            showBackupGoal: true,
        })
    };


    showBackUpHistory = (id) => {
        this.setState({showBackupGoal: true});
        getBackUpGoalAndHistory(id, this.handleBGHistory);
    };


    handleBGHistory(status, res) {
        if (status) {
            let data = res.backup_goals_history.data;
            const totalBGSave = getTotalSuccessfulBG(data);
            const totalSuccessful = getTotalSuccessful(data);
            const totalFailed = getTotalFailed(data);
                this.setState({
                    selectedBGHistory: data,
                    totalAttempts: data.length,
                    totalSuccessful,
                    totalFailed,
                    totalBGSave: formatNumber(parseFloat(totalBGSave).toFixed(2))
                });
        } else if(!status&&res) {
            this.toastMessage(res.message || 'An error occurred!!', 'error');
        }else {
            this.toastMessage("No Internet Connection", 'error');
        }

    }

    updateSelectedBG = (content) => {
        this.setState({selectedBG: content});
    };
    showPayModal = () => {
        this.setState({
            showPayModal: true
        });
    };
    hidePayModal = () => {
        this.setState({
                showPayModal: false
            }
        );
    };

    getHistAndTrans =()=>{
        getBackUpGoalAndHistory(this.state.selectedBG.id, this.handleBGHistory)
    };


    render() {

        const columns = [

            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
            },
            {
                text: 'Amount',
                dataField: 'amount',
                formatter: moneyFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Balance',
                dataField: 'current_amount',
                formatter: moneyFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
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
        const mobileColumns = [

            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
            },
            {
                text: 'Current Amount',
                dataField: 'current_amount',
                formatter: moneyFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            },
            {
                text: 'Description',
                dataField: 'amount',
                formatter: amountCurrentStatusFormatter,
                sort: true,
                classes:' d-table-cell d-md-none',
                headerClasses:'d-table-cell d-md-none',
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
                    <BackUpGoalsModal show={this.state.showBackUpModal} onHide={this.hideModal}/>
                    <div
                        className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                        data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                        <HorizontalNav userName={this.state.userName}/>
                        <VerticalNav userName={this.state.userName}/>

                        {/* show individual back up goal */}

                        {/* handle backup goal operations */}
                        <ToastProvider>
                            {this.state.showPayModal ? <BGPayNowModal show={this.state.showPayModal}
                                                                    selectedBG={this.state.selectedBG}
                                                                      totalFailed={this.state.totalFailed}
                                                                    getHistoryTrans={this.getHistAndTrans}
                                                                    onHide={this.hidePayModal}
                            /> : null}

                        </ToastProvider>
                        <div className="app-content content">
                            <div className="content-wrapper">
                                {this.state.showBackupGoal ?
                                    (
                                        <React.Fragment>
                                            <div className="content-header row mt-5">
                                            </div>
                                            <div className="content-body">
                                                <div className="row">
                                                    <div className="col-12 ">
                                                        <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                                            <p>Want to save towards a new phone, car or rent Setup a
                                                                savings
                                                                goal and be on your way to greatness.</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-4 col-12">
                                                        <h3 className="gray-header-text d-md-none d-block text-right
                                                         fs-mb-1 mb-2"><a href='#!' className='gray-text back-btn'
                                                                          onClick={this.hideBackupGoal}>
                                                            <i className='fa fa-chevron-left'></i>
                                                            &nbsp;Back to Goals</a>
                                                        </h3>
                                                        <h3 className="gray-header-text fs-mb-1 mb-2 ">BackUpGoal
                                                            <span className="dot">.</span> Summary

                                                        </h3>
                                                        <BGInfoCard bgInfo={this.state.selectedBG}
                                                                    selectedBGHistory={this.state.selectedBGHistory} />
                                                    </div>
                                                    <div className="col-lg-4 col-12">
                                                        <h3 className="gray-header-text fs-mb-1 mb-2 ">&nbsp;
                                                        </h3>
                                                        <BGStartAmountCard bgInfo={this.state.selectedBG}
                                                                           showPayModal={this.showPayModal}
                                                                           selectedBGHistory={this.state.selectedBGHistory}
                                                        />
                                                    </div>
                                                    <BackupGoalQuickActions showBackUpHistory={this.showBackUpHistory}
                                                                            hideBG={this.hideBackupGoal}
                                                                            fetchGoals={this.fetchBackUpGoals}
                                                                            selectedBG={this.state.selectedBG}
                                                                            selectedBGHistory={this.state.selectedBGHistory}
                                                                            updateSelectedBG={this.updateSelectedBG}
                                                    />
                                                </div>
                                                <div className="row">
                                                    <div id="Back-up-goals" className="col-12 col-md-12">
                                                        <div className="card">
                                                            <div className="card-content mt-1 py-md-2">
                                                                {
                                                                    this.state.selectedBGHistory ?
                                                                        (
                                                                            this.state.mobileTable?
                                                                                    (
                                                                                        <TransactionTable
                                                                                        transactions={this.state.selectedBGHistory.reverse()}
                                                                                        columns={mobileColumns}/> ):
                                                                                    (
                                                                                        <TransactionTable
                                                                                            transactions={this.state.selectedBGHistory.reverse()}
                                                                                            columns={columns}/>
                                                                                    )

                                                                        ) :
                                                                        <div className='text-center'>
                                                                            <i className='fa fa-5x fa-history'></i>
                                                                            <p className='text-muted'>No Backup Goal History</p>
                                                                        </div>

                                                                }
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>

                                    ) :
                                    (
                                        <div className="content-body">
                                            <div className="row">
                                                <div className="col-12 ">
                                                    <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                                        <p>Want to save towards a new phone, car or rent Setup a savings
                                                            goal and be on your way to greatness.</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-12">
                                                    <h3 className="gray-header-text mb-2 ">Backup Goals
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div id="Back-up-goals" className="col-12 col-md-12">
                                                    <div className="card">
                                                        <div className="card-content mt-1 px-1 py-3 px-md-2 ">
                                                            <div
                                                                className="table-header d-flex justify-content-between align-items-md-center mb-3">
                                                                <h4 className="table-title">
                                                                    <button onClick={this.showBackUpModal}
                                                                            className=" right-btn-holder deep-blue-bg white "
                                                                            data-toggle="modal" data-target="#large">
                                                                        <img src={addSavingsIcon}/>
                                                                        New Goal
                                                                    </button>
                                                                </h4>
                                                                <ul className=" mb-0 locked-saving-display d-none d-md-inline-block">
                                                                    <li>{this.state.backupGoals.length} &nbsp; Goals</li>
                                                                </ul>

                                                            </div>

                                                            <div className="row">

                                                                {this.state.backupGoals.length !== 0 ?
                                                                    (
                                                                        this.state.backupGoals.map((content) => {
                                                                            return (
                                                                                <div key={content.id}
                                                                                     className="col-12 col-md-4"
                                                                                     onClick={() => {
                                                                                         this.showBackUp(content.id)
                                                                                         this.setState({
                                                                                             selectedBG: content
                                                                                         })
                                                                                     }}>
                                                                                    <div
                                                                                        className="goal-box round bg-white shadow-md w-100 px-3 py-2 pull-up mb-2">
                                                                                        <h5 className={'text-capitalize'}>{content.title}</h5>
                                                                                        <p className={'gray-text goal-target'}>Target</p>
                                                                                        <div
                                                                                            className='d-flex justify-content-between'>
                                                                                            {/*(moment(content.end_date).format('YYYY-MM-DD')>moment().format('YYYY-MM-DD') && parseInt(content.is_pause) === 0 && parseInt(content.stop)*/}
                                                                                            <h6 className={'goal-box-amount'}>{formatNumber(parseFloat(content.target_amount).toFixed(2))}</h6>
                                                                                            {
                                                                                                moment(content.end_date).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD') && parseInt(content.is_pause) === 0 && parseInt(content.stop) === 0 ?
                                                                                                    (
                                                                                                        <span
                                                                                                            className={'goal-active bGoal-blue'}>Active</span>) :
                                                                                                    (

                                                                                                        (
                                                                                                            (
                                                                                                                moment(content.end_date).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD') && parseInt(content.is_pause) && !parseInt(content.stop) ) ?
                                                                                                                <span
                                                                                                                    className={'goal-inactive text-warning'}>Paused</span> : (
                                                                                                                    (moment(content.end_date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && !parseInt(content.is_pause) && !parseInt(content.stop)) ?
                                                                                                                        <span
                                                                                                                            className={'goal-inactive text-success'}>Completed</span> :
                                                                                                                        (parseInt(content.stop)? <span
                                                                                                                            className={'goal-inactive gray-text'}>Stopped</span> :null)

                                                                                                                )

                                                                                                        )

                                                                                                    )

                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })
                                                                    )
                                                                    :
                                                                    <div className="col-12 text-center text-muted">
                                                                        <i className='fa fa-5x fa-briefcase'></i>
                                                                        <h2 className='table-status mb-5 mb-md-0'>
                                                                            No Backup Goal</h2>
                                                                    </div>
                                                                }
                                                            </div>


                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                            <Footer/>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

export default withToastManager(BackupGoals);
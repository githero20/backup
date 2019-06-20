import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import addSavingsIcon from "../../admin/app-assets/images/svg/add-lock-saving.svg";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";
import {getBackUpGoalAndHistory, getBackUpSavings} from "../../actions/BackUpGoalsAction";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import {getUserData} from "../../actions/UserAction";
import {formatNumber} from "../../Helpers/Helper";
import {withToastManager} from 'react-toast-notifications';
import BGInfoCard from "./BGInfoCard";
import BackupGoalQuickActions from "./BackupGoalQuickActions";
import BGStartAmountCard from "./BGStartAmountCard";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import {dateFormatter,moneyFormatter} from "../../Helpers/Helper";
import moment from 'moment';
import {GetBackUpGoals} from "../../RouteLinks/RouteLinks";
import {request} from "../../ApiUtils/ApiUtils";

class BackupGoals extends Component {

    //get all back up goals

    constructor(props) {
        super(props);
        this.state = {
            showBackUpModal: false,
            accountInfo: null,
            userName: null,
            backupGoals: [],
            loading: false,
            showLoader: false,
            showBackupGoal: false,
            BackupGoalHistory:[],
            selectedBG:null,
            selectedBGHistory:null
        };
        // this.handleBackUpGoals = this.handleBackUpGoals.bind(this);
        this.fetchBackUpGoals = this.fetchBackUpGoals.bind(this);
    }

    showBackUpModal = () => {
        this.setState({
            showBackUpModal: true,
        })
    };

    hideBackupGoal=()=>{
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
        console.log('i ran after continue');
        this.setState({
            showloader: true,
        });
        request(GetBackUpGoals,null,true,'GET',(status, payload) => {
            this.setState({
                showLoader: false
            });
            console.log("Getbackupgoals", status, payload.data.data);
            if (status) {
                this.setState({backupGoals: payload.data.data})
            } else {
                console.error("An error occurred", payload);
            }

        });
    }


    componentDidMount() {
        this.setState({
            showLoader: true,
        });
        getUserData(this.handleUserInfo);

        this.fetchBackUpGoals();
        // this.setupBackupGoals();
    }

    handleUserInfo = (status, res) => {
        this.setState({
            showLoader: false,
        });

        if (status) {

            this.setState({
                userName: res.name
            })

        } else if (!status) {
            if (res) {
                this.props.toastManager.add(res.message || 'An error occurred!!', {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                });
            }

        } else {
            this.props.toastManager.add("No Internet Connection", {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000,
            });
        }

    }

    handleBGoalAndHist = (status, res) => {
        if (status) {
            console.log(res);
        }


    };

    showBackUp =()=>{
        this.setState({
            showBackupGoal:true,
        })
    }



    showBackUpHistory = (id) => {

        this.setState({
            showBackupGoal: true
        })

        console.log(id);
        getBackUpGoalAndHistory(id, this.handleBGHistory);
    }

    handleBGHistory(status, res) {
        if (status) {

            if(res){
                //TODO bind reponse
                console.log(res);
                this.setState({
                    selectedBGHistory:res.backup_goals_history.data
                })
            }

        } else {
            if (res) {
                // this.props.toastManager.add(res.message||'An error occurred!!', {
                //     appearance: 'error',
                //     autoDismiss: true,
                //     autoDismissTimeout: 3000,
                // });
                {/*<Toast content={'successfully got it'} status={'success'}/>*/
                }

            }
            // }else {
            //     this.props.toastManager.add("No Internet Connection", {
            //         appearance: 'error',
            //         autoDismiss: true,
            //         autoDismissTimeout: 3000,
            //     });
            // }

        }

    }

    updateSelectedBG=(content)=>{
        // this.showBackUp(content.id)
        this.setState({
            selectedBG:content
        })
    }

    render() {

        const columns = [

            {
                text: 'Date Created',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
            },
            {
                text: 'Name',

                dataField: 'title',
                sort: true,
            }, {


                text: 'Target Amount',
                dataField: 'target_amount',
                formatter: moneyFormatter,
                sort: true,
            },

            {
                text: 'Start Amount',
                dataField: 'start_amount',
                formatter: moneyFormatter,
                sort: true,
            }
            ,
            {
                text: 'Start Date',
                dataField: 'start_date',
                formatter: dateFormatter,
                sort: true,
            },
            {
                text: 'End Date',
                dataField: 'end_date',
                formatter: dateFormatter,
                sort: true,
            },
            {
                text: 'Frequency',
                dataField: 'frequency',
                sort: true,


            }


        ];

        return (
            <React.Fragment>
                {this.state.showLoader ? <DashboardLoader/> : null}
                <BackUpGoalsModal show={this.state.showBackUpModal} onHide={this.hideModal}/>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={this.state.userName}/>
                    <VerticalNav userName={this.state.userName}/>

                    {/* show individual back up goal */}

                    {/* handle backup goal operations */}

                    <div className="app-content content">
                        <div className="content-wrapper">
                            {/*<div className="row mb-4">*/}
                            {/*    <div className="col-12">*/}
                            {/*      /!*  message box *!/*/}

                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="content-header row">*/}

                            {/*</div>*/}
                            {this.state.showBackupGoal ?
                                (

                                    <React.Fragment>

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

                                                <div className="col-lg-4 col-12">
                                                    <h3 className="gray-header-text fs-mb-1 mb-2 ">BackUpGoal <span
                                                        className="dot">.</span> Summary

                                                    </h3>
                                                   <BGInfoCard bgInfo={this.state.selectedBG}/>
                                                </div>
                                                <div className="col-lg-4 col-12">
                                                    <h3 className="gray-header-text fs-mb-1 mb-2 ">&nbsp;
                                                    </h3>
                                                    <BGStartAmountCard bgInfo={this.state.selectedBG}/>
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
                                                        <div className="card-content mt-1 px-2 px-md-5 py-md-3">
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
                                                            {/* table component */}

                                                            {/*<BackUpGoalsTable backupGoals={this.state.backupGoals} />*/}

                                                            {/*table component*/}
                                                            {
                                                                this.state.selectedHistory?
                                                                    (
                                                                        <TransactionTable transactions={this.state.selectedBG.backup_goals_history} columns={columns} />
                                                                    ):
                                                                    <div className='text-center'>
                                                                        <i className='fa fa-5x fa-history'></i>
                                                                        <p className='text-muted'>No BackUp Goal History</p>
                                                                    </div>

                                                            }




                                                            {/* Grid component    */}

                                                            <div className="row">

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>

                                ) :
                                (
                                    <div className="content-body">
                                        {/*<MessageBox/>*/}
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
                                                    <div className="card-content mt-1 px-2 px-md-5 py-md-3">
                                                        <div
                                                            className="table-header d-flex justify-content-between align-items-md-center px-md-2  mb-3">
                                                            <h4 className="table-title">
                                                                <button onClick={this.showBackUpModal}
                                                                        className=" right-btn-holder deep-blue-bg white "
                                                                        data-toggle="modal" data-target="#large">
                                                                    <img src={addSavingsIcon}/>
                                                                    New Goals
                                                                </button>
                                                            </h4>
                                                            <ul className=" mb-0 locked-saving-display d-none d-md-inline-block">
                                                                <li>{this.state.backupGoals.length} &nbsp; Goals</li>
                                                            </ul>
                                                            {/*<div className="table-button-container d-none d-md-inline-block">*/}
                                                            {/*     <span*/}
                                                            {/*         className="mr-md-1 table-grid-view-icon img-2x list-btn active d-block d-md-inline">*/}
                                                            {/*         <img src={listIcon} className=" img-2x "/>*/}
                                                            {/*     </span>*/}
                                                            {/*                        <span*/}
                                                            {/*                            className="mr-md-1 table-grid-view-icon img-2x  grid-btn d-block d-md-inline">*/}
                                                            {/*        <img src={gridIcon} className=" img-2x "/>*/}
                                                            {/*    </span>*/}
                                                            {/*                        <span className="table-view-display d-block d-md-inline">*/}
                                                            {/*        <img src={tableArrowLeft}*/}
                                                            {/*             className="mr-1 img-1x"/> grid view*/}
                                                            {/*    </span>*/}
                                                            {/*</div>*/}
                                                            {/*<div className="table-sort-display d-block d-md-inline"><span>*/}
                                                            {/*    <img className=" img-2x " src={sortIcon}/>*/}
                                                            {/*    </span>sort*/}
                                                            {/*</div>*/}
                                                            {/*<div className="table-sort-display d-none d-md-inline">*/}
                                                            {/*    <button type="button" className="btn-green">Export CSV</button>*/}
                                                            {/*</div>*/}
                                                        </div>
                                                        {/* table component */}

                                                        {/*<BackUpGoalsTable backupGoals={this.state.backupGoals} />*/}

                                                        {/*table component*/}

                                                        {/*<TransactionTable transactions={this.state.backupGoals} columns={columns} />*/}


                                                        {/* Grid component    */}

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
                                                                                         selectedBG:content
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
                                                                                            moment(content.end_date).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD') && parseInt(content.is_pause)===0 && parseInt(content.stop)===0 ?
                                                                                            (
                                                                                                <span
                                                                                                    className={'goal-active text-info'}>Active</span>) :
                                                                                            (

                                                                                                (
                                                                                                    (
                                                                                                        moment(content.end_date).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD') && parseInt(content.is_pause)===1 && parseInt(content.stop) === 0)?
                                                                                                        <span className={'goal-inactive gray-text'}>Paused</span>:(
                                                                                                        (
                                                                                                            moment(content.end_date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && !parseInt(content.is_pause) && parseInt(content.stop) === 0)?
                                                                                                            <span className={'goal-inactive text-success'}>Completed</span>:
                                                                                                            <span className={'goal-inactive text-success'}>Completed</span>
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
                                                                    <h2>No Back Up Goals</h2>
                                                                </div>


                                                            }


                                                            {/* TODO Handle moe than 10 goals */}


                                                            {/*<div className="col-12 col-md-4">*/}
                                                            {/*    <div*/}
                                                            {/*        className="goal-box round bg-white shadow-md w-100 px-3 py-2 mb-2">*/}
                                                            {/*        <h5>New Boeing 747</h5>*/}
                                                            {/*        <p className={'gray-text goal-target'}>Target</p>*/}
                                                            {/*        <div className='d-flex justify-content-between'>*/}
                                                            {/*            <h6 className={'goal-box-amount'}>₦150,000,000.00</h6>*/}
                                                            {/*            <span*/}
                                                            {/*                className={'goal-active text-success'}>Active</span>*/}
                                                            {/*        </div>*/}
                                                            {/*    </div>*/}
                                                            {/*</div>*/}
                                                            {/*<div className="col-12 col-md-4">*/}
                                                            {/*    <div*/}
                                                            {/*        className="goal-box round bg-white shadow-md w-100 px-3 py-2 mb-2">*/}
                                                            {/*        <h5>New Boeing 747</h5>*/}
                                                            {/*        <p className={'gray-text goal-target'}>Target</p>*/}
                                                            {/*        <div className='d-flex justify-content-between'>*/}
                                                            {/*            <h6 className={'goal-box-amount'}>₦150,000,000.00</h6>*/}
                                                            {/*            <span*/}
                                                            {/*                className={'goal-inactive gray-text'}>Paused</span>*/}
                                                            {/*        </div>*/}
                                                            {/*    </div>*/}
                                                            {/*</div>*/}
                                                            {/*<div className="col-12 col-md-4">*/}
                                                            {/*    <div*/}
                                                            {/*        className="goal-box round bg-white shadow-md w-100 px-3 py-2 mb-2">*/}
                                                            {/*        <h5>New Boeing 747</h5>*/}
                                                            {/*        <p className={'gray-text goal-target'}>Target</p>*/}
                                                            {/*        <div className='d-flex justify-content-between'>*/}
                                                            {/*            <h6 className={'goal-box-amount'}>₦150,000,000.00</h6>*/}
                                                            {/*            <span*/}
                                                            {/*                className={'goal-inactive gray-text'}>Paused</span>*/}
                                                            {/*        </div>*/}
                                                            {/*    </div>*/}
                                                            {/*</div>*/}
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card box-shadow-0">
                                                    <div className="card-content">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card box-shadow-0">
                                                    <div className="card-content">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                )
                            }

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withToastManager(BackupGoals);
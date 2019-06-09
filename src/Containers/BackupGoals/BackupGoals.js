import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import listIcon from "../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../admin/app-assets/images/svg/grid-icon.svg";
import tableArrowLeft from "../../admin/app-assets/images/svg/table-arrow-left.svg";
import sortIcon from "../../admin/app-assets/images/svg/sort-icon.svg";
import addSavingsIcon from "../../admin/app-assets/images/svg/add-lock-saving.svg";
import BackUpGoalsTable from "../../Components/Dashboard/BackUpGoalsTable/BackUpGoalsTable";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";
import {getBackUpSavings} from "../../actions/BackUpGoalsAction";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";

class BackupGoals extends Component {

    //get all back up goals

    constructor(props){
        super(props);
        this.state={
            showBackUpModal: false,
            accountInfo:null,
            userName:null,
            backupGoals: [],
            loading:false,
            showLoader:false
        };

        // this.handleBackUpGoals = this.handleBackUpGoals.bind(this);
    }

    showBackUpModal =()=>{
        this.setState({
            showBackUpModal:true,
        })
    };
    hideModal = (status = false) =>{
        this.setState({
            showBackUpModal:false,
        });

        if(status){
            this.fetchBackUpGoals();
        }
    };


    fetchBackUpGoals(){
        this.setState({
            showloader:true,
        });
        getBackUpSavings((status, payload) => {
            this.setState({
                showLoader:false
            });
            console.log("Getbackupgoals",status, payload);
            if(status){
                this.setState({backupGoals: payload})
            }else{
                console.error("An error occurred", payload);
            }

        });
    }
    componentDidMount() {
        this.fetchBackUpGoals();
        // this.setupBackupGoals();
    }


    render() {
        return (
            <React.Fragment>
                {this.state.showLoader?<DashboardLoader/>:null}
                <BackUpGoalsModal show={this.state.showBackUpModal} onHide={this.hideModal}/>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={this.state.userName} />
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">
                                  {/*  message box */}
                                  {/*<MessageBox/>*/}
                                </div>
                            </div>
                            <div className="content-header row">
                            </div>
                            <div className="content-body">

                                <div className="row">
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Back Up Goals
                                        </h3>
                                    </div>

                                </div>


                                <div className="row">
                                    <div id="Back-up-goals" className="col-12 col-md-12">
                                        <div class Name="card">
                                            <div className="card-content mt-1 px-2 px-md-5 py-md-3">
                                                <div className="table-header d-flex justify-content-between align-items-md-center px-md-2  mb-3">
                                                    <h4 className="table-title">
                                                        <button onClick={this.showBackUpModal} className=" right-btn-holder deep-blue-bg white "
                                                                data-toggle="modal" data-target="#large">
                                                            <img src={addSavingsIcon}/>
                                                            New Goals
                                                        </button>
                                                    </h4>
                                                    <ul className=" mb-0 locked-saving-display d-none d-md-inline-block">
                                                        <li>1 &nbsp; Locked saving</li>
                                                    </ul>
                                                    <div className="table-button-container d-none d-md-inline-block">
                                                     <span
                                                         className="mr-md-1 table-grid-view-icon img-2x list-btn active d-block d-md-inline">
                                                         <img src={listIcon} className=" img-2x "/>
                                                     </span>
                                                                        <span
                                                                            className="mr-md-1 table-grid-view-icon img-2x  grid-btn d-block d-md-inline">
                                                        <img src={gridIcon} className=" img-2x "/>
                                                    </span>
                                                                        <span className="table-view-display d-block d-md-inline">
                                                        <img src={tableArrowLeft}
                                                             className="mr-1 img-1x"/> grid view
                                                    </span>
                                                    </div>
                                                    <div className="table-sort-display d-block d-md-inline"><span>
                                                        <img className=" img-2x " src={sortIcon}/>
                                                        </span>sort
                                                    </div>
                                                    <div className="table-sort-display d-none d-md-inline">
                                                        <button type="button" className="btn-green">Export CSV</button>
                                                    </div>
                                                </div>
                                               {/* table component */}

                                               <BackUpGoalsTable backupGoals={this.state.backupGoals} />
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
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BackupGoals;
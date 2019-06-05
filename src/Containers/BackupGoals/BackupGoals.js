import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import listIcon from "../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../admin/app-assets/images/svg/grid-icon.svg";
import tableArrowLeft from "../../admin/app-assets/images/svg/table-arrow-left.svg";
import sortIcon from "../../admin/app-assets/images/svg/sort-icon.svg";
import addSavingsIcon from "../../admin/app-assets/images/svg/add-lock-saving.svg";
import {getLocalStorage, request} from "../../ApiUtils/ApiUtils";
import {USERACTIVATED, USERINFO} from "../../Components/Auth/HOC/authcontroller";
import {getBackUpGoals} from "../../RouteLinks/RouteLinks";
import BackUpGoalsTable from "../../Components/Dashboard/BackUpGoalsTable/BackUpGoalsTable";
import BackUpGoalsModal from "../../Components/Dashboard/BackUpGoalsModal/BackUpGoalsModal";

class BackupGoals extends Component {

    //get all back up goals

    state={
        showBackUpModal: false,
        accountInfo:null,
        userName:null,

    };

    handleBackUpGoals = (state, response) => {


        if (state) {
            console.log(response);
        }


    };

    setupBackupGoals = () =>{


        console.log('setting up backup Goals');

        //make request for back up goals
        request(getBackUpGoals, null, true, 'GET', this.handleBackUpGoals);



        //get data from localStorage
        if(getLocalStorage(USERINFO)){
            this.setState({
                showLoader:false,
            });
            console.log('there is user info');
            console.log(JSON.parse(getLocalStorage(USERINFO)));

            if(getLocalStorage(USERACTIVATED)){

                let status = JSON.parse(getLocalStorage(USERACTIVATED));
                if(status===false){
                    let userInfo = JSON.parse(getLocalStorage(USERINFO));
                    //show activation modal
                    this.setUpActivation(true,userInfo.email);

                }else if(status===true){
                    console.log('got here to retrieve it ');
                    let data = JSON.parse(getLocalStorage(USERINFO));

                    if (data.accounts !== null || data.accounts !== undefined) {
                        console.log(data);
                        this.setState({
                            accountInfo: data.accounts,
                            userName:data.name,

                        });




                    }

                }
            }


        }else{

            this.setState({
                showLoader:false

            });
            console.log('didnt see usr info');
            //check if user is activated
            if(getLocalStorage(USERACTIVATED)){

                let status = JSON.parse(getLocalStorage(USERACTIVATED));
                if(status===false){
                    //show activation modal
                    this.setUpActivation(true,null);
                }else if(status===true){
                    console.log('got here to retrieve it ');
                    let data = JSON.parse(getLocalStorage(USERINFO));

                }
            }


        }


    };

    showBackUpModal =()=>{
        this.setState({
            showBackUpModal:true,
        })
    };


    hideModal =()=>{
        this.setState({
            showBackUpModal:false,
        })
    };

    componentDidMount() {


        this.setupBackupGoals();
    }


    render() {
        return (
            <React.Fragment>

                {
                    this.state.showBackUpModal ?
                        (
                            <React.Fragment>
                                <BackUpGoalsModal show={this.state.showBackUpModal} onHide={this.hideModal}/>
                            </React.Fragment>

                        ) : null


                }
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={this.state.userName} />
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">
                                    <div
                                        className="bg-white shadow-sm dashboard-callout callout-border-right clearfix callout-round callout-transparent mt-1 px-2 py-2 py-1">
                                        <strong>Congrats! </strong>
                                        <span className="mr-3">you referred 5 persons from [ 1 -2-2019 to 5-2-2019 ] ,
                        <span className="admin-purple d-block d-md-inline">Your referral points earned</span> </span>
                                        <span className=" d-block d-md-inline">25 points</span>
                                        <label className="pull-right"><span className="mr-2"> copy referral code</span>
                                            <span className="code-btn">AEC45SF</span></label>
                                    </div>
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
                                        <div className="card">
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
                                                {/* modal */}
                                                <div className="modal custom-modal fade text-left" id="large"
                                                     tabIndex="-1" role="dialog" aria-labelledby="myModalLabel17"
                                                     aria-hidden="true">
                                                    <div className="modal-dialog modal-lg" role="document">
                                                        <div className="modal-content curved-radius">
                                                            <div className="modal-header">
                                                                <h4 className="modal-title" id="myModalLabel17">New
                                                                    Locked Saving</h4>
                                                                <button type="button" className="close"
                                                                        data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">×</span>
                                                                </button>
                                                            </div>
                                                            <form className="lock-form">
                                                                <div className="modal-body">
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <fieldset
                                                                                className="form-group floating-label-form-group">
                                                                                <label htmlFor="name">Locked Savings
                                                                                    name</label>
                                                                                <input type="text"
                                                                                       className="form-control"
                                                                                       id="name"
                                                                                       placeholder="Toyota Venza"/>
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <fieldset
                                                                                className="form-group floating-label-form-group">
                                                                                <label htmlFor="date">Maturity
                                                                                    Date</label>
                                                                                <input type="date"
                                                                                       className="form-control mb-1"
                                                                                       id="date"/>
                                                                                <label>Date when funds should be
                                                                                    returned to your
                                                                                    BackupCash savings</label>
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="col">
                                                                            <fieldset
                                                                                className="form-group floating-label-form-group">
                                                                                <label htmlFor="email">Capital
                                                                                    Investment [ N ]</label>
                                                                                <input type="text"
                                                                                       className="form-control mb-1"
                                                                                       id="capital" placeholder="0"/>
                                                                                <label>Amount to be removed
                                                                                    instantly from your
                                                                                    BackupCash “ Central Vault ” and
                                                                                    locked away</label>
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>

                                                                    <br/>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <fieldset
                                                                                className="form-group floating-label-form-group ">
                                                                                <label htmlFor="email">Upfront
                                                                                    Interest [ N ]</label>
                                                                                <div className="interest-fieldset">
                                                                                    <input type="text"
                                                                                           className="form-control mb-1"
                                                                                           id="email"
                                                                                           placeholder="0.01"/>
                                                                                    <label
                                                                                        className="label-interest">0.68%
                                                                                        for
                                                                                        19days</label>
                                                                                </div>
                                                                                <label>This upfront interest will be
                                                                                    deposited in your
                                                                                    BackupCash "Central Vault" and
                                                                                    can be
                                                                                    withdrawn immediately.</label>
                                                                            </fieldset>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="modal-footer text-center text-md-right">
                                                                    <input type="reset"
                                                                           className="btn btn-outline-secondary px-md-3 round btn-lg"
                                                                           data-dismiss="modal" value="cancel"/>
                                                                    <input type="submit"
                                                                           className="btn btn-bg-shade-2 btn-lg white px-md-3 round"
                                                                           value="lock Savings"/>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>

                                               {/* table component */}

                                               <BackUpGoalsTable />
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
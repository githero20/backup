import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";

import settingsIcon from "../../admin/app-assets/images/svg/settings-icon-instant-save.svg";
import uploadIcon from "../../admin/app-assets/images/svg/red-upload-icon.svg";

import SteadySaveCard from "../../Components/Dashboard/SteadySaveCard/SteadySaveCard";
import {formatNumber, getTotal, getTotalSteadySave, STANDARD_ACCOUNT} from "../../Helpers/Helper";
import {getLocalStorage, request} from "../../ApiUtils/ApiUtils";
import {USERACTIVATED, USERINFO} from "../../Components/Auth/HOC/authcontroller";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import {getSteadySaveEndpoint} from "../../RouteLinks/RouteLinks";
import SteadySaveTransTable from "../../Components/Dashboard/SteadySaveTransTable/SteadySaveTransTable";

class SteadySave extends Component {


    //show new steady save


    // validate form


    //call api


    //display steady save tables


    //add settings


    state = {
        error: false,
        errorMessage: '',
        accountInfo: null,
        transactions: [],
        userName: '',
        totalBalance: '0.00',
        totalSteadySave: '0.00',
        email: null,
        showSavingModal: false,
        showLoader: true,
    };


    // modal to save more button


    // to collect new instant save


    //

    hideModal = () => {
        this.setState({
                showSavingModal: false
            }
        );

    };

    showModal = () => {
        this.setState({
            showSavingModal: true
        });
    };


    analyseSteadySaveInfo = (data) => {


        if (data.accounts) {

            // loop through data and set appropriate states
            let accounts = data.accounts.data;

            console.log(data);
            let transactions = data.transactions.data;


            this.setState({
                transactions,
            });

            accounts.map((content, idx) => {
                if (content.account_type_id === STANDARD_ACCOUNT) {
                    this.setState({
                        totalBalance: formatNumber(content.balance)
                    })
                }

            });
        } else {
            console.log(data);
            return null;
        }


    };

    handleSteadySave = (state,res) => {

        if(state){
            if(res){
                this.setState({
                    transactions:res.data.data
                });
                console.log(res.data.data);
                const totalSteadySave = getTotalSteadySave(res.data.data);
                console.log(totalSteadySave);
                this.setState({
                    totalSteadySave:formatNumber(totalSteadySave)
                })

            }





        }else {
            console.log(res);
        }

    }

    setupSteadySave = () => {


        request(getSteadySaveEndpoint,null,true,'GET',this.handleSteadySave);
        console.log('setting up steady Save');
        // get data from localStorage
        if (getLocalStorage(USERINFO)) {
            this.setState({
                showLoader: false,
            });
            console.log('there is user info');
            console.log(JSON.parse(getLocalStorage(USERINFO)));

            if (getLocalStorage(USERACTIVATED)) {

                let status = JSON.parse(getLocalStorage(USERACTIVATED));
                if (status === false) {
                    let userInfo = JSON.parse(getLocalStorage(USERINFO));
                    //show activation modal
                    this.setUpActivation(true, userInfo.email);

                } else if (status === true) {
                    console.log('got here to retrieve it ');
                    let data = JSON.parse(getLocalStorage(USERINFO));

                    if (data.accounts !== null || data.accounts !== undefined) {
                        console.log(data);
                        this.setState({
                            accountInfo: data.accounts,
                            userName: data.name,

                        });
                        this.analyseSteadySaveInfo(data);
                    }

                }
            }


        } else {

            this.setState({
                showLoader: false

            });
            console.log('didnt see usr info');
            //check if user is activated
            if (getLocalStorage(USERACTIVATED)) {

                let status = JSON.parse(getLocalStorage(USERACTIVATED));
                if (status === false) {
                    //show activation modal
                    this.setUpActivation(true, null);
                } else if (status === true) {
                    console.log('got here to retrieve it ');
                    let data = JSON.parse(getLocalStorage(USERINFO));


                }
            }


        }


    };

    componentDidMount() {

        this.setupSteadySave();


    }


    showNewSteadySaveModal = ()=>{
        this.setState({
            showSavingModal: true,
        })

    };


    render() {

        const {transactions,userName} =this.state;

        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={userName} />
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">
                                    <MessageBox/>
                                </div>
                            </div>

                            {
                                this.state.showSavingModal ?
                                    (
                                        <React.Fragment>
                                            <SteadySaveModal show={this.state.showSavingModal} onHide={this.hideModal}/>
                                        </React.Fragment>

                                    ) : null


                            }
                            <div className="content-header row">
                            </div>
                            <div className="content-body">

                                <div className="row">


                                    <SteadySaveCard totalBalance={this.state.totalBalance} newSteadySave={this.showNewSteadySaveModal}/>

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


                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text fs-mb-1 mb-2">Quick Actions</h3>

                                        <div className="mb-quick-actions d-flex flex-md-column flex-wrap ">
                        <span className="mb-btn-wrapper">
                            <button type="button" className=" btn-blue-gradient-2 round">
                                <img src={settingsIcon}/>
                                Settings
                            </button>

                        </span>
                                            <span className="mb-details-container ">
                            <div className="d-inline-block q-detail-img">
                                <img src={uploadIcon}/>
                            </div>
                            <div className=" d-inline-block">
                                <strong className="dark-brown font-size-1-16"><span>₦</span> {this.state.totalSteadySave}</strong>
                                <p className="gray-text circular-std mb-p-size">Total Instant Save</p>
                            </div>
                        </span>
                                        </div>
                                    </div>


                                </div>

                                <div className="row">
                                    <SteadySaveTransTable transactions={transactions} />
                                    {/*<div className="col-12 col-md-8">*/}
                                    {/*    <div className="card">*/}

                                    {/*        <div className="card-content mt-1">*/}

                                                {/* table header */}
                                                {/*<div className="table-header d-flex justify-content-between align-items-md-center px-2  mb-3">*/}
                                                {/*    <h4 className="table-title">Recent Transaction*/}
                                                {/*    </h4>*/}
                                                {/*    <ul className=" mb-0 locked-saving-display d-none d-md-inline-block">*/}
                                                {/*        <li>1 &nbsp; Locked saving</li>*/}
                                                {/*    </ul>*/}
                                                {/*    <div className="table-button-container d-none d-md-inline-block">*/}
                                                {/*     <span*/}
                                                {/*         className="mr-md-1 table-grid-view-icon img-2x list-btn active d-block d-md-inline">*/}
                                                {/*         <img src={listIcon} className=" img-2x "/>*/}
                                                {/*     </span>*/}
                                                {/*            <span className="mr-md-1 table-grid-view-icon img-2x  grid-btn d-block d-md-inline">*/}
                                                {/*                <img src={gridIcon} className=" img-2x "/>*/}
                                                {/*            </span>*/}
                                                {/*            <span className="table-view-display d-block d-md-inline">*/}
                                                {/*            <img src={tableArrowLeft} className="mr-1 img-1x"/> grid view*/}
                                                {/*        </span>*/}
                                                {/*    </div>*/}
                                                {/*    <div className="table-sort-display d-block d-md-inline">*/}
                                                {/*        <span>*/}
                                                {/*            <img className=" img-2x " src={sortIcon}/>*/}
                                                {/*        </span>sort*/}
                                                {/*    </div>*/}
                                                {/*    /!*<div className="table-sort-display d-block d-md-inline">*!/*/}
                                                {/*    /!*    <span>*!/*/}
                                                {/*    /!*        <img className=" img-2x " src={sortIcon}/>*!/*/}
                                                {/*    /!*    </span>Filter*!/*/}
                                                {/*    /!*</div>*!/*/}
                                                {/*</div>*/}

                                                {/* locked Savings modal */}


                                                {/*<div className="modal custom-modal  fade text-left" id="large"*/}
                                                {/*     tabIndex="-1" role="dialog" aria-labelledby="myModalLabel17"*/}
                                                {/*     aria-hidden="true">*/}
                                                {/*    <div className="modal-dialog modal-lg" role="document">*/}
                                                {/*        <div className="modal-content curved-radius">*/}
                                                {/*            <div className="modal-header">*/}
                                                {/*                <h4 className="modal-title" id="myModalLabel17">New*/}
                                                {/*                    Locked Saving</h4>*/}
                                                {/*                <button type="button" className="close"*/}
                                                {/*                        data-dismiss="modal" aria-label="Close">*/}
                                                {/*                    <span aria-hidden="true">×</span>*/}
                                                {/*                </button>*/}
                                                {/*            </div>*/}
                                                {/*            <form className="lock-form">*/}
                                                {/*                <div className="modal-body">*/}
                                                {/*                    <div className="row">*/}
                                                {/*                        <div className="col">*/}
                                                {/*                            <fieldset*/}
                                                {/*                                className="form-group floating-label-form-group">*/}
                                                {/*                                <label htmlFor="name">Locked Savings*/}
                                                {/*                                    name</label>*/}
                                                {/*                                <input type="text"*/}
                                                {/*                                       className="form-control"*/}
                                                {/*                                       id="name"*/}
                                                {/*                                       placeholder="Toyota Venza"/>*/}
                                                {/*                            </fieldset>*/}
                                                {/*                        </div>*/}
                                                {/*                    </div>*/}

                                                {/*                    <div className="row">*/}
                                                {/*                        <div className="col">*/}
                                                {/*                            <fieldset*/}
                                                {/*                                className="form-group floating-label-form-group">*/}
                                                {/*                                <label htmlFor="date">Maturity*/}
                                                {/*                                    Date</label>*/}
                                                {/*                                <input type="date"*/}
                                                {/*                                       className="form-control mb-1"*/}
                                                {/*                                       id="date"/>*/}
                                                {/*                                <label>Date when funds should be*/}
                                                {/*                                    returned to your*/}
                                                {/*                                    BackupCash savings</label>*/}
                                                {/*                            </fieldset>*/}
                                                {/*                        </div>*/}
                                                {/*                        <div className="col">*/}
                                                {/*                            <fieldset*/}
                                                {/*                                className="form-group floating-label-form-group">*/}
                                                {/*                                <label htmlFor="email">Capital*/}
                                                {/*                                    Investment [ N ]</label>*/}
                                                {/*                                <input type="text"*/}
                                                {/*                                       className="form-control mb-1"*/}
                                                {/*                                       id="capital" placeholder="0"/>*/}
                                                {/*                                <label>Amount to be removed*/}
                                                {/*                                    instantly from your*/}
                                                {/*                                    BackupCash “ Central Vault ” and*/}
                                                {/*                                    locked away</label>*/}
                                                {/*                            </fieldset>*/}
                                                {/*                        </div>*/}
                                                {/*                    </div>*/}

                                                {/*                    <br/>*/}
                                                {/*                    <div className="row">*/}
                                                {/*                        <div className="col-md-6">*/}
                                                {/*                            <fieldset*/}
                                                {/*                                className="form-group floating-label-form-group ">*/}
                                                {/*                                <label htmlFor="email">Upfront*/}
                                                {/*                                    Interest [ N ]</label>*/}
                                                {/*                                <div className="interest-fieldset">*/}
                                                {/*                                    <input type="text"*/}
                                                {/*                                           className="form-control mb-1"*/}
                                                {/*                                           id="email"*/}
                                                {/*                                           placeholder="0.01"/>*/}
                                                {/*                                    <label*/}
                                                {/*                                        className="label-interest">0.68%*/}
                                                {/*                                        for*/}
                                                {/*                                        19days</label>*/}
                                                {/*                                </div>*/}
                                                {/*                                <label>This upfront interest will be*/}
                                                {/*                                    deposited in your*/}
                                                {/*                                    BackupCash "Central Vault" and*/}
                                                {/*                                    can be*/}
                                                {/*                                    withdrawn immediately.</label>*/}
                                                {/*                            </fieldset>*/}
                                                {/*                        </div>*/}
                                                {/*                    </div>*/}

                                                {/*                </div>*/}
                                                {/*                <div className="modal-footer text-center text-md-right">*/}
                                                {/*                    <input type="reset"*/}
                                                {/*                           className="btn btn-outline-secondary px-md-3 round btn-lg"*/}
                                                {/*                           data-dismiss="modal" value="cancel"/>*/}
                                                {/*                    <input type="submit"*/}
                                                {/*                           className="btn btn-bg-shade-2 btn-lg white px-md-3 round"*/}
                                                {/*                           value="lock Savings"/>*/}
                                                {/*                </div>*/}
                                                {/*            </form>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

                                                {/*table*/}
                                                {/*<div className="table-responsive">*/}
                                                {/*//     <table id="recent-orders"*/}
                                                {/*//            className="table table-hover table-xl mb-0 spaced-table">*/}
                                                {/*//         <thead>*/}
                                                {/*        <tr>*/}
                                                {/*            <th className="border-top-0 d-none d-md-block">Date</th>*/}
                                                {/*            <th className="border-top-0">Description</th>*/}
                                                {/*            <th className="border-top-0">Balance</th>*/}
                                                {/*            <th className="border-top-0">Amount</th>*/}
                                                {/*            <th className="border-top-0 d-none d-md-block">Reference</th>*/}
                                                {/*        </tr>*/}
                                                {/*        </thead>*/}
                                                {/*        <tbody>*/}
                                                {/*        <tr>*/}
                                                {/*            <td className="text-truncate d-none d-md-block"><span*/}
                                                {/*                className="text-muted mr-1">3|5|2019 </span>*/}
                                                {/*                <span className="table-time">8:00am</span></td>*/}
                                                {/*            <td>*/}
                                                {/*                <div className="d-flex">*/}
                                                {/*                    <div className="d-inline-block d-md-none">*/}
                                                {/*                        <img src={greenDots} className="green-dot "/>*/}
                                                {/*                    </div>*/}
                                                {/*                    <div className="d-inline-block">*/}
                                                {/*                        <div className="d-md-block">Credit</div>*/}
                                                {/*                        <div*/}
                                                {/*                            className="table-time d-block d-md-none ">8:00am*/}
                                                {/*                        </div>*/}
                                                {/*                    </div>*/}
                                                {/*                </div>*/}

                                                {/*//             </td>*/}
                                                {/*            <td>*/}
                                                {/*                <label*/}
                                                {/*                    className="bg-light-green px-2 sm-pd">75000</label>*/}
                                                {/*            </td>*/}
                                                {/*            <td className="text-truncate ">*/}
                                                {/*                50,000*/}
                                                {/*            </td>*/}
                                                {/*            <td className="text-truncate d-none d-md-block">ABCD999</td>*/}
                                                {/*        </tr>*/}
                                                {/*        <tr>*/}
                                                {/*            <td className="text-truncate d-none d-md-block"><span*/}
                                                {/*                className="text-muted mr-1">3|5|2019 </span>*/}
                                                {/*//                 <span className="table-time">8:00am</span></td>*/}
                                                {/*//             <td>*/}
                                                {/*//                 <div className="d-flex">*/}
                                                {/*//                     <div className="d-inline-block d-md-none">*/}
                                                {/*                        <img*/}
                                                {/*                            src={redDots}*/}
                                                {/*                            className="red-dot "/>*/}
                                                {/*                    </div>*/}
                                                {/*                    <div className="d-inline-block">*/}
                                                {/*                        <div className="d-md-block">Debit</div>*/}
                                                {/*                        <div*/}
                                                {/*                            className="table-time d-block d-md-none ">8:00am*/}
                                                {/*                        </div>*/}
                                                {/*//                     </div>*/}
                                                {/*//                 </div>*/}
                                                {/*//*/}
                                                {/*            </td>*/}
                                                {/*            <td>*/}
                                                {/*                <label className="bg-light-red px-2 sm-pd">75000</label>*/}
                                                {/*            </td>*/}
                                                {/*            <td className="text-truncate ">*/}
                                                {/*                50,000*/}
                                                {/*            </td>*/}
                                                {/*            <td className="text-truncate d-none d-md-block">ABCD999</td>*/}
                                                {/*        </tr>*/}
                                                {/*        </tbody>*/}
                                                {/*    </table>*/}
                                                {/*</div>*/}

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
                </div>
            </React.Fragment>
        );
    }
}

export default SteadySave;
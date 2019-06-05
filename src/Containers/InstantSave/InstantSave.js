import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import whiteSaveMoreIcon from "../../admin/app-assets/images/svg/mb-save-more-white-icon.svg";
import instantSaveIcon from "../../admin/app-assets/images/svg/mb-instant-save-icon.svg";
import listIcon from "../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../admin/app-assets/images/svg/grid-icon.svg";
import tableLeftArrow from "../../admin/app-assets/images/svg/table-arrow-left.svg";
import sortIcon from "../../admin/app-assets/images/svg/sort-icon.svg";
import greenDots from "../../admin/app-assets/images/svg/green-dot.svg";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";
import InstantSavingModal from "../../Components/Dashboard/InstantSavingModal/InstantSavingModal";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import {getLocalStorage} from "../../ApiUtils/ApiUtils";
import {USERACTIVATED, USERINFO} from "../../Components/Auth/HOC/authcontroller";
import {formatNumber, STANDARD_ACCOUNT} from "../../Helpers/Helper";
import InstantSaveCard from "../../Components/Dashboard/InstantSaveCard/InstantSaveCard";

class InstantSave extends Component {

    state = {
        showSteadySavingModal: false,
        showActiveGoalModal: false,
        showlockedSavingsModal: false,
        error: false,
        errorMessage: '',
        accountInfo: null,
        transactions: [],
        userName:'',
        totalBalance:'0.00',
        totalInstantSave:'0.00',
        email:null,
        showSavingModal: false,
        showLoader:true,
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



    analyseInstantSaveInfo =(data)=>{


        if(data.accounts){

            // loop through data and set appropriate states
            let accounts = data.accounts.data;

            console.log(data);
            let transactions = data.transactions.data;

            let totalInstantSave = this.getTotalInstantSave(transactions);

            this.setState({
                transactions,
                totalInstantSave:formatNumber(totalInstantSave)
            });


            accounts.map((content, idx) => {
                if (content.account_type_id === STANDARD_ACCOUNT) {
                    this.setState({
                        totalBalance: formatNumber(content.balance)
                    })
                }

            });
        }else{
            console.log(data);
            return null;
        }



    };


    getTotalInstantSave(transactions){
        console.log(transactions);
        if(transactions){
            const sum =  transactions.reduce((a,b) => ({amount: parseInt(a.amount ) + parseInt(b.amount ) }));
            return sum.amount;
        }
    }

    setupInstantSave = () =>{

        console.log('setting up instant Save');
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
                        this.analyseInstantSaveInfo(data);
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



    componentDidMount() {

        this.setupInstantSave();


    }



    render() {

        return (
            <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                 data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                <HorizontalNav userName={this.state.userName} />
                <VerticalNav/>
                <div className="app-content content">
                    <div className="content-wrapper">

                        <MessageBox/>

                        {
                            this.state.showSavingModal ?
                                (
                                    <React.Fragment>
                                        <InstantSavingModal show={this.state.showSavingModal}  onHide={this.hideModal}/>
                                    </React.Fragment>

                                ) : null


                        }


                        <div className="content-header row">
                        </div>
                        <div className="content-body">
                            <div className="row">
                                <div className="col-lg-4 col-12">
                                    <h3 className="gray-header-text fs-mb-1 mb-2 ">Instant Save <span
                                        className="dot">.</span> Summary

                                    </h3>
                                    <InstantSaveCard balance={this.state.totalBalance}/>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <h3 className="gray-header-text fs-mb-1 mb-2">Quick Actions</h3>

                                    <div className="mb-quick-actions d-flex flex-md-column flex-wrap ">
                        <span className="mb-btn-wrapper">
                            <button type="button" data-toggle="modal" data-target="#large" onClick={this.showModal}
                                    className=" btn-blue-gradient-2 round">
                                <img src={whiteSaveMoreIcon}/>
                                Save More
                            </button>

                        </span>
                                        <span className="mb-details-container ">
                            <div className="d-inline-block q-detail-img">
                                <img src={instantSaveIcon}/>
                            </div>
                            <div className=" d-inline-block">
                                <strong className="dark-brown font-size-1-16"><span>₦</span> {this.state.totalInstantSave}</strong>
                                <p className="gray-text circular-std mb-p-size">Total Instant Save</p>
                            </div>
                        </span>
                                    </div>
                                </div>


                            </div>

                            <div className="row">

                                {/*transaction table */}
                                <TransactionTable transactions={this.state.transactions}/>






                                {/*<div className="col-12 col-md-8">*/}
                                {/*    <div className="card">*/}

                                {/*        <div className="card-content mt-1">*/}

                                {/*            /!* table head *!/*/}
                                {/*            <div className="table-header d-flex justify-content-between align-items-md-center px-2  mb-3">*/}
                                {/*                <h4 className="table-title">Recent Transaction*/}
                                {/*                </h4>*/}
                                {/*                <ul className=" mb-0 locked-saving-display d-none d-md-inline-block">*/}
                                {/*                    <li>1 &nbsp; Locked saving</li>*/}
                                {/*                </ul>*/}
                                {/*                <div className="table-button-container d-none d-md-inline-block">*/}
                                {/*                 <span*/}
                                {/*                     className="mr-md-1 table-grid-view-icon img-2x list-btn active d-block d-md-inline">*/}
                                {/*                     <img src={listIcon} className=" img-2x "/>*/}
                                {/*                 </span>*/}
                                {/*                    <span className="mr-md-1 table-grid-view-icon img-2x  grid-btn d-block d-md-inline">*/}
                                {/*                        <img src={gridIcon} className=" img-2x "/>*/}
                                {/*                    </span>*/}
                                {/*                    <span className="table-view-display d-block d-md-inline">*/}
                                {/*                        <img src={tableLeftArrow} className="mr-1 img-1x"/> grid view*/}
                                {/*                    </span>*/}
                                {/*                </div>*/}
                                {/*                <div className="table-sort-display d-block d-md-inline"><span*/}
                                {/*                    data-toggle="modal" data-target="#sort"><img className=" img-2x " src={sortIcon}/></span>sort*/}
                                {/*                </div>*/}

                                {/*            </div>*/}




                                {/*            /!*modal*!/*/}
                                {/*            <div className="modal custom-modal fade text-left" id="sort" tabIndex="-1"*/}
                                {/*                 role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">*/}
                                {/*                <div className="modal-dialog modal-lg" role="document">*/}
                                {/*                    <div className="modal-content curved-radius">*/}
                                {/*                        <div className="modal-header">*/}
                                {/*                            <h4 className="modal-title">Amount Range</h4>*/}
                                {/*                            <button type="button" className="close" data-dismiss="modal"*/}
                                {/*                                    aria-label="Close">*/}
                                {/*                                <span aria-hidden="true">×</span>*/}
                                {/*                            </button>*/}
                                {/*                        </div>*/}
                                {/*                        <form className="lock-form">*/}
                                {/*                            <div className="modal-body">*/}
                                {/*                                <div className="row">*/}
                                {/*                                    <div className="col">*/}
                                {/*                                        <div*/}
                                {/*                                            className="form-group floating-label-form-group">*/}
                                {/*                                            <label htmlFor="name">From</label>*/}
                                {/*                                            <input type="text" className="form-control"*/}
                                {/*                                                   id="from"/>*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                    <div className="col">*/}
                                {/*                                        <div*/}
                                {/*                                            className="form-group floating-label-form-group">*/}
                                {/*                                            <label htmlFor="name">To</label>*/}
                                {/*                                            <input type="text" className="form-control"*/}
                                {/*                                                   id="to"/>*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                    <hr/>*/}
                                {/*                                </div>*/}

                                {/*                                <div className="row">*/}
                                {/*                                    <div className="col-6">*/}
                                {/*                                        <div*/}
                                {/*                                            className="form-group floating-label-form-group">*/}
                                {/*                                            <label htmlFor="status"> Status :</label>*/}
                                {/*                                            <select name="" id="">*/}
                                {/*                                                <option>one thing</option>*/}
                                {/*                                                <option>one teo</option>*/}
                                {/*                                                <option>one thing</option>*/}
                                {/*                                            </select>*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                    <hr/>*/}
                                {/*                                </div>*/}
                                {/*                                <div className="row">*/}
                                {/*                                    <div className="col-md-6">*/}
                                {/*                                        <h3>Date Timeline:</h3>*/}
                                {/*                                        <div*/}
                                {/*                                            className="form-group floating-label-form-group ">*/}
                                {/*                                            <label htmlFor="from">From</label>*/}
                                {/*                                            <div className="interest-fieldset">*/}
                                {/*                                                <input type="date"*/}
                                {/*                                                       className="form-control mb-1"*/}
                                {/*                                                       id="email"/>*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                    <div className="col-md-6">*/}
                                {/*                                        <div*/}
                                {/*                                            className="form-group floating-label-form-group ">*/}
                                {/*                                            <label htmlFor="from">To</label>*/}
                                {/*                                            <div className="interest-fieldset">*/}
                                {/*                                                <input type="date"*/}
                                {/*                                                       className="form-control mb-1"*/}
                                {/*                                                       placeholder="0.01"/>*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}

                                {/*                            </div>*/}
                                {/*                            <div className="modal-footer text-center ">*/}
                                {/*                                <input type="submit"*/}
                                {/*                                       className="btn btn-bg-shade-2 btn-lg white px-md-3 round"*/}
                                {/*                                       readOnly={true} value="Apply"/>*/}
                                {/*                            </div>*/}
                                {/*                        </form>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}

                                {/*            /!*modal*!/*/}
                                {/*            <div className="modal custom-modal fade text-left" id="large" tabIndex="-1"*/}
                                {/*                 role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">*/}
                                {/*                <div className="modal-dialog modal-lg" role="document">*/}
                                {/*                    <div className="modal-content curved-radius">*/}
                                {/*                        <div className="modal-header">*/}
                                {/*                            <h4 className="modal-title" id="myModalLabel17">Instant*/}
                                {/*                                Saving Deposit</h4>*/}
                                {/*                            <button type="button" className="close" data-dismiss="modal"*/}
                                {/*                                    aria-label="Close">*/}
                                {/*                                <span aria-hidden="true">×</span>*/}
                                {/*                            </button>*/}
                                {/*                        </div>*/}
                                {/*                        <form className="lock-form">*/}
                                {/*                            <div className="modal-body">*/}
                                {/*                                <div className="row">*/}
                                {/*                                    <div className="col">*/}
                                {/*                                        <fieldset*/}
                                {/*                                            className="form-group floating-label-form-group">*/}
                                {/*                                            <label htmlFor="name">Amount to Save</label>*/}
                                {/*                                            <input type="text" className="form-control"*/}
                                {/*                                                   id="name"*/}
                                {/*                                                   placeholder="Toyota Venza"/>*/}
                                {/*                                        </fieldset>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                                <div className="row">*/}
                                {/*                                    <div className="col">*/}

                                {/*                                        <div className="slidecontainer">*/}
                                {/*                                            <input type="range" min="1" max="100"*/}
                                {/*                                                   readOnly={true} value="50"*/}
                                {/*                                                   className="slider" id="myRange"/>*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                                <div className="row">*/}
                                {/*                                    <div className="col">*/}
                                {/*                                        <fieldset className="form-group ">*/}
                                {/*                                            <label htmlFor="name">Amount to Save</label>*/}
                                {/*                                            <div className="select_mate"*/}
                                {/*                                                 data-mate-select="active"*/}
                                {/*                                                 data-indx-select="0"*/}
                                {/*                                                 data-selec-open="false">*/}
                                {/*                                                <select name="">*/}
                                {/*                                                    <option value="">select options*/}
                                {/*                                                    </option>*/}
                                {/*                                                    <option value="1">Select option 1*/}
                                {/*                                                    </option>*/}
                                {/*                                                    <option value="2">Select option 2*/}
                                {/*                                                    </option>*/}
                                {/*                                                    <option value="3">Select option 3*/}
                                {/*                                                    </option>*/}
                                {/*                                                </select>*/}
                                {/*                                            </div>*/}
                                {/*                                        </fieldset>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                            <div className="modal-footer text-center text-md-right">*/}
                                {/*                                <input type="reset"*/}
                                {/*                                       readOnly={true}*/}
                                {/*                                       className="btn btn-outline-secondary px-md-3 round btn-lg"*/}
                                {/*                                       data-dismiss="modal" value="cancel"/>*/}
                                {/*                                <input readOnly={true} type="submit"*/}
                                {/*                                       className="btn btn-bg-shade-2 btn-lg white px-md-3 round"*/}
                                {/*                                       value="Deposit"/>*/}
                                {/*                            </div>*/}
                                {/*                        </form>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}


                                {/*            <div className="table-responsive">*/}
                                {/*                /!*table *!/*/}
                                {/*                <table id="recent-orders"*/}
                                {/*                       className="table table-hover table-xl mb-0 spaced-table">*/}
                                {/*                    <thead>*/}
                                {/*                    <tr>*/}
                                {/*                        <th className="border-top-0 d-none d-md-block">Date</th>*/}
                                {/*                        <th className="border-top-0">Description</th>*/}
                                {/*                        <th className="border-top-0">Balance</th>*/}
                                {/*                        <th className="border-top-0">Amount</th>*/}
                                {/*                        <th className="border-top-0 d-none d-md-block">Reference</th>*/}
                                {/*                    </tr>*/}
                                {/*                    </thead>*/}
                                {/*                    <tbody>*/}
                                {/*                    <tr>*/}
                                {/*                        <td className="text-truncate d-none d-md-block"><span*/}
                                {/*                            className="text-muted mr-1">3|5|2019 </span>*/}
                                {/*                            <span className="table-time">8:00am</span></td>*/}
                                {/*                        <td>*/}
                                {/*                            <div className="d-flex">*/}
                                {/*                                <div className="d-inline-block d-md-none">*/}
                                {/*                                    <img src={greenDots}*/}
                                {/*                                         className="green-dot "/>*/}
                                {/*                                </div>*/}
                                {/*                                <div className="d-inline-block">*/}
                                {/*                                    <div className="d-md-block">Credit</div>*/}
                                {/*                                    <div*/}
                                {/*                                        className="table-time d-block d-md-none ">8:00am*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}

                                {/*                        </td>*/}
                                {/*                        <td>*/}
                                {/*                            <label className="bg-light-green px-2 sm-pd">75000</label>*/}
                                {/*                        </td>*/}
                                {/*                        <td className="text-truncate ">*/}
                                {/*                            50,000*/}
                                {/*                        </td>*/}
                                {/*                        <td className="text-truncate d-none d-md-block">ABCD999</td>*/}
                                {/*                    </tr>*/}
                                {/*                    <tr>*/}
                                {/*                        <td className="text-truncate d-none d-md-block"><span*/}
                                {/*                            className="text-muted mr-1">3|5|2019 </span>*/}
                                {/*                            <span className="table-time">8:00am</span></td>*/}
                                {/*                        <td>*/}
                                {/*                            <div className="d-flex">*/}
                                {/*                                <div className="d-inline-block d-md-none">*/}
                                {/*                                    /!*<img src="../../admin/app-assets/images/svg/red-table-dot.svg"*!/*/}
                                {/*                                    className="red-dot "/>*/}
                                {/*                                </div>*/}
                                {/*                                <div className="d-inline-block">*/}
                                {/*                                    <div className="d-md-block">Debit</div>*/}
                                {/*                                    <div*/}
                                {/*                                        className="table-time d-block d-md-none ">8:00am*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}

                                {/*                        </td>*/}
                                {/*                        <td>*/}
                                {/*                            <label className="bg-light-red px-2 sm-pd">75000</label>*/}
                                {/*                        </td>*/}
                                {/*                        <td className="text-truncate ">*/}
                                {/*                            50,000*/}
                                {/*                        </td>*/}
                                {/*                        <td className="text-truncate d-none d-md-block">ABCD999</td>*/}
                                {/*                    </tr>*/}
                                {/*                    </tbody>*/}
                                {/*                </table>*/}
                                {/*            </div>*/}
                                {/*            /!* pagination *!/*/}
                                {/*            <nav aria-label="Page navigation">*/}
                                {/*                <ul className=" custom-pagination pagination justify-content-center pagination-separate pagination-round pagination-flat pagination-lg mb-1">*/}
                                {/*                    <li className="page-item">*/}
                                {/*                        <a className="page-link" href="#" aria-label="Previous">*/}
                                {/*                            <span aria-hidden="true"><span*/}
                                {/*                                className="d-none d-md-inline">«</span> Prev</span>*/}
                                {/*                            <span className="sr-only">Previous</span>*/}
                                {/*                        </a>*/}
                                {/*                    </li>*/}
                                {/*                    <li className="page-item"><a className="page-link" href="#">1</a>*/}
                                {/*                    </li>*/}
                                {/*                    <li className="page-item"><a className="page-link" href="#">2</a>*/}
                                {/*                    </li>*/}
                                {/*                    <li className="page-item active"><a className="page-link"*/}
                                {/*                                                        href="#">3</a></li>*/}
                                {/*                    <li className="page-item"><a className="page-link" href="#">4</a>*/}
                                {/*                    </li>*/}
                                {/*                    <li className="page-item"><a className="page-link" href="#">5</a>*/}
                                {/*                    </li>*/}
                                {/*                    <li className="page-item">*/}
                                {/*                        <a className="page-link" href="#" aria-label="Next">*/}
                                {/*                            <span aria-hidden="true">Next <span*/}
                                {/*                                className="d-none d-md-inline">»</span></span>*/}
                                {/*                            <span className="sr-only">Next</span>*/}
                                {/*                        </a>*/}
                                {/*                    </li>*/}
                                {/*                </ul>*/}
                                {/*            </nav>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstantSave;
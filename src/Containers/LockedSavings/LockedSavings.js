import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";

import lockedSavingIcon from "../../admin/app-assets/images/svg/add-lock-saving.svg";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import {_getToken, _isDateAfter, _isDateAfterToday, _transformDate} from "../../utils";
import {getLockedSavings} from "../../actions/LockedSavingsAction";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";
import {
    dateFormatter, balanceFormatter,
    interestFormatter, moneyFormatter,
} from "../../Helpers/Helper";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import {getUserData} from "../../actions/UserAction";
import LockedTransactionTable from "../../Components/Dashboard/LockedTransactionTable/LockedTransactionTable";


class LockedSavings extends Component {

    constructor(props){
        super(props);

        console.log(_getToken());
        this.showLSModal = this.showLSModal.bind(this);
        this.closeLSModal = this.closeLSModal.bind(this);
    }

    state = {
        showLockedSavingsModal: false,
        lockedSavings:[],
        showLoader:false
    };

    //get user info
    componentDidMount() {
        console.log("Mounted");

        this.setState({
            showLoader:true,
        });

        getUserData(this.handleUserInfo);

        getLockedSavings((status, payload) => {
            console.log("payload", status, payload);
            if(status){
                //TODO(work on making this merging this payload.data.to lockedSavings[])
                this.setState({lockedSavings: payload});

            }
        })
    }

    handleUserInfo = (status,res)=>{
        this.setState({
            showLoader:false,
        });

        if(status){

            this.setState({
                userName:res.name
            })

        }


    }

    showLSModal(){
        this.setState({
            showLockedSavingsModal: true
        });
    };


    closeLSModal(status=false){
        this.setState({
            showLockedSavingsModal: false
        });
        if(status){
            getLockedSavings((status, payload) => {
                console.log("payload", status, payload);
                if(status){
                    this.setState({lockedSavings: payload.data});
                }
            })
        }

    };



    render() {


        console.log(this.state.lockedSavings);
        const columns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter:dateFormatter,
                sort:true,
            },
            {
                text: 'Name',
                dataField: 'title',
                sort:true,

            },
            {
                text: 'Balance',
                dataField: 'balance',
                formatter:balanceFormatter,
                sort:true,

            },{
                text: 'Amount',
                dataField: 'amount',
                formatter:moneyFormatter,
                sort:true,

            },
            {
                text: 'Interest',
                dataField: 'interest',
                formatter:interestFormatter,
                sort:true,
            },
            {
                text: 'Start Date',
                dataField: 'start_date',
                formatter:dateFormatter,
                sort:true,

            },
            {
                text: 'End Date',
                dataField: 'end_date',
                formatter:dateFormatter,
                sort:true,

            },
           ];

        return (
            <React.Fragment>
                    <LockedSavingModal
                        show={this.state.showLockedSavingsModal}
                        onHide={this.closeLSModal}
                    />
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={this.state.userName} />
                    <VerticalNav  userName={this.state.userName} />
                    <div className="app-content content">
                        <div className="content-wrapper">
                            {this.state.showLoader?<DashboardLoader/>:null}
                            {/*<MessageBox />*/}
                            {/*<div className="row mb-4">*/}
                            {/*    <div className="col-12"></div>*/}
                            {/*</div>*/}

                            <div className="content-body">
                                <div className="row">
                                    <div className="col-12 ">
                                        <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                            <p>Earn your interest upfront, but you need to lock your money with us for a period set by you. You can withdraw at the end of the period you have set.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Locked Savings</h3>
                                    </div>

                                </div>

                                <div className="row">
                                    <div id="locked-savings" className="col-12 col-md-12">
                                        <div className="card">
                                            <div className="card-content mt-1 px-2 px-md-5 py-md-3">
                                                <div
                                                    className="table-header d-flex justify-content-between align-items-md-center px-md-2  mb-3">
                                                    <h4 className="table-title">
                                                        <button
                                                            className=" right-btn-holder deep-blue-bg white "
                                                            data-toggle="modal" data-target="#large"
                                                            onClick={this.showLSModal}>
                                                            <img src={lockedSavingIcon}/>
                                                            New Locked Savings
                                                        </button>
                                                    </h4>
                                                    <ul className=" mb-0 locked-saving-display d-none d-md-inline-block">
                                                        <li>{this.state.lockedSavings.length!==0?this.state.lockedSavings.length:0} &nbsp; Locked saving</li>
                                                    </ul>
                                                    {/*<div className="table-button-container d-none d-md-inline-block">*/}
                                                    {/* <span*/}
                                                    {/*     className="mr-md-1 table-grid-view-icon img-2x list-btn active d-block d-md-inline">*/}
                                                    {/*     <img src={listIcon} className=" img-2x "/>*/}
                                                    {/* </span>*/}
                                                    {/*    <span*/}
                                                    {/*        className="mr-md-1 table-grid-view-icon img-2x  grid-btn d-block d-md-inline">*/}
                                                    {/*            <img src={gridIcon} className=" img-2x "/>*/}
                                                    {/*    </span>*/}
                                                    {/*    <span className="table-view-display d-block d-md-inline">*/}
                                                    {/*        <img src={tableArrowLeft} className="mr-1 img-1x"/> grid view*/}
                                                    {/*    </span>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="table-sort-display d-block d-md-inline">*/}
                                                    {/*    <span>*/}
                                                    {/*        <img className=" img-2x " src={sortIcon}/>*/}
                                                    {/*    </span>sort*/}
                                                    {/*</div>*/}
                                                </div>
                                                <div className="row">
                                                    {/*<TransactionTable transactions={this.state.lockedSavings} columns={columns} />*/}
                                                    <LockedTransactionTable transactions={this.state.lockedSavings} columns={columns} />
                                                </div>

                                                {/*<div className="box-grid-container  light-blue-bg px-md-3 py-md-3">*/}



                                                            {
                                                                this.state.lockedSavings.length!==0? (

                                                                        <div className="table-view table-responsive mb-5">
                                                                            <table id="recent-orders"
                                                                                   className="table table-hover table-xl mb-0 spaced-table text-center">
                                                                                <thead>
                                                                                <tr>
                                                                                    <th>#</th>
                                                                                    <th>Name</th>
                                                                                    <th>Amount</th>
                                                                                    <th>Interest</th>
                                                                                    <th>Start Date</th>
                                                                                    <th>End Date</th>
                                                                                    <th>Status</th>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {

                                                                                        this.state.lockedSavings.map(ls => {
                                                                                            console.log("Index", ls);
                                                                                            return (
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        {ls.id}
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        {ls.title}
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        {ls.amount}
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <label>+{parseFloat(ls.interest).toFixed(2)}%</label>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        {_transformDate(ls.start_date)}
                                                                                                    </td>
                                                                                                    <td>{_transformDate(ls.end_date)}</td>
                                                                                                    <td>{
                                                                                                        _isDateAfterToday(ls.end_date) ? "Completed" : "Ongoing"
                                                                                                    }</td>

                                                                                                </tr>
                                                                                            );


                                                                                        })

                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                ):
                                                                    <div className='text-center'>
                                                                        <i className='fa fa-5x fa-briefcase'></i>
                                                                        <p>No locked Savings at the moment</p>
                                                                    </div>
                                                            }


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
                                                    {/*</nav>*/}
                                                {/*</div>*/}
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

const WithToast = withToastManager(LockedSavings);

export default WithToast;
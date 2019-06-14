import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";

import settingsIcon from "../../admin/app-assets/images/svg/settings-icon-instant-save.svg";
import uploadIcon from "../../admin/app-assets/images/svg/red-upload-icon.svg";
import {getLocalStorage, request} from "../../ApiUtils/ApiUtils";
import SteadySaveCard from "../../Components/Dashboard/SteadySaveCard/SteadySaveCard";
import {USERINFO} from "../../Components/Auth/HOC/authcontroller";
import {
    amountFormatter,
    dateFormatter,
    descriptionFormatter,
    formatNumber,
    getTotalSteadySave, moneyFormatter,
    STANDARD_ACCOUNT, statusFormatter, steadyStatusFormatter
} from "../../Helpers/Helper";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import {getSteadySaveEndpoint, getUserInfoEndpoint} from "../../RouteLinks/RouteLinks";
import SteadySaveTransTable from "../../Components/Dashboard/SteadySaveTransTable/SteadySaveTransTable";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import whiteSaveMoreIcon from "../../admin/app-assets/images/svg/mb-save-more-white-icon.svg";
import CreateSteadySaveModal from "../../Components/Dashboard/CreateSteadySaveModal/CreateSteadySaveModal";

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
            email: null,
            showSavingModal: false,
            showCreateSavingModal: false,
            showLoader: false,
            settings: false,
            steadySave: {
                id: null,
                contribution: 0,
                start_date: null,
                frequency: null,
                hour_of_day: 0,
                payment_auth: null,
                raw: null
            }
        };

    }

    hideModal = (status = false) => {
        this.setState({
                showSavingModal: false
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


    handleSteadySave = (state, res) => {
        this.setState({
            showLoader: false
        });
        if (state) {
            if (res) {
                console.log("Data", res.data.data);
                const totalSteadySave = getTotalSteadySave(res.data.data);
                console.log(totalSteadySave);
                this.setState({
                    transactions: res.data.data,
                    totalSteadySave: formatNumber(parseFloat(totalSteadySave).toFixed(2)),
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
        console.log('setting up steady Save');
        // get data from localStorage
    };


    GetBalance = () => {

        console.log('setting up instant Save');

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

                console.log(data.data.data.accounts)


                // loop through data and set appropriate states
                let accounts = data.data.data.accounts.data;

                //display total balance
                accounts.map((content, idx) => {
                    if (content.account_type_id === STANDARD_ACCOUNT) {
                        console.log(content.balance);
                        this.setState({
                            totalBalance: formatNumber(parseFloat(content.balance).toFixed(2))
                        })
                    }
                });

                // console.log('dfjsd');
                // console.log(data.data.data.transactions.data);
                // //TODO loop through transactions and add up only credits
                // let transactions = data.data.data.transactions.data;
                // let totalInstantSave = this.getTotalInstantSave(transactions);
                // this.setState({
                //     transactions,
                //     totalInstantSave: formatNumber(totalInstantSave)
                // });


            } else {
                console.log(data);
                return null;
            }


        }


    };


    componentDidMount() {
        this.setupSteadySave();
        this.GetBalance();
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


    render() {

        const {transactions, userName} = this.state;


        //update the button to show status in progress if is paused is 0 or paused if its 1


        //table header and columns
        const columns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true
            },
            {
                text: 'Frequency',
                dataField: 'frequency',
                sort: true

            },
            {
                text: 'Start Amount',
                dataField: 'start_amount',
                formatter: moneyFormatter,
                sort: true
            },
            {
                text: 'Status',
                dataField: 'status',
                formatter: steadyStatusFormatter,
                sort: true
            }];


        return (

            <React.Fragment>
                {this.state.showLoader ? <DashboardLoader/> : null}
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={userName}/>
                    <VerticalNav/>


                    {/*steady Save settings*/}


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
                                                             show={this.state.showSavingModal} onHide={this.hideModal}
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
                                                             show={this.state.showCreateSavingModal} onHide={this.hideCreateModal}/>
                                        </React.Fragment>

                                    ) : null


                            }
                            <div className="content-header row">
                            </div>
                            <div className="content-body">

                                <div className="row">

                                    <div className="col-lg-4 col-12 order-lg-8">
                                        <div className={'descriptive-info mt-md-3 mt-0 mb-3 px-2 py-1'}>
                                            <p>Start saving your money here automatically, daily, weekly or monthly We want you to be disciplined, so we’ll charge you 5% if you choose to withdraw outside of your set withdrawal days.</p>
                                        </div>
                                    </div>

                                    <SteadySaveCard totalBalance={this.state.totalBalance}
                                                    newSteadySave={this.showNewSteadySaveModal}/>

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
                                        <h3 className="gray-header-text fs-mb-1 mb-2">Quick Actions</h3>
                                        <div className="mb-quick-actions d-flex flex-column flex-wrap ">
                                            <span className="mb-btn-wrapper">
                                                {/*<button type="button" onClick={this.showCreateSteadySaveModal} className=" btn-blue-gradient-2 round">*/}
                                                {/*    <img src={whiteSaveMoreIcon}/>*/}
                                                {/*    Create Steady Save*/}
                                                {/*</button>*/}
                                                <button type="button" onClick={this.showModal} className=" btn-blue-gradient-2 round">
                                                    <img src={whiteSaveMoreIcon}/>
                                                    Edit Savings Plan
                                                </button>
                                            </span>
                                            <span className="mb-details-container ">
                                                <div className="d-inline-block q-detail-img">
                                                    <img src={uploadIcon}/>
                                                </div>
                                                <div className=" d-inline-block">
                                                    <strong
                                                        className="dark-brown font-size-1-16"><span>₦</span> {this.state.totalSteadySave}</strong>
                                                    <p className="gray-text circular-std mb-p-size">Total Steady Save</p>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">

                                    <TransactionTable transactions={transactions} columns={columns}/>
                                    {/*<SteadySaveTransTable transactions={transactions}/>*/}

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
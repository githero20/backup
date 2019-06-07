import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";

import settingsIcon from "../../admin/app-assets/images/svg/settings-icon-instant-save.svg";
import uploadIcon from "../../admin/app-assets/images/svg/red-upload-icon.svg";
import {getLocalStorage, request} from "../../ApiUtils/ApiUtils";
import SteadySaveCard from "../../Components/Dashboard/SteadySaveCard/SteadySaveCard";
import {USERINFO} from "../../Components/Auth/HOC/authcontroller";
import {formatNumber, getTotalSteadySave, STANDARD_ACCOUNT} from "../../Helpers/Helper";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import {getSteadySaveEndpoint, getUserInfoEndpoint} from "../../RouteLinks/RouteLinks";
import SteadySaveTransTable from "../../Components/Dashboard/SteadySaveTransTable/SteadySaveTransTable";

class SteadySave extends Component {
    constructor(props){
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
            showLoader: true,
            settings: false,
            steadySave: {id: null,contribution: 0, start_date: "N/A", frequency: "N/A", hour_of_day: 0, payment_auth:"N/A", raw:null}
        };

    }
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


    handleSteadySave = (state, res) => {

        if (state) {
            if (res) {
                console.log("Data",res.data.data);
                const totalSteadySave = getTotalSteadySave(res.data.data);
                console.log(totalSteadySave);
                this.setState({
                    transactions: res.data.data,
                    totalSteadySave: formatNumber(totalSteadySave),
                    // steadySave: res.data.data.length == 0 ? {} : res.data.data[0]
                });
                const temp = res.data.data;
                if(temp && temp.length > 0){

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

        request(getSteadySaveEndpoint, null, true, 'GET', this.handleSteadySave);
        console.log('setting up steady Save');
        // get data from localStorage
    };

    //TODO make a request to get user data and pass to analyse


    GetBalance = () => {

        console.log('setting up instant Save');

        //TODO Add Table Loader
        //call get user info
        request(getUserInfoEndpoint, null, true, 'GET', this.analyseSteadySaveInfo)


    };
    analyseSteadySaveInfo = (status, data) => {

        if (status) {

            console.log(data.data.data);

            if (data.data.data.accounts) {

                console.log(data.data.data.accounts)


                // loop through data and set appropriate states
                let accounts = data.data.data.accounts.data;

                //display total balance
                accounts.map((content, idx) => {
                    if (content.account_type_id === STANDARD_ACCOUNT) {
                        console.log(content.balance);
                        this.setState({
                            totalBalance: formatNumber(content.balance)
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


    render() {

        const {transactions, userName} = this.state;


        return (
            <React.Fragment>
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
                                            <SteadySaveModal steadySave={this.state.steadySave} show={this.state.showSavingModal} onHide={this.hideModal}/>
                                        </React.Fragment>

                                    ) : null


                            }
                            <div className="content-header row">
                            </div>
                            <div className="content-body">

                                <div className="row">


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


                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text fs-mb-1 mb-2">Quick Actions</h3>

                                        <div className="mb-quick-actions d-flex flex-md-column flex-wrap ">
                        <span className="mb-btn-wrapper">
                            <button type="button" onClick={this.showModal} className=" btn-blue-gradient-2 round">
                                <img src={settingsIcon}/>
                                Settings
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
                                    <SteadySaveTransTable transactions={transactions}/>

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
import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";

import settingsIcon from "../../admin/app-assets/images/svg/settings-icon-instant-save.svg";
import uploadIcon from "../../admin/app-assets/images/svg/red-upload-icon.svg";

import SteadySaveCard from "../../Components/Dashboard/SteadySaveCard/SteadySaveCard";
import {formatNumber, getTotalSteadySave} from "../../Helpers/Helper";
import {request} from "../../ApiUtils/ApiUtils";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";
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
        settings: false,
        steadySave:{contribution:10000,start_date:'2016-05-12',frequency:'daily',hour_of_day:12}
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


    handleSteadySave = (state, res) => {

        if (state) {
            if (res) {
                this.setState({
                    transactions: res.data.data
                });
                console.log(res.data.data);
                const totalSteadySave = getTotalSteadySave(res.data.data);
                console.log(totalSteadySave);
                this.setState({
                    totalSteadySave: formatNumber(totalSteadySave)
                })

            }


        } else {
            console.log(res);
        }

    }

    setupSteadySave = () => {

        request(getSteadySaveEndpoint, null, true, 'GET', this.handleSteadySave);
        console.log('setting up steady Save');
        // get data from localStorage
        // if (getLocalStorage(USERINFO)) {
        //     this.setState({
        //         showLoader: false,
        //     });
        //     console.log('there is user info');
        //     console.log(JSON.parse(getLocalStorage(USERINFO)));
        //
        //     if (getLocalStorage(USERACTIVATED)) {
        //
        //         let status = JSON.parse(getLocalStorage(USERACTIVATED));
        //         if (status === false) {
        //             let userInfo = JSON.parse(getLocalStorage(USERINFO));
        //             //show activation modal
        //             this.setUpActivation(true, userInfo.email);
        //
        //         } else if (status === true) {
        //             console.log('got here to retrieve it ');
        //             let data = JSON.parse(getLocalStorage(USERINFO));
        //
        //                 console.log(data);
        //                 this.setState({
        //                     userName: data.name,
        //                 });
        //
        //         }
        //     }
        //
        //
        // } else {
        //
        //     this.setState({
        //         showLoader: false
        //
        //     });
        //     console.log('didnt see usr info');
        //     //check if user is activated
        //     if (getLocalStorage(USERACTIVATED)) {
        //
        //         let status = JSON.parse(getLocalStorage(USERACTIVATED));
        //         if (status === false) {
        //             //show activation modal
        //             this.setUpActivation(true, null);
        //         } else if (status === true) {
        //             console.log('got here to retrieve it ');
        //             let data = JSON.parse(getLocalStorage(USERINFO));
        //
        //
        //         }
        //     }
        //
        // }


    };

    componentDidMount() {

        this.setupSteadySave();


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
                                    <MessageBox/>
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
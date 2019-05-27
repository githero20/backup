import React, {Component} from 'react';
import '../../admin/app-assets/css/vendors.css';
import '../../admin/app-assets/css/app.css';
import '../../admin/app-assets/css/core/menu/menu-types/vertical-menu-modern.css';
import '../../admin/app-assets/css/core/colors/palette-gradient.css';
import '../../admin/app-assets/fonts/simple-line-icons/style.css';
import '../../admin/assets/css/style.css';
import VerticalNav from "./VerticalNav/VerticalNav";
import HorizonalNav from "./HorizontalNav/HorizonalNav";
import MessageBox from "./DashboardContainer/MessageBox/MessageBox";
import CentralVaultCard from "./CentralVaultCard/CentralVaultCard";
import BackUpGoalCard from "./BackUpGoalCard/BackUpGoalCard";
import LockedSavingsCard from "./LockedSavingCard/LockedSavingsCard";
import BackUpStashCard from "./BackUpStashCard/BackUpStashCard";
import TotalTransactionIcon from "../../admin/app-assets/images/svg/transparent-total-saving-icon.svg";
import BlueCardTransIcon from "../../admin/app-assets/images/svg/bluetransicon.svg";
import historyTransIcon from "../../admin/app-assets/images/svg/history-arrow.svg";
import HistoryArrow from "../../admin/app-assets/images/svg/history-arrow-sm.svg";
import TransactionTable from "./TransactionTable/TransactionTable";

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                      data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizonalNav/>
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            {/* notification component */}
                            <MessageBox />


                            {/*Vault Card */}

                            <div className="content-body">
                                <div className="row">
                                    <CentralVaultCard/>
                                    <BackUpGoalCard/>
                                    <LockedSavingsCard/>
                                    <BackUpStashCard/>
                                </div>


                                <div className="row">
                                    <div className="col-md-4 col-lg-4 col-12 order-md-8">

                                        {/* total Savings */}

                                        <div className="card pull-up blue-card saving-card">
                                            <img className="floated-icon"
                                                 src={TotalTransactionIcon}/>
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <h4 className="text-white blue-card-heading ">Total Savings</h4>
                                                    <div className="media d-flex pb-md-5 pb-2">
                                                        <div className="align-self-center">
                                                            <img className="blue-card-icon"
                                                                 src={BlueCardTransIcon}/>
                                                        </div>
                                                        <div className="media-body text-left pt-1 ">
                                                            <h3 className="text-white clearfix"><strong
                                                                className="blue-card-price ml-2 mr-2">&#8358;
                                                                1,934,890</strong>
                                                            </h3>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card white-card pull-up mt-3">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <h4 className=" blue-card-heading mb-md-2">Total Savings</h4>
                                                    <div className="media d-flex">
                                                        <div className="align-self-center">
                                                            <img className="blue-card-icon"
                                                                 src={historyTransIcon}/>
                                                        </div>
                                                        <div className="media-body text-left pt-1 mb-md-2">
                                                            <h3><strong
                                                                className="blue-card-price ml-1 mr-2">&#8358;
                                                                1,934,890</strong>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div><a href="#"
                                                            className="btn btn-sm history-btn btn-outline-blue pull-right">Interest
                                                        History <img className="btn-icon"
                                                                     src={HistoryArrow}/></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*transaction table component */}

                                    <TransactionTable/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
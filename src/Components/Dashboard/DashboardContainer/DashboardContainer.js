import React, {Component} from 'react';
import TotalTransactionIcon from "../../../admin/app-assets/images/svg/transparent-total-saving-icon.svg";
import HistoryArrow from "../../../admin/app-assets/images/svg/history-arrow-sm.svg";
import BlueCardTransIcon from "../../../admin/app-assets/images/svg/bluetransicon.svg";
import historyTransIcon from "../../../admin/app-assets/images/svg/history-arrow.svg";
import TransactionTable from "../TransactionTable/TransactionTable";
import MessageBox from "./MessageBox/MessageBox";
import CentralVaultCard from "../CentralVaultCard/CentralVaultCard";
import BackUpGoalCard from "../BackUpGoalCard/BackUpGoalCard";
import BackUpStashCard from "../BackUpStashCard/BackUpStashCard";
import LockedSavingsCard from "../LockedSavingCard/LockedSavingsCard";
import TotalSavingsBlueCard from "../TotalSavingsBlueCard/TotalSavingsBlueCard";
import TotalSavingsCard from "../TotalSavingsCard/TotalSavingsCard";

class DashboardContainer extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="app-content content">
                    <div className="content-wrapper">
                        {/* notification component */}
                        <MessageBox />


                        {/*Vault Card */}

                        <div className="content-body">
                            <div className="row">
                                <CentralVaultCard onHide={this.props.onHide} showModal={this.props.showModal}/>
                                <BackUpGoalCard onHide={this.props.onHide} showModal={this.props.showModal}/>
                                <LockedSavingsCard onHide={this.props.onHide} showModal={this.props.showModal}/>
                                <BackUpStashCard/>
                            </div>

                            <div className="row">
                                <TransactionTable/>
                                <div className="col-md-4 col-lg-4 col-12 order-md-8">
                                    {/* total Savings */}
                                    <TotalSavingsBlueCard/>
                                    <TotalSavingsCard/>

                                </div>
                            </div>
                                {/*transaction table component */}

                            </div>
                        </div>
                    </div>

            </React.Fragment>
        );
    }
}

export default DashboardContainer;
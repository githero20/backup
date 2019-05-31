import React, {Component} from 'react';
import TransactionTable from "../TransactionTable/TransactionTable";
import MessageBox from "./MessageBox/MessageBox";
import CentralVaultCard from "../CentralVaultCard/CentralVaultCard";
import BackUpGoalCard from "../BackUpGoalCard/BackUpGoalCard";
import BackUpStashCard from "../BackUpStashCard/BackUpStashCard";
import LockedSavingsCard from "../LockedSavingCard/LockedSavingsCard";
import TotalSavingsBlueCard from "../TotalSavingsBlueCard/TotalSavingsBlueCard";
import TotalSavingsCard from "../TotalSavingsCard/TotalSavingsCard";
import Alert from "react-bootstrap/Alert";

class DashboardContainer extends Component {


    render() {

         let {error,activateAccount,info} = this.props;

        // console.log(info.accounts.data);
        //get the array




        return (
            <React.Fragment>
                <div className="app-content content">
                    <div className="content-wrapper">
                        {/* notification component */}

                        <MessageBox error={error}  errorMessage={this.props.errorMessage} activateAccount={activateAccount} />


                        {/*Vault Card */}

                        <div className="content-body">
                            <div className="row">

                                {/*{ info.accounts.map((value, index) => {*/}

                               {/*<CentralVaultCard onHide={this.props.hideSSModal} showModal={this.props.showSSModal}/>*/}
                                <CentralVaultCard onHide={this.props.hideSSModal} showModal={this.props.showSSModal}/>
                                <BackUpGoalCard onHide={this.props.hideAGModal} showModal={this.props.showAGModal}/>
                                <LockedSavingsCard onHide={this.props.hideLSModal} showModal={this.props.showLSModal}/>
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
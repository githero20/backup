import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import whiteSaveMoreIcon from "../../admin/app-assets/images/svg/mb-save-more-white-icon.svg";
import instantSaveIcon from "../../admin/app-assets/images/svg/mb-instant-save-icon.svg";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";
import InstantSavingModal from "../../Components/Dashboard/InstantSavingModal/InstantSavingModal";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import {getLocalStorage, request} from "../../ApiUtils/ApiUtils";
import {USERACTIVATED, USERINFO} from "../../Components/Auth/HOC/authcontroller";
import {formatNumber, STANDARD_ACCOUNT} from "../../Helpers/Helper";
import InstantSaveCard from "../../Components/Dashboard/InstantSaveCard/InstantSaveCard";
import {getUserInfoEndpoint} from "../../RouteLinks/RouteLinks";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";

class InstantSave extends Component {

    state = {
        showSteadySavingModal: false,
        showActiveGoalModal: false,
        showlockedSavingsModal: false,
        error: false,
        errorMessage: '',
        accountInfo: null,
        transactions: [],
        userName: '',
        totalBalance: '0.00',
        totalInstantSave: '0.00',
        email: null,
        showSavingModal: false,
        showLoader: true,
    };


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


    handleAddNew = () => {


    }




    analyseInstantSaveInfo = (data) => {


        if (data.accounts) {

            // loop through data and set appropriate states
            let accounts = data.accounts.data;

            console.log(data);
            let transactions = data.transactions.data;

            let totalInstantSave = this.getTotalInstantSave(transactions);

            this.setState({
                transactions,
                totalInstantSave: formatNumber(totalInstantSave)
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


    getTotalInstantSave(transactions) {
        console.log(transactions);
        if (transactions) {
            const sum = transactions.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
            return sum.amount;
        }
    }


    setupInstantSave = () => {

        console.log('setting up instant Save');
        //get data from localStorage
        if (getLocalStorage(USERINFO)) {
            this.setState({
                showLoader: false,
            });
            console.log('there is user info');

            if (getLocalStorage(USERACTIVATED)) {

                let status = JSON.parse(getLocalStorage(USERACTIVATED));
                if (status === true) {
                    console.log('got here to retrieve it ');
                    let data = JSON.parse(getLocalStorage(USERINFO));
                    if (data.accounts !== null || data.accounts !== undefined) {
                        console.log(data);
                        this.setState({
                            accountInfo: data.accounts,
                            userName: data.name,

                        });
                        this.analyseInstantSaveInfo(data);
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

        this.setupInstantSave();


    }



    loadInstantSaveTable = (status,payload)=>{
        //hide loader
        this.setState({
            showLoader:false
        })

        //handle response
        if(status){
            if(payload){
                console.log(JSON.parse(JSON.stringify(payload)));
                this.setState({
                    transactions:payload.data.data.transactions.data
                })
                console.log('success',payload);
            }

        }

    };

    componentWillMount() {

        this.updateInstantSave();

    }

    updateInstantSave = () => {

        //call get user info

        this.setState({
            showLoader:true
        });

        request(getUserInfoEndpoint,null,true,'GET',this.loadInstantSaveTable)


    };


    render() {

        return (
            <div
                className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done instant-save"
                data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                <HorizontalNav userName={this.state.userName}/>
                <VerticalNav/>
                <div className="app-content content ">
                    <div className="content-wrapper">

                        {/* message baox*/}
                        {/*<MessageBox/>*/}
                        <div className="row mb-4">
                            <div className="col-12"></div>
                        </div>

                        {
                            this.state.showSavingModal ?
                                (
                                    <React.Fragment>
                                        <InstantSavingModal show={this.state.showSavingModal} updateInstantSave={this.updateInstantSave} onHide={this.hideModal}/>
                                    </React.Fragment>

                                ) : null


                        }

                        {this.state.showLoader ? <DashboardLoader/> : null}
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
                                <strong
                                    className="dark-brown font-size-1-16"><span>₦</span> {this.state.totalInstantSave}</strong>
                                <p className="gray-text circular-std mb-p-size">Total Instant Save</p>
                            </div>
                        </span>
                                    </div>
                                </div>


                            </div>

                            <div className="row">

                                {/*transaction table */}
                                <TransactionTable transactions={this.state.transactions}/>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstantSave;
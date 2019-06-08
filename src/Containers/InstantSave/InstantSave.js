import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import whiteSaveMoreIcon from "../../admin/app-assets/images/svg/mb-save-more-white-icon.svg";
import instantSaveIcon from "../../admin/app-assets/images/svg/mb-instant-save-icon.svg";
import InstantSavingModal from "../../Components/Dashboard/InstantSavingModal/InstantSavingModal";
import TransactionTable from "../../Components/Dashboard/TransactionTable/TransactionTable";
import {request} from "../../ApiUtils/ApiUtils";
import {formatNumber, STANDARD_ACCOUNT} from "../../Helpers/Helper";
import InstantSaveCard from "../../Components/Dashboard/InstantSaveCard/InstantSaveCard";
import {getUserInfoEndpoint, instantSaveTransEndpoint} from "../../RouteLinks/RouteLinks";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";

class InstantSave extends Component {

    state = {
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
        newInstantSave: false
    };

    constructor(props){
        super(props);

        this.hideModal = this.hideModal.bind(this);
    }




    hideModal(status=false){
        this.setState({
            showSavingModal:false,
        });

        if(status){
            //get user instant saves
            this.setupInstantSave();

            //get instant save transactions
            this.loadInstantSaves();
        }
    };

    showModal = () => {
        this.setState({
            showSavingModal: true
        });
    };


    analyseInstantSaveInfo = (status, data) => {

        if (status) {


            //set name
            if(data){
                this.setState({
                    userName:data.data.data.name
                });
            }


            //set proper account
            if (data.data.data.accounts) {

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



                //TODO loop through transactions and add up only credits
                let transactions = data.data.data.transactions.data;
                let totalInstantSave = this.getTotalInstantSave(transactions);
                this.setState({
                    transactions,
                    totalInstantSave: formatNumber(totalInstantSave)
                });


            } else {
                return null;
            }


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

        //TODO Add Table Loader
        //call get user info
        request(getUserInfoEndpoint, null, true, 'GET', this.analyseInstantSaveInfo)

        // //get data from localStorage
        // if (getLocalStorage(USERINFO)) {
        //     this.setState({
        //         showLoader: false,
        //     });
        //     console.log('there is user info');
        //
        //     if (getLocalStorage(USERACTIVATED)) {
        //
        //         let status = JSON.parse(getLocalStorage(USERACTIVATED));
        //         if (status === true) {
        //             console.log('got here to retrieve it ');
        //             let data = JSON.parse(getLocalStorage(USERINFO));
        //             if (data.accounts !== null || data.accounts !== undefined) {
        //                 console.log(data);
        //                 this.setState({
        //                     accountInfo: data.accounts,
        //                     userName: data.name,
        //
        //                 });
        //                 this.analyseInstantSaveInfo(data);
        //             }
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
        //         }
        //     }
        //
        //
        // }

    };

    loadInstantSaves() {

        //get transactions from api
        console.log(this.state.transactions);
        request(instantSaveTransEndpoint, null, true, 'GET', this.handleTransactions);


    }


    handleTransactions = (state, res) => {

        //handle all instant save by the user
        if (state) {
            if (res) {
                let transactions = res.data.data.transactions.data;
                let totalInstantSave = this.getTotalInstantSave(transactions);
                this.setState({
                    transactions,
                    totalInstantSave: formatNumber(totalInstantSave)
                });
                console.log(res);
            }

        } else {
            if (res) {
                console.log(res);
            }
        }

    };


    componentDidMount() {


        //get user instant saves
        this.setupInstantSave();


        //get instant save transactions
        this.loadInstantSaves();

    }


    loadInstantSaveTable = (status, payload) => {
        //hide loader
        this.setState({
            showLoader: false
        });

        //handle response
        if (status) {
            if (payload) {
                console.log(JSON.parse(JSON.stringify(payload)));
                this.setState({
                    transactions: payload.data.data.transactions.data
                });
                console.log('success', payload);
            }

        }

    };

    componentWillMount() {

        //get user instant saves
        this.setupInstantSave();
        //update tables
        this.updateInstantSave();

    }

    updateInstantSave = () => {
        //TODO Add Table Loader
        //call get user info
        request(getUserInfoEndpoint, null, true, 'GET', this.loadInstantSaveTable)
    };

    createInstantSave = () => {
        this.setState({
            newInstantSave: true
        })
    };


    render() {

        const columns = [
            {
                Header: 'Date',
                accessor: 'created_at' // String-based value accessors!
            }, {
                Header: 'Description',
                accessor: 'type',
                Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }, {
                Header: 'Amount',
                accessor: 'amount',
                // id: 'friendName', // Required because our accessor is not a string
                // Header: 'Friend Name',
                // accessor: d => d.friend.name // Custom value accessors!
                Cell: props =>  <label>&#8358;{parseFloat(props.value).toFixed(2)}</label>
            }, {
                Header: 'Reference',
                accessor: 'reference',
                // // Header: props => <span>Friend Age</span>, // Custom header components!
                // accessor: 'friend.age'
            }, {
                Header: 'Status',
                accessor: 'status',
                // // Header: props => <span>Friend Age</span>, // Custom header components!
                // accessor: 'friend.age'
                Cell: props =>  <label className="bg-light-green px-2 sm-pd">{props.value}</label>
            },
            {
                Header: 'Reference',
                accessor: 'reference',
                // // Header: props => <span>Friend Age</span>, // Custom header components!
                // accessor: 'friend.age'
            }];

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
                                        <InstantSavingModal
                                            show={this.state.showSavingModal}
                                            onHide={this.hideModal}
                                        />
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
                                <TransactionTable transactions={this.state.transactions} columns={columns}/>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstantSave;
import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";
import BigTransactionTable from "../../Components/Dashboard/BigTransactionTable/BigTransactionTable";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import {getTransactionsApi} from "../../RouteLinks/RouteLinks";
import {request} from "../../ApiUtils/ApiUtils";

class Transactions extends Component {

    state={
        transactions:[],
    };

    //when the component mounts

    // load all the user transactions

    loadTransactions(){

        //get transactions from api

        request(getTransactionsApi,null,true,'GET',this.handleTransactions);




    }


    // display all transactions when its loaded

    handleTransactions = (state,res) => {

        if(state){
            if(res){
                this.setState({
                    transactions:res.data.data.data
                });
                console.log(res);
            }

        }else{
            if(res){

                console.log(res);
            }
        }

    };




    componentDidMount() {

        this.loadTransactions();
    }


    render() {
        return (
            <React.Fragment>
                {this.state.showLoader? <DashboardLoader /> :null}

                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav/>
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">

                                    <MessageBox/>

                                </div>
                            </div>

                            <div className="content-header row">
                            </div>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Transactions
                                        </h3>
                                    </div>

                                </div>

                                <div className="row">

                                    <BigTransactionTable transactions={this.state.transactions} />

                                </div>



                                <div className="row">
                                    <div className="col-12">
                                        <div className="card box-shadow-0">
                                            <div className="card-content">
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
export default Transactions;
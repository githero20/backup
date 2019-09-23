import React, {Component, Fragment} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import {BASE_URL, filterTransactionsApi, referralsEndpoint} from "../../RouteLinks/RouteLinks";
import {
    balanceFormatter,
    dateFormatter,
    pointFormatter,
    pointStatusFormatter,
    toggleTable,
    userFormatter
} from "../../Helpers/Helper";
import {withToastManager} from 'react-toast-notifications';
import {getFilteredTrans} from "../../actions/TransactionActions";
import moment from "moment";
import Footer from "../../Components/Dashboard/Footer/Footer";
import {getReferrals} from "../../actions/ReferralActions";
import ReferralTable from "../../Components/Dashboard/TransactionTable/ReferralTable";


class Referrals extends Component {

    state = {
        transactions: [],
        showLoader: true,
        userName: null,
        mobileTable: false,
    };

    //when the component mounts

    // load all the user transactions

    loadReferrals() {
        //get transactions from api
        this.setState({showLoader: true});
        getReferrals(referralsEndpoint, this.handleReferrals);
    }


    // display all transactions when its loaded

    handleReferrals = (state, res) => {
        this.setState({
            showLoader: false
        });
        console.log('res before', res);

        if (state && res) {
            this.setState({
                transactions: res,
            });
        } else if (!state && res) {
            console.log('err', res);
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.reload) {
            this.loadReferrals();
        }
    }

    componentDidMount() {
        this.loadReferrals();
        toggleTable(this);
    }

    handleFilter = (date, comparator, page) => {
        // on filter click get the page
        // get the page
        // handleFiltering(date, comparator, this);
        date = moment(date).format('YYYY-MM-DD');
        console.log('filter params', date, comparator, page);
        const filter = {date: date, operand: comparator};
        this.setState({loadFilter: true, filter: filter});
        getFilteredTrans(`${BASE_URL}${filterTransactionsApi}`, filter,
            this.handlePaginatedData)

    };


    render() {

        const columns = [

            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
                // filter: dateFilter({
                //     defaultValue: {date: todaysDateForTable(), comparator: Comparator.LEQUAL},
                //     getFilter: (filter) => {
                //         this.createdDateFilter = filter;
                //     }
                // })
            },
            {
                text: 'User',
                dataField: 'user',
                formatter: userFormatter,
            },
            {
                text: 'Point',
                dataField: 'points',
                formatter: pointFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
            }, {
                text: 'Status',
                dataField: 'is_transact',
                formatter: pointStatusFormatter,
            }];


        const mobileColumns = [
            {
                text: 'Date',
                dataField: 'created_at',
                formatter: dateFormatter,
                sort: true,
                classes: 'd-none d-md-table-cell',
                headerClasses: 'd-none d-md-table-cell',
                // filter: dateFilter({
                //     defaultValue: {date: todaysDateForTable(), comparator: Comparator.LEQUAL},
                //     getFilter: (filter) => {
                //         this.createdDateFilter = filter;
                //     }
                // })
            },
            {
                text: 'User',
                dataField: 'user',
                formatter: userFormatter,
            },
            {
                text: 'Point',
                dataField: 'points',
                // formatter: amountBalanceFormatter,
                sort: true,
                classes: ' d-table-cell d-md-none',
                headerClasses: 'd-table-cell d-md-none',
            },
            {
                text: 'status',
                dataField: 'is_transact',
                formatter: pointStatusFormatter,
            }];

        return (
            <React.Fragment>
                {this.state.showLoader ? <DashboardLoader/> : null}
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={this.state.userName}/>
                    <VerticalNav userName={this.state.userName}/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="mb-5"/>
                            <div className="content-header row">
                            </div>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Referrals
                                        </h3>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        this.state.mobileTable ? (
                                                <Fragment>
                                                    <ReferralTable data={this.state.transactions} columns={mobileColumns}/>
                                                </Fragment>) :
                                            (<Fragment>
                                                <ReferralTable data={this.state.transactions} columns={columns}/>
                                            </Fragment>)
                                    }
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withToastManager(Referrals);
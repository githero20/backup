import React, {Component} from 'react';
import moment from "moment";
import {parseAndFormatNum, removeUnderscore, toastMessage} from "../../../Helpers/Helper";
import {request} from "../../../ApiUtils/ApiUtils";
import {getEachTransApi} from "../../../RouteLinks/RouteLinks";
import {withToastManager} from "react-toast-notifications";
import DashboardLoader from "../DashboardLoader/DashboardLoader";

class TransactionReceipt extends Component {

    state = {
        selectedTrans: {
            amount: '0.00',
            type: 'N/A',
            status: null,
            reference: 'N/A',
            balance: '0.00',
            sourcetypes: null,
            created_at: null,
        },
        showLoader: false
    };

    handleEachTrans = (state, res) => {
        this.setState({
            showLoader: false
        });
        console.log('Each transactions', state, res);
        if (state && res) {
            this.setState({
                selectedTrans: res.data.data
            });
        } else if (!state && res) {
            toastMessage(res.data.message, 'error', this);
        }

    };

    componentWillMount() {
        //set appropriate state to change view
        // make request to get transaction
        // get transaction detail
        this.setState({
            showLoader: true
        });
        request(`${getEachTransApi}${this.props.selectedTransID}`, null, true, 'GET', this.handleEachTrans);

    }

    // componentWillReceiveProps(newProps) {
    //     const {selectedTrans} = newProps;
    //     console.log('next props', selectedTrans);
    //     this.setState({
    //         selectedTrans
    //     });
    //
    // }

    // componentDidMount() {
    //     this.setState({
    //         selectedTrans:this.props.selectedTrans
    //     });
    //
    // }

    render() {
        const {amount, type, status, reference, balance, sourcetypes, created_at} = this.state.selectedTrans;
        return (
            <React.Fragment>
                {this.state.showLoader ? <DashboardLoader/> : null}
                <div className="content-header row">
                    <div className="col-12">
                        <div className="text-right">
                            <a href='#!' onClick={this.props.hideDetails}
                               className='gray-text back-btn'>
                                <i className='fa fa-chevron-left'></i>&nbsp; Back
                            </a>
                        </div>
                    </div>
                </div>
                <div className="content-body">
                    <div className="row">
                        <div className="col-lg-4 col-12">
                            <h3 className="receipt-header mb-2 ">Transaction Receipt
                            </h3>
                        </div>
                    </div>

                    <div className="row">
                        <div id="transaction-receipt" className=" col-lg-12 order-md-1">
                            <div className="card table-card">
                                {/*<div className="card-header">*/}
                                {/*    <div className="d-flex justify-content-start">*/}
                                {/*        <h4 className="card-title table-title">Recent Transactions </h4>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="card-content">
                                    <div
                                        className="receipt-top pl-2 flex-column flex-md-row pt-3 px-md-5 pt-md-5 pb-md-3 d-flex justify-content-between">
                                        <h5 className='text-capitalize'>{
                                            sourcetypes != null ? (
                                                sourcetypes.data.name != "withdrawal" ?
                                                    removeUnderscore(sourcetypes.data.name) + " " + "Savings"
                                                    : sourcetypes.data.name
                                            ) : "N/A"

                                        }
                                        </h5>
                                        <div>
                                            <h4>{reference}</h4>
                                            <p className='text-md-right'>REF NO.</p>
                                        </div>
                                    </div>
                                    <div className='zig-zag'></div>
                                    <div className="mx-md-5 px-2 px-md-5 receipt-body mb-5 ">
                                        {/*<h3 className='text-center my-3 mb-md-5 pb-md-2'>{'Joyce Haruna' || 'N/A'} </h3>*/}
                                        <div
                                            className="d-flex flex-column flex-md-row mt-5 mb-md-3 mb-md-5 pt-md-3 pb-md-2 justify-content-between receipt-content">
                                            <div className='receipt-items mb-1 mb-md-3'>
                                                <h5 className='mb-2'>Status</h5>
                                                <h2 className={status == 'success' ? 'text-capitalize text-success' : 'text-capitalize text-danger'}>
                                                    {status != null ? status : "N/A"}
                                                </h2>
                                            </div>
                                            <div className=' receipt-items mb-1 mb-md-3'>
                                                <h5 className='mb-2'>Phase</h5>
                                                <h2 className='text-capitalize'>{type}</h2>
                                            </div>
                                            <div className=' receipt-items mb-1 mb-md-3'>
                                                <h5 className='mb-2'>Date</h5>
                                                <h2>{created_at != null ? moment(created_at).format('Do MMMM, YY') : 'N/A'}</h2>
                                            </div>
                                            <div className='receipt-items mb-1 mb-md-3'>
                                                <h5 className='mb-2'>Time</h5>
                                                <h2>{created_at != null ? moment(created_at).format('h:hh a') : 'N/A'}</h2>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div
                                            className="d-flex flex-md-row flex-column receipt-bottom justify-content-between pb-md-3 mt-3 mb-md-5">
                                            <div className='mb-2 mb-md-0'>
                                                <h5 className='mb-2'>Amount:</h5>
                                                <h2 className='amount'>&#8358;&nbsp;{parseAndFormatNum(amount)}</h2>
                                            </div>
                                            <div className='mb-2 mb-md-0'>
                                                <h5 className='mb-2'>Balance :</h5>
                                                <h2>{balance!=null?`₦ ${parseAndFormatNum(balance)}`:"N/A"}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            </React.Fragment>
        );


    };

}

export default withToastManager(TransactionReceipt);
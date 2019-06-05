import React, {Component} from 'react';
import mobileTableStatIcon from "../../../admin/app-assets/images/svg/green-dot.svg";
import moment from "moment";
import listIcon from "../../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../../admin/app-assets/images/svg/grid-icon.svg";
import tableLeftArrow from "../../../admin/app-assets/images/svg/table-arrow-left.svg";
import sortIcon from "../../../admin/app-assets/images/svg/sort-icon.svg";
import { CSVLink, CSVDownload } from "react-csv";
import Pagination from "../Pagination/Pagination";

class TransactionTable extends Component {

    state={
        transactions: [],
        currentTransactions: [],
        currentPage: null,
        totalPages: null

    }



    onPageChanged = data => {
        const { transactions } = this.props;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentTransactions = transactions.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentTransactions, totalPages });
    };



    render() {

        const {transactions} = this.props;



        return (
            <React.Fragment>
                <div id="recent-transaction" className="col-sm-12 col-md-8 col-lg-8 order-md-1">
                    <div className="card">
                        <div className="card-header d-flex  justify-content-between">
                            <h4 className="card-title table-title">Recent Transaction </h4>
                            <div className="table-button-container d-none d-md-inline-block">
                                                 <span
                                                     className="mr-md-1 table-grid-view-icon img-2x list-btn active d-block d-md-inline">
                                                     <img src={listIcon} className=" img-2x "/>
                                                 </span>
                                <span className="mr-md-1 table-grid-view-icon img-2x  grid-btn d-block d-md-inline">
                                                        <img src={gridIcon} className=" img-2x "/>
                                                    </span>
                                <span className="table-view-display d-block d-md-inline">
                                                        <img src={tableLeftArrow} className="mr-1 img-1x"/> grid view
                                                    </span>
                            </div>
                            <div className="table-sort-display d-block d-md-inline"><span
                                data-toggle="modal" data-target="#sort"><img className=" img-2x " src={sortIcon}/></span>sort
                            </div>
                            <CSVLink variant="success" data={transactions} target="_blank" className={'btn-green'}>Export CSV</CSVLink>
                        </div>
                        <div className="card-content mt-1 light-table-bg">
                            <div className="table-responsive">
                                <table id="recent-orders"
                                       className="table table-hover table-xl mb-0 spaced-table">
                                    <thead>
                                    <tr>
                                        <th className="border-top-0 d-none d-md-block">Date</th>
                                        <th className="border-top-0">Description</th>
                                        <th className="border-top-0">Amount</th>
                                        <th className="border-top-0 d-none d-md-block">Reference</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/*show all transactions*/}
                                    {
                                        transactions !== undefined || transactions.length !== 0 ?
                                            (

                                                transactions.map((data,idx)=>{
                                                        let date = moment(data.created_at).format('DD|MM|YYYY');
                                                        let time = moment(data.created_at).format('hh:mm a');
                                                   return (
                                                       <tr key={data.id}>
                                                           <td className="text-truncate d-none d-md-block">
                                                               <span className="text-muted mr-1">{date} </span>
                                                               <span className="table-time">{time}</span>
                                                           </td>
                                                           <td>
                                                               <img alt={''} src={mobileTableStatIcon}
                                                                    className="green-dot d-md-none"/>
                                                               <div className="d-inline-block">
                                                                   <div className="d-md-block text-capitalize">{data.type}</div>
                                                                   <div className="table-time d-block d-md-none ">{time}
                                                                   </div>
                                                               </div>
                                                           </td>

                                                           <td>
                                                               <label className="bg-light-green px-2 sm-pd">&#8358; {data.amount}</label>
                                                           </td>

                                                           <td className="text-truncate d-none d-md-block text-uppercase" style={{maxWidth: '120px'}}>{data.reference}</td>
                                                       </tr>

                                                   )
                                                }
                                            )

                                            )
                                                :
                                            null
                                    }

                                    <Pagination
                                        totalRecords={transactions}
                                        pageLimit={18}
                                        pageNeighbours={1}
                                        onPageChanged={this.onPageChanged}
                                    />

                                    {/* use for  Debit Transactions */}
                                    {/*<tr>*/}
                                    {/*    <td className="text-truncate d-none d-md-block"><span*/}
                                    {/*        className="text-muted mr-1">3|5|2019 </span>*/}
                                    {/*        <span className="table-time">8:00am</span></td>*/}
                                    {/*    <td>*/}
                                    {/*        <img  alt={''} src={mobileTableStatIcon}*/}
                                    {/*             className="green-dot d-md-none"/>*/}
                                    {/*        <div className="d-inline-block">*/}
                                    {/*            <div className="d-md-block">Credit</div>*/}
                                    {/*            <div className="table-time d-block d-md-none ">8:00am*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}

                                    {/*    </td>*/}
                                    {/*    <td>*/}
                                    {/*        <label className="bg-light-red px-2 sm-pd">75000</label>*/}
                                    {/*    </td>*/}
                                    {/*    <td className="text-truncate ">*/}
                                    {/*        50,000*/}
                                    {/*    </td>*/}
                                    {/*    <td className="text-truncate d-none d-md-block">ABCD999</td>*/}
                                    {/*</tr>*/}

                                    </tbody>
                                </table>
                            </div>

                            {/*pagination */}

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TransactionTable;
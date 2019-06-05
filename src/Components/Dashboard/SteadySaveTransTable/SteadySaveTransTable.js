import React, {Component} from 'react';
import mobileTableStatIcon from "../../../admin/app-assets/images/svg/green-dot.svg";
import Button from "react-bootstrap/Button";
import moment from "moment";
import listIcon from "../../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../../admin/app-assets/images/svg/grid-icon.svg";
import tableLeftArrow from "../../../admin/app-assets/images/svg/table-arrow-left.svg";
import sortIcon from "../../../admin/app-assets/images/svg/sort-icon.svg";
import { CSVLink, CSVDownload } from "react-csv";


class SteadySaveTransTable extends Component {





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
                                        <th className="border-top-0 d-none d-md-block"> Date</th>
                                        <th className="border-top-0">frequency</th>
                                        <th className="border-top-0">Amount</th>
                                        <th className="border-top-0 d-none d-md-block">Start Date</th>
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
                                                           <td className="text-truncate d-none d-md-block"><span
                                                               className="text-muted mr-1">{date} </span>
                                                               <span className="table-time">{time}</span></td>
                                                           <td>
                                                               <img alt={''} src={mobileTableStatIcon}
                                                                    className="green-dot d-md-none"/>
                                                               <div className="d-inline-block">
                                                                   <div className="d-md-block text-capitalize">{data.frequency}</div>
                                                                   <div className="table-time d-block d-md-none ">{time}
                                                                   </div>
                                                               </div>
                                                           </td>

                                                           <td>
                                                               <label className="bg-light-green px-2 sm-pd">&#8358; {data.start_amount}</label>
                                                           </td>

                                                           <td className="text-truncate d-none d-md-block text-uppercase"> {moment(data.created_at).format('DD|MM|YYYY')}</td>
                                                       </tr>

                                                   )
                                                }
                                            )

                                            )
                                                :
                                            null
                                    }

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
                            <nav aria-label="Page navigation">
                                <ul className=" custom-pagination pagination justify-content-center pagination-separate pagination-round pagination-flat pagination-lg mb-1">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true"><span
                                                className="d-none d-md-inline">«</span> Prev</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">2</a>
                                    </li>
                                    <li className="page-item active"><a className="page-link"
                                                                        href="#">3</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">4</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">5</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">Next <span
                                                className="d-none d-md-inline">»</span></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SteadySaveTransTable;
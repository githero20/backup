import React, {Component} from 'react';
import mobileTableStatIcon from "../../../admin/app-assets/images/svg/green-dot.svg";

class TransactionTable extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="recent-transaction" className="col-sm-12 col-md-8 col-lg-8 order-md-1">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title table-title">Recent Transaction</h4>
                        </div>
                        <div className="card-content mt-1 light-table-bg">
                            <div className="table-responsive">
                                <table id="recent-orders"
                                       className="table table-hover table-xl mb-0 spaced-table">
                                    <thead>
                                    <tr>
                                        <th className="border-top-0 d-none d-md-block">Date</th>
                                        <th className="border-top-0">Description</th>
                                        <th className="border-top-0">Balance</th>
                                        <th className="border-top-0">Amount</th>
                                        <th className="border-top-0 d-none d-md-block">Reference</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="text-truncate d-none d-md-block"><span
                                            className="text-muted mr-1">3|5|2019 </span>
                                            <span className="table-time">8:00am</span></td>
                                        <td>
                                            <img alt={''} src={mobileTableStatIcon}
                                                 className="green-dot d-md-none"/>
                                            <div className="d-inline-block">
                                                <div className="d-md-block">Credit</div>
                                                <div className="table-time d-block d-md-none ">8:00am
                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <label className="bg-light-green px-2 sm-pd">75000</label>
                                        </td>
                                        <td className="text-truncate ">
                                            50,000
                                        </td>
                                        <td className="text-truncate d-none d-md-block">ABCD999</td>
                                    </tr>
                                    <tr>
                                        <td className="text-truncate d-none d-md-block"><span
                                            className="text-muted mr-1">3|5|2019 </span>
                                            <span className="table-time">8:00am</span></td>
                                        <td>
                                            <img  alt={''} src={mobileTableStatIcon}
                                                 className="green-dot d-md-none"/>
                                            <div className="d-inline-block">
                                                <div className="d-md-block">Credit</div>
                                                <div className="table-time d-block d-md-none ">8:00am
                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <label className="bg-light-red px-2 sm-pd">75000</label>
                                        </td>
                                        <td className="text-truncate ">
                                            50,000
                                        </td>
                                        <td className="text-truncate d-none d-md-block">ABCD999</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>

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

export default TransactionTable;
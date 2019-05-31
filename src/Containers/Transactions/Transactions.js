import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";

class Transactions extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav/>
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">
                                    <div
                                        className="bg-white shadow-sm dashboard-callout callout-border-right clearfix callout-round callout-transparent mt-1 px-2 py-2 py-1">
                                        <strong>Congrats! </strong>
                                        <span className="mr-3">you referred 5 persons from [ 1 -2-2019 to 5-2-2019 ] ,
                        <span className="admin-purple d-block d-md-inline">Your referral points earned</span> </span>
                                        <span className=" d-block d-md-inline">25 points</span>
                                        <label className="pull-right"><span className="mr-2"> copy referral code</span>
                                            <span className="code-btn">AEC45SF</span></label>
                                    </div>
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
                                    <div id="recent-sales" className="col-12 ">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-title table-title">Recent Transactions</h4>
                                            </div>
                                            <div className="card-content mt-1">
                                                <div className="table-responsive">
                                                    <table id="recent-orders"
                                                           className="table table-hover table-xl mb-0 spaced-table">
                                                        <thead>
                                                        <tr>
                                                            <th className="border-top-0">Date</th>
                                                            <th className="border-top-0">Amount</th>
                                                            <th className="border-top-0">Description</th>
                                                            <th className="border-top-0">Balance</th>
                                                            <th className="border-top-0">Reference</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td className="text-truncate"><span
                                                                className="text-muted mr-1">3|5|2019 </span><span
                                                                className="table-time">8:00am</span></td>
                                                            <td className="text-truncate ">
                                                                50,000
                                                            </td>
                                                            <td>
                                                                Credit
                                                            </td>
                                                            <td>
                                                                <label
                                                                    className="bg-light-green px-2 sm-pd">75000</label>
                                                            </td>
                                                            <td className="text-truncate">ABCD999</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-truncate"><span
                                                                className="text-muted mr-1">3|5|2019 </span><span
                                                                className="table-time">8:00am</span></td>
                                                            <td className="text-truncate ">
                                                                50,000
                                                            </td>
                                                            <td>
                                                                Credit
                                                            </td>
                                                            <td>
                                                                <label
                                                                    className="bg-light-green px-2 sm-pd">75000</label>
                                                            </td>
                                                            <td className="text-truncate">ABCD999</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-truncate"><span
                                                                className="text-muted mr-1">3|5|2019 </span><span
                                                                className="table-time">8:00am</span></td>
                                                            <td className="text-truncate ">
                                                                50,000
                                                            </td>
                                                            <td>
                                                                Credit
                                                            </td>
                                                            <td>
                                                                <label className="bg-light-red px-2 sm-pd">75000</label>
                                                            </td>
                                                            <td className="text-truncate">ABCD999</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-truncate"><span
                                                                className="text-muted mr-1">3|5|2019 </span><span
                                                                className="table-time">8:00am</span></td>
                                                            <td className="text-truncate ">
                                                                50,000
                                                            </td>
                                                            <td>
                                                                Credit
                                                            </td>
                                                            <td>
                                                                <label className="bg-light-red px-2 sm-pd">75000</label>
                                                            </td>
                                                            <td className="text-truncate">ABCD999</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-truncate"><span
                                                                className="text-muted mr-1">3|5|2019 </span><span
                                                                className="table-time">8:00am</span></td>
                                                            <td className="text-truncate ">
                                                                50,000
                                                            </td>
                                                            <td>
                                                                Credit
                                                            </td>
                                                            <td>
                                                                <label className="bg-light-red px-2 sm-pd">75000</label>
                                                            </td>
                                                            <td className="text-truncate">ABCD999</td>
                                                        </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                                <nav aria-label="Page navigation">
                                                    <ul className=" custom-pagination pagination justify-content-center pagination-separate pagination-round pagination-flat pagination-lg mb-1">
                                                        <li className="page-item">
                                                            <a className="page-link"  aria-label="Previous">
                                                                <span aria-hidden="true">« Prev</span>
                                                                <span className="sr-only">Previous</span>
                                                            </a>
                                                        </li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     >1</a></li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     >2</a></li>
                                                        <li className="page-item active"><a className="page-link"
                                                                                            >3</a></li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     >4</a></li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     >5</a></li>
                                                        <li className="page-item">
                                                            <a className="page-link"  aria-label="Next">
                                                                <span aria-hidden="true">Next »</span>
                                                                <span className="sr-only">Next</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
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
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Transactions;
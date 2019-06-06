import React, {Component} from 'react';
import greenDot from "../../admin/app-assets/images/svg/green-dot.svg";
import {formatNumber} from "../../Helpers/Helper";
import {_transformDate} from "../../utils";

class WithdrawalList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="box-grid-container  light-blue-bg px-md-3 py-1 ">
                <div className="table-responsive">
                    <table className="table table-hover table-xl mb-0 spaced-table">
                        <thead>
                        <tr>
                            <th className="border-top-0 d-none d-md-block">Reference</th>
                            <th className="border-top-0 ">Status</th>
                            <th className="border-top-0 ">Balance</th>
                            <th className="border-top-0 d-none d-md-block">Amount</th>
                            <th className="border-top-0 ">Account</th>
                            <th className="border-top-0 d-none d-md-block">Date</th>
                        </tr>

                        </thead>
                        <tbody>
                        {
                            this.props.withdrawals.map((withdrawal, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-truncate d-none d-md-block">{withdrawal.id}</td>

                                        <td>
                                            <div className="d-flex">
                                                <div className="d-inline-block d-md-none">
                                                    <img
                                                        src={greenDot}
                                                        className="green-dot "/>
                                                </div>
                                                <div className="d-inline-block">
                                                    <div className="d-md-block">{withdrawal.is_confirmed ? "Completed" : "Failed"}</div>
                                                    <div
                                                        className="table-time d-block d-md-none ">5th
                                                        Sep 19
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-truncate ">
                                            {formatNumber(withdrawal.amount)}
                                        </td>
                                        <td className="text-truncate d-none d-md-block">
                                            {formatNumber(withdrawal.last_amount)}
                                        </td>
                                        <td className="text-truncate ">
                                            {withdrawal.account_type}
                                        </td>
                                        <td className="text-truncate d-none d-md-block">
                                            {_transformDate(withdrawal.created_at)}
                                        </td>
                                    </tr>
                                );
                            })
                        }

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
                        <li className="page-item"><a className="page-link"
                                                     href="#">1</a></li>
                        <li className="page-item"><a className="page-link"
                                                     href="#">2</a></li>
                        <li className="page-item active"><a className="page-link"
                                                            href="#">3</a></li>
                        <li className="page-item"><a className="page-link"
                                                     href="#">4</a></li>
                        <li className="page-item"><a className="page-link"
                                                     href="#">5</a></li>
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
        );
    }
}

export default WithdrawalList;
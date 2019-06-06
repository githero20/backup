import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import listIcon from "../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../admin/app-assets/images/svg/grid-icon.svg";
import greenDot from "../../admin/app-assets/images/svg/green-dot.svg";
import tableArrowLeft from "../../admin/app-assets/images/svg/table-arrow-left.svg";

import WithdrawalModal from "./WithdrawalModal";

class Withdrawal extends Component {

    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            withdrawals:[]
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal(){
        this.setState({showModal:true});
    }

    hideModal(status = false){
        this.setState({showModal:false});
        if(status){

        }
    }
    render() {
        return (
            <React.Fragment>
                <WithdrawalModal show={this.state.showModal} onHide={this.hideModal}/>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav/>
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">
                                   {/* message box */}
                                   {/*<MessageBox/>*/}
                                </div>
                            </div>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-4 col-12">
                                        <h3 className="gray-header-text mb-2 ">Withdrawal
                                        </h3>
                                    </div>

                                </div>

                                <div className="row">
                                    <div id="recent-sales" className="col-12 col-md-12">
                                        <div className="card">
                                            <div className="card-content mt-1 px-md-5 px-1 py-1">
                                                <div className="table-header d-flex flex-column flex-md-row justify-content-between mb-3">
                                                    <span className="table-button-container mb-2 mb-md-0">
                                     <span className="mr-1 table-grid-view-icon img-2x active">
                                         <img src={listIcon} className=" img-2x "/>
                                     </span>
                                    <span className="mr-1 table-grid-view-icon img-2x ">
                                        <img src={gridIcon} className=" img-2x "/>
                                    </span>
                                    <span className="table-view-display">
                                        <img src={tableArrowLeft}
                                             className="mr-1 img-1x"/> table view
                                    </span>
                                </span>
                                                    <button className="round white btn-withdraw flex-grow-0 " onClick={this.showModal}>Withdraw
                                                    </button>
                                                </div>
                                                <div className="box-grid-container  light-blue-bg px-md-3 py-1 ">
                                                    <div className="table-responsive">
                                                        <table className="table table-hover table-xl mb-0 spaced-table">
                                                            <thead>
                                                            <tr>
                                                                <th className="border-top-0 d-none d-md-block">Reference</th>
                                                                <th className="border-top-0 ">Status</th>
                                                                <th className="border-top-0 ">Balance</th>
                                                                <th className="border-top-0 d-none d-md-block">Amount</th>
                                                                <th className="border-top-0 ">Bank</th>
                                                                <th className="border-top-0 d-none d-md-block">Date</th>
                                                            </tr>

                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td className="text-truncate d-none d-md-block">ABCD999</td>

                                                                <td>
                                                                    <div className="d-flex">
                                                                        <div className="d-inline-block d-md-none">
                                                                            <img
                                                                                src={greenDot}
                                                                                className="green-dot "/>
                                                                        </div>
                                                                        <div className="d-inline-block">
                                                                            <div className="d-md-block">Completed</div>
                                                                            <div
                                                                                className="table-time d-block d-md-none ">5th
                                                                                Sep 19
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-truncate ">
                                                                    50,000
                                                                </td>
                                                                <td className="text-truncate d-none d-md-block">
                                                                    50,000
                                                                </td>
                                                                <td className="text-truncate ">
                                                                    Access Bank
                                                                </td>
                                                                <td className="text-truncate d-none d-md-block">
                                                                    5th Sep 19
                                                                </td>
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
                </div>
            </React.Fragment>
        );
    }
}

export default Withdrawal;
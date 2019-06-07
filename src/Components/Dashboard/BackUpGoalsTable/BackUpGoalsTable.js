import React, {Component} from 'react';
import {_transformDate} from "../../../utils";

class BackUpGoalsTable extends Component {

    constructor(props){
        super(props);
        // console.log("table", this.props.backUpGoals);
        // this.updateBackUpGoals = this.updateBackUpGoals.bind(this);
    }



    render() {
        return (
            <React.Fragment>
                <div className="box-grid-container  light-blue-bg px-md-3 py-md-3">
                    <div className="table-view table-responsive mb-5">
                        <table id="recent-orders"
                               className="table table-hover table-xl spaced-table mb-0 text-center">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Target Amount(NGN)</th>
                                <th>Savings Amount(NGN)</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Frequency</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.backupGoals.map(goal => {
                                    return (
                                        <tr key={goal.id}>
                                            <td>
                                                {goal.id}
                                            </td>
                                            <td>
                                                {goal.title}
                                            </td>
                                            <td>
                                                {goal.target_amount}
                                            </td>
                                            <td>
                                                {goal.start_amount}
                                            </td>
                                            <td>
                                                {_transformDate(goal.start_date)}
                                            </td>
                                            <td>
                                                {_transformDate(goal.end_date)}
                                            </td>
                                            <td>
                                                {goal.frequency}
                                            </td>

                                        </tr>
                                    );
                                })
                            }

                            </tbody>
                        </table>
                    </div>

                    {/*grid section */}
                    <div className="grid-section box-grid-view">
                        <div
                            className="box-grid-view box-grid-content d-flex justify-content-between">
                            <div
                                className="custom-box box-shadow-1 bg-white px-3 py-1  mb-2">
                                <p className="light-gray">100% Complete</p>
                                <h3 className="mb-2">Summer Vacation</h3>
                                <div className="d-flex">
                                    <img className="box-icon"
                                         src="../../admin/app-assets/images/svg/checked-icon.svg"/>
                                    <div className="box-detail d-inline-block">
                                        <p className="light-gray">400,000</p>
                                        <p className="gray">560,000</p>
                                        <p className="light-green">+40%</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="custom-box box-shadow-1 bg-white px-3 py-1  mb-2">
                                <p className="light-gray">40% Complete</p>
                                <h3 className="mb-2">Summer Vacation</h3>
                                <div className="d-flex">
                                    <img className="box-icon"
                                         src="../../admin/app-assets/images/svg/locked-icon.svg"/>
                                    <div className="box-detail d-inline-block">
                                        <p className="light-gray">400,000</p>
                                        <p className="gray">560,000</p>
                                        <p className="light-green">+40%</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="custom-box box-shadow-1 bg-white px-3 py-1 mb-2">
                                <p className="light-gray">100% Complete</p>
                                <h3 className="mb-2">Summer Vacation</h3>
                                <div className="d-flex">
                                    <img className="box-icon"
                                         src="../../admin/app-assets/images/svg/checked-icon.svg"/>
                                    <div className="box-detail d-inline-block">
                                        <p className="light-gray">400,000</p>
                                        <p className="gray">560,000</p>
                                        <p className="light-gray">+40%</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="custom-box box-shadow-1 bg-white px-3 py-1  mb-2">
                                <p className="light-gray">40% Complete</p>
                                <h3 className="mb-2">Summer Vacation</h3>
                                <div className="d-flex">
                                    <img className="box-icon"
                                         src="../../admin/app-assets/images/svg/locked-icon.svg"/>
                                    <div className="box-detail d-inline-block">
                                        <p className="light-gray">400,000</p>
                                        <p className="gray">560,000</p>
                                        <p className="light-gray">+40%</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    {/*pagination*/}
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
            </React.Fragment>
        );
    }
}

export default BackUpGoalsTable;
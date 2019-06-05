import React, {Component} from 'react';

class BackUpGoalsTable extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="box-grid-container  light-blue-bg px-md-3 py-md-3">
                    <div className="table-view table-responsive mb-5">
                        <table id="recent-orders"
                               className="table table-hover table-xl mb-0 spaced-table">
                            <thead>
                            <tr>
                                <th className="border-top-0 d-none d-md-inline">#</th>
                                <th className="border-top-0 d-none d-md-inline">Name</th>
                                <th className="border-top-0 d-md-none">Description</th>
                                <th className="border-top-0 d-none d-md-inline">Amount</th>
                                <th className="border-top-0 ">Interest</th>
                                <th className="border-top-0 ">Start Date</th>
                                <th className="border-top-0 ">End Date</th>
                                <th className="border-top-0 d-none d-md-inline">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="text-truncate d-none d-md-inline ">
                                                                    <span
                                                                        className="text-light-purple mr-1 ">001 </span>
                                </td>
                                <td className="text-truncate d-none d-md-inline">
                                    Summer vacation
                                </td>
                                <td className="d-md-none">
                                    <div>
                                        Summer vacation
                                    </div>
                                    <strong className="black">
                                        ₦<span>400,000</span>
                                    </strong>
                                </td>
                                <td className="d-none d-md-inline">
                                    400,000
                                </td>
                                <td>
                                    <label>+40%</label>
                                </td>
                                <td className="text-truncate text-deep-purple">1st jan
                                    2019
                                </td>
                                <td className="text-truncate">22nd Aug 2019</td>
                                <td className="text-truncate d-none d-md-inline"><span
                                    className="text-very-light-purple mr-1">Completed </span>
                                </td>

                            </tr>
                            <tr>
                                <td className="text-truncate d-none d-md-inline ">
                                                                    <span
                                                                        className="text-light-purple mr-1 ">001 </span>
                                </td>
                                <td className="text-truncate d-none d-md-inline">
                                    Summer vacation
                                </td>
                                <td className="d-md-none">
                                    <div>
                                        Summer vacation
                                    </div>
                                    <strong className="black">
                                        ₦<span>400,000</span>
                                    </strong>
                                </td>
                                <td className="d-none d-md-inline">
                                    400,000
                                </td>
                                <td>
                                    <label>+40%</label>
                                </td>
                                <td className="text-truncate text-deep-purple">1st jan
                                    2019
                                </td>
                                <td className="text-truncate">22nd Aug 2019</td>
                                <td className="text-truncate d-none d-md-inline"><span
                                    className="text-deep-purple mr-1">In Progress </span>
                                </td>

                            </tr>

                            <tr>
                                <td className="text-truncate d-none d-md-inline ">
                                                                    <span
                                                                        className="text-light-purple mr-1 ">001 </span>
                                </td>
                                <td className="text-truncate d-none d-md-inline">
                                    Summer vacation
                                </td>
                                <td className="d-md-none">
                                    <div>
                                        Summer vacation
                                    </div>
                                    <strong className="black">
                                        ₦<span>400,000</span>
                                    </strong>
                                </td>
                                <td className="d-none d-md-inline">
                                    400,000
                                </td>
                                <td>
                                    <label>+40%</label>
                                </td>
                                <td className="text-truncate text-deep-purple">1st jan
                                    2019
                                </td>
                                <td className="text-truncate">22nd Aug 2019</td>
                                <td className="text-truncate d-none d-md-inline"><span
                                    className="text-deep-purple mr-1">In Progress </span>
                                </td>

                            </tr>
                            <tr>
                                <td className="text-truncate d-none d-md-inline ">
                                                                    <span
                                                                        className="text-light-purple mr-1 ">001 </span>
                                </td>
                                <td className="text-truncate d-none d-md-inline">
                                    Summer vacation
                                </td>
                                <td className="d-md-none">
                                    <div>
                                        Summer vacation
                                    </div>
                                    <strong className="black">
                                        ₦<span>400,000</span>
                                    </strong>
                                </td>
                                <td className="d-none d-md-inline">
                                    400,000
                                </td>
                                <td>
                                    <label>+40%</label>
                                </td>
                                <td className="text-truncate text-deep-purple">1st jan
                                    2019
                                </td>
                                <td className="text-truncate">22nd Aug 2019</td>
                                <td className="text-truncate d-none d-md-inline"><span
                                    className="text-deep-purple mr-1">In Progress </span>
                                </td>

                            </tr>

                            <tr>
                                <td className="text-truncate d-none d-md-inline ">
                                                                    <span
                                                                        className="text-light-purple mr-1 ">001 </span>
                                </td>
                                <td className="text-truncate d-none d-md-inline">
                                    Summer vacation
                                </td>
                                <td className="d-md-none">
                                    <div>
                                        Summer vacation
                                    </div>
                                    <strong className="black">
                                        ₦<span>400,000</span>
                                    </strong>
                                </td>
                                <td className="d-none d-md-inline">
                                    400,000
                                </td>
                                <td>
                                    <label>+40%</label>
                                </td>
                                <td className="text-truncate text-deep-purple">1st jan
                                    2019
                                </td>
                                <td className="text-truncate">22nd Aug 2019</td>
                                <td className="text-truncate d-none d-md-inline"><span
                                    className="text-deep-purple mr-1">In Progress </span>
                                </td>

                            </tr>
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
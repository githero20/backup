import React, {Component} from 'react';

class TableGrid extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="grid-section box-grid-view">
                    <div
                        className="box-grid-view box-grid-content d-flex justify-content-between">
                        <div
                            className="custom-box box-shadow-1 bg-white px-3 py-1  mb-2">
                            <p className="light-gray">100% Complete</p>
                            <h3 className="mb-2">Summer Vacation</h3>
                            <div className="d-flex">
                                <img className="box-icon" src="../../../admin/app-assets/images/svg/checked-icon.svg"/>
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
                                <img className="box-icon" src="../../../admin/app-assets/images/svg/locked-icon.svg"/>
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
                                <img className="box-icon" src="../../../admin/app-assets/images/svg/checked-icon.svg"/>
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
                                <img className="box-icon" src="../../../admin/app-assets/images/svg/locked-icon.svg"/>
                                <div className="box-detail d-inline-block">
                                    <p className="light-gray">400,000</p>
                                    <p className="gray">560,000</p>
                                    <p className="light-gray">+40%</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TableGrid;
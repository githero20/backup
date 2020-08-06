import React, { Component } from 'react';
import { LockedSavingsLink } from "../../../RouteLinks/RouteLinks";
import { Link } from 'react-router-dom';
import purpleIcon from "../../../admin/app-assets/images/icons/purple-icon@2x.png";
import { formatNumber } from "../../../Helpers/Helper";

class LockedSavingsCard extends Component {
    render() {

        const { lockedSavingsAmount, lockedSavingsInterest } = this.props;

        return (
            <React.Fragment>
                <div className="col-12 col-lg-6">
                    <div className='d-flex align-items-center mb-2'>
                        <h2 className={'dash-header mb-0'}>Locked Savings - </h2>
                        <small className='text-muted'>Padlock your money & get upfront interest</small>
                    </div>
                    <div
                        className="d-flex flex-column flex-md-row align-items-lg-center dash-card purple-border-right pull-up">
                        <div className="card-item dash-card-img-cover">
                            <img src={purpleIcon} className={'dash-card-img'} />
                        </div>
                        <div className="card-item flex-grow-1">
                            <h3 className='my-2 my-md-1'><strong>&#8358;</strong>&nbsp;
                                {lockedSavingsAmount != undefined && lockedSavingsAmount != 0 ?
                                    formatNumber(lockedSavingsAmount) : '0.00'}
                            </h3>
                            <div className="dash-card-analysis d-flex">
                                <div className='d-flex flex-column'>
                                    <div
                                        className='d-flex dash-card-total-details justify-content-between'>
                                        <h6> Locked Savings</h6>
                                        &nbsp;<i className='fa fa-arrow-right'></i>
                                        <strong className='flex-grow-1'>&#8358;
                                            {lockedSavingsAmount != undefined && lockedSavingsAmount != 0 ?
                                                formatNumber(lockedSavingsAmount) : '0.00'}</strong>
                                    </div>
                                    {/*locked savings interest */}

                                    <div
                                        className='d-flex dash-card-total-details justify-content-between'>
                                        <h6>Total Interest</h6>
                                        &nbsp;<i className='fa fa-arrow-right '></i>
                                        <strong className='flex-grow-1'>&#8358;
                                            {lockedSavingsInterest != 0 && lockedSavingsInterest != undefined ?
                                                formatNumber(lockedSavingsInterest) : '0.00'}
                                        </strong>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div
                            className="card-item d-flex flex-row flex-md-column justify-content-between align-content-between">
                            <a onClick={this.props.showModal} className={'btn btn-gray dash-btn'}>New Locked <i
                                className='fa fa-arrow-right'></i></a>
                            <Link to={LockedSavingsLink} className={'btn btn-gray dash-btn'}>View All <i
                                className='fa fa-arrow-right'></i></Link>
                        </div>

                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default LockedSavingsCard;
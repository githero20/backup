import React, {Component} from 'react';
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";
import {BackupGoalsLink, LockedSavingsLink} from "../../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';
import purpleIcon from "../../../admin/app-assets/images/icons/purple-icon@2x.png";
import {formatNumber} from "../../../Helpers/Helper";

class LockedSavingsCard extends Component {
    render() {

        const {lockedSavingsAmount,lockedSavingsInterest} = this.props;

        return (
            <React.Fragment>
                {/*<div className="col-lg-3 col-sm-6 col-md-6 col-12 no-sm-padding">*/}
                {/*    <h3 className="content-header-text mb-2">Locked Savings</h3>*/}
                {/*    <div className="card saving-card dashboard-card pull-up">*/}
                {/*        <div className="card-header d-flex justify-content-between ">*/}
                {/*            <h4 className="card-title ">*/}
                {/*                <div className="saved-text">Total Locked Savings</div>*/}
                {/*                <div className={'card-amount'}>&#8358; {lockedSavingsAmount!==0?lockedSavingsAmount:0.00} </div>*/}
                {/*            </h4>*/}
                {/*            <div className="card-title  ">*/}
                {/*                <h4>*/}
                {/*                    <div className="saved-text">Total Interest</div>*/}
                {/*                    <div className={'card-amount'}>&#8358; 0.00</div>*/}
                {/*                </h4>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="card-body text-center">*/}
                {/*            <h4 className="card-title saving-balance-text mb-1 ">&#8358; {lockedSavingsAmount!==0?lockedSavingsAmount:0.00}</h4>*/}
                {/*            <div className="d-flex justify-content-between">*/}

                {/*                <button onClick={this.props.showModal}*/}
                {/*                        className="btn btn-small-blue round "><span>New Locked </span>*/}
                {/*                    <img className="btn-icon" alt={'button icon'}*/}
                {/*                    src={RightArrow}/>*/}
                {/*                </button>*/}
                {/*                <Link to={LockedSavingsLink}  className="btn white-btn round  mr-1 mr-md-0">See*/}
                {/*                    All <img alt={''}*/}
                {/*                             className="btn-icon"*/}
                {/*                             src={BlueRightArrow}/>*/}
                {/*                </Link>*/}
                {/*            </div>*/}
                {/*            <div className="row">*/}
                {/*                <div className="col-6">*/}

                {/*                </div>*/}
                {/*                <div className="col-6">*/}

                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}


                <div className="col-12 col-lg-6">
                    <h2 className={'dash-header'}>Locked Savings</h2>
                    <div className="d-flex flex-column flex-md-row align-items-lg-center dash-card purple-border-right pull-up">
                        <div className="card-item dash-card-img-cover">
                            <img src={purpleIcon} className={'dash-card-img'}/>
                        </div>
                        <div className="card-item flex-grow-1">
                            <h3 className='my-2 my-md-1'>&#8358; {lockedSavingsAmount!==0?formatNumber(lockedSavingsAmount):'0.00'}</h3>
                            <div className="dash-card-analysis d-flex">
                                <div className='d-flex flex-column'>
                                    <div
                                        className='d-flex dash-card-total-details justify-content-between'>
                                        <h6> Locked Savings</h6>
                                        <i className='fa fa-arrow-right'></i>
                                        <strong className='flex-grow-1'>&#8358;{lockedSavingsAmount!==0?formatNumber(lockedSavingsAmount):'0.00'}</strong>
                                    </div>
                                    {/*locked savings interest */}

                                    <div
                                        className='d-flex dash-card-total-details justify-content-between'>
                                        <h6>Total Interest</h6><i className='fa fa-arrow-right '></i>
                                        <strong className='flex-grow-1'>&#8358;{lockedSavingsInterest!==0?formatNumber(lockedSavingsInterest):'0.00'}</strong>
                                    </div>

                                </div>
                                {/*<div className='d-flex'>*/}
                                {/*    <h3>Total Interest</h3><i className='fa fa-arrow-right'></i><strong>&#8358;3,000,00</strong>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div
                            className="card-item d-flex flex-row flex-md-column justify-content-between align-content-between">
                            <a href={'#'} onClick={this.props.showModal} className={'btn btn-gray dash-btn'}>New Locked <i
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
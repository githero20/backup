import React, {Component} from 'react';
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";
import {Link} from 'react-router-dom';
import {BackupGoalsLink} from "../../../RouteLinks/RouteLinks";
import orangeIcon from "../../../admin/app-assets/images/icons/orange-icon@2x.png";
import {formatNumber} from "../../../Helpers/Helper";


class BackUpGoalCard extends Component {



    // change to a function component


    //set the default state for the central vault card


    // if there is data to display render the data


    render() {

        const {backupAmount,CompletedGoals,ActiveGoals} = this.props;
        return (
            <React.Fragment>

                {/*<div className="col-lg-3 col-sm-6 col-md-6 col-12 no-sm-padding">*/}
                {/*    <h3 className="content-header-text mb-2">Backup Goals</h3>*/}
                {/*    <div className="card saving-card dashboard-card pull-up">*/}
                {/*        <div className="card-header d-flex justify-content-between ">*/}
                {/*            <div className="card-title  ">*/}
                {/*                <h4>*/}
                {/*                    <div className="saved-text active-text">Active Goals</div>*/}
                {/*                    <div className="active-goal-number goal-number text-center">{ActiveGoals!==0?ActiveGoals:0}</div>*/}
                {/*                </h4>*/}
                {/*            </div>*/}
                {/*            <div className="card-title">*/}
                {/*                <h4>*/}
                {/*                    <div className="saved-text active-text">Completed Goals</div>*/}
                {/*                    <div className="completed-goal-number goal-number text-center">{CompletedGoals!==0?CompletedGoals:0}*/}
                {/*                    </div>*/}
                {/*                </h4>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="card-body text-center">*/}
                {/*            <h4 className="card-title saving-balance-text mb-1 ">&#8358; {backupAmount!==0?backupAmount:0.00}</h4>*/}
                {/*            <div className="d-flex justify-content-between">*/}
                {/*                <button onClick={this.props.showModal}*/}
                {/*                        className="btn btn-small-blue round "><span>New Goal </span>*/}
                {/*                    <img alt={''}*/}
                {/*                         className="btn-icon"*/}
                {/*                         src={RightArrow}/>*/}
                {/*                </button>*/}
                {/*                <Link to={BackupGoalsLink}  className="btn white-btn round  mr-1 mr-md-0">View Goals <img alt={''}*/}
                {/*                             className="btn-icon"*/}
                {/*                             src={BlueRightArrow}/>*/}
                {/*                </Link>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="col-12 col-lg-6">
                    <h2 className={'dash-header '}>Backup Goals</h2>
                    <div className="d-flex flex-column flex-md-row align-items-lg-center dash-card yellow-border-right pull-up">
                        <div className="card-item dash-card-img-cover">
                            <img src={orangeIcon} className={'dash-card-img'}/>
                        </div>
                        <div className="card-item flex-grow-1">
                            <h3 className='my-2 my-md-0'>&#8358; {backupAmount!==0?formatNumber(backupAmount):0.00}</h3>
                            <div className="dash-card-analysis d-flex">
                                <div className='d-flex flex-column'>
                                    <div
                                        className='d-flex dash-card-total-details justify-content-between'>
                                        <h6>Active Goals</h6><strong><i
                                        className='fa fa-arrow-right '></i>{ActiveGoals!==0?ActiveGoals:0}</strong>
                                    </div>
                                    <div
                                        className='d-flex dash-card-total-details justify-content-between'>
                                        <h6>Completed Goals</h6><strong><i
                                        className='fa fa-arrow-right '></i>{CompletedGoals!==0?CompletedGoals:0}</strong>
                                    </div>
                                </div>
                                {/*<div className='d-flex'>*/}
                                {/*    <h3>Total Interest</h3><i className='fa fa-arrow-right'></i><strong>&#8358;3,000,00</strong>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div
                            className="card-item d-flex flex-row flex-md-column justify-content-between align-content-between">
                            <a href={'#'} onClick={this.props.showModal} className={'btn btn-gray dash-btn'}>New Goals <i
                                className='fa fa-arrow-right'></i></a>
                            <Link to={BackupGoalsLink} className={'btn btn-gray dash-btn'}>View Goals <i
                                className='fa fa-arrow-right'></i></Link>
                        </div>

                    </div>

                </div>

            </React.Fragment>
        );
    }
}

export default BackUpGoalCard;
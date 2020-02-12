import React from 'react';
import {Link} from 'react-router-dom';
import {BackupGoalsLink} from "../../../RouteLinks/RouteLinks";
import orangeIcon from "../../../admin/app-assets/images/icons/orange-icon@2x.png";
import {formatNumber} from "../../../Helpers/Helper";


const BackUpGoalCard = (props) => {
    const {backupAmount, backupInterest, ActiveGoals} = props;
    return (
        <React.Fragment>
            <div className="col-12 col-lg-6">
                <div className='d-flex align-items-center mb-2'>
                    <h2 className={'dash-header mb-0'}>Backup Goals - </h2>
                    <small className='text-muted'>Start a new savings plan</small>
                </div>
                <div
                    className="d-flex flex-column flex-md-row align-items-lg-center
                        dash-card yellow-border-right pull-up">
                    <div className="card-item dash-card-img-cover">
                        <img src={orangeIcon} className={'dash-card-img'}/>
                    </div>
                    <div className="card-item flex-grow-1">
                        <h3 className='my-2 my-md-1'>
                            <strong>&#8358;</strong> {backupAmount? formatNumber(backupAmount) : '0.00'}
                        </h3>
                        <div className="dash-card-analysis d-flex fs-12">
                            <div className='d-flex flex-column'>
                                <div className='d-flex dash-card-total-details back-up-detail
                                    justify-content-between'>
                                    <h6>Active Goals</h6>
                                    <i className='fa fa-arrow-right'/>
                                    <strong className='flex-grow-1'>{ActiveGoals? ActiveGoals : 0}</strong>
                                </div>
                                <div
                                    className='d-flex dash-card-total-details
                                        back-up-detail justify-content-between'>
                                    <h6>Goal Interests</h6>
                                    <i className='fa fa-arrow-right'/>
                                    <strong
                                        className='flex-grow-1'>{backupInterest? formatNumber(backupInterest) : 0}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-item d-flex flex-row flex-md-column
                            justify-content-between align-content-between">
                        <a onClick={props.showModal} className={'btn btn-gray dash-btn'}>New Goals
                            &nbsp;<i className='fa fa-arrow-right'/></a>
                        <Link to={BackupGoalsLink} className={'btn btn-gray dash-btn'}>View Goals
                            &nbsp;<i className='fa fa-arrow-right'/>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default BackUpGoalCard;
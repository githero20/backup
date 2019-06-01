import React, {Component} from 'react';
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";
import {Link} from 'react-router-dom';
import {BackupGoalsLink} from "../../../RouteLinks/RouteLinks";


class BackUpGoalCard extends Component {



    // change to a function component


    //set the default state for the central vault card


    // if there is data to display render the data


    render() {

        const {backupAmount,CompletedGoals,ActiveGoals} = this.props;
        return (
            <React.Fragment>

                <div className="col-lg-3 col-sm-6 col-md-6 col-12 no-sm-padding">
                    <h3 className="content-header-text mb-2">Backup Goals</h3>
                    <div className="card saving-card dashboard-card pull-up">
                        <div className="card-header">
                            <div className="card-title heading-elements-left">
                                <h4>
                                    <div className="saved-text">Active Goals</div>
                                    <div className="active-goal-number goal-number text-center">{ActiveGoals}</div>
                                </h4>
                            </div>
                            <div className="card-title heading-elements">
                                <h4>
                                    <div className="saved-text">Completed Goals</div>
                                    <div className="completed-goal-number goal-number text-center">{CompletedGoals}
                                    </div>
                                </h4>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h4 className="card-title saving-balance-text">&#8358; {backupAmount}</h4>
                            <div className="row">
                                <div className="col-6">
                                    <button onClick={this.props.showModal}
                                       className="btn btn-sm btn-custom-blue round "><span
                                        className="ml-2 mr-1">Start </span>
                                        <img alt={''}
                                            className="btn-icon"
                                            src={RightArrow}/>
                                    </button>
                                </div>
                                <div className="col-6">
                                    <Link to={BackupGoalsLink}  className="btn white-btn round  ml-1">See
                                        All <img alt={''}
                                            className="btn-icon"
                                            src={BlueRightArrow}/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default BackUpGoalCard;
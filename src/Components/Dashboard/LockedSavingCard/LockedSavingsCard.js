import React, {Component} from 'react';
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";
import {LockedSavingsLink} from "../../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';

class LockedSavingsCard extends Component {
    render() {

        const {lockedSavingsAmount} = this.props;

        return (
            <React.Fragment>
                <div className="col-lg-3 col-sm-6 col-md-6 col-12 no-sm-padding">
                    <h3 className="content-header-text mb-2">Locked Savings</h3>
                    <div className="card saving-card dashboard-card pull-up">
                        <div className="card-header">
                            <h4 className="card-title heading-elements-left">
                                <div className="saved-text">Total Locked Savings</div>
                                <div>&#8358; {lockedSavingsAmount} </div>
                            </h4>
                            <span className="card-operator">+</span>
                            <div className="card-title heading-elements ">
                                <h4>
                                    <div className="saved-text">Total Interest</div>
                                    <div>&#8358; 0.00</div>
                                </h4>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h4 className="card-title saving-balance-text">&#8358; {lockedSavingsAmount}</h4>
                            <div className="row">
                                <div className="col-6">
                                    <button onClick={this.props.showModal}
                                       className="btn btn-sm btn-custom-blue round "><span>Start </span><img
                                        className="btn-icon" alt={'button icon'}
                                        src={RightArrow}/>
                                    </button>
                                </div>
                                <div className="col-6">
                                    <Link to={LockedSavingsLink}  className="btn white-btn round  ml-1">See
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

export default LockedSavingsCard;
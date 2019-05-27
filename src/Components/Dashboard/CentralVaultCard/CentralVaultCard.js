import React, {Component} from 'react';
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";

class CentralVaultCard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-lg-3 col-sm-6 col-md-6 col-12 no-sm-padding">
                    <h3 className="content-header-text mb-2">Central Vault</h3>
                    <div className="card saving-card dashboard-card pull-up">
                        <div className="card-header">
                            <h4 className="card-title heading-elements-left">
                                <div className="saved-text">Total Steady Savings</div>
                                <div>120,000</div>
                            </h4>
                            <span className="card-operator">+</span>
                            <div className="card-title heading-elements">
                                <h4>
                                    <div className="saved-text">Total Interest</div>
                                    <div>10,156</div>
                                </h4>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h4 className="card-title saving-balance-text">&#8358; 130,156</h4>
                            <div className="row">
                                <div className="col-6">
                                    <a href="backupgoals.html"
                                       className="btn btn-sm btn-custom-blue round "><span
                                        className="ml-2 mr-1">Start </span>
                                        <img alt="" className="btn-icon" src={RightArrow}/>
                                    </a>
                                </div>
                                <div className="col-6">
                                    <a href="backupgoals.html" className="btn white-btn round  ml-1">See
                                        All <img alt=""
                                            className="btn-icon"
                                            src={BlueRightArrow}/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default CentralVaultCard;
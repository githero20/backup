import React, {Component} from 'react';
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";
import {BackupGoalsLink, InstantSaveLink, SteadySaveLink} from "../../../RouteLinks/RouteLinks";

import {Link} from 'react-router-dom';

class CentralVaultCard extends Component {



    //set the default state for the central vault card


    // if there is data to display render the data




    render() {

        const {vaultAmount,totalSteadySave} = this.props;

        return (
            <React.Fragment>
                <div className="col-lg-3 col-sm-6 col-md-6 col-12 no-sm-padding">
                    <h3 className="content-header-text mb-2">Central Vault</h3>
                    <div className="card saving-card dashboard-card pull-up">
                        {/*<div className="card-header">*/}
                        {/*    <h4 className="card-title heading-elements-left">*/}
                        {/*        <div className="saved-text">Total Steady Savings</div>*/}
                        {/*        <div>&#8358; {vaultAmount}</div>*/}
                        {/*    </h4>*/}
                        {/*    <span className="card-operator">+</span>*/}
                        {/*    <div className="card-title heading-elements">*/}
                        {/*        <h4>*/}
                        {/*            <div className="saved-text">Total Interest</div>*/}
                        {/*            <div>&#8358; {totalSteadySave}</div>*/}
                        {/*        </h4>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="card-header d-flex justify-content-between ">
                            <h4 className="card-title ">
                                <div className="saved-text">Total Steady  Savings</div>
                                <div className={'card-amount'}>&#8358; {vaultAmount}</div>
                            </h4>
                            <span className="card-operator">+</span>
                            <div className="card-title ">
                                <h4>
                                    <div className="saved-text ">Total Interest</div>
                                    <div className={'card-amount'}>&#8358; {totalSteadySave}</div>
                                </h4>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h4 className="card-title saving-balance-text mb-1">&#8358; {vaultAmount}</h4>
                            <div className="d-flex justify-content-between">
                                    <Link to={InstantSaveLink}
                                       className="btn btn-small-blue link-btn round "><span>Instant Save </span>
                                        <img alt="" className="btn-icon" src={RightArrow}/>
                                    </Link>
                                    <Link to={SteadySaveLink} className="btn white-btn round  mr-1 mr-md-0">
                                        Steady Save
                                        <img alt="" className="btn-icon" src={BlueRightArrow}/>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default CentralVaultCard;
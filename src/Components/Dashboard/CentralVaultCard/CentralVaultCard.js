import React, {Component} from 'react';
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";
import {BackupGoalsLink, InstantSaveLink, SteadySaveLink} from "../../../RouteLinks/RouteLinks";

import {Link} from 'react-router-dom';
import {formatNumber} from "../../../Helpers/Helper";
import blueIcon from "../../../admin/app-assets/images/icons/blue-icon@2x.png";

class CentralVaultCard extends Component {



    //set the default state for the central vault card


    // if there is data to display render the data




    render() {

        const {vaultAmount,vaultInterest} = this.props;


        // console.log (totalVault+totalInt);
        return (
            <React.Fragment>
                {/*<div className="col-lg-3 col-sm-6 col-md-6 col-12 no-sm-padding">*/}
                {/*    <h3 className="content-header-text mb-2">Central Vault</h3>*/}
                {/*    <div className="card saving-card dashboard-card pull-up">*/}
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
                {/*        <div className="card-header d-flex justify-content-between ">*/}
                {/*            <h4 className="card-title ">*/}
                {/*                <div className="saved-text">Total Steady  Savings</div>*/}
                {/*                <div className={'card-amount'}>&#8358; {vaultAmount!==0?formatNumber(vaultAmount):0.00}</div>*/}
                {/*            </h4>*/}

                {/*            <div className="card-title ">*/}
                {/*                <h4>*/}
                {/*                    <div className="saved-text ">Total Interest</div>*/}
                {/*                    <div className={'card-amount'}>&#8358; {vaultInterest!==0?formatNumber(vaultInterest):0.00}</div>*/}
                {/*                </h4>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="card-body text-center">*/}
                {/*            /!*formatNumber(total)*!/*/}
                {/*            <h4 className="card-title saving-balance-text mb-1">&#8358;*/}
                {/*                {formatNumber((Number(vaultAmount)+ Number(vaultInterest)).toFixed(2)) }*/}
                {/*            </h4>*/}
                {/*            <div className="d-flex justify-content-between">*/}
                {/*                    <Link to={InstantSaveLink}*/}
                {/*                       className="btn btn-small-blue link-btn round "><span>Instant Save </span>*/}
                {/*                        <img alt="" className="btn-icon" src={RightArrow}/>*/}
                {/*                    </Link>*/}
                {/*                    <Link to={SteadySaveLink} className="btn white-btn round  mr-1 mr-md-0">*/}
                {/*                        Steady Save*/}
                {/*                        <img alt="" className="btn-icon" src={BlueRightArrow}/>*/}
                {/*                    </Link>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="col-12 col-lg-6">
                    <h2 className={'dash-header'}>Central Vault</h2>
                    <div className="d-flex  flex-column flex-md-row align-items-lg-center dash-card blue-border-right pull-up">
                        <div className="card-item dash-card-img-cover">
                            <img src={blueIcon} className={'dash-card-img'}/>
                        </div>
                        <div className="card-item flex-grow-1 flex-column flex-md-row">
                            <h3 className='my-2 my-md-1'>&#8358;{formatNumber((Number(vaultAmount)+ Number(vaultInterest)).toFixed(2)) }</h3>
                            <div className="dash-card-analysis flex-column flex-md-row d-flex fs-12">
                                <div className='d-flex flex-column '>
                                    <div
                                        className='d-flex dash-card-total-details justify-content-between '>
                                        <h6 className='fs-12'>Total Savings</h6><strong><i
                                        className='fa fa-arrow-right '></i>&#8358;{vaultAmount!==0?formatNumber(vaultAmount):0.00}</strong>
                                    </div>
                                    <div
                                        className='d-flex dash-card-total-details justify-content-between'>
                                        <h6 className='fs-12'>Total Interest</h6><strong><i
                                        className='fa fa-arrow-right '></i>&#8358;{vaultInterest!==0?formatNumber(vaultInterest):0.00}</strong>
                                    </div>
                                </div>
                                {/*<div className='d-flex'>*/}
                                {/*    <h3>Total Interest</h3><i className='fa fa-arrow-right'></i><strong>&#8358;3,000,00</strong>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div
                            className="card-item d-flex flex-md-column justify-content-between align-content-between">
                            <Link to={InstantSaveLink} className={'btn btn-gray dash-btn'}>Instant Save <i
                                className='fa fa-arrow-right'></i></Link>
                            <Link to={SteadySaveLink} className={'btn btn-gray dash-btn'}>Steady Save <i
                                className='fa fa-arrow-right'></i></Link>
                        </div>

                    </div>

                </div>

            </React.Fragment>
        );
    }
}

export default CentralVaultCard;
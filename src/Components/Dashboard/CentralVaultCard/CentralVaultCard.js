import React from 'react';
import {InstantSaveLink, SteadySaveLink} from "../../../RouteLinks/RouteLinks";

import {Link} from 'react-router-dom';
import {formatNumber} from "../../../Helpers/Helper";
import blueIcon from "../../../admin/app-assets/images/icons/blue-icon@2x.png";

const CentralVaultCard = (props) => {
    const {vaultAmount, vaultInterest} = props;
    return (
        <>
            <div className="col-12 col-lg-6">
                <div className='d-flex align-items-center mb-2'>
                    <h2 className={'dash-header mb-0'}>Central Vault - </h2>
                    <small className='text-muted'>Save now or gradually</small>
                </div>
                <div
                    className="d-flex  flex-column flex-md-row align-items-lg-center
                     dash-card blue-border-right pull-up">
                    <div className="card-item dash-card-img-cover">
                        <img src={blueIcon} className={'dash-card-img'}/>
                    </div>
                    <div className="card-item flex-grow-1 flex-column flex-md-row">
                        <h3 className='my-2 my-md-1'><strong>&#8358;</strong>&nbsp;
                            {formatNumber((Number(vaultAmount) + Number(vaultInterest)).toFixed(2)) || '0.00'}
                        </h3>
                        <div className="dash-card-analysis flex-column flex-md-row d-flex fs-12">
                            <div className='d-flex flex-column '>
                                <div
                                    className='d-flex dash-card-total-details justify-content-between '>
                                    <h6 className='fs-12'>Total Savings</h6>
                                    &nbsp;<i className='fa fa-arrow-right '/>
                                    <strong className='flex-grow-1'>
                                        &#8358;&nbsp;{vaultAmount != 0 && vaultAmount != undefined ?
                                        formatNumber(vaultAmount) : '0.00'}</strong>
                                </div>
                                <div
                                    className='d-flex dash-card-total-details justify-content-between'>
                                    <h6 className='fs-12'>Total Interest</h6>
                                    &nbsp;<i className='fa fa-arrow-right '/>
                                    <strong className='flex-grow-1'>
                                        &#8358;&nbsp;{vaultInterest !== 0 && vaultInterest !== undefined ?
                                        formatNumber(vaultInterest) : '0.00'}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="card-item d-flex flex-md-column justify-content-between align-content-between">
                        <Link to={InstantSaveLink} className={'btn btn-gray dash-btn'}>Instant Save
                            <i className='fa fa-arrow-right'/>
                        </Link>
                        <Link to={SteadySaveLink} className={'btn btn-gray dash-btn'}>Steady Save
                            <i className='fa fa-arrow-right'/>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CentralVaultCard;
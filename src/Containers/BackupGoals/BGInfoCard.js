import React from 'react';
import {formatNumber} from "../../Helpers/Helper";

 const BGInfoCard = (props)=> {
        return (
            <React.Fragment>
                <div className="card pull-up bg-white shadow-sm saving-card">
                    {/*<img className="floated-icon" src={transTotalSavingsIcon}/>*/}
                    <div className="card-content">
                        <div className="card-body">
                            {/*<h4 className="text-white blue-card-heading ">Total*/}
                            {/*    Balance</h4>*/}
                            <div className="media d-flex pb-1">
                                <div className="align-self-center">
                                    {/*<img className="blue-card-icon" src={totalBalanceIcon}/>*/}
                                </div>
                                <div className="media-body text-left pt-1 ">
                                    <div className="mb-1">
                                        <h6>Plan Name</h6>
                                        <strong className="blue-card-price ml-2 mr-2 text-capitalize">{props.bgInfo?props.bgInfo.title:null}</strong>
                                    </div>

                                    <div >
                                        <h6 className={'text-capitalize'}>target Amount</h6>
                                        <strong className="blue-card-price ml-2 mr-2">₦ {props.bgInfo?formatNumber(parseFloat(props.bgInfo.target_amount).toFixed(2)):'0.00'}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
}

export default BGInfoCard;
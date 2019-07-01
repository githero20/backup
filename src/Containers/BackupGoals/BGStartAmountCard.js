import React from 'react';
import {formatNumber, getTotalBGSuccessful, getTotalFailed} from "../../Helpers/Helper";
import BackUpProgressBar from "./BackUpProgressBar";

const BGStartAmountCard = (props) => {

    const totalPaid = getTotalBGSuccessful(props.selectedBGHistory);
    //get amount due
    const totalDue = getTotalFailed(props.selectedBGHistory);


    return (
        <React.Fragment>
            <div className="card pull-up bg-white shadow-sm saving-card">
                {/*<img className="floated-icon" src={transTotalSavingsIcon}/>*/}
                <div className="card-content">
                    <div className="card-body">
                        {/*<h4 className="text-white blue-card-heading ">Total*/}
                        {/*    Balance</h4>*/}
                        <div className="media d-flex pb-1 ">
                            <div className="align-self-center">
                                {/*<img className="blue-card-icon" src={totalBalanceIcon}/>*/}
                            </div>
                            <div className="media-body text-left pt-1 ">
                                <div className="mb-1">
                                    <h6>Balance</h6>
                                    <strong
                                        className="blue-card-price ml-2 mr-2 text-capitalize">{props.bgInfo ? `₦ ${formatNumber(parseFloat(totalPaid).toFixed(2))}` : null}</strong>
                                </div>
                                <div>
                                    <h6 className={'text-capitalize'}>Due Pay</h6>
                                    <strong
                                        className="blue-card-price ml-2 mr-2">₦ {props.selectedBGHistory ? formatNumber(Number(totalDue).toFixed(2)) : '0.00'}</strong>
                                </div>
                                <p>
                                    {
                                        totalDue > 0 ?
                                            <a href='#' className=''
                                               onClick={() => props.showPayModal()}>Pay
                                                Now</a> :
                                            null
                                    }
                                </p>

                                <BackUpProgressBar backupHistory={props.selectedBGHistory} backupInfo={props.bgInfo}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BGStartAmountCard;
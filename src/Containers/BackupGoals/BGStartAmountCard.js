import React from 'react';
import {formatNumber, getTotalBGSuccessful, getTotalFailed} from "../../Helpers/Helper";
import BackUpProgressBar from "./BackUpProgressBar";

const BGStartAmountCard = ({bgInfo,selectedBGHistory,showPayModal}) => {

    const totalPaid = getTotalBGSuccessful(selectedBGHistory);
    //get amount due
    const totalDue = getTotalFailed(selectedBGHistory);

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
                                <div className="d-flex flex-md-row align-items-center justify-content-between">
                                    <div className="mb-1">
                                        <h6>Balance</h6>
                                        <strong className="blue-card-price  mr-2 text-capitalize">
                                            {bgInfo ? `₦ ${formatNumber(parseFloat(totalPaid).toFixed(2))}` : null}
                                        </strong>
                                    </div>
                                    <div className="mb-1">
                                        <h6>Frequency</h6>
                                        <strong className="blue-card-price mr-2 text-capitalize">
                                            {bgInfo ? bgInfo.frequency:null}
                                        </strong>
                                    </div>
                                </div>

                                <div className="d-flex flex-md-row align-items-center justify-content-between mb-2">
                                    <div>
                                        <h6 className={'text-capitalize'}>Due Pay</h6>
                                        <strong
                                            className="blue-card-price text-danger mr-2">
                                            ₦ {selectedBGHistory ? formatNumber(Number(totalDue).toFixed(2)) : '0.00'}
                                        </strong>
                                    </div>
                                    <p>
                                        {totalDue > 0 ? <a className='btn btn-sm dash-cust-blue round'
                                                           onClick={() => showPayModal()}>Pay Now</a> : null}
                                    </p>
                                </div>

                                <BackUpProgressBar backupHistory={selectedBGHistory} backupInfo={bgInfo}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BGStartAmountCard;
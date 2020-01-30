import React from 'react';
import {getPercentage, getTotalBGSuccessful} from "../../Helpers/Helper";

const BackUpProgressBar = (props) => {

    let percentage, paidAmount, targetAmount;
        paidAmount = getTotalBGSuccessful(props.backupHistory);
        targetAmount = props.backupInfo.target_amount || 0;
        percentage = getPercentage(paidAmount, targetAmount);
        console.log('percentage',percentage,'paidAmount',paidAmount,'targetAmount',targetAmount);

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between">
                <h6>Your Goal</h6>
                <div className='back-up-percent'> <strong>{ percentage.toFixed(2)} % </strong><span>Done</span></div>
            </div>
            <div className='cust-progress-bar w-100 round overflow-hidden shadow-sm'>
                <div className="progress-indicator round bg-success" style={{width: percentage + '%'}}>&nbsp;</div>
            </div>
        </React.Fragment>
    )

};


export default BackUpProgressBar;
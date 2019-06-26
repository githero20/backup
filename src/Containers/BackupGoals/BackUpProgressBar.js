import React from 'react';
import {getPercentage, getTotalBGSuccessful} from "../../Helpers/Helper";

const BackUpProgressBar = (props) => {

    // filter success full transactions
    let percentage, paidAmount, targetAmount;
    // if (!Number(props.backupInfo.stop)) {

        paidAmount = getTotalBGSuccessful(props.backupHistory);
        //get target amount
        targetAmount = props.backupInfo.target_amount || 0;
        //get percentage
        percentage = getPercentage(paidAmount, targetAmount);

    // } else {
    //     paidAmount = targetAmount = 100;
    //     percentage = getPercentage(paidAmount, targetAmount);
    //
    // }


    //receive the history of backup goals and the  target amount

    // display the percentage based on the props received
    return (
        <React.Fragment>
            <div className="d-flex justify-content-between">
                <h6>Current Progess</h6>
                <div className='back-up-percent'> { percentage.toFixed(2)} %</div>
            </div>
            <div className='cust-progress-bar w-100 round overflow-hidden shadow-sm'>
                <div className="progress-indicator round bg-success" style={{width: percentage + '%'}}>&nbsp;</div>
            </div>
        </React.Fragment>
    )

}


export default BackUpProgressBar;
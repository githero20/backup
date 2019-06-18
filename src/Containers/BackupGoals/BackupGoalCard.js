import React from 'react';
import {formatNumber} from "../../Helpers/Helper";

 const BackupGoalCard = (props)=> {
        return (
            <React.Fragment>
                <div key={props.content.id}
                     className="col-12 col-md-4" onClick={this.showBackUp}>
                    <div
                        className="goal-box round bg-white shadow-md w-100 px-3 py-2 pull-up mb-2">
                        <h5>{props.content.title}</h5>
                        <p className={'gray-text goal-target'}>Target</p>
                        <div
                            className='d-flex justify-content-between'>
                            <h6 className={'goal-box-amount'}>{formatNumber(props.content.target_amount)}</h6>
                            {!Number(props.content.is_pause) ?
                                (
                                    <span className={'goal-active text-success'}>Active</span>) :
                                (
                                    <span className={'goal-inactive gray-text'}>Paused</span>
                                )

                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
}

export default BackupGoalCard;
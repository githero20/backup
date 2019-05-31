import React, {Component} from 'react';
import TotalTransactionIcon from "../../../admin/app-assets/images/svg/transparent-total-saving-icon.svg";
import BlueCardTransIcon from "../../../admin/app-assets/images/svg/bluetransicon.svg";

class TotalSavingsBlueCard extends Component {
    render() {
        return (
            <React.Fragment>
                {/* total Savings */}

                <div className="card pull-up blue-card saving-card">
                    <img className="floated-icon"
                         src={TotalTransactionIcon}/>
                    <div className="card-content">
                        <div className="card-body">
                            <h4 className="text-white blue-card-heading ">Total Savings</h4>
                            <div className="media d-flex pb-md-5 pb-2">
                                <div className="align-self-center">
                                    <img className="blue-card-icon"
                                         src={BlueCardTransIcon}/>
                                </div>
                                <div className="media-body text-left pt-1 ">
                                    <h3 className="text-white ml-1"><strong
                                        className="blue-card-price ">&#8358;
                                        1,934,890</strong>
                                    </h3>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TotalSavingsBlueCard;
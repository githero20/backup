import React, {Component} from 'react';
import totalSavingsIcon from "../../../admin/app-assets/images/svg/transparent-total-saving-icon.svg";
import totalBalanceIcon from "../../../admin/app-assets/images/svg/total-balance-icon.svg";

class InstantSaveCard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="card pull-up blue-card saving-card">
                    <img className="floated-icon" src={totalSavingsIcon}/>
                    <div className="card-content">
                        <div className="card-body">
                            <h4 className="text-white blue-card-heading ">Total Balance</h4>
                            <div className="media d-flex pb-2 pb-md-5">
                                <div className="align-self-center">
                                    <img className="blue-card-icon"
                                         src={totalBalanceIcon}/>
                                </div>
                                <div className="media-body text-left pt-1 ">
                                    <h3 className="text-white clearfix"><strong
                                        className="blue-card-price ml-2 mr-2"><sup>₦</sup> 10000.00</strong>

                                    </h3></div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default InstantSaveCard;
import React, {Component} from 'react';
import historyTransIcon from "../../../admin/app-assets/images/svg/history-arrow.svg";
import HistoryArrow from "../../../admin/app-assets/images/svg/history-arrow-sm.svg";

class TotalSavingsCard extends Component {
    render() {
        return (
            <React.Fragment>

                <div className="card white-card pull-up mt-3">
                    <div className="card-content">
                        <div className="card-body">
                            <h4 className=" blue-card-heading mb-md-2">Total Savings</h4>
                            <div className="media d-flex">
                                <div className="align-self-center">
                                    <img className="blue-card-icon"
                                         src={historyTransIcon}/>
                                </div>
                                <div className="media-body text-left pt-1 mb-md-2">
                                    <h3><strong
                                        className="blue-card-price ml-1 mr-2">&#8358;
                                        1,934,890</strong>
                                    </h3>
                                </div>
                            </div>
                            <div className={'d-flex justify-content-end'}><a href="#"
                                                                             className="btn btn-sm history-btn btn-outline-blue ">Interest
                                History <img className="btn-icon"
                                             src={HistoryArrow}/></a>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default TotalSavingsCard;
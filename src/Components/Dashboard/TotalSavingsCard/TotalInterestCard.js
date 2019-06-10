import React, {Component} from 'react';
import historyTransIcon from "../../../admin/app-assets/images/svg/history-arrow.svg";
import HistoryArrow from "../../../admin/app-assets/images/svg/history-arrow-sm.svg";

class TotalInterestCard extends Component {


    render() {

        const {totalInterest} = this.props;

        return (
            <React.Fragment>

                <div className="card white-card pull-up ">
                    <div className="card-content">
                        <div className="card-body">
                            <h4 className=" blue-card-heading mb-md-2">Total Interest Gained</h4>
                            <div className="media d-flex">
                                <div className="align-self-center">
                                    <img className="blue-card-icon"
                                         src={historyTransIcon}/>
                                </div>
                                <div className="media-body text-left pt-1 mb-md-2">
                                    <h3 className={'ml-1 '}><strong
                                        className="blue-card-price ">&#8358;&nbsp;
                                        {totalInterest}</strong>
                                    </h3>
                                </div>
                            </div>
                            <div className={'d-flex justify-content-end'}>
                                <a href="#" className="btn btn-sm history-btn ">Interest
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

export default TotalInterestCard;
import React, {Component} from 'react';
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";
import {SteadySaveLink, WithdrawalLink} from "../../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';

class BackUpStashCard extends Component {

    render() {

        const {stashAmount} = this.props;

        return (
            <React.Fragment>
                <div className="col-lg-3 col-sm-12 col-md-6 col-12 no-sm-padding">
                    <h3 className="content-header-text mb-2">Backup Stash</h3>
                    <div className="card saving-card dashboard-card pull-up">

                        <div className="card-body text-center mt-md-2">
                            <h4 className="card-title saving-balance-text my-2">&#8358; {stashAmount}</h4>
                            <div className="d-flex justify-content-center">

                                <Link to={WithdrawalLink} className="btn white-btn round  ml-1 mr-1 mr-md-0">See
                                    All <img
                                        className="btn-icon"
                                        src={BlueRightArrow} alt={'backup stash'}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BackUpStashCard;
import React, { Component } from 'react';
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";
import { BackupStashLink, SteadySaveLink, WithdrawalLink } from "../../../RouteLinks/RouteLinks";
import { Link } from 'react-router-dom';
import yellowIcon from "../../../admin/app-assets/images/icons/yellow-icon@2x.png";
import { formatNumber } from "../../../Helpers/Helper";

class BackUpStashCard extends Component {

    render() {

        const { stashAmount } = this.props;

        return (
            <React.Fragment>
                <div className="col-12 col-lg-6">
                    <div className='d-flex align-items-center mb-2'>
                        <h2 className={'dash-header mb-0'}>Backup Stash - </h2>
                        <small className='text-muted'>Here's an over look of all the interests that you have gained</small>
                    </div>
                    <div className="d-flex stash-card flex-column flex-md-row align-items-lg-center
                    dash-card orange-border-right pull-up" >
                        <div className="card-item dash-card-img-cover">
                            <img src={yellowIcon} className={'dash-card-img'} />
                        </div>
                        <div className="card-item flex-grow-1">
                            <p className='d-md-block d-none mt-2 mt-md-0'>Balance</p>
                            <h3 className='my-2 my-md-0'><strong>&#8358;</strong> {stashAmount != undefined ?
                                formatNumber(parseFloat(stashAmount).toFixed(2)) : '0.00'}</h3>
                        </div>
                        <div className="card-item d-flex flex-column justify-content-between align-content-between">
                            <Link to={BackupStashLink} className={'btn btn-gray dash-btn stash-btn'}>See All
                                &nbsp;<i className='fa fa-arrow-right'></i>
                            </Link>
                        </div>

                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default BackUpStashCard;
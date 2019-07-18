import React, {Component} from 'react';
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";
import {BackupStashLink, SteadySaveLink, WithdrawalLink} from "../../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';
import yellowIcon from "../../../admin/app-assets/images/icons/yellow-icon@2x.png";
import {formatNumber} from "../../../Helpers/Helper";

class BackUpStashCard extends Component {

    render() {

        const {stashAmount} = this.props;

        return (
            <React.Fragment>
                {/*<div className="col-lg-3 col-sm-12 col-md-6 col-12 no-sm-padding">*/}
                {/*    <h3 className="content-header-text mb-2">Backup Stash</h3>*/}
                {/*    <div className="card saving-card dashboard-card pull-up">*/}

                {/*        <div className="card-body text-center mt-md-2">*/}
                {/*            <p className={'text-center pt-1'}>Balance</p>*/}
                {/*            <h4 className="card-title saving-balance-text mb-1 mt-2">&#8358; {stashAmount}</h4>*/}
                {/*            <div className="d-flex justify-content-center">*/}

                {/*                <Link to={BackupStashLink} className="btn white-btn round  ml-1 mr-1 mr-md-0">See*/}
                {/*                    All <img*/}
                {/*                        className="btn-icon"*/}
                {/*                        src={BlueRightArrow} alt={'backup stash'}/>*/}
                {/*                </Link>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}


                <div className="col-12 col-lg-6">
                    <div className='d-flex align-items-center mb-2'>
                        <h2 className={'dash-header mb-0'}>Backup Stash - </h2>
                        <small className='text-muted'>Your gained interest</small>
                    </div>
                    <div className="d-flex stash-card flex-column flex-md-row align-items-lg-center dash-card orange-border-right pull-up" >
                        <div className="card-item dash-card-img-cover">
                            <img src={yellowIcon} className={'dash-card-img'}/>
                        </div>
                        <div className="card-item flex-grow-1">
                            <p className='d-md-block d-none mt-2 mt-md-0'>Balance</p>
                            <h3 className='my-2 my-md-0'><strong>&#8358;</strong> {formatNumber(parseFloat(stashAmount).toFixed(2))}</h3>
                            {/*<div className="dash-card-analysis d-flex">*/}
                            {/*    <div className='d-flex flex-md-column'>*/}
                            {/*        <div*/}
                            {/*            className='d-flex dash-card-total-details justify-content-between'>*/}
                            {/*            <h6>Total Steady Savings</h6><strong><i className='fa fa-arrow-right '></i>&#8358;1,000,000,000,00</strong>*/}
                            {/*        </div>*/}
                            {/*        <div*/}
                            {/*            className='d-flex dash-card-total-details justify-content-between'>*/}
                            {/*            <h6>Total Interest</h6><strong><i className='fa fa-arrow-right '></i>&#8358;3,000,00</strong>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    /!*<div className='d-flex'>*!/*/}
                            {/*    /!*    <h3>Total Interest</h3><i className='fa fa-arrow-right'></i><strong>&#8358;3,000,00</strong>*!/*/}
                            {/*    /!*</div>*!/*/}
                            {/*</div>*/}
                        </div>
                        <div
                            className="card-item d-flex flex-column justify-content-between align-content-between">
                            <Link to={BackupStashLink}  className={'btn btn-gray dash-btn stash-btn'}>See All <i
                                className='fa fa-arrow-right'></i></Link>
                        </div>

                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default BackUpStashCard;
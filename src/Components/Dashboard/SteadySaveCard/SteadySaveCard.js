import React, {Component} from 'react';
import transTotalSavingsIcon from "../../../admin/app-assets/images/svg/transparent-total-saving-icon.svg";
import totalBalanceIcon from "../../../admin/app-assets/images/svg/total-balance-icon.svg";
import settingsIcon from "../../../admin/app-assets/images/svg/settings-icon-instant-save.svg";

const SteadySaveCard = (props) => {

        return (
            <React.Fragment>
                <div className="col-lg-4 col-12 order-lg-1">
                    <h3 className="gray-header-text fs-mb-1 mb-2 ">Steady Save <span
                        className="dot">.</span> Summary

                    </h3>
                    <div className="card pull-up blue-card saving-card">
                        <img className="floated-icon" src={transTotalSavingsIcon}/>
                        <div className="card-content">
                            <div className="card-body">
                                <h4 className="text-white blue-card-heading ">Central Vault Balance</h4>
                                <div className="media d-flex align-items-center pb-2 pb-md-1 pb-lg-1">
                                    <div className="align-self-center">
                                        <img className="blue-card-icon" src={totalBalanceIcon}  />
                                    </div>
                                    <div className="media-body text-left ">
                                        <h3 className="text-white "><strong
                                            className="blue-card-price ml-2 mr-2">₦
                                            {props.totalBalance}</strong>
                                        </h3>
                                    </div>
                                </div>
                                {/*<div className={'d-flex justify-content-end'}>*/}
                                {/*    <a href="#" onClick={props.newSteadySave} className=" text-white ">Start Save*/}
                                {/*     &nbsp;<img src={settingsIcon}/></a>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
}

export default SteadySaveCard;
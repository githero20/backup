import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import addButton from "../../admin/app-assets/images/svg/plus-btn.svg";
import menuIcon from "../../admin/app-assets/images/svg/three-dot-icon.svg";
import visaImage from "../../admin/app-assets/images/svg/visa.svg";
import masterCardImage from "../../admin/app-assets/images/svg/mastercard.svg";

class BankCardSetting extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav/>
                    <VerticalNav/>

                    <div className="app-content content">
                        <div className="content-wrapper">

                            <div className="row mb-4">
                                <div className="col-12">
                                    <div
                                        className="bg-white shadow-sm dashboard-callout callout-border-right clearfix callout-round callout-transparent mt-1 px-2 py-2 py-1">
                                        <strong>Congrats! </strong>
                                        <span className="mr-3">you referred 5 persons from [ 1 -2-2019 to 5-2-2019 ] ,
                        <span className="admin-purple d-block d-md-inline">Your referral points earned</span> </span>
                                        <span className=" d-block d-md-inline">25 points</span>
                                        <label className="pull-right"><span className="mr-2"> copy referral code</span>
                                            <span className="code-btn">AEC45SF</span></label>
                                    </div>
                                </div>
                            </div>

                            <div className="content-body">
                                <section id="text-alignment">
                                    <div className="row">
                                        <div className="col-12 mt-3 mb-1">
                                            <h3 className="gray-header-text mb-2 ">Settings <span
                                                className="dot">.</span> Bank/Cards</h3>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 col-md-12">
                                            <div className="card round px-md-3">
                                                <div className="card-content">
                                                    <div className="card-body account-card">
                                                        <h3 className=" clearfix light-gray setting-header">My
                                                            Banks <span className="pull-right right-btn-holder"><button
                                                                type="button"
                                                                className="btn-custom-round-blue plus-btn-shadow mr-1">
                                                                <img className="img-2x" src={addButton}/>
                                                            </button>Add Bank</span>
                                                        </h3>
                                                        <h4 className="card-text mt-5 text-center setting-header px-5 light-gray">You
                                                            currently do not have any banks accounts Added</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="card round px-md-3">
                                                <div className="card-content">
                                                    <div className="card-body account-card">
                                                        <h3 className=" clearfix light-gray setting-header">Debit/Credit
                                                            Cards <span className="pull-right right-btn-holder"><button
                                                                type="button"
                                                                className="btn-custom-round-blue plus-btn-shadow mr-1"><img
                                                                className="img-2x "
                                                                src={addButton}/>
                                                            </button>Add Card</span>
                                                        </h3>
                                                        <div className="d-flex justify-content-between mt-4">
                                                            <div className="bank-card gray-gradient  mr-2">
                                                                <div className="clearfix"><img
                                                                    src={menuIcon}
                                                                    className="pull-right big-dots"/>
                                                                </div>
                                                                <p className="mb-md-3">4567 1345 1238 345</p>
                                                                <div className="sm-font"><span
                                                                    className="mr-5 mb-1 sm-font">3456</span><span>09/22</span>
                                                                </div>
                                                                <div><img className="card-img-icon"
                                                                          src={visaImage}/>
                                                                </div>
                                                            </div>
                                                            <div className="bank-card blue-gradient">
                                                                <div className="clearfix"><img
                                                                    src={menuIcon}
                                                                    className="pull-right big-dots"/>
                                                                </div>
                                                                <p className="mb-md-3">4567 1345 1238 345</p>
                                                                <div className="sm-font"><span
                                                                    className="mr-5 mb-1 ">3456</span><span>09/22</span>
                                                                </div>
                                                                <div><img className="card-img-icon"
                                                                          src={masterCardImage}/>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    );
    }
    }
    export default BankCardSetting;
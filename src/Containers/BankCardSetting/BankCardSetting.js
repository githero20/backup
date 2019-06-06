import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import addButton from "../../admin/app-assets/images/svg/plus-btn.svg";
import menuIcon from "../../admin/app-assets/images/svg/three-dot-icon.svg";
import visaImage from "../../admin/app-assets/images/svg/visa.svg";
import masterCardImage from "../../admin/app-assets/images/svg/mastercard.svg";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";

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
                                    {/*message box*/}
                                    {/*<MessageBox/>*/}
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
                                                        <h3 className=" d-flex justify-content-between align-items-center light-gray setting-header">
                                                            <h3>My Banks</h3> <span
                                                            className="pull-right right-btn-holder"><button
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
                                                        <h3 className=" d-flex justify-content-between align-items-center light-gray setting-header">
                                                            <h3>Debit/Credit</h3>
                                                            <span className="pull-right right-btn-holder">
                                                                <button
                                                                    type="button"
                                                                    className="btn-custom-round-blue plus-btn-shadow mr-1"><img
                                                                    className="img-2x "
                                                                    src={addButton}/>
                                                            </button>Add Card</span>
                                                        </h3>
                                                        <div className="d-flex justify-content-md-between justify-content-center flex-column flex-md-row mt-4">
                                                            <div className="bank-card gray-gradient mb-2 mb-md-0  mr-2">
                                                                <div className="d-flex justify-content-end"><img
                                                                    src={menuIcon}
                                                                    className=" big-dots"/>
                                                                </div>
                                                                <p className="mb-md-3 mt-2 ml-1 ml-md-0 mt-md-0">4567 1345 1238 345</p>
                                                                <div className="ml-1 ml-md-0 sm-font"><span
                                                                    className="mr-5 mb-1 sm-font">3456</span><span>09/22</span>
                                                                </div>
                                                                <div><img className="card-img-icon"
                                                                          src={visaImage}/>
                                                                </div>
                                                            </div>
                                                            <div className="bank-card blue-gradient mb-2 mb-md-0 ">
                                                                <div className="d-flex justify-content-end"><img
                                                                    src={menuIcon}
                                                                    className=" big-dots"/>
                                                                </div>
                                                                <p className="mb-md-3  mt-2 ml-1 ml-md-0">4567 1345 1238 345</p>
                                                                <div className="ml-1 ml-md-0 sm-font"><span
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
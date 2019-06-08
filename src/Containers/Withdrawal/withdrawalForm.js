import React, {Component, Fragment} from 'react';
import totalBalanceIcon from "../../admin/app-assets/images/svg/total-balance-icon.svg";

class WithdrawalForm extends Component {
    render() {
        return (
            <Fragment>
                <div className="card curved-radius"
                     data-height="60px">
                    <div className="card-content collapse show" >
                        <div className="card-body px-5">
                            <form className="form lock-form">
                                <div className="form-body">
                                    <div className="row mb-3">
                                        <div className="col-lg-12">
                                            <h5>Central Vault balance</h5>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="media d-flex pb-2 pb-md-5">
                                                <div className="align-self-center">
                                                    <img className="blue-card-icon" src={totalBalanceIcon}/>
                                                </div>
                                                <div className="media-body text-left pt-1 ">
                                                    <h3 className=" ">
                                                        <strong className="blue-card-price ml-2 mr-2">
                                                            <strong>₦</strong> 500,000
                                                        </strong>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <button className={'btn btn-withdraw round mb-2 '}>See withdrawal Days</button>
                                                <p className={'text-gray'}>Next free withdrawal day</p>
                                                <h4 className={'text-black'}>22n october 2019</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-lg-12">
                                            <h5>Withdrawal Form</h5>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Amount</label>
                                                <input
                                                    type="number"
                                                    id="name"
                                                    className="form-control mb-1"
                                                    name="amount"
                                                    defaultValue={''}
                                                />

                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="annualincome">Select Bank</label>
                                                <select id="annualincome"
                                                        name="interested"
                                                        className="form-control">
                                                    <option value="none" selected=""
                                                            disabled="">Less
                                                        than ₦ 15,000
                                                    </option>
                                                    <option value="design">design
                                                    </option>
                                                    <option
                                                        value="development">development
                                                    </option>
                                                    <option
                                                        value="illustration">illustration
                                                    </option>
                                                    <option
                                                        value="branding">branding
                                                    </option>
                                                    <option value="video">video
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="form-actions d-flex justify-content-center justify-content-md-end">
                                    <button type="button"
                                            className="btn  btn-bg-shade-2 px-3 py-1 round pull-right">Withdraw
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default WithdrawalForm;
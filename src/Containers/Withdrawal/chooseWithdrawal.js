import React, {Component, Fragment} from 'react';
import totalBalanceIcon from "../../admin/app-assets/images/svg/total-balance-icon.svg";

class ChooseWithdrawal extends Component {
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
                                            <h5>New Withdrawal</h5>
                                        </div>
                                    </div>
                                    <div className="row mb-3">

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="annualincome">Withdraw From</label>
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
                                            className="btn  btn-bg-shade-2 px-3 py-1 round pull-right">Continue
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

export default ChooseWithdrawal;
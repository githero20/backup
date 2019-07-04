import React, {Component, Fragment} from 'react';
import {disableKey} from "../../Helpers/Helper";

class WithdrawalDateForm extends Component {
    render() {
        return (
            <Fragment>
                <div className="card curved-radius"
                     data-height="60px">
                    <div className="card-content collapse show">
                        <div className="card-body px-5">
                            <form className="form lock-form">
                                <div className="form-body">
                                    <div className="row mb-3">
                                        <div className="col-lg-12">
                                            <h5>Withdrawal Days</h5>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="first_quarter"
                                               className="col-sm-2 col-form-label">First Quarter</label>
                                        <div className="col-sm-10">
                                            <input type="date"
                                                   onKeyDown={disableKey}
                                                   onKeyUp={disableKey}
                                                   className="form-control"
                                                   id="first_quarter"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="second_quarter"
                                               className="col-sm-2 col-form-label">Second Quarter</label>
                                        <div className="col-sm-10">
                                            <input type="date"
                                                   onKeyDown={disableKey}
                                                   onKeyUp={disableKey}
                                                   className="form-control"
                                                   id="second_quarter"
                                                   placeholder="Email"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="third_quarter"
                                               className="col-sm-2 col-form-label">Third Quarter</label>
                                        <div className="col-sm-10">
                                            <input type="date"
                                                   onKeyDown={disableKey}
                                                   onKeyUp={disableKey}
                                                   className="form-control"
                                                   id="third_quarter"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="fourth_quarter"
                                               className="col-sm-2 col-form-label">Fourth Quarter</label>
                                        <div className="col-sm-10">
                                            <input type="date"
                                                   onKeyDown={disableKey}
                                                   onKeyUp={disableKey}
                                                   className="form-control"
                                                   id="fourth_quarter"
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="form-actions d-flex justify-content-center justify-content-md-end">
                                    <button type="button"
                                            className="btn  btn-custom-border px-3 py-1 round pull-right">Cancel
                                    </button>
                                    <button type="button"
                                            className="btn  btn-bg-shade-2 px-3 py-1 round pull-right">Update
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

export default WithdrawalDateForm;
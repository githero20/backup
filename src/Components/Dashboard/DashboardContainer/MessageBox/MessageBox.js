import React, {Component} from 'react';

class MessageBox extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row mb-4">
                    <div className="col-12">
                        <div
                            className="bg-white shadow-sm dashboard-callout callout-border-right clearfix callout-round callout-transparent mt-1 px-2 py-2 py-1">
                            <strong>Congrats! </strong>
                            <span className="mr-3">you referred 5 persons from [ 1 -2-2019 to 5-2-2019 ] ,
                                        <span
                                            className="admin-purple d-block d-md-inline">Your referral points earned</span>
                                    </span>
                            <span className=" d-block d-md-inline">25 points</span>
                            <label className="pull-right">
                                <span className="mr-2"> copy referral code</span>
                                <span className="code-btn">AEC45SF</span>
                            </label>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default MessageBox;
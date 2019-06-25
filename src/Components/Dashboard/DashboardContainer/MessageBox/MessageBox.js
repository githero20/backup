import React, {Component} from 'react';
import {withToastManager} from 'react-toast-notifications';

class MessageBox extends Component {


    render() {
        const {error, activateAccount, errorMessage} = this.props;


        return (
            <React.Fragment>
                <div className="row mb-4">
                    <div className="col-12">

                        <div
                            className={'bg-white shadow-sm dashboard-callout callout-border-right' +
                            ' d-flex justify-content-between align-items-center callout-round callout-transparent ' +
                            'mt-1 px-2 py-2 py-1'}>
                            <label>
                                <strong>Congrats! </strong>
                                <span>You referred 5 persons from [ 1 -2-2019 to 5-2-2019 ] ,
                                    <span className="admin-purple d-block d-md-inline">Your referral points earned
                                    </span>
                                </span>
                                <span className=" d-block d-md-inline ml-1">25 points
                                </span>
                            </label>
                            <label>
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

export default withToastManager(MessageBox);
import React, {Component} from 'react';

class MessageBox extends Component {




    render() {
        const {error,activateAccount ,errorMessage} = this.props;


        return (
            <React.Fragment>
                <div className="row mb-4">
                    <div className="col-12">
                        <div
                            className="bg-white shadow-sm dashboard-callout callout-border-right d-flex justify-content-between callout-round callout-transparent mt-1 px-2 py-2 py-1">

                            {
                                error ?
                                    (
                                        <p className={'text-danger'}>
                                            {errorMessage==='Account has not been activated, click on resend'?
                                                (
                                                    <span>
                                                         Your Account Has not been activated. Kindly click the
                                                        <button onClick={activateAccount} className={'btn-danger px-2 round'}>link</button> to
                                                        register
                                                    </span>
                                                )
                                                    :errorMessage}
                                        </p>
                                    )
                                    :
                                    (
                                        <React.Fragment>
                                            <label>
                                                <strong>Congrats! </strong>
                                                <span>you referred 5 persons from [ 1 -2-2019 to 5-2-2019 ] ,<span
                                                    className="admin-purple d-block d-md-inline">Your referral points earned
                                            </span>
                                             </span>
                                                <span className=" d-block d-md-inline ml-1">25 points</span>
                                            </label>
                                            <label>
                                                <span className="mr-2"> copy referral code</span>
                                                <span className="code-btn">AEC45SF</span>
                                            </label>
                                        </React.Fragment>
                                )
                            }

                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default MessageBox;
import React, {Component} from 'react';

class MessageBox extends Component {




    render() {
        const {error,activateAccount ,errorMessage} = this.props;


        return (
            <React.Fragment>
                <div className="row mb-4">
                    <div className="col-12">

                        {error ?

                            <div className={error?'border-top-red shadow-sm dashboard-callout callout-border-right d-flex justify-content-between  align-items-center callout-round callout-transparent mt-1 px-2 py-2 py-1'
                                :'bg-white shadow-sm dashboard-callout callout-border-right d-flex justify-content-between align-items-center callout-round callout-transparent mt-1 px-2 py-2 py-1'}>

                                {
                                    error ?
                                        (
                                            <p>
                                                {errorMessage} Kindly check your email to activate your account or click the &nbsp;
                                                <button onClick={activateAccount} className={'btn-danger px-2 round'}>link</button> to resend activation email
                                            </p>
                                        )
                                        :null
                                    //     (
                                    //         <React.Fragment>
                                    //             <label>
                                    //                 <strong>Congrats! </strong>
                                    //                 <span>you referred 5 persons from [ 1 -2-2019 to 5-2-2019 ] ,<span
                                    //                     className="admin-purple d-block d-md-inline">Your referral points earned
                                    //             </span>
                                    //              </span>
                                    //                 <span className=" d-block d-md-inline ml-1">25 points</span>
                                    //             </label>
                                    //             <label>
                                    //                 <span className="mr-2"> copy referral code</span>
                                    //                 <span className="code-btn">AEC45SF</span>
                                    //             </label>
                                    //         </React.Fragment>
                                    // )
                                }

                            </div>
                            :null}

                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default MessageBox;
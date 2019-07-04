import React, {Component} from 'react';
import {withToastManager} from 'react-toast-notifications';
import {capitalize, formatNumber, STANDARD_ACCOUNT, toastMessage} from "../../../../Helpers/Helper";
import {getLocalStorage} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {KycSettingLink} from "../../../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';
import {getUserPoints} from "../../../../actions/UserAction";

class MessageBox extends Component {

    state = {
        copySuccess: false,
        userName: '',
        userReferralLink: '',
        userCode: '',
        userPoint: '',
        updateKyc: false,
        balance: '0.00'
    };


    componentWillMount() {

        //get item from local storage
        const data = getLocalStorage(USERINFO);
        this.checkBalance(data);

        let name = `${data.name} ${data.last_name!= null ? data.last_name:''}`;

        this.setState({
            userName: name,
            userReferralLink: data.referral_link,
            userCode: data.referral_code,

        });
        // if the balance is more than 1,000,000 display as an info to user so they can update kyc

        // add  styling to the message box

        // display info to link use ot kyc

    }

    checkBalance = (data) => {
        if (data.accounts) {

            // loop through data and set appropriate states
            let accounts = data.accounts.data;

            accounts.map((content, idx) => {
                if (content.account_type_id === STANDARD_ACCOUNT) {
                    if (parseFloat(content.balance).toFixed(2) >= 1000000) {

                        this.setState({
                            updateKyc: true,
                            balance: content.balance
                        }, () => {
                        });
                    }
                }
            });


        }


    };


    copyToClipboard = (e) => {

        // let text = document.getElementById("referral_code").value;
        console.log(this.state.userName);

        let textField = document.createElement('textarea');

        const referralText =
            this.state.userName ? capitalize(this.state.userName) : null;
        const otherText = 'invites you to save for the rainy day on BackUpCash.' +
            '\n It is a financial planning tool designed to help you automate ' +
            'savings towards a financial goal. Sign-up and get started using the link below: \n';
        textField.innerText = referralText + ' ' + otherText + this.state.userReferralLink;

        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        toastMessage('Copied!', 'success',this);
        //
        // document.getElementById('referral_code').value();
        // document.execCommand('copy');
        // // This is just personal preference.
        // // I prefer to not show the the whole text area selected.
        // e.target.focus();
        this.setState({copySuccess: true});
    };


    componentDidMount() {
        getUserPoints(this.handlePoints);
    }

    handlePoints = (status, res) => {
        if (status) {
            this.setState({userPoint: res})
        } else if (!status && res) {
            console.log('points error', status, res);
        }

    };


    render() {

        const kycInfo = (
            <React.Fragment>
                <span className='mb-1 mb-md-0'>
                    <strong>Hello {this.state.userName}! </strong>
                    Your have currently saved up to ₦ {formatNumber(Number(this.state.balance).toFixed(2))}
                </span>
                <span className="admin-purple">
                    <strong><Link to={KycSettingLink}
                                   className='purple-link text-uppercase'>Kindly click this link to update your kyc</Link></strong>.
                </span>
            </React.Fragment>
        );

        const referralInfo = (
            <React.Fragment>
                {/*<span>*/}
                {/*    <strong>Congrats! </strong>*/}
                {/*    You referred 5 persons from [ 1 -2-2019 to 5-2-2019 ] ,*/}
                {/*</span>*/}
                <div className="admin-purple d-block d-md-inline">Your referral points earned
                    <strong className=" d-block d-md-inline ml-1">{this.state.userPoint?this.state.userPoint:0} points</strong>
                </div>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                {
                    this.state.updateKyc ? (
                        <div className="row mb-1">
                            <div className="col-12">
                                <div className={'bg-white shadow-sm dashboard-callout callout-border-right' +
                                ' d-flex flex-column flex-md-row justify-content-between align-items-center callout-round callout-transparent ' +
                                'mt-1 px-2 py-2 py-1'}>
                                    {/*<label className='d-flex justify-content-between flex-md-row'>*/}
                                    {kycInfo}
                                    {/*</label>*/}
                                    {/*<label>*/}
                                    {/*    <span className="mr-2"> copy referral code</span>*/}
                                    {/*    <span className="code-btn" onClick={this.copyToClipboard}>AEC45SF</span>*/}
                                    {/*</label>*/}
                                </div>
                            </div>
                        </div>
                    ) : null}
                <div className="row mb-2">
                    <div className="col-12">
                        <div className={'bg-white shadow-sm dashboard-callout callout-border-right' +
                        ' d-flex flex-column flex-md-row flex-wrap justify-content-md-between align-items-center callout-round callout-transparent ' +
                        'mt-1 px-2 py-2 py-1'}>
                            <label className='d-flex flex-column align-items-center flex-md-row justify-content-md-center'>
                                {referralInfo}
                            </label>
                            <label className='d-flex flex-md-row align-items-center flex-column'>
                                <span className="mr-2 mb-1 mb-md-0"> copy referral code</span>
                                <span className="code-btn" onClick={this.copyToClipboard}>AEC45SF</span>
                            </label>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withToastManager(MessageBox);
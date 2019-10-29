import React, {Component} from 'react';
import {withToastManager} from 'react-toast-notifications';
import {capitalize, formatNumber, toastMessage} from "../../../../Helpers/Helper";
import {getLocalStorage} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {
    BASE_URL,
    getSteadySaveEndpoint,
    KycSettingLink,
    ReferralsLink,
    SteadySaveLink
} from "../../../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';
import {getUserPoints} from "../../../../actions/UserAction";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";

class MessageBox extends Component {

    state = {
        userName: '',
        userReferralLink: '',
        userCode: '',
        userPoint: '',
        numOfUser: '',
        updateKyc: false,
        balance: '0.00',
        show: false,
    };


    componentWillMount() {

        //get item from local storage
        const data = getLocalStorage(USERINFO);

        let name = `${data.name} ${data.last_name != null ? data.last_name : ''}`;
        this.setState({
            userName: name,
            userReferralLink: window.location.origin+'/invite/'+data.referral_code,
            userCode: data.referral_code,

        });
        // if the balance is more than 1,000,000 display as an info to user so they can update kyc

        // add  styling to the message box

        // display info to link use ot kyc

    }

    copyToClipboard = (e) => {

        // let text = document.getElementById("referral_code").value;

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
        toastMessage('Copied!', 'success', this);
    };

    copyLink = (e) => {
        let textField = document.createElement('textarea');
        textField.innerText = this.state.userCode;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        toastMessage('Copied!', 'success', this);
    };


    componentDidMount() {
        getUserPoints(this.handlePoints);
        //get

    }

    handlePoints = (status, res) => {
        console.log('res', res);
        if (status) {
            this.setState({userPoint: res.data, numOfUser: res.user})
        } else if (!status && res) {
            console.log('points error', status, res);
        }

    };
    handleClose = () => {
        this.setState({show: false})
    };
    showModal = () => {
        this.setState({show: true})
    };


    render() {
        const {show} = this.state;

        const referralText =
            this.state.userName ? capitalize(this.state.userName) : null;
        const otherText = 'invites you to save for the rainy day on BackUpCash.' +
            '\n It is a financial planning tool designed to help you automate ' +
            'savings towards a financial goal. Sign-up and get started using the link below: \n';
        let fullRefText = referralText + ' ' + otherText + this.state.userReferralLink;

        const kycInfo = (
            <React.Fragment>
                <span className='mb-1 mb-md-0'>
                    <strong>Hello {this.state.userName}! </strong>
                    Your have currently saved up to ₦ {formatNumber(Number(this.props.balance).toFixed(2))}
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
                <div className="admin-purple d-block d-md-inline cursor-pointer">
                    You have referred <strong
                    className='font-weight-bold bc-deep-purple'>{this.state.numOfUser ? this.state.numOfUser : 0}</strong> users &nbsp; | &nbsp; Your
                    referral points
                    earned
                    <Link to={ReferralsLink}>
                        <strong
                            className="d-md-inline ml-1 font-weight-bold br-2 bc-gray-white py-0-2 px-2">
                            {this.state.userPoint ? this.state.userPoint : 0} points
                            <i className='ml-1 fa fa-arrow-right text-white'/></strong>
                    </Link>&nbsp;
                    <OverlayTrigger
                        placement={'right'}
                        overlay={
                            <Tooltip id={`tooltip-${'right'}`}>
                                You will get 10 Referral Points for every of your referred users that saves at least
                                N500
                            </Tooltip>
                        }
                    >
                        <strong className='bc-deep-purple'>&nbsp;(?)</strong>
                    </OverlayTrigger>

                </div>
            </React.Fragment>
        );

        if(this.props.challenge){
            return (
                <div className="row mb-2">
                    <div className="col-12">
                        <div className='bg-blue-1 shadow-sm dashboard-callout callout-border-right d-flex flex-column
                        flex-md-row flex-wrap justify-content-md-between align-items-center
                         callout-round callout-transparent px-2'>
                            <label
                                className='d-flex flex-column align-items-center text-white flex-md-row justify-content-md-center'>
                                <span>Get started with 21 days challenge and stand a chance to win big!! </span>
                            </label>
                            <label className='d-flex flex-md-row flex-wrap flex-column align-items-center'>
                                <span className="mr-md-2 mb-1 text-center text-md-left mb-md-0 flex-grow-1"/>
                                <div className='d-flex justify-content-between  d-md-inline-block flex-grow-1'>
                                    <Link to={SteadySaveLink} className="btn-white-bordered round px-md-2 mr-2 mb-md-0">Start now</Link>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <React.Fragment>
                {
                    this.props.updateKyc ? (
                        <div className="row mb-1">
                            <div className="col-12">
                                <div
                                    className={'bg-white shadow-sm dashboard-callout text-center text-md-left callout-border-right' +
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
                        <div className='bg-white shadow-sm dashboard-callout callout-border-right d-flex flex-column
                        flex-md-row flex-wrap justify-content-md-between align-items-center
                         callout-round callout-transparent px-2'>
                            <label
                                className='d-flex flex-column align-items-center flex-md-row justify-content-md-center'>
                                {referralInfo}
                            </label>
                            <label className='d-flex flex-md-row flex-wrap flex-column align-items-center'>
                                <span className="mr-md-2 mb-1 text-center text-md-left mb-md-0 flex-grow-1"> copy referral code</span>
                                <div className='d-flex justify-content-between  d-md-inline-block flex-grow-1'>
                                    <span className="code-btn mr-2 mb-md-0 "
                                          onClick={this.copyLink}>{this.state.userCode}</span>
                                    <span className="code-btn" onClick={this.showModal}>Share Code</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <Modal className={'steady-save-modal mt-5 pt-5'} show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Share Referral Code </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center px-5 pb-3">
                            <a className='a-twitter mr-2' href={`https://twitter.com/intent/tweet?text=${fullRefText}`}
                               target='_blank'>
                                <i className='fa fa-4x fa-twitter'/>
                            </a>
                            {/*<a className='a-facebook' href="#" target='_blank'>*/}
                            {/*    <i className='fa fa-4x fa-facebook'/>*/}
                            {/*</a>*/}
                            <a className='a-whatsapp' href={`https://api.whatsapp.com/send?text=${fullRefText}`}
                               target='_blank'>
                                <i className='fa fa-4x fa-whatsapp'/>
                            </a>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withToastManager(MessageBox);
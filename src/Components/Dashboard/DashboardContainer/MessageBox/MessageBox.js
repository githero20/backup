import React, {Component} from 'react';
import {withToastManager} from 'react-toast-notifications';
import {capitalize, formatNumber, toastMessage} from "../../../../Helpers/Helper";
import {getLocalStorage} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {KycSettingLink, ReferralsLink, scoreboardLink} from "../../../../RouteLinks/RouteLinks";
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
        amount: 0,
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
            userReferralLink: window.location.origin + '/invite/' + data.referral_code,
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
        if (status) {
            this.setState({userPoint: res.data.point, amount: res.data.amount, numOfUser: res.user})
        }

    };
    handleClose = () => {
        this.setState({show: false})
    };
    showModal = () => {
        this.setState({show: true})
    };


    render() {
        const {show, numOfUser} = this.state;
        const {challenge} = this.props;

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
                <div className="admin-purple d-flex flex-column flex-grow-1 justify-content-lg-between flex-lg-row cursor-pointer">
                    <div className='mb-1 mb-lg-0'>
                        You have referred &nbsp;
                        <strong className='font-weight-bold bc-deep-purple'>
                        {numOfUser ? numOfUser : 0}
                    </strong>
                        &nbsp; {numOfUser <= 1 ? 'user' : 'users'}
                    </div>

                    <div className='mb-1 mb-lg-0'>Referral points earned
                    <Link to={ReferralsLink} className='d-block mt-1 mt-md-0 d-md-inline'>
                        <strong className="d-md-inline  ml-md-1 font-weight-bold br-2 bc-blue-white py-0-2 px-2">
                            {this.state.userPoint ? this.state.userPoint : 0} points
                            <i className='ml-1 fa fa-arrow-right text-white'/>
                        </strong>
                        <OverlayTrigger
                            placement={'right'}
                            overlay={
                                <Tooltip id={`tooltip-${'right'}`}>
                                    You will get 10 Referral Points for every of your referred users that saves at least
                                    N500
                                </Tooltip>
                            }
                        >
                            <strong className='bc-deep-purple ml-1'>&nbsp;(?)</strong>
                        </OverlayTrigger>
                    </Link>

                    </div>

                    <div>
                        Referral balance
                    <span className='d-block mt-1 mt-md-0 d-md-inline'>
                        <strong className="d-md-inline  ml-md-1 font-weight-bold br-2 bc-blue-white py-0-2 px-2">
                             {this.state.amount ? formatNumber(this.state.amount) : 0}
                            <i className='ml-1 fa fa-arrow-right text-white'/>
                        </strong>
                        <OverlayTrigger
                            placement={'right'}
                            overlay={
                                <Tooltip id={`tooltip-${'right'}`}>
                                    You will get 10 Referral Points for every of your referred users that saves at least
                                    N500
                                </Tooltip>
                            }
                        >
                            <strong className='bc-deep-purple ml-1'>&nbsp;(?)</strong>
                        </OverlayTrigger>
                    </span> &nbsp;
                    </div>

                </div>
            </React.Fragment>
        );

        if (challenge) {
            return (
                <div className="row mb-2">
                    <div className="col-12">
                        <div className='bg-blue-1 shadow-sm dashboard-callout callout-border-right d-flex flex-column
                         flex-md-row flex-wrap justify-content-md-between align-items-md-center callout-round
                          callout-transparent py-1 py-md-1 px-2'>
                            <label
                                className='d-flex flex-column align-items-center text-white flex-md-row justify-content-md-center'>
                                <span>
                                    {/*Save, Refer & Win!. Join the 21 Day Savings Challenge from 1st – 21st of November*/}
                                    View your money score card this year
                                </span>
                            </label>
                            <label
                                className='d-flex mt-1 mt-lg-0 mb-lg-0 flex-md-row flex-wrap flex-column align-items-md-center'>
                                <span className="mr-md-2 mb-1 text-center text-md-left mb-md-0 flex-grow-1"/>
                                <div
                                    className='d-flex justify-content-lg-between  justify-content-center d-md-inline-block flex-grow-1'>
                                    <a href={scoreboardLink} target='_blank'
                                       className="btn-white-bordered round px-2 mr-md-2 mb-md-0">View now</a>
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
                                    {kycInfo}
                                </div>
                            </div>
                        </div>
                    ) : null}

                <div className="row mb-2">
                    <div className="col-12">
                        <div className='bg-white shadow-sm dashboard-callout callout-border-right d-flex flex-column
                        flex-md-row flex-wrap justify-content-md-between align-items-md-center
                        callout-round callout-transparent px-2 mb-2'>
                            <label
                                className='d-flex flex-column flex-md-row flex-grow-1'>
                                {referralInfo}
                            </label>
                        </div>

                        <div className='bg-white shadow-sm dashboard-callout callout-border-right d-flex flex-column
                        flex-md-row flex-wrap justify-content-md-between justify-content-lg-end align-items-md-center
                        callout-round callout-transparent px-2'>
                            <label className='d-flex flex-md-row flex-wrap flex-column align-items-md-center'>
                                <span
                                    className="mr-md-2 mb-1 text-md-left mb-md-0 flex-grow-1"> copy referral code</span>
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
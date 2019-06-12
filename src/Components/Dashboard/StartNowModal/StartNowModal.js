import React from 'react';
import Modal from "react-bootstrap/Modal";
import StartNowButton from "../StartNowButton/StartNowButton";
import {BackupGoalsLink, InstantSaveLink, LockedSavingsLink, SteadySaveLink} from "../../../RouteLinks/RouteLinks";
import {SHOWAD} from "../../Auth/HOC/authcontroller";
import InstantSaveIcon from "../../../admin/app-assets/images/svg/instant-save.svg";
import SSIcon from "../../../admin/app-assets/images/svg/steady-save.svg";
import LSIcon from "../../../admin/app-assets/images/svg/locked-save.svg";
import BGIcon from "../../../admin/app-assets/images/svg/backup-goal.svg";

class StartNowModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false,
            startLink: InstantSaveLink,
            Desc: 'Start saving your money here whenever you want! \n' +
                'We want you to be disciplined, so we’ll charge you 5% if you choose\n' +
                ' to withdraw outside of your set withdrawal days.',
        };

    }


    instantHandler = () => {
        this.setState({
            startLink: InstantSaveLink,
            Desc: 'Start saving your money here whenever you want! \n' +
                'We want you to be disciplined, so we’ll charge you 5% if you choose\n' +
                ' to withdraw outside of your set withdrawal days.'
        })
        localStorage.setItem(SHOWAD, 'dont_show');
    }

    lockedHandler = () => {
        this.setState({
            startLink: LockedSavingsLink,
            Desc: 'Earn your interest upfront, but you need to lock your money with \n' +
                'us for a period set by you. You can withdraw at the \n' +
                'end of the period you have set.'
        })
        localStorage.setItem(SHOWAD, 'dont_show');

    }

    backupHandler = () => {
        this.setState({
            startLink: BackupGoalsLink,
            Desc: 'Want to save towards a new phone, car or rent? \n' +
                'Setup a savings goal and be on your way to greatness.'
        });
        localStorage.setItem(SHOWAD, 'dont_show');
    }


    steadyHandler = () => {

        this.setState({
            startLink: SteadySaveLink,
            Desc: 'Start saving your money here automatically, daily, weekly or monthly\n' +
                'We want you to be disciplined, so we’ll charge you 5% if you choose\n' +
                ' to withdraw outside of your set withdrawal days.'
        });
        localStorage.setItem(SHOWAD, 'dont_show');
    }


    render() {


        // modal

        // top image

        //four image container

        // on select becomes highlighted

        // description shows and link changes

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'steady-save-modal ad-container-modal'}
            >
                <Modal.Header className={' px-md-3 pt-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3 className={'text-center text-md-left'}>Get Started</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    <div
                        className='ad-container d-flex flex-column pt-3 pt-lg-5 mt-lg-3 flex-md-row justify-content-between'>
                        <div onClick={this.instantHandler} className={'ad-placeholder ad-active'}><img
                            alt={'instant-save'} className={'ad-img'} src={InstantSaveIcon}/><p>Instant Save</p></div>
                        <div onClick={this.steadyHandler} className={'ad-placeholder'}><img className={'ad-img'}
                                                                                            alt={'steady-save'}
                                                                                            src={SSIcon}/><p>Steady
                            Save</p></div>
                        <div onClick={this.backupHandler} className={'ad-placeholder'}><img className={'ad-img'}
                                                                                            alt={'backup-goals'}
                                                                                            src={BGIcon}/><p>Backup
                            Goals</p></div>
                        <div onClick={this.lockedHandler} className={'ad-placeholder'}><img className={'ad-img'}
                                                                                            alt={'locked-savings'}
                                                                                            src={LSIcon}/><p>Locked
                            Savings</p></div>
                    </div>
                    <div className={'ad-desc-placeholder text-center px-3 px-lg-5 py-lg-5 py-3'}>{this.state.Desc}</div>
                    <div className="ad-links d-flex justify-content-center justify-content-md-end">
                        <StartNowButton link={this.state.startLink}/>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default StartNowModal;
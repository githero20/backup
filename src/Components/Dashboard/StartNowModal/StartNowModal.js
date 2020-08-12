import React from 'react';
import Modal from "react-bootstrap/Modal";
import StartNowButton from "../StartNowButton/StartNowButton";
import { BackupGoalsLink, InstantSaveLink, LockedSavingsLink, SteadySaveLink } from "../../../RouteLinks/RouteLinks";
import { SHOWAD } from "../../Auth/HOC/authcontroller";
import InstantSaveIcon from "../../../admin/app-assets/images/svg/instant-save.svg";
import SSIcon from "../../../admin/app-assets/images/svg/steady-save.svg";
import LSIcon from "../../../admin/app-assets/images/svg/locked-save.svg";
import BGIcon from "../../../admin/app-assets/images/svg/backup-goal.svg";
import markSelected from "../../../admin/app-assets/images/svg/mark-selected.svg";
import { storeFirstTimeLogin } from "../../../actions/UserAction";
import ReactOwlCarousel from "react-owl-carousel";

class StartNowModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startLink: InstantSaveLink,
            InstantSaveLink: InstantSaveLink,
            LockedSavingsLink: LockedSavingsLink,
            BackupGoalsLink: BackupGoalsLink,
            SteadySaveLink: SteadySaveLink,
            Desc: 'Start saving your money here whenever you want! \n' +
                'We want you to be disciplined, so we’ll charge you 5% if you choose\n' +
                ' to withdraw outside of your set withdrawal days.',
            isDesc: 'Start saving your money here whenever you want! \n' +
                'We want you to be disciplined, so we’ll charge you 5% if you choose\n' +
                ' to withdraw outside of your set withdrawal days.',
            lsDesc: 'Earn your interest upfront, but you need to lock your money with \n' +
                'us for a period set by you. You can withdraw at the \n' +
                'end of the period you have set.',
            bgDesc: 'Want to save towards a new phone, car or rent? \n' +
                'Setup a savings goal and be on your way to greatness.',
            ssDesc: 'Start saving your money here automatically, daily, weekly or monthly\n' +
                'We want you to be disciplined, so we’ll charge you 5% if you choose\n' +
                ' to withdraw outside of your set withdrawal days.',
            showBackupGoal: false,
            showSteadySave: false,
            showLockedSave: false,
            showInstantSave: true,
        };

    }

    handleFirstTimeLogin = (status, response) => {
        if (status && response) {
            console.log('res', response);
        }
    };

    instantHandler = () => {
        this.setState({
            startLink: InstantSaveLink,
            showBackupGoal: false,
            showSteadySave: false,
            showLockedSave: false,
            showInstantSave: true,
            isDesc: 'Start saving your money here whenever you want! \n' +
                'We want you to be disciplined, so we’ll charge you 5% if you choose\n' +
                ' to withdraw outside of your set withdrawal days.',
            Desc: this.state.isDesc
        });
        // localStorage.setItem(SHOWAD, 'dont_show');
        storeFirstTimeLogin(this.handleFirstTimeLogin);
    }

    lockedHandler = () => {
        this.setState({
            startLink: LockedSavingsLink,
            showBackupGoal: false,
            showSteadySave: false,
            showLockedSave: true,
            showInstantSave: false,
            lsDesc: 'Earn your interest upfront, but you need to lock your money with \n' +
                'us for a period set by you. You can withdraw at the \n' +
                'end of the period you have set.',
            Desc: this.state.lsDesc
        })
        // localStorage.setItem(SHOWAD, 'dont_show');
        storeFirstTimeLogin(this.handleFirstTimeLogin);

    }

    backupHandler = () => {
        this.setState({
            startLink: BackupGoalsLink,
            showBackupGoal: true,
            showSteadySave: false,
            showLockedSave: false,
            showInstantSave: false,
            bgDesc: 'Want to save towards a new phone, car or rent? \n' +
                'Setup a savings goal and be on your way to greatness.',
            Desc: this.state.bgDesc
        });

        // localStorage.setItem(SHOWAD, 'dont_show');
        storeFirstTimeLogin(this.handleFirstTimeLogin);

    }



    steadyHandler = () => {

        this.setState({
            startLink: SteadySaveLink,
            showBackupGoal: false,
            showSteadySave: true,
            showLockedSave: false,
            showInstantSave: false,
            ssDesc: 'Start saving ytomatically, daily, weekly or monthly\n' +
                'We want you to be disciplined, so we’ll charge you 5% if you choose\n' +
                ' to withdraw outside of your set withdrawal days.',
            Desc: this.state.ssDesc
        });
        // localStorage.setItem(SHOWAD, 'dont_show');
        storeFirstTimeLogin(this.handleFirstTimeLogin);
    };



    render() {

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
                    <div className='ad-container d-none d-md-flex flex-column pt-1 pt-md-3 pt-lg-5 mt-lg-3 align-items-center flex-md-row justify-content-between'>
                        <div onClick={this.instantHandler} onMouseEnter={this.instantHandler}
                            onMouseLeave={this.instantHandler} className={`ad-placeholder ${this.state.showInstantSave ? 'active' : ''} `}>
                            <img alt={'instant-save'} className={'ad-img'} src={InstantSaveIcon} />
                            <p>Instant Save<img className={this.state.showInstantSave ? 'active' : null} src={markSelected} /></p>
                            <div className={'ad-desc-placeholder d-block d-md-none text-center px-0 px-lg-5 py-lg-1 '}>{this.state.isDesc}</div>
                            <div className="ad-links d-flex justify-content-center d-block d-md-none justify-content-md-end">
                                <StartNowButton link={this.state.InstantSaveLink} />
                            </div>
                        </div>
                        <div onClick={this.steadyHandler} onMouseEnter={this.steadyHandler}
                            onMouseLeave={this.steadyHandler} className={`ad-placeholder ${this.state.showSteadySave ? 'active' : ''}`}>
                            <img className={'ad-img'} alt={'steady-save'} src={SSIcon} />
                            <p>Steady Save<img className={this.state.showSteadySave ? 'active' : null} src={markSelected} /></p>
                            <div className={'ad-desc-placeholder d-block d-md-none text-center px-0 px-lg-5 py-lg-1 '}>{this.state.ssDesc}</div>
                            <div className="ad-links d-flex justify-content-center d-block d-md-none justify-content-md-end">
                                <StartNowButton link={this.state.SteadySaveLink} />
                            </div>
                        </div>
                        <div onClick={this.lockedHandler} onMouseLeave={this.lockedHandler}
                            onMouseEnter={this.lockedHandler} className={`ad-placeholder ${this.state.showLockedSave ? 'active' : ''}`}>
                            <img className={'ad-img'} alt={'locked-savings'} src={LSIcon} />
                            <p>Locked Savings<img className={this.state.showLockedSave ? 'active' : null} src={markSelected} /></p>
                            <div className={'ad-desc-placeholder d-block d-md-none text-center px-0 px-lg-5 py-lg-1 '}>{this.state.lsDesc}</div>
                            <div className="ad-links d-flex justify-content-center d-block d-md-none justify-content-md-end">
                                <StartNowButton link={this.state.LockedSavingsLink} />
                            </div>
                        </div>
                        <div onClick={this.backupHandler} onMouseEnter={this.backupHandler}
                            onMouseLeave={this.backupHandler} className={`ad-placeholder ${this.state.showBackupGoal ? 'active' : ''}`}>
                            <img className={'ad-img'} alt={'backup-goals'} src={BGIcon} />
                            <p>Backup Goals<img className={this.state.showBackupGoal ? 'active' : null} src={markSelected} /></p>
                            <div className={'ad-desc-placeholder d-block d-md-none text-center px-0 px-lg-5 py-lg-1 '}>{this.state.bgDesc}</div>
                            <div className="ad-links d-flex justify-content-center d-block d-md-none justify-content-md-end">
                                <StartNowButton link={this.state.BackupGoalsLink} />
                            </div>
                        </div>
                    </div>

                    <ReactOwlCarousel
                        className="owl-theme ad-container hero-carousel d-md-none"
                        loop
                        margin={10}
                        autoplay={1000}
                        autoplayTimeout={5000}
                        dots={false}
                        responsiveClass={true}
                        items={1}
                        nav={true}
                    >
                        <div onClick={this.instantHandler} onMouseEnter={this.instantHandler}
                            onMouseLeave={this.instantHandler} className={'ad-placeholder'}>
                            <img alt={'instant-save'} className={'ad-img'} src={InstantSaveIcon} />
                            <p>Instant Save<img src={markSelected} /></p>
                            <div className={'ad-desc-placeholder d-block d-md-none text-center px-0 px-lg-5 py-lg-1 '}>{this.state.isDesc}</div>
                            <div className="ad-links d-flex justify-content-center d-block d-md-none justify-content-md-end">
                                <StartNowButton link={this.state.InstantSaveLink} />
                            </div>
                        </div>
                        <div onClick={this.steadyHandler} onMouseEnter={this.steadyHandler}
                            onMouseLeave={this.steadyHandler} className={'ad-placeholder'}>
                            <img className={'ad-img'} alt={'steady-save'} src={SSIcon} />
                            <p>Steady Save<img src={markSelected} /></p>
                            <div className={'ad-desc-placeholder d-block d-md-none text-center px-0 px-lg-5 py-lg-1 '}>{this.state.ssDesc}</div>
                            <div className="ad-links d-flex justify-content-center d-block d-md-none justify-content-md-end">
                                <StartNowButton link={this.state.SteadySaveLink} />
                            </div>
                        </div>
                        <div onClick={this.lockedHandler} onMouseLeave={this.lockedHandler}
                            onMouseEnter={this.lockedHandler} className={'ad-placeholder'}>
                            <img className={'ad-img'} alt={'locked-savings'} src={LSIcon} />
                            <p>Locked Savings<img src={markSelected} /></p>
                            <div className={'ad-desc-placeholder d-block d-md-none text-center px-0 px-lg-5 py-lg-1 '}>{this.state.lsDesc}</div>
                            <div className="ad-links d-flex justify-content-center d-block d-md-none justify-content-md-end">
                                <StartNowButton link={this.state.LockedSavingsLink} />
                            </div>
                        </div>
                        <div onClick={this.backupHandler} onMouseEnter={this.backupHandler}
                            onMouseLeave={this.backupHandler} className={'ad-placeholder'}>
                            <img className={'ad-img'} alt={'backup-goals'} src={BGIcon} />
                            <p>Backup Goals<img src={markSelected} /></p>
                            <div className={'ad-desc-placeholder d-block d-md-none text-center px-0 px-lg-5 py-lg-1 '}>{this.state.bgDesc}</div>
                            <div className="ad-links d-flex justify-content-center d-block d-md-none justify-content-md-end">
                                <StartNowButton link={this.state.BackupGoalsLink} />
                            </div>
                        </div>
                    </ReactOwlCarousel>
                    <div className='ad-desc-placeholder d-none d-md-block text-center px-lg-5 py-lg-1 py-3'>
                        {this.state.Desc}
                    </div>
                    <div className="ad-links d-md-flex d-none justify-content-center justify-content-md-end">
                        <StartNowButton link={this.state.startLink} />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default StartNowModal;
import React from 'react';
import Modal from "react-bootstrap/Modal";
import StartNowButton from "../StartNowButton/StartNowButton";
import {BackupGoalsLink, InstantSaveLink, LockedSavingsLink, SteadySaveLink} from "../../../RouteLinks/RouteLinks";
import {SHOWAD} from "../../Auth/HOC/authcontroller";

class StartNowModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false,
            startLink: InstantSaveLink,
            Desc:'Welcome to Instant Save',
        };

    }


    instantHandler = ()=>{
        this.setState({
            startLink:InstantSaveLink,
            Desc:'Welcome to Instant Save'
        })
        localStorage.setItem(SHOWAD,'dont_show');
    }

    lockedHandler = ()=>{
            this.setState({
                startLink:LockedSavingsLink,
                Desc:'Welcome to Locked Savings'
            })
        localStorage.setItem(SHOWAD,'dont_show');

    }

    backupHandler = ()=>{
            this.setState({
                startLink:BackupGoalsLink,
                Desc:'Welcome to Backup goals'
            });
        localStorage.setItem(SHOWAD,'dont_show');
    }


    steadyHandler = ()=>{

            this.setState({
                startLink:SteadySaveLink,
                Desc:'Welcome to SteadySave'
            });
            localStorage.setItem(SHOWAD,'dont_show');
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
                className={'steady-save-modal'}
            >
                <Modal.Header className={' px-md-3 pt-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3 className={'text-center text-md-left'}>Get Started</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    <div className='ad-container d-flex flex-column flex-md-row justify-content-between'>
                        <div onClick={this.instantHandler} className={'ad-placeholder ad-active'}><img className={'ad-img'} src={''}/><p>Instant Save</p></div>
                        <div onClick={this.steadyHandler} className={'ad-placeholder'}><img className={'ad-img'} src={''}/><p>Steady Save</p></div>
                        <div onClick={this.backupHandler} className={'ad-placeholder'}><img className={'ad-img'} src={''}/><p>Backup Goals</p></div>
                        <div onClick={this.lockedHandler} className={'ad-placeholder'}><img className={'ad-img'} src={''}/><p>Locked Savings</p></div>
                    </div>
                    <div className={'ad-desc-placeholder'}>{this.state.Desc}</div>
                    <div className="ad-links d-flex justify-content-center justify-content-md-end">
                        <StartNowButton link={this.state.startLink} />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default StartNowModal;
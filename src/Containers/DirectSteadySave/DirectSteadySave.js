import React, {useEffect, useState} from 'react';
import {postDirectSteadySave} from "../../actions/UserAction";
import './directsave.css';
import HeaderText from "../../Components/Commons/HeaderText";
import backUpCashLogo from "../../admin/app-assets/images/Logo@2x.png";
import successIcon from "../../admin/app-assets/images/success-icon-direct-steady-saving.png";
import Section from "./Section";
import {LoginLink} from "../../RouteLinks/RouteLinks";
import {withToastManager} from 'react-toast-notifications';

DirectSteadySave.propTypes = {};

function DirectSteadySave(props) {
    const {toastManager, match: {params: {frequency}}} = props;
    const [state, setState] = useState({isset: false, loading: false, error: false});
    const {loading, isset, error} = state;
    const onCreateSteadySave = () => {
        const {userid, frequency} = props.match.params;
        setState({...state, loading: true});
        postDirectSteadySave({user_id: userid, frequency}, (status, data) => {
            setState({...state, loading: false});
            if (!status) {
                toastManager.add('Unable to create steady save at the moment!', {
                    appearance: 'error',
                    autoDismiss: 3000,
                });
                setState({...state, error: true});
                return;
            }
            setState({...state, isset: !state.isset});
        })

    };

    useEffect(() => {

    }, []);


    return (
        <>
            {
                isset ?
                    <Section className={'section--light-yellow'}>
                        <Section className={'reveal'}>
                            <img className={'reveal'} alt="" src={backUpCashLogo} width="150px"/>
                            <img className={'reveal'} alt="" src={successIcon} width="150px"/>
                            <HeaderText className={'reveal'}>Successful</HeaderText>
                            <p className={'mb-4 reveal'}>You have successfully created a Steady Savings.
                                You can edit this at anytime by logging into your account.</p>
                            <h6 className={'reveal'}>AMOUNT SAVED</h6>
                            <HeaderText className={'mb-4 reveal text-capitalize'}>
                                ₦500.00 ({frequency})</HeaderText>
                            <button className={'button--blue reveal'}
                                    onClick={() => props.history.push(LoginLink)}>
                                Go to Login
                            </button>
                        </Section>
                    </Section> :
                    <Section className={'section--light-yellow'}>
                        <Section className={'reveal'}>
                            <img className={'reveal'} alt="" src={backUpCashLogo} width="150px"/>
                            {error ?
                                <>
                                    <HeaderText className={'reveal'}>Oops!!</HeaderText>
                                    <p className={'mb-4 px-lg-5 reveal'}>We were unable to create your steady save ,
                                        it's either you have initiated this transaction earlier or
                                        you already have a steady save. You can edit this at anytime by logging into
                                        your account. </p>
                                    <button className={'button--blue reveal'}
                                            onClick={() => props.history.push(LoginLink)}>
                                        Go to Login
                                    </button>
                                </>
                                :
                                <>
                                    {
                                        loading ?
                                            <>
                                                <div className="loading-dots">
                                                    <div className="loading-dots--dot"/>
                                                    <div className="loading-dots--dot"/>
                                                    <div className="loading-dots--dot"/>
                                                    <div className="loading-dots--dot"/>
                                                </div>
                                                <HeaderText className={'reveal'}> Creating Steady save ...</HeaderText>
                                                <p className={'reveal'}>Loading ...</p>
                                            </>

                                            :
                                            <>
                                                <HeaderText className={'reveal'}>Steady Save</HeaderText>
                                                <p className={'reveal mb-2'}>You are about to initiate a {frequency} steady
                                                    savings.</p>
                                                <button className={'button--blue reveal'}
                                                        onClick={() => onCreateSteadySave()}>
                                                    {loading ? "Loading..." :"Click to continue"}
                                                </button>
                                            </>
                                    }

                                </>
                            }
                        </Section>
                    </Section>
            }
        </>


    );
}

export default withToastManager(DirectSteadySave);
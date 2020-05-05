import React from 'react';
import './directInstantsave.css';
import HeaderText from "../../Components/Commons/HeaderText";
import backUpCashLogo from "../../admin/app-assets/images/Logo@2x.png";
import successIcon from "../../admin/app-assets/images/success-icon-direct-steady-saving.png";
import Section from "../DirectSteadySave/Section";
import {LoginLink} from "../../RouteLinks/RouteLinks";
import {withToastManager} from 'react-toast-notifications';
import {formatNumber} from "../../Helpers/Helper";
import useDirectInstantSave from '../../Hooks/useDirectInstantSave';

DirectInstantSave.propTypes = {};

function DirectInstantSave(props) {

    const {
        isset,
        amountSaved,
        error,
        onInstantSteadySave,
        type,
        loading
    } = useDirectInstantSave(props);


    return (
        <>
            {
                isset ?
                    <Section className={'section--light-yellow'}>
                        <Section className={'reveal'}>
                            <img className={'reveal'} alt="" src={backUpCashLogo} width="150px"/>
                            <img className={'reveal'} alt="" src={successIcon} width="150px"/>
                            <HeaderText className={'reveal'}>Successful</HeaderText>
                            <p className={'mb-4 reveal'}>You have successfully created a Instant Save.</p>
                            <h6 className={'reveal'}>AMOUNT SAVED</h6>
                            <HeaderText className={'mb-4 reveal text-capitalize'}>
                                ₦ {formatNumber(amountSaved(type))} </HeaderText>
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
                                    <p className={'mb-4 px-lg-5 reveal'}>Something went wrong while trying to create your instant save,
                                        it seems you already initiated this transaction earlier. </p>
                                    <button className={'button--blue reveal'} onClick={() => props.history.push(LoginLink)}>
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
                                                <HeaderText className={'reveal'}> Creating Instant save ...</HeaderText>
                                                <p className={'reveal'}>Loading ...</p>
                                            </>
                                            :
                                            <>
                                                <HeaderText className={'reveal'}>Instant Save</HeaderText>
                                                <p className={'reveal mb-2'}>You are about to initiate
                                                    an instant save of ₦ {formatNumber(amountSaved(type))}.</p>
                                                <button className={'button--blue reveal'}
                                                        onClick={() => onInstantSteadySave()}>
                                                    {loading ? "Loading..." : "Click to continue"}
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

export default withToastManager(DirectInstantSave);

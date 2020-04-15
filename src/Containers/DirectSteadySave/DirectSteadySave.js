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

    const {toastManager} = props;

    const [state, setState] = useState({isset: false,loading:false, error: false});


    const onCreateSteadySave = () => {

        const {userid, frequency} = props.match.params;
        setState({...state, loading: true});
        postDirectSteadySave({user_id:userid, frequency}, (status, data) => {
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
        onCreateSteadySave();
    }, []);
    return (

        <>
            {
                state.isset ?
                    <Section className={'section--light-yellow'}>
                        <Section className={'reveal'}>
                            <img className={'reveal'} alt="" src={backUpCashLogo} width="150px"/>

                            <img className={'reveal'} alt="" src={successIcon} width="150px"/>
                            <HeaderText className={'reveal'}>Successful</HeaderText>
                            <p className={'mb-4 reveal'}>Your steady save transaction was succesfull</p>
                            {/*<h6 className={'reveal'}>Amount Saved</h6>*/}
                            {/*<HeaderText className={'mb-4 reveal'}>N10,000.00</HeaderText>*/}
                            <button className={'button--blue reveal'} onClick={() => props.history.push(LoginLink)}>Go
                                to Login
                            </button>
                        </Section>
                    </Section> :
                    <Section className={'section--light-yellow'}>
                        <Section className={'reveal'}>

                            {state.error ?
                                <>
                                    <img className={'reveal'} alt="" src={backUpCashLogo} width="150px"/>
                                    <HeaderText className={'reveal'}>Something Went Wrong!!</HeaderText>
                                    <p className={'mb-4 reveal'}>We were unable to create your steady save</p>
                                    <button className={'button--blue reveal'} onClick={() => onCreateSteadySave()}>
                                        {state.loading ? 'loading...' : 'Try Again'}
                                    </button>
                                </>
                                :
                                <>
                                    <img className={'reveal'} alt="" src={backUpCashLogo} width="150px"/>
                                    <div className="loading-dots">
                                        <div className="loading-dots--dot"></div>
                                        <div className="loading-dots--dot"></div>
                                        <div className="loading-dots--dot"></div>
                                        <div className="loading-dots--dot"></div>
                                    </div>
                                    <HeaderText className={'reveal'}> Creating Steady save ...</HeaderText>
                                    <p className={'reveal'}>Loading ...</p>
                                </>
                            }
                        </Section>
                    </Section>
            }
        </>


    );
}

export default withToastManager(DirectSteadySave);
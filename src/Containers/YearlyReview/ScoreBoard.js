import React, {useEffect, useState} from 'react';
import Section from "../../Components/Commons/Section";
import {Col, Row} from "react-bootstrap";
import Button from "../../Components/Commons/Button";
import Navigation from "../Home/Navigation";
import './scoreboard.css';
import HeaderText from "../../Components/Commons/HeaderText";
import Line from "../../Components/Commons/Line";
import gradientCircle from "../../admin/app-assets/images/gradient-circle@2x.png";
import wavyLines from "../../admin/app-assets/images/wavy-lines@2x.png";
import nairaIcon from "../../admin/app-assets/images/naira-icon@2x.png";
import percentageIcon from "../../admin/app-assets/images/percentage-icon@2x.png";
import BoldText from "../../Components/Commons/BoldText";
import Slash from "../../Components/Commons/Slash";
import SmallText from "../../Components/Commons/SmallText";
import Sprinkles from "../../Components/Commons/Sprinkles";
import FlexIcon from "../../Components/Commons/FlexIcon";
import {_axios, _getHeader} from "../../utils";
import {
    CentralVaultInterest,
    GetBackUpGoals,
    getUserInfoEndpoint,
    LockedInterest,
    LoginLink
} from "../../RouteLinks/RouteLinks";
import moment from "moment";
import {
    BACKUP_GOALS_ACCOUNT,
    formatNumber,
    getCompletedGoals,
    getCompletedGoalsAmount,
    INTEREST_ACCOUNT,
    LOCKED_ACCOUNT,
    redirectTo,
    STANDARD_ACCOUNT
} from "../../Helpers/Helper";
import {checkUser} from "../Home/Home";


const useGetUserInfo = () => {
    const [userInfo, setUserInfo] = useState({});

    const getDetails = async () => {
        //controls add display
        const config = {headers: _getHeader()};
        console.log('got here', config);
        try {
            const [UserInfoRes, CentralVaultIntRes, LockedIntRes, BackUpRes] = await Promise.all([
                _axios.get(getUserInfoEndpoint, config),
                _axios.get(CentralVaultInterest, config),
                _axios.get(LockedInterest, config),
                _axios.get(GetBackUpGoals, config),
            ]);

            let transactions = [];
            const now = moment().format('YYYY-MM-DD');
            let accounts, vaultAmount, backupAmount, lockedSavingsAmount, stashAmount, totalInterest = 0;
            if (UserInfoRes.data.data.accounts) {
                // loop through data and set appropriate states
                accounts = UserInfoRes.data.data.accounts.data;
                transactions = UserInfoRes.data.data.transactions.data;
                transactions = transactions.filter((content) => content.status == 'success');
                accounts.map((content, idx) => {
                    if (content.account_type_id == STANDARD_ACCOUNT) {
                        vaultAmount = parseFloat(content.balance).toFixed(2);
                    } else if (content.account_type_id == BACKUP_GOALS_ACCOUNT) {
                        backupAmount = parseFloat(content.balance).toFixed(2);
                    } else if (content.account_type_id == LOCKED_ACCOUNT) {
                        lockedSavingsAmount = parseFloat(content.balance).toFixed(2);
                    } else if (content.account_type_id == INTEREST_ACCOUNT) {
                        stashAmount = parseFloat(content.balance).toFixed(2);
                        totalInterest = parseFloat(content.balance).toFixed(2);
                    }
                });
            }

            const backUpGoals = BackUpRes.data.data;
            // //check  to  filter all goals where current data is greater than today
            let activeGoals = backUpGoals.filter((content) => {
                return (moment(content.end_date).format('YYYY-MM-DD') > now &&
                    parseInt(content.is_pause) === 0 && parseInt(content.stop) === 0);
            });

            let CompletedGoals = getCompletedGoals(backUpGoals);
            let CompletedGoalsAmount = getCompletedGoalsAmount(backUpGoals);

            let ActiveGoalsAmount = activeGoals.reduce((a, b) => a + Number(b.target_amount), 0);
            console.log('active goals', activeGoals, ActiveGoalsAmount);


            return {
                accountInfo: UserInfoRes.data.data.accounts,
                userName: UserInfoRes.data.data.name,
                lockedSavingsInterest: parseFloat(JSON.parse(LockedIntRes.data.data)).toFixed(2),
                vaultInterest: parseFloat(JSON.parse(CentralVaultIntRes.data.data)).toFixed(2),
                vaultAmount,
                transactions,
                backupAmount,
                lockedSavingsAmount,
                stashAmount,
                totalInterest,
                CompletedGoalsAmount,
                ActiveGoalsAmount,
                ActiveGoals: activeGoals.length,
                CompletedGoals: CompletedGoals
            };

        } catch (e) {
            console.log('unable to get user info', e);
            return e.response;
        }

    };


    useEffect(() => {
        let fetch = true;

        if (fetch) {
            getDetails().then(result => setUserInfo(result))
        }

        return () => {
            fetch = false;
        }

    }, []);


    return [userInfo, setUserInfo]
};

const ScoreBoard = () => {

    const [userDetails, setUserDetails] = useGetUserInfo();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log('user details', userDetails);

    useEffect(()=>{
        setIsLoggedIn(checkUser());
    },[]);

    const getUserMessage = (userDetails) => {
        if (userDetails && userDetails.vaultAmount) {
            const {vaultAmount} = userDetails;
            if (vaultAmount === 0) {
                return ['You were willing. Let’s make that will active!',
                    'How can we help you make your very first savings this year?'];
            } else if (vaultAmount > 0 && vaultAmount < 1000) {
                return ['We saw that first attempt!',
                    'How about you put in that same energy every day in 2020.'];
            } else if (vaultAmount >= 1000 && vaultAmount < 5000) {
                return ['You did put in some shiny coins here and there!',
                    'Looking at how much you saved, all you need is a little more determination to ace that 2020 saving goal.'];
            } else if (vaultAmount >= 5000 && vaultAmount < 10000) {
                return ['A silver lining beneath those coins!',
                    'Looking at how much you saved, all you need is a little more determination to ace that 2020 saving goal.'];
            } else if (vaultAmount >= 10000 && vaultAmount < 50000) {
                return ['One more step friend!',
                    'Don’t let anyone call you a miser neither are you shrewd. ' +
                    'You are simply building a future for your finances.' +
                    ' Keep going and maybe, you will be getting a gold coin next to your central vault.'];
            } else if (vaultAmount >= 50000) {
                return ['There’s a gold of wealth within you!',
                    'Your savings was one of the absolute best. ' +
                    'Not only did you ace it, you did set a new standard for savings.' +
                    ' If you keep it up, you will unleash the gold within your wealth.'];
            }

        }

    };

    const message = getUserMessage(userDetails);

    return (
        <div>
            <Section className={'score-board-header px-2 pt-2 pt-lg-0'}>
                <Navigation isLoggedIn={isLoggedIn} type={'review'}/>
                <Row className='mt-5 pt-lg-5'>
                    <Col lg={{span: 6}}>
                        <h1 className={'ml-lg-5 pl-lg-4 circular-std-Book fs-lg-3 font-weight-bold text-white'}>Your
                            Money <br/>scorecard this year</h1>
                    </Col>
                </Row>
            </Section>

            <Section type={'fluid'} className={' bg-light-yellow mh-lg-50-vh'}>
                <div className='flower-pot-bg'>
                    <div className={'pl-lg-5 pt-lg-5'}>
                        <div className="pl-lg-5 px-2 pr-lg-0">
                            <BoldText className={'my-lg-5 mb-5 mb-lg-0 blue-text pt-5 font-weight-bold'}>Your savings this year</BoldText>
                            <Line/>
                            <SmallText className='mt-5 light-blue-text'>Let's review your saving discipline this
                                year</SmallText>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className={'sb-deep-blue-bg text-white'}>
                <Row className={'mt-lg-5 pt-5'}>
                    <Col lg={{span: 12}}>
                        <Line type={'white'}/>
                        <HeaderText className={'my-5 text-white'}>
                            Central vault <br/>savings
                        </HeaderText>
                        <div className="d-flex flex-column flex-lg-row">
                            <div className="flex-item mt-5 mt-lg-0 align-items-start flex-grow-1 d-flex">
                                <FlexIcon img={nairaIcon}/>
                                <div className="text mt-lg-3">
                                    <SmallText>Central vault savings</SmallText>
                                    <BoldText
                                        className={'text-light-yellow'}>N {userDetails ? formatNumber(userDetails.vaultAmount) : 0.00}</BoldText>
                                </div>
                            </div>
                            <div className="flex-item mt-5 mt-lg-0  flex-grow-1 d-flex">
                                <div className="text">
                                    <SmallText>Your total central vault savings</SmallText>
                                    <BoldText>=</BoldText>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column pb-5 pb-lg-0  flex-lg-row">
                            <div className="flex-item mt-5 mt-lg-0 align-items-start  flex-grow-1 d-flex">
                                <FlexIcon img={percentageIcon}/>
                                <div className="text mt-lg-3">
                                    <SmallText>Interest gained</SmallText>
                                    <BoldText
                                        className={'text-light-yellow'}>N {userDetails ? formatNumber(userDetails.vaultInterest) : 0.00}</BoldText>
                                </div>
                            </div>
                            <div className="flex-item mt-5 mt-lg-0 flex-grow-1 d-flex">
                                <div className="text">
                                    <BoldText
                                        className={'fs-lg-4 text-light-yellow'}>N {userDetails ?
                                        formatNumber(Number(userDetails.vaultAmount) + Number(userDetails.vaultInterest))
                                        : 0.00}
                                    </BoldText>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Section>

            <Section type={'fluid'} className={'bg-light-yellow mh-lg-50-vh'}>
                <div className='gray-lock-bg'>
                    <div className={'pl-lg-5 px-2 px-lg-0 py-5 d-flex flex-column flex-lg-row  mb-lg-5'}>
                        <div className="pl-lg-5 flex-grow-1">
                            <Line/>
                            <BoldText className='my-5 text-faded-blue-2'>Locked Savings</BoldText>
                            <BoldText className={'fs-lg-2 text-faded-blue-3'}>Total amount locked away in
                                2019</BoldText>
                        </div>
                        <div className="pt-lg-5 my-lg-5 pb-5 pb-lg-0  flex-grow-1">
                            <SmallText className={'my-5 fs-lg-1-5 pt-lg-5 text-faded-blue-3 font-weight-bold'}>Your
                                locked savings</SmallText>
                            <BoldText className={'text-white fs-lg-4'}>=</BoldText>
                            <BoldText
                                className={'fs-lg-4 text-deep-blue'}> N{userDetails ? formatNumber(userDetails.lockedSavingsAmount) : 0.00}</BoldText>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className={'deep-blue-bg text-white'} hideOverflow>
                <img src={wavyLines} className={'wavy-lines'} alt="wavy lines"/>
                <div className="px-lg-5 mt-lg-5 py-5">
                    <Line type={'white'}/>
                    <BoldText className={'my-5 pb-lg-3  text-white'}>Goals you set this year</BoldText>
                    <div>
                        <SmallText className={'font-weight-bold fs-2 mb-lg-5 text-white'}>Goals you set</SmallText>
                        <div className="d-flex flex-lg-row mt-5 mt-lg-0 align-items-lg-end mb-lg-5">
                            <div>
                                <SmallText className={'text-white mb-lg-5'}>Active goals</SmallText>
                                <BoldText
                                    className={'text-white fs-lg-4'}>{userDetails ? formatNumber(userDetails.ActiveGoals) : 0}</BoldText>
                            </div>
                            <Slash className={'flex-grow-1'}/>
                            <div className={'flex-grow-1'}>
                                <SmallText className={'text-white mb-lg-5'}>Complete goals</SmallText>
                                <BoldText
                                    className={'text-white fs-lg-4'}>{userDetails ? formatNumber(userDetails.CompletedGoals) : 0}</BoldText>
                            </div>
                        </div>

                        <div className="d-flex flex-column mt-5 mt-lg-0 flex-lg-row align-items-lg-end mb-lg-5">
                            <div className={'flex-grow-1'}>
                                <SmallText className={'text-white mb-lg-5'}>Active goals = </SmallText>
                                <BoldText
                                    className={'text-white fs-lg-4'}>N {userDetails ? formatNumber(userDetails.ActiveGoalsAmount) : 0}</BoldText>
                            </div>
                            <Slash className={'flex-grow-1'}/>
                            <div className={'flex-grow-1'}>
                                <SmallText className={'text-white mb-lg-5'}>Completed goals = </SmallText>
                                <BoldText
                                    className={'text-white fs-lg-4'}>N{userDetails ? formatNumber(userDetails.CompletedGoalsAmount) : 0}</BoldText>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={gradientCircle} className={'gradient-circle'} alt="wavy lines"/>
            </Section>

            <Section className={'light-blue-bg text-white'}>
                <div className="blue-gray-bg px-lg-5">
                    <Line type={'white'}/>
                    <HeaderText className={'my-5'}>
                        Finally, let's see how much matured funds you have <br/> garnered this year
                    </HeaderText>
                </div>
                <div className='ml-lg-5 pb-5 pb-lg-0 px-lg-5 '>
                    <BoldText>=</BoldText>
                    <SmallText className={'my-5'}>Available for withdrawal</SmallText>
                    <BoldText
                        className={'fs-lg-4 text-light-yellow'}> N{userDetails ? formatNumber(userDetails.stashAmount) : 0}</BoldText>
                </div>
            </Section>

            <Section className={'bg-light-yellow px-lg-5 px-2'} hideOverflow>
                <Sprinkles/>
                <Row>
                    <Col lg={{span: 12}}>
                        <SmallText className={'text-light-gray my-5 pt-5'}>From Cassandra</SmallText>
                        <div className="d-flex flex-column flex-lg-row">
                            <div className='flex-grow-1 flex-basis-40'>
                                <BoldText className='mb-lg-5 fs-lg-4 text-light-blue'>This year,</BoldText>
                            </div>
                            <div className={'mt-lg-2 mb-5 mb-lg-0 flex-grow-1 text-light-gray'}>
                                <Line/>
                                <BoldText
                                    className='my-5'>{userDetails && userDetails.vaultAmount ? message[0] : 'You were willing. Let’s make that will active!'}</BoldText>
                                <SmallText
                                    className={'mb-5'}>{userDetails && userDetails.vaultAmount ? message[1] : 'How can we help you make your very first savings this year?'}</SmallText>
                                <Button onClick={() => redirectTo(LoginLink)} className={'inverse '}
                                        text={'Start saving now'}/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Section>
        </div>

    );
};

export default ScoreBoard;
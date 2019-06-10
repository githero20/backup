import React, {Component, Fragment} from 'react';
import totalBalanceIcon from "../../admin/app-assets/images/svg/total-balance-icon.svg";
import {getWithdrawalPenalty, getWithdrawalSettings, makeWithdrawal} from "../../actions/WithdrawalAction";
import {withToastManager} from "react-toast-notifications";
import {getUserBanks} from "../../actions/BankAction";
import moment from "moment";
import WithdrawalSettingsModal from "./Settings/WithdrawalSettingsModal";
import SimpleReactValidator from "simple-react-validator";
import {_handleFormChange} from "../../utils";
import ButtonLoader from "../../Components/Auth/Buttonloader/ButtonLoader";
import {request} from "../../ApiUtils/ApiUtils";
import {getUserInfoEndpoint} from "../../RouteLinks/RouteLinks";
import {
    BACKUP_GOALS_ACCOUNT,
    formatNumber,
    INTEREST_ACCOUNT,
    LOCKED_ACCOUNT,
    STANDARD_ACCOUNT
} from "../../Helpers/Helper";

class WithdrawalForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            withdrawalSettings:[],
            penalty:null,
            userBanks:[],
            hasPenalty:true,
            nextDate:"",
            userBalance:0.00,
            penaltyFreeDay:false,
            settingsOwner:"you",
            form:{
                penalty_from:"central_vault",
                withdraw_amount:"500",
                bank_account:"",
                source:"central_vault"
            },
            showWithdrawalSetting:false
        };

        this.validator = new SimpleReactValidator();

        this.getWithdrawalSettings = this.getWithdrawalSettings.bind(this);
        this.getWithdrawalPenalty = this.getWithdrawalPenalty.bind(this);
        this.getUserBanks = this.getUserBanks.bind(this);
        this.showWithdrawalSettings = this.showWithdrawalSettings.bind(this);
        this.hideWithdrawalSettings = this.hideWithdrawalSettings.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleWithdrawFrom = this.handleWithdrawFrom.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.getWithdrawalSettings();
        this.getUserBanks();

    }


    componentDidMount() {

        //get user info

        console.log('got here');
        this.getBalance();
    }

    getBalance = () => {

        console.log('ran request');
        request(getUserInfoEndpoint,null,true,'GET',this.saveBalance);

    };

    saveBalance =(state,res)=>{

        if(state){

                if (res.data.data.accounts) {

                    console.log(res.data.data.accounts);

                    // loop through data and set appropriate states
                    let accounts = res.data.data.accounts.data;

                    //get th balance
                    accounts.map((content, idx) => {
                        if (content.account_type_id === STANDARD_ACCOUNT) {
                            this.setState({
                                userBalance:content.balance
                            });
                        }
                    });



                }


        }


    }



    getWithdrawalSettings(){
        // e.preventDefault();
        getWithdrawalSettings((status, payload) => {
            if(status){

                console.log("Withdr", status, payload);
                this.setState({withdrawalSettings:payload.data, settingsOwner: payload.owner});
                this.getNextWithdrawalDate(payload.data);
            }else{
                this.props.toastManager.add("unable to get withdrawal settings",{
                    appearance: "error",
                    autoDismissTimeout: 5000,
                    autoDismiss:true
                });
            }
        });
    }


    getWithdrawalPenalty(){
        // e.preventDefault();
        getWithdrawalPenalty((status, payload) => {
            if(status){
                this.setState({penalty:payload});
                console.log('penalty:'+JSON.parse(payload));
            }else{
                this.props.toastManager.add("unable to get withdrawal penalty",{
                    appearance: "error",
                    autoDismissTimeout: 5000,
                    autoDismiss:true
                });
            }
        });
    }
    getUserBanks(){
        getUserBanks((status, payload) => {
            if(status){
                if(payload && payload.length > 0){
                    this.setState({userBanks:payload});
                }else{
                    this.props.history.push("/bank-card-setting");
                }
            }else{
                this.props.toastManager.add("Unable to get bank accounts",{
                    appearance: "error",
                    autoDismissTimeout: 5000,
                    autoDismiss:true
                });
            }
        });
    }




    showWithdrawalSettings(){
        this.setState({showWithdrawalSetting: true})
    }
    hideWithdrawalSettings(){
        this.setState({showWithdrawalSetting: false})
    }

    handleWithdrawFrom(e){
        if(e.target.value == "backup_stash" || this.state.penaltyFreeDay){
            this.setState({hasPenalty:false});
        }else{
            this.setState({hasPenalty:true});
        }

        this.handleChange(e);
    }

    handleChange(e){
        _handleFormChange(e.target.name,e, this)
    }

    getNextWithdrawalDate(withdrawalDates = []){
        try{
            // 22n october 2019
            const now = moment();
            for(let date of withdrawalDates){
                let d = moment(date.withdrawal_date,"MM/DD");
                let diff = d.diff(now,"days");
                if( diff == 0){
                    this.setState({hasPenalty: false, penaltyFreeDay: true, nextDate: d.format("LL")});
                }else if(diff > 0){
                    this.setState({nextDate: d.format("LL")});
                    break;
                }
            }
        }catch (e) {
            console.log(e);
        }
    }

    onSubmit(e){
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            this.setState({loading:true});
            const {form} = this.state;
            makeWithdrawal(form,(status, payload) =>{
                console.log("response", status, payload);
                this.setState({loading:false});
                if(status){
                    this.props.toastManager.add("Withdrawal Successful",{
                        appearance: "success",
                        autoDismiss: true,
                        autoDismissTimeout: 5000
                    });
                    this.props.updateWithdrawalList();
                }else{
                    this.props.toastManager.add(payload,{
                        appearance: "error",
                        autoDismiss: true,
                        autoDismissTimeout: 5000
                    });
                }
            })
        }
    }
    render() {

        console.log(this.state.userBalance);
        return (
            <div className={'row'}>
                <WithdrawalSettingsModal show={this.state.showWithdrawalSetting} onHide={this.hideWithdrawalSettings}/>
                <div className="col-lg-7">
                    {/* withdrawal form component */}
                    <Fragment>
                        <div className="card curved-radius"
                             data-height="60px">
                            <div className="card-content collapse show" >
                                <div className="card-body px-5">
                                    <form className="form lock-form" onSubmit={this.onSubmit}>
                                        <div className="form-body">
                                            <div className="row mb-4">
                                                <div className="col-lg-12">
                                                    <h5>Central Vault balance</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="media d-flex pb-2 pb-md-5">
                                                        <div className="align-self-center">
                                                            <img className="blue-card-icon" src={totalBalanceIcon}/>
                                                        </div>
                                                        <div className="media-body text-left pt-1 ">
                                                            <h3 className=" ">
                                                                <strong className="blue-card-price ml-2 mr-2">
                                                                    <strong>₦</strong> {formatNumber(parseFloat(this.state.userBalance).toFixed(2))  }
                                                                </strong>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">

                                                        {/*<button className={'btn btn-withdraw round mb-2 '}>See withdrawal Days</button>*/}
                                                        <p className={'text-gray'}>Next free withdrawal day</p>
                                                        <h4 className={'text-black'}>{
                                                            this.state.penaltyFreeDay ? "Today": this.state.nextDate
                                                        }</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-lg-12">
                                                    <h5>Withdrawal Form</h5>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="annualincome">Select Bank</label>
                                                        <select name="bank_account"
                                                                onChange={this.handleChange}
                                                                value={this.state.form.bank_account}
                                                                className="form-control">
                                                            <option value="">
                                                                Select bank
                                                            </option>
                                                            {
                                                                this.state.userBanks.map((bank, index) =>{
                                                                    return  (
                                                                        <option key={index} value={bank.gw_customer_code}>
                                                                            {bank.bank}({bank.bank_number})
                                                                        </option>
                                                                    );
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    {this.validator.message('bank_account', this.state.form.bank_account, 'required')}
                                                </div>


                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="name">How much do you want to withdraw today?</label>
                                                        <input
                                                            type="number"
                                                            className="form-control mb-1"
                                                            name="withdraw_amount"
                                                            onChange={this.handleChange}
                                                            value={this.state.form.withdraw_amount}
                                                        />

                                                    </div>
                                                    {this.validator.message('withdraw_amount', this.state.form.withdraw_amount, 'required|numeric')}
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label>Where do you want to withdraw from?</label>
                                                        <select name="source" onChange={this.handleWithdrawFrom} value={this.state.form.source}                                                                className="form-control">
                                                            <option value="central_vault">Central Vault
                                                            </option>
                                                            <option value="backup_stash">Backup Stash
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12" hidden={!this.state.hasPenalty}>
                                                    <div className="form-group">
                                                        <label>Where do you want to charge your Penalty Fee?</label>
                                                        <select onChange={this.handleChange} name="penalty_from" value={this.state.form.penalty_from}
                                                                className="form-control">
                                                            <option value="central_vault">Balance in Central Vault
                                                            </option>
                                                            <option value="amount_to_withdraw">Amount to be Withdrawn
                                                            </option>

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-actions d-flex justify-content-center justify-content-md-end">
                                            <button type="submit"
                                                    className="btn  btn-bg-shade-2 px-3 py-1 round pull-right">
                                                {this.state.loading ? <ButtonLoader/> : "Withdraw"}

                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </Fragment>
                </div>
                <div className="col-lg-5">
                    <Fragment>
                        <div className='banner round '>
                            <p>Your next free withdrawal Date is </p>
                            <strong>{
                                this.state.penaltyFreeDay ? "Today": this.state.nextDate
                            }</strong>
                            <p>You are using Backup Cash's Free WITHDRAWAL DAYS: </p>
                            <ul>
                                {
                                    this.state.withdrawalSettings.map((settings, index) =>{
                                        const split = settings.withdrawal_date.split("/");
                                        const month =  (moment(split[0], "MM").format("MMMM"));
                                        const day =  (moment(split[1], "DD").format("Do"));
                                        return (
                                            <li key={index}>Every {day} of {month}</li>
                                        );
                                    })
                                }
                            </ul>

                            {
                                this.state.settingsOwner == "you" ? "" :
                                    <button className='btn btn-custom-blue btn-block' onClick={this.showWithdrawalSettings}>Change Settings</button>
                            }
                        </div>
                    </Fragment>
                </div>
            </div>
        );
    }
}

export default withToastManager(WithdrawalForm);
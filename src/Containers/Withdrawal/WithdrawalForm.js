import React, {Component, Fragment} from 'react';
import totalBalanceIcon from "../../admin/app-assets/images/svg/total-balance-icon.svg";
import {createWithdrawalSettings, getWithdrawalPenalty, getWithdrawalSettings} from "../../actions/WithdrawalAction";
import {withToastManager} from "react-toast-notifications";
import {getUserBanks} from "../../actions/BankAction";
import moment from "moment";
import WithdrawalSettingsModal from "./Settings/WithdrawalSettingsModal";
import SimpleReactValidator from "simple-react-validator";
import {_handleFormChange} from "../../utils";
class WithdrawalForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            withdrawalSettings:[],
            penalty:null,
            userBanks:[],
            form:{
                penalty_from:"",
                withdraw_amount:"",
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
    }

    componentWillMount() {
        this.getWithdrawalSettings();
        this.getUserBanks();
    }

    //get withdrawal settings
    //get penalty when its central vault
    //get user banks
    getWithdrawalSettings(){
        // e.preventDefault();
        getWithdrawalSettings((status, payload) => {
            if(status){
                this.setState({withdrawalSettings:payload});
            }else{
                this.props.toastManager.add("unable to get withdrawal settings",{
                    appearance: "error",
                    autoDismissTimeout: 5000,
                    autoDismiss:true
                });
            }
        });
    }
    getWithdrawalPenalty(e){
        e.preventDefault();
        getWithdrawalPenalty((status, payload) => {
            if(status){
                this.setState({penalty:payload});
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
                console.log("here", status, payload);
                this.setState({userBanks:payload});
            }else{
                this.props.toastManager.add("Unable to get bank accounts",{
                    appearance: "error",
                    autoDismissTimeout: 5000,
                    autoDismiss:true
                });
            }
        });
    }

    handleChange(e){
        this.setState({resolved:false});
        _handleFormChange(e.target.name,e, this)
    }
    showWithdrawalSettings(){
        this.setState({showWithdrawalSetting: true})
    }
    hideWithdrawalSettings(){
        console.log("here");
        this.setState({showWithdrawalSetting: false})
    }

    getNextWithdrawalDate(){
        // 22n october 2019
    }

    render() {
        return (
            <div className={'row'}>
                <WithdrawalSettingsModal show={this.state.showWithdrawalSetting} onHide={this.hideWithdrawalSettings}/>
                <div className="col-lg-8">
                    {/* withdrawal form component */}
                    <Fragment>
                        <div className="card curved-radius"
                             data-height="60px">
                            <div className="card-content collapse show" >
                                <div className="card-body px-5">
                                    <form className="form lock-form">
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
                                                                    <strong>₦</strong> 500,000
                                                                </strong>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <button className={'btn btn-withdraw round mb-2 '}>See withdrawal Days</button>
                                                        <p className={'text-gray'}>Next free withdrawal day</p>
                                                        <h4 className={'text-black'}>22n october 2019</h4>
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
                                                                value={this.state.form.bank_account}
                                                                className="form-control">
                                                            <option value="">
                                                                Select bank
                                                            </option>
                                                            {
                                                                this.state.userBanks.map((bank, index) =>{
                                                                    console.log("bank",bank);
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
                                                            value={this.state.form.withdraw_amount}
                                                        />

                                                    </div>
                                                    {this.validator.message('withdraw_amount', this.state.form.withdraw_amount, 'required|numeric')}
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label>Where do you want to withdraw from?</label>
                                                        <select name="source" value={this.state.form.source}                                                                className="form-control">
                                                            <option value="central_vault">Central Vault
                                                            </option>
                                                            <option value="backup_stash">Backup Stash
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12" hidden={true}>
                                                    <div className="form-group">
                                                        <label>Where do you want to charge your Penalty Fee?</label>
                                                        <select name="source" value={this.state.form.penalty_from}
                                                                className="form-control">
                                                            <option value="central_vault">Amount to be withdrawn from
                                                            </option>
                                                            <option value="backup_stash">Backup Stash
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-actions d-flex justify-content-center justify-content-md-end">
                                            <button type="button"
                                                    className="btn  btn-bg-shade-2 px-3 py-1 round pull-right">Withdraw
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </Fragment>
                </div>
                <div className="col-lg-4">
                    <Fragment>
                        <div className='banner round '>
                            <p>Your next free withdrawal Date is </p>
                            <strong>June !st 2020 </strong>
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

                            <button className='btn btn-custom-blue btn-block' onClick={this.showWithdrawalSettings}>Change Settings</button>
                        </div>
                    </Fragment>
                </div>
            </div>
        );
    }
}

export default withToastManager(WithdrawalForm);
import React, {Component, Fragment} from 'react';
import totalBalanceIcon from "../../admin/app-assets/images/svg/total-balance-icon.svg";
import {createWithdrawalSettings, getWithdrawalPenalty, getWithdrawalSettings} from "../../actions/WithdrawalAction";
import {withToastManager} from "react-toast-notifications";
import {getUserBanks} from "../../actions/BankAction";

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
            }
        };


        this.getWithdrawalSettings = this.getWithdrawalSettings.bind(this);
        this.getWithdrawalPenalty = this.getWithdrawalPenalty.bind(this);
        this.createWithdrawalSettings = this.createWithdrawalSettings.bind(this);
        this.getUserBanks = this.getUserBanks.bind(this);
    }
    //get withdrawal settings
    //create withdrawal settings
    //get penalty when its central vault
    //get user banks

    createWithdrawalSettings(e){
        createWithdrawalSettings({

        }, (status, payload) => {
            if(status){
                //TODO("Something here)
            }else{
                this.props.toastManager.add("Unable to create withdrawal settings",{
                    appearance: "error",
                    autoDismissTimeout: 5000,
                    autoDismiss:true
                });
            }
        })
    }
    getWithdrawalSettings(e){
        e.preventDefault();
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
    getUserBanks(e){
        e.preventDefault();
        getUserBanks((status, payload) => {
            if(status){
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
    render() {
        return (
            <div className={'row'}>
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
                                                        <select id="annualincome"
                                                                name="interested"
                                                                className="form-control">
                                                            <option value="none"
                                                                    disabled="">Less
                                                                than ₦ 15,000
                                                            </option>
                                                            <option value="design">design
                                                            </option>
                                                            <option
                                                                value="development">development
                                                            </option>
                                                            <option
                                                                value="illustration">illustration
                                                            </option>
                                                            <option
                                                                value="branding">branding
                                                            </option>
                                                            <option value="video">video
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="name">How much do you want to withdraw today?</label>
                                                        <input
                                                            type="number"
                                                            id="name"
                                                            className="form-control mb-1"
                                                            name="amount"
                                                            defaultValue={''}
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label>Where do you want to withdraw from?</label>
                                                        <select name="source" value={this.state.form.source} defaultValue={this.state.form.source}
                                                                className="form-control">
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
                                                        <select name="source" value={this.state.form.penalty_from} defaultValue={this.state.form.penalty_from}
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
                                <li>Every 01 January</li>
                                <li>Every 01 January</li>
                                <li>Every 01 January</li>
                                <li>Every 01 January</li>
                            </ul>

                            <button className='btn btn-custom-blue btn-block'>Change Settings</button>
                        </div>
                    </Fragment>
                </div>
            </div>
        );
    }
}

export default withToastManager(WithdrawalForm);
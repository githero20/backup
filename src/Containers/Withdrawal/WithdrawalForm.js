import React, {Component, Fragment} from 'react';
import totalBalanceIcon from "../../admin/app-assets/images/svg/total-balance-icon.svg";
import {
    getWithdrawalPenalty,
    getWithdrawalPin,
    getWithdrawalSettings,
    makeWithdrawal
} from "../../actions/WithdrawalAction";
import {withToastManager} from "react-toast-notifications";
import {getUserBanks} from "../../actions/BankAction";
import moment from "moment";
import WithdrawalSettingsModal from "./Settings/WithdrawalSettingsModal";
import SimpleReactValidator from "simple-react-validator";
import {_handleFormChange} from "../../utils";
import ButtonLoader from "../../Components/Auth/Buttonloader/ButtonLoader";
import {request} from "../../ApiUtils/ApiUtils";
import {BankCardLink, getUserInfoEndpoint} from "../../RouteLinks/RouteLinks";
import {
    BACKUP_STASH,
    calcPenalty,
    CENTRAL_VAULT,
    formatNumber,
    INTEREST_ACCOUNT,
    STANDARD_ACCOUNT,
    toastMessage, toastReloadMessage,
    validateInputEntry
} from "../../Helpers/Helper";
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import AddPinModal from "../../Components/Dashboard/AddPinModal/AddPinModal";

class WithdrawalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            withdrawalSettings: [],
            penalty: null,
            userBanks: [],
            hasPenalty: true,
            nextDate: "",
            userBalance:'',
            stashBalance: '',
            penaltyFreeDay: false,
            userPin: false,
            showPinModal: false,
            pinErr: false,
            settingsOwner: "you",
            form: {
                penalty_from: "central_vault",
                withdraw_amount: "",
                bank_account: "",
                source: "central_vault",
                pin_one: '',
                pin_two: '',
                pin_three: '',
                pin_four: '',
                withdrawal_pin: ''
            },
            showWithdrawalSetting: false
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
        this.props.activateLoader();
        this.getWithdrawalSettings();
        this.getUserBanks();
    }


    componentDidMount() {
        //get user info
        // console.log('got here');
        this.getBalance();
    }

    getBalance = () => {

        // console.log('ran request');
        request(getUserInfoEndpoint, null, true, 'GET', this.saveBalance);

    };

    saveBalance = (state, res) => {
        if (state) {
            if (res.data.data.accounts) {
                let accounts = res.data.data.accounts.data;
                //get th balance
                accounts.map((content, idx) => {
                    if (content.account_type_id == STANDARD_ACCOUNT) {
                        this.setState({
                            userBalance: content.balance
                        });
                    } else if (content.account_type_id == INTEREST_ACCOUNT) {
                        this.setState({
                            stashBalance: content.balance
                        });
                    }
                });
            }
        }else {
            toastReloadMessage('error',this,this.getBalance);
        }
    };


    getWithdrawalSettings() {
        // e.preventDefault();
        getWithdrawalSettings((status, payload) => {
            this.setState({loading: false});
            if (status) {
                this.setState({withdrawalSettings: payload.data, settingsOwner: payload.owner});
                this.getNextWithdrawalDate(payload.data);
                //TODO call endpoint to check if user has a pin
                getWithdrawalPin((status, payload) => {
                    if (status) {
                        this.setState({
                            userPin: payload.data,
                            showPinModal: true,
                        });
                    }
                });
                // TODO if not popup a form for user to add pin
            } else {
                this.props.toastManager.add("unable to get withdrawal settings", {
                    appearance: "error",
                    autoDismissTimeout: 5000,
                    autoDismiss: true
                });
            }
        });
    }


    getWithdrawalPenalty(callback) {
        // e.preventDefault();
        getWithdrawalPenalty((status, payload) => {
            if (status) {
                let penalty = calcPenalty(this.state.form.withdraw_amount, payload.withdraw_penalty);
                this.setState({penalty}, () => callback());
            } else {
                this.props.toastManager.add("unable to get withdrawal penalty", {
                    appearance: "error",
                    autoDismissTimeout: 5000,
                    autoDismiss: true
                });
            }
        });
    }

    getUserBanks() {
        getUserBanks((status, payload) => {
            if (status) {
                if (payload && payload.length > 0) {
                    this.setState({userBanks: payload});
                } else {
                    // this.props.history.push("/bank-card-setting");
                    //TODO(Find another way to redirect to bank histort)
                }
            }

            //TODO handle no internet and no accounts error

            // else{
            //     this.props.toastManager.add("Unable to get bank accounts",{
            //         appearance: "error",
            //         autoDismissTimeout: 5000,
            //         autoDismiss:true
            //     });
            // }
        });
    }


    showWithdrawalSettings() {
        this.setState({showWithdrawalSetting: true})
    }

    hideWithdrawalSettings() {
        this.setState({showWithdrawalSetting: false})
    }

    hidePinModal = () => {
        this.setState({showPinModal: false})
    };

    handleWithdrawFrom(e) {

        let form = this.handleChange(e);
        if (e.target.value == BACKUP_STASH || this.state.penaltyFreeDay) {
            delete form.penalty_from;
            this.setState({hasPenalty: false, form});
        } else {
            form.penalty_from = CENTRAL_VAULT;
            this.setState({hasPenalty: true, form});
        }

    }

    handleChange(e) {
        let form = _handleFormChange(e.target.name, e, this);
        this.handlePinConcatenation(e.target.name, e);
        return form;
    }

    handlePinConcatenation = (name, event, callback = null) => {
        let form = {...this.state.form};
        form[name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        if (name == 'pin_one' || name == 'pin_two' || name == 'pin_three' || name == 'pin_four') {
            form.withdrawal_pin = form.pin_one + form.pin_two + form.pin_three + form.pin_four;
            this.setState({form});
        }
        if (form.withdrawal_pin.length >= 4) {
            this.setState({
                pinErr: false
            })
        }
        if (callback != null) {
            callback();
        }
        return form;
    };

    getNextWithdrawalDate(withdrawalDates = []) {
        try {
            // 22n october 2019
            const now = moment();
            for (let date of withdrawalDates) {
                let d = moment(date.withdrawal_date, "MM/DD");
                let diff = d.diff(now, "days");
                if (diff == 0) {
                    const {form} = this.state;
                    delete form.penalty_from;
                    this.setState({form, hasPenalty: false, penaltyFreeDay: true, nextDate: d.format("LL")});
                } else if (diff > 0) {
                    this.setState({nextDate: d.format("LL")});
                    break;
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    onSubmit(e) {
        e.preventDefault();


        if (!this.validator.allValid()) {
            //validate fields
            this.validator.showMessages();
            this.forceUpdate();
        } else if (this.state.form.withdrawal_pin.length != 4) {
            //validate pin
            this.setState({pinErr: true});
        } else {
            const {form, stashBalance, penalty, userBalance} = this.state;
            //check if the user is withdrawing from back up stash or central vault and then check if their is enough balance
            if (form.source == CENTRAL_VAULT && form.penalty_from != '') {
                //get penalty
                this.getWithdrawalPenalty(this.handleBalance);
                //check balance
            } else if (form.source == BACKUP_STASH && Number(form.withdraw_amount) <= Number(stashBalance)) {
                this.doWithdrawal();
            } else {
                toastMessage('Insufficient Balance', 'error', this);
            }


        }
    }

    handleBalance = () => {
        const {withdraw_amount, penalty_from} = this.state.form;
        const {userBalance} = this.state;
        const penalty = this.state.penalty;
        const penaltySource = (penalty_from == CENTRAL_VAULT) ? 'central vault' : 'withdrawal amount';
        const withdrawAmount = Number(withdraw_amount);
        const penaltyAmount = Number(penalty);
        if ((withdrawAmount + penaltyAmount) <= userBalance) {
            //handle penalty
            swal('Withdrawal', `Penalty of ₦ ${Number(penalty).toFixed(2)} would be deducted from your ${penaltySource}`, 'info', {
                buttons: {
                    cancel: "no",
                    yes: "yes"
                },
            }).then((value) => {
                switch (value) {
                    case "yes":
                        this.initiateWithdrawal();
                        break;
                    case "no":
                        swal("Withdrawal Cancelled");
                        break;
                }
            });
        } else {
            toastMessage('Insufficient Balance', 'error', this);
        }
    };

    doWithdrawal = () => {
        swal("Are you sure you want to make a withdrawal ?", {
            buttons: {
                cancel: "no",
                yes: "yes"
            },
        }).then((value) => {
            switch (value) {
                case "yes":
                    swal("Processing Withdrawal....","success",{button:false});
                    this.initiateWithdrawal();
                    break;
                case "no":
                    swal("Withdrawal Cancelled",{button:false});
                    break;
                default:
                    swal("You Cancelled Your Withdrawal",{button:false});
                    break;
            }
        });

    };

    initiateWithdrawal = () =>{
        const {form} = this.state;
        this.setState({loading: true});
        makeWithdrawal(form, (status, payload) => {
            console.log("response", status, payload);
            this.setState({loading: false});
            if (status) {
                this.props.toastManager.add("Withdrawal Successful", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 5000
                });
                swal("Withdrawal successful","success",{button: false});
                const form = {
                    penalty_from: "central_vault",
                    withdraw_amount: "",
                    bank_account: "",
                    source: "central_vault",
                    pin_one: '',
                    pin_two: '',
                    pin_three: '',
                    pin_four: '',
                    withdrawal_pin: ''
                };
                this.setState({form});
                this.props.updateWithdrawalList();
            } else {
                this.toastMessage(payload, 'error')
            }
        });
    };

    toastMessage = (message, status) => {
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    };

    validateInput = (e) => {
        validateInputEntry(e);
        // if (e.target.value.length > 0 && e.keyCode !== 46 && e.keyCode !== 8) {
        //     e.preventDefault();
        // }
    };

    render() {
        const year = moment().year();
        return (
            <div className={'row withdrawal-form'}>
                {
                    this.state.userPin === null ?
                        (
                            <AddPinModal
                                show={this.state.showPinModal}
                                onHide={this.hidePinModal}
                                hideForm={this.props.hideForm}
                            />
                        ) : null

                }
                {/*<AddPinModal*/}
                {/*    show={this.state.showPinModal}*/}
                {/*    // onHide={this.hidePinModal}*/}
                {/*    hideForm={this.props.hideForm}*/}
                {/*/>*/}

                <WithdrawalSettingsModal show={this.state.showWithdrawalSetting} onHide={this.hideWithdrawalSettings}/>
                <div className="col-lg-6">
                    {/* withdrawal form component */}
                    <Fragment>
                        {/*
                            show withdrawal pin form if user pin is null

                        */}
                        <div>
                            <div>
                                <div>
                                    <form className="form lock-form" onSubmit={this.onSubmit}>
                                        <div className="form-body">
                                            <div className="row mb-2">
                                                <div className="col-12 d-lg-none">
                                                    <div className='blue-banner round mb-3'>
                                                        <p>Your next free withdrawal Date is </p>
                                                        <strong>{
                                                            this.state.penaltyFreeDay ? "Today" :(this.state.nextDate!=''?moment(this.state.nextDate).format('dddd, MMMM Do'):"Retrieving Date...")
                                                        }</strong>
                                                        <p>You are using Backup Cash's Free WITHDRAWAL DAYS: </p>
                                                        <ul>
                                                            {

                                                                this.state.withdrawalSettings.map((settings, index) => {
                                                                    const split = settings.withdrawal_date.split("/");
                                                                    const month = (moment(`${year} ${split[0]}`, "YYYY MM").format("MMMM"));
                                                                    const day = (moment(`${year} ${month} ${split[1]}`, "YYYY MMMM DD").format("Do"));
                                                                    return (
                                                                        <li key={index}>Every {day} of {month}</li>
                                                                    );
                                                                })
                                                            }
                                                        </ul>

                                                        {
                                                            this.state.settingsOwner == "you" ? "" :
                                                                <button className='btn btn-custom-blue btn-block'
                                                                        onClick={this.showWithdrawalSettings}>Change
                                                                    Settings</button>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-md-6 col-lg-12">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <h5>Central Vault balance</h5>
                                                                </div>
                                                                <div className="col-12 mb-2 mb-md-0">
                                                                    <div className="media d-flex pb-2 pb-md-5">
                                                                        <div className="align-self-center">
                                                                            <img className="blue-card-icon" src={totalBalanceIcon}/>
                                                                        </div>
                                                                        <div className="media-body text-left pt-1 ">
                                                                            <h3 className=" ">
                                                                                <strong className="blue-card-price fs-1-5 ml-1 mr-2">
                                                                                   {this.state.userBalance!='' ?
                                                                                    `₦ ${formatNumber(parseFloat(this.state.userBalance).toFixed(2))}` :
                                                                                "Loading..."}
                                                                                </strong>
                                                                            </h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-12">
                                                            <div className="row">
                                                                <div className='d-lg-none mb-2 mb-md-0'>
                                                                    <div className="col-lg-12">
                                                                        <h5>Backup Stash balance</h5>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="media d-flex pb-2 pb-md-5">
                                                                            <div className="align-self-center">
                                                                                <img className="blue-card-icon" src={totalBalanceIcon}/>
                                                                            </div>
                                                                            <div className="media-body text-left pt-1 ">
                                                                                <h3 className=" ">
                                                                                    <strong className="blue-card-price fs-1-5 ml-1 mr-2">
                                                                                        {this.state.stashBalance!='' ?
                                                                                            `₦ ${formatNumber(parseFloat(this.state.stashBalance).toFixed(2))}`:
                                                                                            "Loading..."
                                                                                        }
                                                                                    </strong>
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-group">

                                                        {/*<button className={'btn btn-withdraw round mb-2 '}>See withdrawal Days</button>*/}
                                                        <p className={'text-gray'}>Next free withdrawal day</p>
                                                        <h4 className={'text-black'}>{
                                                            this.state.penaltyFreeDay ? "Today" :(this.state.nextDate!=''?moment(this.state.nextDate).format('dddd, MMMM Do'):"Retrieving Date...")
                                                        }</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-lg-12">
                                                    <h3 className='font-weight-bold'>Withdrawal Form</h3>
                                                    {/*<hr/>*/}
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        {/*<label htmlFor="annualincome">Withdrawal Form</label>*/}
                                                        <select name="bank_account"
                                                                onChange={this.handleChange}
                                                                value={this.state.form.bank_account}
                                                                className="form-control mb-1">
                                                            <option value="">
                                                                Select bank
                                                            </option>
                                                            {
                                                                this.state.userBanks.map((bank, index) => {
                                                                    return (
                                                                        <option key={index}
                                                                                value={bank.gw_customer_code}>
                                                                            {bank.bank}({bank.bank_number})
                                                                        </option>
                                                                    );
                                                                })
                                                            }
                                                        </select>
                                                        {this.state.userBanks.length == 0 ?
                                                            <Link to={BankCardLink}>Click here to add a
                                                                bank</Link> : null}

                                                    </div>
                                                    {this.validator.message('bank_account', this.state.form.bank_account, 'required')}
                                                </div>


                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="name">How much do you want to withdraw
                                                            today?</label>
                                                        <div className='amount-display round text-white px-1 mb-1'>
                                                            ₦ {formatNumber(parseFloat(this.state.form.withdraw_amount ?
                                                            this.state.form.withdraw_amount : 0).toFixed(2))}
                                                        </div>
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
                                                        <select name="source" onChange={this.handleWithdrawFrom}
                                                                defaultValue={this.state.form.source}
                                                                className="form-control">
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
                                                        <select onChange={this.handleChange} name="penalty_from"
                                                                value={this.state.form.penalty_from}
                                                                className="form-control">
                                                            <option value="central_vault">Balance in Central Vault
                                                            </option>
                                                            <option value="amount_to_withdraw">Amount to be Withdrawn
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Enter Withdrawal Pin</label>
                                                        {this.state.pinErr ?
                                                            <p><span
                                                                className='srv-validation-message'>Your pin must be four digits</span>
                                                            </p>
                                                            : null}
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <input id="pin_one" type="password" name={'pin_one'}
                                                                       className={'form-control pin-control'}
                                                                       value={this.state.form.pin_one}
                                                                       onChange={this.handleChange}
                                                                       onKeyUp={this.validateInput}
                                                                       onKeyDown={this.validateInput}
                                                                />

                                                            </div>
                                                            <div className="col-3">
                                                                <input id="pin_two" type="password" name={'pin_two'}
                                                                       className={'form-control pin-control'}
                                                                       value={this.state.form.pin_two}
                                                                       onChange={this.handleChange}
                                                                       onKeyUp={this.validateInput}
                                                                       onKeyDown={this.validateInput}
                                                                />

                                                            </div>
                                                            <div className="col-3">
                                                                <input id="pin_three" type="password" name={'pin_three'}
                                                                       className={'form-control pin-control'}
                                                                       value={this.state.form.pin_three}
                                                                       onChange={this.handleChange}
                                                                       onKeyUp={this.validateInput}
                                                                       onKeyDown={this.validateInput}
                                                                />

                                                            </div>
                                                            <div className="col-3">
                                                                <input id="pin_four" type="password" name={'pin_four'}
                                                                       className={'form-control pin-control'}
                                                                       value={this.state.form.pin_four}
                                                                       onChange={this.handleChange}
                                                                       onKeyUp={this.validateInput}
                                                                       onKeyDown={this.validateInput}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div
                                            className="form-actions d-flex justify-content-center justify-content-md-end">
                                            <button type="submit" disabled={this.state.loading}
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
                <div className="col-lg-5 offset-lg-1 d-none d-md-block">
                    <div className="col-lg-12">
                        <h5>Backup Stash balance</h5>
                    </div>
                    <div className="col-12">
                        <div className="media d-flex pb-2 pb-md-5">
                            <div className="align-self-center">
                                <img className="blue-card-icon" src={totalBalanceIcon}/>
                            </div>
                            <div className="media-body text-left pt-1 ">
                                <h3 className=" ">
                                    <strong className="blue-card-price fs-1-5 ml-1 mr-2">
                                        {this.state.stashBalance!='' ?
                                            `₦ ${formatNumber(parseFloat(this.state.stashBalance).toFixed(2))}`:
                                            "Loading..."
                                        }
                                    </strong>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <Fragment>

                        <div className='banner round '>
                            <p>Your next free withdrawal Date is </p>
                            <strong>{
                                this.state.penaltyFreeDay ? "Today" : (this.state.nextDate!=''?moment(this.state.nextDate).format('dddd, MMMM Do'):"Retrieving Date...")
                            }</strong>
                            <p>You are using Backup Cash's Free WITHDRAWAL DAYS: </p>
                            <ul>
                                {

                                    this.state.withdrawalSettings.map((settings, index) => {
                                        const split = settings.withdrawal_date.split("/");
                                        const month = (moment(`${year} ${split[0]}`, "YYYY MM").format("MMMM"));
                                        const day = (moment(`${year} ${month} ${split[1]}`, "YYYY MMMM DD").format("Do"));
                                        return (
                                            <li key={index}>Every {day} of {month}</li>
                                        );
                                    })
                                }
                            </ul>

                            {
                                this.state.settingsOwner == "you" ? "" :
                                    <button className='btn btn-custom-blue btn-block'
                                            onClick={this.showWithdrawalSettings}>Change Settings</button>
                            }
                        </div>
                    </Fragment>
                </div>
            </div>
        );
    }
}

export default withToastManager(WithdrawalForm);
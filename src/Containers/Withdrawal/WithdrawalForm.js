import React, {Component, Fragment} from 'react';
import totalBalanceIcon from "../../admin/app-assets/images/svg/total-balance-icon.svg";
import {
    addWithdrawalPin,
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
import {formatNumber, INTEREST_ACCOUNT, STANDARD_ACCOUNT} from "../../Helpers/Helper";
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import AddPinModal from "../../Components/Dashboard/AddPinModal/AddPinModal";
import TransferLockedSavingsModal
    from "../../Components/Dashboard/TransferLockedSavingsModal/TransferLockedSavingsModal";

class WithdrawalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            withdrawalSettings: [],
            penalty: null,
            userBanks: [],
            hasPenalty: true,
            nextDate: "",
            userBalance: 0.00,
            stashBalance: 0.00,
            penaltyFreeDay: false,
            userPin: false,
            showPinModal:false,
            pinErr:false,
            settingsOwner: "you",
            form: {
                penalty_from: "central_vault",
                withdraw_amount: "500",
                bank_account: "",
                source: "central_vault",
                pin_one:'',
                pin_two:'',
                pin_three:'',
                pin_four:'',
                withdrawal_pin:''
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
                console.log(res.data.data.accounts);
                let accounts = res.data.data.accounts.data;

                //get th balance
                accounts.map((content, idx) => {
                    if (content.account_type_id === STANDARD_ACCOUNT) {
                        this.setState({
                            userBalance: content.balance
                        });
                    } else if (content.account_type_id === INTEREST_ACCOUNT) {
                        this.setState({
                            stashBalance: content.balance
                        });
                    }
                });
            }
        }
    };


    getWithdrawalSettings() {
        // e.preventDefault();
        getWithdrawalSettings((status, payload) => {
            this.setState({loading: false});
            if (status) {
                console.log("Withdr", status, payload);
                this.setState({withdrawalSettings: payload.data, settingsOwner: payload.owner});
                this.getNextWithdrawalDate(payload.data);

                //TODO call endpoint to check if user has a pin
                getWithdrawalPin((status, payload) => {
                    console.log('user pin', payload);
                    if (status) {
                        this.setState({
                            userPin: payload.data,
                            showPinModal:true,
                        })

                    } else {


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


    getWithdrawalPenalty() {
        // e.preventDefault();
        getWithdrawalPenalty((status, payload) => {
            if (status) {
                this.setState({penalty: payload});
                console.log('penalty:' + JSON.parse(payload));
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
                    console.log("Props", this.props, this.props.history)
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
    hidePinModal() {
        this.setState({showPinModal: false})
    }

    handleWithdrawFrom(e) {
        if (e.target.value == "backup_stash" || this.state.penaltyFreeDay) {
            this.setState({hasPenalty: false});
        } else {
            this.setState({hasPenalty: true});
        }

        this.handleChange(e);
    }

    handleChange(e) {
        _handleFormChange(e.target.name, e, this);
        this.handlePinConcatenation(e.target.name,e);
    }

    handlePinConcatenation = (name, event, callback = null) => {
        let form = {...this.state.form};
        form[name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        if (name == 'pin_one' || name == 'pin_two' || name == 'pin_three' || name == 'pin_four') {

            form.withdrawal_pin = form.pin_one + form.pin_two + form.pin_three + form.pin_four;
            console.log('form pin', form.withdrawal_pin);
            this.setState({form});
            // console.log('withdrawal pin', form['withdrawal_pin']);
        }

        console.log('length of pin ', form.withdrawal_pin.length);
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
                    this.setState({hasPenalty: false, penaltyFreeDay: true, nextDate: d.format("LL")});
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
            this.validator.showMessages();
            this.forceUpdate();
        } else if (!(this.state.form.withdrawal_pin.length >= 4)) {
            this.setState({
                pinErr: true
            });
        } else {

            const {form} = this.state;

            swal("Are you sure you want to make a withdrawal ?", {
                buttons: {
                    cancel: "no",
                    yes: "yes"
                },
            })
                .then((value) => {
                    switch (value) {

                        case "yes":
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
                                    swal("Withdrawal Successful", "success");
                                    this.props.updateWithdrawalList();
                                } else {
                                    this.toastMessage(payload.data.message, 'error')
                                }
                            });

                            swal("Processing Withdrawal....");
                            break;

                        case "no":
                            swal("Withdrawal Cancelled");
                            break;

                        default:
                            swal("You Cancelled Your Withdrawal");
                    }
                });
        }
    }

    toastMessage = (message, status) => {
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    };

    render() {
        const year = moment().year();
        return (
            <div className={'row'}>
                {
                    this.state.userPin === null ?
                        (
                            <AddPinModal
                                show={this.state.showPinModal}
                                onHide={this.hidePinModal}
                                setupStash={this.setupStash}

                            />
                        ) : null

                }

                <WithdrawalSettingsModal show={this.state.showWithdrawalSetting} onHide={this.hideWithdrawalSettings}/>
                <div className="col-lg-7">
                    {/* withdrawal form component */}
                    <Fragment>
                        {/*
                            show withdrawal pin form if userpin is null

                        */}



                        <div>
                            <div>
                                <div>
                                    <form className="form lock-form" onSubmit={this.onSubmit}>
                                        <div className="form-body">
                                            <div className="row mb-4">
                                                <div className="col-lg-12">
                                                    <h5>Central Vault balance</h5>
                                                </div>
                                                <div className="col-12">
                                                    <div className="media d-flex pb-2 pb-md-5">
                                                        <div className="align-self-center">
                                                            <img className="blue-card-icon" src={totalBalanceIcon}/>
                                                        </div>
                                                        <div className="media-body text-left pt-1 ">
                                                            <h3 className=" ">
                                                                <strong className="blue-card-price fs-1-5 ml-1 mr-2">
                                                                    <strong>₦</strong> {formatNumber(parseFloat(this.state.userBalance).toFixed(2))}
                                                                </strong>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">

                                                        {/*<button className={'btn btn-withdraw round mb-2 '}>See withdrawal Days</button>*/}
                                                        <p className={'text-gray'}>Next free withdrawal day</p>
                                                        <h4 className={'text-black'}>{
                                                            this.state.penaltyFreeDay ? "Today" : moment(this.state.nextDate).format('dddd, MMMM Do')
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
                                                            {console.log('user banks', this.state.userBanks)}
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
                                                                value={this.state.form.source} className="form-control">
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
                                                        <label>WithdrawalPin</label>
                                                        {this.state.pinErr ?
                                                            <p><span
                                                                className='srv-validation-message'>Your pin must be four digits</span>
                                                            </p>
                                                            : null}
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <input id="pin_one" type="password" name={'pin_one'}
                                                                       className={'form-control pin-control'}
                                                                       onChange={this.handleChange}
                                                                       onKeyUp={this.validateInput}
                                                                       onKeyDown={this.validateInput}
                                                                />

                                                            </div>
                                                            <div className="col-3">
                                                                <input id="pin_two" type="password" name={'pin_two'}
                                                                       className={'form-control pin-control'}
                                                                       onChange={this.handleChange}
                                                                       onKeyUp={this.validateInput}
                                                                       onKeyDown={this.validateInput}
                                                                />

                                                            </div>
                                                            <div className="col-3">
                                                                <input id="pin_three" type="password" name={'pin_three'}
                                                                       className={'form-control pin-control'}
                                                                       onChange={this.handleChange}
                                                                       onKeyUp={this.validateInput}
                                                                       onKeyDown={this.validateInput}
                                                                />

                                                            </div>
                                                            <div className="col-3">
                                                                <input id="pin_four" type="password" name={'pin_four'}
                                                                       className={'form-control pin-control'}
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
                                        <strong>₦</strong> {formatNumber(parseFloat(this.state.stashBalance).toFixed(2))}
                                    </strong>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <Fragment>

                        <div className='banner round '>
                            <p>Your next free withdrawal Date is </p>
                            <strong>{
                                this.state.penaltyFreeDay ? "Today" : moment(this.state.nextDate).format('dddd, MMMM Do')
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
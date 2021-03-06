import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import {_calculateDateDifference, _handleFormChange} from "../../../../utils/index";
import SimpleReactValidator from "simple-react-validator";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import {withToastManager} from 'react-toast-notifications';
import {createLockedSavings, getLockedInterestSavings} from "../../../../actions/LockedSavingsAction";
import moment from 'moment';
import {disableKey, formatNumber, initializeAmountInput} from "../../../../Helpers/Helper";
import {request} from "../../../../ApiUtils/ApiUtils";
import {getAdminInterest} from "../../../../RouteLinks/RouteLinks";

class LockedSavingForm extends Component {

    defaultForm = {
        title: "",
        end_date: "",
        amount: "",
        interest: 0.0,
        days: 0,
        source: 'central_vault',
        interestRate: 0.0,
        accepted: false,
        adminInterest: 0
    };

    constructor(props) {
        super(props);
        const {toastManager} = this.props;
        this.toastManager = toastManager;
        this.state = {
            loading: false,
            dateDifference: 0,
            form: {
                title: "",
                end_date: "",
                amount: "",
                interest: 0.0,
                days: 0,
                source: 'central_vault',
                interestRate: 0.0,
                accepted: false,
                adminInterest: 0
            },
            err: ''
        };

        this.validator = new SimpleReactValidator({
            messages: {
                title: 'Plan Name is required.',
                end_date: 'Plan End Date is required.',
                amount: 'Amount is required',
            }
        });

        this.handleDateInput = this.handleDateInput.bind(this);
        this.handleAmountInput = this.handleAmountInput.bind(this);
        this.handleLockedSavingsInterest = this.handleLockedSavingsInterest.bind(this);
        this.handleAdminInterest = this.handleAdminInterest.bind(this);
    }

    validateForm = (e) => {
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            this.setState({loading: true});
            //send api
            let formData = {...this.state.form};

            formData.interest = this.state.form.interestRate;

            createLockedSavings(formData, (status, payload) => {
                this.setState({loading: false, form: this.defaultForm});
                if (status) {
                    this.props.toastManager.add("Locked Savings Created", {
                        appearance: 'success',
                        autoDismiss: true,
                        autoDismissTimeout: 3000,
                    });
                    setTimeout(() => {
                        this.props.onHide(true);
                    }, 1500)

                } else {

                    if (payload && payload.status == 401) {
                        window.location = '/login'
                    } else {
                        this.props.toastManager.add(payload.data.message || "An Error Occurred", {
                            appearance: 'error',
                            autoDismiss: true,
                            autoDismissTimeout: 3000,
                        });
                    }
                }
            });
        }
    };


    handleDateInput(e) {
        e.preventDefault();
        _handleFormChange("end_date", e, this);
        const endDate = e.target.value;
        const dateDifference = _calculateDateDifference(null, endDate);
        getLockedInterestSavings({days: dateDifference},
            this.handleLockedSavingsInterest);
        this.setState({dateDifference: dateDifference});
        //update after
    };

    handleAmountInput(e) {
        const value = e.target.value;
        if (parseFloat(value).toFixed(2) >= 0.00) {
            const rawValue = parseFloat(value.trim()
                .replace(',', '')
                .replace('???', ''));
            let form = {...this.state.form};
            form.amount = rawValue;
            form.interestRate = ((form.interest / 100) * rawValue).toFixed(2);
            this.setState({form, err: ''});
        } else {
            this.setState({err: 'Please Input the Amount you want to Contribute'})
        }
    }

    handleLockedSavingsInterest(status, data) {
        if (status) {
            let form = {...this.state.form};
            form.interest = data;
            form.interestRate = ((data / 100) * form.amount).toFixed(2);
            form.days = this.state.dateDifference;
            this.setState({form});
        } else {
            this.toastManager
                .add("Unable to get Locked Savings Interest",
                    {appearance: 'error'});
        }
    }

    handleAdminInterest(status, res) {

    };


    componentDidMount() {
        // getLockedInterestSavings();
        // initialize inputs with commas
        initializeAmountInput();
        request(getAdminInterest, null, true, "GET", this.handleAdminInterest);
    }

    render() {
        const {form, loading} = this.state;
        return (
            <React.Fragment>
                <Form onSubmit={this.validateForm}>
                    <Form.Row>
                        <Form.Group as={Col} sm={6} controlId="formGridAddress1">
                            <Form.Label>Locked Savings Name: </Form.Label>
                            <Form.Control type="text"
                                          name="title"
                                          placeholder="e.g Car Savings"
                                          onChange={value => _handleFormChange("title", value, this)}
                                          value={form.title}
                            />
                            {this.validator.message("locked savings name", form.title, "required")}
                        </Form.Group>

                        <Form.Group as={Col} sm={6} controlId="formGridEmail">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                onChange={this.handleDateInput}
                                type="date"
                                onKeyDown={disableKey}
                                onKeyUp={disableKey}
                                format="YYYY-MM-DD"
                                min={moment().add('30', 'days').format('YYYY-MM-DD')}
                                max={moment().add('2', 'years').format('YYYY-MM-DD')}
                                name="end_date"
                                value={form.end_date}
                            />
                            <Form.Text className="text-muted">
                                Pick the end Date when funds should be returned to your Backup Stash. You can lock money
                                for at least 30 days.
                            </Form.Text>
                            {this.validator.message("end Date", form.end_date, "required")}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} sm={6} controlId="formGridCity">
                            <Form.Label className='d-block'>Capital Investment
                                <span className='amount-display round float-right text-white px-1'>
                                    ??? {formatNumber(Number(form.amount).toFixed(2))}
                                </span>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                onChange={this.handleAmountInput}
                                value={form.amount}
                                name="amount"
                            />

                            {this.validator.message("capital investment", form.amount, "required")}
                            <Form.Text className="text-muted">
                                Enter the amount that will be instantly removed from your Central Vault
                                balance and locked away.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} sm={6} controlId="formGridCity">
                            <Form.Label className='d-block'>Upfront Interest
                                <span className='amount-display round float-right text-white px-1'>
                                    ??? {formatNumber(Number(form.interestRate).toFixed(2))}
                                </span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                disabled={true}
                                value={`??? ${formatNumber(form.interestRate)} @ ${form.interest.toFixed(2)}% for ${form.days} days `}
                            />
                            <Form.Text className="text-muted">
                                This upfront interest will be deposited in your Backup Stash and can be withdrawn
                                immediately
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                checked={form.accepted}
                                onChange={value => _handleFormChange("accepted", value, this)}
                                label={
                                    <Form.Text>
                                        I hereby confirm and approve this transaction, and I authorize SFS BackupCash to
                                        LOCK ???
                                        <span>{formatNumber(form.amount)}</span> &nbsp; from my BackupCash
                                        savings immediately
                                        and return it in full on the date I set in the "End Date"
                                        above. This transaction is IRREVERSIBLE.
                                        <br/>
                                        NB: Funds in "Locked Savings" cannot be accessed until end Date.
                                        Locked Funds will be sent back to your Backup Stash on end Date.
                                    </Form.Text>}
                            />
                            {this.validator.message("terms and condition", form.accepted, "accepted")}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="d-flex justify-content-end  my-2">
                        <button className="round btn-custom-blue modal-btn"
                                disabled={loading} type="submit">
                            {loading ? <ButtonLoader/> : "Start Saving"}
                        </button>
                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}

export default withToastManager(LockedSavingForm);
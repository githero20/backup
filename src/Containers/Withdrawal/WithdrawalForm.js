import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {_calculateDateDifference, _handleFormChange} from "../../../../utils/index";
import SimpleReactValidator from "simple-react-validator";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import {withToastManager} from 'react-toast-notifications';

import {createLockedSavings, getLockedInterestSavings} from "../../../../actions/LockedSavingsAction";

class WithdrawalForm extends Component {

    constructor(props) {
        super(props);
        //TODO(get the user balance and set the max amount to that amount)
        console.log(props);
        console.log(this.props);
        this.state = {
            loading:false,
            dateDifference:0,
            form: {
                title: "",
                end_date: "",
                amount: null,
                interest: 0.0,
                days:0,
                interestRate:0.0,
                accepted: false
            }
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
    }

    //Create Form
    //validate form
    //save
    //handle response

    validateForm = (e) =>{
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // this.props.toastManager("An Error Occured");
            // rerender to show messages for the first time
            this.forceUpdate();
        }else{
            this.setState({loading:true});
            //send api
            createLockedSavings(this.state.form, (status, payload) => {
                this.setState({loading:false});
                if(status){
                    console.log("Success", payload);
                    //TODO(Display Success from creating savings)
                    this.props.onHide();
                }else{
                    //TODO(Display Error from creating savings)
                    console.error("Display Error", payload);
                }
            });
        }
        console.log(this.state.form);
    };

    handleDateInput(e){
        e.preventDefault();
        _handleFormChange("end_date",e, this);
        const endDate = e.target.value;
        const dateDifference = _calculateDateDifference(null, endDate);

        console.log("enddate", endDate, dateDifference);
        getLockedInterestSavings({days: dateDifference}, this.handleLockedSavingsInterest);
        this.setState({dateDifference: dateDifference});
        //update after
    };

    handleAmountInput(e) {
        _handleFormChange("amount",e, this);
        let form = {...this.state.form};
        form.interestRate = ((form.interest/100) * e.target.value).toFixed(2);
        this.setState({form});
    }

    handleLockedSavingsInterest(status, data){
        if(status){
            let form = {...this.state.form};
            form.interest = data;
            form.interestRate = ((data/100) * form.amount).toFixed(2);
            form.days = this.state.dateDifference;
            this.setState({form});
            // console.log("payload", data.toFixed(2));
        }else{
            const {toastManager} = this.props;
            console.log("Toast", toastManager);
            //TODO("Add a toast here);
        }

        // toastManager.add("Data");


    }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.validateForm}>
                    <Form.Row>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Locked Savings Name: </Form.Label>
                            <Form.Control type="text"
                                          name="title"
                                          placeholder="e.g Car Savings"
                                          onChange={value => _handleFormChange("title",value, this)}
                                          value={this.state.form.title}
                            />
                            {this.validator.message("locked savings name",this.state.form.title,"required")}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Maturity Date</Form.Label>
                            <Form.Control
                                onChange={this.handleDateInput}
                                type="date"
                                format="YYYY-MM-DD"
                                name="end_date"
                                value={this.state.form.end_date}
                            />
                            <Form.Text className="text-muted">
                                Enter the maturity date when funds should be returned to your BackupCash savings.
                            </Form.Text>
                            {this.validator.message("maturity date",this.state.form.end_date,"required")}
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} sm={6} controlId="formGridCity">
                            <Form.Label>Capital Investment</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={this.handleAmountInput}
                                value={this.state.form.amount}

                            />
                            {this.validator.message("capital investment",this.state.form.amount,"required")}
                            <Form.Text className="text-muted">
                                Enter the amount that will be instantly removed from your BackupCash "Central Vault" balance and locked away.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} sm={6} controlId="formGridCity">
                            <Form.Label>Upfront Interest</Form.Label>
                            <Form.Control
                                type="text"
                                disabled={true}
                                value={`${this.state.form.interestRate} @ ${this.state.form.interest.toFixed(2)}% for ${this.state.form.days} days`}
                            />
                            <Form.Text className="text-muted">
                                This upfront interest will be deposited in your BackupCash "Central Vault" and can be withdrawn immediately.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicChecbox">
                            <Form.Check
                                type="checkbox"
                                checked={this.state.form.accepted}
                                onChange={value => _handleFormChange("accepted",value, this)}
                                label={<Form.Text>
                                    I hereby confirm and approve this transaction, and I authorize SFS BackupCash to LOCK ₦
                                    <span>{this.state.form.amount}</span> &nbsp; from my BackupCash savings immediately and return it in full on the date I set in the "Maturity Date"
                                    above. This transaction is IRREVERSIBLE.
                                    <br/>
                                    NB: Funds in "Locked Savings" cannot be accessed until maturity date. Locked Funds will be sent back to your BackupCash "Central Vault" on maturity date.
                                </Form.Text>} />
                            {this.validator.message("terms and condition",this.state.form.accepted,"accepted")}

                        </Form.Group>
                    </Form.Row>
                    <Form.Row className={'d-flex justify-content-between mt-2'}>
                        <div>
                            <Button onClick={this.props.onHide} className={'mr-1 round'}>Reset All</Button>
                        </div>
                        <div className={'d-flex justify-content-end'}>
                            <Button onClick={this.props.onHide}
                                    className={'mr-1 round btn-gradient-blue'}>Close</Button>

                            <Button className={'round btn-gradient-blue '} type="submit">
                                {this.state.loading ? <ButtonLoader/> : "Start Saving"}
                            </Button>
                        </div>

                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}


const FormWithToast = withToastManager(WithdrawalForm);

// export default LoginWithToast;
export default FormWithToast;
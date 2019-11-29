import React from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider} from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import {_calculateDateDifference, _handleFormChange} from "../../../utils";
import Button from "react-bootstrap/Button";
import SimpleReactValidator from "simple-react-validator";
import {createLockedSavings, getLockedInterestSavings} from "../../../actions/LockedSavingsAction";
import {withToastManager} from "react-toast-notifications";
import moment from "moment";
import {disableKey} from "../../../Helpers/Helper";


class TransferLockedSavingsModal extends React.Component {


    constructor(props) {
        super(props);
        //TODO(get the user balance and set the max amount to that amount)
        const {toastManager} = this.props;
        this.toastManager = toastManager;
        this.state = {
            loading: false,
            dateDifference: 0,
            form: {
                title: "",
                end_date: "",
                amount: 0,
                interest: 0.0,
                days: 0,
                source:'backup_stash',
                interestRate: 0.0,
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

    validateForm = (e) => {
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // this.props.toastManager("An Error Occured");
            // rerender to show messages for the first time
            this.forceUpdate();
        } else {
            this.setState({loading: true});
            //send api
            createLockedSavings(this.state.form, (status, payload) => {
                this.setState({loading: false});
                if (status) {
                    this.toastManager.add("Locked Savings Created", {
                        appearance: 'success',
                        autoDismiss:true,
                        autoDismissTimeout:3000,
                    });
                    setTimeout(()=>{
                        this.props.setupStash();
                        this.props.onHide();
                    },3000);


                } else {
                    this.toastManager.add(payload || "An Error Occurred", {
                        appearance: 'error',
                        autoDismiss:true,
                        autoDismissTimeout:3000,
                    });
                }
            });
        }
    };

    handleDateInput(e) {
        e.preventDefault();
        _handleFormChange("end_date", e, this);
        const endDate = e.target.value;
        const dateDifference = _calculateDateDifference(null, endDate);

        getLockedInterestSavings({days: dateDifference}, this.handleLockedSavingsInterest);
        this.setState({dateDifference: dateDifference});
        //update after
    };

    handleAmountInput(e) {
        let form = {...this.state.form};
        form.amount = e.target.value;
        form.interestRate = ((form.interest/100) * e.target.value).toFixed(2);
        this.setState({form});
    }

    handleLockedSavingsInterest(status, data) {
        if (status) {
            let form = {...this.state.form};
            form.interest = data;
            form.interestRate = ((data / 100) * form.amount).toFixed(2);
            form.days = this.state.dateDifference;
            this.setState({form});
        } else {
            this.toastManager.add("Unable to get Locked Savings Interest", {
                appearance: 'error',
            });
        }

        // toastManager.add("Data");


    }


    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'instant-save-modal steady-save-modal'}
            >
                <Modal.Header className={' px-md-3 py-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Transfer to Locked Saving</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        <Form onSubmit={this.validateForm}>
                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridAddress1">
                                    <Form.Label>Locked Savings Name: </Form.Label>
                                    <Form.Control type="text"
                                                  name="title"
                                                  placeholder="e.g Car Savings"
                                                  onChange={value => _handleFormChange("title", value, this)}
                                                  value={this.state.form.title}
                                    />
                                    {this.validator.message("locked savings name", this.state.form.title, "required")}
                                </Form.Group>
                                <Form.Group as={Col} sm={6}  controlId="formGridEmail">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                        onChange={this.handleDateInput}
                                        type="date"
                                        onKeyDown={disableKey}
                                        onKeyUp={disableKey}
                                        format="YYYY-MM-DD"
                                        name="end_date"
                                        min={moment().add(30,'days').format('YYYY-MM-DD')}
                                        value={this.state.form.end_date}
                                    />
                                    <Form.Text className="text-muted">
                                        Enter the end Date when funds should be returned to your Backup Stash savings.
                                    </Form.Text>
                                    {this.validator.message("end Date", this.state.form.end_date, "required")}
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
                                    {this.validator.message("capital investment", this.state.form.amount, "required")}
                                    <Form.Text className="text-muted">
                                        Enter the amount that will be instantly removed from your Backup Stash
                                        balance and locked away.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} sm={6} controlId="formGridCity">
                                    <Form.Label>Upfront Interest</Form.Label>
                                    <Form.Control
                                        type="text"
                                        disabled={true}
                                        value={`₦ ${this.state.form.interestRate} @ ${this.state.form.interest.toFixed(2)}% for ${this.state.form.days} days`}
                                    />
                                    <Form.Text className="text-muted">
                                        This upfront interest will be deposited in your Backup Stash and can be withdrawn immediately
                                    </Form.Text>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group controlId="formBasicChecbox">
                                    <Form.Check
                                        type="checkbox"
                                        checked={this.state.form.accepted}
                                        onChange={value => _handleFormChange("accepted", value, this)}
                                        label={<Form.Text>
                                            I hereby confirm and approve this transaction, and I authorize SFS BackupCash to
                                            LOCK ₦
                                            <span>{this.state.form.amount}</span> &nbsp; from my Backup Stash savings immediately
                                            and return it in full on the date I set in the "End Date"
                                            above. This transaction is IRREVERSIBLE.
                                            <br/>
                                            NB: Funds in "Locked Savings" cannot be accessed until end Date.
                                            Locked Funds will be sent back to your Backup Stash on end Date.
                                        </Form.Text>}/>
                                    {this.validator.message("terms and condition", this.state.form.accepted, "accepted")}

                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="d-flex justify-content-center justify-content-md-end  my-2">

                                <div className={'d-flex justify-content-end'}>
                                    <Button className="round btn-custom-blue modal-btn " disabled={this.state.loading} type="submit">
                                        {this.state.loading ? <ButtonLoader/> : "Start Saving"}
                                    </Button>
                                </div>
                            </Form.Row>

                        </Form>
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

export default withToastManager(TransferLockedSavingsModal);
import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import {BankCardLink} from "../../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';
import {formatNumber, getCards} from "../../../Helpers/Helper";
import {_getUser, _handleFormChange, _payWithPaystack} from "../../../utils";
import Col from "react-bootstrap/Col";
import {initTransaction, verifyTransaction} from "../../../actions/CardAction";
import {initSSDuePay, paySteadySaveDue, verifyPayDue} from "../../../actions/SteadySaveAction";
import {USERINFO} from "../../Auth/HOC/authcontroller";
import {initBGDuePay, payBGDue, verifyBGPayDue} from "../../../actions/BackUpGoalsAction";

class BGPayNowModal extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            validators: {
                amount: {
                    message: 'Please Input the Amount',
                }
            }
        });

        this.state = {
            loading: false,
            disableBtn: false,
            pinErr: false,
            form: {
                backup_goal_id: null,
                amount: '',
                payment_auth: null,
            },
            userCards: []
        };

    }

    changeHandler =(event) =>{
        _handleFormChange(
            event.target.name,
            event,
            this
        );
    };

    initiatePayStack = () => {
        //send api
        initBGDuePay(this.state.form, (status, payload) => {
            this.setState({loading: false});
            if (status) {
                _payWithPaystack(payload.reference, payload.amount, this.resolvePaystackResponse)
            } else {
                this.props.toastManager.add(payload, {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                })
            }

            this.props.onHide();
        });

    }


    resolvePaystackResponse = (response) => {
        this.setState({
            loading: false,
        });
        // {
        //     ref: response.reference,
        //         type: "instant"
        // }
        let form = {...this.state.form};
        form.reference =  response.reference;
        verifyBGPayDue(form, (status, payload) => {
            if (status) {
                this.props.toastManager.add(`Successfully paid ₦ ${formatNumber(parseFloat(this.state.form.amount).toFixed(2))}`, {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                });
                this.props.getHistoryTrans();

            } else {
                this.props.toastManager.add("Unable to add card at this moment", {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                })
            }
        })

    };

    //submit steady save form
    submitForm = (e) => {
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            this.setState({loading: true});


            //if add bank is selected
            if (parseInt(this.state.form.payment_auth) === 0) {
                //initiate paystack
                this.initiatePayStack();

            } else {

                payBGDue(this.state.form, this.handlePayResponse);
                // const id = this.props.id;
                // request(`${EditSteadySave}${id}`, null, true, 'GET', this.handleResponse)
                // }
            }

        }
    };

    handlePayResponse = (status, payload) => {
        this.setState({loading: false});
        if (!status) {
            this.props.toastManager.add("Payment Failed", {
                appearance: "error",
                autoDismissTimeout: 5000,
                autoDismiss: true
            });
        } else {
            this.props.toastManager.add( `Successfully Paid ₦ ${formatNumber(parseFloat(this.state.form.amount).toFixed())} of your dues.`, {
                appearance: "success",
                autoDismissTimeout: 3000,
                autoDismiss: true
            });
            setTimeout(() => {
                this.props.onHide()
            }, 2000);
            this.props.getHistoryTrans();

            //set timeout
        }
    };


    componentDidMount() {

        getCards(USERINFO, this);
        // set steady save to pay
        let form = {...this.state.form};
        form.backup_goal_id = this.props.selectedBG.id;
        form.amount = this.props.totalFailed;
        this.setState({
            form
        });
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'instant-save-modal steady-save-modal '}>

                <Modal.Header className={'px-md-3 py-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Pay Due Backup Goal</h4>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className={'pb-md-4 px-md-3'}>
                        <Form onSubmit={this.submitForm}>
                            <Form.Row>
                                <Form.Group as={Col} sm={12}>
                                    <div className={'text-muted secondary-text'}>Amount
                                        <span className='amount-display round float-right text-white px-1'>
                                    ₦ {formatNumber(Number(this.state.form.amount).toFixed(2))}
                                </span>
                                    </div>
                                    <React.Fragment>
                                        <Form.Control
                                            type="number"
                                            name={'amount'}
                                            value={this.state.form.amount}
                                            disabled={true}
                                            onChange={this.changeHandler}
                                        />
                                        {this.validator.message('amount', this.state.form.amount, 'required|numeric')}
                                    </React.Fragment>
                                </Form.Group>
                                <Form.Group as={Col} sm={12}>
                                    <div className={'text-muted secondary-text'}>Card:</div>
                                    <React.Fragment>
                                        <Form.Control
                                            as="select"
                                            onChange={this.changeHandler}
                                            defaultValue={this.state.form.payment_auth}
                                            name={'payment_auth'}>
                                            <option value={''}>Select Card</option>
                                            <option value={0}>Add Card</option>
                                            {
                                                this.state.userCards.map((data) => {
                                                    if (data.channel == "card")
                                                        return (
                                                            <option value={data.id} key={data.id}>{data.card_type}(****
                                                                ****
                                                                **** {data.last4})</option>
                                                        );
                                                })
                                            }
                                        </Form.Control>
                                        {this.state.userCards.length === 0 ?
                                            <label className={'text-muted mt-1'}>You do not have a card click here <Link
                                                to={BankCardLink}>Add Card</Link></label> : null}
                                        {this.validator.message('Debit Card', this.state.form.payment_auth, 'required|numeric')}
                                    </React.Fragment>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className={'d-flex justify-content-end mt-2'}>
                                <div className={'d-flex justify-content-end'}>
                                    <button className={'round modal-btn btn-custom-blue '} disabled={this.state.loading} type="submit">
                                        {this.state.loading ? <ButtonLoader/> : "Pay Now"}
                                    </button>
                                </div>
                            </Form.Row>
                        </Form>
                </Modal.Body>
            </Modal>
        );
    }


}

export default withToastManager(BGPayNowModal);
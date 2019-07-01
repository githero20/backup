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

class PayNowModal extends Component {


    // TODO Handle update KYC
    // TODO if user has updated his or her kyc SAVE A value in the local storage
    // TODO when user goes to the kyc section check the state of the value

    // TODO if the value is to update and the user amount is greater than 1M
    //  TODO let the KYC Message show on dashboard else dont show message anymore

    //TODO validate the amount user wants to pay (mustn't be more than amount due)


    // Handle Backup Goals PAY Now with the history

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            validators: {
                amount: {  // name the rule
                    message: 'Please Input the Amount',
                }
            }
        });

        this.state = {
            loading: false,
            disableBtn: false,
            pinErr: false,
            form: {
                steady_save_id: null,
                amount: '',
                payment_auth: null,
            },
            userCards: []
        };

    }


    //Retrieves user inputs
    changeHandler =(event) =>{


        _handleFormChange(
            event.target.name,
            event,
            this
        );


        // const name = event.target.name;
        // let value = event.target.value;
        //
        // //handle least instant save amount
        // // value = handleLeastAmount(name,value);
        // //copy states object
        // const data = {...this.state.form};
        // data[name] = value;
        //
        // //get select data
        //
        // //Paystack add Card
        // if (name === 'payment_auth' && value == 0) {
        //     //initiate paystack
        //     console.log('got here to initiate paystack');
        //     this.initiatePayStack();
        // }
        //
        // //manipulate object and set the state object
        //
        // this.setState({
        //     form: data
        // });
    };


    //Init Paystack
    initiatePayStack = () => {
        //send api
        console.log(this.state.form);
        initSSDuePay(this.state.form, (status, payload) => {
            console.log("status", status, payload);
            this.setState({loading: false});
            if (status) {
                // const user = _getUser();
                // console.log(user);
                _payWithPaystack(payload.reference, payload.amount, this.resolvePaystackResponse)
            } else {
                console.log(payload);
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
        console.log("Paystack Response", response);
        // {
        //     ref: response.reference,
        //         type: "instant"
        // }
        let form = {...this.state.form};
        form.reference =  response.reference;
        verifyPayDue(form, (status, payload) => {
            console.log("status", status, payload);
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
            console.log("hererererer", this, this.validator, this.validator.errorMessages);
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            console.log("here", this.state.form);
            this.setState({loading: true});


            //if add bank is selected
            if (parseInt(this.state.form.payment_auth) === 0) {
                //initiate paystack
                console.log('got here to initiate paystack');
                this.initiatePayStack();

            } else {

                paySteadySaveDue(this.state.form, this.handlePayResponse);
                // const id = this.props.id;
                // request(`${EditSteadySave}${id}`, null, true, 'GET', this.handleResponse)
                // }
            }

        }
    };

    handlePayResponse = (status, payload) => {
        this.setState({loading: false});
        if (!status) {
            console.log(payload);
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
            console.log(payload);
            setTimeout(() => {
                this.props.onHide()
            }, 2000);
            this.props.getHistoryTrans();

            //set timeout
        }
        console.log("res", status, payload);
    };


    componentDidMount() {
        //get card info and set state

        getCards(USERINFO, this);


        // set steady save to pay
        let form = {...this.state.form};
        form.steady_save_id = this.props.selectedSSave.id;
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
                        <h4>Pay Due Steady Save</h4>
                    </Modal.Title>
                    {/*<a href='#' className="gray-text back-btn "*/}
                    {/*   onClick={()=>this.props.hideForm()}>Back to Withdrawals <i className='fa fa-chevron-right'></i>*/}
                    {/*</a>*/}
                </Modal.Header>

                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    {/*<ToastProvider>*/}
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
                                            // className={'amount-input'}
                                            value={this.state.form.amount}
                                            disabled={true}
                                            onChange={this.changeHandler}
                                        />
                                        {/*{this.state.err?<span className={'srv-validation-message'}>{this.state.err}</span>:null}*/}
                                        {/*{this.validator.message('amount', amount, 'required|numeric')}*/}
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
                                    <button className={'round modal-btn btn-custom-blue '} type="submit">
                                        {this.state.loading ? <ButtonLoader/> : "Pay Now"}
                                    </button>
                                </div>
                            </Form.Row>
                        </Form>
                    {/*</ToastProvider>*/}
                </Modal.Body>
            </Modal>
        );
    }


}

export default withToastManager(PayNowModal);
import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import SimpleReactValidator from "simple-react-validator";
import {request} from "../../../../ApiUtils/ApiUtils";
import {instantSaveEndpoint} from "../../../../RouteLinks/RouteLinks";
import {ADD_BANK, MIN_INSTANT_SAVE, USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import {formatNumber, getCardsFromStorage, toastMessage} from "../../../../Helpers/Helper";
import {getUserCards, initTransaction, verifyTransaction} from "../../../../actions/CardAction";
import {_payWithPaystack} from "../../../../utils";

class InstantSavingForm extends Component {


    state = {
        form: {
            amount: null,
            payment_auth: null,
            source: 'quick',
        },
        loading: false,
        userCards: [],
        disableButton: false,
        err: null
    };


    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            validators: {
                payment_auth: {  // name the rule
                    message: 'Please Select a card',
                    required: 'Please Select a card'
                }
            }
        });
        this.getUserCards = this.getUserCards.bind(this);
    }

    //paystack


    initiatePayStack = () => {
        const {amount} = this.state.form;
        //send api
        if (amount == null || parseFloat(amount) < 100) {
            toastMessage('A minimum of ₦100 is required to add a card', 'error', this)
        } else {
            initTransaction({
                amount: parseFloat(this.state.form.amount),
                source: 'quick',
            }, (status, payload) => {
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


    }


    resolvePaystackResponse = (response) => {
        this.setState({
            loading: false,
        });
        verifyTransaction({
            ref: response.reference,
            type: "instant"
        }, (status, payload) => {
            if (status) {
                toastMessage('Card Added Successfully', 'success', this);
                this.getUserCards();
                //reload all instant saves
                this.props.updateInstantSave();
                this.props.setupInstantSave();
            } else {
                toastMessage('Unable to add card at this moment', 'error', this);
            }
        })

    }


    getUserCards() {
        getUserCards((status, payload) => {
            if (status) {
                this.setState({cards: payload});
            } else {
                this.props.toastManager.add("Unable to fetch Cards", {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                })
            }
        })
    }


    //submit steady save form
    submitForm = (e) => {
        const {form} = this.state;
        e.preventDefault();
        if (this.validator.allValid()) {
            if (Number(form.amount) < MIN_INSTANT_SAVE && parseInt(this.state.form.payment_auth) != ADD_BANK) {
                toastMessage('The minimum amount for an instant save is ₦500', 'error', this);
            } else {
                this.setState({
                    loading: true,
                    disableButton: true
                });

                //if add bank is selected
                if (parseInt(this.state.form.payment_auth) === ADD_BANK) {
                    //initiate paystack
                    this.initiatePayStack();
                } else {
                    request(instantSaveEndpoint, this.state.form, true, 'POST', this.HandleInstantSave);
                }
            }
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }

    };


    //handle response
    HandleInstantSave = (state, response) => {
        this.setState({
            loading: false,
            disableButton: false,
        });

        if (state) {
            if (response.status === 200) {
                toastMessage(`${JSON.stringify('You have successfully created an Instant Save')}`, 'success', this);
                //hide modal
                setTimeout(() => {
                    this.props.onHide(true);
                }, 1000);
            }
        } else {
            if (response) {
                toastMessage(`${JSON.stringify(response.data.message)}`, 'error', this);
            }
        }
    };


    //Retrieves user inputs
    changeHandler = event => {
        const name = event.target.name;
        let value = event.target.value;
        const data = {...this.state.form};
        data[name] = value;

        if (name === 'payment_auth' && value == 0) {
            //initiate paystack
            this.initiatePayStack();
        }

        this.setState({
            form: data
        });
    };


    componentDidMount() {
        getCardsFromStorage(USERINFO, this);
    }



    render() {
        const {payment_auth, amount} = this.state.form;
        const {userCards} = this.state;
        return (
            <React.Fragment>
                <Form className={'is-modal-form'} onSubmit={this.submitForm}>
                    <Form.Row>
                        <Col>
                            <Form.Group className={'mt-md-1 mb-md-3'}>
                                <Form.Label className='d-block'>Amount
                                    <span className='amount-display round float-right text-white px-1'>
                                    ₦ {formatNumber(Number(amount).toFixed(2))}
                                    </span>
                                </Form.Label>
                                <Form.Control type="number" placeholder={500} name={'amount'} id={'amount'}
                                              defaultValue={amount} onChange={this.changeHandler}/>
                                {this.validator.message('amount', amount, 'required|numeric')}
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col className={'mt-md-1 mb-md-3'}>
                            <Form.Group>
                                <Form.Label>Debit Card</Form.Label>
                                <Form.Control as="select" onChange={this.changeHandler} defaultValue={payment_auth}
                                              id={'payment_auth'}
                                              name={'payment_auth'}>
                                    <option value={-1}>Select Card</option>
                                    <option value={0}>Add Card</option>
                                    {
                                        userCards && userCards.length > 0 ?
                                            this.state.userCards.map((data, index) => {
                                                return (
                                                    <option value={data.id} key={data.id}>
                                                        {data.card_type}(**** **** **** {data.last4})
                                                    </option>
                                                );
                                            })
                                            : null
                                    }
                                </Form.Control>
                                {this.validator.message('payment_auth', payment_auth, 'required|numeric')}
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row className={'d-flex justify-content-center justify-content-md-end mt-2'}>
                        <button className={'round btn-custom-blue modal-btn'} disabled={this.state.loading} type="submit">
                            {this.state.loading ? <ButtonLoader/> : <span>Start Saving</span>}
                        </button>
                    </Form.Row>
                </Form>
            </React.Fragment>
        );
    }
}

export default withToastManager(InstantSavingForm);
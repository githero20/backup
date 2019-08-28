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
import {_getUser, _payWithPaystack} from "../../../../utils";

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

        //send api
        initTransaction({
            amount: parseFloat(this.state.form.amount),
            source: 'quick',
        }, (status, payload) => {
            this.setState({loading: false});
            if (status) {
                const user = _getUser();
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
        verifyTransaction({
            ref: response.reference,
            type: "instant"
        }, (status, payload) => {
            if (status) {
                this.props.toastManager.add("Card Added Successfully", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                });

                this.getUserCards();
                //reload all instant saves
                this.props.updateInstantSave();
                this.props.setupInstantSave();


            } else {
                this.props.toastManager.add("Unable to add card at this moment", {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                })
            }
        })

    }


    getUserCards() {
        getUserCards((status, payload) => {
            if (status) {
                console.log('cards', payload);
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
            if (Number(form.amount) < MIN_INSTANT_SAVE) {
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
                console.log(JSON.stringify(response));
                toastMessage(`${JSON.stringify(response.data.message)}`, 'error', this);
            }
        }
    };


    //Retrieves user inputs
    changeHandler = event => {
        const name = event.target.name;
        let value = event.target.value;

        //handle least instant save amount
        // value = handleLeastAmount(name,value);
        //copy states object
        const data = {...this.state.form};
        data[name] = value;

        //get select data

        //Paystack add Card
        if (name === 'payment_auth' && value === 0) {
            //initiate paystack
            this.initiatePayStack();
        }


        //manipulate object and set the state object

        this.setState({
            form: data
        });
    };


    textAmountHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        // check if the value exist
        if (value !== "") {
            if (parseFloat(value).toFixed(2) !== 0.00) {
                let strippedVal = value.replace(/,/g, '').replace('₦', '')
                const rawValue = parseFloat(strippedVal);
                let data = {...this.state.form};
                data[name] = rawValue;
                this.setState({
                    form: data,
                    err: ''
                })
            }
        } else {
            this.setState({
                err: 'Please Input the Amount you want to Save'
            })
        }
    }


    componentDidMount() {
        //get pay auths
        // const userInfo = getLocalStorage(USERINFO);
        // if (getLocalStorage(USERINFO) != undefined) {
        //     let userCards = filterUserCards(userInfo);
        //     this.setState({
        //         userCards: userCards
        //     });
        // }\
        // get cards from local storage
        getCardsFromStorage(USERINFO, this);
    }


    resetFormFields = () => {

        let data = this.state.form;
        data.amount = 0;
        data.payment_auth = -1;

        this.setState({
            form: data
        })
    };

    // addNewCard = () => {
    //     if (getLocalStorage(USERINFO)) {
    //         console.log(getLocalStorage(USERINFO));
    //         if (getLocalStorage(USERACTIVATED)) {
    //             let status = JSON.parse(getLocalStorage(USERACTIVATED));
    //             if (status === true) {
    //                 console.log('got here to retrieve it ');
    //                 let data = JSON.parse(getLocalStorage(USERINFO));
    //                 console.log(data);
    //             }
    //         }
    //     }
    //
    //     const handler = window.PaystackPop.setup({
    //         key: key,
    //         email: email,
    //         amount: this.calculateAmount(amount),
    //         currency: "NGN",
    //         ref: ref,
    //         channels:['card'],
    //         metadata: {
    //             custom_fields: [
    //                 {
    //                     display_name: "Mobile Number",
    //                     variable_name: "mobile_number",
    //                     value: "+2348012345678"
    //                 }
    //             ]
    //         },
    //
    //         callback: (response)=>{
    //
    //             let param = {
    //                 type:'steady_save',
    //                 ref:response.reference
    //             };
    //
    //             console.log(response);
    //
    //             let token = localStorage.getItem(USERTOKEN);
    //
    //             this.verifyTransaction(verifyTransactionEndpoint,param,token);
    //
    //         },
    //
    //         onClose: function(){
    //
    //
    //         }
    //     });
    //
    //
    //     handler.openIframe();
    //
    // };


    render() {
        const {payment_auth, amount} = this.state.form;
        // if (this.state.form.payment_auth === ADD_CARD) {
        //
        //     this.addNewCard();
        // }
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

                    {/*auto numeric */}

                    {/*<Form.Row>*/}
                    {/*    <Col>*/}
                    {/*        <Form.Group className={'mt-md-1 mb-md-3'}>*/}
                    {/*            <Form.Label>Amount</Form.Label>*/}
                    {/*            /!* used automatic js text for numbers *!/*/}
                    {/*            <Form.Control*/}
                    {/*                type="text"*/}
                    {/*                className={'amount-input'}*/}
                    {/*                placeholder={'₦500'} name={'amount'}*/}
                    {/*                id={'amount'}*/}
                    {/*                onChange={this.textAmountHandler}*/}
                    {/*            />*/}
                    {/*            {this.state.err?<span className={'srv-validation-message'}>{this.state.err}</span>:null}*/}
                    {/*            /!*{this.validator.message('amount', amount, 'required|numeric')}*!/*/}
                    {/*        </Form.Group>*/}
                    {/*    </Col>*/}
                    {/*</Form.Row>*/}
                    <Form.Row>
                        <Col className={'mt-md-1 mb-md-3'}>
                            <Form.Group>
                                <Form.Label>Debit Card</Form.Label>
                                <Form.Control as="select" onChange={this.changeHandler} defaultValue={payment_auth}
                                              id={'payment_auth'}
                                              name={'payment_auth'}>
                                    <option value={-1}>Select Card</option>
                                    <option value={0}>Add Card</option>
                                    {/*<option value={0}>Add New Card</option>*/}
                                    {/* loop through and get the number of accounts user has */}
                                    {
                                        this.state.userCards.length > 0 ?
                                            this.state.userCards.map((data, index) => {
                                                return (
                                                    <option value={data.id} key={data.id}>{data.card_type}(**** ****
                                                        **** {data.last4})</option>
                                                );
                                            })
                                            : null
                                    }
                                </Form.Control>
                                {/*{this.state.userCards.length===0?<label className={'text-muted mt-1'}>You do not have a card click here  <Link to={BankCardLink}>Add Card</Link></label>:null}*/}
                                {this.validator.message('payment_auth', payment_auth, 'required|numeric')}
                            </Form.Group>
                        </Col>
                    </Form.Row>


                    <Form.Row className={'d-flex justify-content-center justify-content-md-end mt-2'}>
                        <button className={'round btn-custom-blue modal-btn'}
                                disabled={this.state.loading} type="submit">
                            {this.state.loading ? <ButtonLoader/> :
                                <span>Start Saving</span>}
                        </button>
                    </Form.Row>
                </Form>
            </React.Fragment>
        );
    }
}

const InstantSaveFormToast = withToastManager(InstantSavingForm);

export default InstantSaveFormToast;
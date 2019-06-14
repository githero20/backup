import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import SimpleReactValidator from "simple-react-validator";
import {getLocalStorage, request} from "../../../../ApiUtils/ApiUtils";
import {BankCardLink, instantSaveEndpoint} from "../../../../RouteLinks/RouteLinks";
import {USERACTIVATED, USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import {ADD_CARD} from "../../../../Helpers/Helper";
import {getUserCards, initTransaction, verifyTransaction} from "../../../../actions/CardAction";
import {_getUser, _payWithPaystack} from "../../../../utils";
import {Link} from 'react-router-dom';

class InstantSavingForm extends Component {


    state = {
        instantSaveInfo: {
            amount: null,
            payment_auth: null,
            source: 'quick',
        },
        loading: false,
        userCards: [],
        disableButton:false
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


    initiatePayStack = () => {

        //send api
        initTransaction({
            amount: this.state.instantSaveInfo.amount,
            source: this.state.instantSaveInfo.source,
        }, (status, payload) => {
            console.log("status", status, payload);
            this.setState({loading: false});
            if (status) {
                const user = _getUser();
                console.log(user);
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


    getUserCards() {
        getUserCards((status, payload) => {
            console.log("Cards", status, payload);
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

    resolvePaystackResponse = (response) => {
        this.setState({
            loading: false,
        });
        console.log("Paystack Response", response);
        verifyTransaction({
            ref: response.reference,
            type: "instant"
        }, (status, payload) => {
            console.log("status", status, payload);
            if (status) {
                this.props.toastManager.add("Card Added Successfully", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                });

                this.getUserCards();
                this.props.updateInstantSave();

            } else {
                this.props.toastManager.add("Unable to add card at this moment", {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                })
            }
        })

    }


    //submit steady save form
    submitForm = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.setState({
                loading: true,
                disableButton:true
            });

            //Paystack add Card
            // if (parseInt(this.state.instantSaveInfo.payment_auth) === 0) {
            //     //initiate paystack
            //     console.log('got here to initiate paystack');
            //     this.initiatePayStack();
            // }
            // else
            //     {
                console.log('going without initiating');
                request(instantSaveEndpoint, this.state.instantSaveInfo, true, 'POST', this.HandleInstantSave);
            // }

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
        const {toastManager} = this.props;

        if (state) {
            if (response.status === 200) {
                toastManager.add(`${JSON.stringify('You have successfully created an Instant Save')}`, {
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                });
                // this.props.onHide();

                //hide modal
                setTimeout(() => {
                    this.props.onHide(true);
                }, 1000);
            }
        } else {
            if (response) {
                console.log(JSON.stringify(response));
                toastManager.add(`${JSON.stringify(response.data.message)}`, {
                    appearance: 'error',
                    autoDismiss: true,
                });
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
        const data = {...this.state.instantSaveInfo};
        data[name] = value;

        //get select data

        //manipulate object and set the state object

        this.setState({
            instantSaveInfo: data
        });
    };


    componentDidMount() {
        //get pay auths
        const userInfo = JSON.parse(getLocalStorage(USERINFO));

        if (JSON.parse(getLocalStorage(USERINFO))) {
            this.setState({
                userCards: userInfo.authorization.data
            })
        }
    }


    resetFormFields = () => {

        let data = this.state.instantSaveInfo;
        data.amount = 0;
        data.payment_auth = -1;

        this.setState({
            instantSaveInfo: data
        })
    };

    addNewCard = () => {
        if (getLocalStorage(USERINFO)) {
            console.log(getLocalStorage(USERINFO));
            if (getLocalStorage(USERACTIVATED)) {
                let status = JSON.parse(getLocalStorage(USERACTIVATED));
                if (status === true) {
                    console.log('got here to retrieve it ');
                    let data = JSON.parse(getLocalStorage(USERINFO));
                    console.log(data);
                }
            }
        }

        // const handler = window.PaystackPop.setup({
        //     key: key,
        //     email: email,
        //     amount: this.calculateAmount(amount),
        //     currency: "NGN",
        //     ref: ref,
        //     channels:['card'],
        //     metadata: {
        //         custom_fields: [
        //             {
        //                 display_name: "Mobile Number",
        //                 variable_name: "mobile_number",
        //                 value: "+2348012345678"
        //             }
        //         ]
        //     },
        //
        //     callback: (response)=>{
        //
        //         let param = {
        //             type:'steady_save',
        //             ref:response.reference
        //         };
        //
        //         console.log(response);
        //
        //         let token = localStorage.getItem(USERTOKEN);
        //
        //         this.verifyTransaction(verifyTransactionEndpoint,param,token);
        //
        //     },
        //
        //     onClose: function(){
        //
        //
        //     }
        // });
        //
        //
        // handler.openIframe();

    };


    render() {
        const {payment_auth, amount} = this.state.instantSaveInfo;
        if (this.state.instantSaveInfo.payment_auth === ADD_CARD) {

            this.addNewCard();
        }
        return (
            <React.Fragment>
                <Form onSubmit={this.submitForm}>
                    <Form.Row>
                        <Col>
                            <Form.Group className={'mt-md-1 mb-md-3'}>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="number" placeholder={500} name={'amount'} id={'amount'}
                                              defaultValue={amount} onBlur={this.sanitizeValue} onChange={this.changeHandler}/>
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
                                    {/*<option value={0}>Add New Card</option>*/}
                                    {/* loop through and get the number of accounts user has */}
                                    {
                                        this.state.userCards.length > 0 ?
                                            this.state.userCards.map((data, index) => {
                                                return (
                                                    <option value={data.id} key={data.id}>{data.card_type}(**** **** **** {data.last4})</option>
                                                );
                                            })
                                            : null
                                    }
                                </Form.Control>
                                {this.state.userCards.length===0?<label className={'text-muted mt-1'}>You do not have a card click here  <Link to={BankCardLink}>Add Card</Link></label>:null}
                                {this.validator.message('Debit Card', payment_auth, 'required|numeric')}
                            </Form.Group>
                        </Col>
                    </Form.Row>


                    <Form.Row className={'d-flex justify-content-center justify-content-md-end mt-2'}>
                        <button className={'round btn-custom-blue modal-btn'} disabled={this.state.disableButton?true:false} type="submit">
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
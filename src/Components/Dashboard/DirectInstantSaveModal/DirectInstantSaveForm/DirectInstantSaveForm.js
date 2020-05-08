import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {filterUserCards, formatNumber, getCardsFromStorage, toastMessage} from "../../../../Helpers/Helper";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import {_handleFormChange} from "../../../../utils";
import {Link} from "react-router-dom";
import {BankCardLink} from "../../../../RouteLinks/RouteLinks";
import {CreateInstantSave} from "../../../../actions/instantSaveAction";
import {getLocalStorage} from "../../../../ApiUtils/ApiUtils";


class DirectInstantSaveForm extends Component {


    constructor(props) {
        super(props);
        this.toastManager = this.props.toastManager;
        this.state = {
            loading: false,
            disableStartDate: false,
            form: {
                amount: '10000',
                payment_auth: '',
                source: 'quick',
            },
            userCards: []
        };
        this.validator = new SimpleReactValidator();
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        getCardsFromStorage(USERINFO, this);
        this.getFirstCardFromStorage();
    }


    getFirstCardFromStorage() {
        const {form} = this.state;
        const cards = filterUserCards(getLocalStorage(USERINFO));
        let formData = form;
        formData.payment_auth = cards && cards[0] && cards[0].id;
        this.setState({
            form: formData
        })
    }

    //Retrieves user inputs
    changeHandler(event) {
        _handleFormChange(
            event.target.name,
            event,
            this
        );
    };


    //submit steady save form
    submitForm = (e) => {
        const {form} = this.state;
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            this.setState({loading: true});
            CreateInstantSave(form, (status, payload) => {
                this.setState({loading: false});
                if (!status) {
                    toastMessage((payload && payload.data && payload.data.message) || 'Unable to create instant save at the moment!', "error", this);
                } else {
                    toastMessage("New instant save created successfully", "success", this);
                    setTimeout(() => {
                        this.props.onHide(true)
                    }, 3000);
                }
            })
        }
    };


    render() {
        const {form, userCards, loading} = this.state;
        return (
            <React.Fragment>
                <Form onSubmit={this.submitForm}>
                    <Form.Row>
                        <Form.Group as={Col} sm={12}>
                            <div className={'text-muted secondary-text'}>Contribution
                                <span className='amount-display round float-right text-white px-1'>
                                    ₦ {formatNumber(Number(form.amount).toFixed(2))}
                                </span>
                            </div>
                            <React.Fragment>
                                <Form.Control
                                    as="select"
                                    name={'amount'}
                                    defaultValue={form.amount}
                                    onChange={this.changeHandler}>
                                    <option value={'5000'}>₦5,000</option>
                                    <option value={'10000'}>₦10,000</option>
                                    <option value={'20000'}>₦20,000</option>
                                </Form.Control>

                                {this.validator.message('amount', form.amount, 'required|numeric')}
                            </React.Fragment>
                        </Form.Group>
                        <Form.Group as={Col} sm={12}>
                            <div className={'text-muted secondary-text'}>Card:</div>
                            <React.Fragment>
                                <Form.Control
                                    as="select"
                                    onChange={this.changeHandler}
                                    value={userCards && userCards.length && userCards[0].id}
                                    name={'payment_auth'}>
                                    <option value={''}>Select Card</option>
                                    {
                                        userCards && userCards.map((data) => {
                                            if (data.channel == "card") {
                                                return (
                                                    <option value={data.id} key={data.id}>
                                                        {data.card_type}(**** **** **** {data.last4})
                                                    </option>
                                                );
                                            }
                                        })
                                    }
                                </Form.Control>
                                {userCards && userCards.length === 0 ?
                                    <label className={'text-muted mt-1'}>
                                        You do not have a card click here
                                        <Link to={BankCardLink}>Add Card</Link>
                                    </label> : null}
                                {this.validator.message('Debit Card', form.payment_auth, 'required')}
                            </React.Fragment>
                        </Form.Group>
                    </Form.Row>


                    <Form.Row className={'d-flex justify-content-end mt-2'}>
                        <div className={'d-flex justify-content-end'}>
                            <button className={'round modal-btn btn-custom-blue '} disabled={loading}
                                    type="submit">
                                {loading ? <ButtonLoader/> : "Save"}
                            </button>
                        </div>
                    </Form.Row>
                </Form>
            </React.Fragment>
        )
    }

}

export default withToastManager(DirectInstantSaveForm);

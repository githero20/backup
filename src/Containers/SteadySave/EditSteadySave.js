import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import SimpleReactValidator from "simple-react-validator";
import {USERINFO} from "../../Components/Auth/HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {_calculateDateDifference, _handleFormChange, _payWithPaystack} from "../../utils";
import ButtonLoader from "../../Components/Auth/Buttonloader/ButtonLoader";
import {updateSteadySave} from "../../actions/SteadySaveAction";
import {initTransaction, verifyTransaction} from "../../actions/CardAction";
import moment from "moment";
import {
    disableKey,
    formatNumber,
    getCardsFromStorage,
    getToken,
    toastMessage,
    validateSteadySaveAmount
} from "../../Helpers/Helper";
import {Link} from 'react-router-dom';
import {BankCardLink} from "../../RouteLinks/RouteLinks";


class SteadySaveForm extends Component {


    constructor(props) {
        super(props);
        this.toastManager = this.props.toastManager;
        this.state = {
            loading: false,
            disableStartDate: false,
            form: this.props.steadySave,
            showMonth: false,
            showDay: false,
            showHour: false,
            userCards: [],
            addCard: false
        };
        this.validator = new SimpleReactValidator();
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        this.setState({form: this.props.steadySave});
        this.validateStartDate();
        this.handleFrequencySelect(this.props.steadySave);
        getCardsFromStorage(USERINFO, this);
    }

    validateStartDate() {
        const date = _calculateDateDifference(this.props.steadySave.start_date);
        if (date > 0) {
            this.setState({disableStartDate: true});
        }
    }

    //Retrieves user inputs
    changeHandler(event) {
        const form = _handleFormChange(
            event.target.name,
            event,
            this
        );

        const name = event.target.name;
        const value = event.target.value;
        if (name == 'payment_auth' && value == 'add') {
            this.setState({
                addCard: true
            })
        } else {
            this.setState({
                addCard: false
            })
        }

        this.handleFrequencySelect(form);

    };

    //validate form
    handleFrequencySelect(form) {
        if (form.frequency == "daily") {
            this.setState({
                showMonth: false,
                showDay: false,
                showHour: true,
            });
        } else if (form.frequency == "weekly") {
            this.setState({
                showMonth: false,
                showDay: true,
                showHour: true,
            });
        } else if (form.frequency == "monthly") {
            this.setState({
                showMonth: true,
                showDay: false,
                showHour: true,
            })
        }
    }

    initiatePayStack = () => {
        initTransaction({
            amount: parseFloat(this.state.form.contribution),
            source: 'quick',
        }, (status, payload) => {
            this.setState({loading: false});
            if (status) {
                _payWithPaystack(payload.reference, payload.amount, this.resolvePaystackResponse)
            } else {
                toastMessage(payload, 'error', this);
            }
            this.props.onHide();
        });
    };


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
                this.filterUserCards();
            } else {
                toastMessage("Unable to add card at this moment", 'error', this);
            }
        })

    }


    //submit steady save form
    submitForm = (e) => {
        const {form: {frequency, contribution}} = this.state;
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            const valid = validateSteadySaveAmount(frequency, contribution, this);
            if (valid) {
                this.setState({loading: true});
                //make sure user is authenticated
                let token = getToken();
                token.then(data => {
                    updateSteadySave(this.props.steadySave.id, this.state.form, (status, payload) => {
                        this.setState({loading: false});
                        if (status) {
                            toastMessage("Steady save updated successfully", 'success', this);
                            setTimeout(this.props.onHide, 3000);
                            this.props.setupSteadySave();
                            let param = payload;
                            param.payment_auth = param.gw_authorization_code;
                            this.props.updateSteadySaveForm(param);
                        } else {
                            toastMessage('Unable to update steady Save at the moment.', 'error', this);
                            console.log('error', payload);
                        }
                    })
                });
            }

        }

    };


    render() {
        const showHour = (
            <Form.Group as={Col} sm={6} type="text">
                <Form.Label>Hour of the day</Form.Label>
                <Form.Control as="select" defaultValue={this.state.form.hour_of_day}
                              onChange={this.changeHandler} id="hour_of_day" name="hour_of_day">
                    <option value={'1'}>1:00 am</option>
                    <option value={'2'}>2:00 am</option>
                    <option value={'3'}>3:00 am</option>
                    <option value={'4'}>4:00 am</option>
                    <option value={'5'}>5:00 am</option>
                    <option value={'6'}>6:00 am</option>
                    <option value={'7'}>7:00 am</option>
                    <option value={'8'}>8:00 am</option>
                    <option value={'9'}>9:00 am</option>
                    <option value={'10'}>10:00 am</option>
                    <option value={'11'}>11:00 am</option>
                    <option value="12">12:00 noon</option>
                    <option value="13">1:00 pm</option>
                    <option value="14">2:00 pm</option>
                    <option value="15">3:00 pm</option>
                    <option value="16">4:00 pm</option>
                    <option value="17">5:00 pm</option>
                    <option value="18">6:00 pm</option>
                    <option value="19">7:00 pm</option>
                    <option value="20">8:00 pm</option>
                    <option value="21">9:00 pm</option>
                    <option value="22">10:00 pm</option>
                    <option value="23">11:00 pm</option>
                    <option value="0">12:00 am</option>
                </Form.Control>
            </Form.Group>
        );
        const showMonth = (
            <Form.Group as={Col} sm={6} type="text">
                <Form.Label>Day of the Month</Form.Label>
                <Form.Control as="select" defaultValue={this.state.form.day_of_month}
                              onChange={this.changeHandler} id="day_of_month" name={'day_of_month'}>
                    <option value={'1'}>1</option>
                    <option value={'2'}>2</option>
                    <option value={'3'}>3</option>
                    <option value={'4'}>4</option>
                    <option value={'5'}>5</option>
                    <option value={'6'}>6</option>
                    <option value={'7'}>7</option>
                    <option value={'8'}>8</option>
                    <option value={'9'}>9</option>
                    <option value={'10'}>10</option>
                    <option value={'11'}>11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                </Form.Control>
            </Form.Group>
        );

        const showDay = (
            <Form.Group as={Col} sm={6} type="text">
                <Form.Label>Day of the Week</Form.Label>
                <Form.Control as="select" defaultValue={this.state.form.day_of_week} onChange={this.changeHandler}
                              id="day_of_week" name="day_of_week">
                    <option value={'2'}>Mon</option>
                    <option value={'3'}>Tue</option>
                    <option value={'4'}>Wed</option>
                    <option value={'5'}>Thur</option>
                    <option value={'6'}>Fri</option>
                    <option value={'7'}>Sat</option>
                    <option value={'1'}>Sun</option>
                </Form.Control>
            </Form.Group>
        );

        return (
            <React.Fragment>
                <Form onSubmit={this.submitForm}>
                    <Form.Row>
                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Contribution
                                <span className='amount-display round float-right text-white px-1'>
                                    ₦ {formatNumber(Number(this.state.form.contribution).toFixed(2))}
                                    </span>
                            </div>
                            <React.Fragment>
                                <Form.Control
                                    type="number"
                                    name={'contribution'}
                                    defaultValue={this.state.form.contribution}
                                    onChange={this.changeHandler}/>

                                {this.validator.message('contribution', this.state.form.contribution, 'required|numeric')}
                            </React.Fragment>
                        </Form.Group>
                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Card:</div>
                            <React.Fragment>
                                <Form.Control
                                    as="select"
                                    onChange={this.changeHandler}
                                    value={this.state.form.payment_auth}
                                    name={'payment_auth'}>
                                    <option value={''}>Select Card</option>
                                    <option value={'add'}>Add Card</option>
                                    {
                                        this.state.userCards.map((data, index) => {
                                            if (data.channel == "card") {
                                                return (
                                                    <option value={data.id} key={data.id}
                                                            selected={index === 0 ? true : null}>
                                                        [{data.card_type.toUpperCase()} **** **** **** {data.last4}] [exp: {data.exp_month}/{data.exp_year}]
                                                    </option>
                                                );
                                            }
                                        })
                                    }
                                </Form.Control>

                                {this.validator.message('Card', this.state.form.payment_auth, 'required|numeric')}
                            </React.Fragment>
                            {this.state.addCard ?
                                <label className={'text-muted mt-1'}> click here to <Link to={BankCardLink}>Add
                                    Card</Link></label> :
                                null}

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Frequency</div>
                            <React.Fragment>
                                <Form.Control
                                    as="select"
                                    onChange={this.changeHandler}
                                    defaultValue={this.state.form.frequency}
                                    name={'frequency'}>
                                    <option value={'daily'}>Daily</option>
                                    <option value={'weekly'}>Weekly</option>
                                    <option value={'monthly'}>Monthly</option>
                                </Form.Control>
                                {this.validator.message('frequency', this.state.form.frequency, 'required|string')}
                            </React.Fragment>
                        </Form.Group>
                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Start Date</div>
                            <React.Fragment>
                                <Form.Control type="date"
                                              min={moment().format('YYYY-MM-DD')}
                                              onKeyDown={disableKey}
                                              onKeyUp={disableKey}
                                              defaultValue={this.state.form.start_date}
                                              name={'start_date'}
                                              id={'start_date'}
                                              disabled={true}
                                              onChange={this.changeHandler}/>
                                {this.validator.message('start_date', this.state.form.start_date, 'required|string')}
                            </React.Fragment>
                        </Form.Group>
                        {this.state.showHour ? showHour : null}
                        {this.state.showDay ? showDay : null}
                        {this.state.showMonth ? showMonth : null}
                    </Form.Row>
                    <Form.Row className={'d-flex justify-content-end mt-2'}>
                        <div className={'d-flex justify-content-end'}>
                            <button className={'round modal-btn btn-custom-blue '} disabled={this.state.loading}
                                    type="submit">
                                {this.state.loading ? <ButtonLoader/> : "Update"}
                            </button>
                        </div>
                    </Form.Row>
                </Form>
            </React.Fragment>
        );
    }

}


export default withToastManager(SteadySaveForm);

import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {
    dateFormat,
    disableKey,
    formatNumber,
    getCardsFromStorage,
    initializeAmountInput,
    toastMessage,
    validateSteadySaveAmount
} from "../../../../Helpers/Helper";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import {_calculateDateDifference, _handleFormChange} from "../../../../utils";
import moment from "moment";
import {Link} from "react-router-dom";
import {BankCardLink} from "../../../../RouteLinks/RouteLinks";
import {displayHours} from "../../EditBackUpGoalModal/BackUpGoalForm/EditBGForm";
import {createSteadySave} from "../../../../actions/SteadySaveAction";


class CreateSteadySaveForm extends Component {


    constructor(props) {
        super(props);
        this.toastManager = this.props.toastManager;
        const hourOfDay = moment().add(1, 'hour').hour();
        this.state = {
            loading: false,
            disableStartDate: false,
            form: {
                id: null,
                contribution: null,
                start_date: "N/A",
                frequency: "daily",
                hour_of_day: hourOfDay,
                day_of_week: '2',
                day_of_month: '1',
                payment_auth: null,
                raw: null,
                title: 'steady save'
            },
            err: '',
            showMonth: false,
            showDay: false,
            showHour: true,
            userCards: []
        };
        this.validator = new SimpleReactValidator();
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        // this.setState({form:this.props.steadySave});
        this.validateStartDate();
        this.handleFrequencySelect(this.state.form);
        getCardsFromStorage(USERINFO, this);
        initializeAmountInput();
    }

    validateStartDate() {
        const date = _calculateDateDifference(this.state.form.start_date);
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
                form
            });
        } else if (form.frequency == "monthly") {
            this.setState({
                showMonth: true,
                showDay: false,
                showHour: true,
            })
        }
    }


    //submit steady save form
    submitForm = (e) => {
        const {form: {contribution, frequency, start_date}} = this.state;
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            const valid = validateSteadySaveAmount(contribution, frequency, this);
            if (start_date == "N/A") toastMessage('Please Select Start Date', 'error', this)
            else if (valid) {
                this.setState({loading: true});
                createSteadySave(this.state.form, (status, payload) => {
                    this.setState({loading: false});
                    if (!status) {
                        toastMessage(JSON.stringify(payload), "error", this);
                    } else {
                        toastMessage("New steady save created successfully", "success", this);
                        setTimeout(() => {
                            this.props.onHide()
                        }, 2000);
                        this.props.setupSteadySave();
                        //set timeout
                    }
                })
            }
        }

    };


    render() {
        const {form, userCards, disableStartDate} = this.state;
        const hourOptions = moment(form.start_date).format(dateFormat) == moment().format(dateFormat) ?
            displayHours('desc')() : displayHours()();
        const showHour = (
            <Form.Group as={Col} sm={6} type="text">
                <Form.Label>Hour of the day</Form.Label>
                <Form.Control as="select" value={form.hour_of_day}
                              onChange={this.changeHandler} id="hour_of_day" name="hour_of_day">
                    {hourOptions}
                </Form.Control>
                {this.validator.message('hour_of_day', form.hour_of_day, 'required|numeric')}
            </Form.Group>
        );
        const showMonth = (
            <Form.Group as={Col} sm={6} type="text">
                <Form.Label>Day of the Month</Form.Label>
                <Form.Control as="select" value={form.day_of_month} onChange={this.changeHandler}
                              id="day_of_month" name={'day_of_month'}>
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
                <Form.Control as="select" value={form.day_of_week} onChange={this.changeHandler}
                              id="day_of_week" name="day_of_week">
                    <option value={'1'}>Mon</option>
                    <option value={'2'}>Tue</option>
                    <option value={'3'}>Wed</option>
                    <option value={'4'}>Thur</option>
                    <option value={'5'}>Fri</option>
                    <option value={'6'}>Sat</option>
                    <option value={'0'}>Sun</option>
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
                                    ₦ {formatNumber(Number(form.contribution).toFixed(2))}
                                </span>
                            </div>
                            <React.Fragment>
                                <Form.Control
                                    type="number"
                                    name={'contribution'}
                                    defaultValue={form.contribution}
                                    onChange={this.changeHandler}/>
                                {this.validator.message('contribution', form.contribution, 'required|numeric')}
                            </React.Fragment>
                        </Form.Group>
                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Card:</div>
                            <React.Fragment>
                                <Form.Control
                                    as="select"
                                    onChange={this.changeHandler}
                                    defaultValue={form.payment_auth}
                                    name={'payment_auth'}>
                                    <option value={''}>Select Card</option>
                                    {
                                        userCards && userCards.map((data) => {
                                            if (data.channel == "card")
                                                return (
                                                    <option value={data.id} key={data.id}>
                                                        {data.card_type}(**** **** **** {data.last4})
                                                    </option>
                                                );
                                        })
                                    }
                                </Form.Control>
                                {userCards && userCards.length === 0 ?
                                    <label className={'text-muted mt-1'}>
                                        You do not have a card click here
                                        <Link to={BankCardLink}>Add Card</Link>
                                    </label> : null}
                                {this.validator.message('Debit Card', form.payment_auth, 'required|numeric')}
                            </React.Fragment>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Frequency</div>
                            <React.Fragment>
                                <Form.Control
                                    as="select"
                                    onChange={this.changeHandler}
                                    defaultValue={form.frequency}
                                    name={'frequency'}>
                                    <option value={'daily'}>Daily</option>
                                    <option value={'weekly'}>Weekly</option>
                                    <option value={'monthly'}>Monthly</option>
                                </Form.Control>
                                {this.validator.message('frequency', form.frequency, 'required|string')}
                            </React.Fragment>
                        </Form.Group>

                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Start Date</div>
                            <React.Fragment>
                                <Form.Control type="date"
                                              onKeyDown={disableKey}
                                              onKeyUp={disableKey}
                                              min={moment().format("YYYY-MM-DD")}
                                              max={moment().add(1, 'days').format("YYYY-MM-DD")}
                                              defaultValue={form.start_date} name={'start_date'}
                                              id={'start_date'}
                                              disabled={disableStartDate}
                                              onChange={this.changeHandler}/>
                                {this.validator.message('start_date', form.start_date, 'required|string')}
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
                                {this.state.loading ? <ButtonLoader/> : "Start"}
                            </button>
                        </div>
                    </Form.Row>
                </Form>
            </React.Fragment>
        )
    }

}

export default withToastManager(CreateSteadySaveForm);
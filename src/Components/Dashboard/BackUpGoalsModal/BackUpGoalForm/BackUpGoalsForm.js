import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import SimpleReactValidator from "simple-react-validator";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";
import {_calculateDateDifference, _handleFormChange} from "../../../../utils";
import {createBackUpGoal} from "../../../../actions/BackUpGoalsAction";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import {disableKey, formatNumber, getCardsFromStorage, validateBackupGoalAmount} from "../../../../Helpers/Helper";
import moment from "moment";
import {Link} from "react-router-dom";
import {BankCardLink} from "../../../../RouteLinks/RouteLinks";


class BackUpGoalsForm extends Component {

    constructor(props) {
        super(props);
        const {toastManager} = this.props;
        this.toastManager = toastManager;
        this.validator = new SimpleReactValidator();
        this.state = {
            form: {
                start_date: undefined,
                maturity_date: undefined,
                title: "",
                payment_auth: null,
                frequency: 'daily',
                hour_of_day: '12',
                contribution: '',
                goal_amount: '',
                day_of_week: null,
                day_of_month: null,
            },
            dateDifference: 0,
            userCards: [],
            showMonth: false,
            showDay: false,
            showHour: true,
            loading: false,
            err: '',
            addCard: false

        };
        this.reset = this.reset.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleFrequencySelect = this.handleFrequencySelect.bind(this);
        this.handleGoalAmount = this.handleGoalAmount.bind(this);
    }

    //validate form
    handleFrequencySelect(form, inverse = false) {
        // console.log(form);
        if (inverse) {
            if (form.frequency == "daily") {
                form.contribution = (form.goal_amount / _calculateDateDifference(form.start_date, form.maturity_date, "days")) || 0;
                this.setState({
                    showMonth: false,
                    showDay: false,
                    showHour: true,
                    form
                });
                //calculate the difference between the start date and the end Date
            } else if (form.frequency == "weekly") {
                form.contribution = (form.goal_amount / _calculateDateDifference(form.start_date, form.maturity_date, "weeks")) || 0;
                this.setState({
                    showMonth: false,
                    showDay: true,
                    showHour: true,
                    form
                });
            } else if (form.frequency == "monthly") {
                form.contribution = (form.goal_amount / _calculateDateDifference(form.start_date, form.maturity_date, "months")) || 0;
                this.setState({
                    showMonth: true,
                    showDay: false,
                    showHour: true,
                    form
                })
            }
        } else {
            if (form.frequency == "daily") {
                form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date, "days") * form.contribution) || 0;
                console.log('daily goal amount', form.goal_amount);
                this.setState({
                    showMonth: false,
                    showDay: false,
                    showHour: true,
                    form
                });
                //calculate the difference between the start date and the end Date
            } else if (form.frequency == "weekly") {
                form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date, "weeks") * form.contribution) || 0;
                this.setState({
                    showMonth: false,
                    showDay: true,
                    showHour: true,
                    form
                });
            } else if (form.frequency == "monthly") {
                console.log('monthly goal amount', form.goal_amount);

                form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date, "months") * form.contribution) || 0;
                this.setState({
                    showMonth: true,
                    showDay: false,
                    showHour: true,
                    form
                })
            }
        }


        // console.log("Form", form);
    }

    submitForm = (e) => {
        const {frequency, contribution} = this.state.form;
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        } else {
            //show loader
            const valid = validateBackupGoalAmount(frequency, contribution, this);
            if (valid) {
                this.setState({
                    loading: true,
                });
                createBackUpGoal(this.state.form, (status, payload) => {
                    //remove loader

                    this.setState({
                        loading: false,
                    });
                    console.log("Res", status, payload);
                    if (status) {
                        console.log("here");
                        this.props.toastManager.add("Backup Goal Saved.", {
                            appearance: "success"
                        });
                        setTimeout(() => this.props.onHide(true), 2000);
                    } else {
                        // console.log(payload, "Message", this.toastManager);
                        this.props.toastManager.add(JSON.stringify(payload) || "An Error Occurred", {
                            appearance: "error",
                            autoDismiss: true,
                            autoDismissTimeout: 5000
                        });
                    }
                });
            }

        }

    };


    handleGoalAmount(e) {
        this.changeHandler(e, true)
    }

    //Retrieves user inputs
    changeHandler(event, inverse = false) {
        const form = _handleFormChange(
            event.target.name,
            event,
            this
        );

        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value);
        if (name == 'payment_auth' && value == 'add') {
            this.setState({
                addCard: true
            })
        } else {
            this.setState({
                addCard: false
            })
        }
        // console.log("megg", event.target.name, event.target.value);
        this.handleFrequencySelect(form, inverse);

    };

    reset() {

        let data = this.state.form;
        data.amount = 0;
        data.payment_auth = -1;
        data.start_date = null;
        data.maturity_date = null;
        data.title = null;
        data.payment_auth = null;
        data.frequency = 'daily';
        data.hour_of_day = '12';
        data.contribution = null;
        data.goal_amount = null;
        data.day_of_week = '1';
        data.day_of_month = '1';

        this.setState({
            form: data
        })

    };


    textAmountHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        console.log(name, value);
        // check if the value exist
        if (value !== "") {
            if (parseFloat(value).toFixed(2) !== 0.00) {
                const rawValue = parseFloat(value.trim().replace(',', '').replace('₦', ''))
                console.log(name, rawValue);
                let data = {...this.state.instantSaveInfo};
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
    };

    componentDidMount() {
        getCardsFromStorage(USERINFO, this);
    }

    render() {
        const {title, goal_amount, start_date, frequency, payment_auth, maturity_date, contribution, hour_of_day, day_of_week, day_of_month} = this.state.form;

        const showHour = (
            <Form.Group as={Col} type="text">
                <Form.Label>Hour of the day</Form.Label>
                <Form.Control as="select" defaulValue={this.state.form.hour_of_day} onChange={this.changeHandler}
                              id="hour_of_day" name="hour_of_day">
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
                    <option value="24">12:00 am</option>
                </Form.Control>

            </Form.Group>
        );
        const showMonth = (
            <Form.Group as={Col} type="text">
                <Form.Label>Day of the Month</Form.Label>
                <Form.Control as="select" defaultValue={this.state.form.day_of_month} onChange={this.changeHandler}
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
            <Form.Group as={Col} type="text">
                <Form.Label>Day of the Week</Form.Label>
                <Form.Control as="select" defaultValue={this.state.form.day_of_week} onChange={this.changeHandler}
                              id="day_of_week" name="day_of_week">
                    <option value={'1'}>Mon</option>
                    <option value={'2'}>Tue</option>
                    <option value={'3'}>Wed</option>
                    <option value={'4'}>Thur</option>
                    <option value={'5'}>Fri</option>
                    <option value={'6'}>Sat</option>
                    <option value={'7'}>Sun</option>
                </Form.Control>
            </Form.Group>
        );
        return (
            <React.Fragment>
                <Form onSubmit={this.submitForm}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Plan Name</Form.Label>
                            <Form.Control
                                type="text"
                                name={'title'}
                                id={'title'}
                                onChange={this.changeHandler}
                                placeholder={'e.g School fees'}
                                defaultValue={title}
                            />
                            {this.validator.message('title', title, 'required|string')}
                        </Form.Group>

                        <Form.Group as={Col} sm={6}>
                            <Form.Label className='d-block'>Contribution(NGN)
                                <span className='amount-display round float-right text-white px-1'>
                                    ₦ {formatNumber(Number(contribution).toFixed(2))}
                                </span>
                            </Form.Label>
                            <Form.Control
                                type="number" id="contribution"
                                // className={'amount-input'}
                                value={contribution != 0 ?contribution : contribution}
                                step={'5'} name="contribution"
                                onChange={this.changeHandler}/>
                            <Form.Text className="text-muted">
                                Contribution range daily [ &#8358; 50 - &#8358; 25000]
                            </Form.Text>
                            {this.validator.message('contribution', contribution, 'required|numeric')}

                            {/*{this.state.err?<span className={'srv-validation-message'}>{this.state.err}</span>:null}*/}

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name={'start_date'}
                                          onKeyDown={disableKey}
                                          onKeyUp={disableKey}
                                          id={'start_date'}
                                          min={moment().add(1, 'days').format('YYYY-MM-DD')}
                                          value={start_date}
                                          onChange={this.changeHandler}
                            />
                            {this.validator.message('start_date', start_date, 'required|string')}

                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name={'maturity_date'}
                                id={'maturity_date'}
                                onKeyDown={disableKey}
                                onKeyUp={disableKey}
                                min={moment(start_date).add(1, 'days').format('YYYY-MM-DD')}
                                value={maturity_date}
                                onChange={this.changeHandler}/>
                            {this.validator.message('maturity_date', maturity_date, 'required|string')}

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Account to Debit</Form.Label>
                            <Form.Control as="select" onChange={this.changeHandler} defaultValue={'payment_auth'}
                                          value={payment_auth} id={'payment_auth'}
                                          name={'payment_auth'}>
                                <option value={''}>Select Card</option>
                                <option value={'add'}>Add Card</option>
                                {/* loop through and get the number of accounts user has */}
                                {
                                    this.state.userCards.length > 0 ?

                                        this.state.userCards.map((data) => {
                                            if (data.channel == "card")
                                                return (
                                                    <option value={data.id} key={data.id}>{data.card_type}(**** ****
                                                        **** {data.last4})</option>
                                                );

                                        })
                                        : null
                                }

                            </Form.Control>
                            {this.validator.message('payment_auth', payment_auth, 'required|numeric')}
                            {this.state.addCard ?
                                <label className={'text-muted mt-1'}> click here to <Link to={BankCardLink}>Add
                                    Card</Link></label> : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className='d-block'>Goal Amount(NGN)
                                <span className='amount-display round float-right text-white px-1'>
                                    ₦ {formatNumber(Number(goal_amount).toFixed(2))}
                                </span>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                // className={'amount-input'}
                                name={'goal_amount'}
                                id={'goal_amount'}
                                value={goal_amount != 0 ? goal_amount : goal_amount}
                                onChange={this.handleGoalAmount}
                            />
                            {this.validator.message('Goal Amount', goal_amount, 'required|numeric')}

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Frequency </Form.Label>
                            {/*select Box */}
                            <Form.Control as="select" id="frequency" defaultValue={frequency}
                                          onChange={this.changeHandler} name={'frequency'}>
                                <option value={'daily'}>Daily</option>
                                <option value={'weekly'}>Weekly</option>
                                <option value={'monthly'}>Monthly</option>
                            </Form.Control>
                            {this.validator.message('frequency', frequency, 'required|string')}
                        </Form.Group>

                        {this.state.showHour ? showHour : null}
                        {this.state.showDay ? showDay : null}
                        {this.state.showMonth ? showMonth : null}
                    </Form.Row>
                    <Form.Row className={'d-flex justify-content-end mt-2'}>

                        <Button className={'round btn-custom-blue modal-btn'} disabled={this.state.loading}
                                type="submit">
                            {this.state.loading ? <ButtonLoader/> :
                                <span>Start </span>}

                        </Button>
                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}


export default withToastManager(BackUpGoalsForm);



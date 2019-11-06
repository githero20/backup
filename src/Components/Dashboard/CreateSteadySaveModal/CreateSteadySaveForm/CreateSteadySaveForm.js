import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {
    disableKey,
    formatNumber,
    getCardsFromStorage,
    initializeAmountInput,
    validateSteadySaveAmount
} from "../../../../Helpers/Helper";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import {_calculateDateDifference, _handleFormChange} from "../../../../utils";
import moment from "moment";
import {Link} from "react-router-dom";
import {BankCardLink} from "../../../../RouteLinks/RouteLinks";
import {createSteadySave} from "../../../../actions/SteadySaveAction";


class CreateSteadySaveForm extends Component {


    constructor(props) {
        super(props);
        console.log("props", props);
        this.toastManager = this.props.toastManager;
        this.state = {
            loading: false,
            disableStartDate: false,
            form: {
                id: null,
                contribution: null,
                start_date: "N/A",
                frequency: "daily",
                hour_of_day: 0,
                day_of_the_week: '2',
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
        console.log("start", this.state);
        this.validator = new SimpleReactValidator();
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        // this.setState({form:this.props.steadySave});
        this.validateStartDate();
        this.handleFrequencySelect(this.state.form);
        // const userInfo = getLocalStorage(USERINFO);
        // if (getLocalStorage(USERINFO)!=undefined) {
        //     this.setState({
        //         userCards: userInfo.authorization.data
        //     })
        // }
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

        // console.log("megg", event.target.name, event.target.value);
        this.handleFrequencySelect(form);

    };

    //validate form
    handleFrequencySelect(form) {
        if (form.frequency == "daily") {
            console.log('dailt');
            this.setState({
                showMonth: false,
                showDay: false,
                showHour: true,
            });
        } else if (form.frequency == "weekly") {
            console.log('weekly');
            // form.day_of_the_week = '2';
            // form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"weeks") * form.contribution) || 0;
            this.setState({
                showMonth: false,
                showDay: true,
                showHour: true,
                form
            });
        } else if (form.frequency == "monthly") {
            // form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"months") * form.contribution) || 0;
            // form.day_of_month = '1';
            this.setState({
                showMonth: true,
                showDay: false,
                showHour: true,
            })
        }
        // console.log("Form", form);
    }


    //submit steady save form
    submitForm = (e) => {
        const {contribution, frequency} = this.state.form;
        e.preventDefault();
        if (!this.validator.allValid()) {
            console.log("hererererer", this, this.validator, this.validator.errorMessages);
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            const valid = validateSteadySaveAmount(contribution, frequency, this);
            console.log("here", this.state.form);
            if (valid) {
                this.setState({loading: true});

                createSteadySave(this.state.form, (status, payload) => {
                    this.setState({loading: false});
                    if (!status) {
                        this.toastManager.add(JSON.stringify(payload), {
                            appearance: "error",
                            autoDismissTimeout: 5000,
                            autoDismiss: true
                        });
                    } else {
                        this.toastManager.add("New steady save created successfully", {
                            appearance: "success",
                            autoDismissTimeout: 3000,
                            autoDismiss: true
                        });
                        console.log(payload);
                        setTimeout(() => {
                            this.props.onHide()
                        }, 2000);
                        this.props.setupSteadySave();
                        //set timeout
                    }
                    console.log("res", status, payload);
                })
            }
        }

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


    render() {

        const showHour = (
            <Form.Group as={Col} sm={6} type="text">
                <Form.Label>Hour of the day</Form.Label>
                <Form.Control as="select" value={this.state.form.hour_of_day} onChange={this.changeHandler}
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
                    <option value="0">12:00 am</option>
                </Form.Control>

                {this.validator.message('hour_of_day', this.state.form.hour_of_day, 'required|numeric')}

            </Form.Group>
        );
        const showMonth = (
            <Form.Group as={Col} sm={6} type="text">
                <Form.Label>Day of the Month</Form.Label>
                <Form.Control as="select" value={this.state.form.day_of_month} onChange={this.changeHandler}
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
                {/*{this.validator.message('day_of_month', this.state.form.day_of_month, 'required|numeric')}*/}

            </Form.Group>
        );

        const showDay = (
            <Form.Group as={Col} sm={6} type="text">
                <Form.Label>Day of the Week</Form.Label>
                <Form.Control as="select" value={this.state.form.day_of_week} onChange={this.changeHandler}
                              id="day_of_the_week" name="day_of_the_week">
                    <option value={'2'}>Mon</option>
                    <option value={'3'}>Tue</option>
                    <option value={'4'}>Wed</option>
                    <option value={'5'}>Thur</option>
                    <option value={'6'}>Fri</option>
                    <option value={'7'}>Sat</option>
                    <option value={'1'}>Sun</option>
                </Form.Control>
                {/*{this.validator.message('day_of_week', this.state.form.day_of_week, 'required|numeric')}*/}

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
                                    // className={'amount-input'}
                                    defaultValue={this.state.form.contribution}
                                    onChange={this.changeHandler}/>
                                {/*{this.state.err?<span className={'srv-validation-message'}>{this.state.err}</span>:null}*/}
                                {/*{this.validator.message('amount', amount, 'required|numeric')}*/}
                                {this.validator.message('contribution', this.state.form.contribution, 'required|numeric')}
                            </React.Fragment>
                        </Form.Group>
                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Card:</div>
                            <React.Fragment>
                                <Form.Control
                                    as="select"
                                    onChange={this.changeHandler}
                                    defaultValue={this.state.form.payment_auth}
                                    name={'payment_auth'}>
                                    <option value={''}>Select Card</option>
                                    {
                                        this.state.userCards.map((data) => {
                                            if (data.channel == "card")
                                                return (
                                                    <option value={data.id} key={data.id}>{data.card_type}(**** ****
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
                                              onKeyDown={disableKey}
                                              onKeyUp={disableKey}
                                              min={moment().add(1, 'days').format("YYYY-MM-DD")}
                                              defaultValue={this.state.form.start_date} name={'start_date'}
                                              id={'start_date'}
                                              disabled={this.state.disableStartDate}
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
                                {this.state.loading ? <ButtonLoader/> : "Start"}
                            </button>
                        </div>
                    </Form.Row>
                </Form>
            </React.Fragment>
        )
    }

}


const FormWithToast = withToastManager(CreateSteadySaveForm);

export default FormWithToast;
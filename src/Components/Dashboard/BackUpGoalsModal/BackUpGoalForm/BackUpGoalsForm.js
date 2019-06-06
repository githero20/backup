import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import SimpleReactValidator from "simple-react-validator";
import {getLocalStorage} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";
import {_calculateDateDifference, _handleFormChange} from "../../../../utils";
import {createBackUpGoal} from "../../../../actions/BackUpGoalsAction";


class BackUpGoalsForm extends Component {

    constructor(props) {
        super(props);
        const {toastManager} = this.props;
        this.toastManager = toastManager;
        this.validator = new SimpleReactValidator();
        this.state = {
            form: {
                start_date: "2019-06-12",
                maturity_date: "2019-12-12",
                title: "Car Savings",
                payment_auth: null,
                frequency: 'daily',
                hour_of_day: '12',
                contribution: 0,
                goal_amount: 0,
                day_of_week: '1',
                day_of_month: '1',
            },
            dateDifference:0,
            userCards: [],
            showMonth: false,
            showDay: false,
            showHour: true,

        };
        this.reset = this.reset.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleFrequencySelect = this.handleFrequencySelect.bind(this);
    }

    //validate form
    handleFrequencySelect(form){
        // console.log(form);
        if(form.frequency == "daily"){
            form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"days") * form.contribution) || 0;
            this.setState({
                showMonth: false,
                showDay: false,
                showHour: true,
                form
            });
            //calculate the difference between the start date and the maturity date
        }
        else if(form.frequency == "weekly"){
            form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"weeks") * form.contribution) || 0;
            this.setState({
                showMonth: false,
                showDay: true,
                showHour: true,
                form
            });
        }else if(form.frequency == "monthly"){
            form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"months") * form.contribution) || 0;
            this.setState({
                showMonth: true,
                showDay: false,
                showHour: true,
                form
            })
        }

        // console.log("Form", form);
    }

    submitForm = (e) => {
        e.preventDefault();
        console.log("Minor Response",this.state.form);
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        } else {
            createBackUpGoal(this.state.form, (status, payload) =>{

                // console.log("Res", status, payload);
                if(status){
                    console.log("here");
                    this.toastManager.add("Backup Goal Saved.", {
                        appearance: "success"
                    });
                    setTimeout(()=> this.props.onHide(true), 2000);
                }else{
                    // console.log(payload, "Message", this.toastManager);
                    this.toastManager.add(JSON.stringify(payload) || "An Error Occurred", {
                        appearance: "error",
                        autoDismiss: true,
                        autoDismissTimeout: 5000
                    });
                }
            });
        }

    };

    //Retrieves user inputs
    changeHandler(event){
       const form =  _handleFormChange(
            event.target.name,
            event,
            this
        );

        // console.log("megg", event.target.name, event.target.value);
        this.handleFrequencySelect(form);

    };
    reset(){

        let data = this.state.form;
        data.amount=0;
        data.payment_auth=-1;
        data.start_date= null;
        data.maturity_date= null;
        data.title= null;
        data.payment_auth= null;
        data.frequency= 'daily';
        data.hour_of_day= '12';
        data.contribution=null;
        data.goal_amount= null;
        data.day_of_week= '1';
        data.day_of_month= '1';

        this.setState({
            form:data
        })

    };
    componentDidMount() {

        //get pay auths
        //TODO(dont save card details to local storage, if you will be saving it, encrypt it)
        const userInfo = JSON.parse(getLocalStorage(USERINFO));
        if (JSON.parse(getLocalStorage(USERINFO))) {
            this.setState({
                userCards: userInfo.authorization.data
            })

        }
    }
    render() {
        const {title, goal_amount, start_date,frequency,payment_auth, maturity_date, contribution, hour_of_day, day_of_week, day_of_month} = this.state.form;

        const showHour = (
            <Form.Group as={Col} type="text">
                <Form.Label>Hour of the day</Form.Label>
                <Form.Control as="select" value={this.state.form.hour_of_day} onChange={this.changeHandler} id="hour_of_day" name="hour_of_day">
                    <option value={'1'}>1:00 am</option>
                    <option value={'2'}>2:00 am</option>
                    <option value={'3'}>3:00 am</option>
                    <option value={'4'}>4:00 am</option>
                    <option value={'5'}>5:00 am</option>
                    <option value={'6'}>6:00 am</option>
                    <option value={'7'}>7:00 am</option>
                    <option value={'8'}>8:00 am</option>
                    <option value={'9'}>9:00 am</option>
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
                {this.validator.message('hour_of_day', this.state.form.hour_of_day, 'required|numeric')}


            </Form.Group>
        );
        const showMonth = (
            <Form.Group as={Col} type="text">
                <Form.Label>Day of the Month</Form.Label>
                <Form.Control as="select" value={this.state.form.day_of_month} onChange={this.changeHandler}
                              id="day_of_the_month" name={'day_of_the_month'}>
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
                {this.validator.message('day_of_month', this.state.form.day_of_month, 'required|numeric')}

            </Form.Group>
        );

        const showDay = (
            <Form.Group as={Col} type="text">
                <Form.Label>Day of the Week</Form.Label>
                <Form.Control as="select" value={this.state.form.day_of_week} onChange={this.changeHandler}
                              id="day_of_the_week" name="day_of_the_week">
                    <option value={'1'}>Mon</option>
                    <option value={'2'}>Tue</option>
                    <option value={'3'}>Wed</option>
                    <option value={'4'}>Thur</option>
                    <option value={'5'}>Fri</option>
                    <option value={'6'}>Sat</option>
                    <option value={'7'}>Sun</option>
                </Form.Control>
                {this.validator.message('day_of_week', this.state.form.day_of_week, 'required|numeric')}

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
                                value={title}
                            />
                            {this.validator.message('title', title, 'required|string')}
                        </Form.Group>

                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Contribution(NGN)</Form.Label>
                            <Form.Control
                                type="number" id="contribution"
                                value={contribution} step={'5'} name="contribution"
                                onChange={this.changeHandler}/>
                            <Form.Text className="text-muted">
                                Contribution range daily [ &#8358; 50 - &#8358; 25000]
                            </Form.Text>
                            {this.validator.message('contribution', contribution, 'required|numeric')}

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name={'start_date'}
                                          id={'start_date'}
                                          value={start_date}
                                          onChange={this.changeHandler}/>
                            {this.validator.message('start_date', start_date, 'required|string')}

                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Maturity Date</Form.Label>
                            <Form.Control
                                type="date"
                                name={'maturity_date'}
                                id={'maturity_date'}
                                value={maturity_date}
                                onChange={this.changeHandler}/>
                            {this.validator.message('maturity_date', maturity_date, 'required|string')}

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Account to Debit</Form.Label>
                            <Form.Control as="select"   onChange={this.changeHandler} defaultValue={'payment_auth'} id={'payment_auth'}
                                          name={'payment_auth'}>
                                <option value={-1} >Select Card</option>
                                {/* loop through and get the number of accounts user has */}
                                {
                                    this.state.userCards.length > 0 ?

                                        this.state.userCards.map((data) => {
                                            if(data.channel == "card")
                                                return (
                                                    <option value={data.id} key={data.id}>{data.card_type}(**** **** **** {data.last4})</option>
                                                );

                                        })
                                        : <option value={-1} >Select Card</option>
                                }

                            </Form.Control>
                            {this.validator.message('payment_auth', payment_auth, 'required|numeric')}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Goal Amount(NGN)</Form.Label>
                            <Form.Control
                                type="number"
                                name={'goal_amount'}
                                id={'number'}
                                disabled={true}
                                value={goal_amount}
                                onChange={this.changeHandler}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Frequency </Form.Label>
                            {/*select Box */}
                            <Form.Control as="select" id="frequency" value={frequency} onChange={this.changeHandler} name={'frequency'}>
                                <option value={'daily'}>Daily</option>
                                <option value={'weekly'}>Weekly</option>
                                <option value={'monthly'}>Monthly</option>
                            </Form.Control>
                            {this.validator.message('frequency', frequency, 'required|string')}
                        </Form.Group>

                        {this.state.showHour ? showHour: null}
                        {this.state.showDay ? showDay: null}
                        {this.state.showMonth ? showMonth: null}
                    </Form.Row>
                    <Form.Row className={'d-flex justify-content-between mt-2'}>
                        <div>
                            <Button onClick={this.reset} className={'mr-1 round reset-btn'}>Reset All</Button>
                        </div>
                        <div className={'d-flex justify-content-end'}>
                            <Button onClick={this.props.onHide} className={'mr-1 round btn-outline-gray'}>Close</Button>
                            <Button className={'round btn-custom-blue'} type="submit">
                                Start Saving
                            </Button>
                        </div>

                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}


const BackUpToastForm = withToastManager(BackUpGoalsForm);

export default BackUpToastForm;


import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import SimpleReactValidator from "simple-react-validator";
import {getLocalStorage, request} from "../../../../ApiUtils/ApiUtils";
import {createBackupGoals} from "../../../../RouteLinks/RouteLinks";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";


class BackUpGoalsForm extends Component {


    //handle reset click


    //handle start savings
    state = {

        backUpGoalInfo: {
            start_date: null,
            maturity_date: null,
            title: null,
            payment_auth: null,
            frequency: 'daily',
            hour_of_day: '12',
            contribution: null,
            goal_amount: null,
            day_of_week: '1',
            day_of_month: '1',
        },
        userCards: [],
        showMonth: false,
        showDay: false,
        showHour: true,

    };


    constructor(props) {

        super(props);

        this.validator = new SimpleReactValidator();

    }


    //validate form
    handleFrequencySelect(){

        if(this.state.backUpGoalInfo.frequency === "daily"){
            this.setState({
                showMonth: false,
                showDay: false,
                showHour: true,
            })
        }else if(this.state.backUpGoalInfo.frequency === "weekly"){
            this.setState({
                showMonth: false,
                showDay: true,
                showHour: true,
            })
        }else if(this.state.backUpGoalInfo.frequency === "monthly"){
            this.setState({
                showMonth: true,
                showDay: false,
                showHour: true,
            })
        }



    }


    //handle response
    HandleBackUpGoal = (state, response) => {


        const { toastManager } = this.props;

        if(state){
            console.log(response);
            toastManager.add(`${JSON.stringify(response.data.message)}`, {
                appearance: 'success',
            });

        }else{

            if(response){
                console.log(JSON.stringify(response));
                toastManager.add(`${JSON.stringify(response.data.message)}`, {
                    appearance: 'error',
                });
            }

        }
    };

    //submit steady save form
    submitForm = (e) => {


        e.preventDefault();


        if (this.validator.allValid()) {


            request(createBackupGoals, this.state.backUpGoalInfo, true, 'POST', this.HandleBackUpGoal);


        } else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }

    };

    //Retrieves user inputs
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        //handle frequency selection
        this.handleFrequencySelect();



        //copy states object
        const data = {...this.state.backUpGoalInfo};
        data[name] = value;

        //get select data

        //manipulate object and set the state object

        this.setState({
            backUpGoalInfo: data
        });
    };


    reset = () => {

        let data = this.state.backUpGoalInfo;
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
            backUpGoalInfo:data
        })

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

    render() {
        const {title, goal_amount, start_date,frequency,payment_auth, maturity_date, contribution, hour_of_day, day_of_week, day_of_month} = this.state.backUpGoalInfo;

        return (
            <React.Fragment>
                <Form onSubmit={this.submitForm}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Plan Name</Form.Label>
                            <Form.Control type="text" name={'title'} id={'title'} onChange={this.changeHandler}/>
                            {this.validator.message('title', title, 'required|string')}
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Goal Amount</Form.Label>
                            <Form.Control type="number" name={'goal_amount'} id={'number'}
                                          onChange={this.changeHandler}/>
                            {this.validator.message('goal_amount', goal_amount, 'required|numeric')}

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name={'start_date'} id={'start_date'}
                                          onChange={this.changeHandler}/>
                            {this.validator.message('start_date', start_date, 'required|string')}

                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Maturity Date</Form.Label>
                            <Form.Control type="date" name={'maturity_date'} id={'maturity_date'}
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

                                        this.state.userCards.map((data, index) => {
                                            return (
                                                <option value={data.id} key={data.id}>{data.card_type}</option>
                                            );

                                        })
                                        : <option value={-1} >Select Card</option>
                                }

                            </Form.Control>
                            {this.validator.message('payment_auth', payment_auth, 'required|numeric')}
                        </Form.Group>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Contribution</Form.Label>
                            <Form.Control type="number" id="contribution" step={'5'} name="contribution"
                                          onChange={this.changeHandler}/>
                            <Form.Text className="text-muted">
                                Contribution range daily [ &#8358; 50 - &#8358; 25000]
                            </Form.Text>
                            {this.validator.message('contribution', contribution, 'required|numeric')}

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

                        {
                            this.state.showHour ?
                            (
                                <Form.Group as={Col} type="text">
                                    <Form.Label>Hour of the day</Form.Label>
                                    <Form.Control as="select" value={hour_of_day} onChange={this.changeHandler} id="hour_of_day" name="hour_of_day">
                                        <option value={'1'}>1:00am</option>
                                        <option value={'2'}>2:00am</option>
                                        <option value={'3'}>3:00am</option>
                                        <option value={'4'}>4:00am</option>
                                        <option value={'5'}>5:00am</option>
                                        <option value={'6'}>6:00am</option>
                                        <option value={'7'}>7:00am</option>
                                        <option value={'8'}>8:00am</option>
                                        <option value={'9'}>9:00am</option>
                                        <option value="12">12:00noon</option>
                                        <option value="13">1:00pm</option>
                                        <option value="14">2:00pm</option>
                                        <option value="15">3:00pm</option>
                                        <option value="16">4:00pm</option>
                                        <option value="17">5:00pm</option>
                                        <option value="18">6:00pm</option>
                                        <option value="19">7:00pm</option>
                                        <option value="20">8:00pm</option>
                                        <option value="21">9:00pm</option>
                                        <option value="22">10:00pm</option>
                                        <option value="23">11:00pm</option>
                                        <option value="24">12:00am</option>
                                    </Form.Control>
                                    {this.validator.message('hour_of_day', hour_of_day, 'required|numeric')}


                                </Form.Group>
                            ) : null

                        }

                        {
                            this.state.showDay ?

                            (
                                <Form.Group as={Col} type="text">
                                    <Form.Label>Day of the Week</Form.Label>
                                    <Form.Control as="select" value={day_of_week} onChange={this.changeHandler}
                                                  id="day_of_the_week" name="day_of_the_week">
                                        <option value={'1'}>Mon</option>
                                        <option value={'2'}>Tue</option>
                                        <option value={'3'}>Wed</option>
                                        <option value={'4'}>Thur</option>
                                        <option value={'5'}>Fri</option>
                                        <option value={'6'}>Sat</option>
                                        <option value={'7'}>Sun</option>
                                    </Form.Control>
                                    {this.validator.message('day_of_week', day_of_week, 'required|numeric')}

                                </Form.Group>

                            )

                            : null
                        }


                        {
                            this.state.showMonth ?

                            (
                                <Form.Group as={Col} type="text">
                                    <Form.Label>Day of the Month</Form.Label>
                                    <Form.Control as="select" value={day_of_month} onChange={this.changeHandler}
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
                                    {this.validator.message('day_of_month', day_of_month, 'required|numeric')}

                                </Form.Group>

                            )

                            : null}


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


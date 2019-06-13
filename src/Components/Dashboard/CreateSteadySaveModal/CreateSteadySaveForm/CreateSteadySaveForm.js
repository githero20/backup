import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import {getLocalStorage} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {formatNumber, transformHour} from "../../../../Helpers/Helper";
import {
    continueSteadySave, createSteadySave,
    pauseSteadySave,
    stopSteadySave,
    updateSteadySave
} from "../../../../actions/SteadySaveAction";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import {_calculateDateDifference, _getUser, _handleFormChange, _payWithPaystack} from "../../../../utils";
import {initTransaction, verifyTransaction} from "../../../../actions/CardAction";


class CreateSteadySaveForm extends Component {


    constructor(props){
        super(props);
        console.log("props",props);
        this.toastManager = this.props.toastManager;
        this.state = {
            loading:false,
            disableStartDate:false,
            form:{
                id: null,
                contribution: 0,
                start_date: "N/A",
                frequency: "daily",
                hour_of_day: 0,
                payment_auth: "N/A",
                raw: null,
                title:'steady save'
            },
            showMonth: false,
            showDay: false,
            showHour: true,
            userCards:[]
        };
        console.log("start",this.state);
        this.validator = new SimpleReactValidator();
        this.changeHandler = this.changeHandler.bind(this);
    }
    componentDidMount() {
        // this.setState({form:this.props.steadySave});
        this.validateStartDate();
        this.handleFrequencySelect(this.state.form);
        const userInfo = JSON.parse(getLocalStorage(USERINFO));
        if (JSON.parse(getLocalStorage(USERINFO))) {
            this.setState({
                userCards: userInfo.authorization.data
            })
        }
    }

    validateStartDate() {
        const date = _calculateDateDifference(this.state.form.start_date);
        if(date > 0){
            this.setState({disableStartDate:true});
        }
    }

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
    //validate form
    handleFrequencySelect(form){
        if(form.frequency == "daily"){
            console.log('dailt');
            this.setState({
                showMonth: false,
                showDay: false,
                showHour: true,
            });
        }
        else if(form.frequency == "weekly"){
            console.log('weekly');
            // form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"weeks") * form.contribution) || 0;
            this.setState({
                showMonth: false,
                showDay: true,
                showHour: true,
            });
        }else if(form.frequency == "monthly"){
            // form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"months") * form.contribution) || 0;
            this.setState({
                showMonth: true,
                showDay: false,
                showHour: true,
            })
        }
        // console.log("Form", form);
    }




    initiatePayStack = () => {

        //send api
        console.log(this.state.form);
        initTransaction({
            amount: parseFloat(this.state.form.contribution),
            source: 'quick',
        }, (status, payload) => {
            console.log("status", status, payload);
            this.setState({loading: false});
            if (status) {
                const user = _getUser();
                console.log(user);
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


    resolvePaystackResponse=(response)=>{
        this.setState({
            loading: false,
        });
        console.log("Paystack Response", response);
        verifyTransaction({
            ref: response.reference,
            type: "instant"
        },(status, payload) =>{
            console.log("status", status, payload);
            if(status){
                this.props.toastManager.add("Card Added Successfully",{
                    appearance:"success",
                    autoDismiss:true,
                    autoDismissTimeout:3000
                });

                this.getUserCards();
            }else{
                this.props.toastManager.add("Unable to add card at this moment",{
                    appearance:"error",
                    autoDismiss:true,
                    autoDismissTimeout:3000
                })
            }
        })

    }


    //submit steady save form
    submitForm = (e) => {
        e.preventDefault();
        if (!this.validator.allValid()) {
            console.log("hererererer",this,this.validator, this.validator.errorMessages);
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            console.log("here", this.state.form);
            this.setState({loading:true});


            //if add bank is selected
            if (parseInt(this.state.form.payment_auth) === 0) {
                //initiate paystack
                console.log('got here to initiate paystack');
                this.initiatePayStack();

            }else{

                createSteadySave(this.state.form,(status, payload) => {
                    this.setState({loading:false});
                    if(!status){
                        this.toastManager.add(JSON.stringify(payload),{
                            appearance: "error",
                            autoDismissTimeout:5000,
                            autoDismiss:true
                        });
                    }else{
                        this.toastManager.add("New steady save created successfully",{
                            appearance: "success",
                            autoDismissTimeout:3000,
                            autoDismiss:true
                        });
                        console.log(payload);
                        setTimeout(()=>{this.props.onHide()},2000);
                        this.props.setupSteadySave();
                        //set timeout
                    }
                    console.log("res", status, payload);
                })
                // const id = this.props.id;
                // request(`${EditSteadySave}${id}`, null, true, 'GET', this.handleResponse)

            }


        }

    };

    render() {

        const showHour = (
            <Form.Group as={Col} sm={6} type="text">
                <Form.Label>Hour of the day</Form.Label>
                <Form.Control as="select" defaultValue={this.state.form.hour_of_day} onChange={this.changeHandler} id="hour_of_day" name="hour_of_day">
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
            <Form.Group as={Col} sm={6} type="text">
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
                {/*{this.validator.message('day_of_month', this.state.form.day_of_month, 'required|numeric')}*/}

            </Form.Group>
        );

        const showDay = (
            <Form.Group as={Col} sm={6} type="text">
                <Form.Label>Day of the Week</Form.Label>
                <Form.Control as="select" defaultValue={this.state.form.day_of_week} onChange={this.changeHandler}
                              id="day_of_the_week" name="day_of_the_week">
                    <option value={'1'}>Mon</option>
                    <option value={'2'}>Tue</option>
                    <option value={'3'}>Wed</option>
                    <option value={'4'}>Thur</option>
                    <option value={'5'}>Fri</option>
                    <option value={'6'}>Sat</option>
                    <option value={'7'}>Sun</option>
                </Form.Control>
                {/*{this.validator.message('day_of_week', this.state.form.day_of_week, 'required|numeric')}*/}

            </Form.Group>
        );
        return (
            <React.Fragment>
                <Form onSubmit={this.submitForm}>
                    <Form.Row>
                        <Form.Group as={Col} sm={6} >
                            <div className={'text-muted secondary-text'}>Contribution</div>
                            <React.Fragment>
                                <Form.Control
                                    type="text"
                                    name={'contribution'}
                                    defaultValue={this.state.form.contribution}
                                    onChange={this.changeHandler}/>

                                {this.validator.message('contribution', this.state.form.contribution, 'required|numeric')}
                            </React.Fragment>
                        </Form.Group>
                        <Form.Group as={Col} sm={6} >
                            <div className={'text-muted secondary-text'}>Card: </div>
                            <React.Fragment>
                                <Form.Control
                                    as="select"
                                    onChange={this.changeHandler}
                                    defaultValue={this.state.form.payment_auth}
                                    name={'payment_auth'}>
                                    <option value={-1} >Select Card</option>
                                    <option value={0} >Add Card</option>
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
                                {this.validator.message('Card', this.state.form.payment_auth, 'required')}
                            </React.Fragment>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col} sm={6} >
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

                        <Form.Group as={Col} sm={6} >
                            <div className={'text-muted secondary-text'}>Start Date</div>
                            <React.Fragment>
                                <Form.Control type="date" defaultValue={this.state.form.start_date} name={'start_date'}
                                              id={'start_date'}
                                              disabled={this.state.disableStartDate}
                                              onChange={this.changeHandler}/>
                                {this.validator.message('start_date', this.state.form.start_date, 'required|string')}
                            </React.Fragment>
                        </Form.Group>
                        {this.state.showHour ? showHour :null}
                        {this.state.showDay ? showDay: null}
                        {this.state.showMonth ? showMonth: null}
                    </Form.Row>



                    <Form.Row className={'d-flex justify-content-end mt-2'}>
                        <div className={'d-flex justify-content-end'}>
                            <button className={'round modal-btn btn-custom-blue '} type="submit">
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
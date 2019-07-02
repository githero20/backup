import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import SimpleReactValidator from "simple-react-validator";
import {getLocalStorage} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";
import {_calculateDateDifference, _getUser, _handleFormChange, _payWithPaystack} from "../../../../utils";
import {createBackUpGoal, editBGoal} from "../../../../actions/BackUpGoalsAction";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import {initTransaction, verifyTransaction} from "../../../../actions/CardAction";
import {formatNumber, getTodaysDate} from "../../../../Helpers/Helper";
import moment from "moment";


class EditBGForm extends Component {

    constructor(props) {
        super(props);
        const {toastManager} = this.props;
        this.toastManager = toastManager;
        this.validator = new SimpleReactValidator();
        this.state = {
            form: {
                start_date: null,
                maturity_date: null,
                title: "",
                payment_auth: null,
                frequency: 'daily',
                hour_of_day: '12',
                contribution: 0,
                goal_amount: 0,
                day_of_week: null,
                day_of_month: null,
            },
            dateDifference:0,
            userCards: [],
            showMonth: false,
            showDay: false,
            showHour: true,
            loading:false,
            disabled:true

        };

        this.changeHandler = this.changeHandler.bind(this);
        this.handleFrequencySelect = this.handleFrequencySelect.bind(this);
        this.handleGoalAmount = this.handleGoalAmount.bind(this);
    }

    //validate form
    handleFrequencySelect(form, inverse = false){
        // console.log(form);
        console.log(inverse);
        if(inverse){
            if(form.frequency == "daily"){
                form.contribution = (form.goal_amount / _calculateDateDifference(form.start_date, form.maturity_date,"days")) || 0;
                this.setState({
                    showMonth: false,
                    showDay: false,
                    showHour: true,
                    form
                });
                //calculate the difference between the start date and the maturity date
            }
            else if(form.frequency == "weekly"){
                form.contribution = (form.goal_amount / _calculateDateDifference(form.start_date, form.maturity_date,"weeks")) || 0;
                this.setState({
                    showMonth: false,
                    showDay: true,
                    showHour: true,
                    form
                });
            }else if(form.frequency == "monthly"){
                form.contribution = (form.goal_amount /_calculateDateDifference(form.start_date, form.maturity_date,"months")) || 0;
                this.setState({
                    showMonth: true,
                    showDay: false,
                    showHour: true,
                    form
                })
            }
        }else{
            if(form.frequency == "daily"){
                form.goal_amount = form.target_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"days") * form.contribution) || 0;

                this.setState({
                    showMonth: false,
                    showDay: false,
                    showHour: true,
                    form
                });
                //calculate the difference between the start date and the maturity date
            }
            else if(form.frequency == "weekly"){

                form.goal_amount = form.target_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"weeks") * form.contribution) || 0;

                this.setState({
                    showMonth: false,
                    showDay: true,
                    showHour: true,
                    form
                });
            }else if(form.frequency == "monthly"){
                form.goal_amount = form.target_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"months") * form.contribution) || 0;
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

        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            console.log('error');
            // rerender to show messages for the first time
            this.forceUpdate();
        } else {
            console.log('worked');
            //show loader
            this.setState({
                loading:true,
            });

            // if (parseInt(this.state.form.payment_auth) === 0) {
            //     //initiate paystack
            //     console.log('got here to initiate paystack');
            //     this.initiatePayStack();
            // }else {


                //TODO update backup Goals
                console.log('formdata :'+JSON.stringify(this.state.form));
                editBGoal(this.state.form.id, this.state.form,(status, payload) =>{
                    //remove loader

                    this.setState({
                        loading:false,
                    });
                    console.log("Res", status, payload);
                    if(status){
                        console.log("here");
                        this.props.toastManager.add("Backup Goal Updated.", {
                            appearance: "success"
                        });
                        setTimeout(() => {
                            this.props.onHide(true);
                            this.props.updateSelectedBG(payload);
                            this.props.fetchGoals();
                        }, 2000);
                    }else{
                        // console.log(payload, "Message", this.toastManager);
                        this.props.toastManager.add(JSON.stringify(payload) || "An Error Occurred", {
                            appearance: "error",
                            autoDismiss: true,
                            autoDismissTimeout: 5000
                        });
                    }
                });

            // }

        }

    };


    handleGoalAmount(e){
        console.log(e,this.state);
        this.changeHandler(e, true)
    }
    //Retrieves user inputs
    changeHandler(event, inverse = false){
       const form =  _handleFormChange(
            event.target.name,
            event,
            this
        );

        // console.log("megg", event.target.name, event.target.value);
        console.log('got her to handle frequency change');
        this.handleFrequencySelect(form,inverse);

    };

    componentDidMount() {
        //get pay auths
        //TODO(dont save card details to local storage, if you will be saving it, encrypt it)
        const userInfo = getLocalStorage(USERINFO);
        if (userInfo!=undefined) {
            console.log(userInfo.authorization.data);
            this.setState({
                userCards: userInfo.authorization.data,
            });

            let formData = {...this.state.form} ;

            formData.title = this.props.selectedBG.title;
            formData.id = this.props.selectedBG.id;
            formData.payment_auth = this.props.selectedBG.gw_authorization_code;
            formData.hour_of_day = this.props.selectedBG.hour_of_day;
            formData.target_amount = this.props.selectedBG.target_amount;
            formData.start_date = this.props.selectedBG.start_date;
            formData.frequency = this.props.selectedBG.frequency;
            formData.gw_authorization_code = this.props.selectedBG.gw_authorization_code;
            formData.end_date = this.props.selectedBG.end_date;
            formData.maturity_date = this.props.selectedBG.end_date;
            formData.start_amount = Number(this.props.selectedBG.start_amount);
            formData.contribution = this.props.selectedBG.start_amount;
            formData.hour_of_day = this.props.selectedBG.hour_of_day;
            formData.day_of_week = this.props.selectedBG.day_of_week;
            formData.day_of_month = this.props.selectedBG.day_of_month;

            this.setState({
                form:formData
            });
        }
    }

    enableEdit = ()=>{
        this.setState({
            disabled:false
        })
    };


    render() {
        const {title, target_amount, start_date,frequency,gw_authorization_code, end_date,maturity_date, start_amount, hour_of_day, day_of_week, day_of_month} = this.state.form;
        // console.log('selected bg :'+JSON.stringify(this.props.selectedBG));
        console.log(this.state);
        const showHour = (
            <Form.Group as={Col} type="text">
                <Form.Label>Hour of the day</Form.Label>
                <Form.Control as="select" value={hour_of_day!=null?hour_of_day:12} disabled={this.state.disabled} onChange={this.changeHandler} id="hour_of_day" name="hour_of_day">
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
                <Form.Control as="select" value={day_of_month!=null?day_of_month:1} disabled={true} onChange={this.changeHandler} id="day_of_month" name={'day_of_month'}>
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
                <Form.Control as="select"
                              value={day_of_week!=null?day_of_week:1}
                              disabled={true}
                              onChange={this.changeHandler}
                              id="day_of_week" name="day_of_week"
                >
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
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Plan Name</Form.Label>
                            <Form.Control
                                type="text"
                                name={'title'}
                                id={'title'}
                                disabled={this.state.disabled}
                                onChange={this.changeHandler}
                                placeholder={'e.g School fees'}
                                defaultValue={title}
                            />
                            {this.validator.message('title', title, 'required|string')}
                        </Form.Group>


                        {/*<Form.Group as={Col} sm={6}>*/}
                        {/*    <Form.Label>Start amount (NGN)</Form.Label>*/}
                        {/*    <Form.Control*/}
                        {/*        type="number" id="start_amount"*/}
                        {/*        value={start_amount} step={'5'} name="start_amount"*/}
                        {/*        onChange={this.changeHandler}*/}
                        {/*        disabled={true}*/}
                        {/*    />*/}

                        {/*    <Form.Text className="text-muted">*/}
                        {/*        Contribution range daily [ &#8358; 50 - &#8358; 25000]*/}
                        {/*    </Form.Text>*/}
                        {/*    {this.validator.message('start amount', start_amount, 'required|numeric')}*/}

                        {/*</Form.Group>*/}
                    </Form.Row>
                    <Form.Row>
                        {/*<Form.Group as={Col}>*/}
                        {/*    <Form.Label>Start Date</Form.Label>*/}
                        {/*    <Form.Control type="date" name={'start_date'}*/}
                        {/*                  id={'start_date'}*/}
                        {/*                  min={moment().format('YYYY-MM-DD')}*/}
                        {/*                  value={start_date}*/}
                        {/*                  disabled={true}*/}
                        {/*                  onChange={this.changeHandler}*/}
                        {/*    />*/}
                        {/*    {this.validator.message('start_date', start_date, 'required|string')}*/}

                        {/*</Form.Group>*/}

                    </Form.Row>
                    <Form.Row>
                        {/*<Form.Group as={Col} sm={6}>*/}
                        {/*    <Form.Label>Account to Debit</Form.Label>*/}
                        {/*    <Form.Control as="select" disabled={true} onChange={this.changeHandler} value={gw_authorization_code!=null?gw_authorization_code:-1} id={'payment_auth'}*/}
                        {/*                  name={'payment_auth'}>*/}
                        {/*        /!* loop through and get the number of accounts user has *!/*/}
                        {/*        <option value={-1} >Select Card</option>*/}
                        {/*        {*/}
                        {/*            this.state.userCards.length > 0 ?*/}

                        {/*                this.state.userCards.map((data) => {*/}
                        {/*                    if(data.channel == "card")*/}
                        {/*                        return (*/}
                        {/*                            <option value={data.id} key={data.id}>{data.card_type}(**** **** **** {data.last4})</option>*/}
                        {/*                        );*/}

                        {/*                })*/}
                        {/*                : <option value={-1} >Select Card</option>*/}
                        {/*        }*/}

                        {/*    </Form.Control>*/}
                        {/*    {this.validator.message('credit card', gw_authorization_code, 'required|numeric')}*/}
                        {/*</Form.Group>*/}
                        <Form.Group as={Col} sm={12}>
                            <Form.Label>Maturity Date</Form.Label>
                            <Form.Control
                                type="date"
                                name={'maturity_date'}
                                id={'maturity_date'}
                                min={moment(maturity_date).format('YYYY-MM-DD')}
                                value={maturity_date}
                                disabled={this.state.disabled}
                                // onChange={this.changeHandler}
                                onChange={this.changeHandler}
                            />
                            {this.validator.message('maturity_date', maturity_date, 'required|string')}

                        </Form.Group>
                        <Form.Group as={Col} sm={12}>
                            <Form.Label className='d-block'>Goal Amount(NGN)
                                <span className='amount-display round float-right text-white px-1'>
                                    ₦ {formatNumber(Number(target_amount).toFixed(2))}
                                </span>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name={'target_amount'}
                                id={'number'}
                                value={target_amount!==null?target_amount:0}
                                disabled={true}
                                onChange={this.changeHandler}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        {/*<Form.Group as={Col}>*/}
                        {/*    <Form.Label>Frequency </Form.Label>*/}
                        {/*    /!*select Box *!/*/}
                        {/*    <Form.Control as="select" id="frequency" value={frequency} disabled={true} onChange={this.changeHandler} name={'frequency'}>*/}
                        {/*        <option value={'daily'}>Daily</option>*/}
                        {/*        <option value={'weekly'}>Weekly</option>*/}
                        {/*        <option value={'monthly'}>Monthly</option>*/}
                        {/*    </Form.Control>*/}
                        {/*    {this.validator.message('frequency', frequency, 'required|string')}*/}
                        {/*</Form.Group>*/}

                        {/*{this.state.showHour ? showHour: null}*/}
                        {this.state.showDay ? showDay: null}
                        {this.state.showMonth ? showMonth: null}
                    </Form.Row>
                    <Form.Row className={'d-flex justify-content-end mt-2'}>

                        {this.state.disabled ?
                            <Button onClick={this.enableEdit} className={'round btn-custom-blue modal-btn'} type="button">
                                Edit
                            </Button> :
                            (

                                <Button className={'round btn-custom-blue modal-btn'} disabled={this.state.loading}  type="button"  onClick={this.submitForm}>
                                    {this.state.loading ? <ButtonLoader/> :
                                        <span>Update Goal </span>
                                    }
                                </Button>
                            )
                        }

                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}

export default withToastManager(EditBGForm);



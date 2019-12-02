import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import SimpleReactValidator from "simple-react-validator";
import {getLocalStorage} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";
import {_calculateDateDifference, _handleFormChange} from "../../../../utils";
import {editBGoal} from "../../../../actions/BackUpGoalsAction";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import {disableKey, formatNumber, toastMessage, validateBackupGoalAmount} from "../../../../Helpers/Helper";
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
            dateDifference: 0,
            userCards: [],
            showMonth: false,
            showDay: false,
            showHour: true,
            loading: false,
            disabled: true

        };

        this.changeHandler = this.changeHandler.bind(this);
        this.handleFrequencySelect = this.handleFrequencySelect.bind(this);
        this.handleGoalAmount = this.handleGoalAmount.bind(this);
    }

    //validate form
    handleFrequencySelect(form, inverse = false) {
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
                form.goal_amount = form.target_amount = (_calculateDateDifference(form.start_date, form.maturity_date, "days") * form.contribution) || 0;

                this.setState({
                    showMonth: false,
                    showDay: false,
                    showHour: true,
                    form
                });
                //calculate the difference between the start date and the end Date
            } else if (form.frequency == "weekly") {

                form.goal_amount = form.target_amount = (_calculateDateDifference(form.start_date, form.maturity_date, "weeks") * form.contribution) || 0;

                this.setState({
                    showMonth: false,
                    showDay: true,
                    showHour: true,
                    form
                });
            } else if (form.frequency == "monthly") {
                form.goal_amount = form.target_amount = (_calculateDateDifference(form.start_date, form.maturity_date, "months") * form.contribution) || 0;
                this.setState({
                    showMonth: true,
                    showDay: false,
                    showHour: true,
                    form
                })
            }
        }
    }

    submitForm = (e) => {
        const {frequency, contribution} = this.state.form;
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        } else {
            const valid = validateBackupGoalAmount(frequency, contribution, this);
            //show loader
            if (valid) {
                this.setState({
                    loading: true,
                });
                //TODO update backup Goals
                editBGoal(this.state.form.id, this.state.form, (status, payload) => {
                    this.setState({
                        loading: false,
                    });
                    if (status) {
                        toastMessage("Backup Goal Updated.","success",this);
                        setTimeout(() => {
                            this.props.onHide(true);
                            this.props.updateSelectedBG(payload);
                            this.props.fetchGoals();
                        }, 2000);
                    } else {
                        toastMessage("Unable to update backup goal at the moment",'error',this);
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
        this.handleFrequencySelect(form, inverse);

    };


    componentDidMount() {
        //get pay auths
        //TODO(dont save card details to local storage, if you will be saving it, encrypt it)
        const userInfo = getLocalStorage(USERINFO);
        if (userInfo != undefined) {
            this.setState({userCards: userInfo.authorization.data});
            let formData = {...this.state.form};
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
                form: formData
            });
        }
    }

    enableEdit = () => {
        this.setState({
            disabled: false
        })
    };


    render() {
        const {title, target_amount, maturity_date, hour_of_day, day_of_week, day_of_month} = this.state.form;
        const showHour = (
            <Form.Group as={Col} type="text">
                <Form.Label>Hour of the day</Form.Label>
                <Form.Control as="select" value={hour_of_day != null ? hour_of_day : 12} disabled={this.state.disabled}
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

        const hourOptions = displayHours('asc')();

        const showMonth = (
            <Form.Group as={Col} type="text">
                <Form.Label>Day of the Month</Form.Label>
                <Form.Control as="select" value={day_of_month != null ? day_of_month : 1} disabled={true}
                              onChange={this.changeHandler} id="day_of_month" name={'day_of_month'}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="0">10</option>
                    <option value="1">11</option>
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
                              value={day_of_week != null ? day_of_week : 1}
                              disabled={true}
                              onChange={this.changeHandler}
                              id="day_of_week" name="day_of_week"
                >
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
                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col} sm={12}>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name={'maturity_date'}
                                id={'maturity_date'}
                                onKeyDown={disableKey}
                                onKeyUp={disableKey}
                                min={moment(maturity_date).format('YYYY-MM-DD')}
                                value={maturity_date}
                                disabled={this.state.disabled}
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
                                value={target_amount !== null ? target_amount : 0}
                                disabled={true}
                                onChange={this.changeHandler}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        {this.state.showDay ? showDay : null}
                        {this.state.showMonth ? showMonth : null}

                        <Form.Group as={Col} type="text">
                            <Form.Label>Hour of the day</Form.Label>
                            <Form.Control as="select" defaulValue={this.state.form.hour_of_day}
                                          onChange={this.changeHandler}
                                          disabled={this.state.disabled}
                                          id="hour_of_day" name="hour_of_day">
                                {hourOptions}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className={'d-flex justify-content-end mt-2'}>

                        {this.state.disabled ?
                            <Button onClick={this.enableEdit} className={'round btn-custom-blue modal-btn'}
                                    type="button">
                                Edit
                            </Button> :
                            (
                                <Button className={'round btn-custom-blue modal-btn'} disabled={this.state.loading}
                                        type="button" onClick={this.submitForm}>
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

export const displayHours = (mode = 'all') => {

    return function () {
        const hour = moment().hour();
        let hourOptions = [];
        if (mode == 'asc') {
            for (let i = 0; i < hour; i++) {
                if (i == 0) hourOptions.push(<option key={i} value={'0'}>12:00 am</option>)
                else if (i < 12) hourOptions.push(<option key={i} value={'' + i + ''}>{i} :00 am</option>)
                else if (i == 12) hourOptions.push(<option key={i} value={'12'}>12 noon</option>)
                else if (i > 12) hourOptions.push(<option key={i - 12} value={'' + i - 12 + ''}>{i - 12} :00
                    pm</option>);
            }
        } else if (mode == 'desc') {
            for (let i = hour + 1; i < 25; i++) {
                if (i < 12) hourOptions.push(<option value={'' + i + ''}>{i} :00 am</option>);
                if (i == 12) hourOptions.push(<option value={'12'}>12 noon</option>);
                if (i > 12 && i < 24) hourOptions.push(<option value={'' + i - 12 + ''}>{i - 12} :00 pm</option>);
                if (i == 24) hourOptions.push(<option value={'0'}>12:00 am</option>);
            }
        } else {
            for (let i = 1; i < 25; i++) {
                if (i < 12) hourOptions.push(<option value={'' + i + ''}>{i} :00 am</option>);
                if (i == 12) hourOptions.push(<option value={'12'}>12 noon</option>);
                if (i > 12 && i < 24) hourOptions.push(<option value={'' + i - 12 + ''}>{i - 12} :00 pm</option>);
                if (i == 24) hourOptions.push(<option value={'0'}>12:00 am</option>);
            }
        }
        return hourOptions;
    }
};


export default withToastManager(EditBGForm);



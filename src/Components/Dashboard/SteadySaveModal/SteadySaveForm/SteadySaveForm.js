import React, {Component, Fragment} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import SimpleReactValidator from "simple-react-validator";
import {
    ContinueSteadySave,
    EditSteadySave,
    NewSteadySaveEndpoint, PauseSteadySave, StopSteadySave,
} from "../../../../RouteLinks/RouteLinks";
import {getLocalStorage, request} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {formatNumber, transformHour} from "../../../../Helpers/Helper";


class SteadySaveForm extends Component {


    state = {

        steadySaveInfo: {
            title:'steady savings',
            hour_of_day:'12',
            start_date:'2016-03-03',
            frequency: 'daily',
            token:'',
            source:'auto save',
            email: "",
            contribution: 100000,
        },
        showEditInput: false,
    };


    constructor(props) {

        super(props);

        this.validator = new SimpleReactValidator();

    }

    //validate form
    handleFrequencySelect() {

        if (this.state.steadySaveInfo.frequency === "daily") {
            this.setState({
                showMonth: false,
                showDay: false,
                showWeek: false,
                showHour: true,
            })
        } else if (this.state.steadySaveInfo.frequency === "weekly") {
            this.setState({
                showMonth: false,
                showDay: true,
                showWeek: false,
                showHour: true,
            })
        } else if (this.state.steadySaveInfo.frequency === "monthly") {
            this.setState({
                showMonth: true,
                showDay: false,
                showWeek: false,
                showHour: false,
            })
        }


    }

    //submit steady save form
    submitForm = (e) => {


        e.preventDefault();


        if (this.validator.allValid()) {

            request(NewSteadySaveEndpoint, this.state.steadySaveInfo, true, 'POST', this.HandleBackUpGoal);


        } else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }

    };


    //call api


    //handle response
    HandleBackUpGoal = (state, response) => {

        const {toastManager} = this.props;

        if (state) {
            console.log(response);
            toastManager.add(`${JSON.stringify(response.data.message)}`, {
                appearance: 'success',
            });

        } else {

            if (response) {
                console.log(JSON.stringify(response));
                toastManager.add(`${JSON.stringify(response.data.message)}`, {
                    appearance: 'error',
                });
            }

        }
    };


    //Retrieves user inputs
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        //handle frequency selection
        // this.handleFrequencySelect();


        //copy states object
        const data = {...this.state.steadySaveInfo};
        data[name] = value;
        //get select data
        //manipulate object and set the state object

        this.setState({
            steadySaveInfo: data
        });
    };


    editUIActions = () => {

        this.setState({
            showEditInput:true
        })

    }

    handleEdit = () => {

        this.editUIActions();


    }

    editSteadySave = ()=>{
        const id = this.props.id;
        //call api
        request(`${EditSteadySave}${id}`,null,true,'GET',this.handleResponse)


    }

    handleResponse = (status,res) => {
        if(status){
            console.log(res);
            this.setState({
                showEditInput:false,
            });
        }else {

            this.setState({
                showEditInput:false,
            });
        }



    }

    handleContinue = () =>{
        const id = this.props.id;
        //show modal to confirm

        request(`${ContinueSteadySave}${id}`,null,true,'GET',this.handleResponse)


    }


    handlePause = () =>{
        const id = this.props.id;

        // show modal to confirm
        request(`${PauseSteadySave}${id}`,null,true,'GET',this.handleResponse)


    }


    handleStop = () =>{
        //show modal to confirm
        const id = this.props.id;

        //call
        request(`${StopSteadySave}${id}`,null,true,'GET',this.handleResponse)


    }


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

        const {start_date,hour_of_day,contribution,frequency} = this.props.steadySave;

        return (
            <React.Fragment>
                <Form onSubmit={this.submitForm}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <div className={'text-muted secondary-text'}>Contribution</div>
                            {/*<Form.Label>Plan Name</Form.Label>*/}
                            {
                                this.state.showEditInput ?
                                (
                                    <React.Fragment>
                                        <Form.Control type="text" name={'contribution'} defaultValue={contribution} id={'contribution'} onChange={this.changeHandler}/>
                                        {this.validator.message('contribution', contribution, 'required|numeric')}
                                    </React.Fragment>

                                ):
                                    <h2>&#8358;{formatNumber(contribution)}</h2>

                            }

                        </Form.Group>

                        <Form.Group as={Col}>
                            <div className={'text-muted secondary-text'}>frequency</div>
                            {
                                this.state.showEditInput ?
                                    (
                                        <React.Fragment>
                                            <Form.Control as="select"   onChange={this.changeHandler} defaultValue={frequency} id={'frequency'}
                                                          name={'frequency'}>
                                                <option value={'daily'} >Daily</option>
                                                <option value={'weekly'} >Weekly</option>
                                                <option value={'monthly'} >Monthly</option>
                                            </Form.Control>
                                            {this.validator.message('frequency', frequency, 'required|string')}
                                        </React.Fragment>
                                    ):
                                    <h2>{frequency}</h2>
                            }
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Start Date</div>
                            {/*<Form.Label>Start Date</Form.Label>*/}
                            {
                                this.state.showEditInput ?
                                    (
                                        <React.Fragment>
                                            <Form.Control type="date" defaultValue={start_date} name={'start_date'} id={'start_date'}
                                                          onChange={this.changeHandler}/>
                                            {this.validator.message('start_date', start_date, 'required|string')}
                                        </React.Fragment>
                                    ):
                                    <h2>{start_date}</h2>
                            }
                        </Form.Group>

                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Hour of the Day</div>
                            {
                                this.state.showEditInput ?
                                    (
                                        <React.Fragment>
                                            <select className="form-control" defaultValue={hour_of_day} onChange={this.changeHandler} name={'hour_of_day'} id="hour">
                                                <option  value={'1'} >1:00am</option>
                                                <option  value={'2'} >2:00am</option>
                                                <option  value={'3'} >3:00am</option>
                                                <option  value={'4'} >4:00am</option>
                                                <option  value={'5'} >5:00am</option>
                                                <option  value={'6'} >6:00am</option>
                                                <option  value={'7'} >7:00am</option>
                                                <option  value={'8'} >8:00am</option>
                                                <option  value={'9'} >9:00am</option>
                                                <option  value="12">12:00noon</option>
                                                <option  value="13">1:00pm</option>
                                                <option  value="14">2:00pm</option>
                                                <option  value="15">3:00pm</option>
                                                <option  value="16">4:00pm</option>
                                                <option  value="17">5:00pm</option>
                                                <option  value="18">6:00pm</option>
                                                <option  value="19">7:00pm</option>
                                                <option  value="20">8:00pm</option>
                                                <option  value="21">9:00pm</option>
                                                <option  value="22">10:00pm</option>
                                                <option  value="23">11:00pm</option>
                                                <option  value="24">12:00am</option>
                                            </select>

                                            {this.validator.message('hour_of_day', hour_of_day, 'required|numeric')}

                                        </React.Fragment>
                                    ):
                                    <h2>{transformHour(hour_of_day)}</h2>
                            }
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className={'d-flex justify-content-start mt-2'}>
                        <div className='d-flex justify-content-end'>
                            {
                                this.state.showEditInput ?
                                    <button className='btn btn-sm btn-success ' onClick={this.editSteadySave}>Save</button>
                                    :
                                    <button className='btn btn-sm btn-primary' onClick={this.handleEdit}>
                                        Edit
                                    </button>
                            }
                            <button className='btn btn-sm btn-info ml-1' onClick={this.handleContinue}>
                                Continue
                            </button>
                            <button className='btn btn-sm btn-warning ml-1' onClick={this.handlePause}>
                                Pause
                            </button>
                            <button className='btn btn-sm btn-danger ml-1' onClick={this.handleStop}>
                                Stop
                            </button>
                        </div>

                    </Form.Row>


                </Form>
            </React.Fragment>
        );
    }
}


const SteadyToastForm = withToastManager(SteadySaveForm);

export default SteadyToastForm;
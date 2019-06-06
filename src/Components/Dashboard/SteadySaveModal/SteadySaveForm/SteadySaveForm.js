import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import {ContinueSteadySave, EditSteadySave, PauseSteadySave, StopSteadySave,} from "../../../../RouteLinks/RouteLinks";
import {getLocalStorage, request} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {formatNumber, transformHour} from "../../../../Helpers/Helper";


class SteadySaveForm extends Component {


    constructor(props){
        super(props);
        console.log("props",props);
        this.state = {
            disableStartDate:false,
            steadySaveInfo: {
                title: 'steady savings',
                hour_of_day: '12',
                start_date: '2016-03-03',
                frequency: 'daily',
                token: '',
                source: 'auto save',
                email: "",
                contribution: 100000,
            },
            showEditInput: false,
        };

        // this.validator = new SimpleReactValidator();
    }
    //validate form
    //submit steady save form
    // submitForm = (e) => {
    //     e.preventDefault();
    //     if (this.validator.allValid()) {
    //         request(NewSteadySaveEndpoint, this.state.steadySaveInfo, true, 'POST', this.HandleBackUpGoal);
    //     } else {
    //         this.validator.showMessages();
    //         // rerender to show messages for the first time
    //         this.forceUpdate();
    //     }
    //
    // };


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
            showEditInput: true
        })

    };

    handleEdit = (e) => {
        e.preventDefault();
        this.props.onEdit(true);
    };

    editSteadySave = () => {
        const id = this.props.id;
        //call api
        request(`${EditSteadySave}${id}`, null, true, 'GET', this.handleResponse)
    };

    handleResponse = (status, res) => {
        if (status) {
            console.log(res);
            this.setState({
                showEditInput: false,
            });
        } else {

            this.setState({
                showEditInput: false,
            });
        }


    };

    handleContinue = () => {
        const id = this.props.id;
        //show modal to confirm

        request(`${ContinueSteadySave}${id}`, null, true, 'GET', this.handleResponse)


    };


    handlePause = () => {
        const id = this.props.id;

        // show modal to confirm
        request(`${PauseSteadySave}${id}`, null, true, 'GET', this.handleResponse)


    };


    handleStop = () => {
        //show modal to confirm
        const id = this.props.id;

        //call
        request(`${StopSteadySave}${id}`, null, true, 'GET', this.handleResponse)


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

        const {start_date, hour_of_day, contribution, frequency} = this.props.steadySave;
        const customDisable = !this.props.steadySave.id;
        console.log(this.props.steadySave);
        return (
            <React.Fragment>
                <Form onSubmit={this.submitForm}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <div className={'text-muted secondary-text'}>Contribution</div>
                            <h2>&#8358;{formatNumber(contribution) || 0}</h2>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <div className={'text-muted secondary-text'}>frequency</div>
                            {
                                this.state.showEditInput ?
                                    (
                                        <React.Fragment>
                                            <Form.Control as="select" onChange={this.changeHandler}
                                                          defaultValue={frequency} id={'frequency'}
                                                          name={'frequency'}>
                                                <option value={'daily'}>Daily</option>
                                                <option value={'weekly'}>Weekly</option>
                                                <option value={'monthly'}>Monthly</option>
                                            </Form.Control>
                                            {this.validator.message('frequency', frequency, 'required|string')}
                                        </React.Fragment>
                                    ) :
                                    <h2>{frequency}</h2>
                            }
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Start Date</div>
                            <h2>{start_date}</h2>
                        </Form.Group>

                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Hour of the Day</div>
                            <h2>{transformHour(hour_of_day)}</h2>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className={'d-flex justify-content-start mt-2'}>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-sm btn-primary' disabled={customDisable} onClick={this.handleEdit}>
                                Edit
                            </button>
                            <button className='btn btn-sm btn-info ml-1'  disabled={customDisable} onClick={this.handleContinue}>
                                Continue
                            </button>
                            <button className='btn btn-sm btn-warning ml-1' disabled={customDisable} onClick={this.handlePause}>
                                Pause
                            </button>
                            <button className='btn btn-sm btn-danger ml-1'  disabled={customDisable}onClick={this.handleStop}>
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
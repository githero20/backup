import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import {getLocalStorage} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {formatNumber, transformHour} from "../../../../Helpers/Helper";
import {continueSteadySave, pauseSteadySave, stopSteadySave} from "../../../../actions/SteadySaveAction";


class SteadySaveForm extends Component {


    constructor(props){
        super(props);
        console.log("props",props);
        this.toastManager = this.props.toastManager;
        this.state = {
            disableStartDate:false,
            loading:false,
        };
        console.log("props",props);

    }

    //Retrieves user inputs
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        //copy states object
        const data = {...this.state.steadySaveInfo};
        data[name] = value;
        this.setState({
            steadySaveInfo: data
        });
    };

    handleEdit = (e) => {
        e.preventDefault();
        this.props.onEdit(true);
    };

    handleContinue = (e) => {
        e.preventDefault();
        this.setState({loading:true});
        continueSteadySave(this.props.steadySave.id,(status, payload) => {
            this.setState({loading:false});
            if(!status){
                this.toastManager.add(payload,{
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout:5000
                });
            }else{
                this.toastManager.add("Steady Saving Updated Successfully",{
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout:5000
                });
                setTimeout(this.props.onHide,3000);
            }
        });
    };


    handlePause = (e) => {
        e.preventDefault();
        this.setState({loading:true});
        pauseSteadySave(this.props.steadySave.id,(status, payload) => {
            this.setState({loading:false});
            if(!status){
                this.toastManager.add(payload,{
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout:5000
                });
            }else{
                this.toastManager.add("Steady Saving Paused Successfully",{
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout:5000
                });
                setTimeout(this.props.onHide,3000);
            }
        });
    };


    handleStop = (e) => {
        e.preventDefault();
        this.setState({loading:true});
        stopSteadySave(this.props.steadySave.id,(status, payload) => {
            this.setState({loading:false});
            if(!status){
                this.toastManager.add(payload,{
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout:5000
                });
            }else{
                this.toastManager.add("Steady Saving Stopped Successfully",{
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout:5000
                });
                setTimeout(this.props.onHide,3000);
            }
        });
    };


    componentDidMount() {

        //get pay auths
        const userInfo = JSON.parse(getLocalStorage(USERINFO));

        if (JSON.parse(getLocalStorage(USERINFO))) {
            this.setState({
                userCards: userInfo.authorization.data
            });
        }
    }

    render() {

        const {start_date, hour_of_day, contribution, frequency} = this.props.steadySave;
        const customDisable = !this.props.steadySave.id;
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
                                                          name={'frequency'} >
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
                            <button className='btn btn-sm btn-danger ml-1'  disabled={customDisable} onClick={this.handleStop}>
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
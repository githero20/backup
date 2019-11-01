import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import {getLocalStorage} from "../../../../ApiUtils/ApiUtils";
import {USERINFO} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {formatNumber, initializeAmountInput, transformHour} from "../../../../Helpers/Helper";
import {continueSteadySave, pauseSteadySave, stopSteadySave} from "../../../../actions/SteadySaveAction";
import swal from "sweetalert";


class SteadySaveForm extends Component {


    constructor(props) {
        super(props);
        this.toastManager = this.props.toastManager;
        this.state = {
            disableStartDate: false,
            loading: false,
        };

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

    handleStart = (e) => {
        e.preventDefault();
        this.props.onStart(true);
    };


    // handleContinue = (e) => {
    //     e.preventDefault();
    //     this.setState({loading: true});
    //     continueSteadySave(this.props.steadySave.id, (status, payload) => {
    //         this.setState({loading: false});
    //         if (!status) {
    //             this.toastManager.add(payload, {
    //                 appearance: "error",
    //                 autoDismiss: true,
    //                 autoDismissTimeout: 5000
    //             });
    //         } else {
    //             this.toastManager.add("Steady Saving Updated Successfully", {
    //                 appearance: "success",
    //                 autoDismiss: true,
    //                 autoDismissTimeout: 5000
    //             });
    //             setTimeout(this.props.onHide, 3000);
    //             this.props.setupSteadySave();
    //         }
    //     });
    // };


    handleContinue = (e) => {
        e.preventDefault();
        swal({
            title: "Steady Save",
            text: "Hey! sure you want to continue steady save ?",
            icon: "warning",
            buttons: true,
        })
            .then((willPause) => {
                if (willPause) {
                    this.setState({loading: true});
                    continueSteadySave(this.props.steadySave.id, this.handleContinueResponse);
                } else {
                    swal("Your Steady Save is currently paused");
                }
            });

    };

    handleContinueResponse = (status, payload) => {
        this.setState({loading: false});
        if (!status) {
            swal("Steady Save", 'Something Went Wrong', 'error');

        } else {
            swal("Steady Save", 'Steady Save Continued Successfully', 'success').then(() => {
                this.props.onHide();
                this.props.setupSteadySave();
            });
        }
    };

    //
    // handlePause = (e) => {
    //     e.preventDefault();
    //     this.setState({loading: true});
    //     pauseSteadySave(this.props.steadySave.id, (status, payload) => {
    //         this.setState({loading: false});
    //         if (!status) {
    //             this.toastManager.add(payload, {
    //                 appearance: "error",
    //                 autoDismiss: true,
    //                 autoDismissTimeout: 5000
    //             });
    //         } else {
    //             this.toastManager.add("Steady Saving Paused Successfully", {
    //                 appearance: "success",
    //                 autoDismiss: true,
    //                 autoDismissTimeout: 5000
    //             });
    //             setTimeout(this.props.onHide, 3000);
    //             this.props.setupSteadySave();
    //         }
    //     });
    // };

    handlePause = (e) => {
        e.preventDefault();

        swal({
            title: "Steady Save",
            text: "Hey! sure you want to pause this active steady save ?",
            icon: "warning",
            buttons: true,
        })
            .then((willPause) => {
                if (willPause) {
                    this.setState({loading: true});
                    pauseSteadySave(this.props.steadySave.id, this.handlePauseResponse);

                } else {
                    swal("Your Steady Save is currently active");
                }
            });

    };


    handlePauseResponse = (status, payload) => {
        this.setState({loading: false});
        if (!status) {
            // this.toastManager.add(payload, {
            //     appearance: "error",
            //     autoDismiss: true,
            //     autoDismissTimeout: 5000
            // });
            swal("Steady Save", 'Something Went Wrong', 'error');
        } else {
            swal("Steady Save", 'Steady Save Paused Successfully', 'success').then(() => {
                this.props.onHide();
                this.props.setupSteadySave();
            });
        }
    };

    handleStop = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        stopSteadySave(this.props.steadySave.id, (status, payload) => {
            this.setState({loading: false});
            if (!status) {
                this.toastManager.add(payload, {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: 5000
                });
            } else {
                this.toastManager.add("Steady Saving Stopped Successfully", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 5000
                });
                setTimeout(this.props.onHide, 3000);
                this.props.setupSteadySave();
            }
        });
    };


    componentDidMount() {
        //get pay auths
        const userInfo = getLocalStorage(USERINFO);

        if (getLocalStorage(USERINFO) != undefined) {
            this.setState({
                userCards: userInfo.authorization.data
            });
        }

    }


    render() {

        const {start_date, hour_of_day, contribution, frequency} = this.props.steadySave;
        const customDisable = !this.props.steadySave.id;
        const enableStart = !this.props.steadySave.id;
        const showPause = this.props.steadySave.raw ? Number(this.props.steadySave.raw.is_pause) : false;
        console.log('steady save',this.props.steadySave);
        return (
            <React.Fragment>
                <Form onSubmit={this.submitForm}>
                    <Form.Row>
                        {/*<Form.Group as={Col} md={6}>*/}
                        {/*    <div className={'text-muted secondary-text'}>Total Steady Save Balance</div>*/}
                        {/*    <h2>&#8358;{formatNumber(this.props.totalSteadySave) || 0}</h2>*/}
                        {/*</Form.Group>*/}
                        <Form.Group as={Col} md={6}>
                            <div className={'text-muted secondary-text'}>Contribution

                            </div>
                            <h2>&#8358;{formatNumber(parseFloat(contribution).toFixed(2)) || 0.00}</h2>
                        </Form.Group>


                        <Form.Group as={Col}>
                            <div className={'text-muted secondary-text'}>Frequency</div>
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
                                    <h2 className='text-capitalize'>{frequency !== null ? frequency : 'N/A'}</h2>
                            }
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Start Date</div>
                            <h2>{start_date !== null ? start_date : 'N/A'}</h2>
                        </Form.Group>

                        <Form.Group as={Col} sm={6}>
                            <div className={'text-muted secondary-text'}>Hour of the Day</div>
                            <h2>{transformHour(hour_of_day)}</h2>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className={'d-flex align-items-center justify-content-between mt-2'}>
                        {/*<div className='d-flex justify-content-end'>*/}
                        {enableStart ? <button className='round btn-custom-blue modal-btn mr-1'
                                               onClick={this.handleStart}>
                            Start
                        </button> : null

                        }
                        <button className='round btn-outline-gray modal-btn round' disabled={customDisable}
                                onClick={this.handleEdit}>
                            Edit
                        </button>

                        {
                            showPause ?
                                <button className='round btn-custom-blue modal-btn ml-1' disabled={customDisable}
                                        onClick={this.handleContinue}>Continue
                                </button> :
                                <button className='round btn-custom-blue modal-btn ml-1' disabled={customDisable}
                                        onClick={this.handlePause}>Pause
                                </button>
                        }


                        {/*<button className='btn btn-sm btn-danger ml-1' disabled={customDisable}*/}
                        {/*        onClick={this.handleStop}>*/}
                        {/*    Stop*/}
                        {/*</button>*/}
                        {/*</div>*/}

                    </Form.Row>


                </Form>
            </React.Fragment>
        );
    }


}



export default withToastManager(SteadySaveForm);
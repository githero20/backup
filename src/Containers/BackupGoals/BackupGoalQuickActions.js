import React from 'react';
import editIcon from "../../admin/app-assets/images/svg/Transfer to Backup Stash.svg";
import pauseIcon from "../../admin/app-assets/images/svg/Transfer to Central Vault icon.svg";
import continueIcon from "../../admin/app-assets/images/svg/Withdraw.svg";
import {continueBGoal, createBackUpGoal, pauseBGoal, stopBGoal} from "../../actions/BackUpGoalsAction";
import {withToastManager} from 'react-toast-notifications';
import swal from "sweetalert";
import EditBGModal from "../../Components/Dashboard/EditBackUpGoalModal/EditBGModal";
import SimpleReactValidator from "simple-react-validator";
import {_calculateDateDifference, _handleFormChange} from "../../utils";
import {isGoalCompleted} from "../../Helpers/Helper";

class BackupGoalQuickActions extends React.Component {


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
            penalty: 0,
            dateDifference: 0,
            userCards: [],
            showMonth: false,
            showDay: false,
            showHour: true,
            loading: false,
            showEditModal: false
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
                form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date, "days") * form.contribution) || 0;
                this.setState({
                    showMonth: false,
                    showDay: false,
                    showHour: true,
                    form
                });
                //calculate the difference between the start date and the end Date
            } else if (form.frequency == "weekly") {
                form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date, "weeks") * form.contribution) || 0;
                this.setState({
                    showMonth: false,
                    showDay: true,
                    showHour: true,
                    form
                });
            } else if (form.frequency == "monthly") {
                form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date, "months") * form.contribution) || 0;
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
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        } else {
            //show loader
            this.setState({
                loading: true,
            });

            if (parseInt(this.state.form.payment_auth) === 0) {
                //initiate paystack
                this.initiatePayStack();
            } else {

                createBackUpGoal(this.state.form, (status, payload) => {
                    //remove loader

                    this.setState({
                        loading: false,
                    });
                    if (status) {
                        this.props.toastManager.add("Backup Goal Saved.", {
                            appearance: "success"
                        });
                        setTimeout(() => this.props.onHide(true), 2000);
                    } else {
                        this.props.toastManager.add(JSON.stringify(payload) || "An Error Occurred", {
                            appearance: "error",
                            autoDismiss: true,
                            autoDismissTimeout: 5000
                        });
                    }
                });

            }

        }

    };


    hideModal = () => {
        this.setState({
            showEditModal: false
        })
    }


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


    handleEdit = (id) => {
        // show modal
        this.setState({
            showEditModal: true,
        })
    }

    calculatePenalty(penalty, history) {
        let amount;
        if (history.length !== 0) {
            amount = history.reduce((a, b) => ({amount: parseFloat(a.amount) + parseFloat(b.amount)}));
            return (penalty / 100) * amount.amount;
        }
        return 0;
    }


    handleStop = (id) => {
        swal({
            title: "Backup Goals",
            text: `Hey! sure you want to stop this Backup Goal before maturity?`,
            icon: "warning",
            buttons: true,
        }).then((willStop) => {
            if (willStop) {
                swal({
                    title: 'BackupGoals',
                    text: ' This fund will be transferred to your central vault',
                    icon: "warning",
                    buttons: true,
                }).then((willStop) => {
                    if (willStop) {
                        stopBGoal(id, this.handleStopResponse);
                    }
                });

            } else {
                swal("Your Backup Goal is still running.");
            }
        });
    }


    handleStopResponse = (status, res) => {
        if (status) {
            swal("You have successfully stopped your backup goal.", {
                icon: "success",
            }).then(() => {
                this.props.fetchGoals();
                this.props.updateSelectedBG(res);
            });
        } else {
            swal("Something went wrong.", {
                icon: "error",
            });
        }
    };


    handlePause = (id) => {
        swal({
            title: "Backup Goals",
            text: "Hey! sure you want to pause this active Backup Goal ?",
            icon: "warning",
            buttons: true,
        })
            .then((willPause) => {
                if (willPause) {
                    pauseBGoal(id, this.handlePauseResponse);
                } else {
                    swal("Your Backup Goal is active");
                }
            });
    };

    handlePauseResponse = (status, res) => {
        if (status) {
            swal("You have successfully paused your backup goal.", {
                icon: "success",
            }).then(() => {
                this.props.fetchGoals();
                this.props.updateSelectedBG(res);
            });
        }
    };


    handleContinue = (id) => {
        swal({
            title: "Backup Goals",
            text: "Hey! sure you want to continue this Backup Goal ?",
            icon: "warning",
            buttons: true,
        })
            .then((willContinue) => {
                if (willContinue) {
                    continueBGoal(id, this.handleContinueResponse);
                } else {
                    swal("Your Backup Goal is currently paused");
                }
            });

    };


    handleContinueResponse = (status, res) => {
        if (status) {
            swal("You have successfully continued your backup goal.", {
                icon: "success",
            }).then(() => {
                this.props.fetchGoals();
                this.props.updateSelectedBG(res);
            });
        }
    };


    componentDidMount() {
        this.props.showBackUpHistory(this.props.selectedBG.id);
    }


    render() {
        return (
            <React.Fragment>
                <div className="col-lg-4 col-12 order-lg-5 mb-2  ">
                    <h3 className="gray-header-text d-none d-md-block text-right fs-mb-1 mb-2">
                        <a href='#!' className='gray-text back-btn'
                           onClick={() => this.props.hideBG()}>
                            <i className='fa fa-chevron-left'/>
                            &nbsp;Back to Goals
                        </a>
                    </h3>
                    <div className="mb-quick-actions d-flex flex-column flex-wrap ">
                        {
                            !Number(this.props.selectedBG.stop) && !isGoalCompleted(this.props.selectedBG) ?
                                (
                                    <React.Fragment>
                                        <span className="bg-btn-wrapper mb-btn-wrapper">
                                            <button type="button"
                                                    onClick={() => this.handleEdit(this.props.selectedBG.id)}
                                                    className=" btn-blue-gradient-2 round">
                                                <img src={editIcon}/>Edit Backup Goal
                                            </button>
                                        </span>

                                        {
                                            this.state.showEditModal ?
                                                (
                                                    <React.Fragment>
                                                        <EditBGModal selectedBG={this.props.selectedBG}
                                                                     updateSelectedBG={this.props.updateSelectedBG}
                                                                     fetchGoals={this.props.fetchGoals}
                                                                     show={this.state.showEditModal}
                                                                     onHide={this.hideModal}
                                                        />
                                                    </React.Fragment>
                                                ) : null
                                        }


                                        {
                                            Number(this.props.selectedBG.is_pause) ?

                                                (
                                                    <span className="bg-btn-wrapper mb-btn-wrapper">
                                                    <button type="button"
                                                            onClick={() => this.handleContinue(this.props.selectedBG.id)}
                                                            className=" btn-blue-gradient-2 round">
                                                        <img src={continueIcon}/>Continue
                                                    </button>
                                                  </span>

                                                ) :
                                                (
                                                    <span className="bg-btn-wrapper mb-btn-wrapper">
                                                    <button type="button"
                                                            onClick={() => this.handlePause(this.props.selectedBG.id)}
                                                            className=" btn-blue-gradient-2 round">
                                                        <img src={pauseIcon}/>Pause
                                                    </button>
                                                  </span>
                                                )
                                        }


                                    </React.Fragment>
                                ) : null
                        }
                        {
                            !Number(this.props.selectedBG.stop) && !isGoalCompleted(this.props.selectedBG) ?
                                (
                                    <span className="mb-btn-wrapper">
                                        <button type="button"
                                                onClick={() => this.handleStop(this.props.selectedBG.id)}
                                                className="btn-blue-gradient-2 bg-white round">
                                            <img src={continueIcon}/>
                                            Stop
                                        </button>
                                    </span>
                                ) : null
                        }
                    </div>
                </div>

            </React.Fragment>
        );
    }

}

export default withToastManager(BackupGoalQuickActions);

import React, {Component, Fragment} from 'react';
import Form from "react-bootstrap/Form";
import {_handleFormChange} from "../../../utils/index";
import SimpleReactValidator from "simple-react-validator";
import {withToastManager} from 'react-toast-notifications';
import ButtonLoader from "../../../Components/Auth/Buttonloader/ButtonLoader";
import {createWithdrawalSettings} from "../../../actions/WithdrawalAction";
import moment from "moment";

class WithdrawalSettingsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            form: {
                first_quarter:"2019-01-01",
                second_quarter:"2019-04-01",
                third_quarter:"2019-07-01",
                fourth_quarter: "2019-10-01"
            }
        };
        this.validator = new SimpleReactValidator();

        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //Create Form
    //validate form
    //save
    //handle response

    handleChange(e){
        this.setState({resolved:false});
        _handleFormChange(e.target.name,e, this)
    }
    validateForm(e){
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // this.props.toastManager("An Error Occured");
            // rerender to show messages for the first time
            this.forceUpdate();
        }else{
            this.setState({loading:true});
            //send api
            const {form} = this.state;
            const param = {
                label: ["First Quarter", "Second Quarter", "Third Quarter","Fourth Quarter"],
                withdrawal_date: [moment(form.first_quarter).format("M/DD"), moment(form.second_quarter).format("M/DD"), moment(form.third_quarter).format("M/DD"), moment(form.fourth_quarter).format("M/DD")]
            };

            console.log("Log", param);

            createWithdrawalSettings(param,(status, payload) =>{
                this.setState({loading:false});
                if(status){
                    this.props.toastManager.add("Settings Updated",{
                        appearance:"success",
                        autoDismissTimeout:3000,
                        autoDismiss:true
                    });

                    setTimeout(this.props.onHide, 3000);
                }else{
                    this.props.toastManager.add(payload,{
                        appearance:"error",
                        autoDismissTimeout:3000,
                        autoDismiss:true
                    });
                }
            })
        }
    };

    render() {
        return (
            <React.Fragment>
                <Fragment>
                    <form className="form lock-form" onSubmit={this.validateForm}>
                        <Form.Text>
                            You are using Backup Cash's FREE WITHDRAWAL DATES. You can either accept these DATES as your Free Withdrawal Dates or set your own Dates . To accept these dates, click "Save Settings" below, otherwise edit the dates to reflect your own withdrawal dates.
                        </Form.Text>
                        <Form.Text className="alert-danger">
                            Please note that you can ONLY change these Dates once
                        </Form.Text>
                        <div className="form-body">
                            <div className="row">
                                <div className="form-group col-lg-6">
                                    <label htmlFor="first_quarter"
                                           className=" col-form-label">First Quarter</label>
                                    <div className="col-lg-12">
                                        <input type="date"
                                               required={true}
                                               className="form-control"
                                               onChange={this.handleChange}
                                               id="first_quarter"
                                               name="first_quarter"
                                               value={this.state.form.first_quarter}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="form-group row">
                                <label htmlFor="second_quarter"
                                       className="col-lg-12 col-form-label">Second Quarter</label>
                                <div className="col-lg-12">
                                    <input type="date"
                                           className="form-control"
                                           onChange={this.handleChange}
                                           id="second_quarter"
                                           name="second_quarter"
                                           required={true}
                                           value={this.state.form.second_quarter}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="third_quarter"
                                       className="col-lg-12 col-form-label">Third Quarter</label>
                                <div className="col-lg-12">
                                    <input type="date"
                                           required={true}
                                           className="form-control"
                                           onChange={this.handleChange}
                                           id="third_quarter"
                                           name="third_quarter"
                                           value={this.state.form.third_quarter}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="fourth_quarter"
                                       className="col-sm-12 col-form-label">Fourth Quarter</label>
                                <div className="col-sm-12">
                                    <input type="date"
                                           required={true}
                                           className="form-control"
                                           onChange={this.handleChange}
                                           id="fourth_quarter"
                                           name="fourth_quarter"
                                           value={this.state.form.fourth_quarter}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="form-actions d-flex justify-content-center justify-content-md-end">
                            <button type="button"
                                    className="btn  btn-custom-border px-3 py-1 round pull-left"
                                    onClick={this.props.onHide}>Cancel
                            </button>
                            <button type="submit"
                                    className="btn  btn-bg-shade-2 px-3 py-1 round pull-right">
                                {this.state.loading?<ButtonLoader/>:
                                    <span>Update</span>}
                            </button>

                        </div>
                    </form>
                </Fragment>

            </React.Fragment>
        );
    }
}


const FormWithToast = withToastManager(WithdrawalSettingsForm);

// export default LoginWithToast;
export default FormWithToast;
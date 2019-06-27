import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import {addWithdrawalPin} from "../../../actions/WithdrawalAction";
import swal from 'sweetalert';
import {DashboardLink} from "../../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';
import {validateInputEntry} from "../../../Helpers/Helper";
import {_handleFormChange} from "../../../utils";

class PayNowModal extends Component {


    state = {
        amount: 0,
        loading: false,
        disableBtn: false,
        pinErr: false,
        form: {
            amount:'',
            payment_auth_id:'',
            steady_save_id:'',
        }

    };

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            validators: {
                amount: {  // name the rule
                    message: 'Please Input the Amount',
                }
            }
        });
    }

    handlePinConcatenation = (name, event, callback = null) => {

        let form = {...this.state.form};

        form[name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        if (callback != null) {
            callback();
        }
        return form;
    };


    handleChange = (e) => {

        const form = _handleFormChange(
            e.target.name,
            e,
            this
        );
        // this.handlePinConcatenation(e.target.name, e);
    };


    // //Retrieves user inputs
    // changeHandler = event => {
    //
    //     const name = event.target.name;
    //     let value = event.target.value;
    //
    //
    //     this.setState({
    //         [name]: value
    //     });
    // };


    submit = () => {

       //TODO if validatioo

    };


    validateInput = (e) => {
        validateInputEntry(e);
    };


    handleResponse = (status, res) => {

        this.setState({
            loading: false,
            disableBtn: false
        });

        const {toastManager} = this.props;

        if (status&&res) {

                swal('Withdrawal Pin','Your withdrawal pin was successfully added.','success');
                // toastManager.add(`Your withdrawal pin was successfully added. `, {
                //     appearance: 'success',
                //     autoDismiss: true,
                //     autoDismissTimeout: 3000,
                // });
                // this.props.onHide();

                //hide modal
                setTimeout(() => {
                    this.props.onHide();
                }, 3000);
        } else {
           console.log(res);
            // toastManager.add(`${JSON.stringify(res.data.message)}`, {
            //     appearance: 'error',
            //     autoDismiss: true,
            // });
        }
    };


    render() {
        const {amount} = this.state;
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'instant-save-modal steady-save-modal '}>

                <Modal.Header className={'px-md-3 py-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Pay Due Steady Save</h4>
                    </Modal.Title>
                    {/*<a href='#' className="gray-text back-btn "*/}
                    {/*   onClick={()=>this.props.hideForm()}>Back to Withdrawals <i className='fa fa-chevron-right'></i>*/}
                    {/*</a>*/}
                </Modal.Header>


                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        <Form>
                            <div className={'row'}>

                                <div className="col">
                                    <div className="form-group">
                                        <label>Enter Withdrawal Pin</label>
                                        {this.state.pinErr ?
                                            <p><span
                                                className='srv-validation-message'>Your pin must be four digits</span>
                                            </p>
                                            : null}
                                        <div className="row">
                                            <div className="col-3">
                                                <input id="pin_one" type="password" name={'pin_one'}
                                                       className={'form-control pin-control'}
                                                       onChange={this.handleChange}
                                                       onKeyUp={this.validateInput}
                                                       onKeyDown={this.validateInput}
                                                />

                                            </div>
                                            <div className="col-3">
                                                <input id="pin_two" type="password" name={'pin_two'}
                                                       className={'form-control pin-control'}
                                                       onChange={this.handleChange}
                                                       onKeyUp={this.validateInput}
                                                       onKeyDown={this.validateInput}
                                                />

                                            </div>
                                            <div className="col-3">
                                                <input id="pin_three" type="password" name={'pin_three'}
                                                       className={'form-control pin-control'}
                                                       onChange={this.handleChange}
                                                       onKeyUp={this.validateInput}
                                                       onKeyDown={this.validateInput}
                                                />

                                            </div>
                                            <div className="col-3">
                                                <input id="pin_four" type="password" name={'pin_four'}
                                                       className={'form-control pin-control'}
                                                       onChange={this.handleChange}
                                                       onKeyUp={this.validateInput}
                                                       onKeyDown={this.validateInput}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <Form.Row className={'d-flex justify-content-center justify-content-md-end mt-2'}>
                                <button className={'round btn-custom-blue auth-btn modal-btn'} onClick={this.submit}
                                        disabled={this.state.disableBtn} type="button">
                                    {this.state.loading ? <ButtonLoader/> :
                                        <span>Submit</span>}
                                </button>
                            </Form.Row>
                        </Form>
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }


}

export default withToastManager(PayNowModal);
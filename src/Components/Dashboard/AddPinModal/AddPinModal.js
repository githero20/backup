import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import {addWithdrawalPin} from "../../../actions/WithdrawalAction";
import swal from 'sweetalert';

class AddPinModal extends Component {


    state = {
        amount: 0,
        loading: false,
        disableBtn: false,
        pinErr: false,
        form: {
            withdrawal_pin: '',
            pin_one: '',
            pin_two: '',
            pin_three: '',
            pin_four: '',
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

        if (name == 'pin_one' || name == 'pin_two' || name == 'pin_three' || name == 'pin_four') {

            form.withdrawal_pin = form.pin_one + form.pin_two + form.pin_three + form.pin_four;
            console.log('form pin', form.withdrawal_pin);
            this.setState({form});
            // console.log('withdrawal pin', form['withdrawal_pin']);
        }

        console.log('length of pin ', form.withdrawal_pin.length);
        if (form.withdrawal_pin.length >= 4) {
            this.setState({
                pinErr: false
            })
        }

        if (callback != null) {
            callback();
        }
        return form;
    };


    handleChange = (e) => {
        //handle concatenation of pin
        this.handlePinConcatenation(e.target.name, e);
        // this.getUserBank(e.target.name, e);
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

        if (this.state.form.withdrawal_pin.length >= 4) {
            this.setState({
                loading: true,
                disableBtn: true
            });

            //store withdrawal pin
            addWithdrawalPin(this.state.form,this.handleResponse);

        } else {
            this.setState({
                pinErr: true
            });
        }


    };


    validateInput = (e) => {
        if (e.target.value.length > 0 && e.keyCode !== 46 && e.keyCode !== 8) {
            e.preventDefault();
        }
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
                className={'instant-save-modal steady-save-modal'}>

                <Modal.Header className={' px-md-3 py-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Add Withdrawal Pin</h4>
                    </Modal.Title>
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

export default withToastManager(AddPinModal);
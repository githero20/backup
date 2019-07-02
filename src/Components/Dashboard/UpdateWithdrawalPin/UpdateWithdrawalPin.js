import React, {Component} from 'react';
import {withToastManager} from "react-toast-notifications";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import swal from "sweetalert";
import {changePin} from "../../../actions/WithdrawalAction";
import {validateInputEntry} from "../../../Helpers/Helper";

class UpdateWithdrawalPin extends Component {


    //fetch user info
    state = {
        loading: false,
        disable: false,
        oldPinErr: false,
        newPinErr: false,
        form: {
            new_pin_one: '',
            new_pin_two: '',
            new_pin_three: '',
            new_pin_four: '',
            new_withdrawal_pin: '',
            old_pin_one: '',
            old_pin_two: '',
            old_pin_three: '',
            old_pin_four: '',
            old_withdrawal_pin: '',
        }
    };


    // get and validate password
    constructor(props) {
        super(props);
    }


    // update password

    submitForm = (e) => {

        e.preventDefault();

        if (!(this.state.form.old_withdrawal_pin.length >= 4)) {
            this.setState({oldPinErr: true});

        } else if (!(this.state.form.new_withdrawal_pin.length >= 4)) {
            this.setState({newPinErr: true});
        } else {

            // make request to update pin
            this.setState({loading: true, disable: true,})
            changePin(this.state.form, this.handleResponse);


        }


    };

    handleResponse = (status, res) => {
        this.setState({loading: false, disable: false,});
        document.getElementById('updatePinForm').reset();
        if (status) {
            swal('Withdrawal Pin', 'Your pin has been successfully updated', 'success');
        } else if (!status && res) {
            this.toastMessage(res, 'error');
        } else {
            this.toastMessage('Poor Connectivity', 'error');
        }

    };


    toastMessage = (message, status) => {
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    }


    handleChange = (e) => {
        //handle concatenation of pin
        this.handlePinConcatenation(e.target.name, e);
    };


    handlePinConcatenation = (name, event, callback = null) => {
        let form = {...this.state.form};
        form[name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        if (name == 'old_pin_one' || name == 'old_pin_two' || name == 'old_pin_three' || name == 'old_pin_four') {

            form.old_withdrawal_pin = form.old_pin_one + form.old_pin_two + form.old_pin_three + form.old_pin_four;
            this.setState({form});
            // console.log('withdrawal pin', form['withdrawal_pin']);
        }

        if (name == 'new_pin_one' || name == 'new_pin_two' || name == 'new_pin_three' || name == 'new_pin_four') {

            form.new_withdrawal_pin = form.new_pin_one + form.new_pin_two + form.new_pin_three + form.new_pin_four;
            this.setState({form});
        }

        if (form.old_withdrawal_pin.length >= 4) {
            this.setState({
                oldPinErr: false
            })
        }

        if (form.new_withdrawal_pin.length >= 4) {
            this.setState({
                newPinErr: false
            })
        }

        if (callback != null) {
            callback();
        }
        return form;
    };

    validateInput = (e) => {
        validateInputEntry(e);
        // if (e.target.value.length > 0 && e.keyCode !== 46 && e.keyCode !== 8) {
        //     e.preventDefault();
        // }
    };


    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.submitForm} id={'updatePinForm'}>
                    <div className="row my-5">
                        <div className='col-12'>
                            <h4 className=''>Update Withdrawal Pin</h4>
                            <div className='line'></div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Old Pin</label>
                                {this.state.oldPinErr ?
                                    <p><span className='srv-validation-message'>Your old pin must be four digits</span>
                                    </p>
                                    : <p>&nbsp;</p>}
                                <div className="row">
                                    <div className="col-3">
                                        <input id='old_pin_one' type="password" name={'old_pin_one'}
                                               className={'form-control pin-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />

                                    </div>
                                    <div className="col-3">
                                        <input id='old_pin_two' type="password" name={'old_pin_two'}
                                               className={'form-control pin-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />

                                    </div>
                                    <div className="col-3">
                                        <input id='old_pin_three' type="password" name={'old_pin_three'}
                                               className={'form-control pin-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />

                                    </div>
                                    <div className="col-3">
                                        <input id='old_pin_four' type="password" name={'old_pin_four'}
                                               className={'form-control pin-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>New Pin</label>
                                {this.state.newPinErr ?
                                    <p><span className='srv-validation-message'>Your new pin must be four digits</span>
                                    </p>
                                    : <p>&nbsp;</p>}
                                <div className="row">
                                    <div className="col-3">
                                        <input id='new_pin_one' type="password" name={'new_pin_one'}
                                               className={'form-control pin-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />

                                    </div>
                                    <div className="col-3">
                                        <input id='new_pin_two' type="password" name={'new_pin_two'}
                                               className={'form-control pin-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />

                                    </div>
                                    <div className="col-3">
                                        <input id='new_pin_three' type="password" name={'new_pin_three'}
                                               className={'form-control pin-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />

                                    </div>
                                    <div className="col-3">
                                        <input id='new_pin_four' type="password" name={'new_pin_four'}
                                               className={'form-control pin-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-center mt-2  text-md-right">
                            <button type="submit" disabled={this.state.disable}
                                    className="btn-withdraw round ">
                                {this.state.loading ? <ButtonLoader/> :
                                    <span>Update Pin</span>}
                            </button>
                        </div>
                    </div>
                </form>

            </React.Fragment>
        );
    }
}

export default withToastManager(UpdateWithdrawalPin);
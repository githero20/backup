import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import {_handleFormChange} from "../../../utils/index";
import SimpleReactValidator from "simple-react-validator";
import ButtonLoader from "../../../Components/Auth/Buttonloader/ButtonLoader";
import {withToastManager} from 'react-toast-notifications';
import {resolveBankName, sendBankOTP} from "../../../actions/BankAction";
import {toastMessage} from "../../../Helpers/Helper";


class BankForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            resolved: false,
            form: {
                bank: "",
                account_number: "",
                // account_number:"1234575785",
                bank_code: "",
                account_name: ""
            }
        };
        this.validator = new SimpleReactValidator();

        this.validateForm = this.validateForm.bind(this);
        this.resolveAccountNumber = this.resolveAccountNumber.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({resolved: false});
        _handleFormChange(e.target.name, e, this)
    }

    validateForm(e) {
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // this.props.toastManager("An Error Occured");
            // rerender to show messages for the first time
            this.forceUpdate();
        } else {
            this.setState({loading: true});
            //send api
            const {form} = this.state;
            const bank = this.props.banks.find(bank => bank.code == form.bank_code);
            form.bank = `${bank.name}.${bank.code}`;
            sendBankOTP(form, (status, payload) => {
                this.setState({loading: false});
                if (status) {
                    this.props.showOtp(payload);
                } else {
                    if (payload != null && payload.status == 422) {
                        toastMessage(payload.data.data, 'error', this);
                    }
                }
            });
        }
    };

    resolveAccountNumber(e) {
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            this.setState({loading: true});
            //send api
            const {form} = this.state;
            resolveBankName(form.account_number, form.bank_code, (status, payload) => {
                if (status) {
                    let form = this.state.form;
                    form.account_name = payload.account_name;
                    this.setState({loading: false, resolved: true, form});
                } else {
                    this.setState({loading: false});
                    console.log('error', payload);
                    if (payload != null && payload.status == 422) {
                        toastMessage(payload.data.message, 'error', this);
                    }
                }
            });
        }
    }


    componentDidMount() {
        console.log('props', this.props);
    }

    render() {

        const banksSelect = this.props.banks.map((bank, index) => {
            return (
                <option key={index} value={bank.code}>{bank.name}</option>
            );
        });

        return (
            <React.Fragment>
                <Form onSubmit={this.validateForm}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Bank Name: </Form.Label>
                            <Form.Control as="select" value={this.state.form.bank_code} onChange={this.handleChange}
                                          name="bank_code">
                                <option value={""}>Select Bank</option>
                                {banksSelect}
                            </Form.Control>
                            {this.validator.message("bank", this.state.form.bank_code, "required")}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Account Number: </Form.Label>
                            <Form.Control
                                name="account_number"
                                type="number"
                                onChange={this.handleChange}
                                value={this.state.form.account_number}
                            />
                            {this.validator.message("Account Number", this.state.form.account_number, "required|numeric|size:10")}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            {
                                this.state.resolved
                                    ?
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Account Name: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled={true}
                                            value={this.state.form.account_name}
                                        />
                                    </Form.Group>
                                    : null
                            }
                        </Form.Group>


                    </Form.Row>
                    <Form.Row className={'d-flex justify-content-end mt-2'}>
                        <div className={'d-flex justify-content-end'}>

                            {
                                !this.state.resolved
                                    ?
                                    <button className={'round btn-custom-blue modal-btn px-1'}
                                            onClick={this.resolveAccountNumber}>
                                        {this.state.loading ? <ButtonLoader/> : "Confirm"}
                                    </button>
                                    :
                                    <button className={'round btn-custom-blue modal-btn px-1'} type="submit">
                                        {this.state.loading ? <ButtonLoader/> : "Add Bank"}
                                    </button>

                            }

                        </div>

                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}


// export default LoginWithToast;
export default withToastManager(BankForm);
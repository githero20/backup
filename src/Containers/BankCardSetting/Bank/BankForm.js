import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {_handleFormChange} from "../../../utils/index";
import SimpleReactValidator from "simple-react-validator";
import ButtonLoader from "../../../Components/Auth/Buttonloader/ButtonLoader";
import {withToastManager} from 'react-toast-notifications';
import {saveBankAccount} from "../../../actions/BankAction";


class BankForm extends Component {

    constructor(props) {
        super(props);
        //TODO(get the user balance and set the max amount to that amount)
        console.log(props);
        this.state = {
            loading:false,
            dateDifference:0,
            form: {
                bank:"",
                account_number:"2118393935",
                bank_code:""
            }
        };
        this.validator = new SimpleReactValidator();

        this.validateForm = this.validateForm.bind(this);
    }

    //Create Form
    //validate form
    //save
    //handle response

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
            const bank = this.props.banks.find(bank => bank.code == form.bank_code);
            form.bank = `${bank.name}.${bank.code}`;
            console.log("props", this.props);
            saveBankAccount(form,(status, payload) => {
                this.setState({loading:false});
                console.log(status, payload);
                if(status){
                    this.props.showOtp(payload);
                }else{
                    //TODO(Show Error to user)
                }
            });
        }
    };

    render() {

        const banksSelect = this.props.banks.map((bank,index) => {
           return(
               <option key={index} value={bank.code}>{bank.name}</option>
           );
        });
        return (
            <React.Fragment>
                <Form onSubmit={this.validateForm}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Bank Name: </Form.Label>
                            <Form.Control as="select" value={this.state.form.bank_code} onChange={value => _handleFormChange("bank_code",value, this)}
                                          name="bank_name">
                                <option value={""}>Select Bank</option>
                                {banksSelect}
                            </Form.Control>
                            {this.validator.message("bank",this.state.form.bank_code,"required")}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Account Number: </Form.Label>
                            <Form.Control
                                type="number"
                                onChange={value => _handleFormChange("account_number",value, this)}
                                value={this.state.form.account_number}
                            />
                            {this.validator.message("Account Number",this.state.form.account_number,"required")}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className={'d-flex justify-content-between mt-2'}>
                        <div>
                            <Button onClick={this.props.onHide}
                                    className={'mr-1 round btn-gradient-blue'}>Close</Button>
                        </div>
                        <div className={'d-flex justify-content-end'}>

                            <Button className={'round btn-gradient-blue '} type="submit">
                                {this.state.loading ? <ButtonLoader/> : "Add Bank"}
                            </Button>
                        </div>

                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}


const FormWithToast = withToastManager(BankForm);

// export default LoginWithToast;
export default BankForm;
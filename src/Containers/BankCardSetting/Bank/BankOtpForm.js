import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {_handleFormChange} from "../../../utils/index";
import SimpleReactValidator from "simple-react-validator";
import ButtonLoader from "../../../Components/Auth/Buttonloader/ButtonLoader";
import {withToastManager} from 'react-toast-notifications';
import {verifyOtp} from "../../../actions/BankAction";


class BankOtpForm extends Component {

    constructor(props) {
        super(props);
        //TODO(get the user balance and set the max amount to that amount)
        console.log("init",props);
        this.state = {
            loading:false,
            form: {
                otp:"",
                bankotp_id: this.props.bankotp_id
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
            console.log(form);
            verifyOtp(form,(status, payload) => {
                this.setState({loading:false});
                console.log(status, payload);
                if(status){
                    //TODO(toast success)
                    this.props.onHide(true);
                }else{

                    //TODO(toast no success)
                }
            });
        }
    };

    render() {

        return (
            <React.Fragment>
                <Form onSubmit={this.validateForm}>
                    <Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Text>An OTP has been sent to you email and phone number.</Form.Text>
                                <Form.Label>Enter OTP: </Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={value => _handleFormChange("otp",value, this)}
                                    value={this.state.form.account_number}
                                />
                                {this.validator.message("OTP",this.state.form.otp,"required")}
                            </Form.Group>
                        </Form.Row>
                    </Form.Row>

                    <Form.Row className={'d-flex justify-content-between mt-2'}>
                        <div>
                            <Button onClick={this.props.onHide}
                                    className={'mr-1 round btn-gradient-blue'}>Close</Button>
                        </div>
                        <div className={'d-flex justify-content-end'}>

                            <Button className={'round btn-gradient-blue '} type="submit">
                                {this.state.loading ? <ButtonLoader/> : "Confirm OTP"}
                            </Button>
                        </div>

                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}


const FormWithToast = withToastManager(BankOtpForm);

// export default LoginWithToast;
export default BankOtpForm;
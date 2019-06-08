import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {_getUser, _handleFormChange, _payWithPaystack} from "../../../utils/index";
import SimpleReactValidator from "simple-react-validator";
import ButtonLoader from "../../../Components/Auth/Buttonloader/ButtonLoader";
import {withToastManager} from 'react-toast-notifications';
import {resolveBankName, sendBankOTP} from "../../../actions/BankAction";
import {initTransaction, verifyTransaction} from "../../../actions/CardAction";


class BankForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            form: {
                amount:""
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
            this.forceUpdate();
        }else{
            this.setState({loading:true});
            //send api
            initTransaction({
                amount: this.state.form.amount,
                source: "quick",
            },(status, payload) => {
                console.log("status", status,payload);
                this.setState({loading:false});
                if(status){
                    const user = _getUser();
                    console.log(user);
                    _payWithPaystack(payload.reference, payload.amount,this.props.onResolve)
                }else{
                    this.props.toastManager.add(payload,{
                        appearance:"error",
                        autoDismiss:true,
                        autoDismissTimeout:3000
                    })
                }

                this.props.onHide();
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.validateForm}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Amount: </Form.Label>
                            <Form.Control
                                name="amount"
                                type="number"
                                min={100}
                                required={true}
                                onChange={this.handleChange}
                                value={this.state.form.amount}
                            />
                            <Form.Text>Minimum of ₦100 will be charge inorder to test the card you are about to add. This amount will be sent to your wallet.</Form.Text>
                            {this.validator.message("Amount",this.state.form.amount,"required|numeric")}
                        </Form.Group>


                    </Form.Row>
                    <Form.Row className={'d-flex justify-content-between mt-2'}>
                        <div>
                            <Button onClick={this.props.onHide}
                                    className={'mr-1 round btn-gradient-blue'}>Close</Button>
                        </div>
                        <div className={'d-flex justify-content-end'}>
                            <Button className={'round btn-gradient-blue '} type="submit">
                                {this.state.loading ? <ButtonLoader/> : "Continue"}
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
export default FormWithToast;
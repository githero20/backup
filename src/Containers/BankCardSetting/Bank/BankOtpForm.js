import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { _handleFormChange } from "../../../utils/index";
import SimpleReactValidator from "simple-react-validator";
import ButtonLoader from "../../../Components/Auth/Buttonloader/ButtonLoader";
import { withToastManager } from "react-toast-notifications";
import { resendBankOTP, verifyOtp } from "../../../actions/BankAction";

class BankOtpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      resendLoading: false,
      form: {
        otp: "",
        bankotp_id: this.props.bankotp_id,
      },
    };
    this.validator = new SimpleReactValidator();
    this.validateForm = this.validateForm.bind(this);
    this.resendOtp = this.resendOtp.bind(this);
  }

  resendOtp(e) {
    e.preventDefault();
    this.setState({ resendLoading: true });
    resendBankOTP(
      { bankotp_id: this.state.form.bankotp_id },
      (status, payload) => {
        this.setState({ resendLoading: false });
        if (status) {
          this.props.toastManager.add("OTP has been resent to your email", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        } else {
          this.props.toastManager.add(JSON.stringify(payload), {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        }
      }
    );
  }
  validateForm(e) {
    e.preventDefault();
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
    } else {
      this.setState({ loading: true });
      //send api
      const { form } = this.state;
      verifyOtp(form, (status, payload) => {
        this.setState({ loading: false });
        if (status) {
          this.props.toastManager.add("Bank Account Successfully Added", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setTimeout(() => this.props.onHide(true), 3000);
        } else {
          this.props.toastManager.add(JSON.stringify(payload), {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        }
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.validateForm}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Text>
                An OTP has been sent to your email and phone number.
              </Form.Text>
              <Form.Label>Enter OTP: </Form.Label>
              <Form.Control
                type="text"
                onChange={(value) => _handleFormChange("otp", value, this)}
                value={this.state.form.account_number}
              />
              {this.validator.message("OTP", this.state.form.otp, "required")}
            </Form.Group>
          </Form.Row>

          <Form.Row className={"d-flex justify-content-between mt-2"}>
            <div>
              <button
                className={"round btn-custom-blue  modal-btn"}
                onClick={this.resendOtp}
                type="button"
              >
                {this.state.resendLoading ? <ButtonLoader /> : "Resend OTP"}
              </button>
            </div>
            <div className={"d-flex justify-content-end"}>
              <button
                className={"round btn-custom-blue modal-btn "}
                type="submit"
              >
                {this.state.loading ? <ButtonLoader /> : "Confirm OTP"}
              </button>
            </div>
          </Form.Row>
        </Form>
      </React.Fragment>
    );
  }
}

const FormWithToast = withToastManager(BankOtpForm);

// export default LoginWithToast;
export default FormWithToast;

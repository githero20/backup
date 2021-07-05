import React, { Component } from "react";
import signInIcon from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import { passwordResetEndpoint } from "../../../RouteLinks/RouteLinks";
import { request } from "../../../ApiUtils/ApiUtils";
import { withToastManager } from "react-toast-notifications";
import {
  EmailPhoneValidator,
  hideLoader,
  toastMessage,
} from "../../../Helpers/Helper";

class ForgotPasswordForm extends Component {
  // validate email or password

  // get input if phone number and response is valid

  // display input email , password , new password and withdrawal pin

  constructor(props) {
    super(props);

    this.validator = EmailPhoneValidator;

    this.state = {
      email: "",
      userData: null,
      error: false,
      errorMessage: "",
      loading: false,
      message: "",
    };
  }

  //Retrieves user inputs
  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  // validate forgot password

  submitForm = (e) => {
    e.preventDefault();

    if (this.validator.allValid()) {
      //    make api call
      this.setState({
        loading: true,
      });

      request(
        passwordResetEndpoint,
        this.state,
        false,
        "POST",
        this.submitEmailResponse
      );
    } else {
      // rerender to show messages for the first time
      this.validator.showMessages();
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  //handle response

  // if response is successful render a input password form

  submitEmailResponse = (state, response) => {
    this.setState({
      loading: false,
    });
    //handle response
    if (state) {
      toastMessage(`${response.data.success}`, "success", this);
    } else {
      if (response) {
        if (response.data.error.toLowerCase() == "user not found") {
          toastMessage(`${response.data.error}`, "error", this);
        } else if (
          response.data.error.toLowerCase() == "unable to get user's email"
        ) {
          toastMessage(
            "Your phone number has been detected, kindly create your password",
            "success",
            this
          );
          this.props.setPhone(this.state.email);
          setTimeout(() => {
            this.props.showPhoneResetForm();
          }, 3000);
        } else {
          toastMessage(`${response.data.error}`, "error", this);
        }
      }
    }
  };

  //api send mail to user

  // user click link to reset password

  //user input password and confirmation password

  componentDidMount() {
    hideLoader();
  }

  render() {
    const { email } = this.state;
    return (
      <React.Fragment>
        <form className="login-form" onSubmit={this.submitForm}>
          <div className="row">
            <div className="col-12">
              {/*provide breadcrumb to go back*/}
              <h5 className="form-header-purple mb-1">{this.props.text}</h5>
              {/*<p className='mb-1'>Get a password reset</p>*/}
            </div>
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="email" className="">
                  {this.props.text == "Create Password"
                    ? "Your Phone Number"
                    : "Your Email or Phone Number"}
                </label>
                {/*<input id="email" name={'email'}  onChange={this.changeHandler} type="email" className="form-control" />*/}
                <input
                  id="email"
                  name={"email"}
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                />
                {this.validator.message(
                  "email or phone ",
                  email,
                  "required|emailPhone"
                )}
              </div>
            </div>

            <div className="col-12">
              <div className="d-flex flex-column flex-md-row justify-content-end align-items-center">
                <button
                  type={"submit"}
                  disabled={this.state.loading}
                  className="btn btn-round blue-round-btn auth-btn "
                  name="action"
                >
                  {this.state.loading ? (
                    <ButtonLoader />
                  ) : (
                    <span>
                      Submit
                      <img
                        alt="arrow right"
                        className="img-2x ml-1"
                        src={signInIcon}
                      />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default withToastManager(ForgotPasswordForm);

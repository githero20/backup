import React, { useEffect, useState } from "react";
import blueHeadArrow from "../../../admin/app-assets/images/svg/blue-head-arrow.svg";
import { Link, Redirect } from "react-router-dom";
import btnArrowRight from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {
  RegisterEndpoint,
  ResendActivationLink,
} from "../../../RouteLinks/RouteLinks";
import { api } from "../../../ApiUtils/ApiUtils";
// import { USERINFO, USERTOKEN } from "../HOC/authcontroller";
import { withToastManager } from "react-toast-notifications";
import SimpleReactValidator from "simple-react-validator";
import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

const SignUpForm = (props) => {
  const validator = new SimpleReactValidator();

  const [showReferralInput, setShowReferralInput] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [source, setSource] = useState("web");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [phone_country, setCountry] = useState("NG");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [referral_code_userid, setReferral_code_userid] = useState("");
  const [disableReferral, setDisableReferral] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ConfirmPassError, setConfirmPassError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hideMessage, setHiddenError] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleReferralInput, setToggleReferralInput] = useState(false);

  useEffect(() => {
    setReferral_code_userid(props.referralCode);
  }, [props.referralCode]);
  const { toastManager } = props;
  const getSignUpInfo = (state, response) => {
    setLoading(false);

    if (!state) {
      if (response) {
        // this.setState({
        //     error: true,
        //     errorMessage: JSON.stringify(response.data.message),
        //     loading: false
        // });
        console.log("response", response);
        if (response.data) {
          let errors = response.data.errors;
          let errorData = Object.values(errors);
          errorData.map((err, idx) => {
            return toastManager.add(`${err}`, {
              appearance: "error",
              index: idx,
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          });
        }
      }
    } else {
      if (response) {
        // const serverResponse = response.data;
        // const token = serverResponse.token;
        // const user = serverResponse.user;
        // this.saveToLocalStorage(user, token);

        setRedirect(true);
      }
    }
  };
  const signUp = (url, param, func) => {
    api(url, param, false, true, func);
    console.log(param);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const validatePassword = /^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{6,15}$/;
    if (phone.length < 9) {
      toastManager.add("Invalid Phone", {
        appearance: "error",
        index: 1,
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    } else if (!password.match(validatePassword)) {
      toastManager.add(
        "Passwords must include special characters, uppercase, lowercase and numbers and be greater than 5 in length",
        {
          appearance: "error",
          index: 1,
          autoDismiss: true,
          autoDismissTimeout: 3000,
        }
      );
    } else {
      //validate confirm password
      // perform all necessary validation
      // const ConfPassValid = this.validatePasswords(this.state.password_confirmation);
      // const PassVal = this.validatePassword();
      // if (ConfPassValid) {
      //    make api call
      setLoading(true);

      signUp(
        RegisterEndpoint,
        {
          showReferralInput,
          email,
          name,
          source,
          last_name,
          phone,
          phone_country,
          password,
          password_confirmation,
          referral_code_userid,
          disableReferral,
          submitted,
          ConfirmPassError,
          passwordError,
          loading,
          redirect,
          error,
          errorMessage,
          hideMessage,
        },
        getSignUpInfo
      );
      // }
    }
  };
  if (redirect) {
    return (
      <React.Fragment>
        {/*<Redirect to={ResendActivationLink} />*/}
        <Redirect
          push
          to={{
            pathname: `${ResendActivationLink}`,
            state: { email: email },
          }}
        />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <form className="login-form" onSubmit={(e) => submitForm(e)}>
        <div className="row">
          <div className="col-12">
            <h5 className="form-header-purple mb-3">Create Free Account</h5>
            {/*{this.state.error ?*/}
            {/*    <Alert message={this.state.errorMessage} hideError={this.hideError}/> : null}*/}
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="name">First Name</label>
              <input
                id="name"
                required
                type="text"
                name={"name"}
                value={name}
                className={"form-control  text-capitalize"}
                onChange={(e) => setName(e.target.value)}
              />
              {validator.message("name", name, "required|string")}
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="name">Last Name (Surname)</label>
              <input
                id="lastname"
                type="text"
                required
                name={"last_name"}
                value={last_name}
                className={"form-control text-capitalize"}
                onChange={(e) => setLast_name(e.target.value)}
              />
              {validator.message("last name", last_name, "required|string")}
            </div>
          </div>

          <div className="col-12  ">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                required
                name={"email"}
                type="email"
                value={email}
                className="form-control "
                onChange={(e) => setEmail(e.target.value)}
              />
              {validator.message("email", email, "required|email")}
            </div>
          </div>

          {/* <div className="col-12 col-lg-6 ">
            <div className="form-group">
              <label htmlFor="phoneNumber">Mobile Phone</label>
              <input
                id="phone"
                name={"phone"}
                type="tel"
                value={phone}
                className={"form-control"}
                onChange={(e) => setPhone(e.target.value)}
              />
              {validator.message(
                "phone",
                phone,
                "required|phone|regex:^[0]\\d{10}$"
              )}
            </div>
          </div> */}
          <div className="col-12 col-lg-6 ">
            <div className="form-group">
              <label htmlFor="phoneNumber">Mobile Phone</label>
              <PhoneInput
                international
                required
                defaultCountry="NG"
                value={phone}
                onChange={setPhone}
                onCountryChange={setCountry}
              />
              {validator.message(
                "phone",
                phone,
                "required|phone|regex:^[0]\\d{10}$"
              )}
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="form-group position-relative">
              <label htmlFor="password">Password</label>

              <div className="input-group">
                <input
                  id="password"
                  required
                  type={!togglePassword ? "password" : "text"}
                  name={"password"}
                  value={password}
                  className={"form-control pl-0 position-relative"}
                  onChange={(e) => setPassword(e.target.value)}
                  // onBlur={this.validatePassword}
                />
                <div className="input-group-append">
                  <i
                    id="pass-toggle"
                    name="pass-toggle"
                    onClick={() => setTogglePassword(!togglePassword)}
                    className={`fa fa-fw ${
                      togglePassword ? " fa-eye-slash" : " fa-eye"
                    }  field-icon  toggle-password `}
                  ></i>
                </div>
              </div>

              {validator.message("password", password, `required|string|min:8`)}
            </div>
          </div>

          <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
            <div className="referal-code-section">
              <p
                className="blue-link"
                id="referral-btn"
                onClick={() => setToggleReferralInput(!toggleReferralInput)}
              >
                Got a referral code ?
                <img className="img-2x ml-1" src={blueHeadArrow} />
              </p>
              {toggleReferralInput ? (
                <div
                  className="form-group fade-in"
                  id="referal-input-container"
                >
                  <input
                    id="referral_code_userid"
                    name={"referral_code_userid"}
                    required
                    disabled={disableReferral}
                    value={referral_code_userid}
                    onChange={(e) => setReferral_code_userid(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                  {validator.message(
                    "referral Code",
                    referral_code_userid,
                    "string"
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-6 text-center text-md-right mb-md-0">
            <div className="text-md-right mb-md-2 pr-md-2">
              <label className="font-size-1-1 mb-3 mb-md-1 dark-link">
                Returning User ?
                <Link to={"/login"} className="blue-link ">
                  {" "}
                  &nbsp; Sign In
                </Link>
              </label>
            </div>
          </div>

          <div className="col-12 text-center text-md-right ">
            <div>
              <button
                type={"submit"}
                disabled={loading}
                className=" btn btn-round blue-round-btn auth-btn"
              >
                {loading ? (
                  <ButtonLoader />
                ) : (
                  <span>
                    Sign Up
                    <img alt="" className="img-2x ml-1" src={btnArrowRight} />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

const SignUpWithToaster = withToastManager(SignUpForm);

export default SignUpWithToaster;

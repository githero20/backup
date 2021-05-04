import React, { Component } from "react";
import secureIcon from "../../admin/app-assets/images/svg/secure-sign-icon.svg";
import backUpCashLogo from "../../admin/app-assets/images/Logo@2x.png";
import SignUpForm from "../../Components/Auth/SignUpForm/SignUpForm2";
import { ToastProvider } from "react-toast-notifications";
import { Link } from "react-router-dom";
import { HomeLink } from "../../RouteLinks/RouteLinks";

class SignUp extends Component {
  state = {
    referral_code: "",
  };

  // handle the referral case

  // check if there is a referral

  getReferral = (props) => {
    if (props) {
      this.setState({ referral_code: props.match.params.ref });
    }
  };

  componentDidMount() {
    this.getReferral(this.props);
  }

  render() {
    return (
      <React.Fragment>
        <section className="sign-up-background login-section">
          <h3 className="welcome-text d-none d-md-block">
            Welcome, <br />
            Start Saving Now!
          </h3>
          <div id="timeline-wrap">
            <div id="timeline" />

            {/*This is the individual marker*/}
            <div className="marker mfirst timeline-icon  text-center">
              <div className="circular-icon active">1</div>
              <label>
                Create <br /> Account
              </label>
            </div>
            {/*/ marker*/}
            {/*This is the individual marker*/}
            <div className="marker mlast timeline-icon  text-center">
              <div className="circular-icon">2</div>
              <label>Activate Account</label>
            </div>
          </div>

          <div className="secure-section">
            <img src={secureIcon} alt="img" /> &nbsp;
            <span>Your Sign Up is Secure</span>
          </div>

          <div className="container px-2 px-md-0">
            <div className="row pt-1">
              <div className="col-md-6 offset-md-6">
                {/*header component */}
                <div className="px-md-2 py-md-2 header-shadow mb-md-5 bg-white">
                  <Link to={HomeLink}>
                    <img alt="" src={backUpCashLogo} width="150px" />
                  </Link>
                </div>
                <h3 className="mobile-welcome-text d-block d-md-none">
                  Welcome <br />
                  Back
                </h3>
                <ToastProvider>
                  <SignUpForm referralCode={this.state.referral_code} />
                </ToastProvider>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default SignUp;

import React, { Component } from "react";
import { withToastManager } from "react-toast-notifications";
import ReactTextTransition from "react-text-transition";
import {
  capitalize,
  formatNumber,
  toastMessage,
} from "../../../../Helpers/Helper";
import { getLocalStorage } from "../../../../ApiUtils/ApiUtils";
import { USERINFO } from "../../../Auth/HOC/authcontroller";
import {
  KycSettingLink,
  ReferralsLink,
} from "../../../../RouteLinks/RouteLinks";
import { Link } from "react-router-dom";
import { getUserPoints } from "../../../../actions/UserAction";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import arrow1Img from "../../../../admin/app-assets/images/dashboard/Group 2.png";
import arrow2Img from "../../../../admin/app-assets/images/dashboard/Group 3.png";
import _3dImage from "../../../../admin/app-assets/images/dashboard/3D_Illustration_15 2.png";
import cassandra from "../../../../admin/app-assets/images/dashboard/image 1.svg";
import whatsapp from "../../../../admin/app-assets/images/dashboard/Group 6.svg";

class MessageBox extends Component {
  state = {
    userName: "",
    userReferralLink: "",
    userCode: "",
    userPoint: "",
    amount: 0,
    numOfUser: "",
    initalReferred: "",
    updateKyc: false,
    balance: "0.00",
    show: false,
    paragraphIndex: 0,
  };

  componentWillMount() {
    const data = getLocalStorage(USERINFO);
    let name = `${data.name} ${data.last_name != null ? data.last_name : ""}`;
    this.setState({
      userName: name,
      userReferralLink:
        window.location.origin + "/invite/" + data.referral_code,
      userCode: data.referral_code,
    });
  }

  copyToClipboard = (e) => {
    let textField = document.createElement("textarea");
    const referralText = this.state.userName
      ? capitalize(this.state.userName)
      : null;
    const otherText =
      "invites you to save for the rainy day on BackUpCash." +
      "\n It is a financial planning tool designed to help you automate " +
      "savings towards a financial goal. Sign-up and get started using the link below: \n";
    textField.innerText =
      referralText + " " + otherText + this.state.userReferralLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toastMessage("Copied!", "success", this);
  };

  copyLink = (e) => {
    let textField = document.createElement("textarea");
    textField.innerText =
      "I save and earn with Backup Cash. Sign up with my code," +
      " get ₦500.00 instantly and earn great interests when you save more. " +
      this.state.userReferralLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toastMessage("Copied!", "success", this);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.reload) {
      getUserPoints(this.handlePoints);
    }
  }

  componentDidMount() {
    getUserPoints(this.handlePoints);
    setInterval(() => {
      this.setState({
        paragraphIndex: this.state.paragraphIndex + 1,
      });
    }, 3000);
  }

  handlePoints = (status, res) => {
    if (status) {
      this.setState({
        userPoint: res.data.point,
        amount: res.data.amount,
        initalReferred: res.data.referredUserReward,
        numOfUser: res.user,
      });
    }
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  showModal = () => {
    this.setState({ show: true });
  };
  paragraph1 = ["Earn N500 for every", "Enjoy the best interest "];
  paragraph2 = ["person you refer", "rates on your savings"];

  render() {
    const { show, numOfUser } = this.state;
    const { challenge, vaultAmount } = this.props;

    const referralText = this.state.userName
      ? capitalize(this.state.userName)
      : null;
    const otherText =
      "invites you to save for the rainy day on BackUpCash." +
      "\n It is a financial planning tool designed to help you automate " +
      "savings towards a financial goal. Sign-up and get started using the link below: \n";
    let fullRefText =
      referralText + " " + otherText + this.state.userReferralLink;

    const kycInfo = (
      <React.Fragment>
        <span className="mb-1 mb-md-0">
          <strong>Hello {this.state.userName}! </strong>
          Your have currently saved up to ₦
          {formatNumber(Number(this.props.balance).toFixed(2))}
        </span>
        <span className="admin-purple">
          <strong>
            <Link to={KycSettingLink} className="purple-link text-uppercase">
              Kindly click this link to update your kyc
            </Link>
          </strong>
          .
        </span>
      </React.Fragment>
    );

    const referralInfo = (
      <React.Fragment>
        <div
          className="admin-purple d-flex flex-column flex-grow-1
                    justify-content-lg-between flex-lg-row cursor-pointer py-1 br-1"
        >
          <div className="mb-1 mb-lg-0">
            <h4 className="bc-deep-purple">
              You have referred &nbsp;
              <strong className="font-weight-bold ">
                {numOfUser ? numOfUser : 0}
              </strong>
              &nbsp; {numOfUser <= 1 ? "user" : "users"}
            </h4>
          </div>

          <div className="mb-1 mb-lg-0">
            <h4 className="bc-deep-purple">
              Loyalty Points
              <Link
                to={ReferralsLink}
                className="d-block mt-1 mt-md-0 d-md-inline"
              >
                <strong
                  className="d-md-inline  ml-md-1 font-weight-bold
                            br-1 bc-yellow-db py-0-2 px-2 "
                >
                  {this.state.userPoint ? this.state.userPoint : 0}
                </strong>
                <OverlayTrigger
                  placement={"right"}
                  overlay={
                    <Tooltip id={`tooltip-${"right"}`}>
                      You'll get a loyalty point for each savings you make.
                    </Tooltip>
                  }
                >
                  <strong className="bc-deep-purple ml-1">&nbsp;</strong>
                </OverlayTrigger>
              </Link>
            </h4>
          </div>

          {/* {this.state.initalReferred !== null && ( */}
          <div>
            <h4 className="bc-deep-purple">
              Referred Bonus
              <Link
                to={ReferralsLink}
                className="d-block mt-1 mt-md-0 d-md-inline"
              >
                <strong
                  className="d-md-inline  ml-md-1 font-weight-bold
                            br-2 bc-yellow-db py-0-2 px-2"
                >
                  {this.state.initalReferred === null
                    ? 0
                    : formatNumber(this.state.initalReferred)}
                </strong>
                <OverlayTrigger
                  placement={"left"}
                  overlay={
                    <Tooltip id={`tooltip-${"left"}`}>
                      You will get N500 if you registered with a referral code
                    </Tooltip>
                  }
                >
                  <strong className="bc-deep-purple ml-1">&nbsp;</strong>
                </OverlayTrigger>
              </Link>{" "}
              &nbsp;
            </h4>
          </div>
          {/* )} */}
          <div>
            <h4 className="bc-deep-purple">
              Referral Bonus
              <Link
                to={ReferralsLink}
                className="d-block mt-1 mt-md-0 d-md-inline"
              >
                <strong
                  className="d-md-inline  ml-md-1 font-weight-bold
                            br-2 bc-yellow-db py-0-2 px-2"
                >
                  {this.state.amount ? formatNumber(this.state.amount) : 0}
                </strong>
                <OverlayTrigger
                  placement={"left"}
                  overlay={
                    <Tooltip id={`tooltip-${"left"}`}>
                      You will get N500 for every of your referred user that
                      saves atleast N5000
                    </Tooltip>
                  }
                >
                  <strong className="bc-deep-purple ml-1">&nbsp;</strong>
                </OverlayTrigger>
              </Link>{" "}
              &nbsp;
            </h4>
          </div>
        </div>
      </React.Fragment>
    );

    if (challenge) {
      return (
        <div className="d-flex my2">
          <div className="dash-card-body py-2 mb-2">
            <h4 className="text-center">Central Vault</h4>
            <h1 className="text-center font-weight-bold">
              <strong>&#8358;</strong>&nbsp;
              {formatNumber(Number(vaultAmount).toFixed(2)) || "0.00"}
            </h1>
            <h6 className="text-center font-weight-bold">Save More</h6>
            <div className="btn-div">
              <a class="link-a mr-3" href="/dashboard/instant-save">
                Instant Save
                <i class="">
                  {" "}
                  <img src={arrow1Img} alt="arrow1" />
                </i>
              </a>
              <a class="link-a ml-auto" href="/dashboard/instant-save">
                Steady Save
                <i class="">
                  {" "}
                  <img src={arrow2Img} alt="arrow2" />
                </i>
              </a>
            </div>
          </div>
          <div className="dash-card-body-3 px-2 bc-cassandra  mb-2">
            <h3 className="mt-2 font-weight-bold">
              Chat With <br />
              Cassandra
              {/* Earn N500 for every <br /> person you refer */}
            </h3>{" "}
            <br />
            <a
              href="https://api.whatsapp.com/send?phone=18883699915"
              target="_blank"
              rel="noopener"
              className="whatsapp-link"
            >
              <img src={whatsapp} alt="3D image" />
            </a>
            <img className="float-img" src={cassandra} alt="3D image" />
          </div>
          <div className="dash-card-body-2  px-2 mb-2">
            <h3 className="text-center font-weight-bold">
              <ReactTextTransition
                text={this.paragraph1[this.state.paragraphIndex % 2]}
                overflow
              />
              <ReactTextTransition
                text={this.paragraph2[this.state.paragraphIndex % 2]}
                overflow
              />
              {/* Earn N500 for every <br /> person you refer */}
            </h3>
            <img className="float-img" src={_3dImage} alt="3D image" />
          </div>

          {/* <div className="col-12">
            <div
              className="bg-blue-1 shadow-sm dashboard-callout
                        callout-border-right d-flex flex-column
                         flex-md-row flex-wrap justify-content-md-between
                          align-items-md-center callout-round
                          callout-transparent py-1 py-md-1 px-2"
            >
              <label
                className="d-flex flex-column align-items-center
                                 text-white flex-md-row justify-content-md-center h2"
              >
                <span>
                  Have you referred someone today? The more people you refer,
                  the more bonus you earn
                </span>
              </label>
              <label
                className="d-flex mt-1 mt-lg-0 mb-lg-0 flex-md-row flex-wrap
                                flex-column align-items-md-center"
              >
                <span className="mr-md-2 mb-1 text-center text-md-left mb-md-0 flex-grow-1" />
                <div
                  className="d-flex justify-content-lg-between
                                     justify-content-center d-md-inline-block flex-grow-1"
                >
                  <a
                    onClick={this.copyLink}
                    className="btn-white-bordered round px-2 mr-md-2 mb-md-0"
                  >
                    Share Referral Link
                  </a>
                </div>
              </label>
            </div>
          </div> */}
        </div>
      );
    }

    return (
      <React.Fragment>
        {this.props.updateKyc ? (
          <div className="row mb-1">
            <div className="col-12">
              <div
                className={
                  "bg-white shadow-sm " +
                  "text-center text-md-left callout-border-right" +
                  " d-flex flex-column flex-md-row justify-content-between" +
                  " align-items-center callout-round callout-transparent " +
                  "mt-1 px-2 py-2 py-1"
                }
              >
                {kycInfo}
              </div>
            </div>
          </div>
        ) : null}

        <div className="row mb-2">
          <div className="col-12">
            <div
              className="bg-white shadow-sm callout-border-right d-flex flex-column
                        flex-md-row flex-wrap justify-content-md-between align-items-md-center
                        callout-round callout-transparent px-2 mb-2 br-1"
            >
              <label className="d-flex flex-column flex-md-row flex-grow-1">
                {referralInfo}
              </label>
            </div>

            <div
              className="bg-white shadow-sm callout-border-right d-flex flex-column
                        flex-md-row flex-wrap justify-content-md-between justify-content-lg-end align-items-md-center
                        callout-round callout-transparent px-2 br-1 py-2"
            >
              <label className="d-flex flex-md-row flex-wrap flex-column align-items-md-center">
                <span className="mr-md-2 mb-1 text-md-left mb-md-0 flex-grow-1">
                  {" "}
                  Copy Referral Code
                </span>
                <div className="d-flex justify-content-between  d-md-inline-block flex-grow-1">
                  <span
                    className="code-btn mr-2 mb-md-0 "
                    onClick={this.copyLink}
                  >
                    {this.state.userCode}
                  </span>
                  {/* <span className="code-btn" onClick={this.showModal}>
                    Share Code
                  </span> */}
                </div>
              </label>
            </div>
          </div>
        </div>

        <Modal
          className={"steady-save-modal mt-5 pt-5"}
          show={show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Share Referral Code </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center px-5 pb-3">
              <a
                className="a-twitter mr-2"
                href={`https://twitter.com/intent/tweet?text=${fullRefText}`}
                target="_blank"
                rel="noopener"
              >
                <i className="fa fa-4x fa-twitter" />
              </a>
              <a
                className="a-whatsapp"
                href={`https://api.whatsapp.com/send?phone=18883699915&text=Send ${this.state.userCode} to signup`}
                target="_blank"
                rel="noopener"
              >
                <i className="fa fa-4x fa-whatsapp" />
              </a>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withToastManager(MessageBox);

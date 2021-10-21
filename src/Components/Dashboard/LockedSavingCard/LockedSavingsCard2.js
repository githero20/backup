import React, { Component } from "react";
import { LockedSavingsLink } from "../../../RouteLinks/RouteLinks";
import { Link } from "react-router-dom";
// import purpleIcon from "../../../admin/app-assets/images/icons/purple-icon@2x.png";
import lockedSavingsIcon from "../../../admin/app-assets/images/icons/locked-savings-icon@2x.png";
import { formatNumber } from "../../../Helpers/Helper";
import styled from "styled-components";

class LockedSavingsCard extends Component {
  render() {
    const { lockedSavingsAmount, lockedSavingsInterest } = this.props;

    return (
      <LockedSavingsCard.Wrapper className="col-12 col-lg-6 mb-4">
        <div className="d-flex align-items-center mb-2">
          <h2 className={"dash-header mb-0"}>Locked Savings</h2>
          {/* <small className="text-muted">
            Lock your money for a longer time and get an upfront interest
          </small> */}
        </div>

        <div className="d-flex flex-row align-items-lg-center dash-card orange-border-left pull-up">
          <div className="col-2 card-item dash-card-img-cover">
            <img
              src={lockedSavingsIcon}
              alt="locked savings icon"
              className={"dash-card-img"}
            />
          </div>
          <div className="col-5">
            <div>
              <h4> Locked Savings</h4>
            </div>
            <div>
              <h2 className="flex-grow-1 font-weight-bold">
                {lockedSavingsAmount != undefined && lockedSavingsAmount != 0
                  ? formatNumber(lockedSavingsAmount)
                  : 0}
              </h2>
            </div>
            <div>
              <a onClick={this.props.showModal} className={"link-a"}>
                New Locked &nbsp;<i className="fa fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-5">
            <div>
              <h4>Locked Interest</h4>
            </div>
            <div>
              <h2 className="flex-grow-1 font-weight-bold">
                {lockedSavingsInterest != 0 &&
                lockedSavingsInterest != undefined
                  ? formatNumber(lockedSavingsInterest)
                  : 0}
              </h2>
            </div>
            <div>
              <Link to={LockedSavingsLink} className={"link-b"}>
                View All
              </Link>
            </div>
          </div>
        </div>
      </LockedSavingsCard.Wrapper>
    );
  }
}

LockedSavingsCard.Wrapper = styled.div`
  button {
    box-shadow: 0;
    border: 0;
  }
  .dash-card {
    height: 150px;
    border-radius: 8.66216px;
    color: #5d6c90;
  }
  .dash-card-img-cover {
    img {
      width: 50px;
    }
  }
  .col-2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
  }
  .col-5 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: -webkit-fill-available;
    h2 {
      color: #1b315b;
    }
  }
  .link-a {
    background-color: #FF9078;
    border-radius: 8.66216px;
    :hover {
    background-color: #FF9078a3
      color: white;

    }
  }
  .link-b {
      color: #FF9078;
    :hover {
      color: #FF9078a3;
    }
  }
  
`;

export default LockedSavingsCard;

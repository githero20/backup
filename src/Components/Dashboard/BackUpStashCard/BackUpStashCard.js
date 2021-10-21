import React, { Component } from "react";
import RightArrow from "../../../admin/app-assets/images/svg/arrow-right.svg";
import BlueRightArrow from "../../../admin/app-assets/images/svg/blue-arrow-right.svg";
import {
  BackupStashLink,
  SteadySaveLink,
  WithdrawalLink,
} from "../../../RouteLinks/RouteLinks";
import { Link } from "react-router-dom";
// import yellowIcon from "../../../admin/app-assets/images/icons/yellow-icon@2x.png";
import backupStashIcon from "../../../admin/app-assets/images/icons/backup-stash-icon@2x.png";
import { formatNumber } from "../../../Helpers/Helper";
import styled from "styled-components";

class BackUpStashCard extends Component {
  render() {
    const { stashAmount } = this.props;

    return (
      <BackUpStashCard.Wrapper className="col-12 col-lg-6 mb-2">
        <div className="d-flex align-items-center mb-2">
          <h2 className={"dash-header mb-0"}>Backup Stash</h2>
          {/* <small className="text-muted">
              Here's an over look of all the interests that you have gained
            </small> */}
        </div>
        <div
          className="d-flex flex-row align-items-lg-center
            dash-card purple-border-left pull-up"
        >
          {/* <div className="d-flex stash-card flex-column flex-md-row align-items-lg-center
                    dash-card orange-border-right pull-up" > */}
          <div className="col-2 card-item dash-card-img-cover">
            <img
              src={backupStashIcon}
              alt="backup stash Icon"
              className={"dash-card-img"}
            />
          </div>
          <div className="col-10">
            <div>
              <h4>Balance</h4>
            </div>
            <div>
              <h2 className="flex-grow-1 font-weight-bold">
                {stashAmount !== undefined
                  ? formatNumber(parseFloat(stashAmount).toFixed(2))
                  : 0}
              </h2>
            </div>

            <div>
              <Link to={BackupStashLink} className={"link-a"}>
                See All
              </Link>
            </div>
          </div>
        </div>
      </BackUpStashCard.Wrapper>
    );
  }
}

BackUpStashCard.Wrapper = styled.div`
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
  .col-10 {
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
    background-color: #dc62e1;
    border-radius: 8.66216px;
    :hover {
      background-color: #dc62e1a3;
      color: white;
    }
  }
  .link-b {
    color: #dc62e1;
    :hover {
      color: #dc62e1a3;
    }
  }
  @media screen and (max-width: 500px) {
    .dash-card-img-cover {
      img {
        width: 30px;
      }
    }
    .link-a {
      font-size: 11px;
      padding: 5px;
    }
  }
`;

export default BackUpStashCard;

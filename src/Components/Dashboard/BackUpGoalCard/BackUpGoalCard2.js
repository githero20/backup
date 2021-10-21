import React from "react";
import { Link } from "react-router-dom";
import { BackupGoalsLink } from "../../../RouteLinks/RouteLinks";
// import orangeIcon from "../../../admin/app-assets/images/icons/orange-icon@2x.png";
import backupGoalsIcon from "../../../admin/app-assets/images/icons/backup-goals-icon@2x.png";
import { formatNumber } from "../../../Helpers/Helper";
import styled from "styled-components";

const BackUpGoalCard = (props) => {
  const { backupAmount, backupInterest, ActiveGoals } = props;
  return (
    <BackUpGoalCard.Wrapper className="col-12 col-lg-6 mb-4">
      <div className="d-flex align-items-center mb-2">
        <h1 className={"dash-header mb-0"}>Backup Goals</h1>
        {/* <small className="text-muted">
          Increase this by staying committed to your financial goals or start
          now{" "}
        </small> */}
      </div>

      <div
        className="d-flex flex-row align-items-lg-center
                        dash-card blue-border-left pull-up"
      >
        <div className="col-2 card-item dash-card-img-cover">
          <img
            src={backupGoalsIcon}
            alt="backup goals icon"
            className={"dash-card-img"}
          />
        </div>
        <div className="col-5">
          <div>
            <h4>Active Goals</h4>
          </div>
          <div>
            <h2 className="flex-grow-1 font-weight-bold">
              {ActiveGoals ? ActiveGoals : 0}
            </h2>
          </div>
          <div>
            <button onClick={props.showModal} className={"link-a"}>
              New Goals &nbsp;
              <i className="fa fa-arrow-right" />
            </button>
          </div>
        </div>
        <div className="col-5">
          <div>
            <h4>Goals Interest</h4>
          </div>
          <div>
            <h2 className="flex-grow-1 font-weight-bold">
              {backupInterest ? formatNumber(backupInterest) : 0}
            </h2>
          </div>
          <div>
            <Link to={BackupGoalsLink} className="link-b">
              View Goals
            </Link>
          </div>
        </div>
      </div>
    </BackUpGoalCard.Wrapper>
  );
};

BackUpGoalCard.Wrapper = styled.div`
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
    background-color: #4079ff;
    border-radius: 8.66216px;
    :hover {
      background-color: #4079ffa3;
      color: white;
    }
  }
  .link-b {
    :hover {
      color: #4079ffa3;
    }
  }
`;

export default BackUpGoalCard;

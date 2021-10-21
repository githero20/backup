import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import snapSavingsIcon from "../../../admin/app-assets/images/icons/snap-savings-icon@2x.png";
// import snapSavingsIcon from "../../../admin/app-assets/images/icons/snap-savings-icon-1.png";
import CustomModal from "./CustomModal";
import SnapForm from "./SnapForm";
import { getUserRequest } from "../../../redux/auth/action";
import { resetState, snapSettingsRequest } from "../../../redux/snap/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { formatNumber } from "../../../Helpers/Helper";
import { getUserCards } from "../../../actions/CardAction";
import { toast } from "react-toastify";

const SnapCard = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => {
    setShowModal(false);
  };
  const { data } = useSelector((state) => state.auth);
  const snapSettings = useSelector((state) => state.snap.settings);
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);
  const [interest, setinterest] = useState(0);
  const [total, settotal] = useState(0);
  const [userCards, setUserCards] = useState([]);
  const [minSaving, setMinSaving] = useState(1000);

  useEffect(() => {
    if (snapSettings.data && snapSettings.data.min_save) {
      setMinSaving(snapSettings.data.min_save);
    }
  }, [snapSettings.data]);

  useEffect(() => {
    dispatch(getUserRequest());
    dispatch(snapSettingsRequest());
  }, []);
  // fetches users cards on component mount
  useEffect(
    () => {
      getUserCards((status, data) => {
        if (status) {
          setUserCards(data);
        } else {
          toast.error("Unable to fetch Cards", { autoClose: 3000 });
        }
      });
    }, //eslint-disable-next-line
    []
  );
  useEffect(() => {
    if (data.accounts) {
      data.accounts.data.forEach((acct) => {
        if (Number(acct.account_type_id) === 7) {
          setBalance(acct.balance);
        }
        if (Number(acct.account_type_id) === 8) {
          setinterest(acct.balance);
        }
      });
    }
  }, [data]);

  return (
    <SnapCard.Wrapper className="col-12 col-lg-6 mb-2">
      <div className="d-flex align-items-center mb-2">
        <h2 className={"dash-header mb-0"}>Snap Savings</h2>
        {/* <small className="text-muted">
            Get returns weekly when you save. The more you save the more you
            earn
          </small> */}
      </div>

      <div className="d-flex flex-row align-items-lg-center dash-card green-border-left pull-up">
        <div className="col-2 card-item dash-card-img-cover">
          <div>
            <img
              src={snapSavingsIcon}
              alt="snap savings icon"
              className={"dash-card-img"}
            />
          </div>
        </div>
        <div className="col-5">
          <div>
            <h4>Snap Balance</h4>
          </div>
          <div>
            <h2 className="flex-grow-1 font-weight-bold">
              {balance === 0 ? "0" : formatNumber(balance)}
            </h2>
          </div>
          <div>
            <a
              onClick={() => {
                dispatch(resetState());
                setShowModal(true);
              }}
              className="link-a"
            >
              Add Snap
            </a>
          </div>
        </div>

        <div className="col-5">
          <div>
            <h4>Total Interest</h4>
          </div>
          <div>
            <h2 className="flex-grow-1 font-weight-bold">
              {interest === 0 ? "0" : formatNumber(interest)}
            </h2>
          </div>
          <div>
            <a
              onClick={() => history.push("/dashboard/snap")}
              className="link-b"
            >
              View all
            </a>
          </div>
        </div>
      </div>
      {/* <CustomModal title={"Snap Saving"} show={showModal} onHide={hideModal}>
        <SnapForm
          userCards={userCards}
          minSaving={minSaving}
          hideModal={hideModal}
        />
      </CustomModal> */}
      {/* </div> */}
    </SnapCard.Wrapper>
  );
};

SnapCard.Wrapper = styled.div`
  .green-border-left {
    border-left: 10px solid #52e260a3;
  }
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
    background-color: #52e260;
    border-radius: 8.66216px;
    :hover {
      background-color: #52e260a3;
      color: white;
    }
  }
  .link-b {
    color: #52e260;
    :hover {
      color: #52e260a3;
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

// SnapCard.Wrapper = styled.div`
//   span {
//     display: inline-block;
//     font-weight: bold;
//     margin-bottom: 1rem;
//     margin-right: 0.5rem;

//     p {
//       display: inline;
//       background-color: #1f75ff;
//       color: #fff;
//       padding: 0.5rem;
//       border-radius: 0.5rem;
//     }
//   }
//   .custom-card {
//     display: flex;
//     flex-direction: row;
//     width: 100%;
//     box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
//     border-radius: 1rem;
//     margin-bottom: 2rem;
//     border-bottom-right-radius: 1rem;
//     border-top-right-radius: 1rem;
//     // border-right: 10px solid #decaff;
//     border-right: 10px solid #fff;
//     border-left: 10px solid #52e260a3;
//     .left-side {
//       background-color: #fbfbff;
//       // background-color: #90ec9947;
//       flex: 1;
//       border-bottom-left-radius: 1rem;
//       border-top-left-radius: 1rem;

//       display: flex;
//       align-items: center;
//       justify-content: center;
//       div {
//         // background-color: #482d99;
//         background-color: #90ec9947;
//         // border: 5px solid #bcb3db;
//         // border: 5px solid #90ec9947;
//         border-radius: 50%;
//         padding: 0.5rem;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         width: 50px;
//         height: 50px;
//       }
//       img {
//         width: 80%;
//         // width: 100%;
//       }
//     }
//     .right-side {
//       background-color: blue;
//       flex: 5;
//       display: grid;
//       padding: 2rem 1rem;

//       grid-template-columns: repeat(4, 1fr);
//       background-color: white;
//       font-family: "Circular Std Black", "Circular Std", "Open Sans",
//         "Helvetica Neue", Helvetica, Arial, sans-serif;
//     }
//     .content-card {
//       grid-column: 1 / span 3;
//       display: flex;
//       flex-direction: column;
//       align-items: left;
//       justify-content: center;
//       h3 {
//         font-family: "Circular Std Black", " Circular Std";
//         font-weight: bold;
//       }
//       p {
//         font-weight: 12px;
//         font-family: "Product Sans", "Open Sans", -apple-system,
//           BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
//           sans-serif;
//       }
//       i {
//         color: #bdd2eb;
//       }
//       .value-text {
//         font-family: "Poppins Regular", "Product Sans";
//         font-size: 12px;
//       }
//       .sub-item {
//         display: flex;
//         align-items: left;
//         justify-content: space-around;
//       }
//     }
//     .btn-holders {
//       button {
//         border: none;
//         color: white;
//         padding: 7px 20px;
//         font-size: 0.8rem;
//         border-radius: 2rem;
//         margin: 10px 0px;
//         min-width: 100px;
//         height: 30px;
//         font-weight: bold;
//         cursor: pointer;
//       }
//     }
//   }
//   .dark-gray {
//     // background-color: #decaff !important;
//     background-color: #52e260 !important;
//   }

//   @media screen and (max-width: 768px) {
//     padding-left: 1rem;
//     .custom-card {
//       flex-direction: column;
//       width: 100%;
//       .right-side {
//         display: initial !important;
//       }
//       .left-side {
//         display: initial !important;
//         padding-left: 1rem;
//         padding-top: 1rem;
//       }
//     }
//   }
// `;
export default SnapCard;

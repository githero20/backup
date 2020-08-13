import React, { useEffect, Fragment, useState } from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import styled from '@emotion/styled';
import PlusIcon from '../../admin/app-assets/images/plusIcon.svg';
import amountWithDraw from '../../admin/app-assets/images/amountwithdraw.svg';
import Interesticon from '../../admin/app-assets/images/Interesticon.svg';
import BalanceIcon from '../../admin/app-assets/images/balanceicon.svg';
import { useDispatch, useSelector } from 'react-redux'
import { getSnapRequest, getHistoryRequest } from '../../redux/snap/action';
import TableDisplay from '../../Components/Reuseable/TableDisplay'
import CustomModal from '../../Components/Dashboard/Snap/CustomModal';
import SnapForm from '../../Components/Dashboard/Snap/SnapForm';
import amountSaved from '../../admin/app-assets/images/amoutsaved.svg';
import NotificationIcon from '../../admin/app-assets/images/NotificationIcon.svg';
import { getUserRequest } from '../../redux/auth/action';
import { interestTransferRequest } from '../../redux/snap/action';
import { formatNumber } from "../../Helpers/Helper"
import { getUserCards } from '../../actions/CardAction';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

const Snap = () => {
  const dispatch = useDispatch();
  const [dataSource, setdataSource] = useState([])
  const { data, processing } = useSelector(state => state.snap.all);
  const snapHistory = useSelector(state => state.snap.history);
  const snapTransfer = useSelector(state => state.snap.transfer);
  const userData = useSelector(state => state.auth.data);
  const [balance, setBalance] = useState(0);
  const [interest, setinterest] = useState(0);
  const [withdrawal, setwithdrawal] = useState(0);
  const [payOut, setpayOut] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showFundModal, setshowFundModal] = useState(false);
  const [userCards, setUserCards] = useState([]);

  const hideModal = () => {
    setShowModal(false);
  }
  const hideFundModal = () => {
    setshowFundModal(false);
  };
  // fetches users cards on component mount
  useEffect(() => {
    getUserCards((status, data) => {
      if (status) {
        setUserCards(data)
      } else {
        toast.error("Unable to fetch Cards", { autoClose: 3000 });
      }
    });
  },
    //eslint-disable-next-line
    []);

  useEffect(() => {
    if (snapTransfer.success) {
      swal("Transfer Successful",
        "Your Transfer was successful",
        "success", { button: false, timer: 2000 });
    }
  }, [snapTransfer.success])
  useEffect(() => {
    dispatch(getSnapRequest());
    dispatch(getUserRequest());
    dispatch(getHistoryRequest());
  }, []);
  useEffect(() => {
    if (userData.accounts) {
      userData.accounts.data.forEach(acct => {
        if (acct.account_type_id === 7) {
          setBalance(acct.balance);
        }
        if (acct.account_type_id === 8) {
          setpayOut(acct.balance);
        }
      });
    }
  }, [userData]);
  useEffect(() => {
    if (Array.isArray(snapHistory.data)) {
      snapHistory.data.forEach(item => {
        if (item.type === "interest") {
          setinterest(item.balance)
        }
        if (item.type === "account") {
          setwithdrawal(item.balance)
        }
      })
    }
  }, [snapHistory]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setdataSource(data);
    }
  }, [data]);

  const handleTransfer = () => {
    swal("Funds will be moved to your Snap Savings where you can withdraw or allow it to keep growing", {
      buttons: {
        yes: "yes"
      },
    }).then((value) => {
      switch (value) {
        case "yes":
          swal('Transfer', 'Processing Transfer...', 'info', { button: false, timer: 3000 });
          dispatch(interestTransferRequest());
          break;
        default:
          swal("You Cancelled Your Transfer", { button: false, timer: 3000 });
          break;
      }
    });

  };


  const columns = [
    {
      title: 'start date',
      dataIndex: 'start_date',
    },
    {
      title: 'maturity date',
      dataIndex: 'end_date',
    },

    {
      title: 'amount',
      render: (value, record) => <div style={{ color: 'green' }} >{formatNumber(record.amount)}</div>
    },
    {
      title: 'balance',
      render: (value, record) => <div>{formatNumber(record.balance)}</div>
    },
    {
      title: 'status',
      render: (value, record) => <p>{record.stop ? 'running' : 'matured'}</p>
    },
  ];
  return (
    <Snap.Wrapper>
      <HorizontalNav />
      <VerticalNav />
      {
        <CustomModal title={"Snap Saving"} show={showModal} onHide={hideModal}>
          <SnapForm userCards={userCards} hideModal={hideModal} />
        </CustomModal>

      }

      <SnapContent>
        <div>
          <h3 className="gray-header-text fs-mb-1 mb-2 ">
            Snap <span className="dot">.</span> Summary</h3>
          <div className="card">
            <p>Balance</p>
            <div>
              <img src={BalanceIcon} alt="walletIcon" />
              <p>₦{formatNumber(balance)} </p>
            </div>
          </div>
        </div>
        <div className="save-now">
          <h3 className="gray-header-text fs-mb-1 mb-2 mt-7px">Quick Actions</h3>
          <span>
            <button onClick={() => setShowModal(true)}><img src={PlusIcon} alt="icon" /> Save Now</button>
          </span>
          <div className="save-text ">
            <p> <img src={Interesticon} alt="icon" />₦{formatNumber(interest)}</p>
            <p>(Intrest Earned)</p>
          </div>
        </div>
        <div className="details">
          <p><img src={NotificationIcon} alt="icon" /> Snap Savings helps you get huge returns weekly on high saving deposits</p>
          <div>
            <div className="box box-a">
              <img src={amountWithDraw} alt="icon" />
              <div className="content">
                <p>₦{`${withdrawal === 0 ? '0.00' : formatNumber(withdrawal)}`}</p>

                <p>Avaliable for withdrawal</p>
              </div>
            </div>
            <div className="box box-b">
              <img src={amountSaved} alt="icon" />
              <div className="content">
                <p>₦{`${payOut === 0 ? '0.00' : formatNumber(payOut)}`}</p>
                <p>Interest payout</p>
                <button onClick={handleTransfer}>Transfer Interest</button>
              </div>
            </div>
          </div>
        </div>
      </SnapContent>
      <TableDisplayHolder>
        <TableDisplay
          header="All Snap Savings"
          columns={columns}
          dataSource={dataSource}
          loading={processing}
          pagination
        />
      </TableDisplayHolder>
    </Snap.Wrapper>
  )
}
Snap.Wrapper = styled.div`
/* 
Default style to get basic item to show
margin-left: 17rem; 
margin-top: 5rem;
 */
background-color:#F7FBFF;
height:100vh;
`
const SnapContent = styled.div`
display:grid;
grid-template-columns:repeat(4,1fr);
margin-left: 20rem; 
padding-top: 8rem;
grid-gap:1rem;
font-family:'Circular Std', 'Open Sans';
.card{
  background-color:#482D99;
  height:10rem;
  width:250px;
  border-radius:10px;
  display:flex;
  flex-direction:column;
  color:white;
    padding:1.5rem 1rem;
  
  & > div{
    display:flex;
    align-items:center;
    /* justify-content:center; */
    margin:auto 0;
    img{
      width: 30px;
    margin-right: 1rem;
    }
  }
}

.save-now{
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  button{
  display: inline-block;
  padding: 0.8rem 1rem;
  transition: all 0.5s;
  border: none;
  cursor: pointer;
  color: #352D66;
  border-radius: 20px;
    background-color: #fff;
    img{
      width:25px;
    }
  }
  .save-text{
    margin-top:3rem;
    &>p{
      display:flex;
      align-items:center;
    img{
      width:20px;
      margin-right:1rem;
    }
    margin-bottom:1rem;
    }
  }
}
.details{
  grid-column: 3 / span 2;
  padding:1rem;
 &>p{
    background-color:#EFF3FF;
    padding:1rem;
    border-radius:10px;
    margin-bottom:1rem;
    color:#103366;
    font-size:13px;
  }
  &>div{
    display:flex;
    align-items:center;
    justify-content:space-between;
    .box{
      display:flex;
      align-items:center;
      img{
        margin-right:1rem;
      }
      p:first-of-type{
        font-family:"Circular Std Black";
        font-size:16px;
        color:#352D66;
      }
      p:last-of-type{
        color:#103366;
        opacity:0.58;
      }

    button{
      border:none;
      background-color:#482D99;
      color: white;
      padding: 5px 10px;
      font-size: .7rem;
      border-radius: 2rem;
      margin: 10px 0px;
      min-width: 100px;
      height: 30px;
      font-weight:bold;
      cursor: pointer;
      }
      &-b{
        .content{
          margin-top:3rem;
        }
        /* background-color:green; */
      }
    }
  }
}
`
const TableDisplayHolder = styled.div`
margin-left: 17rem; 
margin-top: 5rem;
`
export default Snap;

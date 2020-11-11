import React, { useEffect, useState } from 'react';
import HorizontalNav from '../../Components/Dashboard/HorizontalNav/HorizontalNav';
import VerticalNav from '../../Components/Dashboard/VerticalNav/VerticalNav';
import styled from '@emotion/styled';
import amountWithDraw from '../../admin/app-assets/images/amountwithdraw.svg';
import Interesticon from '../../admin/app-assets/images/Interesticon.svg';
import BalanceIcon from '../../admin/app-assets/images/balanceicon.svg';
import { useDispatch, useSelector } from 'react-redux';
import TableDisplay from '../../Components/Reuseable/TableDisplay';
import CustomModal from '../../Components/Dashboard/Snap/CustomModal';
import SnapForm from '../../Components/Dashboard/Snap/SnapForm';
import amountSaved from '../../admin/app-assets/images/amoutsaved.svg';
import NotificationIcon from '../../admin/app-assets/images/NotificationIcon.svg';
import { getUserRequest } from '../../redux/auth/action';
import {
  getSnapRequest,
  getHistoryRequest,
  snapSettingsRequest,
} from '../../redux/snap/action';
import { interestTransferRequest } from '../../redux/snap/action';
import { formatNumber } from '../../Helpers/Helper';
import { getUserCards } from '../../actions/CardAction';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import moment from 'moment';

const Snap = () => {
  const dispatch = useDispatch();
  const [dataSource, setdataSource] = useState([]);
  const { data, processing } = useSelector((state) => state.snap.all);
  const snapHistory = useSelector((state) => state.snap.history);
  const snapTransfer = useSelector((state) => state.snap.transfer);
  const userData = useSelector((state) => state.auth.data);
  const snapSettings = useSelector((state) => state.snap.settings);
  const [balance, setBalance] = useState(0);
  const [interest, setinterest] = useState(0);
  const [withdrawal, setwithdrawal] = useState(0);
  const [payOut, setpayOut] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showFundModal, setshowFundModal] = useState(false);
  const [userCards, setUserCards] = useState([]);
  const [minSaving, setMinSaving] = useState(1000);

  const hideModal = () => {
    setShowModal(false);
  };
  const hideFundModal = () => {
    setshowFundModal(false);
  };
  // fetches users cards on component mount
  useEffect(
    () => {
      getUserCards((status, data) => {
        if (status) {
          setUserCards(data);
        } else {
          toast.error('Unable to fetch Cards', { autoClose: 3000 });
        }
      });
    },
    //eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (snapTransfer.success) {
      swal('Transfer Successful', 'Your Transfer was successful', 'success', {
        button: false,
        timer: 2000,
      });
    }
  }, [snapTransfer.success]);
  useEffect(() => {
    dispatch(getSnapRequest());
    dispatch(getUserRequest());
    dispatch(getHistoryRequest());
    dispatch(snapSettingsRequest());
  }, []);
  useEffect(() => {
    if (userData.accounts) {
      userData.accounts.data.forEach((acct) => {
        if (Number(acct.account_type_id) === 7) {
          setBalance(acct.balance);
        }
        if (Number(acct.account_type_id) === 8) {
          setpayOut(acct.balance);
        }
      });
    }
  }, [userData]);
  useEffect(() => {
    if (Array.isArray(snapHistory.data)) {
      snapHistory.data.forEach((item) => {
        if (item.type === 'interest') {
          setinterest(item.balance);
        }
        if (item.type === 'account') {
          setwithdrawal(item.balance);
        }
      });
    }
  }, [snapHistory]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setdataSource(data);
    }
  }, [data]);

  useEffect(() => {
    if (snapSettings.data.min_save) {
      setMinSaving(snapSettings.data.min_save);
    }
  }, [snapSettings.data]);
  const handleTransfer = () => {
    swal(
      'Funds will be moved to your Snap Savings where you can withdraw or allow it to keep growing',
      {
        buttons: {
          yes: 'yes',
        },
      }
    ).then((value) => {
      switch (value) {
        case 'yes':
          swal('Transfer', 'Processing Transfer...', 'info', {
            button: false,
            timer: 3000,
          });
          dispatch(interestTransferRequest());
          break;
        default:
          swal('You Cancelled Your Transfer', { button: false, timer: 3000 });
          break;
      }
    });
  };

  const columns = [
    {
      title: 'start date',
      dataIndex: 'start_date',
      render: (value, record) => (
        <span className='d-flex flex-column'>
        <span style={{ minWidth: '90px' }}>{moment(value).format('MMM Do YYYY')}&nbsp;</span>
        <small className='text-muted'>{moment(value).format('h:mm a')}</small>
    </span>
      ),
    },
    {
      title: 'maturity date',
      dataIndex: 'end_date',
      render: (value, record) => (
        <span className='d-flex flex-column'>
        <span style={{ minWidth: '90px' }}>{moment(value).format('MMM Do YYYY')}&nbsp;</span>
        <small className='text-muted'>{moment(value).format('h:mm a')}</small>
    </span>
      ),
    },

    {
      title: 'amount',
      render: (value, record) => (
        <p style={{ minWidth: '150px' }}
            className={'text-primary'}> {record.amount != null ? `+ ₦ ${formatNumber(parseFloat(record.amount).toFixed(2))}` : "N/A"}</p>
        ),
    },
    {
      title: 'balance',
      render: (value, record) => (
        <p style={{ minWidth: '150px' }}
            className={'text-success'}> {record.balance != null ? `+ ₦ ${formatNumber(parseFloat(record.balance).toFixed(2))}` : "N/A"}</p>
  ),
    },
    {
      title: 'status',
      render: (value, record) => (
        <div>
          {record.stop === '0' ? (
            <p
              style={{
                color: 'green',
                backgroundColor: '#E8F9D7',
                textAlign: 'center',
              }}
            >
              running
            </p>
          ) : (
            <p
              style={{
                color: 'white',
                backgroundColor: 'firebrick',
                textAlign: 'center',
              }}
            >
              matured
            </p>
          )}
        </div>
      ),
    },
  ];
  return (
    <Snap.Wrapper>
      <div
        className='vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done'
        data-open='click'
        data-menu='vertical-menu-modern'
        data-col='2-columns'
      >
        <HorizontalNav />
        <VerticalNav />
        <CustomModal title={'Snap Saving'} show={showModal} onHide={hideModal}>
          <SnapForm
            userCards={userCards}
            minSaving={minSaving}
            hideModal={hideModal}
          />
        </CustomModal>
        <SnapContent>
          <div className='balance'>
            <h3>Snap Summary</h3>
            <div className='card'>
              <p>Balance</p>
              <div>
                <img src={BalanceIcon} alt='walletIcon' />
                <p>
                  <strong>&#8358;</strong>
                  {balance === 0 ? '0.00' : formatNumber(balance)}{' '}
                </p>
              </div>
            </div>
          </div>
          <div className='save-now'>
            <h3>Quick Actions</h3>
            <span>
              <button onClick={() => setShowModal(true)}>
                <i className='fas fa-plus'></i>
                {/*<img src={PlusIcon} alt='icon' /> */}
                Save Now
              </button>
            </span>
            <div className='save-text '>
              <p>
                <img src={Interesticon} alt='icon' />₦
                {interest === 0 ? '0.00' : formatNumber(interest)}
              </p>
              <p>(Interest Earned)</p>
            </div>
          </div>
          <div className='details'>
            <p>
              <img src={NotificationIcon} alt='icon' /> Snap Savings helps you
              get huge returns weekly on high saving deposits
            </p>
            <div>
              <div className='box box-a'>
                <img src={amountWithDraw} alt='icon' />
                <div className='contenta'>
                  <p>
                    ₦{`${withdrawal === 0 ? '0.00' : formatNumber(withdrawal)}`}
                  </p>

                  <p>Avaliable for withdrawal</p>
                </div>
              </div>
              <div className='box box-b'>
                <img src={amountSaved} alt='icon' />
                <div className='contenta'>
                  <p>₦{`${payOut === 0 ? '0.00' : formatNumber(payOut)}`}</p>
                  <p>Interest payout</p>
                  <button onClick={handleTransfer} disabled={payOut === 0}>
                    Transfer Interest
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SnapContent>
        <TableDisplayHolder>
          <TableDisplay
            header='All Snap Savings'
            columns={columns}
            dataSource={dataSource}
            loading={processing}
            pagination
          />
        </TableDisplayHolder>
      </div>
    </Snap.Wrapper>
  );
};
Snap.Wrapper = styled.div`
  /*
Default style to get basic item to show
margin-left: 17rem;
margin-top: 5rem;
 */
  background-color: #f7fbff;
  height: 100vh;
`;
const SnapContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-left: 20rem;
  padding-top: 3rem;
  grid-gap: 1rem;
  font-family: 'Circular Std', 'Open Sans';
  h3 {
    font-family: 'Circular Std', 'Open Sans';
    color: #352d66;
  }
  .card {
    background-color: #482d99;
    height: 10rem;
    width: 250px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    color: white;
    padding: 1.5rem 1rem;

    & > div {
      display: flex;
      align-items: center;
      /* justify-content:center; */
      margin: auto 0;
      img {
        width: 30px;
        margin-right: 1rem;
      }
    }
  }

  .save-now {
    display: flex;
    align-items: center;
    /* justify-content:center; */
    flex-direction: column;
    button {
      display: inline-block;
      padding: 0.8rem 1rem;
      transition: all 0.5s;
      border: none;
      cursor: pointer;
      color: #fff;
      border-radius: 20px;
      background-color: #482d99;
      i {
        background-color: #fff;
        padding: 0.2rem;
        border-radius: 50%;
        color: #482d99;
        font-size: 0.8rem;
        margin-right: 0.5rem;
        text-align: center;
        /* line-height:  */
        vertical-align: middle;
      }
      /* img {
        width: 19px;
        background-color: #fff;
        border-radius: 50%;
      } */
    }
    .save-text {
      margin-top: 3rem;
      p {
        font-family: 'Circular Std', 'Open Sans';
        color: #103366;
      }
      & > p {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          margin-right: 1rem;
        }
        margin-bottom: 1rem;
      }
    }
  }
  .details {
    grid-column: 3 / span 2;
    padding: 1rem;
    margin: 0;
    margin-top: 1rem;
    & > p {
      background-color: #eff3ff;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
      color: #103366;
      font-size: 13px;
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: -1.5rem;
      .box {
        display: flex;
        align-items: center;
        img {
          margin-right: 1rem;
        }
        p:first-of-type {
          font-family: 'Circular Std Black';
          font-size: 16px;
          color: #352d66;
        }
        p:last-of-type {
          color: #103366;
          opacity: 0.58;
        }

        button {
          border: none;
          background-color: #482d99;
          color: white;
          padding: 5px 10px;
          font-size: 0.7rem;
          border-radius: 2rem;
          margin: 10px 0px;
          min-width: 100px;
          height: 30px;
          font-weight: bold;
          cursor: pointer;
          &:disabled {
            background-color: gray;
          }
        }
        &-b {
          .contenta {
            margin-top: 3rem;
          }
          /* background-color:green; */
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    margin-left: 2rem;
    grid-template-columns: 1fr !important;
    .details {
      grid-column: initial;
      padding: 0;
      & > p {
        /* padding:0; */
      }
      & > div {
        display: block;
        margin-top: 2rem;
      }
    }
    .save-now {
      display: block;
      padding-left: 1rem;
    }
  }
`;
const TableDisplayHolder = styled.div`
  margin-left: 17rem;
  margin-top: 5rem;
  @media screen and (max-width: 768px) {
    margin-left: 2rem;
  }
`;
export default Snap;

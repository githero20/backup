import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import purpleIcon from "../../../admin/app-assets/images/walletside.svg";
import CustomModal from './CustomModal'
import SnapForm from './SnapForm';
import { getUserRequest } from '../../../redux/auth/action';
import { resetState } from '../../../redux/snap/action';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { formatNumber } from "../../../Helpers/Helper";

const SnapCard = (props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => {
    setShowModal(false);
  }
  const { data } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);
  const [interest, setinterest] = useState(0);
  const [total, settotal] = useState(0);
  useEffect(() => {
    dispatch(getUserRequest());
  }, []);
  useEffect(() => {
    if (data.accounts) {
      data.accounts.data.forEach(acct => {
        if (acct.account_type_id === 7) {
          setBalance(acct.balance);
        }
        if (acct.account_type_id === 8) {
          setinterest(acct.balance)
        }
      });
    }
  }, [data]);
  return (
    <SnapCard.Wrapper>
      <span><p>NEW</p> Snap Savings</span>
      <div className="custom-card pull-up">
        <div className="left-side">
          <div>
            <img src={purpleIcon} alt="Icon" />
          </div>
        </div>
        <div className="right-side">
          <div className="content-card">

            <h3><strong>&#8358;</strong>{formatNumber(balance)}</h3>
            <div className="sub-content">
              <p>Total Intrest &emsp;&nbsp;&nbsp;
              <i className='fa fa-arrow-right'></i> &ensp;
              <strong className="value-text">&#8358; {total} </strong></p>
            </div>
          </div>
          {
            <div
              className="btn-holders card-item d-flex flex-row flex-md-column justify-content-between align-content-between">
              <button onClick={() => {
                dispatch(resetState());
                setShowModal(true);
              }} className='btn dash-btn dark-gray'>Save More <i
                className='fa fa-arrow-right'></i></button>
              <button onClick={() => history.push("/dashboard/snap")} className='btn dash-btn dark-gray'>View All <i
                className='fa fa-arrow-right'></i></button>
            </div>
          }
        </div>
      </div>
      <CustomModal title={"Snap Saving"} show={showModal} onHide={hideModal}>
        <SnapForm hideModal={hideModal} />
      </CustomModal>
    </SnapCard.Wrapper>
  )
}

SnapCard.Wrapper = styled.div`
span{
  display:inline-block;
  font-weight:bold;
  margin-bottom:1rem;

  p{
    display:inline;
    background-color:#1F75FF;
    color:#fff;
    padding:0.5rem;
    border-radius:0.5rem;

  }
}
.custom-card{
display:flex;
width: 100%;
box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
border-radius: 1rem;
margin-bottom: 2rem;
.left-side{
  background-color:#FBFBFF;
  flex:1;
  border-bottom-left-radius:1rem;
  border-top-left-radius:1rem;
  display:flex;
  align-items:center;
  justify-content:center;
  div{
    background-color:#482D99;
  border:5px solid #BCB3DB;
  border-radius:50%;
  padding:0.5rem; 
  display:flex;
  align-items:center;
  justify-content:center;
  width:50px;
  height:50px;
  }
  img{
  width:80%;
  
    }
  
}
.right-side{
  background-color:blue;
  flex:5;
  display:grid;
  padding: 2rem 1rem;
  border-bottom-right-radius:1rem;
  border-top-right-radius:1rem;
  grid-template-columns:repeat(4,1fr);
  background-color: white;
border-right: 10px solid #DECAFF;
  font-family: "Circular Std Black","Circular Std", 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
  .content-card{
    grid-column: 1 / span 3;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:center;
    h3{
      font-family: 'Circular Std Black', ' Circular Std';
      font-weight:bold;
    }
    p{
      font-weight:12px;
      font-family: 'Product Sans','Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    i{
      color: #BDD2EB;
    }
    .value-text{
      font-family: 'Poppins Regular','Product Sans';
      font-size:12px;
    }
    .sub-item{
      display:flex;
      align-items:left;
      justify-content:space-around;
    }
  }
.btn-holders{
  button{
    border:none;
    color: white;
    padding: 7px 20px;
    font-size: .8rem;
    border-radius: 2rem;
    margin: 10px 0px;
    min-width: 100px;
    height: 30px;
    font-weight:bold;
    cursor: pointer;
  }
}
}
.dark-gray{
  background-color: #DECAFF !important;
}
`
export default SnapCard

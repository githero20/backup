import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import purpleIcon from "../../../admin/app-assets/images/icons/purple-icon@2x.png";
import CustomModal from './CustomModal'
import SnapForm from './SnapForm';
import { getUserRequest } from '../../../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';

const SnapCard = (props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => {
    setShowModal(false);
  }
  const { data } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequest());
  }, []);

  return (
    <SnapCard.Wrapper>
      <span><p>NEW</p> Mill ex</span>
      <div className="custom-card pull-up">
        <div className="left-side">
          <img src={purpleIcon} alt="Icon" />
        </div>
        <div className="right-side">
          <div className="content-card">
            <h3>N282,870.00</h3>
            <div className="sub-content">
              <p>Amount Saved &nbsp;<i className='fa fa-arrow-right'></i>&ensp; <strong>N200,390.00</strong></p>
              <p>Total Intrest &emsp;&nbsp;&nbsp;<i className='fa fa-arrow-right'></i> &ensp;<strong>N20,300.00</strong></p>
            </div>
          </div>
          <div className="btn-holders">
            <button onClick={() => setShowModal(true)}>Save More</button>
            <button onClick={() => history.push("/dashboard/snap")}>View All</button>
          </div>
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
  img{
  width:60%;
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
  font-family: "Circular Std Black","Circular Std", 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
  .content-card{
    grid-column: 1 / span 3;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:center;
    h3{
      font-weight:bold;
      color: #352D66;
    }
    p{
      font-weight:12px;
      font-family: 'Product Sans','Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
    background-color: #F5F2FF;
    color: #352D66;
    padding: 7px 15px;
    font-size: .8rem;
    border-radius: 2rem;
    margin: 10px 0px;
    min-width: 100px;
    height: 30px;
    font-weight:bold;
    cursor: pointer;
    /* transition: background-color .3s ease-in-out; */
  }
}
}
`
export default SnapCard

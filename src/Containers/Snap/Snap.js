import React, { useEffect, useState } from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import { withToastManager } from 'react-toast-notifications';
import styled from '@emotion/styled';
import PlusIcon from '../../admin/app-assets/images/plusIcon.svg';
import Interesticon from '../../admin/app-assets/images/Interesticon.svg';
import BalanceIcon from '../../admin/app-assets/images/balanceicon.svg';
import { useDispatch, useSelector } from 'react-redux'
import { getSnapRequest } from '../../redux/snap/action';
import CustomTable from '../../Components/Reuseable/CustomTable'
import CustomModal from '../../Components/Dashboard/Snap/CustomModal';
import SnapForm from '../../Components/Dashboard/Snap/SnapForm';
const Snap = () => {
  const dispatch = useDispatch();
  const [dataSource, setdataSource] = useState([])
  const { data, processing } = useSelector(state => state.snap);
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => {
    setShowModal(false);
  }
  useEffect(() => {
    dispatch(getSnapRequest());
  }, []);
  useEffect(() => {
    setdataSource(data);
  }, [data]);
  const columns = [
    {
      title: 'date',
      dataIndex: 'start_date',
    },
    {
      title: 'description',
      render: () => <div>credit</div>
    },
    {
      title: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'balance',
      dataIndex: 'balance',
    },

  ];
  return (
    <Snap.Wrapper>
      <HorizontalNav />
      <VerticalNav />
      <CustomModal title={"Snap Saving"} show={showModal} onHide={hideModal}>
        <SnapForm hideModal={hideModal} />
      </CustomModal>
      <SnapContent>
        <div>
          <h3 className="gray-header-text fs-mb-1 mb-2 ">
            Snap <span className="dot">.</span> Summary</h3>
          <div className="card">
            <p>Balance</p>
            <div>
              <img src={BalanceIcon} alt="walletIcon" />
              <p>N500,000.48</p>
            </div>
          </div>
        </div>
        <div className="save-now">
          <h3 className="gray-header-text fs-mb-1 mb-2 mt-7px">Quick Actions</h3>
          <span>
            <button><img src={PlusIcon} alt="icon" /> Save Now</button>
          </span>
          <div className="save-text ">
            <p> <img src={Interesticon} alt="icon" /> ₦10,000.00</p>
            <p>(Total Instant Save)</p>
          </div>
        </div>
        <div className="next-part">
          this is the last part
        </div>
      </SnapContent>
      <TableDisplay>
        <CustomTable
          columns={columns}
          dataSource={dataSource}
          loading={processing}
        // pagination
        />
      </TableDisplay>
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
`
const TableDisplay = styled.div`
margin-left: 17rem; 
margin-top: 5rem;
`
export default Snap;

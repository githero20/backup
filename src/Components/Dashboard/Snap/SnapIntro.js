import React from 'react'
import styled from '@emotion/styled';
import snapImg from '../../../admin/app-assets/images/snapimg.png';
import { useHistory } from 'react-router';

const MillexIntro = () => {
  const history = useHistory();

  return (
    <MillexIntro.Wrapper
      onClick={() => history.push("/dashboard/snap")}
      className="custom-card pull-up">
      <div className="top">
        <p>INTRODUCING</p>
        <h1>Snap Saving</h1>
      </div>
      <div>
        <p>The new Snap Saving feature helps you get huge returns weekly on high saving deposits</p>
      </div>
    </MillexIntro.Wrapper>
  )
}
MillexIntro.Wrapper = styled.div`
background-color:#F5F2FF;
background-image: url(${snapImg});
background-position: center; 
background-repeat: no-repeat; 
background-size: contain;
height:60%;
margin-top:3rem;
border-radius:10px;
padding:1rem 3rem;
/* font-family: "Circular Std Black", "Product Sans", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; */
.top{
  display:flex;
  align-items:center;
  /* margin-top:1rem; */
  margin-bottom:1rem;
  p{
    background-color:#DED8F2;
    color:#482D99;
    font-size:12px;
    padding:0.5rem;
    border-radius:8px;
    letter-spacing: 1.2px;
    font-family:Poppins Regular !important;
  }
  h1{
    font-family: "Circular Std Black" !important;
    font-size:20px;
    color:#482D99;
    margin-top: 0.5rem;
    margin-left: 1rem;
  }
  
}
div:last-of-type{
    width:70%;
    color: #352D66;
  }
`
export default MillexIntro

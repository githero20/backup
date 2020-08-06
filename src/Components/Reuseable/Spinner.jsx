import React from 'react'
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const Spinner = () => {
  return (
    <Spinner.Wrapper>
      <div className="spinner-container" />
    </Spinner.Wrapper>
  )
}

const spin = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

Spinner.Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div{

    .spinner-container {
      display: inline-block;
      width: 50px;
      height: 50px;
      /* border: 3px solid rgba(24, 144, 255, 0.9); */
      border: 3px solid red;
      border-radius: 50%;
      border-top-color: #C5EEFF;
      animation: ${spin} 1s ease-in-out infinite;
      -webkit-animation: ${spin} 1s ease-in-out infinite;
  }
}
`
export default Spinner;
import React from 'react';
import { ReactComponent as NoDataIcon } from './no_data.svg';
import styled from '@emotion/styled';

const NoData = () => (
  <NoData.Wrapper>
    <NoDataIcon />
    <p>No data</p>
  </NoData.Wrapper>
);

NoData.Wrapper = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  p{
    color:rgba(0,0,0,0.35);
    margin-top:-1rem;
  }
`;
export default NoData;

import React from 'react';
import styled from '@emotion/styled';
import CustomTable from './CustomTable';


const TableDisplay = (props) => {
  const { header, dataSource, columns, loading, pagination } = props;
  return (
    <TableDisplay.Wrapper>
      <h1>{header}</h1>
      <CustomTable dataSource={dataSource} columns={columns} loading={loading} pagination />
    </TableDisplay.Wrapper>
  );
};

TableDisplay.Wrapper = styled.div`
  margin-top:2rem;
  background-color:#fff;
  padding:2rem;
  h1{
    margin: 0 0 2rem;
    color: #8a8ab2;
    font-size: 1.12rem;
    font-weight: 500;
    letter-spacing: .05rem;
  }
`;
export default TableDisplay;

import React, { useState, Fragment } from 'react';
import styled from '@emotion/styled';
import shortid from 'shortid';
import NoData from './NoData';
import { Roller } from 'react-spinners-css';

const Pagination = (props) => {
  const { postsPerPage, totalPosts, paginate, currentPage } = props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination.Wrapper>
      <ul>
        <button disabled={currentPage <= 1} className="first" onClick={() => paginate(currentPage - 1)}>&laquo;</button>
        {pageNumbers.map(number => (
          <li key={shortid.generate()}>
            <button
              className={`${currentPage === number ? 'active' : ''}`}
              onClick={() => paginate(number)}>
              {number}
            </button>

          </li>
        ))}
        <button className="last"
          disabled={currentPage >= pageNumbers.length}
          onClick={() => paginate(currentPage + 1)}
        >&raquo;</button>
      </ul>
    </Pagination.Wrapper>
  );
};

Pagination.Wrapper = styled.nav`
  display:flex;
  justify-content:flex-end;
  margin-top:1rem;
  ul{
    display:flex;
  }
  button{
    color: black;
    padding: 8px 16px;
    text-decoration: none;
    border:none;
    background-color:#fff;
    &:disabled,
    &[disabled]{
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      cursor:default;
      &:hover{
      background-color: #cccccc;
      }
}
  }
  .first{
    border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .last{
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  .active {
  color: white;
    background-color: #2784f4;
    border-radius: 50%;
}
`
const CustomTable = (props) => {
  const { dataSource, columns, loading, pagination } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData = pagination ? dataSource.slice(indexOfFirstPost, indexOfLastPost) : dataSource;

  // Change page 
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (

    <TableHolder>
      {loading ? (
        <TempHolder>
          <Roller color="#fff" style={{ margin: 'auto' }} />
        </TempHolder>
      ) : <Fragment></Fragment>}

      <CustomTableItem>
        <thead>
          <tr>
            {columns.map((col) => (
              <TableHeader key={col.title}>{col.title}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            currentData.length > 0 ? currentData.map((record, index) => (
              <tr key={shortid.generate()}>
                {
                  columns.map((column) => {
                    let nodeValue = record[column.dataIndex || ''];
                    nodeValue = column.render ? column.render(nodeValue, record, index) : nodeValue;
                    return (
                      <TableData key={column.title}>{nodeValue}</TableData>
                    );
                  })
                }
              </tr>
            )) : (
                <tr>
                  <td colSpan={columns.length}>
                    <NoData />
                  </td>
                </tr>
              )

          }
        </tbody>
      </CustomTableItem>
      {
        pagination && <Pagination
          postsPerPage={postsPerPage}
          totalPosts={dataSource.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      }
    </TableHolder>
  );
};




const TableHolder = styled.div`
font-family:'Product Sans','Circular Std';
position: relative;
overflow-x: auto;
`;
const CustomTableItem = styled.table`
width: 100%;
`;
const TableHeader = styled.th`
    background-color:white;
    color: rgba(138,138,178,.4);
    padding:0.8rem;
    text-transform:uppercase;
`;
const TableData = styled.td`
    color:black;
    /* border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd; */
    padding: 15px;
    background-color:white;
`;

const TempHolder = styled.div`
position: absolute;
background-color:rgba(0,0,0,.5);
top:0;
left:0;
right:0;
bottom:0;
display:flex;
align-content:center;
justify-content:center;
`;
export default CustomTable;

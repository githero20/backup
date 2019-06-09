import React, {Component} from 'react';
import mobileTableStatIcon from "../../../admin/app-assets/images/svg/green-dot.svg";
import moment from "moment";
import listIcon from "../../../admin/app-assets/images/svg/list-icon.svg";
import gridIcon from "../../../admin/app-assets/images/svg/grid-icon.svg";
import tableLeftArrow from "../../../admin/app-assets/images/svg/table-arrow-left.svg";
import sortIcon from "../../../admin/app-assets/images/svg/order-interface-symbol-with-down-arrow.svg";
import filterIcon from "../../../admin/app-assets/images/svg/filter-filled-tool-symbol.svg";
import {CSVLink} from "react-csv";
import {Col, Form, Row} from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DataTable from 'react-data-table-component';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter'

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;


class TransactionTable extends Component {

    state = {
        currentTransactions: [],
        currentPage: null,
        totalPages: null

    };


    onPageChanged = data => {
        const {transactions} = this.props;
        const {currentPage, totalPages, pageLimit} = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentTransactions = transactions.slice(offset, offset + pageLimit);

        this.setState({currentPage, currentTransactions, totalPages});
    };


    // sort function

    sort =()=> {



    }


    //do search function


    search =()=> {




    }


    render() {

        const {transactions,columns} = this.props;

        return (
            <React.Fragment>


                <div id="recent-transaction" className=" col-lg-12 order-md-1">
                    <div className="card">
                        <div className="card-header  ">
                            <div className="d-flex justify-content-start">
                                <h4 className="card-title table-title">Recent Transaction </h4>
                                {/*<div className="table-button-container d-none d-md-inline-block">*/}
                                {/*                 <span*/}
                                {/*                     className="mr-md-1 table-grid-view-icon img-2x list-btn active d-block d-md-inline">*/}
                                {/*                     <img src={listIcon} className=" img-2x "/>*/}
                                {/*                 </span>*/}
                                {/*    <span className="mr-md-1 table-grid-view-icon img-2x  grid-btn d-block d-md-inline">*/}
                                {/*                        <img src={gridIcon} className=" img-2x "/>*/}
                                {/*                    </span>*/}
                                {/*    <span className="table-view-display d-block d-md-inline">*/}
                                {/*                        <img src={tableLeftArrow} className="mr-1 img-1x"/> grid view*/}
                                {/*                    </span>*/}
                                {/*</div>*/}
                                {/*<div className="table-sort-display d-block d-md-inline"><span*/}
                                {/*    data-toggle="modal" data-target="#sort"><img className=" img-2x "*/}
                                {/*                                                 src={sortIcon}/></span>sort*/}
                                {/*</div>*/}

                                {/*<div className="table-sort-display d-block d-md-inline"><span*/}
                                {/*    data-toggle="modal" data-target="#sort"><img className=" img-2x " src={filterIcon}/></span>Filter*/}
                                {/*</div>*/}
                                {/*<CSVLink variant="success" data={transactions} target="_blank" className={'btn-green'}>Export*/}
                                {/*    CSV</CSVLink>*/}
                                {/* TODO add search field */}
                                {/*<div className='search-field'>*/}
                                {/*    <input type='text' className='form-control' />*/}
                                {/*</div>*/}
                            </div>
                            {/*<div className="search-field">*/}
                            {/*    <Form.Control size="lg" type="text" placeholder="Search"/>*/}
                            {/*</div>*/}

                        </div>


                        {/*<ReactTable*/}
                        {/*    data={transactions}*/}
                        {/*    columns={columns}*/}
                        {/*    sortable={true}*/}
                        {/*    resizable={true}*/}
                        {/*    filterable={true}*/}
                        {/*    loading={false}*/}
                        {/*/>*/}


                        <ToolkitProvider
                            keyField="id"
                            data={transactions }
                            columns={ columns }
                            search
                        >
                            {
                                props => (
                                    <div>
                                        <div className={'d-flex justify-content-between align-content-center mb-1 mx-1'}>
                                            <SearchBar { ...props.searchProps } />
                                            <div className="table-sort-display d-block d-md-inline"><span
                                                data-toggle="modal" data-target="#sort"><img className=" img-2x "
                                                                                             src={sortIcon}/></span>Sort
                                            </div>

                                            <div className="table-sort-display d-block d-md-inline"><span
                                                data-toggle="modal" data-target="#sort"><img className=" img-2x " src={filterIcon}/></span>Filter
                                            </div>
                                            <ExportCSVButton className={'btn-green'}  { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                                        </div>

                                        <div className={'sort-modal'}>

                                            {/*TODO pick the number of columns user van sort with */}
                                            <select>
                                                <option value=""></option>
                                            </select>
                                        </div>


                                        {/* TODO enter */}
                                        <div className={'filter-modal'}>
                                            <select>
                                                <option value="">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                            </select>
                                        </div>


                                        <BootstrapTable
                                            { ...props.baseProps }
                                            pagination={ paginationFactory() }
                                            filter={ filterFactory() }
                                        />
                                    </div>

                                )
                            }
                        </ToolkitProvider>

                        <div className="card-content mt-1 light-table-bg">

                            {/*<DataTable*/}
                            {/*    columns={columns}*/}
                            {/*    data={transactions}*/}
                            {/*    sortable*/}
                            {/*    pagination*/}
                            {/*    responsive*/}
                            {/*/>*/}



                            {/*<div className="table-responsive">*/}
                            {/*    <table id="recent-orders"*/}
                            {/*           className="table table-hover table-xl mb-0 spaced-table">*/}
                            {/*        <thead>*/}
                            {/*        <tr>*/}
                            {/*            <th className="border-top-0 d-none d-md-block">Date</th>*/}
                            {/*            <th className="border-top-0">Description</th>*/}
                            {/*            <th className="border-top-0">Amount</th>*/}
                            {/*            <th className="border-top-0 d-none d-md-block">Reference</th>*/}
                            {/*        </tr>*/}
                            {/*        </thead>*/}
                            {/*        <tbody>*/}
                            {/*        /!*show all transactions*!/*/}
                            {/*        {*/}
                            {/*            transactions.length !== 0 ?*/}
                            {/*                (*/}

                            {/*                    transactions.map((data, idx) => {*/}
                            {/*                            let date = moment(data.created_at).format('LL');*/}
                            {/*                            let time = moment(data.created_at).format('hh:mm a');*/}
                            {/*                            return (*/}
                            {/*                                <tr key={data.id}>*/}
                            {/*                                    <td className="text-truncate d-none d-md-block">*/}
                            {/*                                        <span className="text-muted mr-1">{date} </span>*/}
                            {/*                                        <span className="table-time">{time}</span>*/}
                            {/*                                    </td>*/}
                            {/*                                    <td>*/}
                            {/*                                        <img alt={''} src={mobileTableStatIcon}*/}
                            {/*                                             className="green-dot d-md-none"/>*/}
                            {/*                                        <div className="d-inline-block">*/}
                            {/*                                            <div*/}
                            {/*                                                className="d-md-block text-capitalize">{data.type}</div>*/}
                            {/*                                            <div*/}
                            {/*                                                className="table-time d-block d-md-none ">{time}*/}
                            {/*                                            </div>*/}
                            {/*                                        </div>*/}
                            {/*                                    </td>*/}
                            {/*                                    {data.type === 'credit' ?*/}
                            {/*                                        <td>*/}
                            {/*                                            <label*/}
                            {/*                                                className="bg-light-green px-2 sm-pd">&#8358;{parseFloat(data.amount).toFixed(2)}</label>*/}
                            {/*                                        </td>*/}
                            {/*                                        :*/}
                            {/*                                        <td>*/}
                            {/*                                            <label*/}
                            {/*                                                className="bg-light-red px-2 sm-pd">&#8358; {parseFloat(data.amount).toFixed(2)}</label>*/}
                            {/*                                        </td>*/}
                            {/*                                    }*/}
                            {/*                                    <td className="text-truncate d-none d-md-block text-uppercase"*/}
                            {/*                                        style={{maxWidth: '120px'}}>{data.reference}</td>*/}
                            {/*                                </tr>*/}

                            {/*                            )*/}
                            {/*                        }*/}
                            {/*                    )*/}

                            {/*                )*/}
                            {/*                :*/}
                            {/*                null*/}
                            {/*        }*/}
                            {/*        /!* pagination component *!/*/}
                            {/*        /!*<Pagination*!/*/}
                            {/*        /!*    totalRecords={transactions}*!/*/}
                            {/*        /!*    pageLimit={18}*!/*/}
                            {/*        /!*    pageNeighbours={1}*!/*/}
                            {/*        /!*    onPageChanged={this.onPageChanged}*!/*/}
                            {/*        />*/}

                            {/*        /!* use for  Debit Transactions *!/*/}
                            {/*        /!*<tr>*!/*/}
                            {/*        /!*    <td className="text-truncate d-none d-md-block"><span*!/*/}
                            {/*        /!*        className="text-muted mr-1">3|5|2019 </span>*!/*/}
                            {/*        /!*        <span className="table-time">8:00am</span></td>*!/*/}
                            {/*        /!*    <td>*!/*/}
                            {/*        /!*        <img  alt={''} src={mobileTableStatIcon}*!/*/}
                            {/*        /!*             className="green-dot d-md-none"/>*!/*/}
                            {/*        /!*        <div className="d-inline-block">*!/*/}
                            {/*        /!*            <div className="d-md-block">Credit</div>*!/*/}
                            {/*        /!*            <div className="table-time d-block d-md-none ">8:00am*!/*/}
                            {/*        /!*            </div>*!/*/}
                            {/*        /!*        </div>*!/*/}

                            {/*        /!*    </td>*!/*/}
                            {/*        /!*    <td>*!/*/}
                            {/*        /!*        <label className="bg-light-red px-2 sm-pd">75000</label>*!/*/}
                            {/*        /!*    </td>*!/*/}
                            {/*        /!*    <td className="text-truncate ">*!/*/}
                            {/*        /!*        50,000*!/*/}
                            {/*        /!*    </td>*!/*/}
                            {/*        /!*    <td className="text-truncate d-none d-md-block">ABCD999</td>*!/*/}
                            {/*        /!*</tr>*!/*/}

                            {/*        </tbody>*/}
                            {/*    </table>*/}
                            {/*</div>*/}

                        {/*    /!*pagination *!/*/}

                            {/*<nav aria-label="Page navigation">*/}
                            {/*    <ul className=" custom-pagination pagination justify-content-center pagination-separate pagination-round pagination-flat pagination-lg mb-1">*/}
                            {/*        <li className="page-item">*/}
                            {/*            <a className="page-link" href="#" aria-label="Previous">*/}
                            {/*                <span aria-hidden="true"><span className="d-none d-md-inline">«</span> Prev</span>*/}
                            {/*                <span className="sr-only">Previous</span>*/}
                            {/*            </a>*/}
                            {/*        </li>*/}
                            {/*        <li className="page-item">*/}
                            {/*            <a className="page-link" href="#">1</a>*/}
                            {/*        </li>*/}
                            {/*        <li className="page-item">*/}
                            {/*            <a className="page-link" href="#">2</a>*/}
                            {/*        </li>*/}
                            {/*        <li className="page-item active">*/}
                            {/*            <a className="page-link" href="#">3</a>*/}
                            {/*        </li>*/}
                            {/*        <li className="page-item">*/}
                            {/*            <a className="page-link" href="#">4</a>*/}
                            {/*        </li>*/}
                            {/*        <li className="page-item">*/}
                            {/*            <a className="page-link" href="#">5</a>*/}
                            {/*        </li>*/}
                            {/*        <li className="page-item">*/}
                            {/*            <a className="page-link" href="#" aria-label="Next">*/}
                            {/*                <span aria-hidden="true">Next <span className="d-none d-md-inline">»</span>*/}
                            {/*                </span>*/}
                            {/*                <span className="sr-only">Next</span>*/}
                            {/*            </a>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</nav>*/}
                        {/*</div>*/}
                    </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TransactionTable;
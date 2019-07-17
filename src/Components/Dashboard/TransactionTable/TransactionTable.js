import React, {Component} from 'react';
import 'react-table/react-table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {CSVExport, Search} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {Comparator} from 'react-bootstrap-table2-filter'
import moment from "moment";
import {changeHandler} from "../../../Helpers/Helper";

const {SearchBar, ClearSearchButton} = Search;
const {ExportCSVButton} = CSVExport;


class TransactionTable extends Component {

    state = {
        currentTransactions: [],
        currentPage: null,
        totalPages: null,
        sort: false,
        filter: false,
        date: moment().format('MM-DD-YYYY'),
        comparator: Comparator.LEQUAL
    };

    constructor(props) {
        super(props);
    }


    onPageChanged = data => {
        const {transactions} = this.props;
        const {currentPage, totalPages, pageLimit} = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentTransactions = transactions.slice(offset, offset + pageLimit);

        this.setState({currentPage, currentTransactions, totalPages});
    };


    handleChange = (e) => {
        changeHandler(e, this);
    };

    changeSort = () => {
        this.setState({
            sort: !this.state.sort
        })
    };

    changeFilter = () => {
        this.setState({
            filter: !this.state.filter
        })
    };


    toggleSort = () => {
        this.changeSort();
    };


    toggleFilter = () => {
        document.querySelector('.filter-icon').classList.toggle('active');
        this.changeFilter();
    };


    runSort = (e) => {
        const field = e.target.value;
        const sortDirection = 'ASC';
    };

    // on select perform actions either sort or filter based on column selected


    // change locked savings table

    // change back up goals table


    render() {
        const {transactions, columns} = this.props;
        const {date, comparator} = this.state;
        return (
            <React.Fragment>
                <div id="recent-transaction" className=" col-lg-12 order-md-1">
                    <div className="card table-card ">
                        <div className="card-header">
                            <div className="d-flex justify-content-start">
                                <h4 className="card-title table-title">Recent Transactions </h4>
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
                        <ToolkitProvider
                            keyField="id"
                            data={transactions}
                            columns={columns}
                            // search={ { searchFormatted: true } }
                            search
                        >
                            {
                                props => (
                                    <div>
                                        <div
                                            className={'d-none d-md-flex justify-content-between flex-md-row align-items-center mb-1 mx-1 mx-md-2'}>
                                            {/*<div className=' d-flex justify-content-between align-items-center'>*/}
                                            {/*    <span className="form-group mr-md-1">*/}
                                            {/*        <label className='mr-md-1'>From</label><input type='date' className='from input-field' />*/}
                                            {/*    </span>*/}
                                            {/*    <span className="form-group">*/}
                                            {/*        <label className='mr-md-1'>To</label><input type='date' className='to input-field' />*/}
                                            {/*    </span>*/}
                                            {/*</div>*/}
                                            {/*<SearchBar {...props.searchProps} placeholder="Date Filter" className={'flex-shrink-1'} />*/}

                                            {/*date filter*/}

                                            {/*<div onClick={this.toggleSort} className="table-sort-display d-block d-md-inline">*/}
                                            {/*    <span><img className=" img-2x " src={sortIcon}/></span>Sort*/}
                                            {/*</div>*/}

                                            <div onClick={this.toggleFilter}
                                                 className="filter-icon table-sort-display d-block d-md-inline sort-icon">
                                                {/*<span data-toggle="modal" data-target="#sort">*/}
                                                {/*    /!*<img className=" img-2x" src={filterIcon}/>*!/*/}
                                                {/*</span>*/}
                                            </div>

                                            <ExportCSVButton
                                                className="btn-green d-none d-md-inline-block"  {...props.csvProps}>Export
                                                CSV</ExportCSVButton>
                                        </div>


                                        {this.state.sort ?

                                            <div className='sort-box round shadow-sm'>
                                                <p>Sort Table </p>
                                                <div className={'mb-1'}>
                                                    <select onChange={this.runSort} name={'sort-column'}>
                                                        {columns.map((content) => (
                                                            <option value={content.dataField}>{content.text}</option>))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <button className='btn btn-block btn-custom-blue'>Sort</button>
                                                </div>
                                            </div> : null

                                        }

                                        {this.state.filter ?


                                            <div className='filter-box round shadow'>
                                                <div className="custom-filter date-filter">
                                                    <div className="filter-label">
                                                        <span className="sr-only">Filter comparator</span>
                                                        <select id="date-filter-comparator-InStock Date"
                                                                name='comparator'
                                                                className="date-filter-comparator form-control "
                                                                onChange={this.handleChange} defaultValue={comparator}>
                                                            <option>Date Filter</option>
                                                            <option value={Comparator.EQ}>Equal To</option>
                                                            <option value={Comparator.NE}>Not Equal To</option>
                                                            <option value={Comparator.GT}>Greater Than</option>
                                                            <option value={Comparator.GEQUAL}>Greater Than or Equal
                                                            </option>
                                                            <option value={Comparator.LT}>Less Than</option>
                                                            <option value={Comparator.LEQUAL}>Less Than or Equal
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <span className="sr-only">Date Filter</span>
                                                        <input
                                                            id="date"
                                                            name="date"
                                                            onChange={this.handleChange}
                                                            className="filter date-filter-input form-control "
                                                            type="date"
                                                            placeholder="Enter Date..."/>
                                                    </div>
                                                </div>

                                                <button className={'btn btn-block mt-1 btn-custom-blue'}
                                                        onClick={() => this.props.handleFilter(date, comparator)}>Filter
                                                </button>

                                            </div>
                                            : null

                                        }

                                        <BootstrapTable classes={'spaced-table'}
                                                        {...props.baseProps}
                                                        pagination={paginationFactory({
                                                            hideSizePerPage: true,
                                                            sizePerPageList: [{
                                                                text: '5', value: 5
                                                            }, {
                                                                text: '10', value: 10
                                                            }],
                                                            withFirstAndLast: true,
                                                            alwaysShowAllBtns: true,
                                                            prePageText: 'Prev',
                                                            nextPageText: 'Next',
                                                        })}
                                                        filter={filterFactory()}
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
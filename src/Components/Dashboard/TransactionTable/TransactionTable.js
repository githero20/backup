import React, { Component } from 'react';
import 'react-table/react-table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Comparator } from 'react-bootstrap-table2-filter'
import moment from "moment";
import { changeHandler } from "../../../Helpers/Helper";

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

class TransactionTable extends Component {

    state = {
        currentTransactions: [],
        currentPage: null,
        totalPages: null,
        filter: false,
        sort: false,
        date: moment().format('MM-DD-YYYY'),
        comparator: Comparator.LEQUAL
    };

    constructor(props) {
        super(props);
    }


    handleChange = (e) => {
        changeHandler(e, this);
    };

    changeFilter = () => {
        this.setState({
            filter: !this.state.filter
        })
    };


    toggleFilter = () => {
        document.querySelector('.filter-icon').classList.toggle('active');
        this.changeFilter();
    };


    runSort = (e) => {
        const field = e.target.value;
        const sortDirection = 'ASC';
    };


    render() {
        const { transactions, columns } = this.props;
        const { date, comparator } = this.state;
        return (
            <React.Fragment>
                <div id="recent-transaction" className=" col-lg-12 order-md-1">
                    <div className="card table-card ">
                        <div className="card-header">
                            <div className="d-flex justify-content-start">
                                <h4 className="card-title table-title">Recent Transactions </h4>
                            </div>
                        </div>
                        <ToolkitProvider
                            keyField="id"
                            data={transactions}
                            columns={columns}
                            search>
                            {
                                props => (
                                    <div>
                                        <div
                                            className={'d-none d-md-flex justify-content-between flex-md-row ' +
                                                'align-items-center mb-1 mx-1 mx-md-2'}>
                                            <div onClick={this.toggleFilter}
                                                className="filter-icon table-sort-display d-block d-md-inline
                                                  sort-icon">
                                            </div>

                                            <ExportCSVButton
                                                className="btn-green d-none d-md-inline-block"  {...props.csvProps}>
                                                Export CSV
                                            </ExportCSVButton>
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
                                                            placeholder="Enter Date..." />
                                                    </div>
                                                </div>

                                                <button className={'btn btn-block round mt-1 btn-custom-blue'}
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
                                                    text: '5',
                                                    value: 5
                                                }, {
                                                    text: '10',
                                                    value: 10
                                                }],
                                                withFirstAndLast: true,
                                                alwaysShowAllBtns: true,
                                                prePageText: 'Prev',
                                                nextPageText: 'Next',
                                            })}

                                        // filter={}
                                        />
                                    </div>

                                )
                            }
                        </ToolkitProvider>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TransactionTable;
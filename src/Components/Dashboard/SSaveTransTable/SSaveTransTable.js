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
import ToolkitProvider, {Search, CSVExport} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {selectFilter} from 'react-bootstrap-table2-filter'

const {SearchBar, ClearSearchButton} = Search;
const {ExportCSVButton} = CSVExport;


class SSaveTransTable extends Component {

    state = {
        currentTransactions: [],
        currentPage: null,
        totalPages: null,
        sort:false,
        filter:false

    };


    onPageChanged = data => {
        const {transactions} = this.props;
        const {currentPage, totalPages, pageLimit} = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentTransactions = transactions.slice(offset, offset + pageLimit);

        this.setState({currentPage, currentTransactions, totalPages});
    };


    // sort function

    sort = () => {


    }


    //do search function


    search = () => {


    }

    changeSort = () =>{
        this.setState({
            sort:!this.state.sort
        })
    };

    changeFilter = () =>{
        this.setState({
            filter:!this.state.filter
        })
    };


    toggleSort=()=>{


       this.changeSort();




    };

    toggleFilter=()=>{

        this.changeFilter();

    }


    runSort = (e) => {
        const field = e.target.value;
        const sortDirection = 'ASC';
    }
    // on select perform actions either sort or filter based on column selected


    // change locked savings table

    // change back up goals table


    render() {

        const {transactions, columns,title,emptyMessage} = this.props;

        return (
            <React.Fragment>
                <div id="recent-transaction" className=" col-lg-12 order-md-1">
                    <div className="card steady-table-card table-card">
                        <div className="card-header  ">
                            <div className="d-flex justify-content-start">
                                <h4 className="card-title table-title">{title} </h4>
                            </div>
                        </div>
                        {
                            transactions!==0?
                                (
                                    <ToolkitProvider
                                        keyField="id"
                                        data={transactions}
                                        columns={columns}
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <div
                                                        className={'d-md-flex d-none justify-content-end flex-md-row align-items-center mb-1 mx-1'}>
                                                        <ExportCSVButton className="btn-green flex-shrink-1"  {...props.csvProps}>Export
                                                            CSV</ExportCSVButton>
                                                    </div>
                                                    {this.state.sort?

                                                        <div className='sort-box round shadow-sm'>
                                                            <p>Sort Table </p>
                                                            <div className={'mb-1'}>
                                                                <select onChange={this.runSort} name={'sort-column'}>
                                                                    {columns.map((content)=>(<option value={content.dataField}>{content.text}</option>))}
                                                                </select>
                                                            </div>
                                                            <button className='btn btn-block btn-custom-blue'>Sort</button>
                                                        </div>:null
                                                    }

                                                    {this.state.filter?


                                                        <div className='filter-box round shadow-sm'>
                                                            <p>Filter Table </p>
                                                            <input type={'text'}  id={'filter-param'} name={'filter-param'}/>
                                                            <button className={'btn btn-custom-blue'} onClick={this.props.runFilter}>Filter</button>
                                                        </div>
                                                        :null

                                                    }

                                                    <BootstrapTable classes={'spaced-table'}
                                                                    {...props.baseProps}
                                                                    pagination={paginationFactory({
                                                                        hideSizePerPage: true,
                                                                        sizePerPageList: [ {
                                                                            text: '5', value: 5
                                                                        }, {
                                                                            text: '10', value: 10
                                                                        }],
                                                                        withFirstAndLast: true,
                                                                        alwaysShowAllBtns: true,
                                                                        prePageText: 'Prev',
                                                                        nextPageText: 'Next',
                                                                    })}
                                                                    filter={filterFactory({})}
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                ):
                                (
                                    <div>
                                        <i className='fa fa-history'></i>
                                        <p className='text-muted'> {emptyMessage}</p>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SSaveTransTable;
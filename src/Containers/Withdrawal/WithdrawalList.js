import React, {Component} from 'react';
import greenDot from "../../admin/app-assets/images/svg/green-dot.svg";
import {formatNumber} from "../../Helpers/Helper";
import {_transformDate} from "../../utils";
import ToolkitProvider,{Search, CSVExport} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";

const {SearchBar} = Search;
const {ExportCSVButton} = CSVExport;


class WithdrawalList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        currentTransactions: [],
        currentPage: null,
        totalPages: null,
        sort:false,
        filter:false
    };


    render() {

        const {transactions,columns,isShow,showForm}=this.props;

        return (
            <React.Fragment>

                <ToolkitProvider
                    keyField="id"
                    data={transactions}
                    isShow={isShow}
                    showForm={showForm}
                    columns={columns}
                    search
                >
                    {
                        props => (
                            <div>
                                <div
                                    className={'d-flex justify-content-end flex-md-row align-items-center mb-1 mx-1'}>
                                    <ExportCSVButton className="d-none d-md-inline-block btn-green flex-shrink-1"
                                                     {...props.csvProps}>Export
                                        CSV</ExportCSVButton>
                                </div>


                                {this.state.sort?

                                    <div className='sort-box round shadow-sm'>
                                        <p>Sort Table </p>
                                        <div className={'mb-1'}>
                                            <select onChange={this.runSort} name={'sort-column'}>
                                                {columns.map((content)=>(<option value={content.dataField}>
                                                    {content.text}</option>))}
                                            </select>
                                        </div>
                                        <button className='btn btn-block btn-custom-blue'>Sort</button>
                                    </div>:null

                                }

                                {this.state.filter?


                                    <div className='filter-box round shadow-sm'>
                                        <p>Filter Table </p>
                                        <input type={'text'}  id={'filter-param'} name={'filter-param'}/>
                                        <button className={'btn btn-custom-blue'} onClick={this.props.runFilter}>
                                            Filter</button>
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
            </React.Fragment>
        );
    }
}

export default WithdrawalList;
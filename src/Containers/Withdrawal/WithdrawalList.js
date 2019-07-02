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
                    // search={ { searchFormatted: true } }
                    search
                >
                    {
                        props => (
                            <div>
                                <div
                                    className={'d-flex justify-content-end flex-md-row align-items-center mb-1 mx-1'}>
                                    {/*<SearchBar {...props.searchProps} placeholder="Date Filter" className={'flex-shrink-1'} />*/}
                                    {/*<div onClick={this.toggleSort} className="table-sort-display d-block d-md-inline">*/}
                                    {/*    <span><img className=" img-2x " src={sortIcon}/></span>Sort*/}
                                    {/*</div>*/}

                                    {/*<div onClick={this.toggleFilter} className="table-sort-display d-block d-md-inline"><span*/}
                                    {/*    data-toggle="modal" data-target="#sort"><img className=" img-2x "*/}
                                    {/*                                                 src={filterIcon}/></span>Filter*/}
                                    {/*</div>*/}

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
            {/*<div className="box-grid-container  light-blue-bg px-md-3 py-1 ">*/}
            {/*    <div className="table-responsive">*/}
            {/*        <table className="table table-hover table-xl mb-0 spaced-table">*/}
            {/*            <thead>*/}
            {/*            <tr>*/}
            {/*                <th className="border-top-0 d-none d-md-block">Reference</th>*/}
            {/*                <th className="border-top-0 ">Status</th>*/}
            {/*                <th className="border-top-0 ">Balance</th>*/}
            {/*                <th className="border-top-0 d-none d-md-block">Amount</th>*/}
            {/*                <th className="border-top-0 ">Account</th>*/}
            {/*                <th className="border-top-0 d-none d-md-block">Date</th>*/}
            {/*            </tr>*/}

            {/*            </thead>*/}
            {/*            <tbody>*/}
            {/*            {*/}
            {/*                this.props.withdrawals.map((withdrawal, index) => {*/}
            {/*                    return (*/}
            {/*                        <tr key={index}>*/}
            {/*                            <td className="text-truncate d-none d-md-block">{withdrawal.id}</td>*/}

            {/*                            <td>*/}
            {/*                                <div className="d-flex">*/}
            {/*                                    <div className="d-inline-block d-md-none">*/}
            {/*                                        <img*/}
            {/*                                            src={greenDot}*/}
            {/*                                            className="green-dot "/>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="d-inline-block">*/}
            {/*                                        <div className="d-md-block">{withdrawal.is_confirmed ? "Completed" : "Failed"}</div>*/}
            {/*                                        <div*/}
            {/*                                            className="table-time d-block d-md-none ">5th*/}
            {/*                                            Sep 19*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </td>*/}
            {/*                            <td className="text-truncate ">*/}
            {/*                                {formatNumber(withdrawal.amount)}*/}
            {/*                            </td>*/}
            {/*                            <td className="text-truncate d-none d-md-block">*/}
            {/*                                {formatNumber(withdrawal.last_amount)}*/}
            {/*                            </td>*/}
            {/*                            <td className="text-truncate ">*/}
            {/*                                {withdrawal.account_type}*/}
            {/*                            </td>*/}
            {/*                            <td className="text-truncate d-none d-md-block">*/}
            {/*                                {_transformDate(withdrawal.created_at)}*/}
            {/*                            </td>*/}
            {/*                        </tr>*/}
            {/*                    );*/}
            {/*                })*/}
            {/*            }*/}

            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </div>*/}
            {/*    /!*<nav aria-label="Page navigation">*!/*/}
            {/*    /!*    <ul className=" custom-pagination pagination justify-content-center pagination-separate pagination-round pagination-flat pagination-lg mb-1">*!/*/}
            {/*    /!*        <li className="page-item">*!/*/}
            {/*    /!*            <a className="page-link" href="#" aria-label="Previous">*!/*/}
            {/*    /!*                                                    <span aria-hidden="true"><span*!/*/}
            {/*    /!*                                                        className="d-none d-md-inline">«</span> Prev</span>*!/*/}
            {/*    /!*                <span className="sr-only">Previous</span>*!/*/}
            {/*    /!*            </a>*!/*/}
            {/*    /!*        </li>*!/*/}
            {/*    /!*        <li className="page-item"><a className="page-link"*!/*/}
            {/*    /!*                                     href="#">1</a></li>*!/*/}
            {/*    /!*        <li className="page-item"><a className="page-link"*!/*/}
            {/*    /!*                                     href="#">2</a></li>*!/*/}
            {/*    /!*        <li className="page-item active"><a className="page-link"*!/*/}
            {/*    /!*                                            href="#">3</a></li>*!/*/}
            {/*    /!*        <li className="page-item"><a className="page-link"*!/*/}
            {/*    /!*                                     href="#">4</a></li>*!/*/}
            {/*    /!*        <li className="page-item"><a className="page-link"*!/*/}
            {/*    /!*                                     href="#">5</a></li>*!/*/}
            {/*    /!*        <li className="page-item">*!/*/}
            {/*    /!*            <a className="page-link" href="#" aria-label="Next">*!/*/}
            {/*    /!*                                                    <span aria-hidden="true">Next <span*!/*/}
            {/*    /!*                                                        className="d-none d-md-inline">»</span></span>*!/*/}
            {/*    /!*                <span className="sr-only">Next</span>*!/*/}
            {/*    /!*            </a>*!/*/}
            {/*    /!*        </li>*!/*/}
            {/*    /!*    </ul>*!/*/}
            {/*    /!*</nav>*!/*/}
            {/*</div>*/}
            </React.Fragment>
        );
    }
}

export default WithdrawalList;
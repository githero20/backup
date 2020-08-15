import React, { Fragment, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { Comparator } from "react-bootstrap-table2-filter";
import moment from "moment";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";

const { ExportCSVButton } = CSVExport;

const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize, columns, handleFilter, loadFilter }) => {
    const [tableSetting, setTableSetting] = useState({
        filter: false,
        date: moment().format('MM-DD-YYYY'),
        comparator: Comparator.LEQUAL
    });

    return (
        <Fragment>
            <div id="recent-transaction" className=" col-lg-12 order-md-1">
                <div className="card table-card ">
                    <div className="card-header">
                        <div className="d-flex justify-content-start">
                            <h4 className="card-title table-title">Recent Transactions </h4>
                        </div>
                    </div>
                    <ToolkitProvider
                        keyField="id"
                        data={data}
                        columns={columns}
                        classes={'d-none'}
                        exportCSV
                    >
                        {
                            props => (
                                <Fragment>
                                    <div>
                                        <div
                                            className={'d-none d-md-flex justify-content-between flex-md-row ' +
                                                'align-items-center mb-1 mx-1 mx-md-2'}>
                                            <div onClick={() => {
                                                document.querySelector('.filter-icon').classList.toggle('active');
                                                const data = { filter: !tableSetting.filter };
                                                setTableSetting({ ...tableSetting, ...data });
                                                console.log(tableSetting);
                                            }}
                                                className="filter-icon table-sort-display d-block d-md-inline
                                                  sort-icon">
                                            </div>
                                            <ExportCSVButton
                                                className="btn-green d-none d-md-inline-block mr-2"  {...props.csvProps}>
                                                Export CSV
                                            </ExportCSVButton>
                                        </div>

                                        {tableSetting.filter ?
                                            <div className='filter-box round shadow'>
                                                <div className="custom-filter date-filter">
                                                    <div className="filter-label">
                                                        <span className="sr-only">Filter comparator</span>
                                                        <select id="date-filter-comparator-InStock Date"
                                                            name='comparator'
                                                            className="date-filter-comparator form-control "
                                                            onChange={(e) => {
                                                                const data = { ...tableSetting };
                                                                data[e.target.name] = e.target.value;
                                                                setTableSetting(data);
                                                                console.log(data);
                                                            }}
                                                            defaultValue={tableSetting.comparator}
                                                        >
                                                            <option>Date Filter</option>
                                                            <option value={Comparator.EQ}>Equal To</option>
                                                            <option value='<>'>Not Equal To</option>
                                                            <option value={Comparator.GT}>Greater Than</option>
                                                            <option value='>='>Greater Than or Equal
                                                            </option>
                                                            <option value={Comparator.LT}>Less Than</option>
                                                            <option value='<='>Less Than or Equal
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <span className="sr-only">Date Filter</span>
                                                        <input
                                                            id="date"
                                                            name="date"
                                                            onChange={(e) => {
                                                                const data = { ...tableSetting };
                                                                data[e.target.name] = e.target.value;
                                                                setTableSetting(data);
                                                                console.log(data);
                                                            }}
                                                            className="filter date-filter-input form-control "
                                                            type="date"
                                                            placeholder="Enter Date..."
                                                        />
                                                    </div>
                                                </div>

                                                <button className={'btn round mt-1 btn-custom-blue'}
                                                    onClick={() => {
                                                        console.log('clicked filter');
                                                        handleFilter(tableSetting.date, tableSetting.comparator, page)
                                                    }}>
                                                    {
                                                        loadFilter ?
                                                            <ButtonLoader />
                                                            : 'Filter'
                                                    }
                                                </button>

                                            </div>
                                            : null
                                        }
                                    </div>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        remote
                                        pagination={
                                            paginationFactory({
                                                page,
                                                sizePerPage,
                                                totalSize,
                                                withFirstAndLast: true,
                                                alwaysShowAllBtns: true,
                                                prePageText: 'Prev',
                                                nextPageText: 'Next',
                                                hideSizePerPage: true,
                                            })
                                        }

                                        onTableChange={onTableChange}
                                        // filter={filterFactory()}
                                        {...props.paginationTableProps}
                                        classes={'spaced-table'}
                                        noDataIndication={() => (
                                            <Fragment>
                                                <div className='text-center my-5 text-secondary'>
                                                    <h3> No Transactions Yet !</h3>
                                                </div>
                                            </Fragment>
                                        )}
                                    />
                                    <PaginationListStandalone
                                        {...props.paginationProps}
                                    />
                                </Fragment>
                            )
                        }
                    </ToolkitProvider>


                </div>
            </div>
        </Fragment>
    );
};

export default RemotePagination;
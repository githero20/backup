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

class ReferralTable extends Component {

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
        const {data, columns} = this.props;
        const {date, comparator} = this.state;
        return (
            <React.Fragment>
                <div id="recent-transaction" className=" col-lg-12 order-md-1">
                    <div className="card table-card ">
                        <div className="card-header">
                            <div className="d-flex justify-content-start">
                                {/*<h4 className="card-title table-title">Referred Users </h4>*/}
                            </div>
                        </div>
                        <ToolkitProvider
                            keyField="id"
                            data={data}
                            columns={columns}
                            search>
                            {
                                props => (
                                    <div>
                                        <BootstrapTable classes={'spaced-table pl-md-4'}
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

                                                        filter={filterFactory()}
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

export default ReferralTable;
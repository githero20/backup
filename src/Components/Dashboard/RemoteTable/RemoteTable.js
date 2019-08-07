import React, {Fragment} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import RemotePagination from './RemotePagination';


class RemoteTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            // data: products.slice(0, 10),
            sizePerPage: 10
        };
    }

    handleTableChange = (type, { page, sizePerPage }) => {
        const currentIndex = (page - 1) * sizePerPage;
        setTimeout(() => {
            this.setState(() => ({
                page,
                // data: products.slice(currentIndex, currentIndex + sizePerPage),
                sizePerPage
            }));
        }, 2000);
    };

    render() {
        const { data, sizePerPage, page } = this.props;
        return (
            <RemotePagination
                data={ data }
                page={ page }
                sizePerPage={ sizePerPage }
                // totalSize={ products.length }
                onTableChange={ this.handleTableChange }
            />
        );
    }
}
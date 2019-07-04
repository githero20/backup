import React, {Component} from 'react';

class DashboardLoader extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="loader-body">
                    <div className="loading">&nbsp;</div>
                </div>
            </React.Fragment>
        );
    }
}

export default DashboardLoader;
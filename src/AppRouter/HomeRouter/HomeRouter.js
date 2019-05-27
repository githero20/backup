import React, {Component} from 'react';
import {Route,BrowserRouter as Router} from "react-router-dom";
import Home from "../../Containers/Home/Home";


class HomeRouter extends Component {


    render() {
        return (
            <React.Fragment>
                <Router>
                    <Route exact path="/" component={Home} />
                </Router>
            </React.Fragment>
        );
    }
}

export default HomeRouter;
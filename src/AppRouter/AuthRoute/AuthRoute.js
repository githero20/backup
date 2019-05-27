import React, {Component} from 'react';
import {Route,BrowserRouter as Router} from "react-router-dom";

import SignUp from "../../Containers/SignUp/SignUp";
import Login from "../../Containers/Login/Login";

class AuthRoute extends Component {


    render() {
        return (
            <React.Fragment>
                <Router>
                    {/*<Route path="/activate" component={ActivateAccount} />*/}
                    <Route path="/login" component={Login} />
                    <Route path="/sign-up" component={SignUp} />
                </Router>
            </React.Fragment>
        );
    }
}

export default AuthRoute;
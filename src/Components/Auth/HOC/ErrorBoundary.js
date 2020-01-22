import React, {Component} from 'react';
import ErrorPage from "../../../Containers/ErrorPage/ErrorPage";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false};
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({ error });
    }

    render() {
        if (this.state.error) {
            return <ErrorPage errorName={'Error!'}
                              errorTitle={'We\'re sorry — something\'s gone wrong.'}
                              {...this.props}
            />;
        }else{
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
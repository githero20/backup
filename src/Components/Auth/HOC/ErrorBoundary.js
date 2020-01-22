import React, {Component} from 'react';
import ErrorPage from "../../../Containers/ErrorPage/ErrorPage";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false};
    }

    static getDerivedStateFromError(error) {
        return { error: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        console.log("An Error has been streamed to graylog", error, errorInfo);

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
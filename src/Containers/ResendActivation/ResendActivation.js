import React, {Component} from 'react';
import {ToastProvider} from 'react-toast-notifications';
import ResendForm from "../../Components/Auth/ResendForm/ResendForm";


class ResendActivation extends Component {


    render() {


        return (
            <React.Fragment>
                <ToastProvider>
                    <section className="login-background login-section">
                        <ResendForm />
                    </section>
                </ToastProvider>
            </React.Fragment>
        );

    }

}


export default ResendActivation;
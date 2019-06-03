import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/svg/backupCashlogo.svg";
import { ToastProvider } from 'react-toast-notifications';
import ResetPasswordForm from "../../Components/Auth/ResetPasswordForm/ResetPasswordForm";

class ResetPassword extends Component {

    state ={
        token:'',
    };

    retreiveToken =()=>{

        const token = this.props.match.params.token;
        console.log(token);
        this.setState({
            token:token
        });


    };

    componentDidMount() {

        this.retreiveToken();

    }

    render() {

        return (
            <React.Fragment>
                    <section className="login-background login-section">
                        <h3 className="welcome-text d-none d-md-block">Welcome <br/>Back</h3>
                        <div className="container">
                            <div className="row  pt-md-2">
                                <div className=" col-md-6 offset-md-6">
                                    {/*   header component */}
                                    <div className=" py-md-1 px-md-1 px-md-5 py-md-5 header-shadow mt-2 mb-md-5 bg-white">
                                        <img alt="" src={backUpCashLogo} width="200px"/>
                                    </div>
                                    <h3 className="mobile-welcome-text d-block d-md-none">Welcome <br/>Back</h3>
                                    <ToastProvider>
                                        <ResetPasswordForm token={this.state.token} />
                                    </ToastProvider>

                                </div>
                            </div>
                        </div>
                    </section>
            </React.Fragment>
        );

    }

}
export default ResetPassword;
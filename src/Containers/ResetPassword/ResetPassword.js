import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/Newlogo-02.png";
import { ToastProvider } from 'react-toast-notifications';
import ResetPasswordForm from "../../Components/Auth/ResetPasswordForm/ResetPasswordForm";
import {HomeLink} from "../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';
import {hideLoader} from "../../Helpers/Helper";

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
        hideLoader();
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
                                        <Link to={HomeLink}><img alt="" src={backUpCashLogo} width="200px"/></Link>
                                    </div>
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
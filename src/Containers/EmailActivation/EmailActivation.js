import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/svg/backupCashlogo.svg";
import {ToastProvider} from "react-toast-notifications";
import {ActivationRequest, request} from "../../ApiUtils/ApiUtils";
import {activateUserEndpoint, EmailActivationLink} from "../../RouteLinks/RouteLinks";
import ResendButton from "../../Components/Auth/ResendButton/ResendButton";
import queryString from 'query-string'


class EmailActivation extends Component {

    state= {

        token:null,
        message:'',
        loading:false,
        buttonMessage:'Click to Resend',
        resend:false,
    };


    // - user is taken to the activation page
    // -page calls api
    // - if token is expired inform user and tell them to click a 	button to resend
    // - else if token is activated take user to dashboard

    retreiveToken(){

        const values = queryString.parse(this.props.location.search)
        const token = values.token;
        this.setState({
            token:token,
            redirect:false,
            resend:false
        });

        return token;

    }

    callActivationEndpoint(url,token){




    };

    handleActivation = (state,response) => {

        if(state){

            console.log(response);
            this.setState({
                message:response.data.message
            })

        }else {

            console.log(response);

            this.setState({
                message:response.data.message
            });

            if(response.data.status_code === 401){

                this.setState({
                    resend:true
                });

                console.log(response);

            }
        }



    };


    componentDidMount() {

        // retreive token from url
        const token = this.retreiveToken();

        this.callActivationEndpoint(activateUserEndpoint,token);
        // call activation endpoint

        ActivationRequest(activateUserEndpoint,token,this.handleActivation);



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
                                        <div className="col-12 text-center">
                                            <h3 className="form-header-purple mb-5 text-center">{this.state.message}</h3>

                                            {this.state.resend?<ResendButton message={this.state.buttonMessage} loading={this.state.loading} />:null}
                                        </div>
                                </ToastProvider>

                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default EmailActivation;
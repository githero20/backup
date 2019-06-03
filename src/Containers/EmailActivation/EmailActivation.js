import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/svg/backupCashlogo.svg";
import {ToastProvider} from "react-toast-notifications";
import {ActivationRequest, request, setLocalStorage} from "../../ApiUtils/ApiUtils";
import {
    activateUserEndpoint,
    DashboardLink,
    EmailActivationLink,
    LoginLink,
    resendActEndpoint
} from "../../RouteLinks/RouteLinks";
import queryString from 'query-string'
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {ACTIVATIONMESG, USERTOKEN} from "../../Components/Auth/HOC/authcontroller";


class EmailActivation extends Component {

    state = {

        token:null,
        message:'',
        redirect:false,
        loading:false,
        buttonMessage:'Click to Resend',
        resend:false,
    };


    // - user is taken to the activation page
    // -page calls api
    // - if token is expired inform user and tell them to click a 	button to resend
    // - else if token is activated take user to dashboard




    handleActivation = (state,response) => {


        //success
        if(state){

            //save the token
            setLocalStorage(USERTOKEN,this.state.token);
            setLocalStorage(ACTIVATIONMESG,this.response.data.message);

            //redirect to dashboard
            this.setState({
                message:response.data.message,
                redirect :true
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

    retreiveToken =()=>{

        const search = queryString.parse(this.props.location.search);

        console.log(search.token);
        this.setState({
            token:search.token
        });

        return search;


    };



    componentDidMount() {

        // retreive token from url
        const token = this.retreiveToken();

        // call activation endpoint
        ActivationRequest(activateUserEndpoint,token,this.handleActivation);



    }


    resendActivationLink = () => {

        const param = {email:this.state.email};
        request(resendActEndpoint,param,false,true,this.handleResendActLink)

    };


    render() {

        if(this.state.redirect){

            return (
                <React.Fragment>
                    <Redirect to={DashboardLink}/>
                </React.Fragment>
            )
        }
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
                                            <Link to={LoginLink}>Go to Login</Link>
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
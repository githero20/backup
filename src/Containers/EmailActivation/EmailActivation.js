import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/Newlogo-02.png";
import {ToastProvider} from "react-toast-notifications";
import {ActivationRequest, request, setLocalStorage} from "../../ApiUtils/ApiUtils";
import {activateUserEndpoint, DashboardLink, HomeLink, LoginLink, resendActEndpoint} from "../../RouteLinks/RouteLinks";
import queryString from 'query-string'
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {ACTIVATIONMESG, USERINFO, USERTOKEN} from "../../Components/Auth/HOC/authcontroller";
import ButtonLoader from "../../Components/Auth/Buttonloader/ButtonLoader";


class EmailActivation extends Component {

    state = {
        token:null,
        message:'',
        redirect:false,
        loading:false,
        buttonMessage:'Resend link',
        resend:false,
        error:false,
    };


    // - user is taken to the activation page
    // -page calls api
    // - if token is expired inform user and tell them to click a 	button to resend
    // - else if token is activated take user to dashboard




    handleActivation = (state,response) => {

        //success
        if(state){
            //save the token
            if(response){
                setLocalStorage(USERTOKEN,this.state.token);
                setLocalStorage(USERINFO,response.data.data);

                //redirect to dashboard
                this.setState({
                    message:response.data.message,
                    redirect :true
                })

            }


        }else {

            if(response){

                console.log(response);

                this.setState({
                    message:'Something Went Wrong!',
                    error:true
                });

                if(response.data.status_code === 401){

                    this.setState({
                        resend:true
                    });

                    console.log(response);

                }

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
        const param = this.retreiveToken();
        console.log(param.token);
        // call activation endpoint
        ActivationRequest(activateUserEndpoint,param.token,this.handleActivation);

    }


    resendActivationLink = () => {
        this.setState({
            loading:true
        })
        const param = {email:this.state.email};
        request(resendActEndpoint,param,false,'POST',this.handleResendActLink)

    };

    handleResendActLink = (state, response) => {

        const {toastManager} = this.props;

        if (state) {

            console.log(response);
            if(response){

                toastManager.add(`${response.data.message}`, {
                    appearance: 'success',
                });
                setTimeout(()=>{ this.setState({
                    redirect: true
                })},3000);
            }


        } else {

            if (response) {
                console.log(response.data);
                toastManager.add(`${response.data.error}`, {
                    appearance: 'error',
                });
            }

        }

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
                                    <Link to={HomeLink}><img alt="" src={backUpCashLogo} width="200px"/></Link>
                                </div>
                                <h3 className="mobile-welcome-text d-block d-md-none">Welcome <br/>Back</h3>
                                <ToastProvider>
                                        <div className="col-12 text-center">
                                            <h3 className="form-header-purple mb-5 text-center">{this.state.message}</h3>
                                            {/*<Link to={LoginLink}>Go to Login</Link>*/}
                                            {/*{ this.state.error ? <button onClick={this.resendActivationLink} className='btn-light-blue auth-btn round'>*/}
                                            {/*    {this.state.loading?<ButtonLoader/>:<span>Resend Link</span>}*/}
                                            {/*</button>:null}*/}
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
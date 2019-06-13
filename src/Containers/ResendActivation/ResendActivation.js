import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/Logo.png";
import {ToastProvider, withToastManager} from 'react-toast-notifications';
import ButtonLoader from "../../Components/Auth/Buttonloader/ButtonLoader";
import {request} from "../../ApiUtils/ApiUtils";
import {HomeLink, resendActEndpoint} from "../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';

class ResendActivation extends Component {

    state = {
        loading: false,
    };

    constructor(props){
        super(props);
        console.log("Email from other place", this.props.location.state.email);
    }


    resendActivationLink = () => {
        console.log("email",  this.props.location.state.email);
        this.setState({loading:true});
        const param = {email: this.props.location.state.email};
        request(resendActEndpoint, param, false, "POST", this.handleResendActLink)

    };


    handleResendActLink = (state, response) => {

        const {toastManager} = this.props;
        this.setState({
            loading:false
        })

        if (state) {

            console.log(response);

            toastManager.add(`${response.data.message}`, {
                appearance: 'success',
                autoDismiss:true,
                autoDismissTimeout:4000,
            });


        } else {

            if (response) {
                console.log(response);
                toastManager.add(`${response.data.error}`, {
                    appearance: 'error',
                });
            }

        }

    };


    render() {

        return (
            <React.Fragment>
                <section className="login-background login-section">
                    <h3 className="welcome-text d-none d-md-block">Welcome <br/>Back</h3>

                    <div id="timeline-wrap">
                        <div id="timeline">
                        </div>

                        {/*// <!-- This is the individual marker-->*/}
                        <div className="marker mfirst timeline-icon  text-center">
                            <div className="circular-icon ">1</div>
                            <label>Create <br/> Account</label>
                        </div>
                        {/*// <!-- / marker -->*/}

                        {/*// <!-- This is the individual marker-->*/}
                        <div className="marker mlast timeline-icon  text-center">
                            <div className="circular-icon active">2</div>
                            <label>Activate Account</label>
                        </div>
                        {/*// <!-- / marker -->*/}
                    </div>

                    <div className="container">
                        <div className="row  pt-md-2">
                            <div className=" col-md-6 offset-md-6">
                                {/*   header component */}
                                <div className=" py-md-1 px-md-1 px-md-5 py-md-5 header-shadow mt-2 mb-md-5 bg-white">
                                    <Link to={HomeLink}><img alt="" src={backUpCashLogo} width="200px"/></Link>
                                </div>
                                <h3 className="mobile-welcome-text d-block d-md-none">Welcome <br/>Back</h3>
                                    <div className="login-form">
                                        <div className="row text-center">
                                            <div className="col-12">
                                                {/*provide breadcrumb to go back*/}
                                                <h1>Almost there...</h1>
                                                <h3>Please check your email to confirm your account</h3>
                                                <hr/>
                                            </div>

                                            <div className="col-12">
                                                <div className={'mt-lg-2'}>
                                                    <p className={'mb-lg-2 text-gray'}>No confirmation email received? Please check your spam folder or</p>
                                                    <button type={'button'} onClick={this.resendActivationLink}
                                                            className=" act-btn "
                                                            name="action">{this.state.loading ? <ButtonLoader/> :
                                                        <span>Request new confirmation email</span>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );

    }

}

export default withToastManager(ResendActivation);
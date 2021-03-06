import React, {Component} from 'react';
import backUpCashLogo from "../../admin/app-assets/images/svg/logo.svg";
import EmailIcon from "../../images/svg/email-icon.svg";
import {withToastManager} from 'react-toast-notifications';
import ButtonLoader from "../../Components/Auth/Buttonloader/ButtonLoader";
import {request} from "../../ApiUtils/ApiUtils";
import {HomeLink, resendActEndpoint} from "../../RouteLinks/RouteLinks";
import {Link} from 'react-router-dom';
import {hideLoader} from "../../Helpers/Helper";

class ResendActivation extends Component {

    state = {
        loading: false,
    };

    constructor(props) {
        super(props);
    }


    resendActivationLink = () => {

        if (this.props.location.state) {
            this.setState({loading: true});
            const param = {email: this.props.location.state.email};
            request(resendActEndpoint, param, false, "POST", this.handleResendActLink)
        }

    };


    handleResendActLink = (state, response) => {

        const {toastManager} = this.props;
        this.setState({
            loading: false
        });

        if (state) {

            console.log(response);

            toastManager.add(`${response.data.message}`, {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 4000,
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

    componentDidMount() {
        hideLoader();
    }

    render() {

        return (
            <React.Fragment>
                <section className="login-background login-section">
                    <h3 className="welcome-text d-none d-md-block">Welcome <br/>Back</h3>

                    {/*<div id="timeline-wrap">*/}
                    {/*    <div id="timeline">*/}
                    {/*    </div>*/}


                    {/*    <div className="marker mfirst timeline-icon  text-center">*/}
                    {/*        <div className="circular-icon ">1</div>*/}
                    {/*        <label>Create <br/> Account</label>*/}
                    {/*    </div>*/}


                    {/*    <div className="marker mlast timeline-icon  text-center">*/}
                    {/*        <div className="circular-icon active">2</div>*/}
                    {/*        <label>Activate Account</label>*/}
                    {/*    </div>*/}

                    {/*</div>*/}

                    <div className="container">
                        <div className="row">
                            <div className=" col-md-5 offset-md-6">
                                {/*   header component */}
                                <div className=" py-md-1 px-md-1 header-shadow mt-2 mb-md-5 bg-white">
                                    <Link to={HomeLink}><img alt="" src={backUpCashLogo} width="200px"/></Link>
                                </div>
                                <h3 className="mobile-welcome-text d-block d-md-none">Welcome <br/>Back</h3>
                                <div className="login-form">
                                    <div className="row text-center">
                                        <div className="col-12">
                                            {/*provide breadcrumb to go back*/}
                                            <img className='mb-lg-1' src={EmailIcon} alt="inbox icon"/>
                                            <h1>Just one more step</h1>
                                            <p className='gray-text mb-lg-3'>Please check your email to confirm your account</p>
                                            <hr/>
                                        </div>

                                        <div className="col-12">
                                            <div className={'mt-lg-2'}>
                                                <p>No confirmation email received?</p>
                                                <p className={'mb-lg-2 gray-text'}>Please check your spam folder or click the button below.</p>
                                                <button type={'button'} onClick={this.resendActivationLink}
                                                        className="btn-custom-blue round auth-btn "
                                                        name="action">{this.state.loading ? <ButtonLoader/> :
                                                    <span>Resend email</span>}
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
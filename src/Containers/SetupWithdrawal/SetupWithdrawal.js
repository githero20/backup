import React, {Component} from 'react';
import secureIcon from "../../admin/app-assets/images/svg/secure-sign-icon.svg";
import backUpCashLogo from "../../admin/app-assets/images/Logo@2x.png";
import {ToastProvider} from "react-toast-notifications";
import {Link} from "react-router-dom";
import {HomeLink} from "../../RouteLinks/RouteLinks";
import SetupWithdrawalForm from "../../Components/Auth/SetupWithdrawalForm/SetupWithdrawalForm";
import {getListOfBanks} from "../../actions/BankAction";
import queryString from "query-string";
import {hideLoader} from "../../Helpers/Helper";


class SetupWithdrawal extends Component {

    state={
        banks:[],
        token:'',
    };

    componentDidMount() {
        hideLoader();
        getListOfBanks((status, payload) =>{
            if(status){this.setState({banks:payload})}
        });
        // retreive token from url
        this.retreiveToken();
    }

    retreiveToken = () =>{
        const search = queryString.parse(this.props.location.search);
        this.setState({token:search.token});
        //retreive token from redirect
        if(this.props.location.state){
            this.setState({token:this.props.location.state.token})
        }
    };



    render() {
        return (
            <React.Fragment>
                        <section className="sign-up-background login-section">
                                <h3 className="welcome-text d-none d-md-block">Welcome! </h3>
                                <div className="secure-section">
                                    <img src={secureIcon} /> &nbsp;
                                    <span>Your Sign Up is Secure</span>
                                </div>
                                <div className="container px-2 px-md-0">
                                    <div className="row pt-1">
                                        <div className="col-md-6 offset-md-6">
                                            {/*header component */}
                                            <div className="px-md-2 py-md-2 header-shadow mt-2 mb-md-5 bg-white">
                                                <Link to={HomeLink}><img alt="" src={backUpCashLogo} width="200px"/></Link>
                                            </div>
                                            <h3 className="mobile-welcome-text d-block d-md-none">Welcome <br/>Back</h3>
                                            <ToastProvider>
                                                <SetupWithdrawalForm {...this.props} token={this.state.token} banks={this.state.banks}/>
                                            </ToastProvider>
                                        </div>
                                    </div>
                                </div>
                        </section>
            </React.Fragment>
        );
    }
}
export default SetupWithdrawal;
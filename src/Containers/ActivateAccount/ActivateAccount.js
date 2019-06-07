import React, {Component} from 'react';
import secureIcon from "../../admin/app-assets/images/svg/secure-sign-icon.svg";
import backUpCashLogo from "../../admin/app-assets/images/Logo.png";
import ActivationForm from "../../Components/Auth/ActivationForm/ActivationForm";
import EmailModal from "../../Components/Auth/EmailModal/EmailModal";
import SecureLS from "../../Components/Auth/SignUpForm/SignUpForm";


class ActivateAccount extends Component {

    state = {
        key: "pk_test_a59d1204944c01bf05330ab59fb1abe607eb36a6",
        email: "",
        contribution: 0 ,
        submitted:false
    };


    //Retrieves user inputs
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        //copy states object
        const data =  {...this.state.activationData};
        data[name]=value;

        //get select data

        //manipulate object and set the state object

        this.setState({
            activationData: data
        });
    };


    initiateTransaction = () => {

        //get token from local storage
        const user = localStorage.getItem('user');

        //get


    };


    storeRef = (ref) => {
        if(ref!==null){
            localStorage.setItem('paystackRef',JSON.stringify(ref));
            console.log(JSON.parse(localStorage.getItem('paystackRef')));
        }

    };



    callback = (response) => {

        console.log(response);
        // // card charged successfully, get reference here
        this.storeRef(response);

        // redirect to dashboard
        this.setState({
            completed:true
        });

    };


    close = () => {
        console.log("Payment closed");
        this.setState({
            restart:true,
        })

    };


    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };


    //submit activation form
    submitForm = () => {

        if (this.validator.allValid()) {

            //retreive user email
            const email = this.retrieveUserEmail();


            //call activation end with token
            this.setState({
                email,
                submitted:true,
            });


        } else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }
    };


    retrieveUserEmail = ()=>{

        const user = JSON.parse(localStorage.getItem('user'));

        if(user!==null){
            return user.email;
        }

    };




    calculateAmount(amount){
        return parseInt(amount)*100;
    }


    componentDidMount() {

        console.log(localStorage.getItem('user'));
    }

    render(){

        return (
            <React.Fragment>

                    {/*// <!-- login section-->*/}
                    <section className="sign-up-background login-section">
                        <h3 className="welcome-text d-none d-md-block">Welcome, <br/>Start Saving Now!</h3>
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

                        <div className="secure-section"><img src={secureIcon} alt="secure sign up"/>
                            &nbsp;<span>Your Sign Up is Secure</span></div>
                        <div className="row pt-md-2">
                            <div className="col-md-5 offset-md-6">
                                {/*// <!--  header component          -->*/}
                                <div className="px-3 py-3 px-md-5 py-md-5 header-shadow mt-2 mb-5 bg-white">
                                    <img src={backUpCashLogo} width="200px" alt={'logo'} />
                                </div>
                                    <ActivationForm  />
                            </div>
                        </div>
                    </section>
                <EmailModal/>

            </React.Fragment>
        );
    }



}
export default ActivateAccount;
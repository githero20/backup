import React, {Component} from 'react';
import btnArrowRight from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from 'simple-react-validator';
import {Link, Redirect} from 'react-router-dom';
import Axios from "axios";
import {
    DashboardLink,
    initiateSteadySaveEndpoint,
    SignUpLink,
    verifyTransactionEndpoint
} from "../../../RouteLinks/RouteLinks";
import {PayStackKey} from "../../../Info/Info";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {api} from "../../../ApiUtils/ApiUtils";
import {DASHBOARDINFO, USERINFO, USERTOKEN} from "../HOC/authcontroller";

class ActivationForm extends Component {



    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            activationData: {
                title:'steady savings',
                hour_of_day:'12',
                start_date:this.getTodaysDate(),
                frequency: 'daily',
                token:'',
                source:'auto save',
                email: "",
                contribution: '',
            },
            submitted: false,
            restart:false,
            completed:false,
            loading:false,
        }

    }






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
        const user = localStorage.getItem(USERINFO);


    };


    storeRef = (ref) => {

        if(ref!==null){
            localStorage.setItem('paystackRef',JSON.stringify(ref));
            console.log(JSON.parse(localStorage.getItem('paystackRef')));
        }

    };



    storeActivationData =()=>{
        const data = JSON.stringify(this.state.activationData);
        localStorage.setItem('activationData',data);
    };




    callback = (response) => {

        // // card charged successfully, get reference here
        this.storeRef(response);
        this.redirectToDashBoard();

    };



    redirectToDashBoard(){
        // redirect to dashboard
        this.setState({
            completed:true
        });

    }
    handleSavings = (state,response) =>{

        if(state){
            this.setState({
                loading:false
            });
            console.log(response);
            //save ref
            localStorage.setItem('refDetail',JSON.stringify(response.data.data));

            //start payment
            const {contribution,email} = this.state.activationData;
            console.log(response.data.reference);
            this.payWithPaystack(email,contribution,PayStackKey,response.data.data.reference);

        }else{
            console.log(`request failed: ${JSON.stringify(response.data)}`);
            this.setState({
                error: true,
                errorMessage: JSON.stringify(response.data),
                loading: false
            });
        }

    };



    initiateSave = (url) => {

        this.setState({
            loading:true,
        });


        api(url,this.state.activationData,true,true,this.handleSavings);


    };


    saveRef = (ref)=>{
        if(ref!==null){
            localStorage.setItem('ref',ref);
            return true
        }
        return false

    };


    saveDashboardInfo = (data) => {
        localStorage.setItem(DASHBOARDINFO,JSON.stringify(data));
    };


    handleVerification = (state,res) => {

        if(state){

            //save dashboard info
            this.saveDashboardInfo(res.data);

            // do a login

            //redirect user to dashboard
            this.redirectToDashBoard();
        }else {

            console.log(`request failed: ${JSON.stringify(res.data)}`);
            this.setState({
                error: true,
                errorMessage: JSON.stringify(res.data),
                loading: false
            });

        }
    };



    verifyTransaction = (url,param,token) =>{

        api(url,param,token,true,this.handleVerification);


    };


    payWithPaystack = (email,amount,key,ref) => {


        const handler = window.PaystackPop.setup({
            key: key,
            email: email,
            amount: this.calculateAmount(amount),
            currency: "NGN",
            ref: ref,
            channels:['card'],
            metadata: {
                custom_fields: [
                    {
                        display_name: "Mobile Number",
                        variable_name: "mobile_number",
                        value: "+2348012345678"
                    }
                ]
            },

            callback: (response)=>{

                    let param = {
                        type:'steady_save',
                        ref:response.reference
                    };

                    console.log(response);

                let token = localStorage.getItem(USERTOKEN);

                    this.verifyTransaction(verifyTransactionEndpoint,param,token);

            },

            onClose: function(){


            }
        });


        handler.openIframe();

    };




    //submit activation form
    submitForm = () => {

        if (this.validator.allValid()) {

            //retrieve user email
            const userEmail = this.retrieveUserEmail();

            const data = {...this.state.activationData};

            data.email = userEmail;


            //call activation end with token
            this.setState({
                activationData:data,
            },() => {

                this.initiateSave(initiateSteadySaveEndpoint);

            });


        } else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }
    };



    retrieveUserEmail = ()=>{

        if(localStorage.getItem(USERINFO)){
            const user = JSON.parse(localStorage.getItem(USERINFO));
            if(user!==null){
                return user.email;
            }
        }else {
            return null;
        }

    };


    getTodaysDate () {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

       return   yyyy + '-' + mm + '-' + dd  ;
    }


    calculateAmount(amount){
        return parseInt(amount)*100;
    }



    //Validates inputs

    render() {

        const {title,start_date,hour_of_day,contribution,frequency} = this.state.activationData;
        const {restart,completed} = this.state;



        if(restart){
            return (
                <React.Fragment>
                    <Redirect to={SignUpLink} push/>
                </React.Fragment>
            );
        }



        if(completed){

            return (
                <React.Fragment>
                    <Redirect to={DashboardLink} push/>
                </React.Fragment>
            );

        }

        return (
            <React.Fragment>
                <form className="login-form px-5 px-md-2">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="form-header-purple mb-md-3">Start Saving Now</h5>
                            <p className="gray-text mb-5 mb-md-5">Start Saving from<strong> N500 </strong></p>
                        </div>
                        <div className="col-12 col-lg-12">
                            <div className="form-group mb-lg-3">
                                <label htmlFor="contribution" className="active">Amount To Debit</label>
                                <input id="amount" type="number" name={'contribution'} onChange={this.changeHandler} className="form-control"/>
                                {this.validator.message('contribution', contribution, 'required|numeric')}

                            </div>
                        </div>
                        <div className="col-12 col-lg-6">

                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect2">Frequency</label>
                                <select className="form-control" value={frequency} onChange={this.changeHandler} name={'frequency'} id="frequency">
                                    <option  value={'daily'} >Daily</option>
                                </select>
                                {this.validator.message('frequency', frequency, 'required|string')}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect2">Hour of the Day</label>
                                <select className="form-control" value={hour_of_day} onChange={this.changeHandler} name={'hour_of_day'} id="hour">
                                    <option  value={'1'} >1:00am</option>
                                    <option  value={'2'} >2:00am</option>
                                    <option  value={'3'} >3:00am</option>
                                    <option  value={'4'} >4:00am</option>
                                    <option  value={'5'} >5:00am</option>
                                    <option  value={'6'} >6:00am</option>
                                    <option  value={'7'} >7:00am</option>
                                    <option  value={'8'} >8:00am</option>
                                    <option  value={'9'} >9:00am</option>
                                    <option  value="12">12:00noon</option>
                                    <option  value="13">1:00pm</option>
                                    <option  value="14">2:00pm</option>
                                    <option  value="15">3:00pm</option>
                                    <option  value="16">4:00pm</option>
                                    <option  value="17">5:00pm</option>
                                    <option  value="18">6:00pm</option>
                                    <option  value="19">7:00pm</option>
                                    <option  value="20">8:00pm</option>
                                    <option  value="21">9:00pm</option>
                                    <option  value="22">10:00pm</option>
                                    <option  value="23">11:00pm</option>
                                    <option  value="24">12:00am</option>
                                </select>

                                {this.validator.message('hour_of_day', hour_of_day, 'required|numeric')}

                            </div>
                        </div>

                        <div className="col-12 text-center text-md-right mb-3 mb-md-0">
                            <div className="text-md-right mb-2 pr-md-2">
                                <label className="font-size-1-1 mb-1 mt-1">
                                    Returning User ?
                                    <Link className="blue-link " to={'/login'}>&nbsp; Sign In</Link>
                                </label>
                            </div>
                        </div>
                        <div className="col-md-12 text-center text-md-right ">
                            <div>
                                <button className="btn btn-round blue-round-btn auth-btn"  type={'button'} onClick={this.submitForm}>
                                   {this.state.loading?<ButtonLoader/>:
                                        <span>Activate <img className="img-2x ml-2" src={btnArrowRight} alt={'btn arrow right'}/></span>}
                                </button>

                            </div>
                        </div>

                    </div>
                </form>
            </React.Fragment>
        );
    }

}

export default ActivationForm;




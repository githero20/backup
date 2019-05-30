import React, {Component} from 'react';
import btnArrowRight from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from 'simple-react-validator';
import {Link, Redirect} from 'react-router-dom';
import { DatePicker } from 'antd';

// import PaystackButton from 'react-paystack';


class ActivationForm extends Component {



    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            activationData: {
                savingsName:'',
                hour:'',
                currentDate:'',
                frequency: 'daily',
                token:'',
                key: "pk_test_a59d1204944c01bf05330ab59fb1abe607eb36a6",
                email: "",
                amount: 0 ,
            },
            submitted: false,
            restart:false,
            completed:false,
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
        const user = localStorage.getItem('user');


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



     payWithPaystack = (email,amount,key) => {
         console.log(email,amount,key);
        const handler = window.PaystackPop.setup({
            key: key,
            email: email,
            amount: amount,
            currency: "NGN",
            ref: ''+Math.floor((Math.random() * 1000000000) + 1),
            metadata: {
                custom_fields: [
                    {
                        display_name: "Mobile Number",
                        variable_name: "mobile_number",
                        value: "+2348012345678"
                    }
                ]
            },
            callback: function(response){
                alert('success. transaction ref is ' + response.reference);
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

                console.log(this.state.activationData);

                const {amount,email,key} = this.state.activationData;

                this.payWithPaystack(email,amount,key);

            });


        } else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }
    };




    retrieveUserEmail = ()=>{

        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user.email);
        if(user!==null){
            return user.email;
        }

    };




    calculateAmount(amount){
        return parseInt(amount)*100;
    }





    //Validates inputs

    render() {
        const {savingsName,currentDate,hour,amount,frequency,email,key} = this.state.activationData;
        const {submitted,restart,completed} = this.state;



        if(restart){
            return (
                <React.Fragment>
                    <Redirect to={'/sign-up'} push/>
                </React.Fragment>
            );
        }



        if(completed){

            return (
                <React.Fragment>
                    <Redirect to={'/dashboard'} push/>
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
                                <label htmlFor="savingsName" className="active">Savings Name</label>
                                <input id="savingsName" name={'savingsName'} onChange={this.changeHandler} type="text" className="form-control"/>
                                {this.validator.message('savingsName', savingsName, 'required|string')}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group mb-lg-3">
                                <label htmlFor="currentDate" className="active">Current Date</label>
                                <input id="currentDate" name={'currentDate'} onChange={this.changeHandler} type="date" className="form-control"/>
                                {this.validator.message('currentDate', currentDate, 'required|string')}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group mb-lg-3">
                                <label htmlFor="currentDate" className="active">Current Date</label>
                                    <DatePicker style={{display:'block'}}/>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group mb-lg-3">
                                <label htmlFor="amount" className="active">Amount To Debit</label>
                                <input id="amount" type="number" name={'amount'} onChange={this.changeHandler} className="form-control"/>
                                {this.validator.message('amount', amount, 'required|numeric')}

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
                                <input id="currentDate" name={'hour'} onChange={this.changeHandler} type="time" className="form-control"/>
                                {this.validator.message('hour', hour, 'required|string')}

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
                        <div className="col-md-6 text-center text-md-right offset-md-6">
                            <div className="text-md-right">
                                <button className="btn btn-round blue-round-btn"  type={'button'} onClick={this.submitForm} name="action">Activate
                                    <img className="img-2x ml-2" src={btnArrowRight} alt={'btn arrow right'}/>
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




import React, {Component} from 'react';
import btnArrowRight from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from 'simple-react-validator';
import {Link, Redirect} from 'react-router-dom';
import {
    DashboardLink,
    initiateSteadySaveEndpoint,
    SignUpLink,
    verifyTransactionEndpoint
} from "../../../RouteLinks/RouteLinks";
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {api} from "../../../ApiUtils/ApiUtils";
import {DASHBOARDINFO, USERINFO, USERTOKEN} from "../HOC/authcontroller";
import {_handleFormChange} from "../../../utils";

class ActivationForm extends Component {



    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            activationData: {
                title:'steady savings',
                hour_of_day:'12',
                day_of_month: '1',
                day_of_week: '1',
                start_date:this.getTodaysDate(),
                frequency: 'daily',
                token:'',
                source:'auto save',
                email: "",
                contribution: '',
            },
            showMonth: false,
            showDay: false,
            showHour: true,
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
        const form =  _handleFormChange(
            event.target.name,
            event,
            this
        );
        //copy states object
        const data =  {...this.state.activationData};
        data[name]=value;

        //get select data
        this.handleFrequencySelect(form);

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
            //save ref
            localStorage.setItem('refDetail',JSON.stringify(response.data.data));

            //start payment
            const {contribution,email} = this.state.activationData;
            this.payWithPaystack(email,contribution,process.env.REACT_APP_PAYSTACK_KEY,response.data.data.reference);

        }else{
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

        if(localStorage.getItem(USERINFO)!=undefined){
            const user = JSON.parse(localStorage.getItem(USERINFO));
            if(user!==null){
                return user.email;
            }
        }else {
            return null;
        }

    };

    handleFrequencySelect(form){
        if(form.frequency === "daily"){
            const data = {...this.state.activationData};

            data.frequency = 'daily';
            this.setState({
                showMonth: false,
                showDay: false,
                showHour: true,
                activationData: data
            });
        }
        else if(form.frequency === "weekly"){
            // form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"weeks") * form.contribution) || 0;
            const data = {...this.state.activationData};

            data.frequency = 'weekly';
            this.setState({
                showMonth: false,
                showDay: true,
                showHour: true,
                activationData: data
            });
        }else if(form.frequency === "monthly"){
            // form.goal_amount = (_calculateDateDifference(form.start_date, form.maturity_date,"months") * form.contribution) || 0;
            const data = {...this.state.activationData};

            data.frequency = 'monthly';
            this.setState({
                showMonth: true,
                showDay: false,
                showHour: true,
                activationData: data
            })
        }

        // console.log("Form", form);
    }

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
        const {title,start_date,hour_of_day,day_of_month,day_of_week,contribution,frequency} = this.state.activationData;
        const {restart,completed} = this.state;

        const showHour = (
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
        );
        const showMonth = (
            <div className="col-12 col-lg-6">
                <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">Day of the Month</label>
                    <select defaultValue={day_of_month}  className='form-control' onChange={this.changeHandler}  id="day_of_month" name={'day_of_month'}>
                    <option value={'1'}>1</option>
                    <option value={'2'}>2</option>
                    <option value={'3'}>3</option>
                    <option value={'4'}>4</option>
                    <option value={'5'}>5</option>
                    <option value={'6'}>6</option>
                    <option value={'7'}>7</option>
                    <option value={'8'}>8</option>
                    <option value={'9'}>9</option>
                    <option value={'10'}>10</option>
                    <option value={'11'}>11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    </select>
                    {this.validator.message('day_of_month', day_of_month, 'required|numeric')}
                 </div>
            </div>
        );

        const showDay = (
            <div className="col-12 col-lg-6">
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">Day of the Week</label>
                    <select defaultValue={day_of_week}  className='form-control' onChange={this.changeHandler} id="day_of_the_week" name="day_of_the_week">
                    <option value={'1'}>Mon</option>
                    <option value={'2'}>Tue</option>
                    <option value={'3'}>Wed</option>
                    <option value={'4'}>Thur</option>
                    <option value={'5'}>Fri</option>
                    <option value={'6'}>Sat</option>
                    <option value={'7'}>Sun</option>
                    </select>
                {this.validator.message('day_of_week', day_of_week, 'required|numeric')}
                </div>
            </div>
        );





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
                            <h5 className="form-header-purple mb-md-1">Start Saving Now</h5>
                            <p className="gray-text mb-5 mb-md-5">Settings here can be changed when you are logged in</p>
                        </div>
                        <div className="col-12 col-lg-12">
                            <div className="form-group mb-lg-3">
                                <label htmlFor="contribution" className="active">Amount To Debit</label>
                                <input id="amount" type="number" placeholder={`e.g 500`} name={'contribution'} onChange={this.changeHandler} className="form-control"/>
                                {this.validator.message('contribution', contribution, 'required|numeric')}

                            </div>
                        </div>
                        <div className="col-12 col-lg-6">

                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect2">Frequency</label>
                                <select className="form-control" value={frequency} onChange={this.changeHandler} name={'frequency'} id="frequency">
                                    <option  value={'daily'} >Daily</option>
                                    <option value={'weekly'}>Weekly</option>
                                    <option value={'monthly'}>Monthly</option>
                                </select>

                                {this.validator.message('frequency', frequency, 'required|string')}
                            </div>
                        </div>

                        {this.state.showHour ? showHour :null}
                        {this.state.showDay ? showDay: null}
                        {this.state.showMonth ? showMonth: null}

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
                                <button className="btn btn-round blue-round-btn auth-btn" disabled={this.state.loading} type={'button'} onClick={this.submitForm}>
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




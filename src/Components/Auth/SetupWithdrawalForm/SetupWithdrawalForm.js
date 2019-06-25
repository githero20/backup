import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import btnArrowRight from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from 'simple-react-validator';
import ButtonLoader from "../Buttonloader/ButtonLoader";
import {RegisterEndpoint, ResendActivationLink} from "../../../RouteLinks/RouteLinks";
import {api} from "../../../ApiUtils/ApiUtils";
import {USERINFO, USERTOKEN} from "../HOC/authcontroller";
import {withToastManager} from 'react-toast-notifications';
import {getListOfBanks, resolveBankName, sendBankOTP} from "../../../actions/BankAction";
import Form from "react-bootstrap/Form";
import {_handleFormChange} from "../../../utils";
import {setupWithdrawal} from "../../../actions/setupWithdrawalAction";
import queryString from "query-string";

class SetupWithdrawalForm extends Component {


    //get the user from url

    // set user info in the localstorage

    // setup form


    // on blur verify user account

    // get all banks





    //validator
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            messages: {
                email: 'Please provide a valid Email.',
                name: 'Please fill in your first name.',
                last_name: 'Please fill in your last name.',
                phone: 'The phone number must match the required pattern (080********)',
                password: 'Password must contain at least one lowercase letter, one uppercase letter , one number and must be a minimum of 8 characters',
            },
            // validators: {
            //     password: {  // name the rule
            //         message: 'The :attribute must be a valid IP address and must be :values.',
            //         rule: (val, params, validator) => {
            //             return validator.helpers.testRegex(val,/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
            //         },
            //         messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
            //         required: true  // optional
            //     }
            // }

        });

        this.state = {
            form:{
                bank_code:'',
                account_number:'',
                bank_name:'',
                withdrawal_pin:'',
                bank:'',
                pin_one:'',
                pin_two:'',
                pin_three:'',
                pin_four:'',
            },
            resolved: false,
            token:'',
            loading: false,
            redirect: false,
        };

        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    //get token from url

    //get all inputs

    //validate inputs

    // on blur get user bank name and display the confirmation name

    //get all pin concatenate and set as withdrawal pin

    // post to withdrawal endpoint

    // redirect to dashboard

    //else display error



    validateInput = (e) => {
        if(e.target.value.length > 0 && e.keyCode !== 46 && e.keyCode !== 8 ){
            e.preventDefault();
        }
    };


    handleChange(e){
        this.setState({resolved:false});
        _handleFormChange(e.target.name,e, this);

        //handle concatenation of pin
        this.handlePinConcatenation(e.target.name,e);
        this.getUserBank(e.target.name,e);
    };


    handlePinConcatenation = (name, event, callback = null) => {
        let form = {...this.state.form};
        form[name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        if(name=='pin_one'||name=='pin_two'||name=='pin_three'||name=='pin_four'){
            form['withdrawal_pin']+=event.target.value;
        }
        this.setState({form});
        console.log('withdrawal pin', form['withdrawal_pin']);
        if(callback != null){
            callback();
        }
        return form;
    }

        getUserBank = (name, event, callback = null) => {
            let form = {...this.state.form};
            form[name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

            if( name=='account_number' &&event.target.value.length===10){
                form['withdrawal_pin']+=event.target.value;
            }
            this.setState({form});
            console.log('withdrawal pin', form['withdrawal_pin']);
            if(callback != null){
                callback();
            }
            return form;
        }



    validateForm(e){
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // this.props.toastManager("An Error Occured");
            // rerender to show messages for the first time
            this.forceUpdate();
        }else{
            this.setState({loading:true});
            //send api
            const {form} = this.state;
            const bank = this.props.banks.find(bank => bank.code == form.bank_code);
            form.bank = `${bank.name}.${bank.code}`;

            //send all details

            console.log('submitted form',form);
            setupWithdrawal(form,this.state.token,(status, payload) => {
                this.setState({loading:false});
                if(status){
                    console.log(payload);
                    // this.props.showOtp(payload);
                    //TODO handle response and redirect

                }else{
                    this.props.toastManager.add(payload,{
                        appearance:"error",
                        autoDismiss:true,
                        autoDismissTimeout:3000
                    })
                }
            });
        }
    };

    resolveAccountNumber(e){
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        }
        else{
            this.setState({loading:true});
            //send api
            const {form} = this.state;
            resolveBankName(form.account_number, form.bank_code,(status, payload) => {
                if(status){
                    let form = this.state.form;
                    form.account_name = payload.account_name;
                    this.setState({loading:false, resolved:true, form});
                }else{
                    this.setState({loading:false});
                    this.props.toastManager.add(payload,{
                        appearance:"error",
                        autoDismiss:true,
                        autoDismissTimeout:3000
                    })
                }
            });
        }
    }

    saveToLocalStorage = (user, token) => {

        if (user && token) {

            localStorage.setItem(USERINFO, JSON.stringify(user));
            localStorage.setItem(USERTOKEN, token);

            this.setState({
                redirect: true
            })
        }
    };






    getSignUpInfo = (state, response) => {

        const {toastManager} = this.props;

        this.setState({
            loading: false
        });

        if (!state) {
            console.log('error');
            if (response) {
                console.log(`request failed: ${JSON.stringify(response)}`);
                this.setState({
                    error: true,
                    errorMessage: JSON.stringify(response.data.message),
                    loading: false
                });

                if (response.data) {
                    console.log(response.data.errors);
                    let errors = response.data.errors;
                    let errorData = Object.values(errors);
                    errorData.map((err, idx) => {
                        return (
                            toastManager.add(`${err}`, {
                                appearance: 'error',
                                index: idx,
                                autoDismiss: true,
                                autoDismissTimeout: 3000,
                            })
                        )
                    });

                }

            }
            // else{
            //     toastManager.add("No Internet Connection.", {
            //         appearance: 'error',
            //         autoDismiss:true,
            //         autoDismissTimeout:3000,
            //     })
            // }
        } else {
            if (response) {
                const serverResponse = response.data;
                const token = serverResponse.token;
                const user = serverResponse.user;
                this.saveToLocalStorage(user, token);
                this.setState({
                    redirect: true
                });
            }

        }
    };


    //submit sign up form
    submitForm = () => {
        if (this.validator.allValid()) {
            //validate confirm password

            // // perform all necessary validation
            // const ConfPassValid = this.validatePasswords(this.state.password_confirmation);
            // const PassVal = this.validatePassword();
            // console.log(ConfPassValid, PassVal);
            // if (ConfPassValid && PassVal) {
            //     //    make api call
            //     this.setState({
            //         loading: true
            //     });
            //
            //     this.signUp(RegisterEndpoint, this.state, this.getSignUpInfo);
            //
            // }


        } else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }

    };


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            token:nextProps.token
        });
    }

    render() {

        const { bank_name,account_number} = this.state.form;
        const { pin_one, pin_two, pin_three, pin_four} = this.state;

        const {referralCode} = this.props;

        if (this.state.redirect) {


            // Activate account with paystack

            // return (
            //     <React.Fragment>
            //         <Redirect to={ActivateAccountLink} push/>
            //     </React.Fragment>
            // );
            //
            return (
                <React.Fragment>
                    {/*<Redirect to={ResendActivationLink} />*/}
                    <Redirect push to={{
                        pathname: `${ResendActivationLink}`,
                        state: {email: this.state.email}
                    }}

                    />
                </React.Fragment>
            );
        }

        const banksSelect = this.props.banks.map((bank,index) => {
            return(
                <option key={index} value={bank.code}>{bank.name}</option>
            );
        });

        return (
            <React.Fragment>
                <form className="login-form " onSubmit={this.validateForm}>
                    <div className="row">
                        <div className="col-12">
                            <h5 className="form-header-purple mb-5">Add Wthdrawal Bank</h5>
                            {/*{this.state.error ?*/}
                            {/*    <Alert message={this.state.errorMessage} hideError={this.hideError}/> : null}*/}
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="bank_code">Bank Name: </label>
                                <select className={'form-control'} value={this.state.form.bank_code} onChange={this.handleChange}
                                        name="bank_code">
                                    <option value={""}>Select Bank</option>
                                    {banksSelect}
                                </select>
                                {this.validator.message("Bank Name",this.state.form.bank_code,"required|numeric")}
                            </div>
                        </div>


                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="name">Account Number</label>
                                <input id="account_number" type="number" name={'account_number'}
                                       className={'form-control text-capitalize'}
                                       onChange={this.handleChange}/>
                                {this.validator.message('Account Number', account_number, 'required|numeric|size:10')}
                            </div>
                        </div>

                        <div className="col-12 ">
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Verify User </label>
                                <input id="verify_user" name={'verify_user'} type="text" className={'form-control'}
                                       // onChange={this.changeHandler}
                                />
                                {/*{this.validator.message('phone', phone, 'required|phone|regex:^[0]\\d{10}$')}*/}
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="password">Add Pin</label>
                                <div><span className='srv-validation-message'>Please Set your pin </span></div>
                                <div className="row">
                                    <div className="col-3">
                                        <input id="pin_one" type="number" name={'pin_one'}
                                               className={'form-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />
                                        {this.validator.message('pin_one', pin_one, `required|numeric|max:1`)}

                                    </div>
                                    <div className="col-3">
                                        <input id="pin_two" type="number" name={'pin_two'}
                                               className={'form-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />
                                        {this.validator.message('pin_two', pin_two, `required|numeric|max:1`)}

                                    </div>
                                    <div className="col-3">
                                        <input id="pin_three" type="number" name={'pin_three'}
                                               className={'form-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />
                                        {this.validator.message('pin_three', pin_three, `required|numeric|max:1`)}

                                    </div>
                                    <div className="col-3">
                                        <input id="pin_four" type="number" name={'pin_four'}
                                               className={'form-control'}
                                               onChange={this.handleChange}
                                               onKeyUp={this.validateInput}
                                               onKeyDown={this.validateInput}
                                        />
                                        {this.validator.message('pin_four', pin_four, `required|numeric|max:1`)}

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 text-center text-md-right ">
                            <div>
                                <button type={'submit'}
                                        className=" btn btn-round blue-round-btn auth-btn">
                                    {this.state.loading ? <ButtonLoader/> :
                                        <span>Add Bank<img alt="" className="img-2x ml-1" src={btnArrowRight}/></span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}


export default withToastManager(SetupWithdrawalForm);

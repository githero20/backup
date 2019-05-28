import React, {Component} from 'react';
import btnArrowRight from "../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import SimpleReactValidator from 'simple-react-validator';
import {Link} from 'react-router-dom';


class ActivationForm extends Component {



    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            showReferralInput:false,
            formControls: {

                savingsName: {
                    value: ''
                },
                amount: {
                    value: ''
                },
                hour: {
                    value: ''
                },
                currentDate: {
                    value: ''
                },
                frequency: {
                    value: ''
                }
            },
            submitted: false
        }

    }




    //Retrieves user inputs
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    };

    //handleSelect input
    handleSelectInput = event =>{

        const selectedIndex = event.nativeEvent.target.selectedIndex;
        const selectText = event.nativeEvent.target[selectedIndex].text

        this.setState({
            formcontrols:{

            }
        })
    }

    //submit activation form
    submitForm = () => {
        console.log(this.state.formControls);
        if (this.validator.allValid()) {

            alert('yes form submitted');

        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    };

    //Validates inputs

    render() {
        const {savingsName,currentDate,hour,amount,frequency} = this.state.formControls;
        return (
            <React.Fragment>
                <form className="login-form px-5 px-md-2">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="form-header-purple mb-md-3">Start Saving Now</h5>
                            <p className="gray-text mb-5 mb-md-5">Start Saving from<strong> N500 </strong></p>
                        </div>
                        <div className="col-12 col-lg-12">
                            <div className="input-field mb-lg-3">
                                <input id="savingsName" name={'savingsName'} onChange={this.changeHandler} type="text" className="form-control"/>
                                {this.validator.message('savingsName', savingsName.value, 'required|string')}
                                <label htmlFor="savingsName" className="active">Savings Name</label>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="input-field mb-lg-3">
                                <label htmlFor="currentDate" className="active">Current Date</label>
                                <input id="currentDate" name={'currentDate'} onChange={this.changeHandler} type="date" className="form-control"/>
                                {this.validator.message('currentDate', currentDate.value, 'required|string')}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="input-field mb-lg-3">
                                <input id="amount" type="number" name={'amount'} onChange={this.changeHandler} className="form-control"/>
                                <label htmlFor="amount" className="active">Amount To Debit</label>
                                {this.validator.message('amount', amount.value, 'required|numeric')}

                            </div>
                        </div>
                        <div className="col-12 col-lg-6">

                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect2">Frequency</label>
                                <select className="form-control" onChange={this.changeHandler} name={'frequency'} id="frequency">
                                    <option defaultValue={true} value={'daily'} >Daily</option>
                                </select>
                                {this.validator.message('frequency', frequency.value, 'required|string')}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect2">Hour of the Day</label>
                                <input id="currentDate" name={'hour'} onChange={this.changeHandler} type="time" className="form-control"/>
                                {this.validator.message('hour', hour.value, 'required|string')}

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




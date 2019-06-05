import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import SimpleReactValidator from "simple-react-validator";
import {getLocalStorage, request, setLocalStorage} from "../../../../ApiUtils/ApiUtils";
import {
    getUserInfoEndpoint,
    instantSaveEndpoint,
    lockedSavingEndpoint,
    verifyTransactionEndpoint
} from "../../../../RouteLinks/RouteLinks";
import {USERACTIVATED, USERINFO, USERTOKEN} from "../../../Auth/HOC/authcontroller";
import {withToastManager} from "react-toast-notifications";
import ButtonLoader from "../../../Auth/Buttonloader/ButtonLoader";
import signInIcon from "../../../../admin/app-assets/images/svg/btn-arrow-right-icon.svg";
import {handleLeastAmount} from "../../../../actions/instantSaveAction";
import {ADD_CARD} from "../../../../Helpers/Helper";


class InstantSavingForm extends Component {




    state = {

        instantSaveInfo: {
            amount: 500,
            payment_auth: null,
            source:'quick',
        },
        loading:false,
        userCards: [],

    };


    constructor(props) {

        super(props);

        this.validator = new SimpleReactValidator({
            validators: {
                payment_auth: {  // name the rule
                    message: 'Please Select a card',
                    required:true
                }
            }
        });

    }

    handleAddNewCard = () => {






    }


    //submit steady save form
    submitForm = (e) => {


        e.preventDefault();


        if (this.validator.allValid()) {
            this.setState({
                loading:true,
            })

            request(instantSaveEndpoint, this.state.instantSaveInfo, true, 'POST', this.HandleInstantSave);


        } else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }



    };


    //handle response
    HandleInstantSave = (state, response) => {

        this.setState({
            loading:false,
        });
        const { toastManager } = this.props;

        if(state){
            if(response.status===200){
                toastManager.add(`${JSON.stringify('You have successfully created an Instant Save')}`, {
                    appearance: 'success',
                });

                //hide modal
                setTimeout(()=>{
                    this.props.onHide();

                    //updateInstantSaveTable
                    this.props.updateInstantSave();

                    },2000);




            }


        }else{

            if(response){
                console.log(JSON.stringify(response));
                toastManager.add(`${JSON.stringify(response.data.message)}`, {
                    appearance: 'error',
                });
            }

        }


    };



    //Retrieves user inputs
    changeHandler = event => {
        const name = event.target.name;
        let value = event.target.value;

        //handle least instant save amount
        // value = handleLeastAmount(name,value);
        //copy states object
        const data = {...this.state.instantSaveInfo};
        data[name] = value;

        //get select data

        //manipulate object and set the state object

        this.setState({
            instantSaveInfo: data
        });


    };


    componentDidMount() {

        //get pay auths
        const userInfo = JSON.parse(getLocalStorage(USERINFO));

        if (JSON.parse(getLocalStorage(USERINFO))) {
            this.setState({
                userCards: userInfo.authorization.data
            })

        }


    }

    resetFormFields = () => {

        let data = this.state.instantSaveInfo;
            data.amount=0;
            data.payment_auth=-1;

            this.setState({
                instantSaveInfo:data
            })

    }

    addNewCard = () => {

        if(getLocalStorage(USERINFO)){

            console.log(getLocalStorage(USERINFO));
            if (getLocalStorage(USERACTIVATED)) {
                let status = JSON.parse(getLocalStorage(USERACTIVATED));
                 if (status === true) {
                    console.log('got here to retrieve it ');
                    let data = JSON.parse(getLocalStorage(USERINFO));

                    console.log(data);


                }
            }
        }

        // const handler = window.PaystackPop.setup({
        //     key: key,
        //     email: email,
        //     amount: this.calculateAmount(amount),
        //     currency: "NGN",
        //     ref: ref,
        //     channels:['card'],
        //     metadata: {
        //         custom_fields: [
        //             {
        //                 display_name: "Mobile Number",
        //                 variable_name: "mobile_number",
        //                 value: "+2348012345678"
        //             }
        //         ]
        //     },
        //
        //     callback: (response)=>{
        //
        //         let param = {
        //             type:'steady_save',
        //             ref:response.reference
        //         };
        //
        //         console.log(response);
        //
        //         let token = localStorage.getItem(USERTOKEN);
        //
        //         this.verifyTransaction(verifyTransactionEndpoint,param,token);
        //
        //     },
        //
        //     onClose: function(){
        //
        //
        //     }
        // });
        //
        //
        // handler.openIframe();

    };




    render() {
        const {payment_auth, amount} = this.state.instantSaveInfo;
            if(this.state.instantSaveInfo.payment_auth===ADD_CARD){

                this.addNewCard();
            }
        return (
            <React.Fragment>
                <Form onSubmit={this.submitForm}>

                    <Form.Row>
                            <Col>
                                <Form.Group className={'mt-md-1 mb-md-3'}>
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control type="number" name={'amount'} step={5} min={500} max={1000} id={'amount'} value={amount} onChange={this.changeHandler} />
                                    {this.validator.message('amount', amount, 'required|numeric')}

                                </Form.Group>
                            </Col>
                    </Form.Row>

                    {/*slider */}
                    <div className="row ">
                        <div className="col ">
                            <Form.Group className={'mt-md-1 mb-md-3'}>
                                <div className="slidecontainer">
                                    <input type="range" min="1" step={5} max="10000" value={amount} onChange={this.changeHandler} className="slider mt-1-md mb-3-md" name={'amount'} id="amountSlider"/>
                                </div>
                            </Form.Group>
                        </div>
                    </div>


                    <Form.Row >
                        <Col className={'mt-md-1 mb-md-3'}>
                            <Form.Group>
                                <Form.Label>Debit Card</Form.Label>
                                <Form.Control as="select"   onChange={this.changeHandler} defaultValue={payment_auth} id={'payment_auth'}
                                              name={'payment_auth'}>
                                    <option value={-1} >Select Card</option>
                                    <option value={0} >Add New Card</option>
                                    {/* loop through and get the number of accounts user has */}
                                    {
                                        this.state.userCards.length > 0 ?

                                            this.state.userCards.map((data, index) => {
                                                return (
                                                    <option value={data.id} key={data.id}>{data.card_type}</option>
                                                );

                                            })
                                            : null
                                    }

                                </Form.Control>
                                {this.validator.message('payment_auth', payment_auth, 'required|numeric')}

                            </Form.Group>


                        </Col>
                    </Form.Row>



                    <Form.Row className={'d-flex justify-content-between mt-2'}>
                        <div>
                            <Button onClick={this.resetFormFields} className={'mr-1 round reset-btn'}>Reset All</Button>
                        </div>
                        <div className={'d-flex justify-content-end'}>
                            <Button onClick={this.props.onHide} className={'mr-1 round btn-outline-gray'}>Close</Button>
                            <Button  className={'round btn-custom-blue modal-btn'} type="submit">
                                {this.state.loading?<ButtonLoader/>:
                                    <span>Start Saving</span>}

                            </Button>
                        </div>

                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}

const InstantSaveFormToast = withToastManager(InstantSavingForm);

export default InstantSaveFormToast;
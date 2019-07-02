import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider, withToastManager} from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import totalBalanceIcon from "../../../admin/app-assets/images/svg/total-balance-icon.svg";
import {request} from "../../../ApiUtils/ApiUtils";
import {getUserInfoEndpoint, instantSaveEndpoint, TransferToVault} from "../../../RouteLinks/RouteLinks";
import {formatNumber, STANDARD_ACCOUNT} from "../../../Helpers/Helper";
import SimpleReactValidator from "simple-react-validator";


function getBalance(state,res){


}


class TransferToCentralVaultModal extends Component {


    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            validators: {
                amount: {  // name the rule
                    message: 'Please Input the Amount',
                }
            }
        });
    }

    state={
        amount:0,
        loading:false,
        disableBtn:false
    }

    //get the vault the balance from users central vault


    //display balance


    //Retrieves user inputs
    changeHandler = event => {

        const name = event.target.name;
        let value = event.target.value;


        this.setState({
            [name]: value
        });
    };



    submit = () =>{

        if (this.validator.allValid()) {
            this.setState({
                loading: true,
                disableBtn:true
            });

            request(TransferToVault,this.state,true,'POST',this.handleRequest);

        } else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }


    }



    handleRequest = (status,res) =>{

        this.setState({
            loading:false,
            disableBtn:false
        });

        const {toastManager} = this.props;

        if (status) {
            if (res.status === 200) {
                toastManager.add(`You have successfully transferred ${this.state.amount} to your stash`, {
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                });
                // this.props.onHide();

                //hide modal
                setTimeout(() => {
                    this.props.onHide(true);
                }, 1000);
            }
        } else {
            if (res) {
                console.log(JSON.stringify(res));
                toastManager.add(`${JSON.stringify(res.data.message)}`, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }

    }



    render() {
        const {amount} = this.state;
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'instant-save-modal steady-save-modal'}>

                <Modal.Header className={' px-md-3 py-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Transfer to Central Vault</h4>
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        <Form>
                            <div className={'row'}>
                                <Col>
                                    <div className="media d-flex pb-2 pb-md-5">
                                        <div className="align-self-center">
                                            <img className="blue-card-icon" src={totalBalanceIcon}/>
                                        </div>
                                        <div className="media-body text-left pt-1 ">
                                            <h3>
                                                <strong className="blue-card-price ml-2 mr-2">
                                                    <strong>₦</strong> {this.props.stashBalance}
                                                </strong>
                                            </h3>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                            <div className={'row'}>
                                <Col>
                                    <Form.Group className={'mt-md-1 mb-md-3'}>
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="number" placeholder={'amount'} name={'amount'} id={'amount'}
                                                      defaultValue={''} onChange={this.changeHandler}/>
                                        {this.validator.message('Amount', amount, 'required|numeric')}
                                    </Form.Group>
                                </Col>
                            </div>
                            <Form.Row className={'d-flex justify-content-center justify-content-md-end mt-2'}>
                                <button className={'round btn-custom-blue auth-btn modal-btn'} onClick={this.submit} disabled={this.state.loading} type="button">
                                    {this.state.loading ? <ButtonLoader/> :
                                        <span>Transfer</span>}
                                </button>
                            </Form.Row>
                        </Form>
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }


}

export default withToastManager(TransferToCentralVaultModal);
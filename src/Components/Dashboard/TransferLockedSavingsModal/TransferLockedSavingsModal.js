import React from 'react';
import Modal from "react-bootstrap/Modal";
import {ToastProvider} from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import totalBalanceIcon from "../../../admin/app-assets/images/svg/total-balance-icon.svg";


class TransferLockedSavingsModal extends React.Component {


    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={'instant-save-modal steady-save-modal'}
            >
                <Modal.Header className={' px-md-3 py-md-3'} closeButton={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Transfer to Locked Saving</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'pb-md-4 px-md-3'}>
                    {/* form */}
                    <ToastProvider>
                        <div>
                            <div className={'row'}>
                                <Col>
                                    <div className="media d-flex pb-2 pb-md-5">
                                        <div className="align-self-center">
                                            <img className="blue-card-icon" src={totalBalanceIcon}/>
                                        </div>
                                        <div className="media-body text-left pt-1 ">
                                            <h3>
                                                <strong className="blue-card-price ml-2 mr-2">
                                                    <strong>₦</strong> 0.00
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
                                    </Form.Group>
                                </Col>
                            </div>
                            <Form.Row className={'d-flex justify-content-center justify-content-md-end mt-2'}>
                                <button className={'round btn-custom-blue modal-btn'} type="submit">
                                    {/*{this.state.loading ? <ButtonLoader/> :*/}
                                        {/*<span>Start Saving</span>}*/}
                                    <span>Transfer </span>
                                </button>
                            </Form.Row>
                        </div>
                    </ToastProvider>
                </Modal.Body>
            </Modal>
        );
    }
}

export default TransferLockedSavingsModal;
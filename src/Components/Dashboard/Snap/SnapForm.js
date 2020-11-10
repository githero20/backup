import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import { formatNumber } from "../../../Helpers/Helper";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import { _payWithPaystack } from "../../../utils";
import { createSnapRequest, initSnapRequest, resetState, verifySnapRequest, getSnapRequest } from '../../../redux/snap/action'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const SnapForm = (props) => {
  const { minSaving } = props;
  const [amount, setAmount] = useState(0)
  const [itemSelected, setItemSelected] = useState('Select Card')
  const { errors, data, processing } = useSelector(state => state.snap.pay);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetState());
    if (itemSelected === "Select Card") {
      toast.error("Please select an option", { autoClose: 3000 })
    } else if (itemSelected === "Add Card") {
      if (amount < minSaving) {
        toast.error(`Amount must be ${minSaving}`, { autoClose: 3000 })
      } else {
        dispatch(initSnapRequest({
          amount: parseFloat(amount),
          source: 'quick',
        }));
      }
    } else {
      dispatch(createSnapRequest({ amount, payment_auth_id: itemSelected }));
    }
  };
  // runs this form is opened
  useEffect(() => {
    dispatch(resetState());
  }, []);

  // runs when ever the error changes
  useEffect(() => {
    if (errors) {
      toast.error(errors, { autoClose: 3000 });
    }
  }, [errors]);

  const changeHandler = (e) => {

    if (e.target.value === "Add Card") {
      if (amount < minSaving) {
        toast.error(`Amount must be ${minSaving} `, { autoClose: 3000 })
      } else {
        dispatch(resetState());
        dispatch(initSnapRequest({
          amount: parseFloat(amount),
          source: 'quick',
        }));
      }
    }
    setItemSelected(e.target.value);
    // else {
    //   setItemSelected(e.target.value);
    // }
  }


  useEffect(() => {
    if (data.reference) {
      _payWithPaystack(data.reference, amount, resolvePaystackResponse)
    }
    const successMessage = "Snap Successfully created";
    if (data === successMessage) {
      toast.success(successMessage, { autoClose: 3000 });
      props.hideModal();
      
      setTimeout( ()=> {
        window.location.reload();
      }, 1000)
    }
  }, [data]);

  const validator = new SimpleReactValidator({
    validators: {
      payment_auth: {  // name the rule
        message: 'Please Select a card',
        required: 'Please Select a card'
      }
    }
  });
  const resolvePaystackResponse = (response) => {
    dispatch(verifySnapRequest({
      reference: response.reference,
      amount
    }));
  }
  return (
    <div>
      <Form className={'is-modal-form'} onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Group className={'mt-md-1 mb-md-3'}>
              <Form.Label className='d-block'>
                Amount <span className='amount-display round float-right text-white px-1'>
                  ₦ {formatNumber(Number(amount).toFixed(2))}
                </span>
              </Form.Label>
              <Form.Control type="number" placeholder={500} name={'amount'} id={'amount'}
                value={amount} onChange={(e) => setAmount(e.target.value)} />
              {validator.message('amount', amount, 'required|numeric')}
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className={'mt-md-1 mb-md-3'}>
            <Form.Group>
              <Form.Label>Debit Card</Form.Label>
              <Form.Control as="select"
                onChange={changeHandler} value={itemSelected}>
                <option value={-1}>Select Card</option>
                <option value={"Add Card"}>Add Card</option>
                {
                  props.userCards && props.userCards.length > 0 ?
                    props.userCards.map((data, index) => {
                      return (
                        <option value={`${data.id}`} key={data.id}>
                          [{data.card_type.toUpperCase()} **** **** **** {data.last4}]
                                        [exp: {data.exp_month}/{data.exp_year}]
                        </option>
                      );
                    })
                    : null
                }
              </Form.Control>
              {/* validator.message('payment_auth', payment_auth, 'required|numeric')*/}
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className={'d-flex justify-content-center justify-content-md-end mt-2 '}>
          <button className={'round btn-custom-blue modal-btn btn-disabled'} disabled={processing}
            type="submit">
            {processing ? <ButtonLoader /> : <span>Start Saving</span>}
          </button>
        </Form.Row>
      </Form>
    </div>
  )
}

export default SnapForm;

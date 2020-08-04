import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import { formatNumber } from "../../../Helpers/Helper";
import ButtonLoader from "../../Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import { getUserCards } from '../../../actions/CardAction';
import { initTransaction } from "../../../actions/CardAction";
import { _payWithPaystack } from "../../../utils";
import { toastMessage } from "../../../Helpers/Helper";
import { createSnapRequest, initSnapRequest, resetState, verifySnapRequest } from '../../../redux/snap/action'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const SnapForm = (props) => {
  const [amount, setAmount] = useState(0)
  const [itemSelected, setItemSelected] = useState('Select Card')
  const [userCards, setUserCards] = useState([]);
  const { errors, data, processing } = useSelector(state => state.snap);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetState());
    dispatch(createSnapRequest({ amount, payment_auth_id: itemSelected }));
  }
  // runs when ever the error changes
  useEffect(() => {
    if (errors) {
      toast.error(errors, { autoClose: 3000 });
      // dispatch(resetState());
    }
  }, [errors]);

  const changeHandler = (e) => {
    if (e.target.value === "Add Card") {
      dispatch(resetState());
      dispatch(initSnapRequest({
        amount: parseFloat(amount),
        source: 'quick',
      }));
    } else {
      setItemSelected(e.target.value)
    }
  }
  useEffect(() => {
    getUserCards((status, data) => {
      if (status) {
        setUserCards(data)
      } else {
        toast.error("Unable to fetch Cards", { autoClose: 3000 });
      }
    });
  },
    //eslint-disable-next-line
    []);
  useEffect(() => {
    if (data.reference) {
      _payWithPaystack(data.reference, amount, resolvePaystackResponse)
    }
    const successMessage = "Snap Successfully created";
    if (data === successMessage) {
      toast.success(successMessage, { autoClose: 3000 });
      props.hideModal();
      // dispatch(resetState());
    }
  }, [data]);

  const loading = false;
  const payment_auth = '123';
  const validator = new SimpleReactValidator({
    validators: {
      payment_auth: {  // name the rule
        message: 'Please Select a card',
        required: 'Please Select a card'
      }
    }
  });

  const initiatePayStack = () => {
    //send api
    if (amount == null || parseFloat(amount) < 100) {
      toastMessage('A minimum of ₦100 is required to add a card', 'error', this)
    } else {
      initTransaction({
        amount: parseFloat(amount),
        source: 'quick',
      },
        (status, payload) => {
          // this.setState({ loading: false });
          if (status) {
            _payWithPaystack(payload.reference, payload.amount, resolvePaystackResponse)
          } else {
            console.log('error with paystack', payload);
          }

          // this.props.onHide();
        });
    }


  }


  const resolvePaystackResponse = (response) => {
    dispatch(verifySnapRequest({
      reference: response.reference,
      amount
    }));
    // verifyTransaction({
    //   ref: response.reference,
    //   type: "instant"
    // }, (status, payload) => {
    //   if (status) {
    //     toastMessage('Card Added Successfully', 'success', this);
    //     this.getUserCards();
    //   } else {
    //     toastMessage('Unable to add card at this moment', 'error', this);
    //   }
    // })

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
                  userCards && userCards.length > 0 ?
                    userCards.map((data, index) => {
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
              {validator.message('payment_auth', payment_auth, 'required|numeric')}
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className={'d-flex justify-content-center justify-content-md-end mt-2'}>
          <button className={'round btn-custom-blue modal-btn'} disabled={loading}
            type="submit">
            {processing ? <ButtonLoader /> : <span>Start Saving</span>}
          </button>
        </Form.Row>
      </Form>
    </div>
  )
}

export default SnapForm;

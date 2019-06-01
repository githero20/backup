import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";


class SteadySaveForm extends Component {


    state = {




    };



    //validate form



    // submit form



    //call api



    //handle response





    render() {
        return (
            <React.Fragment>
                <Form >
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Plan Name</Form.Label>
                        <Form.Control type="text" name={'title'} id={'title'} />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name={'start_date'} id={'start_date'}  />
                        </Form.Group>

                        <Form.Group as={Col} controlId="maturity_date">
                            <Form.Label>Maturity Date</Form.Label>
                            <Form.Control type="date" name={'maturity_date'} id={'maturity_date'} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}  controlId="account_to_debit">
                            <Form.Label>Account to Debit</Form.Label>
                            <Form.Control as="select" >
                                {/* loop through and get the number of accounts user has */}
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group  as={Col}  controlId="frequency">
                            <Form.Label>Frequency </Form.Label>
                            {/*select Box */}
                            <Form.Control as="select" >
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} type="text" controlId="hour_of_the_day">
                            <Form.Label>Hour of the day</Form.Label>
                            <Form.Control as="select" >
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
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} sm={6} controlId="formGridCity">
                            <Form.Label>Contribution</Form.Label>
                            <Form.Control type="number" />
                            <Form.Text className="text-muted">
                                Contribution range daily [ &#8358; 50 - &#8358; 25000]
                            </Form.Text>
                        </Form.Group>

                    </Form.Row>
                    <Form.Row className={'d-flex justify-content-between mt-2'}>
                        <div>
                            <Button onClick={this.props.onHide} className={'mr-1 round reset-btn'}>Reset All</Button>
                        </div>
                        <div className={'d-flex justify-content-end'}>
                            <Button onClick={this.props.onHide} className={'mr-1 round btn-outline-gray'}>Close</Button>
                            <Button  className={'round btn-custom-blue '} type="button"  >
                                Start Saving
                            </Button>
                        </div>

                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}

export default SteadySaveForm;
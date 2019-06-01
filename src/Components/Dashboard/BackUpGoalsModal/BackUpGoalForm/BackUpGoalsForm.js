import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";


class BackUpGoalsForm extends Component {


    //handle reset click


    //handle start savings


    render() {
        return (
            <React.Fragment>
                <Form >
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Plan Name</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date"  />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Maturity Date</Form.Label>
                            <Form.Control type="date"  />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>Account to Debit</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group  as={Col}  controlId="formGridAddress2">
                            <Form.Label>Frequency </Form.Label>
                            {/*select Box */}
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group as={Col} type="text" controlId="formGridAddress2">
                            <Form.Label>Hour of the day</Form.Label>
                            {/*Select box */}
                            <Form.Control type="time" />
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
                            <Button className={'mr-1 round reset-btn '}>Reset All</Button>
                        </div>
                        <div className={'d-flex justify-content-end'}>
                            <Button onClick={this.props.onHide} className={'mr-1 round btn-outline-gray'}>Close</Button>
                            <Button  className={'round btn-custom-blue '} type="submit">
                                Start Saving
                            </Button>
                        </div>

                    </Form.Row>

                </Form>
            </React.Fragment>
        );
    }
}

export default BackUpGoalsForm;
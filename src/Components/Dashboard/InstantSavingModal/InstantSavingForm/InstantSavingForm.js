import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";


class InstantSavingForm extends Component {


    state = {




    };


    render() {
        return (
            <React.Fragment>
                <Form >

                    <Form.Row>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Plan Name</Form.Label>
                            <Form.Control type="text"  />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Example multiple select</Form.Label>
                            <Form.Control as="select" multiple>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
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

export default InstantSavingForm;
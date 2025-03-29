import {useEffect, useState} from 'react';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';

const BankDetails = () => {
    // Default state for user details
    const [userDetails, setUserDetails] = useState({
        name: 'John Doe',
        accountNumber: '123456789',
        email: 'johndoe@email.com',
        phone: '555-1234',
        address: {
            street: '123 Main St',
            city: 'Springfield',
            state: 'IL',
            zip: '62701'
        }
    });

    // Handle changes to form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in userDetails.address) {
            setUserDetails((prevState) => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [name]: value
                }
            }));
        } else {
            setUserDetails((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    useEffect(() => {
        const fetch = async () => {

        }
    })
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Details submitted successfully!');
        console.log(userDetails);
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>
                    <h2>Bank Account Details</h2>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={6} controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={userDetails.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6} controlId="accountNumber">
                                <Form.Label>Account Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="accountNumber"
                                    value={userDetails.accountNumber}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md={6} controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={userDetails.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6} controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={userDetails.phone}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <h4>Address Details</h4>
                            <Form.Group as={Col} md={6} controlId="street">
                                <Form.Label>Street Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="street"
                                    value={userDetails.address.street}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6} controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={userDetails.address.city}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md={6} controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="state"
                                    value={userDetails.address.state}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6} controlId="zip">
                                <Form.Label>ZIP Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="zip"
                                    value={userDetails.address.zip}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default BankDetails;

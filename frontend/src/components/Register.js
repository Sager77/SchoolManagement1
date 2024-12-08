import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const RegisterUser = () => {
    const initialUserState = {
        username: '',
        userid: '',
        cardno: '',
        StudenNO: '', // Ensure correct case is used here
        category: 'Safety Professional',
        issueDate: '',
        endDate: '',
        userimage: null 
    };

    const [user, setUser] = useState(initialUserState);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setUser({ ...user, [id]: files ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in user) {
            formData.append(key, user[key]);
        }

        try {
            const response = await fetch( `${process.env.API_URL}/users`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                setSuccessMessage("User registered successfully!");
                setErrorMessage('');
                setUser(initialUserState);
            } else {
                const errorData = await response.json();
                setSuccessMessage('');
                if (errorData.error && errorData.error.toLowerCase().includes('already exists')) {
                    setErrorMessage('User already exists!');
                } else {
                    setErrorMessage('Failed to register user. Please try again.');
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            setSuccessMessage('');
            setErrorMessage('An error occurred. Please enter valid credentials');
        }
    };

    return (
        <Container className="my-5 p-5 shadow w-75">
            <h1>Register Student</h1>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control
                                id="username"
                                value={user.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control
                                id="userid"
                                value={user.userid}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                id="cardno"
                                value={user.cardno}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Student Number</Form.Label>
                            <Form.Control
                                id="StudenNO"
                                value={user.StudenNO}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                id="category"
                                value={user.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="Safety Professional">Safety Professional</option>
                                <option value="Inspection Certificate">Inspection Certificate</option>
                                <option value="NDT Certificate">NDT Certificate</option>
                                <option value="Calibration Certificate">Calibration Certificate</option>
                                <option value="Training Certificate">Training Certificate</option>
                                <option value="Competency Certificate">Competency Certificate</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Student Image</Form.Label>
                            <Form.Control
                                id="userimage"
                                type="file"
                                onChange={handleChange}
                                accept="image/*"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Issue Date</Form.Label>
                            <Form.Control
                                id="issueDate"
                                type="date"
                                value={user.issueDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                id="endDate"
                                type="date"
                                value={user.endDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit">Create Account</Button>
            </Form>
        </Container>
    );
};

export default RegisterUser;

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const RegisterUser = () => {
    const initialUserState = {
        username: '',
        userid: '',
        cardno: '',
        StudenNO: '',
        category: 'Training Certificate',
        issueDate: '',
        endDate: '',
        userimage: null
    };

    const [user, setUser] = useState(initialUserState);
    const [categories, setCategories] = useState([
        'Training Certificate',
        'Competency Assessment Card',
        'Equipment Inspection Certificate',
        'Calibration Certificate',
        'NDT Testing Certificate',
        'ISO Certification Course',
        'Safety Professionals Course',
    ]);
    const [additionalCategory, setAdditionalCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setUser({ ...user, [id]: files ? files[0] : value });
    };

    const handleAddCategory = () => {
        if (additionalCategory && !categories.includes(additionalCategory)) {
            setCategories([...categories, additionalCategory]);
            setUser({ ...user, category: additionalCategory });
            setAdditionalCategory('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in user) {
            formData.append(key, user[key]);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
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
                setErrorMessage(errorData.error || 'Failed to register user. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setSuccessMessage('');
            setErrorMessage('An error occurred. Please try again.');
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
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Or Add More Categories</Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    id="additionalCategory"
                                    value={additionalCategory}
                                    onChange={(e) => setAdditionalCategory(e.target.value)}
                                    placeholder="Add new category"
                                />
                                <Button
                                    type="button"
                                    variant="outline-secondary"
                                    onClick={handleAddCategory}
                                    className="ms-2"
                                >
                                    Add
                                </Button>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
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
                <Button type="submit">Create Student</Button>
            </Form>
        </Container>
    );
};

export default RegisterUser;

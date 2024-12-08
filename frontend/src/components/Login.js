import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const LoginRegister = ({ onLogin }) => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Handle login form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError(''); // Reset error

        try {
            const response = await fetch(`${process.env.API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginUsername, password: loginPassword }),
            });

            const data = await response.json();
            console.log("Login response: ", JSON.stringify(data));

            if (response.ok) {
                // Call onLogin when login is successful
                onLogin(); // This is where onLogin is called, passed down as a prop
            } else {
                setLoginError(data.error || 'Invalid Username or Password.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('An error occurred. Please try again.');
        }
    };

    return (
        <Container className="my-5 p-5 shadow-lg w-50">
            <Row>
                <Col md={12}>
                    <h2>Login</h2>
                    {loginError && <Alert variant="danger">{loginError}</Alert>}
                    <Form onSubmit={handleLoginSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button type="submit">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginRegister;

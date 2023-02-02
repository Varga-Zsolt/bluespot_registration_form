import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [apiError, setApiError] = useState("");
    const [response, setResponse] = useState("");
    const [validationErrors, setvalidationErrors] = useState({
        email: null,
        password: null,
        bio: null
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setvalidationErrors({
            email: null,
            password: null,
            bio: null
        });
        setApiError("");
        setResponse("");

        if(validateForm()) {
            callAPI();
        }
    };

    const validateForm = () => {
        let valid = true;
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!passwordPattern.test(password)) {
            setvalidationErrors((prevState) => {
                return {...prevState, password: 'Too weak password'}
            })

            valid = false;
        }

        if(!emailPattern.test(email)) {
            setvalidationErrors((prevState) => {
                return {...prevState, email: 'Not valid email address'}
            })

            valid = false;
        }

        if(bio.length < 5 || bio.length > 100) {
            setvalidationErrors((prevState) => {
                return {...prevState, bio: 'Bio should contain at least 5  and maximum 100 characters'}
            })

            valid = false;
        }

        return valid;
    }

    const callAPI = async () => {
        try {
            const response = await fetch('/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    bio: bio,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setResponse(data.message);
            } else {
                setApiError(data.message)
            }

        } catch (error) {
            setApiError(error.message);
        }
    };

    return (
        <Form className="mx-auto"  onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            {
                validationErrors.email &&
                (
                    <Alert variant="danger">
                         {validationErrors.email}
                    </Alert>
                )
            }

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password </Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text className="text-muted">
                    At least
                    one lowercase letter,
                    one uppercase letter,
                    one digit,
                    one special character (@, $, !, %, *, ?, &)
                    and minimum length of 8 characters
                </Form.Text>
            </Form.Group>
            {
                validationErrors.password &&
                (
                    <Alert variant="danger">
                        {validationErrors.password}
                    </Alert>
                )
            }
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    required
                    as="textarea"
                    value={bio}
                    placeholder="Tell us something about you"
                    onChange={(e) => setBio(e.target.value)}
                />
                <Form.Text className="text-muted">
                    Minimum 5 maximum 100 characters
                </Form.Text>
            </Form.Group>
            {
                validationErrors.bio &&
                (
                    <Alert variant="danger">
                        {validationErrors.bio}
                    </Alert>
                )
            }
            {apiError && (
                <Alert variant="danger">
                    {apiError}
                </Alert>
            )}

            {response && <Alert variant="success">{response}</Alert>}

            <Button type="submit">Submit</Button>
        </Form>
    );
}
export default RegistrationForm;

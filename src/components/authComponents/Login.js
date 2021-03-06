import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { colors } from '../../styles/colors';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/project-cars');
        } catch {
            setError('Failed to log in!');
        }
        setLoading(false);

    }

    return (
        <>
            <Card className="loginCard">
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 loginCardBtn" type="submit" variant="outline-dark">Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/project-cars/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/project-cars/signup">Sign up</Link>
                    </div>
                </Card.Body>
            </Card>
            <style jsx>{`
                .loginCard{
                    background: transparent;
                    color:  ${colors.color};
                    border-color: ${colors.color};
                }

                .loginCard input{
                    border-color: ${colors.color};
                }

                .loginCard input,
                .loginCard input:focus{
                    background: transparent;
                    color: #fff;
                }

                .loginCard hr{
                    background-color: ${colors.color};
                }

                .loginCard a{
                    color: #fff;
                }

                .loginCardBtn{
                    border-color: ${colors.color};
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }
                .loginCardBtn:hover{
                    background-color: #000;
                    border-color: ${colors.color};
                }

            `}</style>
        </>
    )
}

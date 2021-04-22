import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { colors } from '../../styles/colors';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('We have sent you an email with instructions! Check it!');
        } catch {
            setError('Failed to reset the password!');
        }
        setLoading(false);

    }

    return (
        <>
            <Card className="forgotPassCard">
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 forgorPassBtn" type="submit" variant="outline-dark">Reset Password</Button>
                    </Form>
                    <hr></hr>
                    <div className="w-100 text-center mt-2">
                        <Link to="/project-cars/login">Login</Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/project-cars/signup">Sign up</Link>
                    </div>
                </Card.Body>
            </Card>
            <style jsx>{`
                .forgotPassCard{
                    background: transparent;
                    color:  ${colors.color};
                    border-color: ${colors.color};
                }

                .forgotPassCard input{
                    border-color: ${colors.color};
                }

                .forgotPassCard input,
                .forgotPassCard input:focus{
                    background: transparent;
                    color: #fff;
                }

                .forgotPassCard hr{
                    background-color: ${colors.color};
                }

                .forgotPassCard a{
                    color: #fff;
                }

                .forgorPassBtn{
                    border-color: ${colors.color};
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }
                .forgorPassBtn:hover{
                    background-color: #000;
                    border-color: ${colors.color};
                }

            `}</style>
        </>
    )
}

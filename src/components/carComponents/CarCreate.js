import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { isWebUri } from 'valid-url';
import { useAuth } from '../../contexts/AuthContext';
import { create } from '../../services/carsService';
import { colors } from '../../styles/colors';

export default function CarCreate() {
    const modelRef = useRef();
    const yearRef = useRef();
    const priceRef = useRef();
    const imageUrlRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        if (!isWebUri(imageUrlRef.current.value)) {
            return setError('Not a valid url.');
        }

        try {
            setError('');
            setLoading(true);
            await create(
                modelRef.current.value,
                yearRef.current.value,
                priceRef.current.value,
                imageUrlRef.current.value,
                currentUser.uid
            );
            history.push('/');
        } catch {
            setError('Failed to create a project car!')
        }
        setLoading(false);

    }

    return (
        <>
            <Card className="carCreateCard">
                <Card.Body>
                    <h2 className="text-center mb-4">Create a Project Car</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="model">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" ref={modelRef} required />
                        </Form.Group>
                        <Form.Group id="year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="text" ref={yearRef} required />
                        </Form.Group>
                        <Form.Group id="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" ref={priceRef} required />
                        </Form.Group>
                        <Form.Group id="imageUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" ref={imageUrlRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 carCreateCardBtn" type="submit">Create</Button>
                    </Form>
                </Card.Body>
            </Card>
            <style jsx>{`
                .carCreateCard{
                    background: transparent;
                    color:  ${colors.color};
                    border-color: ${colors.color};
                }

                .carCreateCard input{
                    border-color: ${colors.color};
                }

                .carCreateCard input,
                .carCreateCard input:focus{
                    background: transparent;
                    color: #fff;
                }

                .carCreateCardBtn{
                    border-color: ${colors.color};
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }
                .carCreateCardBtn:hover{
                    background-color: #000;
                    border-color: ${colors.color};
                }

            `}</style>
        </>
    )
}

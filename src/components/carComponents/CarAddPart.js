import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { isWebUri } from 'valid-url';
import { addCarPart } from '../../services/carsService';

export default function CarAddPart({ match }) {
    const partNameRef = useRef();
    const priceRef = useRef();
    const shopUrlRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        if (!isWebUri(shopUrlRef.current.value)) {
            return setError('Not a valid url.');
        }

        try {
            setError('');
            setLoading(true);
            await addCarPart(
                match.params.carId,
                partNameRef.current.value,
                priceRef.current.value,
                shopUrlRef.current.value,
            );
            history.push('/');
        } catch {
            setError('Failed to add a part!')
        }
        setLoading(false);

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add Part</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="partName">
                            <Form.Label>Part Name</Form.Label>
                            <Form.Control type="text" ref={partNameRef} required />
                        </Form.Group>
                        <Form.Group id="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" ref={priceRef} required />
                        </Form.Group>
                        <Form.Group id="shopUrl">
                            <Form.Label>Shop URL</Form.Label>
                            <Form.Control type="text" ref={shopUrlRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Add</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

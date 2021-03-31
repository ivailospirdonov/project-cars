import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { isWebUri } from 'valid-url';
import { addCarPart } from '../../services/carsService';
import { colors } from '../../styles/colors';

export default function CarAddPart({ match }) {
    const partNameRef = useRef();
    const priceRef = useRef();
    const shopUrlRef = useRef();
    const ownedCheckboxRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const history = useHistory();

    
    async function handleIsItChecked(e) {
        setChecked(e.target.checked);
    }
    
    async function handleSubmit(e) {
        e.preventDefault()

        if (shopUrlRef.current.value && !isWebUri(shopUrlRef.current.value)) {
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
                checked
            );
            history.push(`/cars/details/${match.params.carId}`);
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
                            <Form.Control type="text" ref={shopUrlRef} />
                        </Form.Group>
                        <Form.Group id="ownedCheckbox">
                            <Form.Check type="checkbox" ref={ownedCheckboxRef} label="Do you own the part?" onClick={handleIsItChecked}/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 partCreateCardBtn" type="submit" variant="outline-dark">Add</Button>
                    </Form>
                </Card.Body>
            </Card>
            <style jsx>{`
                .partCreateCardBtn:hover{
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }
            `}</style>
        </>
    )
}

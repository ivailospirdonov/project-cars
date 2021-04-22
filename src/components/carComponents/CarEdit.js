import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { isWebUri } from 'valid-url';
import { editCar } from '../../services/carsService';
import { getOneCar } from '../../services/carsService';
import { colors } from '../../styles/colors';

export default function CarEdit({ match }) {
    const modelRef = useRef();
    const yearRef = useRef();
    const priceRef = useRef();
    const imageUrlRef = useRef();
    const [error, setError] = useState('');
    const [car, setCar] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        async function getCurrentCar() {
            let result = await getOneCar(match.params.carId);
            setCar(result);
        }
        getCurrentCar();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()

        if (!isWebUri(imageUrlRef.current.value)) {
            return setError('Not a valid url.');
        }

        try {
            setError('');
            setLoading(true);
            await editCar(
                modelRef.current.value,
                yearRef.current.value,
                priceRef.current.value,
                imageUrlRef.current.value,
                match.params.carId
            );
            history.push(`/project-cars/cars/details/${match.params.carId}`);
        } catch {
            setError('Failed to edit a project car!')
        }
        setLoading(false);

    }

    return (
        <>
            <Card className="carEditCard">
                <Card.Body>
                    <h2 className="text-center mb-4">Edit Project Car</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="model">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" ref={modelRef} defaultValue={car.model} required />
                        </Form.Group>
                        <Form.Group id="year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="text" ref={yearRef} defaultValue={car.year} required />
                        </Form.Group>
                        <Form.Group id="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" ref={priceRef} defaultValue={car.price} required />
                        </Form.Group>
                        <Form.Group id="imageUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" ref={imageUrlRef} defaultValue={car.imageUrl} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 carEditCardBtn" type="submit" variant="outline-dark">Edit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <style jsx>{`
                .carEditCard{
                    background: transparent;
                    color:  ${colors.color};
                    border-color: ${colors.color};
                }

                .carEditCard input{
                    border-color: ${colors.color};
                }

                .carEditCard input,
                .carEditCard input:focus{
                    background: transparent;
                    color: #fff;
                }

                .carEditCardBtn{
                    border-color: ${colors.color};
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }
                .carEditCardBtn:hover{
                    background-color: #000;
                    border-color: ${colors.color};
                }

            `}</style>
        </>
    )
}

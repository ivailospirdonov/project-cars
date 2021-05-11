import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { isWebUri } from 'valid-url';
import { editCar } from '../../services/carsService';
import { getOneCar } from '../../services/carsService';
import { colors } from '../../styles/colors';
import { useDropzone } from 'react-dropzone';
import firebaseConfig from '../../firebase';
import { v4 as uuid } from "uuid";

export default function CarEdit({ match }) {
    const modelRef = useRef();
    const yearRef = useRef();
    const priceRef = useRef();
    const imageUrlRef = useRef();
    const [error, setError] = useState('');
    const [car, setCar] = useState('');
    const [reviewLink, setReviewLink] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    useEffect(() => {
        async function getCurrentCar() {
            let result = await getOneCar(match.params.carId);
            setCar(result);
        }
        getCurrentCar();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()

        if (modelRef.current.value.length > 20) {
            return setError('The model name should be less than 20 symbols long!');
        }

        if (yearRef.current.value.length != 4) {
            return setError('Invalid year!');
        }

        if (priceRef.current.value.length > 8) {
            return setError('The price should be less than 8 symbols long!');
        }

        if (!reviewLink.length > 0) {
            return setError('Not a valid image!');
        }

        try {
            setError('');
            setLoading(true);
            await editCar(
                modelRef.current.value,
                yearRef.current.value,
                priceRef.current.value,
                reviewLink,
                match.params.carId
            );
            history.push(`/project-cars/cars/details/${match.params.carId}`);
        } catch {
            setError('Failed to edit a project car!')
        }
        setLoading(false);

    }

    async function handleOnUpload(e) {
        const file = e.target.files[0];
        setLoading(true);
        const imageId = uuid();
        const imagesRef = firebaseConfig.storage().ref("images").child(imageId);
        await imagesRef.put(file);
        imagesRef.getDownloadURL().then((url) => {
            setReviewLink(url);
        });
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
                            <Form.Label>Image</Form.Label>
                            <section>
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} accept="image/*" onChange={handleOnUpload} />
                                    <p className="btn imageBtn w-100">Click to select an image</p>
                                </div>
                                <aside>
                                    {reviewLink && <a href={reviewLink} className="btn imageBtn" role="button">Preview link</a>} 
                                </aside>
                            </section>
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

                .imageBtn{
                    background: transparent;
                }

                .carEditCardBtn,
                .imageBtn{
                    border-color: ${colors.color};
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }
                .carEditCardBtn:hover,
                .imageBtn:hover{
                    background-color: #000;
                    border-color: ${colors.color};
                    color: #fff;
                }

            `}</style>
        </>
    )
}

import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert, ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
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
    const [error, setError] = useState('');
    const [car, setCar] = useState('');
    const [reviewLink, setReviewLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const history = useHistory();

    async function onDrop(acceptedFiles) {

        await uploadFile(acceptedFiles[0]);
        setLoading(false);
    }

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {
        async function getCurrentCar() {
            let result = await getOneCar(match.params.carId);
            setCar(result);
            setReviewLink(car.imageUrl);
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

        try {
            setError('');
            setLoading(true);
            await editCar(
                modelRef.current.value,
                yearRef.current.value,
                priceRef.current.value,
                reviewLink ? reviewLink : car.imageUrl,
                match.params.carId
            );
            history.push(`/project-cars/cars/details/${match.params.carId}`);
        } catch {
            setError('Failed to edit a project car!')
        }
        setLoading(false);

    }

    async function handleOnUpload(e) {

        await uploadFile(e.target.files[0]);
        setLoading(false);
    }

    function uploadFile(file) {
        const imgFile = file;
        if (reviewLink) {
            let pictureRef = firebaseConfig.storage().refFromURL(reviewLink);
            pictureRef.delete();
        } else {
            let pictureRef = firebaseConfig.storage().refFromURL(car.imageUrl);
            pictureRef.delete();
        }
        setLoading(true);
        const imageId = uuid();
        const imagesRef = firebaseConfig.storage().ref("images").child(imageId).put(imgFile);
        imagesRef.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercentage(progress);
                if (progress === 100) {
                    setTimeout(() => {
                        setPercentage(0);
                        firebaseConfig.storage().ref("images").child(imageId).getDownloadURL().then((url) => {
                            setReviewLink(url);
                        });
                    }, 1000)
                }
            },
        );
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
                                    {
                                        isDragActive ?
                                            <p className="btn imageBtn w-100 py-4">Drop the files here ...</p> :
                                            <p className="btn imageBtn w-100 py-4">Drag and drop file here or click to select a file</p>
                                    }
                                </div>
                                <aside>
                                    <a href={reviewLink ? reviewLink : car.imageUrl} className="btn previewBtn" target="_blank" role="button">Preview link</a>
                                </aside>
                            </section>
                            {percentage > 0 && <ProgressBar className="imgProgressBar mt-2" animated now={percentage} />}
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
                    border-style: dashed;
                }

                .previewBtn{
                    background: transparent;
                }

                .carEditCardBtn,
                .imageBtn,
                .previewBtn{
                    border-color: ${colors.color};
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }
                .carEditCardBtn:hover,
                .imageBtn:hover,
                .previewBtn:hover{
                    background-color: #000;
                    border-color: ${colors.color};
                    color: #fff;
                }

            `}</style>
        </>
    )
}

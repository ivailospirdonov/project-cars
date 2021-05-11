import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { create } from '../../services/carsService';
import { colors } from '../../styles/colors';
import { useDropzone } from 'react-dropzone';
import firebaseConfig from '../../firebase';
import { v4 as uuid } from "uuid";

export default function CarCreate() {
    const modelRef = useRef();
    const yearRef = useRef();
    const priceRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState('');
    const [reviewLink, setReviewLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const history = useHistory();

    async function onDrop(acceptedFiles) {

        await uploadFile(acceptedFiles[0]);
        setLoading(false);
    }

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
            await create(
                modelRef.current.value,
                yearRef.current.value,
                priceRef.current.value,
                reviewLink,
                currentUser.uid
            );
            history.push('/project-cars');
        } catch {
            setError('Failed to create a project car!')
        }
        setLoading(false);

    }

    async function handleOnUpload(e) {
        await uploadFile(e.target.files[0]);
        setLoading(false);
    }

    function uploadFile(file) {
        const imgFile = file;
        console.log(file);
        setReviewLink('');
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
                                    {reviewLink && <a href={reviewLink} className="btn previewBtn" target="_blank" role="button">Preview link</a>}
                                </aside>
                            </section>
                            {percentage > 0 && <ProgressBar className="imgProgressBar" animated now={percentage} />}
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

                .imageBtn{
                    background: transparent;
                    border-style: dashed;
                }

                .previewBtn{
                    background: transparent;
                }

                .imgProgressBar{
                    background-color: ${colors.backgroundColor};
                }

                .carCreateCardBtn,
                .imageBtn,
                .previewBtn{
                    border-color: ${colors.color};
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }

                .carCreateCardBtn:hover,
                .imageBtn:hover,
                .previewBtn:hover{
                    background-color: #000;
                    border-color: ${colors.color};
                    color: #fff;
                }

                .carCreateCardBtn:disabled{
                    background-color: #4a4a4a;
                    border-color: ${colors.color};
                }

            `}</style>
        </>
    )
}

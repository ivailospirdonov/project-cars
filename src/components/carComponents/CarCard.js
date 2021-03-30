import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function CarCard({ carId, model, year, price, imageUrl }) {

    return (
        <>
            <Link to={`/cars/details/${carId}`} className="col-4 carCard">
                <Card>
                    <div className="carCardImgWrap">
                        <Card.Img variant="top" src={imageUrl} class="carCardImg" />
                    </div>
                    <Card.Body>
                        <Card.Title>{model}</Card.Title>
                        <Card.Text>Year: {year}</Card.Text>
                        <Link to={`/cars/details/${carId}`} class="btn btn-outline-dark">Details</Link>
                    </Card.Body>
                </Card>
            </Link>
            <style jsx>{`

                .carCard:hover .carCardImg{
                    transition: transform 1s;
                    transform: translate(-50%, -50%) scale(1.2);
                }

                .carCardImgWrap{
                    display: block;
                    position: relative;
                    overflow: hidden;
                    content: '';
                    padding-top: calc( (9 / 16) * 100%);
                    border-bottom: 1px solid rgba(0,0,0,.125);
                }

                .carCardImg{
                    display: block;
                    width: 100%;
                    height: auto;
                    position: absolute;
                    transition: transform 1s;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            `}</style>
        </>
    )
}


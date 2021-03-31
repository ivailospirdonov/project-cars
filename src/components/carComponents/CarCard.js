import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function CarCard({ carId, model, year, price, imageUrl }) {

    return (
        <>
            <Link to={`/cars/details/${carId}`} className="col-4 carCard">
                <Card>
                    <div className="carCardImgWrap">
                        <Card.Img variant="top" src={imageUrl} className="carCardImg" />
                    </div>
                    <Card.Body>
                        <Card.Title>{model}</Card.Title>
                        <Card.Text>Year: {year}</Card.Text>
                        <button className="btn btn-outline-dark">Details</button>
                    </Card.Body>
                </Card>
            </Link>
            <style jsx>{`
                .carCard{
                    color: #343a40;
                }

                .carCard:link{
                    text-decoration: none;
                }

                .carCard .card{
                    background-color: #ededed;
                }

                .carCard:hover .card{
                    background-color: #ededed;
                    color: #000;
                    transition: transform 1s;
                }

                .carCard:hover .carCardImg{
                    transition: transform 1s;
                    transform: translate(-50%, -50%) scale(1.1);
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

                .carCard:hover .btn{
                    background-color: #292929;
                    color: #f7f42f;
                }
            `}</style>
        </>
    )
}


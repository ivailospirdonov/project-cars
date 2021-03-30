import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function CarCard({ carId, model, year, price, imageUrl }) {

    return (
        <>
            <Link to={`/cars/details/${carId}`} className="col-4">
                <Card>
                    <Card.Img variant="top" src={imageUrl} class="carCardImg" />
                    <Card.Body>
                        <Card.Title>{model}</Card.Title>
                        <Card.Text>Year: {year}</Card.Text>
                        <Link to={`/cars/details/${carId}`} class="btn btn-outline-dark">Details</Link>
                    </Card.Body>
                </Card>
            </Link>
            <style jsx>{`
            `}</style>
        </>
    )
}


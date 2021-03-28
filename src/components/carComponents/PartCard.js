import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { deletePart } from '../../services/carsService';

export default function PartCard({ carId, partId, name, price, shopUrl }) {

    async function handlePartDelete(e) {
        try {
            await deletePart(carId, partId);
            e.target.parentElement.remove();
        } catch {
            
        }
    }

    return (
            <li>
                <h2>{name}</h2>
                <h4>{price}lv.</h4>
                <Link to={shopUrl}>Link to the shop</Link>
                <Button variant="link" onClick={handlePartDelete}>Delete</Button>
            </li> 
    )
}

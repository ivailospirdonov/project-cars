import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { deletePart, editPart } from '../../services/carsService';

export default function PartCard({ carId, partId, name, price, shopUrl, ownedCheck }) {

    async function handlePartBougth(e) {
        const ownedUl = document.getElementById('ownedUl');

        try{
            ownedCheck = true;
            await editPart(carId, partId, name, price, shopUrl, ownedCheck);
            ownedUl.appendChild(e.target.parentElement);
            e.target.remove();
        }catch{

        }
    }

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
                {shopUrl && <Link to={shopUrl}>Link to the shop</Link>}
                {ownedCheck === false &&  <Button variant="link" onClick={handlePartBougth}>Bought the part!</Button>}
                <Button variant="link" onClick={handlePartDelete}>Delete</Button>
            </li> 
    )
}

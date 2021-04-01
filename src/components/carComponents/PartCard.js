import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { deletePart, editPart } from '../../services/carsService';

export default function PartCard({ carId, partId, name, price, shopUrl, ownedCheck }) {

    async function handlePartBougth(e) {
        const ownedUl = document.getElementById('ownedUl');

        try {
            ownedCheck = true;
            await editPart(carId, partId, name, price, shopUrl, ownedCheck);
            ownedUl.appendChild(e.target.parentElement.parentElement);
            e.target.remove();
        } catch {

        }
    }

    async function handlePartDelete(e) {
        try {
            await deletePart(carId, partId);
            e.target.parentElement.parentElement.remove();
        } catch {

        }
    }

    return (
        <>
            <div className="d-flex">
                <div className="col-3">
                    <h4>{name}</h4>
                    <h6>{price}lv.</h6>
                </div>
                <div className="partCardBtns d-flex justify-content-end btn-group col-9" role="group">
                    {shopUrl && <Link to={shopUrl} className="btn btn-outline-dark btn-custom-hover col-4 btn-sm" role="button">Link to the Shop</Link>}
                    {ownedCheck === false && <button className="btn btn-outline-dark btn-custom-hover col-4 btn-sm" role="button" onClick={handlePartBougth}>Bought the part!</button>}
                    <button className="btn btn-outline-dark btn-custom-hover col-4 btn-sm" role="button" onClick={handlePartDelete}>Delete</button>
                </div>
            </div>
            <hr></hr>
        </>
    )
}

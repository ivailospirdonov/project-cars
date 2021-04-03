import React from 'react';
import { deletePart, editPart } from '../../services/carsService';
import { colors } from '../../styles/colors';

export default function PartCard({ carId, partId, name, price, shopUrl, ownedCheck }) {
    const ownedUl = document.getElementById('ownedUl');

    async function handlePartBougth(e) {

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
            <div className="partCard pb-3 mb-3">
                <div className="d-flex justify-content-between">
                    <h4>{name}</h4>
                    <h6>{price}lv.</h6>
                </div>
                <div className="partCardBtns d-flex justify-content-end btn-group" role="group">
                    {shopUrl && <a href={shopUrl} className="btn btn-secondary btn-custom-hover col-4 btn-sm" role="button">Link to the Shop</a>}
                    {ownedCheck === false && <button className="btn btn-dark btn-custom-hover col-4 btn-sm" role="button" onClick={handlePartBougth}>Add to owned!</button>}
                    <button className="btn btn-danger col-4 btn-sm" role="button" onClick={handlePartDelete}>Delete</button>
                </div>
            </div>
            <style jsx>{`
                .partCard{
                    border-bottom: 1px solid #fff;
                }

                .partCardBtns{
                    display: block;
                }

                .partCardBtns .btn-custom-hover:hover{
                    color:  ${colors.color};
                }
                
            `}</style>
        </>
    )
}

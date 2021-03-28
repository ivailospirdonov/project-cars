import React from 'react';
import { Link } from 'react-router-dom';

export default function CarCard({ carId, model, year, price, imageUrl }) {
    
    return (
        <div>
            <li>
                <h2>Car: {model}</h2>
                <h4>Year: {year}</h4>
                <h4>Price: {price}</h4>
                <Link to={`/cars/${carId}`}>Details</Link>
            </li> 
        </div>
    )
}

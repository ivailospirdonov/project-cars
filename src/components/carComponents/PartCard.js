import React from 'react';
import { Link } from 'react-router-dom';

export default function PartCard({ partId, name, price, shopUrl }) {
    
    return (
        <div>
            <li>
                <h2>{name}</h2>
                <h4>{price}lv.</h4>
                <Link to={shopUrl}>Link to the shop</Link>
            </li> 
        </div>
    )
}

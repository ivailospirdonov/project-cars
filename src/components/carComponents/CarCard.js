import React from 'react'

export default function CarCard({ model, year, price }) {
    return (
        <div>
            <li>
                <h2>Car: {model}</h2>
                <h4>Year: {year}</h4>
                <h4>Price: {price}</h4>
            </li> 
        </div>
    )
}

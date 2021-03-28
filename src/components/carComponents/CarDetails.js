import React, { useEffect, useState } from 'react';
import { getOneCar } from '../../services/carsService';
import { Link } from 'react-router-dom';

export default function CarDetails({ match }) {

    const [car, setCar] = useState([]);

    useEffect(() => {
        async function getCurrentCar() {
            let result = await getOneCar(match.params.carId);
            setCar(result);
        }

        getCurrentCar();
    }, []);


    return (
        <div>
                <img src={car.imageUrl} alt="Car Wallpaper" width="600" height="300" />
                <h2>Car: {car.model}</h2>
                <h4>Year: {car.year}</h4>
                <h4>Price: {car.price}</h4>
                <Link to={`/cars/${match.params.carId}/parts`}>Add part</Link>
        </div>
    )
}
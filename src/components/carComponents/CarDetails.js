import React, { useEffect, useState } from 'react';
import { getOneCar, getAllParts } from '../../services/carsService';
import { Link } from 'react-router-dom';

export default function CarDetails({ match }) {

    const [car, setCar] = useState([]);
    const [parts, setParts] = useState([]);

    useEffect(() => {
        async function getCurrentCar() {
            let result = await getOneCar(match.params.carId);
            setCar(result);
        }
        getCurrentCar();

        async function getCurrentParts() {
            let result = await getAllParts(match.params.carId);
            setParts(result);
        }

        getCurrentParts();
    }, []);



    return (
        <div>
            <img src={car.imageUrl} alt="Car Wallpaper" width="600" height="300" />
            <h2>Car: {car.model}</h2>
            <h4>Year: {car.year}</h4>
            <h4>Price: {car.price}</h4>
            <Link to={`/cars/${match.params.carId}/parts`}>Add part</Link>
            <div>
                <h2>Car Parts</h2>
                <ul>
                    {parts.map(rec =>
                        <li>
                            <h6>
                                Part Name: {rec[1].name}
                            </h6>
                            <h6>
                                <a href={rec[1].shopUrl}>Shop Link</a>
                            </h6>
                            <h6>
                                Price: {rec[1].price}lv.
                            </h6>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
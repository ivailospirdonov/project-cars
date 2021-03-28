import React, { useEffect, useState } from 'react';
import { getOneCar, getAllParts, deleteCar } from '../../services/carsService';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PartCard from './PartCard';

export default function CarDetails({ match }) {

    const [car, setCar] = useState([]);
    const [parts, setParts] = useState([]);
    const history = useHistory();

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

    async function handleCarDelete() {
        try {
            await deleteCar(match.params.carId);
            history.push('/');
        } catch {
            
        }
    }

    return (
        <div>
            <img src={car.imageUrl} alt="Car Wallpaper" width="600" height="300" />
            <h2>{car.model}</h2>
            <h4>Year: {car.year}</h4>
            <h4>Price: {car.price}</h4>
            <Link to={`/cars/edit/${match.params.carId}`}>Edit</Link>
            <Button variant="link" onClick={handleCarDelete}>Delete</Button>
            <Link to={`/cars/add-part/${match.params.carId}`}>Add part</Link>
            <div>
                <h2>Car Parts</h2>
                <ul>
                    {parts.map(part =>
                        <PartCard
                            key={part[0]}
                            carId={part[0]}
                            name={part[1].name}
                            price={part[1].price}
                            shopUrl={part[1].shopUrl}
                        />)}
                </ul>
            </div>
        </div>
    )
}
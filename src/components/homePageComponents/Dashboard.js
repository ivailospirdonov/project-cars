import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getAllCars } from '../../services/carsService';
import { useAuth } from '../../contexts/AuthContext';
import CarCard from '../carComponents/CarCard';

export default function Dashboard() {

    const [cars, setCars] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        async function getAllCurrentCars() {
            let records = await getAllCars(currentUser.uid);
            setCars(records);
            
        }

        getAllCurrentCars();
    }, []);
    
    return (
        <>
            <div className="d-flex align-items-center justify-content-around">
                <div className="align-text-center">
                    <h1>All cars</h1>
                </div>
                <div>
                    <Link to="/cars/create-car">Add Project Car</Link>
                </div>
            </div>
            <div>
                {cars.map(car => 
                    <CarCard
                        key={car[0]} 
                        carId={car[0]}
                        model={car[1].model}
                        year={car[1].year}
                        price={car[1].price}
                        imageUrl={car[1].imageUrl}
                    />)}
            </div>
        </>
    )
}


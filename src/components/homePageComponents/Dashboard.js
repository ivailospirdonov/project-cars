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
            <div id="dashboard">
                <div className="row w-100" >
                    <div className="align-text-center col">
                        <h1>All cars</h1>
                    </div>
                    <div className="col">
                        <Link to="/cars/create-car">Add Project Car</Link>
                    </div>
                </div>
                <div>
                    <ul>
                        {cars.map(car =>
                            <CarCard
                                key={car[0]}
                                carId={car[0]}
                                model={car[1].model}
                                year={car[1].year}
                                price={car[1].price}
                                imageUrl={car[1].imageUrl}
                            />)}
                    </ul>
                </div>
            </div>
            <style jsx>{`
                #dashboard{
                    width: 85%;
                    min-height: 90vh;
                    margin: auto;
                }
            `}</style>
        </>
    )
}


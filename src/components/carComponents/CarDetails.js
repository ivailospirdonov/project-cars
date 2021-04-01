import React, { useEffect, useState } from 'react';
import { getOneCar, getAllParts, deleteCar } from '../../services/carsService';
import { Link, useHistory } from 'react-router-dom';
import { Container, Image, Card } from 'react-bootstrap';
import PartCard from './PartCard';
import { colors } from '../../styles/colors';

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
        <>
            <Container className="my-3 carDetailsContainer">
                <Card>
                    <Card.Body>
                        <div className="row d-flex justify-content-center">
                            <div className="col-7">
                                <div className="carDetailsWrap" >
                                    <Image src={car.imageUrl} alt="Car Wallpaper" />
                                </div>
                            </div>
                            <div className="col-5">
                                <h1>{car.model}</h1>
                                <h4>Year: {car.year}</h4>
                                <h4>Price: {car.price}</h4>
                                <div className="carDetailsBtns w-90 d-flex justify-content-center btn-group" role="group">
                                    <Link to={`/cars/edit/${match.params.carId}`} className="btn btn-outline-dark btn-custom-hover col-4" role="button">Edit</Link>
                                    <Link to={`/cars/add-part/${match.params.carId}`} className="btn btn-outline-dark btn-custom-hover col-4" role="button">Add part</Link>
                                    <Link to={`/cars/edit/${match.params.carId}`} className="btn btn-danger col-4" role="button" onClick={handleCarDelete}>Delete</Link>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div >
                            <h2 className="d-flex justify-content-center">Car Parts</h2>
                            <div className="row d-flex justify-content-around">
                                <div className="col-6">
                                    <h4>Owned Parts:</h4>
                                    <div id="ownedUl">
                                        {parts.filter(part => part[1].ownedCheck === true).map(part =>
                                            <PartCard
                                                key={part[0]}
                                                carId={match.params.carId}
                                                partId={part[0]}
                                                name={part[1].name}
                                                price={part[1].price}
                                                shopUrl={part[1].shopUrl}
                                                ownedCheck={part[1].ownedCheck}
                                            />)}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h4>Unowned Parts:</h4>
                                    <div>
                                        {parts.filter(part => part[1].ownedCheck === false).map(part =>
                                            <PartCard
                                                key={part[0]}
                                                carId={match.params.carId}
                                                partId={part[0]}
                                                name={part[1].name}
                                                price={part[1].price}
                                                shopUrl={part[1].shopUrl}
                                                ownedCheck={part[1].ownedCheck}
                                            />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <style jsx>{`
                .carDetailsContainer{
                    min-height: 90vh;
                }

                .carDetailsWrap{
                    display: block;
                    position: relative;
                    overflow: hidden;
                    content: '';
                    padding-top: calc( (9 / 16) * 100%);
                }

                .carDetailsWrap img{
                    display: block;
                    width: 100%;
                    height: auto;
                    position: absolute;
                    transition: transform 1s;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .carDetailsBtns{
                    position: absolute;
                    bottom: 0;
                    width: 95%;
                }

                .carDetailsBtns .btn-custom-hover:hover{
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }
            `}</style>
        </>
    )
}
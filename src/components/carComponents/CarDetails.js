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
            history.push('/project-cars');
        } catch {

        }
    }

    return (
        <>
            <Container className="py-3 carDetailsContainer">
                <Card>
                    <Card.Body>
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 col-lg-7">
                                <div className="carDetailsWrap" >
                                    <Image src={car.imageUrl} alt="Car Wallpaper" />
                                </div>
                            </div>
                            <div className="col-12 col-lg-5">
                                <h1>{car.model}</h1>
                                <h4>Year: {car.year}</h4>
                                <h4>Price: {car.price}lv.</h4>
                                <div className="carDetailsBtns w-90 d-flex justify-content-center btn-group" role="group">
                                    <Link to={`/project-cars/cars/edit/${match.params.carId}`} className="btn btn-secondary btn-custom-hover col-4" role="button">Edit</Link>
                                    <Link to={`/project-cars/cars/add-part/${match.params.carId}`} className="btn btn-dark btn-custom-hover col-4" role="button">Add part</Link>
                                    <button className="btn btn-danger col-4" role="button" onClick={handleCarDelete}>Delete</button>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="partsSection">
                            <h2 className="d-flex justify-content-center mb-4">Car Parts</h2>
                            {parts.length == 0 && <h4>No parts added yet!</h4>}
                            {parts.length > 0 &&
                                <div className="row d-flex justify-content-around">
                                    <div className="col-12 col-md-6 mt-5 mt-md-0">
                                        <h4 className="mb-5 mb-md-2">Owned Parts:</h4>
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
                                    <div className="col-12 col-md-6 mt-5 mt-md-0">
                                        <h4 className="mb-5 mb-md-2">Unowned Parts:</h4>
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
                            }
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <style jsx>{`
                .site-container{
                    background-color: #1c1c1c;
                }

                .carDetailsContainer{
                    min-height: 90vh;
                }

                .carDetailsContainer .card{
                    background-color: #2b2b2b;
                    color:  #fff;
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

                .carDetailsContainer .card h1{
                    color: ${colors.color};
                }

                .carDetailsBtns{
                    position: absolute;
                    bottom: 0;
                    width: 95%;
                }

                .carDetailsBtns .btn-custom-hover:hover{
                    color:  ${colors.color};
                }

                .carDetailsContainer hr{
                    background-color: #fff;
                }

                .partsSection h2,
                .partsSection h4{
                    color: ${colors.color};
                }

                @media screen and (max-width: 992px){
                    .carDetailsBtns{
                        position: relative;
                        width: 100%
                    }
                }
            `}</style>
        </>
    )
}
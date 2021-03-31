import React, { useEffect, useState } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllCars } from '../../services/carsService';
import { useAuth } from '../../contexts/AuthContext';
import CarCard from '../carComponents/CarCard';
import { colors } from '../../styles/colors';

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
            <Carousel interval={5000}>
                <Carousel.Item>
                    <div className="carouselImgWrap">
                        <img
                            className="d-block w-100"
                            src="https://www.desktopbackground.org/download/o/2011/02/05/152822_cars-subaru-roads-vehicles-tuning-impreza-wrx-sti-wallpapers_1920x1080_h.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Dream it!</h3>
                            <p>Life is too short to drive boring cars!</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselImgWrap">
                        <img
                            className="d-block w-100"
                            src="https://images.pexels.com/photos/5229524/pexels-photo-5229524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Plan it!</h3>
                            <p>A dream is a goal with a deadline!</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselImgWrap">
                        <img
                            className="d-block w-100"
                            src="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Do it!</h3>
                            <p>The cars we drive say a lot about us!</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
            </Carousel>
            <Container id="dashboard">
                <row className="d-flex justify-content-center dashboardTitle my-3">
                    <h1>Project Cars</h1>
                </row>
                <hr></hr>
                <div className="row w-100 mx-auto my-4" >
                    <div className="align-text-center col">
                        <h2>All cars</h2>
                    </div>
                    <div className="col d-flex justify-content-end addCarBtn">
                        <Link to="/cars/create-car" className="btn btn-outline-dark btn-lg" role="button">Add Project Car</Link>
                    </div>
                </div>
                <div className="row w-100 mx-auto">

                    {cars.map(car =>
                        <CarCard
                            key={car[0]}
                            carId={car[0]}
                            model={car[1].model}
                            year={car[1].year}
                            price={car[1].price}
                            imageUrl={car[1].imageUrl}
                        />)}
                    {cars.length == 0 && <h4>No project cars created yet!</h4>}
                </div>
            </Container>
            <style jsx>{`
                #dashboard{
                    width: 85%;
                    min-height: 90vh;
                    margin: auto;
                }

                .dashboardTitle{
                    font-size: 3.5em;
                }

                .addCarBtn .btn:hover{
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }

                .addCarBtn .btn{
                    background-color: #ededed;
                    color: #000;
                }

                .carouselImgWrap{
                    display: block;
                    position: relative;
                    overflow: hidden;
                    content: '';
                    padding-top: calc( (2 / 9) * 100%);
                }

                .carouselImgWrap img{
                    display: block;
                    width: 100%;
                    height: auto;
                    position: absolute;
                    transition: transform 1s;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

            `}</style>
        </>
    )
}


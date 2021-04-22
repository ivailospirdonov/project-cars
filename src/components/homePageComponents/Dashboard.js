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
                <div className="d-flex justify-content-center dashboardTitle my-3">
                    <h1>Project Cars</h1>
                </div>
                <hr></hr>
                <div className="row w-100 mx-auto my-4" >
                    <div className="align-text-center text-center text-sm-left col-12 col-sm-6 mb-4 mb-sm-0">
                        <h2>All cars</h2>
                    </div>
                    <div className="col d-flex justify-content-center justify-content-sm-end addCarBtn">
                        <Link to="/project-cars/cars/create-car" className="btn btn-outline-dark btn-lg" role="button">Add Project Car</Link>
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
                .site-container{
                    background-color: #1c1c1c;
                    z-index: -1
                }
                
                #dashboard{
                    color:  ${colors.color};
                    width: 85%;
                    min-height: 65vh;
                    margin: auto;
                }

                .dashboardTitle{
                    font-size: 3.5em;
                }

                #dashboard hr{
                    background-color: aliceblue;
                }

                .addCarBtn .btn:hover{
                    background-color: #2b2b2b;
                }

                .addCarBtn .btn{
                    background-color: ${colors.backgroundColor};
                    border-color: ${colors.color};
                    color:  ${colors.color};
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

                @media screen and (max-width: 576px) {
                    .carouselImgWrap {
                        padding-top: calc( (4 / 9) * 100%);
                    }
                }

            `}</style>
        </>
    )
}


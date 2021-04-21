import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../styles/colors';

export default function Header() {

    const { logout, currentUser } = useAuth();
    const history = useHistory();

    function handleMenuToggle(){
        const navUl = document.getElementById('nav-menu-wrapper');
        navUl.classList.toggle('show');
        if(navUl.className == "nav-menu-wrapper show"){
            navUl.style.display = "flex";
        }else{
            navUl.style.display = "none";
        }
    }

    async function handleLogout() {
        try {
            await logout();
            history.push('/login');
        } catch {
        }
    }

    return (
        <>
            <header id="site-header">
                <Container>
                    <nav className="navbar p-0">
                        <section className="nav-logo-section">
                            <Link to="/" ><h3>Project Cars</h3></Link>
                        </section>
                        <button className="hamburger" id="hamburger" onClick={handleMenuToggle}><i className="fa fa-bars" aria-hidden="true"></i></button>
                        <section className="nav-menu-wrapper" id="nav-menu-wrapper">
                            <div className="nav-menu">
                                {!currentUser && <Link to="/login" className="btn btn-custom-hover py-3" role="button">Log in</Link>}
                                {!currentUser && <Link to="/signup" className="btn btn-custom-hover py-3" role="button">Sign Up</Link>}
                                {currentUser && <Link to="/" className="btn btn-custom-hover py-3" role="button">Home</Link>}
                                {currentUser && <button className="btn py-3" role="button" onClick={handleLogout}>Log out</button>}
                            </div>
                        </section>
                    </nav>
                </Container>
            </header>
            <style jsx>{`
                #site-header{
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }

                .nav-logo-section a:hover{
                    text-decoration: none;
                }

                #site-header h3,
                .nav-menu > a,
                .nav-menu > .btn{
                    color:  ${colors.color};
                }
                .navbar{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin: auto;
                }

                .hamburger{
                    background-color: transparent;
                    border: 0;
                    cursor: pointer;
                    display: none;
                    color: ${colors.color};
                    font-size: 30px;
                }


                .nav-menu > a,
                .nav-menu > .btn{
                    font-weight: 600;
                }

                .nav-menu > .btn{
                    vertical-align: baseline;
                }

                .nav-menu > .btn:focus{
                    box-shadow: none;
                    vertical-align: baseline;
                }

                .nav-menu > .btn:hover{
                    border-radius: 0;
                    background-color: ${colors.color};
                    color:  ${colors.backgroundColor};
                }

                .nav-menu-wrapper{
                    align-self: center;
                }

                @media screen and (max-width: 767px){
                    .hamburger{
                        display: block;
                    }

                    .nav-menu-wrapper{
                        display: none;
                        justify-content: center;
                        width: 100%;
                    }

                    .nav-menu-wrapper .nav-menu{
                        display: flex;
                        width: 100%;
                        flex-direction: column;
                    }
                }
            `}</style>
        </>
    );
};

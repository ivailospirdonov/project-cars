import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../styles/colors';

export default function Header() {

    const { logout, currentUser } = useAuth();
    const history = useHistory();

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
                        <section className="nav-menu-wrapper">
                            <div className="nav-menu">
                                <Link to="/" className="btn btn-custom-hover py-3" role="button">Home</Link>
                                {!currentUser && <Link to="/login" className="btn btn-custom-hover py-3" role="button">Log in</Link>}
                                {!currentUser && <Link to="/signup" className="btn btn-custom-hover py-3" role="button">Sign Up</Link>}
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
                    justify-content: space-between;
                    margin: auto;
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
            `}</style>
        </>
    );
};

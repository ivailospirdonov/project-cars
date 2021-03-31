import React from 'react';
import { Button } from 'react-bootstrap';
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
                <nav className="navbar">
                    <section className="nav-logo-section">
                        <h3>Project Cars</h3>
                    </section>
                    <section className="nav-menu-wrapper">
                        <div className="nav-menu">
                            <Link to="/">Home</Link>
                            {!currentUser &&  <Link to="/login">Log in</Link>}
                            {!currentUser &&  <Link to="/signup">Sign Up</Link>}
                            {currentUser &&  <Button variant="link" onClick={handleLogout}>Log out</Button>}
                        </div>
                    </section>
                </nav>
            </header>
            <style jsx>{`
                #site-header{
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
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
                    width: 85%;
                }
                .nav-menu > a{
                    margin-left: 15px;
                }

                .nav-menu > .btn{
                    vertical-align: baseline;
                }

                .nav-menu-wrapper{
                    align-self: center;
                }
            `}</style>
        </>
    );
};

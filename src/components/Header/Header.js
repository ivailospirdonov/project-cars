import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {

    const { logout, currentUser } = useAuth();
    const history = useHistory();

    async function handleLogout(e) {
        e.preventDefault()
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
                .navbar{
                    display: flex;
                    justify-content: space-between;
                    margin: 0 15px;
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

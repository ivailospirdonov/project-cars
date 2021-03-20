const Header = () => {
    return (
        <header id="site-header">
            <nav className="navbar">
                <section className="nav-logo-section">
                    <h3>Project Cars</h3>
                </section>
                <section className="nav-menu-wrapper">
                    <div className="nav-menu">
                        <a href="/">Home</a>
                        <a href="/">Login</a>
                        <a href="/">Register</a>
                        <a href="/">Logout</a>
                    </div>
                </section>
            </nav>
        </header>
    );
};

export default Header;  
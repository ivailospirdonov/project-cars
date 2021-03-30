const Footer = () => {
    return (
        <>
            <footer id="site-footer">
                <p>@MyProjectCar</p>
            </footer>
            <style jsx>{`
                #site-footer{
                    display: flex;
                    justify-content: center;
                    background-color: #292929;
                }

                #site-footer > p{
                    color: #f7f42f;
                }
            `}</style>
        </>
    );
};

export default Footer;


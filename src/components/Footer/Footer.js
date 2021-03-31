import { colors } from '../../styles/colors';

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
                    background-color: ${colors.backgroundColor};
                }

                #site-footer > p{
                    color:  ${colors.color};
                }
            `}</style>
        </>
    );
};

export default Footer;


import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Signup from './components/authComponents/Signup';
import { Container } from 'react-bootstrap';


function App() {
  return (
    <div className="site-container">
      <Header />
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Signup />
          </div>
        </Container>
        
      <Footer />
    </div>
  );
}

export default App;

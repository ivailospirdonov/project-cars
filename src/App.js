import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Signup from './components/authComponents/Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
      <div className="site-container">
        <Header />
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Signup />
          </div>
        </Container>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dashboard from './components/homePageComponents/Dashboard';
import Signup from './components/authComponents/Signup';
import Login from './components/authComponents/Login';
import PrivateRoute from './components/authComponents/PrivateRoute';
import ForgotPassword from './components/authComponents/ForgotPassword';
import CarCreate from './components/carComponents/CarCreate';
import CarEdit from './components/carComponents/CarEdit';
import CarDetails from './components/carComponents/CarDetails';
import CarAddPart from './components/carComponents/CarAddPart';
import CoverPhoto from './components/coverPhotos/CoverPhoto';
import NotFound from './components/notFoundComponent/NotFound';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Header />
          <div className="site-container">
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/cars/details/:carId" component={CarDetails} />
              <CoverPhoto >
                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Switch>
                      <PrivateRoute exact path="/cars/create-car" component={CarCreate} />
                      <PrivateRoute exact path="/cars/edit/:carId" component={CarEdit} />
                      <PrivateRoute exact path="/cars/add-part/:carId" component={CarAddPart} />
                      <Route exact path="/signup" component={Signup} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/project-cars/" component={Login} />
                      <Route exact path="/forgot-password" component={ForgotPassword} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                </Container>
              </CoverPhoto>
            </Switch>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;

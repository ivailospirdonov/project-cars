import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dashboard from './components/homePageComponents/Dashboard';
import Signup from './components/authComponents/Signup';
import Login from './components/authComponents/Login';
import PrivateRoute from './components/authComponents/PrivateRoute';
import ForgotPassword from './components/authComponents/ForgotPassword';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="site-container">
          <Header />
          <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </div>
          </Container>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

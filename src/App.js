import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Signup from './components/authComponents/Signup';


function App() {
  return (
    <div className="site-container">
      <Header />

        <Signup />
        
      <Footer />
    </div>
  );
}

export default App;

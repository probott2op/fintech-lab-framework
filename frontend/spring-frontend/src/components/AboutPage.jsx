import support from '../assets/24seven.jpg';
import security from '../assets/security.jpg';
import innovation from '../assets/innovation.jpg';
import empowering from '../assets/empowering.png';
import transparency from '../assets/transparency.jpg';

import Footer from './common/Footer';
import Header from './common/Header';

import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  function redirectRegister() {
    navigate('/register');
  }

  return (
    <>
      <Header />

      {/* Main Content */}
      <main className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4">Welcome to Krutev Bank</h1>
            <p className="lead"><em>Empowering your financial future</em></p>
            <p>
              At Krutev Bank, we are more than just a bank — we're your partner in building a secure and prosperous future.
              With personalized financial services, cutting-edge technology, and a commitment to community,
              we’re here to help you make the most of your money.
            </p>
            <button className="btn btn-primary btn-lg" onClick={redirectRegister}>Sign Up</button>
          </div>
          <div className="col-md-6">
            <img src={empowering} alt="Empowering the future" className="img-fluid empowering-img" />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <section className="mt-5">
          <h2 className="text-center mb-4">Why Choose Us?</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            <div className="col">
              <div className="card h-100">
                <img src={support} className="card-img-top info-img" alt="24/7 support" />
                <div className="card-body">
                  <h5 className="card-title">24/7 Support</h5>
                  <p className="card-text">
                    Get help when you need it with round-the-clock customer service.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src={security} className="card-img-top info-img" alt="Security" />
                <div className="card-body">
                  <h5 className="card-title">Security First</h5>
                  <p className="card-text">
                    Bank with peace of mind knowing your information is protected with state-of-the-art encryption and fraud protection.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src={innovation} className="card-img-top info-img" alt="Innovative tools" />
                <div className="card-body">
                  <h5 className="card-title">Innovative Tools</h5>
                  <p className="card-text">
                    Enjoy online and mobile banking features that put you in control of your finances, wherever you are.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src={transparency} className="card-img-top info-img" alt="Transparency" />
                <div className="card-body">
                  <h5 className="card-title">Transparency</h5>
                  <p className="card-text">
                    Clear communication and no hidden fees for peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default LoginPage;

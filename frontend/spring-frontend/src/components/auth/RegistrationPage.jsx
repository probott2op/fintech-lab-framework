import Header from "../common/Header";
import Footer from "../common/Footer";
function RegistrationPage() {
    return (
        <div className="container-fluid">
        <Header />

      <div className="bg-light py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm rounded-lg border-0">
              <div className="card-body">
                <h2 className="text-center mb-4">Create an Account</h2>
                <form>
                  {/* First Name, Middle Name, Last Name */}
                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <label htmlFor="firstName" className="form-label fw-bold">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label htmlFor="middleName" className="form-label fw-bold">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="middleName"
                        placeholder="Enter your middle name"
                      />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label htmlFor="lastName" className="form-label fw-bold">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
  
                  {/* Date of Birth */}
                  <div className="mb-4">
                    <label htmlFor="dob" className="form-label fw-bold">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      required
                    />
                  </div>
  
                  {/* Mobile and Email */}
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="mobile" className="form-label fw-bold">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="mobile"
                        placeholder="Enter your mobile number"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="email" className="form-label fw-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
  
                  {/* Address Information */}
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="building" className="form-label fw-bold">
                        Building
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="building"
                        placeholder="Enter building name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="street" className="form-label fw-bold">
                        Street
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        placeholder="Enter street name"
                        required
                      />
                    </div>
                  </div>
  
                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <label htmlFor="city" className="form-label fw-bold">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label htmlFor="district" className="form-label fw-bold">
                        District
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="district"
                        placeholder="Enter district"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label htmlFor="state" className="form-label fw-bold">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="Enter state"
                        required
                      />
                    </div>
                  </div>
  
                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <label htmlFor="pincode" className="form-label fw-bold">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        placeholder="Enter pincode"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label htmlFor="country" className="form-label fw-bold">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        placeholder="Enter country"
                        required
                      />
                    </div>
                  </div>
  
                  {/* Submit and Redirect to Login */}
                  <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                    Register
                  </button>
                </form>
  
                <div className="text-center">
                  <p className="mb-2 text-muted">Already have an account?</p>
                  <a href="/login" className="btn btn-outline-secondary w-100 py-2">
                    Login
                  </a>
                </div>
              </div>
            </div>
  
            <div className="text-center mt-3">
              <small className="text-muted">
                We never share your personal information
              </small>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      </div>
    );
  }
  
  export default RegistrationPage;
  
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useState } from "react";
import UserService from "../service/UserService";

function RegistrationPage() {
  
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [building, setBuilding] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const Register = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  const registerObject = {
    "type": "individual",
    "customerFullName": [
        {
            "type":"firstName",
            "value": firstName
        },
        {
            "type":"lastName",
            "value": lastName
        } 
    ],
    "dob": dob,
    "status": "Active",
    "mobile": mobile,
    "email": email,
    "bankName": "HDFC",
    "customerFullAddress": [
        {
            "type": "building",
            "value": building
        },
        {
            "type": "street",
            "value": street
        },
        {

            "type": "city",
            "value": city
        },
        {
            "type": "district",
            "value": district
        },
        {
            "type": "state",
            "value": state
        },
        {
            "type": "pincode",
            "value": pincode
        },
        {
            "type": "country",
            "value": country
        }
    ],
    "password": password
  }
  if (middleName !== "") {
    registerObject.customerFullName.push({
      "type": "middleName",
      "value": middleName
    });
  }
  try {
    const response = await UserService.register(registerObject);
    console.log(response);
    if (response.status === 200) {
      alert(`Registration successful. Your customer ID is ${response.data.customerId}`);
      window.location.href = "/login";
    } else {
      alert("Registration failed");
    }
  }
  catch (error) {
    console.error("Error:", error);
  }
}

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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
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
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
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
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
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
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
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
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
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
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
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
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
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
                        value={state}
                        onChange={(e) => setState(e.target.value)}
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
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
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
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password and Confirm Password */}
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="password" className="form-label fw-bold">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="confirmPassword" className="form-label fw-bold">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit and Redirect to Login */}
                  <button type="submit" className="btn btn-primary w-100 py-2 mb-3" onClick={Register}>
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

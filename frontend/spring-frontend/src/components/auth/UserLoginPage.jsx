import Footer from "../common/Footer";
import Header from "../common/Header";
import UserService from "../service/UserService";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function UserLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.login(username, password);
      localStorage.setItem("userToken", response);
      navigate("/users/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  }

    return (
        <div className="container-fluid">
      <Header />

      <div className="bg-light py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm rounded-lg border-0">
              <div className="card-body">
                <h2 className="text-center mb-4">Krutev User Login</h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label fw-bold">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      required
                      value = {username}
                      onChange = {(e) => setUsername(e.target.value)}
                    />
                  </div>
  
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      required
                      value = {password}
                      onChange = {(e) => setPassword(e.target.value)}
                    />
                  </div>
  
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-muted">
                      Forgot password?
                    </a>
                  </div>
  
                  <button type="submit" className="btn btn-primary w-100 py-2 mb-3" onClick={Login}>
                    Login
                  </button>
                </form>
  
                <div className="text-center">
                  <p className="mb-2 text-muted">Don&#39;t have an account?</p>
                  <a href="/register" className="btn btn-outline-secondary w-100 py-2">
                    Sign Up
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
  
  export default UserLoginPage;
  

  // const username = document.getElementById("username").value;
  // const password = document.getElementById("password").value;

  // fetch("http://localhost:8080/api/auth/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     username: username,
  //     password: password,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data.accessToken) {
  //       localStorage.setItem("user", JSON.stringify(data));
  //       window.location.href = "/";
  //     } else {
  //       alert("Invalid username or password");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
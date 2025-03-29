import Footer from "../common/Footer";
import Header from "../common/Header";
import UserService from "../service/UserService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Added state for error message
    const navigate = useNavigate();

    const Login = async (e) => {
        e.preventDefault();
        try {
            const response = await UserService.login(username, password);
            localStorage.setItem("userToken", response);
            navigate("/admin/dashboard");
        } catch (error) {
            if (error.response && error.response.data) {
                // Assuming the error message is in error.response.data.message
                setErrorMessage(`Invalid Credentials: ${error.response.data.message || "Please try again."}`);
            } else {
                // Generic error message for other cases
                setErrorMessage("An error occurred during login. Please try again.");
            }
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
                                <h2 className="text-center mb-4">Krutev Admin Login</h2>
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
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
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
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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

                                    {/* Display error message if it exists */}
                                    {errorMessage && (
                                        <div className="alert alert-danger" role="alert">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <button type="submit" className="btn btn-primary w-100 py-2 mb-3" onClick={Login}>
                                        Login
                                    </button>
                                </form>
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

export default AdminLoginPage;

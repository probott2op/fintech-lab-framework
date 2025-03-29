import { useState, useEffect } from 'react';
import Header from "../common/Header";
import Footer from "../common/Footer";
import UserService from "../service/UserService.js";
import {useNavigate} from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({
        userName: "",
        fullName: "",
        lastLogin: ""
    });
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false); // For toggling the details view

    useEffect(() => {
        // Mock API request to fetch user data from UserService
        const fetchUserData = async () => {
            try {
                const adminDetail = await UserService.getAdminDashboard(); // Await the response
                if (!adminDetail) {
                    navigate("/admin/login");
                } else {
                    setAdminData({
                        userName: adminDetail.userName,
                        fullName: adminDetail.fullName,
                        lastLogin: adminDetail.lastLogin,
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate("/admin/login"); // Optionally handle errors and navigate
            } finally {
                setLoading(false); // Make sure to hide the loader once data is fetched
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        // Implement logout functionality (could be redirect, clear cookies, etc.)
        console.log("Logging out...");
        localStorage.removeItem("userToken");
        // For example, you can redirect to the login page:
        window.location.href = '/admin/login';
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="container-fluid flex-grow-1 d-flex flex-column justify-content-center align-items-center position-relative">
                <div className="text-center mb-4">
                    <h1 className="display-4 text-primary">Hello, {adminData.fullName}!</h1>
                    <p className="lead text-muted">What do you want to do today?</p>
                </div>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
                    {/* View and Update User Information Card */}
                    <div className="col">
                        <div className="card shadow-lg border-light rounded-lg h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title text-dark">View & Update User Information</h5>
                                <p className="card-text text-muted">Manage your user details and update your profile.</p>
                                <a href="/admin/user-info" className="btn btn-primary btn-lg w-100">Go to User Info</a>
                            </div>
                        </div>
                    </div>

                    {/* Register a New Admin Card */}
                    <div className="col">
                        <div className="card shadow-lg border-light rounded-lg h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title text-dark">Register a New Admin</h5>
                                <p className="card-text text-muted">Add a new admin to your platform.</p>
                                <a href="/admin/register" className="btn btn-success btn-lg w-100">Register Admin</a>
                            </div>
                        </div>
                    </div>

                    {/* View Account Info Card */}
                    <div className="col">
                        <div className="card shadow-lg border-light rounded-lg h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title text-dark">View Account Info</h5>
                                <p className="card-text text-muted">See your account details and history.</p>
                                <a href="/admin/account-info" className="btn btn-info btn-lg w-100">View Account</a>
                            </div>
                        </div>
                    </div>

                    {/* Batch Process Card */}
                    <div className="col">
                        <div className="card shadow-lg border-light rounded-lg h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title text-dark">Batch Process</h5>
                                <p className="card-text text-muted">Run batch operations on the system.</p>
                                <a href="/admin/batch-process" className="btn btn-warning btn-lg w-100">Start Batch Process</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Round Button for User Info */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="btn btn-info btn-circle btn-sm position-absolute"
                    style={{ top: '20px', right: '20px', width: '40px', height: '40px', borderRadius: '50%' }}
                >
                    i
                </button>

                {/* Show user details when the button is clicked */}
                {showDetails && (
                    <div className="position-absolute" style={{ top: '70px', right: '20px' }}>
                        <div className="bg-light p-3 shadow rounded">
                            <p><strong>User ID:</strong> {adminData.userName}</p>
                            <p><strong>Last Login:</strong> {adminData.lastLogin}</p>
                            <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AdminDashboard;

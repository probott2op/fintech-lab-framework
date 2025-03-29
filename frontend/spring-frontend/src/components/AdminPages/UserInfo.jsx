import  { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../service/UserService.js";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    useEffect(() => {
        searchUsers(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const searchUsers = async (page, query) => {
        const response = await UserService.getSearch(page, query);
        setUsers(response.content);
        setTotalPages(response.totalPages);
    }
    const fetchUsers = async (page) => {
        const response = await UserService.getUsers(page);
        setUsers(response.content);
        setTotalPages(response.totalPages);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(0); // Reset to first page when searching
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">User Directory</h2>

            {/* Search Bar */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
            />

            {/* Users Table */}
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.userName}>
                            <td>{user.userName}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center text-muted">
                            No users found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Pagination */}
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(totalPages).keys()].map((page) => (
                        <li
                            key={page}
                            className={`page-item ${page === currentPage ? "active" : ""}`}
                            onClick={() => handlePageChange(page)}
                        >
                            <button className="page-link">{page + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default UsersList;

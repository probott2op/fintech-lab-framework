function Header() {
    return (
      <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a href="/" className="navbar-brand d-flex align-items-center">
            {/* Krutev Bank Text Logo */}
            <span className="fw-bold fs-3 text-primary me-2">Krutev</span>
            <span className="fw-normal fs-4 text-secondary">Bank</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">Products</a>
              </li>
              {/* Add other nav items if needed */}
            </ul>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;
  
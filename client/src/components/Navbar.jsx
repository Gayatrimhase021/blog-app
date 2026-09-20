import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">B</span>
          <span>BlogNest</span>
        </Link>


        {/* Navigation */}
        <div className="navbar-links">

          <Link to="/" className="nav-link">
            All Blogs
          </Link>

          <Link to="/new" className="nav-link create-link">
            + Create Blog
          </Link>

          {token ? (
            <button
              className="nav-logout"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("loggedInUser");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-login">
              Login
            </Link>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
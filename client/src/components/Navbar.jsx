import { Link } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    window.location.href = "/login";
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">
          BlogNest
        </Link>
      </div>

      <div className="navbar-links">

        <Link to="/">
          All Blogs
        </Link>

        <Link to="/new">
          New Blog
        </Link>

        {!token ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <button onClick={logout}>
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
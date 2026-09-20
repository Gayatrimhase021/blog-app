import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async () => {
    try {
      if (!user.email || !user.password) {
        alert("Please fill all fields");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        JSON.stringify(user),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Login response:", response.data);

      if (response?.data?.success) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.user)
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        alert("Login successful");

        window.location.href = "/";
      }
    } catch (error) {
      console.log("Login error:", error.message);
      console.log("Login response:", error.response?.data);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <h1>Login Page</h1>

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value
            })
          }
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value
              })
            }
          />

          <span
            className="password-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <button
          className="login-btn"
          onClick={loginUser}
        >
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;







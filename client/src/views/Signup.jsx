import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Signup.css";

function Signup() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const signupUser = async () => {

    try {

      if (!user.name || !user.email || !user.password) {
        alert("Please fill all fields");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup`,
        JSON.stringify(user),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Signup response:", response.data);

      if (response?.data?.success) {
        alert("Signup successful");
        window.location.href = "/login";
      }

    } catch (error) {

      console.log("ERROR MESSAGE:", error.message);

      console.log(
        "ERROR RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        error.message ||
        "Signup failed"
      );

    }
  };

  return (

    <div className="signup-page">

      <div className="signup-container">

        <h1>Signup Page</h1>

        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value
            })
          }
        />

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
          type="button"
          onClick={signupUser}
        >
          Sign Up
        </button>

        <p>
          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>

  );
}

export default Signup;




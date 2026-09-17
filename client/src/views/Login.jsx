
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });


  const loginUser = async () => {
    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        user
      );

      console.log(response.data);

      if (response?.data?.success) {

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.user)
        );

        window.location.href = "/";

      }

    } catch (error) {

      console.log(error.response?.data);

    }
  };


  return (
    <div className="max-w-[400px] mx-auto border-1 border-gray-500 py-4 px-4">

      <h1 className="text-center font-bold mb-4">
        Login Page
      </h1>


      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded w-full mb-4"
        value={user.email}
        onChange={(e) =>
          setUser({
            ...user,
            email: e.target.value
          })
        }
      />


      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded w-full mb-4"
        value={user.password}
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value
          })
        }
      />


      <button
        className="bg-gray-700 text-white px-6 py-2 rounded-md"
        onClick={loginUser}
      >
        Login
      </button>


      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:underline"
        >
          Sign Up
        </Link>
      </p>

    </div>
  );
}

export default Login;








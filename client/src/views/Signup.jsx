
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
const signupUser = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/signup`,
      user
    );

    console.log(response.data);
  } catch (error) {
    console.error("Signup error:", error);
  }
};

  return (
    <div className="max-w-[400px] mx-auto border-1 border-gray-500 py-4 px-4">
      <h1 className="text-center font-bold mb-4">Signup Page</h1>

      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded w-full mb-4"
        value={user.name}
        onChange={(e) =>
          setUser({ ...user, name: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded w-full mb-4"
        value={user.email}
        onChange={(e) =>
          setUser({ ...user, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded w-full mb-4"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
      />

      <button
        className="bg-gray-700 text-white px-6 py-2 rounded-md"
        type="button"
        onClick={signupUser}
      >
        Sign Up
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;



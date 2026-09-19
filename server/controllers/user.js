import User from "./../models/User.js";
import md5 from "md5";
import jwt from "jsonwebtoken";


// SIGNUP
const postSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, email and password are required"
      });
    }

    const emailValidationRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameValidationRegex =
      /^[A-Za-z ]+$/;

    const passwordValidationRegex =
      /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!nameValidationRegex.test(name)) {
      return res.status(400).json({
        success: false,
        message: "Name should contain only alphabets and space"
      });
    }

    if (!emailValidationRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email"
      });
    }

    if (!passwordValidationRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters and contain one letter and one number"
      });
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          `User with email ${email} already exists`
      });
    }

    const newUser = new User({
      name,
      email,
      password: md5(password)
    });

    const savedUser =
      await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message
    });
  }
};


// LOGIN
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required"
      });
    }

    const existingUser =
      await User.findOne({
        email,
        password: md5(password)
      });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};


// EXPORT
export {
  postLogin,
  postSignup
};


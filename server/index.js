import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";

import {
  postBlog,
  getAllBlogs,
  getBlogBySlug,
  patchBlog
} from "./controllers/blog.js";

import jwt from "jsonwebtoken";
import md5 from "md5";

import { postLogin, postSignup } from "./controllers/user.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    console.log("Database:", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the server!"
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "API is working!"
  });
});

// Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name: name,
      email: email,
      password: md5(password)
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message
    });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email
    });

    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.password !== md5(password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name || user.username,
        email: user.email
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
});

app.post("/signup", postSignup);
app.post("/login", postLogin);

// Blog APIs
app.get("/api/blog", getAllBlogs);
app.get("/api/blog/:slug", getBlogBySlug);
app.post("/api/blog", postBlog);
app.patch("/api/blog/:slug", patchBlog);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
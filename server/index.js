import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";

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
      username: name,
      email: email,
      password: password
    });

    res.status(201).json({
      message: "Signup successful",
      user: user
    });

  } catch (error) {
    res.status(500).json({
      message: "Signup failed",
      error: error.message
    });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: user
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
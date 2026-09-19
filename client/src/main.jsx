import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AllBlogs from "./views/AllBlogs";
import EditBlog from "./views/EditBlog";
import ReadBlog from "./views/ReadBlog";

import Login from "./views/Login";
import Signup from "./views/Signup";
import NewBlog from "./views/NewBlog";

import Navbar from "./components/Navbar";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<AllBlogs />}
        />

        <Route
          path="/new"
          element={<NewBlog />}
        />

        <Route
          path="/blog/:slug"
          element={<ReadBlog />}
        />

        <Route
          path="/edit/:slug"
          element={<EditBlog />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);
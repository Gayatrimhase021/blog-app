import Blog from "../models/Blog.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import slugify from "../utils/slugify.js";


// CREATE BLOG
const postBlog = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "JWT token required"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    const {
      title,
      category,
      technology,
      content,
      status
    } = req.body;

    if (!title || !category || !technology || !content) {
      return res.status(400).json({
        success: false,
        message:
          "Title, category, technology and content are required"
      });
    }

    const slug = slugify(title);

    const existingBlog = await Blog.findOne({ slug });

    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "Blog with this title already exists"
      });
    }

    const blog = new Blog({
      title,
      slug,
      category,
      technology,
      content,

      // JWT मधून logged-in user
      author: user._id,

      status: status || "draft",

      publishedAt:
        status === "published"
          ? new Date()
          : null
    });

    const savedBlog = await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: savedBlog
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// GET ALL BLOGS
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({
        createdAt: -1
      });

    res.json({
      success: true,
      blogs
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch blogs",
      error: error.message
    });
  }
};


// GET BLOG BY SLUG
const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug })
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.json({
      success: true,
      blog
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch blog",
      error: error.message
    });
  }
};


// PATCH BLOG
const patchBlog = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "JWT token required"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    // फक्त स्वतःचा blog edit करू शकतो
    if (blog.author.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can edit only your own blog"
      });
    }

    const {
      title,
      category,
      technology,
      content,
      status
    } = req.body;

    if (title) {
      blog.title = title;
      blog.slug = slugify(title);
    }

    if (category) {
      blog.category = category;
    }

    if (technology) {
      blog.technology = technology;
    }

    if (content) {
      blog.content = content;
    }

    if (status) {
      blog.status = status;

      if (status === "published") {
        if (!blog.publishedAt) {
          blog.publishedAt = new Date();
        }
      }

      if (status === "draft") {
        blog.publishedAt = null;
      }
    }

    const updatedBlog = await blog.save();

    res.json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to update blog",
      error: error.message
    });
  }
};


export {
  postBlog,
  getAllBlogs,
  getBlogBySlug,
  patchBlog
};
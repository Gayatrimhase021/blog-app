import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewBlog.css";

function NewBlog() {

  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    technology: "",
    content: "",
    status: "draft"
  });


  const createBlog = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }


      if (
        !blog.title ||
        !blog.category ||
        !blog.technology ||
        !blog.content
      ) {
        alert("Please fill all fields");
        return;
      }


      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blog`,
        JSON.stringify(blog),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );


      if (response?.data?.success) {

        alert("Blog created successfully");

        window.location.href = "/";

      }

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Unable to create blog"
      );

    }

  };


  return (

    <div className="new-blog-page">

      <div className="new-blog-container">

        <div className="new-blog-header">

          <h1>Write New Blog</h1>

          <p>
            Share your knowledge, ideas and experience
          </p>

        </div>


        <div className="new-blog-form">


          {/* TITLE */}

          <div className="form-group">

            <label>Blog Title</label>

            <input
              type="text"
              placeholder="Enter your blog title"
              value={blog.title}
              onChange={(e) =>
                setBlog({
                  ...blog,
                  title: e.target.value
                })
              }
            />

          </div>


          {/* CATEGORY + TECHNOLOGY */}

          <div className="form-row">

            <div className="form-group">

              <label>Category</label>

              <select
                value={blog.category}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    category: e.target.value
                  })
                }
              >

                <option value="">
                  Select Category
                </option>

                <option value="Technology">
                  Technology
                </option>

                <option value="Health">
                  Health
                </option>

                <option value="Lifestyle">
                  Lifestyle
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Travel">
                  Travel
                </option>

                <option value="Business">
                  Business
                </option>

                <option value="Food">
                  Food
                </option>

              </select>

            </div>


            <div className="form-group">

              <label>Technology</label>

              <input
                type="text"
                placeholder="Example: React JS"
                value={blog.technology}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    technology: e.target.value
                  })
                }
              />

            </div>

          </div>


          {/* CONTENT EDITOR */}

          <div className="form-group">

            <label>Blog Content</label>

            <div className="editor">

              <div className="editor-toolbar">

                <button
                  type="button"
                  onClick={() =>
                    setBlog({
                      ...blog,
                      content:
                        blog.content + "\n\n# "
                    })
                  }
                >
                  H
                </button>


                <button
                  type="button"
                  onClick={() =>
                    setBlog({
                      ...blog,
                      content:
                        blog.content + "\n**Bold text**"
                    })
                  }
                >
                  B
                </button>


                <button
                  type="button"
                  onClick={() =>
                    setBlog({
                      ...blog,
                      content:
                        blog.content + "\n- "
                    })
                  }
                >
                  List
                </button>


                <span>
                  Write your blog below
                </span>

              </div>


              <textarea
                className="blog-editor"
                placeholder="Start writing your blog here...

You can write:
• Introduction
• Main content
• Examples
• Code
• Conclusion

Example:

React JS is a JavaScript library used for
building user interfaces.

const App = () => {
  return <h1>Hello React</h1>;
};"
                value={blog.content}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    content: e.target.value
                  })
                }
              />

              <div className="editor-footer">

                <span>
                  {blog.content.length} characters
                </span>

              </div>

            </div>

          </div>


          {/* STATUS */}

          <div className="form-group">

            <label>Blog Status</label>

            <div className="status-buttons">

              <button
                type="button"
                className={
                  blog.status === "draft"
                    ? "status-button selected"
                    : "status-button"
                }
                onClick={() =>
                  setBlog({
                    ...blog,
                    status: "draft"
                  })
                }
              >
                Draft
              </button>


              <button
                type="button"
                className={
                  blog.status === "published"
                    ? "status-button selected"
                    : "status-button"
                }
                onClick={() =>
                  setBlog({
                    ...blog,
                    status: "published"
                  })
                }
              >
                Publish
              </button>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="new-blog-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() =>
                navigate("/")
              }
            >
              Cancel
            </button>


            <button
              type="button"
              className="create-button"
              onClick={createBlog}
            >
              {blog.status === "draft"
                ? "Save Draft"
                : "Publish Blog"}
            </button>

          </div>


        </div>

      </div>

    </div>

  );
}

export default NewBlog;

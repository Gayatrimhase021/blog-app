import { useEffect, useState } from "react";
import axios from "axios";
import {
  useNavigate,
  useParams
} from "react-router-dom";

function EditBlog() {

  const { slug } = useParams();

  const navigate = useNavigate();


  const [blog, setBlog] = useState({
    title: "",
    category: "",
    technology: "",
    content: "",
    status: "draft"
  });


  const getBlog = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blog/${slug}`
      );

      if (response?.data?.success) {

        const data = response.data.blog;

        setBlog({
          title: data.title,
          category: data.category,
          technology: data.technology,
          content: data.content,
          status: data.status
        });

      }

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    getBlog();

  }, [slug]);


  const updateBlog = async () => {

    try {

      const token =
        localStorage.getItem("token");


      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/blog/${slug}`,
        blog,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      if (response?.data?.success) {

        alert("Blog updated successfully");

        navigate(
          `/blog/${response.data.blog.slug}`
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Unable to update blog"
      );

    }

  };


  return (

    <div className="blog-form-page">

      <div className="blog-form">

        <h1>Edit Blog</h1>


        <input
          type="text"
          placeholder="Blog title"
          value={blog.title}
          onChange={(e) =>
            setBlog({
              ...blog,
              title: e.target.value
            })
          }
        />


        <select
          value={blog.category}
          onChange={(e) =>
            setBlog({
              ...blog,
              category: e.target.value
            })
          }
        >

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


        <input
          type="text"
          placeholder="Technology"
          value={blog.technology}
          onChange={(e) =>
            setBlog({
              ...blog,
              technology: e.target.value
            })
          }
        />


        <textarea
          rows="12"
          placeholder="Write your blog..."
          value={blog.content}
          onChange={(e) =>
            setBlog({
              ...blog,
              content: e.target.value
            })
          }
        />


        <div className="status-selection">

          <button
            type="button"
            className={
              blog.status === "draft"
                ? "status-active"
                : ""
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
                ? "status-active"
                : ""
            }
            onClick={() =>
              setBlog({
                ...blog,
                status: "published"
              })
            }
          >
            Published
          </button>

        </div>


        <button
          className="create-blog-btn"
          onClick={updateBlog}
        >
          Update Blog
        </button>

      </div>

    </div>

  );
}

export default EditBlog;
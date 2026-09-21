import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ReadBlog.css";

function ReadBlog() {

  const { slug } = useParams();

  const [blog, setBlog] = useState(null);

  const getBlog = async () => {
    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blog/${slug}`
      );

      console.log("Read Blog Response:", response.data);

      if (response.data.success) {
        setBlog(response.data.blog);
      }

    } catch (error) {

      console.log(
        "Read Blog Error:",
        error.response?.data || error.message
      );

    }
  };

  useEffect(() => {
    getBlog();
  }, [slug]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="read-blog">

      <h1>{blog.title}</h1>

      <p>
        Technology: {blog.technology}
      </p>

      <p>
        Written by: {blog.author?.name || "Unknown"}
      </p>

      <p>
        Email: {blog.author?.email || "Not available"}
      </p>

      <p>
        Published:{" "}
        {blog.publishedAt
          ? new Date(blog.publishedAt).toLocaleString()
          : "Not published"}
      </p>

      <hr />

      <div>
        {blog.content}
      </div>

      <br />

      <Link to={`/edit/${blog.slug}`}>
        Edit Blog
      </Link>

    </div>
  );
}

export default ReadBlog;
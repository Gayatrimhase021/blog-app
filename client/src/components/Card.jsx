import { Link } from "react-router-dom";
import "./Card.css";

function Card({ blog }) {

  const blogDate =
    blog.status === "published" && blog.publishedAt
      ? blog.publishedAt
      : blog.createdAt;

  return (
    <div className="blog-card">

      <div className="blog-card-top">

        <span className="technology">
          {blog.technology}
        </span>

        <span
          className={
            blog.status === "draft"
              ? "draft-btn"
              : "published-btn"
          }
        >
          {blog.status}
        </span>

      </div>


      <h2 className="blog-card-title">
        {blog.title}
      </h2>


      <div className="blog-category">
        {blog.category}
      </div>


      <p className="blog-card-content">
        {blog.content}
      </p>


      <div className="author-details">

        <p>
          <strong>Author:</strong>{" "}
          {blog.author?.name || "Unknown"}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {blog.author?.email || "Not available"}
        </p>

        <p>
          <strong>
            {blog.status === "published"
              ? "Published:"
              : "Created:"}
          </strong>{" "}
          {blogDate
            ? new Date(blogDate).toLocaleDateString()
            : "Not available"}
        </p>

      </div>


      <div className="card-buttons">

        <Link
          to={`/blog/${blog.slug}`}
          className="read-btn"
        >
          Read Blog
        </Link>

        <Link
          to={`/edit/${blog.slug}`}
          className="edit-btn"
        >
          Edit Blog
        </Link>

      </div>

    </div>
  );
}

export default Card;
import { Link } from "react-router-dom";

function Card({ blog }) {

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


      <h2>{blog.title}</h2>


      <p className="category">
        {blog.category}
      </p>


      <div className="author-details">

        <p>
          <strong>Name:</strong>{" "}
          {blog.author?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {blog.author?.email}
        </p>

        <p>
          <strong>
            {blog.status === "published"
              ? "Published:"
              : "Created:"}
          </strong>{" "}
          {new Date(
            blog.publishedAt || blog.createdAt
          ).toLocaleDateString()}
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
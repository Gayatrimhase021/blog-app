import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

function AllBlogs() {

  const [blogs, setBlogs] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");


  const categories = [
    "All",
    "Technology",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Business",
    "Food"
  ];


  const getBlogs = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blog`
      );

      if (response?.data?.success) {

        setBlogs(response.data.blogs);

      }

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    getBlogs();

  }, []);


  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) =>
            blog.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );


  return (

    <div className="all-blogs-page">

      <div className="blogs-sidebar">

        <h2>Technology</h2>

        <div className="category-list">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
            >
              {category}
            </button>

          ))}

        </div>

      </div>


      <div className="blogs-content">

        <div className="blogs-heading">

          <div>
            <h1>All Blogs</h1>

            <p>
              Explore the latest blogs and articles
            </p>
          </div>

        </div>


        <div className="blogs-grid">

          {filteredBlogs.length > 0 ? (

            filteredBlogs.map((blog) => (

              <Card
                key={blog._id}
                blog={blog}
              />

            ))

          ) : (

            <div className="no-blogs">
              <h2>No blogs found</h2>
              <p>
                There are no blogs in this category.
              </p>
            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default AllBlogs;


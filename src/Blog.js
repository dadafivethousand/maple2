import { useState, useEffect } from "react";
import './Stylesheets/Blog.css';
import { Link } from "react-router-dom";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch('https://worker-consolidated.maxli5004.workers.dev/blog-list');
        const data = await response.json();
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sorted);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      }
    }
    fetchBlogPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const start = (page - 1) * postsPerPage;
  const paginatedPosts = posts.slice(start, start + postsPerPage);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="blog-container">
      <h1 id="blog-title">Blog</h1>

      <div className="blog-posts">
        {paginatedPosts.map((post, index) => (
          <div className="blog-post" key={index}>
            <Link to={`/blog/${post.slug}`}>
              <h5>{post.title}</h5>
              <p>{post.snippet}</p>
              <span className="blog-date">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric'
                })}
              </span>
            </Link>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={() => goToPage(page - 1)} disabled={page === 1}>‹</button>

          <button className={page === 1 ? "active-page" : ""} onClick={() => goToPage(1)}>1</button>

          {page > 4 && <span>…</span>}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p !== 1 && p !== totalPages && Math.abs(p - page) <= 2)
            .map(p => (
              <button key={p} className={page === p ? "active-page" : ""} onClick={() => goToPage(p)}>
                {p}
              </button>
            ))}

          {page < totalPages - 3 && <span>…</span>}

          {totalPages > 1 && (
            <button className={page === totalPages ? "active-page" : ""} onClick={() => goToPage(totalPages)}>
              {totalPages}
            </button>
          )}

          <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>›</button>
        </div>
      )}
    </div>
  );
}

// FullPost.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../Stylesheets/FullPost.css';

export default function FullPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`https://worker-consolidated.maxli5004.workers.dev/full-blog/${slug}`);
        const data = await res.json();
        console.log("✅ Fetched post:", data);
  
        // Adjust date by subtracting 1 month
        const originalDate = new Date(data.date);
        originalDate.setMonth(originalDate.getMonth()-1);
  
        // Replace date in post
        const adjustedPost = {
          ...data,
          date: originalDate.toISOString() // or format however you like
        };
  
        setPost(adjustedPost);
      } catch (err) {
        console.error("❌ Error loading post:", err);
      }
    }
  
    fetchPost();
  }, [slug]);
  

  if (!post) return <div className="full-post">Loading...</div>;

  return (
        <div className="full-post-container">
    <div className="full-post">
      <h3 id='post-title'>{post.title}</h3>
      <p>{new Date(post.date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})}</p>

      {post.body ? (
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      ) : (
        <p style={{ color: 'red' }}>No body found</p>
      )}
    </div>

    </div>
  );
}

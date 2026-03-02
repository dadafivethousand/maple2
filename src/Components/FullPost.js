// FullPost.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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

  const postUrl = `https://maplebjj.com/blog/${slug}`;
  const postDescription = post.excerpt || post.title;

  return (
        <div className="full-post-container">
      <Helmet>
        <title>{post.title} | Maple Jiu-Jitsu Academy</title>
        <meta name="description" content={postDescription} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={postDescription} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={postDescription} />
        {post.image && <meta name="twitter:image" content={post.image} />}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": postDescription,
          "url": postUrl,
          "datePublished": post.date,
          "publisher": {
            "@type": "Organization",
            "name": "Maple Jiu-Jitsu Academy",
            "url": "https://maplebjj.com"
          }
        })}</script>
      </Helmet>
    <div className="full-post">
      <h1 id='post-title'>{post.title}</h1>
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

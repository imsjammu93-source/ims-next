'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBlogs } from '@/lib/fetchData';

function BlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs(null, 0, 4);
      setBlogs(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  if (loading) return (
    <section id="blogs-section" className="section">
      <div className="container text-center">
        <p>Loading Latest Insights...</p>
      </div>
    </section>
  );

  if (!blogs || blogs.length === 0) return null;

  // Find the featured post, or default to the newest one
  const featured = blogs.find(b => b.is_featured == 1) || blogs[0];
  // Exclude the featured post from the sidebar list
  const sideList = blogs.filter(b => b.id !== featured.id);

  return (
    <section id="blogs-section" className="section" aria-labelledby="blogs-title">
      <div className="container">
        <div className="text-center" data-aos="fade-up">
          <div className="section-label">Institutional Insights</div>
          <h2 className="section-title" id="blogs-title">
            Latest <span>from our Blog</span>
          </h2>
          <p className="section-desc">
            Deep dives into management trends, career guidance, and life at IMS Jammu 
            written by our faculty and students.
          </p>
        </div>

        <div className="news-grid">
          {/* Featured Blog */}
          <div className="news-featured" data-aos="fade-right">
            <div className="news-featured__img-wrap">
              <img
                src={featured.image_url || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200"}
                alt={featured.title}
                loading="lazy"
              />
            </div>
            <div className="news-featured__overlay" />
            <div className="news-featured__content">
              <span className="news-tag">{featured.category_name || 'Featured Article'}</span>
              <h3 className="news-featured__title">
                {featured.title}
              </h3>
              <div className="news-meta">
                <span><i className="fas fa-calendar-alt" /> {new Date(featured.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                <Link href={`/blogs/${featured.slug}`} className="read-more-link">
                  Read Full Story <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Articles List */}
          <div className="news-scroll" data-aos="fade-left">
            <div className="news-scroll-header">
              <h4>Recent <span>Articles</span></h4>
              <Link href="/blogs" className="view-all-link">Explore All</Link>
            </div>
            
            <div className="news-scroll-list">
              {sideList.map((blog, index) => (
                <Link key={index} href={`/blogs/${blog.slug}`} className="news-scroll-item blog-item" style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="news-scroll-text">
                    <div className="news-scroll-text__tag">{blog.category_name}</div>
                    <h5 className="news-scroll-text__title">{blog.title}</h5>
                    <p className="blog-excerpt" style={{ 
                      fontSize: '0.85rem', 
                      color: '#64748b', 
                      margin: '8px 0',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>{blog.short_description}</p>
                    <div className="news-scroll-text__meta">
                      <span className="date"><i className="far fa-calendar-alt" /> {new Date(blog.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogsSection;
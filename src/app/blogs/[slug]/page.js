import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs } from "@/lib/fetchData";
import "@/assets/css/blog-detail.css";

/**
 * SEO - Dynamic Metadata Generation
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return { title: 'Post Not Found' };

  return {
    title: `${blog.title} | IMS Jammu Blog`,
    description: blog.excerpt || blog.content?.substring(0, 160).replace(/<[^>]*>/g, ''),
    keywords: [blog.category_name, "IMS Jammu Blog", "Management Insights", "Jammu Education"],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.published_at,
      authors: [blog.author_name || 'IMS Faculty'],
      images: [blog.image_url || '/assets/img/default-blog.jpg'],
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}

import Layout from "@/layoutComponents/Layout";
import PageHeader from "@/layoutComponents/PageHeader";

import { contactInfo } from "@/config/contactInfo";
import QuickLinksCard from '@/components/QuickLinksCard';

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  
  // Fetch data in parallel for performance
  const [blog, recentBlogs] = await Promise.all([
    getBlogBySlug(slug),
    getBlogs(null, 0, 5) // Get 5 active recent blogs for sidebar
  ]);

  if (!blog) {
    notFound();
  }

  // Filter out current blog from recent
  const otherRecent = recentBlogs.filter(b => b.slug !== slug).slice(0, 4);

  const formattedDate = new Date(blog.published_at).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getInitials = (name = '') => 
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Layout>
      <PageHeader 
        title={blog.title}
        subtitle={`${blog.category_name} • ${formattedDate} • By ${blog.author_name || 'IMS Faculty'}`}
               bgImage="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1920"
   />

      <main className="blog-detail-page">
        <section className="section">
          <div className="container">
            <div className="layout-with-sidebar">
              
              {/* MAIN ARTICLE */}
              <div className="tpc-message-left">
                <article className="blog-main-article">
                  {/* FEATURED IMAGE */}
                  {blog.image_url && (
                    <div className="blog-featured-image" style={{ 
                      marginBottom: '40px', 
                      borderRadius: '20px', 
                      overflow: 'hidden', 
                      boxShadow: '0 10px 30px rgba(11, 26, 51, 0.1)',
                      border: '1px solid #f1f5f9'
                    }}>
                      <img 
                        src={blog.image_url} 
                        alt={blog.title} 
                        style={{ 
                          width: '100%', 
                          height: 'auto', 
                          maxHeight: '550px',
                          display: 'block', 
                          objectFit: 'cover' 
                        }} 
                      />
                    </div>
                  )}
                  <div 
                    className="blog-content-body"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {/* AUTHOR BIO BOX */}
                  <div className="blog-author-card">
                    <div className="author-avatar">
                      {getInitials(blog.author_name || 'IMS Admin')}
                    </div>
                    <div className="author-info">
                      <h4>{blog.author_name || 'IMS Admin'}</h4>
                      <p>Faculty & Content Contributor at Institute of Management Sciences, Jammu. Dedicated to providing academic excellence and industry insights.</p>
                      
                      <div className="share-bar">
                        <a href={contactInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="share-btn" title="Follow us on Facebook">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a href={contactInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="share-btn" title="Follow us on Instagram">
                          <i className="fab fa-instagram" />
                        </a>
                        <a href={contactInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="share-btn" title="Connect on LinkedIn">
                          <i className="fab fa-linkedin-in" />
                        </a>
                        <a href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' - ')}`} target="_blank" rel="noopener noreferrer" className="share-btn" title="Share on WhatsApp">
                          <i className="fab fa-whatsapp" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              {/* SIDEBAR */}
              <aside className="sidebar">
                <div className="sidebar-widget">
                  <h3 className="widget-title"><i className="fas fa-bolt" /> Recent Insights</h3>
                  <div className="related-posts">
                    {otherRecent.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/blogs/${item.slug}`}
                        className="related-post-item"
                      >
                        <div className="related-thumb">
                          <img src={item.image_url || '/assets/img/placeholder.jpg'} alt={item.title} />
                        </div>
                        <div className="related-text">
                          <h5>{item.title}</h5>
                          <span className="related-date">{new Date(item.published_at).toLocaleDateString()}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '30px' }}>
                   <QuickLinksCard />
                </div>

                {/* CALL TO ACTION WIDGET */}
                <div className="sidebar-widget" style={{ background: 'var(--clr-navy)', color: 'white', marginTop: '30px' }}>
                  <h3 className="widget-title" style={{ color: 'white', borderBottomColor: 'rgba(255,255,255,0.1)' }}>
                    Apply Now
                  </h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>
                    Join our academic programs and kickstart your career in Management & Technology.
                  </p>
                  <Link href="/admissions" className="btn btn-primary w-100" style={{ textAlign: 'center' }}>
                    Admission Enquiry
                  </Link>
                </div>
              </aside>

            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

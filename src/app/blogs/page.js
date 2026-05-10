'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Layout from '@/layoutComponents/Layout';
import PageHeader from '@/layoutComponents/PageHeader';
import QuickLinksCard from '@/components/QuickLinksCard';
import { getBlogs, getBlogCategories } from '@/lib/fetchData';
import { contactInfo } from '@/config/contactInfo';
import '@/assets/css/blogs.css';

// ── Helpers ──────────────────────────────────────────────
function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ── Skeleton loader ───────────────────────────────────────
function ArticleSkeleton() {
  return (
    <div className="article-skeleton">
      <div className="sk-block sk-img" />
      <div className="sk-body">
        <div className="sk-block sk-tag" />
        <div className="sk-block sk-title" />
        <div className="sk-block sk-title-s" />
        <div className="sk-block sk-line" />
        <div className="sk-block sk-line-s" />
      </div>
    </div>
  );
}

// ── Article Row Card ─────────────────────────────────────
function ArticleRow({ blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="article-row">
      <div className="article-row__img">
        {blog.image_url
          ? <img src={blog.image_url} alt={blog.title} loading="lazy" />
          : <div className="article-row__img-placeholder"><i className="fas fa-newspaper" /></div>
        }
      </div>
      <div className="article-row__body">
        {blog.category_name && (
          <span className="article-row__cat">{blog.category_name}</span>
        )}
        <h3 className="article-row__title">{blog.title}</h3>
        {blog.short_description && (
          <p className="article-row__excerpt">{blog.short_description}</p>
        )}
        <div className="article-row__footer">
          <span className="article-row__date">
            <i className="far fa-calendar-alt" /> {formatDate(blog.published_at)}
          </span>
          {blog.author_name && (
            <span className="article-row__date">
              <i className="far fa-user" /> {blog.author_name}
            </span>
          )}
          <div className="article-row__arrow">
            <i className="fas fa-arrow-right" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main Page ────────────────────────────────────────────
export default function BlogsPage() {
  const [blogs, setBlogs]           = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat]   = useState('all');
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [blogData, catData] = await Promise.all([
        getBlogs(null, 0),
        getBlogCategories(0),
      ]);

 
      
      setBlogs(blogData);
      setCategories(catData);
      setLoading(false);
    })();
  }, []);

  // Featured = is_featured or newest
  const featured = useMemo(
    () => blogs.find(b => b.is_featured == 1) || blogs[0],
    [blogs]
  );

  // Filtered list (excludes featured in "all" view)
  const listBlogs = useMemo(() => {
    if (activeCat !== 'all') {
      return blogs.filter(b => String(b.category_id) === String(activeCat));
    }
    return blogs.filter(b => b.id !== featured?.id);
  }, [blogs, activeCat, featured]);

  // Category post counts
  const catCounts = useMemo(() => {
    const m = {};
    blogs.forEach(b => { if (b.category_id) m[b.category_id] = (m[b.category_id] || 0) + 1; });
    return m;
  }, [blogs]);

  const activeCatName = useMemo(() => {
    if (activeCat === 'all') return null;
    return categories.find(c => String(c.id) === String(activeCat))?.name || null;
  }, [activeCat, categories]);

  // Recent 5 for sidebar
  const recentPosts = useMemo(() => blogs.slice(0, 5), [blogs]);

  return (
    <Layout>
      <PageHeader
        title="Institutional Insights"
        subtitle="Research, thought leadership & campus stories from IMS Jammu."
        bgImage="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="blogs-page">
        <section className="container blogs-content-wrap">
          <div className="layout-with-sidebar">

            {/* ════ MAIN CONTENT ════════════════════ */}
            <div>
              {/* Section label */}
              <div style={{ marginBottom: 30 }}>
                <div className="section-label">Latest Articles</div>
                <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>
                  Our <span>Blog</span>
                </h2>
              </div>

              {/* Category Filter Bar */}
              <div className="blogs-filter-bar">
                <span className="filter-label">Filter:</span>
                <button
                  className={`filter-pill ${activeCat === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCat('all')}
                >
                  All Posts
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`filter-pill ${String(activeCat) === String(cat.id) ? 'active' : ''}`}
                    onClick={() => setActiveCat(String(cat.id))}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* ── Featured Hero (only on "All") ── */}
              {!loading && featured && activeCat === 'all' && (
                <Link href={`/blogs/${featured.slug}`} className="blogs-hero">
                  <img
                    src={featured.image_url || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200'}
                    alt={featured.title}
                    loading="eager"
                  />
                  <div className="blogs-hero__overlay" />
                  <div className="blogs-hero__content">
                    <div className="blogs-hero__eyebrow">
                      {featured.is_featured == 1 && (
                        <span className="hero-featured-badge">
                          <i className="fas fa-star" /> Featured
                        </span>
                      )}
                      {featured.category_name && (
                        <span className="hero-cat-badge">{featured.category_name}</span>
                      )}
                    </div>
                    <h2 className="blogs-hero__title">{featured.title}</h2>
                    <div className="blogs-hero__meta">
                      <span><i className="far fa-calendar-alt" /> {formatDate(featured.published_at)}</span>
                      {featured.author_name && (
                        <span><i className="far fa-user" /> {featured.author_name}</span>
                      )}
                      <span className="blogs-hero__cta">
                        Read Full Article <i className="fas fa-arrow-right" />
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* ── Sub-header for article list ── */}
              <div className="blogs-sub-header">
                <h3>
                  {activeCat === 'all' ? <>Recent <span>Articles</span></> : <><span>{activeCatName}</span> Articles</>}
                </h3>
                {activeCatName && (
                  <button
                    className="active-cat-tag"
                    onClick={() => setActiveCat('all')}
                  >
                    {activeCatName} <i className="fas fa-times" />
                  </button>
                )}
              </div>

              {/* ── Article List ── */}
              <div className="blogs-article-list">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => <ArticleSkeleton key={i} />)
                  : listBlogs.length === 0
                    ? (
                      <div className="blogs-empty">
                        <i className="fas fa-newspaper" />
                        <h3>No articles found</h3>
                        <p>No posts in this category yet. Check back soon!</p>
                      </div>
                    )
                    : listBlogs.map(blog => <ArticleRow key={blog.id} blog={blog} />)
                }
              </div>
            </div>

            {/* ════ SIDEBAR ═════════════════════════ */}
            <aside className="sidebar">

             

              {/* Categories */}
              {(loading || categories.length > 0) && (
                <div className="quick-links-card">
                  <div className="ql-title">
                    <i className="fas fa-tags" style={{ color: 'var(--clr-gold)' }} />
                    Browse Categories
                  </div>
                  <button
                    className={`sidebar-cat-item ${activeCat === 'all' ? 'is-active' : ''}`}
                    onClick={() => setActiveCat('all')}
                  >
                    <span className="sidebar-cat-item__name">
                      <i className="fas fa-chevron-right" /> All Articles
                    </span>
                    <span className="sidebar-cat-count">{blogs.length}</span>
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`sidebar-cat-item ${String(activeCat) === String(cat.id) ? 'is-active' : ''}`}
                      onClick={() => setActiveCat(String(cat.id))}
                    >
                      <span className="sidebar-cat-item__name">
                        <i className="fas fa-chevron-right" /> {cat.name}
                      </span>
                      <span className="sidebar-cat-count">{catCounts[cat.id] || 0}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Recent Posts */}
              <div className="quick-links-card">
                <div className="ql-title">
                  <i className="fas fa-clock" style={{ color: 'var(--clr-gold)' }} />
                  Recent Posts
                </div>
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} style={{ padding: '14px 0', borderBottom: '1px dashed #f0f0f0' }}>
                        <div className="sk-block sk-title" style={{ marginBottom: 8 }} />
                        <div className="sk-block sk-line-s" />
                      </div>
                    ))
                  : recentPosts.map(post => (
                      <Link key={post.id} href={`/blogs/${post.slug}`} className="sidebar-recent-item">
                        <div className="sidebar-recent-thumb">
                          {post.image_url
                            ? <img src={post.image_url} alt={post.title} loading="lazy" />
                            : <div className="sidebar-recent-thumb-placeholder"><i className="fas fa-image" /></div>
                          }
                        </div>
                        <div className="sidebar-recent-text">
                          <div className="sidebar-recent-title">{post.title}</div>
                          <div className="sidebar-recent-date">
                            <i className="far fa-calendar-alt" /> {formatDate(post.published_at)}
                          </div>
                        </div>
                      </Link>
                    ))
                }
              </div>

              {/* CTA Card */}
              <div className="sidebar-cta-card">
                <div className="sidebar-cta-card__icon">
                  <i className="fas fa-user-graduate" />
                </div>
                <h4>Ready to Join IMS?</h4>
                <p>
                  Admissions open for MBA, BBA & BCA programmes. 
                  Begin your journey with IMS Jammu today.
                </p>
                <Link href="/admissions" className="btn btn-primary">
                  Apply Now &nbsp;<i className="fas fa-arrow-right" />
                </Link>
              </div>

              {/* Contact Info */}
              <div className="sidebar-contact-card">
                <h4>Get In Touch</h4>
                <div className="sc-item">
                  <i className="fas fa-phone-alt" />
                  <div>
                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: 2 }}>Call Us</p>
                    <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phone}</a>
                  </div>
                </div>
                <div className="sc-item">
                  <i className="fas fa-envelope" />
                  <div>
                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: 2 }}>Email Us</p>
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </div>
                </div>
                <div className="sc-item" style={{ marginBottom: 0 }}>
                  <i className="fas fa-map-marker-alt" />
                  <div>
                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: 2 }}>Campus</p>
                    <span style={{ fontSize: '0.85rem' }}>{contactInfo.address}</span>
                  </div>
                </div>
              </div>

            </aside>
          </div>
        </section>
      </main>
    </Layout>
  );
}
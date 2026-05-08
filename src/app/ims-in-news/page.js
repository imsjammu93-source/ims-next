'use client';
import React, { useState, useEffect } from 'react';
import Layout from '@/layoutComponents/Layout';
import PageHeader from '@/layoutComponents/PageHeader';
import QuickLinksCard from '@/components/QuickLinksCard';

const newsClippings = [
  { src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800", title: "IMS Jammu Excellence Award 2024", type: "tall" },
  { src: "https://images.unsplash.com/photo-1585829365234-784c05699500?auto=format&fit=crop&q=80&w=800", title: "Placement Drive Success in Daily Excelsior", type: "wide" },
  { src: "https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?auto=format&fit=crop&q=80&w=800", title: "National Conference on Management", type: "small" },
  { src: "https://images.unsplash.com/photo-1504113888839-1c89b0233b44?auto=format&fit=crop&q=80&w=800", title: "Alumni Meet Highlighted in News", type: "large" },
  { src: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=800", title: "IMS Ranked Top Institute in Region", type: "wide" },
  { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800", title: "Convocation Ceremony Coverage", type: "tall" },
  { src: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800", title: "New IT Lab Inauguration", type: "small" },
  { src: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800", title: "Social Initiative by IMS Students", type: "wide" },
  { src: "https://images.unsplash.com/photo-1512428559083-a401c338e4a7?auto=format&fit=crop&q=80&w=800", title: "Sports Week Media Highlights", type: "small" },
  { src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800", title: "Library Expansion Feature", type: "tall" },
];

function ImsInNewsPage() {
  const [selectedNewsIndex, setSelectedNewsIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedNewsIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedNewsIndex(null);
    document.body.style.overflow = 'auto';
  };

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedNewsIndex((prev) => (prev + 1) % newsClippings.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedNewsIndex((prev) => (prev - 1 + newsClippings.length) % newsClippings.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedNewsIndex === null) return;
      if (e.key === 'ArrowRight') showNext(e);
      if (e.key === 'ArrowLeft') showPrev(e);
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNewsIndex]);

  return (
    <Layout>
      <PageHeader 
        title="IMS In News" 
        subtitle="Archived media coverage and press clippings showcasing the journey of IMS Jammu"
      />

      <section className="news-page-content">
        <div className="container">
          <div className="news-layout-wrapper">
            <div className="news-main-col">
              <div className="news-press-wall">
                {newsClippings.map((item, index) => (
                  <div 
                    key={index} 
                    className={`press-clipping ${item.type}`}
                    onClick={() => openLightbox(index)}
                  >
                    <img src={item.src} alt={item.title} />
                    <div className="clipping-overlay">
                      <div className="clipping-tag">Press Release</div>
                      <h3 className="clipping-title">{item.title}</h3>
                      <span className="view-link">View Full Clipping <i className="fas fa-search-plus" /></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="news-sidebar-col">
              <div className="sticky-wrapper">
                <QuickLinksCard />
                
                <div className="media-enquiry-box">
                  <div className="media-enquiry-inner">
                    <div className="enquiry-icon">
                      <i className="fas fa-bullhorn" />
                    </div>
                    <h4>Media Enquiries</h4>
                    <p>
                      For official press releases, media kits, or campus interview requests, please contact our public relations cell.
                    </p>
                    <div className="enquiry-contact">
                      <a href="mailto:imsjammu93@gmail.com">
                        <i className="fas fa-envelope" /> imsjammu93@gmail.com
                      </a>
                    </div>
                    <a href="mailto:imsjammu93@gmail.com" className="btn-primary-gold">
                      Contact Media Cell
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedNewsIndex !== null && (
        <div className="custom-lightbox active" onClick={closeLightbox}>
          <button className="lightbox-nav-btn prev" onClick={showPrev}>
            <i className="fas fa-chevron-left" />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={newsClippings[selectedNewsIndex].src} alt={newsClippings[selectedNewsIndex].title} className="lightbox-img" />
            <div className="lightbox-caption">
              {newsClippings[selectedNewsIndex].title}
              <span className="lightbox-counter">{selectedNewsIndex + 1} / {newsClippings.length}</span>
            </div>
          </div>
          <button className="lightbox-nav-btn next" onClick={showNext}>
            <i className="fas fa-chevron-right" />
          </button>
          <button className="lightbox-close-btn" onClick={closeLightbox}>
            <i className="fas fa-times" />
          </button>
        </div>
      )}

      <style jsx>{`
        .news-page-content {
          padding: 80px 0;
          background: #fdfdfd;
        }

        .news-layout-wrapper {
          display: flex;
          gap: 50px;
          align-items: stretch;
        }

        .news-main-col {
          flex: 1;
          min-width: 0;
        }

        .news-sidebar-col {
          width: 350px;
          flex-shrink: 0;
        }

        .sticky-wrapper {
          position: sticky;
          top: 120px;
          z-index: 10;
        }

        .news-press-wall {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          grid-auto-rows: 240px;
          grid-auto-flow: dense;
          gap: 20px;
        }

        .press-clipping {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: #f0f0f0;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          border: 1px solid rgba(0,0,0,0.03);
        }

        .press-clipping.wide { grid-column: span 2; }
        .press-clipping.tall { grid-row: span 2; }
        .press-clipping.large { grid-column: span 2; grid-row: span 2; }

        .press-clipping img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) sepia(20%) contrast(1.1);
          transition: all 0.6s ease;
        }

        .press-clipping:hover img {
          filter: grayscale(0%) sepia(0%) contrast(1);
          transform: scale(1.04);
        }

        .clipping-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8, 29, 55, 0.98) 0%, rgba(8, 29, 55, 0.2) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          opacity: 0.9;
          transition: all 0.3s ease;
        }

        .clipping-tag {
          font-size: 0.65rem;
          color: var(--clr-gold);
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }

        .clipping-title {
          color: white;
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.4;
          margin: 0;
        }

        .view-link {
          font-size: 0.75rem;
          color: var(--clr-gold);
          font-weight: 700;
          margin-top: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .press-clipping:hover .view-link {
          opacity: 1;
          transform: translateY(0);
        }

        .media-enquiry-box {
          margin-top: 30px;
          background: #081D37;
          border-radius: 12px;
          overflow: hidden;
          color: white;
        }

        .media-enquiry-inner {
          padding: 40px 30px;
        }

        .enquiry-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.3);
          color: var(--clr-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          margin-bottom: 20px;
        }

        .media-enquiry-box h4 {
          color: white;
          font-family: var(--font-heading);
          font-size: 1.4rem;
          margin-bottom: 15px;
        }

        .media-enquiry-box p {
          font-size: 0.9rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.7);
          margin-bottom: 25px;
        }

        .enquiry-contact a {
          color: var(--clr-gold);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-primary-gold {
          background: var(--clr-gold);
          color: #081D37;
          width: 100%;
          padding: 14px;
          border-radius: 6px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1px;
          display: block;
          text-align: center;
          transition: all 0.3s ease;
        }

        .btn-primary-gold:hover {
          background: white;
          color: #081D37;
          transform: translateY(-3px);
        }

        @media (max-width: 992px) {
          .news-layout-wrapper {
            flex-direction: column;
          }
          .news-sidebar-col {
            width: 100%;
          }
          .sticky-wrapper {
            position: static;
          }
        }
      `}</style>
    </Layout>
  );
}

export default ImsInNewsPage;
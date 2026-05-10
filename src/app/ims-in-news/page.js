'use client';
import React, { useState, useEffect } from 'react';
import Layout from '@/layoutComponents/Layout';
import PageHeader from '@/layoutComponents/PageHeader';
import QuickLinksCard from '@/components/QuickLinksCard';
import { assetsInfo } from '@/config/assetsInfo';

const newsClippings = [
  { src: assetsInfo.newsImg1, title: "IMS Jammu Excellence Award 2024", type: "tall" },
  { src: assetsInfo.newsImg2, title: "Placement Drive Success in Daily Excelsior", type: "wide" },
  { src: assetsInfo.newsImg3, title: "National Conference on Management", type: "small" },
  { src: assetsInfo.newsImg4, title: "Alumni Meet Highlighted in News", type: "large" },
  { src: assetsInfo.newsImg5, title: "IMS Ranked Top Institute in Region", type: "wide" },
  { src: assetsInfo.newsImg6, title: "Convocation Ceremony Coverage", type: "tall" },
  { src: assetsInfo.newsImg7, title: "New IT Lab Inauguration", type: "small" },
  { src: assetsInfo.newsImg8, title: "Social Initiative by IMS Students", type: "wide" },
  { src: assetsInfo.newsImg9, title: "Sports Week Media Highlights", type: "small" },
  { src: assetsInfo.newsImg10, title: "Library Expansion Feature", type: "tall" },
];

function ImsInNewsPage() {
  const [selectedNewsIndex, setSelectedNewsIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const openLightbox = (index) => {
    setSelectedNewsIndex(index);
    setIsZoomed(false);
    setMousePos({ x: 50, y: 50 });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedNewsIndex(null);
    setIsZoomed(false);
    document.body.style.overflow = 'auto';
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const showNext = (e) => {
    e.stopPropagation();
    setIsZoomed(false);
    setSelectedNewsIndex((prev) => (prev + 1) % newsClippings.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setIsZoomed(false);
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
        bgImage={assetsInfo.newsPageHeaderImg}
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
        <div className={`custom-lightbox active ${isZoomed ? 'zoomed-mode' : ''}`} onClick={closeLightbox}>
          <button className="lightbox-nav-btn prev" onClick={showPrev}>
            <i className="fas fa-chevron-left" />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div 
              className={`lightbox-img-container ${isZoomed ? 'zoomed' : ''}`} 
              onClick={toggleZoom}
              onMouseMove={handleMouseMove}
            >
              <img 
                src={newsClippings[selectedNewsIndex].src} 
                alt={newsClippings[selectedNewsIndex].title} 
                className="lightbox-img" 
                style={isZoomed ? { 
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transform: 'scale(2.5)' 
                } : {}}
              />
            </div>
            {!isZoomed && (
              <div className="lightbox-caption">
                {newsClippings[selectedNewsIndex].title}
                <span className="lightbox-counter">{selectedNewsIndex + 1} / {newsClippings.length}</span>
              </div>
            )}
            <div className="zoom-hint">
              <i className={`fas ${isZoomed ? 'fa-search-minus' : 'fa-search-plus'}`} />
              {isZoomed ? ' Click to Zoom Out' : ' Click to Zoom In'}
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
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-auto-rows: 400px;
          gap: 25px;
        }

        .press-clipping {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: #f4f4f4;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          border: 1px solid rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .press-clipping.wide, .press-clipping.tall, .press-clipping.large {
          grid-column: auto;
          grid-row: auto;
        }

        .press-clipping img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 15px;
          filter: grayscale(100%) sepia(20%) contrast(1.1);
          transition: all 0.6s ease;
        }

        .press-clipping:hover img {
          filter: grayscale(0%) sepia(0%) contrast(1);
          transform: scale(1.02);
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

        /* Zoom Functionality - Amazon Style Lens Zoom */
        .lightbox-img-container {
          cursor: zoom-in;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90vw;
          height: 80vh;
          overflow: hidden; /* Essential for lens effect */
          background: #000;
          border-radius: 8px;
          position: relative;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.1s ease-out; /* Smooth follow effect */
          will-change: transform, transform-origin;
        }

        .lightbox-img-container.zoomed {
          cursor: zoom-out;
        }

        .lightbox-img-container.zoomed .lightbox-img {
          /* Scale and origin are handled via inline styles in React */
          max-width: none;
          max-height: none;
          width: 100%;
          height: 100%;
        }

        .zoom-hint {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--clr-gold);
          color: #081D37;
          padding: 10px 25px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 800;
          pointer-events: none;
          z-index: 1000;
          box-shadow: 0 5px 20px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          border: 2px solid white;
        }

        .custom-lightbox.zoomed-mode .zoom-hint {
          background: white;
          color: var(--clr-navy);
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
          .lightbox-img-container.zoomed {
            transform: scale(1.4);
          }
        }
      `}</style>
    </Layout>
  );
}

export default ImsInNewsPage;
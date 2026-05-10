'use client';
import React, { useState, useEffect } from 'react'
import PageHeader from '@/layoutComponents/PageHeader'
import Layout from '@/layoutComponents/Layout'
import QuickLinksCard from '@/components/QuickLinksCard'
import '@/assets/css/tpc.css'
import { assetsInfo } from '@/config/assetsInfo'

const placementFlyers = [
 assetsInfo.placementImg1,
 assetsInfo.placementImg2,
 assetsInfo.placementImg3,
 assetsInfo.placementImg4,
 assetsInfo.placementImg5,
 assetsInfo.placementImg6,
 assetsInfo.placementImg7,
 assetsInfo.placementImg8,
 assetsInfo.placementImg9,
 assetsInfo.placementImg10,
];

function TPCPage() {
  const [selectedFlyerIndex, setSelectedFlyerIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedFlyerIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedFlyerIndex(null);
    document.body.style.overflow = 'auto';
  };

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedFlyerIndex((prev) => (prev + 1) % placementFlyers.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedFlyerIndex((prev) => (prev - 1 + placementFlyers.length) % placementFlyers.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedFlyerIndex === null) return;
      if (e.key === 'ArrowRight') showNext(e);
      if (e.key === 'ArrowLeft') showPrev(e);
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFlyerIndex]);

  return (
    <Layout>
      <PageHeader
        title="Training & Placement Cell Message"
        subtitle="Bridging the gap between academic learning and industry expectations."
        bgImage={assetsInfo.placementPageHeaderImg}
      />

      <main className="tpc-page">
        {/* MESSAGE SECTION WITH SIDEBAR */}
        <section className="section" style={{paddingBottom: '80px'}}>
          <div className="container">
            <div className="layout-with-sidebar">
              <div className="tpc-message-left">
                <div className="section-label" style={{justifyContent: 'flex-start'}}>Placement Cell Message</div>
                <h2 className="section-title" style={{textAlign: 'left'}}>Nurturing Future <span>Professionals</span></h2>
                
                <div className="tpc-text-block">
                  <p>
                    In this age of liberalization, privatization and globalization, there is an ever increasing industry requirement for professionals who have high employability index and required competencies with an inquisitive mindset for innovations. IMS, a front-ranking management institution in J&K imparting quality education, lays a high degree of thrust on training and competency building for the budding professionals who are going to embark on challenging careers in the field of technology and its management.
                  </p>
                  
                  <div className="tpc-highlight-box">
                    "Our collective and continuous commitment is to create a vibrant and technology-savvy environment where excellence is the credential."
                  </div>

                  <p>
                    Over a period of few years, students engage themselves and learn use of cutting edge technologies and applications of productive innovations.
                  </p>

                  <div className="tpc-signature">
                    <div className="signature-line"></div>
                    <p><strong>Training & Placement Cell</strong></p>
                    <p>IMS Jammu</p>
                  </div>
                </div>
              </div>

              <aside className="sidebar">
                <QuickLinksCard />
              </aside>
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="gallery-section">
          <div className="container">
            <div className="text-center">
              <div className="section-label">Success Showcase</div>
              <h2 className="section-title">Placements in <span>IMS</span></h2>
              <p className="section-desc" style={{margin: '0 auto'}}>
                Witness the milestones of our students as they step into prestigious corporate roles worldwide.
              </p>
            </div>

            <div className="gallery-grid">
              {placementFlyers.map((url, index) => (
                <div 
                  key={index} 
                  className="flyer-item"
                  onClick={() => openLightbox(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={url} alt={`Placement Flyer ${index + 1}`} />
                  <div className="flyer-overlay">
                    <i className="fas fa-search-plus" style={{ fontSize: '1.5rem', color: 'white', marginBottom: '10px' }}></i>
                    <span>View Achievement</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Fullscreen Lightbox / Slider */}
      {selectedFlyerIndex !== null && (
        <div className="custom-lightbox active" onClick={closeLightbox}>
          <button className="lightbox-nav-btn prev" onClick={showPrev}>
            <i className="fas fa-chevron-left" />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={placementFlyers[selectedFlyerIndex]} 
              alt={`Placement Flyer ${selectedFlyerIndex + 1}`} 
              className="lightbox-img" 
            />
            <div className="lightbox-caption">
              Placement Success Milestone
              <span className="lightbox-counter">{selectedFlyerIndex + 1} / {placementFlyers.length}</span>
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
    </Layout>
  )
}

export default TPCPage
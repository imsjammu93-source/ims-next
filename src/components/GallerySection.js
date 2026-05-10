'use client';
import React, { useState, useEffect } from 'react';

import { assetsInfo } from '@/config/assetsInfo';

const galleryImages = [
  { src: assetsInfo.campusImg1, title: "Manthan’24 – A Business and Technical conclave", type: "large" },
  { src: assetsInfo.campusImg2, title: "Scribble Day", type: "small" },
  { src: assetsInfo.campusImg3, title: "Frequent visit to Industries.", type: "wide" },
  { src: assetsInfo.campusImg4, title: "Research, Innovate & Thrive!", type: "small" },
  { src: assetsInfo.campusImg5, title: "Student of the Month- A regular practice", type: "tall" },
  { src: assetsInfo.campusImg6, title: "Ruksat 2K24- Farewell for outgoing batch", type: "wide" },
  { src: assetsInfo.campusImg7, title: "Green Campus!", type: "small" },
  { src: assetsInfo.campusImg8, title: "Love Books ?", type: "tall" },
  { src: assetsInfo.campusImg9, title: "JOY OF SHARING!", type: "wide" },
  { src: assetsInfo.campusImg10, title: "Feeling Hungry!", type: "small" },
  { src: assetsInfo.campusImg11, title: "Supporting Faculty", type: "small" },
  { src: assetsInfo.campusImg12, title: "Tech-Buzz", type: "large" },
  { src: assetsInfo.campusImg13, title: "Student Council 2k24", type: "wide" },
  { src: assetsInfo.campusImg14, title: "Swach Bharat Abhiyan", type: "small" },
  { src: assetsInfo.campusImg15, title: "Fully Furnished Labs", type: "tall" },
  { src: assetsInfo.campusImg16, title: "Er. Niraj Dubey- Emerging trends on Cybersecurity", type: "wide" },
  { src: assetsInfo.campusImg17, title: "We develop you overall !!", type: "small" },
  { src: assetsInfo.campusImg18, title: "Showcase your TALENT!", type: "large" },
  { src: assetsInfo.campusImg19, title: "Festivities", type: "small" },
  { src: assetsInfo.campusImg20, title: "Joy of Learning!", type: "wide" },
];

function GallerySection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') showNext(e);
      if (e.key === 'ArrowLeft') showPrev(e);
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <section id="gallery" className="section section--alt" aria-labelledby="gallery-title">
      <div className="container">
        <div className="text-center" data-aos="fade-up">
          <div className="section-label">Campus Life</div>
          <h2 className="section-title" id="gallery-title">
            A Glimpse Into Our <span>Campus & College Life</span>
          </h2>
          <p className="section-desc">
            Explore the vibrant moments of learning, sports, and cultural excellence at IMS Jammu.
          </p>
        </div>

        {/* Collage Grid */}
        <div className="gallery-collage-grid" data-aos="fade-up" data-aos-delay={120}>
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className={`gallery-collage-item ${image.type}`}
              onClick={() => openLightbox(index)}
            >
              <img src={image.src} alt={image.title} loading="lazy" />
              <div className="gallery-item__overlay">
                <span className="gallery-item__label">{image.title}</span>
                <div className="gallery-item__zoom">
                  <i className="fas fa-expand-alt" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Lightbox with Nav */}
      {selectedImageIndex !== null && (
        <div className="custom-lightbox active" onClick={closeLightbox}>
          <button className="lightbox-nav-btn prev" onClick={showPrev} aria-label="Previous image">
            <i className="fas fa-chevron-left" />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryImages[selectedImageIndex].src} 
              alt={galleryImages[selectedImageIndex].title} 
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              {galleryImages[selectedImageIndex].title}
              <span className="lightbox-counter">{selectedImageIndex + 1} / {galleryImages.length}</span>
            </div>
          </div>

          <button className="lightbox-nav-btn next" onClick={showNext} aria-label="Next image">
            <i className="fas fa-chevron-right" />
          </button>

          <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close lightbox">
            <i className="fas fa-times" />
          </button>
        </div>
      )}
    </section>
  );
}

export default GallerySection;
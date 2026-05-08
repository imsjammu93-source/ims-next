'use client';
import React, { useState, useEffect } from 'react';

const galleryImages = [
  { src: "assets/images/gallery-sports.jpg", title: "Sports Day 2024", type: "wide" },
  { src: "assets/images/gallery-arts.jpg", title: "Art Exhibition", type: "small" },
  { src: "assets/images/gallery-library.jpg", title: "Central Library", type: "tall" },
  { src: "assets/images/gallery-tech.jpg", title: "Technology Lab", type: "large" },
  { src: "assets/images/gallery-graduation.jpg", title: "Annual Graduation 2024", type: "wide" },
  { src: "assets/images/wing-preprimary.jpg", title: "Pre-Primary Carnival", type: "small" },
  { src: "assets/images/hero3.jpg", title: "Annual Day 2024", type: "tall" },
  { src: "assets/images/hero2.jpg", title: "Advanced Science Lab", type: "small" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800", title: "Campus Grounds", type: "wide" },
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800", title: "Academic block", type: "small" },
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
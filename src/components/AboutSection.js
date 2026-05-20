import React from 'react'
import { assetsInfo } from '@/config/assetsInfo'
function AboutSection() {
  return (
   <section
  id="about-ims"
  className="section section--alt pattern-bg"
  aria-labelledby="about-title"
>
  <div className="container">
    <div className="why-grid">
      {/* Left: Narrative Content */}
      <div data-aos="fade-right">
        <div className="section-label">Who We Are</div>
        <h2 className="section-title" id="about-title">
          Institute of Management
          <br />
          <span>Sciences (IMS), Jammu</span>
        </h2>
        <div className="about-narrative">
          <p className="section-desc" style={{ maxWidth: "100%" }}>
            Institute of Management Sciences, popularly known as{" "}
            <strong>IMS</strong>, is a pioneer private Institute established in
            the year <strong>1997</strong>. As a flagship institution of the
            Jamwal Group of Educational Institutions (JGEI), we have dedicated
            over two decades to shaping the future of management and computer
            application professionals in the region.
          </p>
          <p
            className="section-desc"
            style={{ maxWidth: "100%", marginTop: 15 }}
          >
            Located at Gurha Brahamana (Patoli), Akhnoor Road, Jammu, our
            sprawling 25-acre campus provides an ideal environment for academic
            excellence. We offer premier degree programmes including{" "}
            <strong>MBA, BBA, and BCA</strong>, designed to bridge the gap
            between academic theory and industry practice.
          </p>
          <ul className="about-bullets" style={{ marginTop: 25 }}>
            <li>
              <i className="fas fa-check-circle" /> Established in 1997 - 25+
              Years of Academic Legacy
            </li>
            <li>
              <i className="fas fa-check-circle" /> Part of Jamwal Group of
              Educational Institutions (JGEI)
            </li>
            <li>
              <i className="fas fa-check-circle" /> 25-Acre Lush Green Campus
              with Modern Amenities
            </li>
          </ul>
          <div style={{ marginTop: 35 }}>
            <a href="#" className="btn btn-primary">
              Learn More About IMS <i className="fas fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>
      {/* Right: Campus Image with Floating Badges */}
      <div className="campus-visual" data-aos="fade-left">
        <div className="campus-img-wrap">
          <img
            src={assetsInfo.slider1}
            alt="IMS Jammu Campus — 25 Acres, Akhnoor Road"
            loading="lazy"
            className="campus-img"
          />
          <div className="campus-ring" />
          {/* Floating badge — top left */}
          <div
            className="campus-badge campus-badge--tl"
            data-aos="zoom-in"
            data-aos-delay={200}
          >
            <div className="campus-badge__icon">
              <i className="fas fa-map-marked-alt" />
            </div>
            <div className="campus-badge__body">
              <div className="campus-badge__num">25+</div>
              <div className="campus-badge__label">Acres Campus</div>
            </div>
          </div>
          {/* Floating badge — top right */}
          <div
            className="campus-badge campus-badge--tr"
            data-aos="zoom-in"
            data-aos-delay={300}
          >
            <div className="campus-badge__icon">
              <i className="fas fa-graduation-cap" />
            </div>
            <div className="campus-badge__body">
              <div className="campus-badge__num">3</div>
              <div className="campus-badge__label">Degree Programmes</div>
            </div>
          </div>
          {/* Floating badge — bottom left */}
          <div
            className="campus-badge campus-badge--bl"
            data-aos="zoom-in"
            data-aos-delay={400}
          >
            <div className="campus-badge__icon">
              <i className="fas fa-building" />
            </div>
            <div className="campus-badge__body">
              <div className="campus-badge__num">3</div>
              <div className="campus-badge__label">Academic Blocks</div>
            </div>
          </div>
          {/* Floating badge — bottom right */}
          <div
            className="campus-badge campus-badge--br"
            data-aos="zoom-in"
            data-aos-delay={500}
          >
            <div className="campus-badge__icon">
              <i className="fas fa-road" />
            </div>
            <div className="campus-badge__body">
              <div className="campus-badge__num">13 km</div>
              <div className="campus-badge__label">From Railway Stn.</div>
            </div>
          </div>
          {/* Est. year pill */}
          <div className="campus-pill">
            <i className="fas fa-star" /> Est. 1997 · JGEI
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default AboutSection
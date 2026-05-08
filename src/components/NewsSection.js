import React from 'react'

function NewsSection() {
  return (
   <section id="news-events" className="section" aria-labelledby="news-title">
  <div className="container">
    <div className="text-center" data-aos="fade-up">
      <div className="section-label">Stay Updated</div>
      <h2 className="section-title" id="news-title">
        Latest <span>News &amp; Events</span>
      </h2>
      <p className="section-desc">
        Stay informed about achievements, admissions, seminars and upcoming
        events at IMS Jammu.
      </p>
    </div>
    <div className="news-grid">
      {/* Featured News */}
      <div className="news-featured" data-aos="fade-right">
        <img
          src="assets/images/gallery-graduation.jpg"
          alt="Annual Day Celebrations 2024–25"
          loading="lazy"
        />
        <div className="news-featured__overlay" />
        <div className="news-featured__content">
          <span className="news-tag">Featured Event</span>
          <h3 className="news-featured__title">
            Annual Management Conclave 2024–25: Industry Leaders Visit IMS Jammu
            Campus
          </h3>
          <div className="news-meta">
            <span>
              <i className="fas fa-calendar-alt" /> 15 March 2025
            </span>
            <span>
              <i className="fas fa-tag" /> Events
            </span>
            <span>
              <i className="fas fa-eye" /> 2,840 Views
            </span>
          </div>
        </div>
      </div>
      {/* News Scroll List */}
      <div className="news-scroll" data-aos="fade-left">
        <div className="news-scroll-item">
          <div className="news-scroll-date">
            <div className="news-scroll-date__day">28</div>
            <div className="news-scroll-date__mon">Mar</div>
          </div>
          <div className="news-scroll-text">
            <div className="news-scroll-text__tag">Admissions Open</div>
            <div className="news-scroll-text__title">
              Registrations Open for Academic Year 2025–26 — Apply Before 30
              April
            </div>
            <div className="news-scroll-text__meta">
              <i className="fas fa-clock" /> 2 days ago
            </div>
          </div>
        </div>
        <div className="news-scroll-item">
          <div className="news-scroll-date">
            <div className="news-scroll-date__day">20</div>
            <div className="news-scroll-date__mon">Mar</div>
          </div>
          <div className="news-scroll-text">
            <div className="news-scroll-text__tag">Achievement</div>
            <div className="news-scroll-text__title">
              Our Students Win Gold at State-Level Science Olympiad 2025
            </div>
            <div className="news-scroll-text__meta">
              <i className="fas fa-clock" /> 10 days ago
            </div>
          </div>
        </div>
        <div className="news-scroll-item">
          <div className="news-scroll-date">
            <div className="news-scroll-date__day">14</div>
            <div className="news-scroll-date__mon">Mar</div>
          </div>
          <div className="news-scroll-text">
            <div className="news-scroll-text__tag">Sports</div>
            <div className="news-scroll-text__title">
              Inter-School Cricket Tournament — SS Shergill Triumphs with
              Back-to-Back Titles
            </div>
            <div className="news-scroll-text__meta">
              <i className="fas fa-clock" /> 16 days ago
            </div>
          </div>
        </div>
        <div className="news-scroll-item">
          <div className="news-scroll-date">
            <div className="news-scroll-date__day">05</div>
            <div className="news-scroll-date__mon">Mar</div>
          </div>
          <div className="news-scroll-text">
            <div className="news-scroll-text__tag">Workshop</div>
            <div className="news-scroll-text__title">
              National Career Counselling Summit Hosted at Vidya Mandir Campus
            </div>
            <div className="news-scroll-text__meta">
              <i className="fas fa-clock" /> 25 days ago
            </div>
          </div>
        </div>
        <div className="news-scroll-item">
          <div className="news-scroll-date">
            <div className="news-scroll-date__day">20</div>
            <div className="news-scroll-date__mon">Feb</div>
          </div>
          <div className="news-scroll-text">
            <div className="news-scroll-text__tag">Notice</div>
            <div className="news-scroll-text__title">
              Term-II Board Examination Time-Table Released for Classes X &amp;
              XII
            </div>
            <div className="news-scroll-text__meta">
              <i className="fas fa-clock" /> 38 days ago
            </div>
          </div>
        </div>
      </div>
      {/* /news-scroll */}
    </div>
  </div>
</section>

  )
}

export default NewsSection
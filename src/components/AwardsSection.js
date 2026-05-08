import React from 'react'

function AwardsSection() {
  return (
    
<section id="awards" aria-labelledby="awards-title">
  <div className="container">
    <div className="text-center" data-aos="fade-up">
      <div className="section-label awards-label">Our Recognition</div>
      <h2
        className="section-title awards-title"
        id="awards-title"
        style={{ color: "var(--clr-white)" }}
      >
        Awards &amp;{" "}
        <span style={{ color: "var(--clr-gold-light)" }}>Accreditations</span>
      </h2>
    </div>
  </div>
  <div className="awards-track-wrapper" data-aos="fade-up" data-aos-delay={80}>
    <div className="awards-track">
      {/* Original set */}
      <div className="award-card">
        <div className="award-card__icon">🏆</div>
        <div className="award-card__name">
          Best Private Institute Award — Jammu
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">🎓</div>
        <div className="award-card__name">
          Pioneer Management College Since 1997
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">⭐</div>
        <div className="award-card__name">
          JGEI Excellence in Education Award
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">🌿</div>
        <div className="award-card__name">
          25-Acre Green Campus — Akhnoor Road
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">💻</div>
        <div className="award-card__name">
          Computer Centre with 24-Hr Internet
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">🏗️</div>
        <div className="award-card__name">
          14,000+ Sq.m. Built-up Campus Area
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">💼</div>
        <div className="award-card__name">
          MBA · BBA · BCA Degree Programmes
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">🤝</div>
        <div className="award-card__name">Industry-Linked Placement Cell</div>
      </div>
      {/* Duplicate set for seamless loop */}
      <div className="award-card">
        <div className="award-card__icon">🏆</div>
        <div className="award-card__name">
          Best Private Institute Award — Jammu
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">🎓</div>
        <div className="award-card__name">
          Pioneer Management College Since 1997
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">⭐</div>
        <div className="award-card__name">
          JGEI Excellence in Education Award
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">🌿</div>
        <div className="award-card__name">
          25-Acre Green Campus — Akhnoor Road
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">💻</div>
        <div className="award-card__name">
          Computer Centre with 24-Hr Internet
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">🏗️</div>
        <div className="award-card__name">
          14,000+ Sq.m. Built-up Campus Area
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">💼</div>
        <div className="award-card__name">
          MBA · BBA · BCA Degree Programmes
        </div>
      </div>
      <div className="award-card">
        <div className="award-card__icon">🤝</div>
        <div className="award-card__name">Industry-Linked Placement Cell</div>
      </div>
    </div>
  </div>
</section>

  )
}

export default AwardsSection
import React from 'react'

function WhyChooseSection() {
  return (
 <section
  id="why-choose-ims"
  className="section"
  aria-labelledby="why-ims-title"
>
  <div className="container">
    <div className="text-center" data-aos="fade-up">
      <div className="section-label">Our Strengths</div>
      <h2 className="section-title" id="why-ims-title">
        Why Choose <span>IMS Jammu?</span>
      </h2>
      <p className="section-desc" style={{ margin: "0 auto 50px" }}>
        We provide a unique blend of quality education, industry exposure, and
        holistic development to ensure our students excel in every sphere of
        life.
      </p>
    </div>
    <div className="strength-grid">
      {/* Strength 1: Award */}
      <div className="strength-card" data-aos="fade-up" data-aos-delay={50}>
        <div className="strength-card__icon">
          <i className="fas fa-trophy" />
        </div>
        <h3 className="strength-card__title">Award Winning Institute</h3>
        <p className="strength-card__desc">
          Winner of the "Best Institute of Management from Jammu" at the 8th All India Excellence Awards, New Delhi.
        </p>
      </div>
      {/* Strength 2: Curriculum */}
      <div className="strength-card" data-aos="fade-up" data-aos-delay={100}>
        <div className="strength-card__icon">
          <i className="fas fa-lightbulb" />
        </div>
        <h3 className="strength-card__title">Beyond Curriculum</h3>
        <p className="strength-card__desc">
          Focusing on creativity, ethics, and leadership skills that are essential for future professional success.
        </p>
      </div>
      {/* Strength 3: Exposure */}
      <div className="strength-card" data-aos="fade-up" data-aos-delay={150}>
        <div className="strength-card__icon">
          <i className="fas fa-microphone-alt" />
        </div>
        <h3 className="strength-card__title">Industry Exposure</h3>
        <p className="strength-card__desc">
          Regular opportunities to engage with high-profile speakers and participate in major networking events.
        </p>
      </div>
      {/* Strength 4: Support */}
      <div className="strength-card" data-aos="fade-up" data-aos-delay={200}>
        <div className="strength-card__icon">
          <i className="fas fa-heart" />
        </div>
        <h3 className="strength-card__title">Vibrant Community</h3>
        <p className="strength-card__desc">
          A supportive learning community that guides you from your first day on campus to your professional career.
        </p>
      </div>
    </div>

    <div className="text-center" style={{marginTop: '40px'}} data-aos="fade-up">
      <a href="/why-ims" className="btn btn-navy">
        Discover the IMS Advantage <i className="fas fa-arrow-right" style={{marginLeft: '10px'}} />
      </a>
    </div>
  </div>
</section>
  )
}

export default WhyChooseSection
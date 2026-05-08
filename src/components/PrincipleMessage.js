import React from 'react'

function PrincipleMessage() {
  return (
    <section
  id="principals-message"
  className="section"
  aria-labelledby="principal-title"
>
  <div className="container">
    <div className="principal-grid">
      {/* Image */}
      <div className="principal-img-wrap" data-aos="fade-right">
        <div className="principal-img-frame">
          <img
            src="assets/images/chair.png"
            alt="Er. Vidhi S. Singh, Chairman, JGEI"
            loading="lazy"
          />
        </div>
        <div className="principal-badge">
          <div className="principal-badge__num">28+</div>
          <div className="principal-badge__text">
            Years of
            <br />
            Legacy
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="principal-content" data-aos="fade-left">
        <div className="section-label">Chairman's Message</div>
        <h2 className="section-title" id="principal-title">
          Message From
          <br />
          <span>The Chairman's Desk</span>
        </h2>
        <blockquote className="principal-quote">
          "At JGEI, we believe in imparting quality education and preparing the
          student community to face the challenges of life. True education
          trains both head and heart."
        </blockquote>
        <p className="principal-body">
          It is pleasure to welcome you to Jamwal Group of Educational
          Institutions (JGEI). We are dedicated to inculcating in every student
          an all-round development, with a strong focus on ethical conduct,
          discipline and responsibility to the society. Our mission is to make
          our students intellectually competent, morally strong, socially
          committed and spiritually inspired so that they can contribute towards
          Nation building.
        </p>
        <div className="principal-sig">
          <div className="sig-text">
            <div className="sig-text__name">Er. Vidhi S. Singh</div>
            <div className="sig-text__title">
              Chairman, Jamwal Group of Educational Institutions (JGEI)
            </div>
          </div>
        </div>
        {/* Director's Note */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          <div className="section-label" style={{ marginBottom: 8 }}>
            Director's Message
          </div>
          <p className="principal-body" style={{ marginBottom: 12 }}>
            At IMS Jammu, we strive not only to impart knowledge but also to
            nurture future leaders equipped with the skills and vision to excel
            in the ever-evolving global business environment. Let us work
            together to embrace every opportunity for growth, both inside and
            outside the classroom.
          </p>
          <div className="principal-sig">
            <div className="sig-text">
              <div className="sig-text__name">Dr. Meenakshi Sharma</div>
              <div className="sig-text__title">
                Director &amp; Principal, Institute of Management Sciences,
                Jammu
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default PrincipleMessage
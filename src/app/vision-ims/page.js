import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import '@/assets/css/vision-mission.css'

export const metadata = {
  title: "Vision & Mission",
  description: "Explore the core values, vision, and mission of the Institute of Management Sciences (IMS) Jammu. Committed to excellence in education and leadership.",
}

function VisionPage() {
  return (
    <Layout>
      <PageHeader
        title="Vision & Mission"
        subtitle="Our commitment to academic excellence, innovation, and social responsibility."
        bgImage="/assets/images/campus.jpg"
      />

      <main className="vision-mission-page">
        {/* VISION SECTION */}
        <section className="section vision-outer">
          <div className="container">
            <div className="vision-content-wrapper">
              <div className="vision-image-side">
                <img src="/assets/images/vision-bg.png" alt="IMS Vision" />
              </div>
              <div className="vision-text-side">
                <div className="section-label">Institutional Vision</div>
                <h2 className="section-title">Envisioning <span>Excellence</span></h2>
                <div className="vision-quote">
                  <i className="fa-solid fa-quote-left"></i>
                  To emerge as a globally recognized center of academic brilliance, nurturing competent, socially responsible, and visionary leaders committed to the pursuit of excellence and human empowerment.
                </div>
                <p className="section-desc">
                  We believe in creating an environment where education transcends boundaries and empowers students to become architects of a better tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* QUALITY POLICY SECTION */}
        <section className="section policy-section">
          <div className="container">
            <div className="text-center">
              <div className="section-label">Standard of Excellence</div>
              <h2 className="section-title">Our <span>Quality Policy</span></h2>
              <p className="section-desc">
                All-round quality is the cornerstone of our institute, assured through professional management and a relentless focus on academic upgradation.
              </p>
            </div>

            <div className="policy-grid">
              <div className="policy-item">
                <div className="policy-icon">
                  <i className="fa-solid fa-university"></i>
                </div>
                <h3>Managerial Governance</h3>
                <p>Ensuring holistic quality through transparent, professional management and ethical governance across all institutional levels.</p>
              </div>

              <div className="policy-item">
                <div className="policy-icon">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <h3>Dynamic Learning</h3>
                <p>Continuous curriculum evolution and experiential learning models integrated with strategic industry participation.</p>
              </div>

              <div className="policy-item">
                <div className="policy-icon">
                  <i className="fa-solid fa-user-graduate"></i>
                </div>
                <h3>Holistic Grooming</h3>
                <p>Cultivating critical analysis, creative thinking, and communication skills to develop well-groomed professional leaders.</p>
              </div>

              <div className="policy-item">
                <div className="policy-icon">
                  <i className="fa-solid fa-chalkboard-teacher"></i>
                </div>
                <h3>Faculty Empowerment</h3>
                <p>Fostering professional growth and commitment by providing strong support for self-development and active participation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION SECTION */}
        <section className="section mission-section">
          <div className="container">
            <div className="text-center">
              <div className="section-label">Our Purpose</div>
              <h2 className="section-title">Strategic <span>Mission</span></h2>
              <p className="section-desc" style={{color: 'rgba(255,255,255,0.7)'}}>
                Translating our vision into reality through relentless endeavor and clear strategic objectives.
              </p>
            </div>

            <div className="mission-highlights">
              <div className="highlight-card">
                <div className="highlight-icon">
                  <i className="fa-solid fa-award"></i>
                </div>
                <h4>Quality Education</h4>
                <p>Delivering excellence through world-class academic standards.</p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">
                  <i className="fa-solid fa-lightbulb"></i>
                </div>
                <h4>Entrepreneurship</h4>
                <p>Fostering innovation and the spirit of venture development.</p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">
                  <i className="fa-solid fa-handshake"></i>
                </div>
                <h4>Lead by Example</h4>
                <p>Instilling leadership through integrity and dedicated action.</p>
              </div>
            </div>

            <div className="objectives-container">
              <div className="objective-item">
                <div className="obj-num">01</div>
                <div className="obj-content">
                  <h5>World-Class Infrastructure</h5>
                  <p>Creating state-of-the-art facilities and a vibrant academic ambience for advanced level teaching and practical training.</p>
                </div>
              </div>

              <div className="objective-item">
                <div className="obj-num">02</div>
                <div className="obj-content">
                  <h5>Global Citizenship</h5>
                  <p>Developing students as responsible global citizens equipped with conscience, commitment, and unwavering dedication.</p>
                </div>
              </div>

              <div className="objective-item">
                <div className="obj-num">03</div>
                <div className="obj-content">
                  <h5>Technical Excellence</h5>
                  <p>Continuously evolving to become a premier fountainhead among institutes of technical education in India.</p>
                </div>
              </div>

              <div className="objective-item">
                <div className="obj-num">04</div>
                <div className="obj-content">
                  <h5>Industry Interface</h5>
                  <p>Strengthening the industry-institute bond to promote robust entrepreneurial development activities.</p>
                </div>
              </div>

              <div className="objective-item">
                <div className="obj-num">05</div>
                <div className="obj-content">
                  <h5>International Collaboration</h5>
                  <p>Partnering with leading global universities to provide elite pathways for higher studies and international placement avenues.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default VisionPage
import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import QuickLinksCard from '@/components/QuickLinksCard'
import '@/assets/css/why-ims.css'
import AwardsSection from '@/components/AwardsSection'
import { assetsInfo } from '@/config/assetsInfo'
export const metadata = {
  title: "Why Choose IMS Jammu? | The IMS Advantage",
  description: "Discover why the Institute of Management Sciences (IMS) is the preferred choice for management and IT education in Jammu. Awards, excellence, and legacy.",
}

function WhyIMSPage() {
  return (
    <Layout>
      <PageHeader
        title="Why Choose IMS?"
        subtitle="Discover the IMS advantage: Excellence in education, professional growth, and global recognition."
        bgImage={assetsInfo.whychoosePageHeaderImg}
      />

      <main className="why-ims-page">
        <section className="container" style={{padding: '100px 0'}}>
          
          <div className="layout-with-sidebar">
            
            <div className="main-content">
              
              {/* 1. Award Showcase */}
              <div className="award-showcase" data-aos="fade-up">
                <div className="award-content">
                  <div className="award-badge">Excellence in Education</div>
                  <h2 className="award-title">Best Institute of Management from Jammu</h2>
                  <p className="award-desc">
                    At the 8th All India Excellence Awards held in New Delhi, IMS bagged the prestigious <strong>"Best Institute of Management from Jammu"</strong> award. The recognition was conferred by the Indian Achievers Podium, celebrating our commitment to academic leadership and institutional integrity.
                  </p>
                  <div style={{marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px'}}>
                    <p style={{fontSize: '0.9rem', opacity: 0.8}}>Received by: Sh. Vidhi S. Singh (Chairman, JGEI)</p>
                  </div>
                </div>
              </div>

              {/* Pillars of Excellence */}
              <div className="pillar-section">
                
                {/* Pillar 1 */}
                <div className="pillar-item" data-aos="fade-up">
                  <img 
                    src={assetsInfo.whychooseImg1} 
                    alt="Education beyond curriculum" 
                    className="pillar-image" 
                  />
                  <div className="pillar-text">
                    <h3>Educating Beyond Curriculum</h3>
                    <p>
                      One of the most important characteristics of IMS is our focus on the holistic development of our students. We offer a learning environment that allows you to develop your creativity, work ethics, and leadership skills that are essential for your future success.
                    </p>
                    <div className="highlight-box">
                      "We don't just teach management; we shape managers who can lead with conscience."
                    </div>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="pillar-item" data-aos="fade-up">
                  <img 
                    src={assetsInfo.whychooseImg2} 
                    alt="Vibrant Learning Community" 
                    className="pillar-image" 
                  />
                  <div className="pillar-text">
                    <h3>A Vibrant Learning Community</h3>
                    <p>
                      Study at IMS and you will be joining a vibrant learning community which offers support at every stage of your journey. From your first day on campus right through to post-graduation, we are here to guide you into your professional career and beyond.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="pillar-item" data-aos="fade-up">
                  <img 
                    src={assetsInfo.whychooseImg3} 
                    alt="Networking & Exposure" 
                    className="pillar-image" 
                  />
                  <div className="pillar-text">
                    <h3>Industry Exposure & Networking</h3>
                    <p>
                      At IMS, you will have regular opportunities to enhance your academic skills with talks from wide-ranging high-profile speakers, as well as numerous networking events. We bridge the distance between students and industry leaders to foster real-world connections.
                    </p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="pillar-item" data-aos="fade-up">
                  <img 
                    src={assetsInfo.whychooseImg4} 
                    alt="Theory vs Practice" 
                    className="pillar-image" 
                  />
                  <div className="pillar-text">
                    <h3>Bridging Theory and Practice</h3>
                    <p>
                      Teaching at IMS focuses on providing you with a broad-based knowledge of the subject, the latest insights, and highly sought-after transferable skills. We ensure that our students can translate academic theories into effective practical solutions in the professional world.
                    </p>
                  </div>
                </div>

              </div>

              {/* Minimal "AI Things" - Institutional Integrity */}
              <div className="content-block" style={{marginTop: '50px', background: 'var(--clr-gold-pale)', padding: '40px', borderRadius: '15px'}}>
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '15px'}}>The IMS Promise</h3>
                <p style={{lineHeight: '1.8', color: 'var(--clr-navy)', fontWeight: '500'}}>
                  For over 25 years, IMS has consistently delivered on the promises made to its students. Being part of the Jamwal Group of Educational Institutions (JGEI), we offer a legacy of trust and a commitment to producing industry-ready graduates with the highest regard for integrity and continuous learning.
                </p>
              </div>

            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              <QuickLinksCard />
            </aside>

          </div>

        </section>
      </main>


      <AwardsSection/>
    </Layout>
  )
}

export default WhyIMSPage

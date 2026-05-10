import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import '@/assets/css/recruiters.css'
import QuickLinksCard from '@/components/QuickLinksCard'
import { assetsInfo } from '@/config/assetsInfo'

export const metadata = {
  title: "Our Leading Recruiters | IMS Jammu",
  description: "Explore the vast network of corporate partners who recruit top talent from the Institute of Management Sciences, Jammu.",
}

const recruiters = [
  { name: "HDFC Bank", logo: assetsInfo.requirterImg1 },
  { name: "ICICI Bank", logo: assetsInfo.requirterImg2 },
  { name: "Amazon", logo: assetsInfo.requirterImg3 },
  ];

function LeadingRecruiters() {
  return (
    <Layout>
      <PageHeader
        title="Our Leading Recruiters"
        subtitle="Where talent meets opportunity in the global marketplace."
        bgImage={assetsInfo.requirterPageHeader}
      />

      <main className="recruiters-page">
        <section className="section" style={{padding: '80px 0'}}>
          <div className="container">
            <div className="layout-with-sidebar">
              <div className="recruiters-main-col">
                <div className="recruiters-intro">
                  <div className="section-label" style={{justifyContent: 'flex-start'}}>Placement Excellence</div>
                  <h2 className="section-title" style={{textAlign: 'left'}}>A Preferred Destination for <span>Global Corporates</span></h2>
                  <p className="section-desc" style={{textAlign: 'left', maxWidth: 'none', marginBottom: '20px'}}>
                    For over two decades, the Institute of Management Sciences has served as a primary talent hub for the nation's most prestigious organizations. Our commitment to excellence in pedagogy and industry-readiness ensures that our graduates are equipped to lead in a globalized economy.
                  </p>
                  <p className="section-desc" style={{textAlign: 'left', maxWidth: 'none', marginBottom: '40px'}}>
                    We take immense pride in our extensive network of recruitment partners who continue to place their trust in the competence and integrity of IMS alumni.
                  </p>
                </div>

                {/* New Wide Showcase Layout */}
                <div className="recruiter-wide-showcase">
                  {recruiters.map((recruiter, index) => (
                    <div key={index} className="recruiter-wide-item" data-aos="fade-up">
                      <img src={recruiter.logo} alt={recruiter.name} />
                    </div>
                  ))}
                </div>
              </div>

              <aside className="sidebar">
                <QuickLinksCard />
                
                {/* Admission CTA Sidebar Card */}
                <div className="admission-sidebar-card">
                  <div className="card-accent"></div>
                  <h3>Apply for Admissions</h3>
                  <p>Join the pioneer private institute of Jammu & Kashmir and shape your career with excellence.</p>
                  <a href="/admissions" className="btn-sidebar-gold">
                    Apply Now <i className="fas fa-arrow-right" style={{marginLeft: '8px'}} />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="modern-stats-banner">
          <div className="container">
            <div className="modern-stats-grid">
              <div className="modern-stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Hiring Partners</div>
              </div>
              <div className="modern-stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Placement Support</div>
              </div>
              <div className="modern-stat-card">
                <div className="stat-number">25+</div>
                <div className="stat-label">Years of Legacy</div>
              </div>
              <div className="modern-stat-card">
                <div className="stat-number">15K+</div>
                <div className="stat-label">Global Alumni</div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="recruitment-cta">
          <div className="container">
            <h2 className="section-title">Empower Your Workforce with <span>IMS Talent</span></h2>
            <p className="section-desc" style={{maxWidth: '800px', margin: '0 auto 40px'}}>
              Our Training & Placement Cell is dedicated to fostering strong industry-institute ties. We invite organizations to participate in our campus recruitment programs and discover the next generation of business leaders.
            </p>
            <div className="btn-group justify-content-center">
              <a href="mailto:imsjammu93@gmail.com" className="btn btn-primary btn-lg">
                <i className="fas fa-envelope" style={{marginRight: '10px'}} /> Invite Us for Placements
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default LeadingRecruiters
import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import '@/assets/css/recruiters.css'
import QuickLinksCard from '@/components/QuickLinksCard'

export const metadata = {
  title: "Our Leading Recruiters | IMS Jammu",
  description: "Explore the vast network of corporate partners who recruit top talent from the Institute of Management Sciences, Jammu.",
}

const recruiters = [
  { name: "HDFC Bank", logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600" },
  { name: "ICICI Bank", logo: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=600" },
  { name: "Amazon", logo: "https://images.unsplash.com/photo-1523474253046-2cd2c788f3ff?auto=format&fit=crop&q=80&w=600" },
  { name: "TCS", logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600" },
  { name: "Infosys", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=600" },
  { name: "Deloitte", logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600" },
  { name: "Wipro", logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=600" },
  { name: "Capgemini", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" },
  { name: "Cognizant", logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" },
];

function LeadingRecruiters() {
  return (
    <Layout>
      <PageHeader
        title="Our Leading Recruiters"
        subtitle="Where talent meets opportunity in the global marketplace."
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="recruiters-page">
        {/* CENTERED INTRODUCTION WITH SIDEBAR */}
        <section className="container" style={{padding: '100px 0'}}>
          <div className="layout-with-sidebar">
            <div className="recruiters-header-box text-left" style={{textAlign: 'left', margin: '0', padding: '0', maxWidth: 'none'}}>
              <div className="section-label" style={{justifyContent: 'flex-start'}}>Placement Excellence</div>
              <h2 className="section-title" style={{textAlign: 'left'}}>A Preferred Destination for <span>Global Corporates</span></h2>
              <p className="section-desc" style={{textAlign: 'left', maxWidth: 'none'}}>
                For over two decades, the Institute of Management Sciences has served as a primary talent hub for the nation's most prestigious organizations. Our commitment to excellence in pedagogy and industry-readiness ensures that our graduates are equipped to lead in a globalized economy.
              </p>
              <p className="section-desc" style={{marginTop: '20px', textAlign: 'left', maxWidth: 'none'}}>
                We take immense pride in our extensive network of recruitment partners who continue to place their trust in the competence and integrity of IMS alumni.
              </p>
            </div>

            <aside className="sidebar">
              <QuickLinksCard />
            </aside>
          </div>
        </section>

        {/* LOGO WALL - SEAMLESS & LARGE */}
        <div className="container">
          <div className="recruiter-wall">
            {recruiters.map((recruiter, index) => (
              <div key={index} className="wall-item">
                <img src={recruiter.logo} alt={recruiter.name} />
              </div>
            ))}
          </div>
        </div>

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
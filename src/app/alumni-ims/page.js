import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import '@/assets/css/alumni.css'

import QuickLinksCard from '@/components/QuickLinksCard'

export const metadata = {
  title: "Alumni Network | IMS Jammu",
  description: "Join the IMS Jammu Alumni Association. Connect with a global network of over 15,000 graduates and explore mentorship and career opportunities.",
}

const alumniSpotlight = [
  {
    name: "Sandeep Malhotra",
    batch: "MBA - Class of 2012",
    role: "Senior VP, HDFC Bank",
    quote: "The analytical foundation and leadership skills I gained at IMS were pivotal in my journey to executive management.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Priyanka Sharma",
    batch: "BCA - Class of 2015",
    role: "Senior Software Engineer, Google",
    quote: "IMS provided the perfect blend of technical rigor and creative freedom that prepared me for the global tech landscape.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Rajesh Khanna",
    batch: "BBA - Class of 2010",
    role: "Entrepreneur & Founder, TechVision",
    quote: "The entrepreneurial ecosystem at IMS gave me the confidence to build my own venture from the ground up.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
  }
];

function AlumniPage() {
  return (
    <Layout>
      <PageHeader
        title="Alumni Network"
        subtitle="Celebrating a legacy of success that spans across the globe."
        bgImage="https://images.unsplash.com/photo-1523580494863-6f30312246d5?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="alumni-page">
        {/* INTRODUCTION WITH SIDEBAR */}
        <section className="alumni-intro container text-center" style={{padding: '100px 0'}}>
          <div className="layout-with-sidebar">
            <div className="text-left" style={{textAlign: 'left'}}>
              <div className="section-label" style={{justifyContent: 'flex-start'}}>Once an IMSian, Always an IMSian</div>
              <h2 className="section-title" style={{textAlign: 'left'}}>A Community of <span>15,000+ Global Leaders</span></h2>
              <p className="section-desc" style={{maxWidth: 'none'}}>
                The IMS Alumni Association (IMSAA) serves as a bridge between the institute and its distinguished graduates, fostering a lifelong connection that extends far beyond the classroom. Our alumni are our greatest brand ambassadors, leading innovation across diverse industries from finance and technology to entrepreneurship and social leadership. 
              </p>
              <p className="section-desc" style={{marginTop: '20px', maxWidth: 'none'}}>
                We believe that graduation is not the end, but the beginning of a meaningful relationship where the expertise and experiences of our graduates continue to inspire current students. By maintaining an active presence in our community, our alumni contribute to the institutional growth through mentorship, collaborative research, and industry-academia partnerships that define the IMS legacy of shared success.
              </p>
            </div>
            
            <aside className="sidebar">
              <QuickLinksCard />
            </aside>
          </div>
        </section>

        {/* ALUMNI SPOTLIGHT */}
        <section className="spotlight-section">
          <div className="container">
            <div className="text-center">
              <div className="section-label">Success Stories</div>
              <h2 className="section-title">Alumni <span>Spotlight</span></h2>
            </div>

            <div className="spotlight-grid">
              {alumniSpotlight.map((alumnus, index) => (
                <div key={index} className="alumni-card">
                  <div className="alumni-img">
                    <img src={alumnus.image} alt={alumnus.name} />
                  </div>
                  <div className="alumni-info">
                    <span className="alumni-batch">{alumnus.batch}</span>
                    <h3>{alumnus.name}</h3>
                    <p className="alumni-role">{alumnus.role}</p>
                    <p className="alumni-quote">"{alumnus.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="benefits-section container">
          <div className="text-center">
            <div className="section-label">Stay Connected</div>
            <h2 className="section-title">Why Join the <span>Association?</span></h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon"><i className="fas fa-network-wired" /></div>
              <h4>Global Networking</h4>
              <p>Connect with fellow graduates across various industries and geographies.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><i className="fas fa-user-graduate" /></div>
              <h4>Mentorship</h4>
              <p>Guide the next generation or find a mentor for your own career growth.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><i className="fas fa-calendar" /></div>
              <h4>Exclusive Events</h4>
              <p>Get priority access to reunions, seminars, and networking mixers.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><i className="fas fa-briefcase" /></div>
              <h4>Career Support</h4>
              <p>Access exclusive job postings and professional development resources.</p>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="alumni-cta">
          <div className="container">
            <h2 className="section-title" style={{color: 'white'}}>Update Your <span>Details</span></h2>
            <p className="section-desc" style={{color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto 40px'}}>
              Are you an IMS graduate? Stay in touch with your alma mater and be part of our growing success story. Register today to join the official Alumni Association.
            </p>
            <div className="btn-group justify-content-center">
              <a href="#" className="btn btn-primary btn-lg">
                Register as Alumni
              </a>
              <a href="mailto:imsjammu93@gmail.com" className="btn btn-outline-white btn-lg" style={{marginLeft: '20px', border: '1px solid white', color: 'white'}}>
                Contact Association
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default AlumniPage
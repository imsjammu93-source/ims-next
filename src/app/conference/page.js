import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import QuickLinksCard from '@/components/QuickLinksCard'
import '@/assets/css/conference.css'

export const metadata = {
  title: "Conferences & Symposiums | IMS Jammu",
  description: "Stay updated on the national and international conferences organized at the Institute of Management Sciences, Jammu.",
}

function ConferencePage() {
  return (
    <Layout>
      <PageHeader
        title="Conferences & Symposiums"
        subtitle="A platform for intellectual discourse and academic exploration."
        bgImage="https://images.unsplash.com/photo-1540575861501-7c9110d79af1?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="conference-page">
        <section className="container" style={{padding: '100px 0'}}>
          <div className="layout-with-sidebar">
            
            {/* Left: Main Content */}
            <div className="conference-main-content">
              <div className="conference-intro">
                <div className="section-label" style={{justifyContent: 'flex-start'}}>Event Highlight</div>
                <h2 className="conference-main-title">
                  National Conference on Emerging Trends in Management, Economics and IT was organized at IMS
                </h2>
                <div className="conference-report-text">
                  <p>
                    The Institute of Management Sciences (IMS) Jammu recently hosted a prestigious National Conference focused on the interdisciplinary intersection of management practices, economic shifts, and information technology. The event served as a collaborative hub for academicians, research scholars, and industry experts from across the region to share their findings and explore future-ready solutions.
                  </p>
                  <p style={{marginTop: '20px'}}>
                    By fostering a culture of research and intellectual inquiry, IMS continues to provide its students and faculty with exposure to cutting-edge developments that define the global professional landscape.
                  </p>
                </div>
              </div>

              {/* Large Stacked Images */}
              <div className="event-gallery-stack">
                <div className="event-image-item">
                  <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200" alt="Conference Highlight 1" />
                </div>
                <div className="event-image-item">
                  <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200" alt="Conference Highlight 2" />
                </div>
                <div className="event-image-item">
                  <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200" alt="Conference Highlight 3" />
                </div>
              </div>

              {/* Conference Impact Highlights */}
              <div className="conf-highlights">
                <div className="conf-highlight-item">
                  <h4>50+</h4>
                  <p>Research Papers</p>
                </div>
                <div className="conf-highlight-item">
                  <h4>15+</h4>
                  <p>Guest Speakers</p>
                </div>
                <div className="conf-highlight-item">
                  <h4>300+</h4>
                  <p>Delegates</p>
                </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <aside className="sidebar">
              <QuickLinksCard />
              
              {/* Extra Card for Space Filling */}
              <div className="sidebar-contact-card">
                <h4>Help & Support</h4>
                <div className="sc-item">
                  <i className="fas fa-envelope" />
                  <div>
                    <p>Conference Queries</p>
                    <a href="mailto:imsjammu93@gmail.com">imsjammu93@gmail.com</a>
                  </div>
                </div>
                <div className="sc-item">
                  <i className="fas fa-phone-alt" />
                  <div>
                    <p>Institutional Office</p>
                    <a href="tel:+917006489200">+91 70064 89200</a>
                  </div>
                </div>
                <div className="sc-item" style={{marginBottom: 0}}>
                  <i className="fas fa-map-marker-alt" />
                  <div>
                    <p>Location</p>
                    <span>Gurha Brahmana (Patoli), Jammu</span>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </section>
      </main>
    </Layout>
  )
}

export default ConferencePage
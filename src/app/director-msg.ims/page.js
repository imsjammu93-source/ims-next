import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import '@/assets/css/leadership.css'

export const metadata = {
  title: "Director's Message",
  description: "A message from the Director of IMS Jammu, focusing on innovation, tradition, and nurturing future global business leaders.",
}

function DirectorMessage() {
  return (
    <Layout>
      <PageHeader
        title="Director's Message"
        subtitle="Cultivating a legacy of innovation and excellence in global management."
        bgImage="https://images.unsplash.com/photo-1523050338691-c1e53d076efd?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="leadership-page">
        <div className="container">
          <div className="leadership-grid">
            {/* PORTRAIT SIDE */}
            <aside className="portrait-side">
              <div className="portrait-frame">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Director Portrait" />
              </div>
              <div className="leader-meta">
                <h3 className="leader-name">Prof. (Dr.) Meenakshi Sharma</h3>
                <p className="leader-title">Director, IMS Jammu</p>
              </div>
            </aside>

            {/* MESSAGE SIDE */}
            <article className="message-side">
              <div className="message-header">
                <span className="message-label">From the Director's Desk</span>
                <h2 className="message-title">Nurturing Leaders for a <br/><span>Dynamic World</span></h2>
              </div>

              <div className="message-body">
                <p>
                  As we navigate through the dynamic landscape of the academic world, I am filled with immense pride and gratitude for the dedication and commitment displayed by each member of our institute community. At IMS Jammu, we strive not only to impart knowledge but also to nurture future leaders equipped with the skills and vision to excel in the ever-evolving global business environment.
                </p>

                <div className="highlight-quote">
                  "Our institute is striving for a legacy where innovation meets tradition, and where each individual's potential is recognized and fostered."
                </div>

                <p>
                  We believe in a holistic approach to education—one that goes beyond textbooks and classrooms. Our goal is to create an ecosystem where creativity is encouraged, and where our students are challenged to think critically and act decisively. 
                </p>

                <p>
                  In this fast-paced era, the ability to adapt and innovate is paramount. By blending traditional academic rigor with modern technological insights, we ensure our graduates are ready to lead with both intelligence and empathy.
                </p>

                <p>
                  Let us work together to embrace every opportunity for growth, both inside and outside the classroom. Together, we will continue to build a foundation of excellence that serves as a beacon for technical and management education in the region.
                </p>

                <div className="signature-area" style={{marginTop: '50px'}}>
                  <p style={{marginBottom: '5px', fontWeight: '700'}}>Best Wishes,</p>
                  <p style={{fontFamily: 'var(--font-accent)', fontSize: '1.2rem', color: 'var(--clr-navy)'}}>Prof. (Dr.) Meenakshi Sharma</p>
                  <p style={{fontSize: '0.85rem', color: 'var(--clr-muted)'}}>Director, Institute of Management Sciences</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default DirectorMessage

import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import '@/assets/css/leadership.css'

export const metadata = {
  title: "Chairman's Message",
  description: "A welcome message from the Chairman of Jamwal Group of Educational Institutions (JGEI) regarding our commitment to quality education.",
}

function ChairmanMessage() {
  return (
    <Layout>
      <PageHeader
        title="Chairman's Message"
        subtitle="Guiding the next generation of leaders through value-based education."
        bgImage="https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="leadership-page">
        <div className="container">
          <div className="leadership-grid">
            {/* PORTRAIT SIDE */}
            <aside className="portrait-side">
              <div className="portrait-frame">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="Chairman Portrait" />
              </div>
              <div className="leader-meta">
                <h3 className="leader-name">Er. Vidhi S. Singh</h3>
                <p className="leader-title">Chairman, JGEI</p>
              </div>
            </aside>

            {/* MESSAGE SIDE */}
            <article className="message-side">
              <div className="message-header">
                <span className="message-label">Welcome Address</span>
                <h2 className="message-title">Shaping Minds, <br/><span>Building Futures</span></h2>
              </div>

              <div className="message-body">
                <p>
                  It is my distinct pleasure to welcome you to the Jamwal Group of Educational Institutions (JGEI). At JGEI, we believe that education is not just about imparting knowledge but about preparing the student community to face the diverse challenges of life with confidence and integrity.
                </p>

                <p>
                  To us, good academics means "Value Addition." This encompasses the entire gamut of activities associated with the complete development of an individual—academic, curricular, extra-curricular, social, and cultural. We are dedicated to nurturing an all-round development in every student, with a strong focus on ethical conduct, discipline, and a deep sense of responsibility to society.
                </p>

                <div className="highlight-quote">
                  "True education trains both the head and the heart. Our mission is to make our students intellectually competent, morally strong, and socially committed."
                </div>

                <p>
                  We have created a vast, state-of-the-art academic infrastructure, bringing together the best teaching talent and equipping our classrooms with every required learning aid. Our commitment to excellence helps us set outstanding teaching standards, ensuring that every student at JGEI evolves into a competent and successful professional.
                </p>

                <p>
                  We are acutely conscious of the role we play in shaping the leaders of tomorrow. We believe that education is a serious business—one that requires us to instill virtues of humility, humbleness, and a genuine concern for humanity in our students.
                </p>

                <p>
                  I invite all aspiring young men and women who seek to excel in their chosen fields to join our prestigious courses. Our leadership team and faculty are here to guide you toward a future of limitless possibilities.
                </p>

                <div className="signature-area" style={{marginTop: '50px'}}>
                  <p style={{marginBottom: '5px', fontWeight: '700'}}>Warm Regards,</p>
                  <p style={{fontFamily: 'var(--font-accent)', fontSize: '1.2rem', color: 'var(--clr-navy)'}}>Er. Vidhi S. Singh</p>
                  <p style={{fontSize: '0.85rem', color: 'var(--clr-muted)'}}>Chairman, Jamwal Group of Educational Institutions</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default ChairmanMessage

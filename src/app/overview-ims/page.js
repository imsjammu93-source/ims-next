import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import '@/assets/css/jgei.css'

import QuickLinksCard from '@/components/QuickLinksCard'

export const metadata = {
  title: "Overview JGEI | Jamwal Group of Educational Institutions",
  description: "A comprehensive overview of the Jamwal Group of Educational Institutions (JGEI) and its constituent colleges across J&K and Punjab.",
}

function OverviewJGEI() {
  return (
    <Layout>
      <PageHeader
        title="Overview of JGEI"
        subtitle="Exploring the legacy and reach of the Jamwal Group of Educational Institutions."
        bgImage="https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="jgei-page">
        {/* NARRATIVE SECTION WITH SIDEBAR */}
        <section className="container" style={{padding: '100px 0'}}>
          <div className="layout-with-sidebar">
            {/* Left: Main Content */}
            <div className="jgei-narrative" style={{padding: '0', textAlign: 'left', margin: '0', maxWidth: 'none'}}>
              <div className="section-label" style={{justifyContent: 'flex-start'}}>Institutional Legacy</div>
              <h2 className="section-title" style={{textAlign: 'left'}}>Promotion of Technical & <span>Professional Education</span></h2>
              <p className="section-desc" style={{textAlign: 'left', maxWidth: 'none'}}>
                The Jamwal Group of Educational Institutions (JGEI) aims at the promotion and advancement of Technical and Professional Education of the highest standard. Founded in 1993 by Er. Vidhi S. Singh Jamwal, Chairman-cum-Managing Trustee, the group has established a formidable presence in the educational landscape of Northern India.
              </p>
              <p className="section-desc" style={{marginTop: '20px', textAlign: 'left', maxWidth: 'none'}}>
                The group is driven by the collective vision of its trustees, including Shri Shiv Dev Singh Jamwal (Vice Chairman) and Er. (Mrs) Renu Bangroo (Managing Director). Managed through the Chanderbagha Educational Trust (1993), Jamwal Educational Trust (1995), and Tawi Educational Trust (1996), the group has evolved into a symbol of academic excellence and societal commitment.
              </p>
            </div>

            {/* Right: Quick Links Sidebar */}
            <aside className="sidebar">
              <QuickLinksCard />
            </aside>
          </div>
        </section>

        {/* MOSAIC GALLERY SECTION - NO LABELS */}
        <section className="container">
          <div className="text-center" style={{marginBottom: '40px'}}>
            <div className="section-label">Visual Journey</div>
            <h2 className="section-title">The JGEI <span>Landscape</span></h2>
          </div>
          
          <div className="jgei-gallery-mosaic">
            {/* Building 1 */}
            <div className="mosaic-item mosaic-item--large">
              <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200" alt="JGEI Campus" />
            </div>
            {/* People/Event 1 */}
            <div className="mosaic-item">
              <img src="https://images.unsplash.com/photo-1523580494863-6f30312246d5?auto=format&fit=crop&q=80&w=800" alt="JGEI Event" />
            </div>
            {/* Building 2 */}
            <div className="mosaic-item">
              <img src="https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=800" alt="JGEI Infrastructure" />
            </div>
            {/* Building 3 */}
            <div className="mosaic-item mosaic-item--wide">
              <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000" alt="JGEI Facility" />
            </div>
            {/* People/Event 2 */}
            <div className="mosaic-item">
              <img src="https://images.unsplash.com/photo-1523240715639-963c71089ce0?auto=format&fit=crop&q=80&w=800" alt="Student Life" />
            </div>
            {/* Building 4 */}
            <div className="mosaic-item">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" alt="Academic Block" />
            </div>
            {/* People/Event 3 */}
            <div className="mosaic-item">
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" alt="Workshop" />
            </div>
          </div>
        </section>

        {/* INSTITUTIONAL OVERVIEW - TEXT ONLY */}
        <section className="institutions-overview">
          <div className="container">
            <div className="text-center">
              <div className="section-label">Group Constituents</div>
              <h2 className="section-title">Our <span>Institutions</span></h2>
              <p className="section-desc">
                Managing a diverse range of self-financing institutions across multiple campuses.
              </p>
            </div>

            <div className="inst-list-grid">
              {/* IMS */}
              <div className="inst-info-block">
                <h3>Institute of Management Sciences (IMS)</h3>
                <p>Located at Gurha Brahmana (Patoli), Akhnoor Road, Jammu. Offers premier management and computer education.</p>
                <ul>
                  <li>2-Year full time MBA (AICTE Approved)</li>
                  <li>3-Year full time MCA (AICTE Approved)</li>
                  <li>3-Year full time BBA (University of Jammu)</li>
                  <li>3-Year full time BCA (University of Jammu)</li>
                </ul>
              </div>

              {/* YCET */}
              <div className="inst-info-block">
                <h3>Yogananda College of Engineering & Technology (YCET)</h3>
                <p>
                  Approved by AICTE for full-time 4-year Bachelor’s Programme in Engineering. Located at Gurha Brahmana (Patoli), Jammu.
                </p>
              </div>

              {/* NCE */}
              <div className="inst-info-block">
                <h3>National College of Education (NCE)</h3>
                <p>
                  Offers 1-year full-time Bachelor’s Degree of Education (B.Ed). Located at Purkhoo Camp, Domana, Jammu, with a spacious, dedicated campus.
                </p>
              </div>

              {/* IECS */}
              <div className="inst-info-block">
                <h3>Institute of Engineering & Computer Sciences (I.E.C.S)</h3>
                <p>
                  Established in 1995. Approved by AICTE and recognized by J&K Govt. Offers 3-year diploma courses in Electronics, Computer, Electrical, Mechanical, and Civil Engineering.
                </p>
              </div>

              {/* TEC */}
              <div className="inst-info-block">
                <h3>Tawi Engineering College (TEC)</h3>
                <p>
                  Located in Pathankot (Punjab). Approved by AICTE and affiliated to Punjab Technical University for various B.Tech branches.
                </p>
              </div>

              {/* TP */}
              <div className="inst-info-block">
                <h3>Tawi Polytechnic (TP)</h3>
                <p>
                  Located in Pathankot (Punjab). Approved by AICTE and affiliated to Punjab State Board of Technical Education for various Diploma courses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section text-center" style={{padding: '100px 0'}}>
          <div className="container">
            <h2 className="section-title">Experience the <span>JGEI Advantage</span></h2>
            <p className="section-desc" style={{maxWidth: '700px', margin: '0 auto 40px'}}>
              Become part of a legacy that has been shaping professional careers for over three decades.
            </p>
            <div className="btn-group justify-content-center">
              <a href="/admissions" className="btn btn-primary btn-lg">Apply for Admissions</a>
              <a href="/contact" className="btn btn-outline-navy btn-lg" style={{marginLeft: '20px'}}>Contact JGEI Office</a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default OverviewJGEI
import React from 'react'
import PageHeader from '@/layoutComponents/PageHeader'
import Layout from '@/layoutComponents/Layout'
import QuickLinksCard from '@/components/QuickLinksCard'
import '@/assets/css/tpc.css'

export const metadata = {
  title: "Training & Placement Cell Message | IMS Jammu",
  description: "Read the message from the Training & Placement Cell (TPC) at IMS Jammu regarding our commitment to student employability and industry partnerships.",
}

const placementFlyers = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1507679799987-c73774586594?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
];

function TPCPage() {
  return (
    <Layout>
      <PageHeader
        title="Training & Placement Cell Message"
        subtitle="Bridging the gap between academic learning and industry expectations."
        bgImage="https://images.unsplash.com/photo-1571867708487-1b39203b0355?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="tpc-page">
        {/* MESSAGE SECTION WITH SIDEBAR */}
        <section className="section" style={{paddingBottom: '80px'}}>
          <div className="container">
            <div className="layout-with-sidebar">
              <div className="tpc-message-left">
                <div className="section-label" style={{justifyContent: 'flex-start'}}>Placement Cell Message</div>
                <h2 className="section-title" style={{textAlign: 'left'}}>Nurturing Future <span>Professionals</span></h2>
                
                <div className="tpc-text-block">
                  <p>
                    In this age of liberalization, privatization and globalization, there is an ever increasing industry requirement for professionals who have high employability index and required competencies with an inquisitive mindset for innovations. IMS, a front-ranking management institution in J&K imparting quality education, lays a high degree of thrust on training and competency building for the budding professionals who are going to embark on challenging careers in the field of technology and its management.
                  </p>
                  
                  <div className="tpc-highlight-box">
                    "Our collective and continuous commitment is to create a vibrant and technology-savvy environment where excellence is the credential."
                  </div>

                  <p>
                    Over a period of few years, students engage themselves and learn use of cutting edge technologies and applications of productive innovations.
                  </p>

                  <div className="tpc-signature">
                    <div className="signature-line"></div>
                    <p><strong>Training & Placement Cell</strong></p>
                    <p>IMS Jammu</p>
                  </div>
                </div>
              </div>

              <aside className="sidebar">
                <QuickLinksCard />
              </aside>
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="gallery-section">
          <div className="container">
            <div className="text-center">
              <div className="section-label">Success Showcase</div>
              <h2 className="section-title">Placements in <span>IMS</span></h2>
              <p className="section-desc" style={{margin: '0 auto'}}>
                Witness the milestones of our students as they step into prestigious corporate roles worldwide.
              </p>
            </div>

            <div className="gallery-grid">
              {placementFlyers.map((url, index) => (
                <div key={index} className="flyer-item">
                  <img src={url} alt={`Placement Flyer ${index + 1}`} />
                  <div className="flyer-overlay">
                    <span>Placement Achievement</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default TPCPage
import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import QuickLinksCard from '@/components/QuickLinksCard'
import '@/assets/css/programs.css'

export const metadata = {
  title: "Bachelor of Business Administration (BBA) | IMS Jammu",
  description: "Join the BBA program at IMS Jammu. Explore vision, mission, eligibility, and admission process for our 3-year undergraduate business degree.",
}

function BBAProgramPage() {
  return (
    <Layout>
      <PageHeader
        title="Bachelor of Business Administration (BBA)"
        subtitle="Developing competent and socially sensitive leaders committed to excellence."
        bgImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="program-page">
        <section className="container" style={{padding: '100px 0'}}>
          <div className="layout-with-sidebar">
            
            {/* Left: Main Content */}
            <div className="program-main-content">
              
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200" 
                alt="Business Education at IMS" 
                className="program-feature-img" 
              />

              {/* Vision & Mission */}
              <div className="vm-container">
                <div className="vm-card vision">
                  <i className="fas fa-lightbulb" />
                  <h3>Our Vision</h3>
                  <p>
                    To emerge as the most preferred educational group with global recognition developing competent & socially sensitive leaders committed to excellence.
                  </p>
                </div>
                <div className="vm-card mission">
                  <i className="fas fa-rocket" />
                  <h3>Our Mission</h3>
                  <p style={{marginBottom: '15px'}}>To make incessant endeavour to translate our vision into a reality and achieve the following objectives:</p>
                  <ul style={{paddingLeft: '15px', fontSize: '0.9rem', lineHeight: '1.6'}}>
                    <li style={{marginBottom: '8px'}}>Create world class facilities for advanced teaching.</li>
                    <li style={{marginBottom: '8px'}}>Develop students as global citizens with commitment.</li>
                    <li style={{marginBottom: '8px'}}>Become a fountain head among technical institutes.</li>
                    <li style={{marginBottom: '8px'}}>Strengthen industry-institute interface.</li>
                    <li>Collaborate with leading global universities.</li>
                  </ul>
                </div>
              </div>

              {/* Highlights */}
              <div className="program-highlights">
                <div className="ph-item">
                  <h4>3 Years</h4>
                  <p>Undergraduate Degree</p>
                </div>
                <div className="ph-item">
                  <h4>Business</h4>
                  <p>Management Focus</p>
                </div>
                <div className="ph-item">
                  <h4>University</h4>
                  <p>Jammu Affiliated</p>
                </div>
              </div>

              {/* Eligibility */}
              <div className="content-block">
                <h2 className="section-title" style={{textAlign: 'left', fontSize: '2.2rem'}}>Eligibility Criteria</h2>
                <p className="section-desc" style={{textAlign: 'left', maxWidth: 'none'}}>
                  The course is open to a candidate who has qualified Higher Secondary Part-II examination (10+2) pattern of J&K Board of School Education or any other examination recognized as equivalent there to with at least 50% of aggregate marks in case of General Category and 45% marks in case of Schedule Caste/Schedule Tribe candidates.
                </p>
              </div>

              {/* Admission Process */}
              <div className="content-block" style={{marginTop: '60px'}}>
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '15px'}}>Admission Process</h3>
                <p style={{marginBottom: '25px', lineHeight: '1.7', color: 'var(--clr-muted)'}}>
                  For admission to the course the candidate has to apply to the Director College Development Council (DCDC), University of Jammu. The DCDC conducts the counselling and allot the college/institution as per the preference of the candidate. The admission fee is to be paid at the time of counselling through a Bank Draft.
                </p>
                
                <h4 style={{marginBottom: '15px', color: 'var(--clr-navy)'}}>Required Documents:</h4>
                <div className="program-list">
                  {[
                    "Seven copies of passport size photographs.",
                    "Three copies of marks card of 10th class and DOB Certificate.",
                    "Four copies of marks card of 10+2 examination.",
                    "Provisional Certificate or School/College leaving Certificate.",
                    "Character Certificate.",
                    "Migration Certificate (for non-JKBOSE candidates).",
                    "Affidavit for any gap period in studies."
                  ].map((doc, idx) => (
                    <div className="pl-item" key={idx}>
                      <i className="fas fa-file-alt" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Objectives */}
              <div className="content-block" style={{marginTop: '60px'}}>
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '20px'}}>BBA Program Objectives</h3>
                <div className="program-list">
                  {[
                    "Exhibit understanding of broad business concepts and principles.",
                    "Demonstrate critical thinking skills for business challenges.",
                    "Imbibe business professionalism and delivery skills.",
                    "Use analytical and reflective thinking for effective decision making.",
                    "Make effective decisions relating to business ethics and social responsibility."
                  ].map((obj, idx) => (
                    <div className="pl-item" key={idx}>
                      <i className="fas fa-bullseye" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div className="content-block" style={{marginTop: '60px'}}>
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '25px'}}>BBA Program Outcomes</h3>
                <div className="faculty-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px'}}>
                  <div className="outcome-box">
                    <h4><i className="fas fa-brain" /> Critical Thinking</h4>
                    <p>Define, analyze, and devise solutions for structured and unstructured business problems using logical reasoning.</p>
                  </div>
                  <div className="outcome-box">
                    <h4><i className="fas fa-comments" /> Communication</h4>
                    <p>Conceptualize complex issues into coherent written statements and professional oral presentations.</p>
                  </div>
                  <div className="outcome-box">
                    <h4><i className="fas fa-laptop-code" /> Technology Skills</h4>
                    <p>Develop technical competence in using modern technology for organizational operations and efficiency.</p>
                  </div>
                  <div className="outcome-box">
                    <h4><i className="fas fa-lightbulb" /> Entrepreneurship</h4>
                    <p>Demonstrate the fundamentals of creating innovation, new business development, and managing high-growth entities.</p>
                  </div>
                  <div className="outcome-box">
                    <h4><i className="fas fa-globe" /> Business Knowledge</h4>
                    <p>Technical competence in domestic and global business through the study of major business disciplines.</p>
                  </div>
                </div>
              </div>

              {/* Document Table Section */}
              <div className="content-block" style={{marginTop: '80px', padding: '40px', background: '#fcfcfc', borderRadius: '15px', border: '1px solid #eee'}}>
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '10px'}}>Detailed Document Checklist</h3>
                <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '20px'}}>Documents Required for BBA-1st Semester students.</p>
                
                <div className="program-table-wrapper">
                  <table className="program-table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Document</th>
                        <th>Copies</th>
                        <th>Original Req.</th>
                        <th>Self Attested</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>10th Mark sheet and Diploma</td>
                        <td>6</td>
                        <td>Yes</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>12th Mark sheet and Diploma</td>
                        <td>6</td>
                        <td>Yes</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>Aadhaar card</td>
                        <td>2</td>
                        <td>Yes</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>State Subject / Domicile</td>
                        <td>2</td>
                        <td>Yes</td>
                        <td>Yes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{marginTop: '30px'}}>
                  <p style={{fontWeight: '700', color: 'var(--clr-navy)', marginBottom: '10px'}}>Important Notes:</p>
                  <p style={{fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '15px'}}>
                    Provisional/Character Certificate: Original from school last attended (or from 1st Class Magistrate/Principal for non-institutional candidates).
                  </p>
                  <div className="program-list">
                    <div className="pl-item">
                      <i className="fas fa-info-circle" />
                      <span>Migration Certificate & TC (original) if from board other than JKBOSE.</span>
                    </div>
                    <div className="pl-item">
                      <i className="fas fa-info-circle" />
                      <span>Affidavit in case of gap period attested by Notary.</span>
                    </div>
                    <div className="pl-item">
                      <i className="fas fa-info-circle" />
                      <span>Passport size Photographs - 8 copies required.</span>
                    </div>
                    <div className="pl-item">
                      <i className="fas fa-info-circle" />
                      <span>Category Certificate (if Applicable): Original along with two attested photocopies.</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Sidebar */}
            <aside className="sidebar">
              <QuickLinksCard />
            </aside>

          </div>
        </section>
      </main>
    </Layout>
  )
}

export default BBAProgramPage
import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import QuickLinksCard from '@/components/QuickLinksCard'
import '@/assets/css/programs.css'

export const metadata = {
  title: "Master of Business Administration (MBA) | IMS Jammu",
  description: "Join the AICTE-approved MBA program at IMS Jammu. Explore eligibility (MAT/CAT), admission process, and program outcomes for postgraduate management.",
}

function MBAProgramPage() {
  return (
    <Layout>
      <PageHeader
        title="Master of Business Administration (MBA)"
        subtitle="Approved by AICTE and affiliated with the University of Jammu."
        bgImage="https://images.unsplash.com/photo-1523240715632-d984bb4b9749?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="program-page">
        <section className="container" style={{padding: '100px 0'}}>
          <div className="layout-with-sidebar">
            
            {/* Left: Main Content */}
            <div className="program-main-content">
              
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
                alt="MBA Leadership at IMS" 
                className="program-feature-img" 
              />

              {/* Program Overview / Intro */}
              <div className="content-block">
                <div className="section-label" style={{justifyContent: 'flex-start'}}>AICTE Approved</div>
                <h2 className="section-title" style={{textAlign: 'left', fontSize: '2.2rem'}}>Department of <span>Management</span></h2>
                <p className="section-desc" style={{textAlign: 'left', maxWidth: 'none', marginBottom: '30px'}}>
                  The MBA course offered by the department is approved by AICTE (All India Council for Technical Education) and Ministry of Human Resource Development, Govt. of India. The Institute is affiliated with Jammu University.
                </p>
                <p style={{lineHeight: '1.8', color: 'var(--clr-muted)'}}>
                  The admission to MBA course is conducted by the University of Jammu under the Centralized process. The institute also conducts admission under management quota, which is 15% of the total sanctioned intake.
                </p>
              </div>

              {/* Highlights Bar */}
              <div className="program-highlights" style={{marginTop: '40px'}}>
                <div className="ph-item">
                  <h4>60</h4>
                  <p>Total Seats</p>
                </div>
                <div className="ph-item">
                  <h4>15%</h4>
                  <p>Mgmt Quota</p>
                </div>
                <div className="ph-item">
                  <h4>2 Years</h4>
                  <p>Postgraduate Degree</p>
                </div>
              </div>

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
                  <ul style={{paddingLeft: '15px', fontSize: '0.85rem', lineHeight: '1.6'}}>
                    <li style={{marginBottom: '8px'}}>Create world class facilities for advanced teaching.</li>
                    <li style={{marginBottom: '8px'}}>Develop students as global citizens with commitment.</li>
                    <li style={{marginBottom: '8px'}}>Become a fountain head among technical institutes.</li>
                    <li style={{marginBottom: '8px'}}>Strengthen industry-institute interface.</li>
                    <li>Collaborate with leading global universities.</li>
                  </ul>
                </div>
              </div>

              {/* Eligibility */}
              <div className="content-block" style={{marginTop: '60px'}}>
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '20px'}}>Eligibility Criteria</h3>
                <div className="program-list">
                  <div className="pl-item">
                    <i className="fas fa-graduation-cap" />
                    <span>At least 50% marks in graduation from a recognized University.</span>
                  </div>
                  <div className="pl-item">
                    <i className="fas fa-chart-line" />
                    <span>A score of at least 25 percentile in MAT or CAT.</span>
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div className="content-block" style={{marginTop: '60px'}}>
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '20px'}}>MBA Program Objectives</h3>
                <div className="program-list">
                  {[
                    "Provide a strong foundation for managerial excellence and leadership roles.",
                    "Impart knowledge of Management theory for real-world problem solving.",
                    "Develop capabilities to independently conduct theoretical and applied research.",
                    "Develop a spirit of entrepreneurship by inculcating creativity and innovation.",
                    "Produce industry-ready graduates with institutional integrity and social responsibility."
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
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '25px'}}>MBA Program Outcomes</h3>
                <div className="faculty-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px'}}>
                  <div className="outcome-box">
                    <h4><i className="fas fa-bullhorn" /> Advanced Communication</h4>
                    <p>Communicate professionally as a business leader to bridge diverse perspectives and cultures.</p>
                  </div>
                  <div className="outcome-box">
                    <h4><i className="fas fa-microscope" /> Analytical Skills</h4>
                    <p>Analyze ethical implications of business practices using advanced levels of ethical reasoning.</p>
                  </div>
                  <div className="outcome-box">
                    <h4><i className="fas fa-chess" /> Strategic Skills</h4>
                    <p>Perform strategic planning and analysis for long term benefits using management tools.</p>
                  </div>
                  <div className="outcome-box">
                    <h4><i className="fas fa-calculator" /> Statistical Skills</h4>
                    <p>Apply quantitative methods to business research and professional problem solving.</p>
                  </div>
                  <div className="outcome-box">
                    <h4><i className="fas fa-users-cog" /> Leadership Skills</h4>
                    <p>Collaborate effectively as a business leader and use global challenges for growth.</p>
                  </div>
                </div>
              </div>

              {/* Document Table Section */}
              <div className="content-block" style={{marginTop: '80px', padding: '40px', background: '#fcfcfc', borderRadius: '15px', border: '1px solid #eee'}}>
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '10px'}}>Detailed Document Checklist</h3>
                <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '20px'}}>Documents required for MBA-1st semester students.</p>
                
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
                        <td>Graduation Mark sheets (All Semesters)</td>
                        <td>6 Per Sem.</td>
                        <td>Yes</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>Aadhaar Card</td>
                        <td>2</td>
                        <td>Yes</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>5.</td>
                        <td>State Subject / Domicile</td>
                        <td>2</td>
                        <td>Yes</td>
                        <td>Yes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{marginTop: '30px'}}>
                  <p style={{fontWeight: '700', color: 'var(--clr-navy)', marginBottom: '10px'}}>Admission Essentials:</p>
                  <div className="program-list two-col">
                    <div className="pl-item">
                      <i className="fas fa-id-card" />
                      <span>MAT / CAT Score Card - 2 Copies</span>
                    </div>
                    <div className="pl-item">
                      <i className="fas fa-info-circle" />
                      <span>Provisional/Character Certificate (Original)</span>
                    </div>
                    <div className="pl-item">
                      <i className="fas fa-info-circle" />
                      <span>Migration Certificate & TC (from non-Jammu Uni)</span>
                    </div>
                    <div className="pl-item">
                      <i className="fas fa-info-circle" />
                      <span>Affidavit for Gap Period (if applicable)</span>
                    </div>
                    <div className="pl-item">
                      <i className="fas fa-camera" />
                      <span>Passport size Photographs - 8 copies</span>
                    </div>
                    <div className="pl-item">
                      <i className="fas fa-users" />
                      <span>Category Certificate (if applicable)</span>
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

export default MBAProgramPage
import PageHeader from '@/layoutComponents/PageHeader'
import React from 'react'
import Layout from '@/layoutComponents/Layout'
import '@/assets/css/administration.css'

export const metadata = {
  title: "Administration",
  description: "Learn about the administrative structure and governance at IMS Jammu, led by Administrative Officer Mr. G.K. Gupta.",
}

function AdministrationPage() {
  return (
    <Layout>
      <PageHeader
        title="Administration"
        subtitle="Ensuring operational excellence and professional governance at every level."
        bgImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="admin-page">
        {/* OVERVIEW SECTION */}
        <section className="section admin-overview">
          <div className="container">
            <div className="admin-flex">
              <div className="admin-content">
                <div className="section-label">Institutional Governance</div>
                <h2 className="section-title">The <span>Administrative Office</span></h2>
                <p className="section-desc">
                  The Administrative Office at IMS Jammu is the vital link between students, faculty, and regulatory bodies. We manage the core operations that keep our institution running smoothly, from the initial admission process to final university certifications.
                </p>
                <p className="section-desc" style={{marginTop: '20px'}}>
                  Our office handles all critical queries related to admissions, registration returns, and examination forms for the University of Jammu, ensuring that every student's academic journey is documented with accuracy.
                </p>
              </div>
              <div className="admin-image">
                <img src="https://images.unsplash.com/photo-1606327054469-cf9dd7162d6c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Administration Office" />
              </div>
            </div>
          </div>
        </section>

        {/* RESPONSIBILITIES GRID */}
        <section className="section admin-functions">
          <div className="container">
            <div className="text-center">
              <div className="section-label">Core Responsibilities</div>
              <h2 className="section-title">What We <span>Do</span></h2>
              <p className="section-desc">
                Our team provides a wide range of essential services to support the academic and professional community at IMS.
              </p>
            </div>

            <div className="functions-grid">
              <div className="function-card">
                <i className="fa-solid fa-file-signature"></i>
                <h3>University Liaison</h3>
                <p>Handling all registration returns, examination forms, and follow-up actions with the University of Jammu.</p>
              </div>

              <div className="function-card">
                <i className="fa-solid fa-envelope-open-text"></i>
                <h3>Official Correspondence</h3>
                <p>Managing communications with statutory agencies and handling day-to-day general correspondence.</p>
              </div>

              <div className="function-card">
                <i className="fa-solid fa-users-gear"></i>
                <h3>Staff Administration</h3>
                <p>Overseeing administrative matters related to both teaching and non-teaching staff members.</p>
              </div>

              <div className="function-card">
                <i className="fa-solid fa-gavel"></i>
                <h3>Student Conduct</h3>
                <p>Managing disciplinary proceedings and ensuring high standards of conduct among the student body.</p>
              </div>

              <div className="function-card">
                <i className="fa-solid fa-briefcase"></i>
                <h3>Operational Support</h3>
                <p>Executing day-to-day activities and any other strategic duties assigned by the Institute Management.</p>
              </div>

              <div className="function-card">
                <i className="fa-solid fa-id-card"></i>
                <h3>Admission Queries</h3>
                <p>Providing guidance and resolving all student queries related to the admission and registration process.</p>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP SECTION */}
        <section className="section officer-spotlight">
          <div className="container">
            <div className="officer-card">
              <div className="officer-info">
                <h4>Leadership Spotlight</h4>
                <h2>Mr. G.K. Gupta</h2>
                <div className="section-label" style={{marginBottom: '20px', color: 'var(--clr-gold-light)'}}>Administrative Officer</div>
                <p>
                  Under the experienced guidance of Mr. G.K. Gupta, the administrative office ensures that all statutory requirements and institutional goals are met with the highest level of professionalism. 
                </p>
                <p style={{marginTop: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem'}}>
                  He oversees staff matters, disciplinary actions, and strategic assignments from the management, fostering a disciplined and efficient environment for both students and faculty.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default AdministrationPage

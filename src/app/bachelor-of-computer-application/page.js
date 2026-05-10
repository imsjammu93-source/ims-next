import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import QuickLinksCard from '@/components/QuickLinksCard'
import '@/assets/css/programs.css'
import { assetsInfo } from '@/config/assetsInfo'

export const metadata = {
  title: "Bachelor of Computer Applications (BCA) | IMS Jammu",
  description: "Join the BCA program at IMS Jammu. Explore vision, mission, eligibility, and admission process for our 3-year computer applications degree.",
}

function BCAProgramPage() {
  return (
    <Layout>
      <PageHeader
        title="Bachelor of Computer Applications (BCA)"
        subtitle="Empowering the next generation of computing professionals and IT leaders."
        bgImage={assetsInfo.bcaPageHeaderImg}
      />

      <main className="program-page">
        <section className="container" style={{padding: '100px 0'}}>
          <div className="layout-with-sidebar">
            
            {/* Left: Main Content */}
            <div className="program-main-content">
              
              <img 
                src={assetsInfo.bcaFlyerImg} 
                alt="Computing Labs at IMS" 
                className="program-feature-img" 
              />

              {/* Vision & Mission */}
              <div className="vm-container">
                <div className="vm-card vision">
                  <i className="fas fa-eye" />
                  <h3>Our Vision</h3>
                  <p>
                    To bring out worldly competent, pioneering computing professionals, researchers, programmers and contribute value to enable the graduates to meet a new level of inspiration among the students to serve the society and industry.
                  </p>
                </div>
                <div className="vm-card mission">
                  <i className="fas fa-bullseye" />
                  <h3>Our Mission</h3>
                  <p>
                    The mission of the department is to strive for excellence in knowledge of computer applications to meet the global challenge in the field of Information Technology.
                  </p>
                </div>
              </div>

              {/* Quick Highlights */}
              <div className="program-highlights">
                <div className="ph-item">
                  <h4>110</h4>
                  <p>Total Intake</p>
                </div>
                <div className="ph-item">
                  <h4>3 Years</h4>
                  <p>Full Time Degree</p>
                </div>
                <div className="ph-item">
                  <h4>DCDC</h4>
                  <p>University of Jammu</p>
                </div>
              </div>

              {/* Program Introduction */}
              <div className="content-block">
                <h2 className="section-title" style={{textAlign: 'left', fontSize: '2.2rem'}}>Course Overview</h2>
                <p className="section-desc" style={{textAlign: 'left', maxWidth: 'none', marginBottom: '30px'}}>
                  This course is recognised by J&K government and admission is done through the Director College Development Council (DCDC), University of Jammu. The DCDC conducts the counselling and allots the college/institution as per the preference of the candidate, however, subject to the availability of seats in the College/Institute.
                </p>
              </div>

              {/* Eligibility */}
              <div className="content-block" style={{marginTop: '50px'}}>
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '15px'}}>Eligibility Criteria</h3>
                <p className="section-desc" style={{textAlign: 'left', maxWidth: 'none'}}>
                  The course is open to a candidate who has qualified Higher Secondary Part-II examination (10+2) pattern of J&K Board of School Education or any other examination recognized as equivalent there to with at least 50% of aggregate marks in case of General Category and 45% marks in case of Schedule Caste/Schedule Tribe candidates.
                </p>
              </div>

              {/* Admission Process */}
              <div className="content-block" style={{marginTop: '60px'}}>
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '15px'}}>Admission Process</h3>
                <p style={{marginBottom: '20px', lineHeight: '1.7', color: 'var(--clr-muted)'}}>
                  For admission to the course the candidate has to apply to the Director College Development Council (DCDC), University of Jammu. The admission fee is to be paid at the time of counselling through a Bank Draft as required in favor of Director College Development Council, University of Jammu.
                </p>
                <p style={{fontWeight: '700', color: 'var(--clr-navy)', marginBottom: '15px'}}>Required Documents for Admission:</p>
                <div className="program-list">
                  <div className="pl-item">
                    <i className="fas fa-check-circle" />
                    <span>Seven copies of passport size photographs.</span>
                  </div>
                  <div className="pl-item">
                    <i className="fas fa-check-circle" />
                    <span>Three copies of marks card of 10th class and Date of Birth Certificate.</span>
                  </div>
                  <div className="pl-item">
                    <i className="fas fa-check-circle" />
                    <span>Four copies of marks card of 10+2 examination.</span>
                  </div>
                  <div className="pl-item">
                    <i className="fas fa-check-circle" />
                    <span>Provisional Certificate or School/College leaving Certificate.</span>
                  </div>
                  <div className="pl-item">
                    <i className="fas fa-check-circle" />
                    <span>Character Certificate & Migration Certificate (if applicable).</span>
                  </div>
                  <div className="pl-item">
                    <i className="fas fa-check-circle" />
                    <span>Affidavit for any break in studies.</span>
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div className="objectives-block">
                <h3>BCA Program Objectives</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.95}}>
                  The BCA course is a full time three years (six semesters) Bachelor’s Degree in Computer Application. The basic objective of BCA Course is to provide young professionals with the required knowledge and necessary skills to get rewarding careers into the changing world of Information Technology.
                </p>
              </div>

              {/* Outcomes */}
              <div className="content-block">
                <h3 style={{color: 'var(--clr-navy)', marginBottom: '15px'}}>BCA Program Outcomes</h3>
                <p style={{marginBottom: '25px', color: 'var(--clr-muted)'}}>
                  Student outcomes describe what students are expected to know and be able to do by the time of graduation. The Computer Science Department must enable students to attain the following:
                </p>
                <div className="program-list two-col">
                  {[
                    "Apply knowledge of computing and mathematics appropriate to the discipline.",
                    "Identify, formulate and develop solutions to computational challenges.",
                    "Design, implement and evaluate a computational system to meet desired needs.",
                    "Function effectively on teams to accomplish shared computing goals.",
                    "Understand professional, ethical, legal, security, and social responsibilities.",
                    "Communicate and engage effectively with diverse stakeholders.",
                    "Analyze impact of computing on individuals, organizations, and society.",
                    "Recognize the need for continuing professional development.",
                    "Use appropriate techniques, skills, and tools necessary for computing practice.",
                    "Apply algorithmic principles and theory in the modeling of computational systems.",
                    "Apply design and development principles in software systems construction."
                  ].map((outcome, idx) => (
                    <div className="pl-item" key={idx}>
                      <i className="fas fa-shield-alt" />
                      <span>{outcome}</span>
                    </div>
                  ))}
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

export default BCAProgramPage
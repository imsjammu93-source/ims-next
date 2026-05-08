import React from 'react'
import Link from 'next/link'
import Layout from '@/layoutComponents/Layout'
import '@/assets/css/coming-soon.css'

export const metadata = {
  title: "Under Development | IMS Jammu",
  description: "This page is currently under development. Please check back later.",
}

function ComingSoon() {
  return (
    <Layout hideFooter={false}>
      <main className="coming-soon-wrapper">
        
        <div className="cs-card" data-aos="zoom-in">
          <div className="cs-tag">Section Under Process</div>
          <div className="cs-icon">
            <i className="fas fa-tools" />
          </div>
          
          <h1 className="cs-title">Building Something <span>Great!</span></h1>
          <p className="cs-desc">
            We are currently updating this section of our website to provide you with the most accurate and up-to-date information. Our team is working hard to bring this to you very soon.
          </p>

          <div className="cs-actions">
            <Link href="/" className="btn btn-navy">
              <i className="fas fa-home" /> Back to Homepage
            </Link>
            <Link href="/admissions" className="btn btn-primary">
              Enquire for Admission <i className="fas fa-arrow-right" />
            </Link>
          </div>

          <div style={{marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #eee'}}>
            <p style={{fontSize: '0.85rem', color: '#888'}}>
              If you have any urgent queries, please call us at:<br />
              <strong style={{color: 'var(--clr-navy)'}}>+91 70064 89200</strong>
            </p>
          </div>
        </div>

      </main>
    </Layout>
  )
}

export default ComingSoon

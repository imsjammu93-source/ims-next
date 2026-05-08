import React from 'react'
import PageHeader from '@/layoutComponents/PageHeader'
import Layout from '@/layoutComponents/Layout'
import AboutSection from '@/components/AboutSection'
import WhyChooseSection from '@/components/WhyChooseSection'
import StatsSection from '@/components/StatsSection'
function AboutPage() {
  return (
   
    <Layout>
    <PageHeader
        title="About IMS"
        subtitle="Discover the journey of excellence and innovation at Institute of Management Sciences, Jammu."
        bgImage="/assets/images/campus.jpg"
      />

      <div className="inline-stats-bar">
        <div className="container">
          <div className="inline-stats-grid">
            <div className="inline-stat-item">
              <div className="inline-stat-num">1500<span>+</span></div>
              <div className="inline-stat-label">Scholars</div>
            </div>
            <div className="inline-stat-item">
              <div className="inline-stat-num">260<span>+</span></div>
              <div className="inline-stat-label">Staff</div>
            </div>
            <div className="inline-stat-item">
              <div className="inline-stat-num">120<span>+</span></div>
              <div className="inline-stat-label">Companies</div>
            </div>
            <div className="inline-stat-item">
              <div className="inline-stat-num">4</div>
              <div className="inline-stat-label">Courses</div>
            </div>
          </div>
        </div>
      </div>

      <AboutSection/>
     

      <WhyChooseSection/>
    </Layout>
    
  )
}

export default AboutPage
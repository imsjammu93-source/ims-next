'use client';
import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import '@/assets/css/faculty.css'
import { assetsInfo } from '@/config/assetsInfo'

const facultyData = {
  director: {
    name: "Dr. Meenakshi Sharma",
    qualification: "Ph.D. in Business Management, MBA (Operations)",
    designation: "DIRECTOR",
    experience: "16 Years (9 Years – Academic Experience, 7 Years – Corporate Experience)",
    image: assetsInfo.directorImg
  },
  management: [
    {
      name: "Dr. Meenakshi Sharma",
      qualification: "Ph.D. in Business Management, MBA (Operations)",
      designation: "Director",
      experience: "16 Years (9 Years – Academic Experience, 7 Years - Corporate Experience)",
      image: assetsInfo.facultyMeenakshiSharmaImg
    },
    {
      name: "Mrs. Divya Jamwal",
      qualification: "MBA (HR and Marketing) B.Tech",
      designation: "Assistant Professor",
      experience: "8 Years",
      image: assetsInfo.facultyDivyaJamwalImg
    },
    {
      name: "Ms. Gurshish Kour",
      qualification: "MBA (Finance)",
      designation: "Assistant Professor",
      experience: "8 Years",
      image: assetsInfo.facultyGurshishKourImg
    },
    {
      name: "Mrs. Era Sharma",
      qualification: "MBA (HR) B. Tech",
      designation: "Assistant Professor",
      experience: "3.5 Years (2.5 Years -- Corporate Experience, 1 year -- Teaching Experience)",
      image: assetsInfo.facultyEraSharmaImg
    },
    {
      name: "Mrs. Charu Katoch",
      qualification: "MBA(HR) MA (SOCIOLOGY) B.Ed",
      designation: "Assistant Professor",
      experience: "5 Years (Corporate Experience)",
      image: assetsInfo.facultyCharuKatochImg
    },
    {
      name: "Ms. Vanshika Sharma",
      qualification: "MBA (Finance) B. Com",
      designation: "Assistant Professor",
      experience: "1 Year",
      image: assetsInfo.facultyVanshikaSharmaImg
    },
   
  ],
  computerScience: [
    {
      name: "MRS. SHEETAL SHARMA",
      qualification: "M.A ENGLISH, B.ED",
      designation: "ASSISTANT PROFESSOR",
      experience: "18 years of Teaching Experience",
      image: assetsInfo.facultySheetalSharmaImg
    },
    {
      name: "PRIYA GUPTA",
      qualification: "BCA, PGDCA, MCA",
      designation: "ASSISTANT PROFESSOR",
      experience: "9 YEARS OF TEACHING EXPERIENCE",
      image: assetsInfo.facultyPriyaGuptaImg
    },
    {
      name: "MS. NISHA LANGEH",
      qualification: "BCA, MCA",
      designation: "ASSISTANT PROFESSOR",
      experience: "6 YEARS OF TEACHING EXPERIENCE",
      image: assetsInfo.facultyNishaLangehImg
    },
    {
      name: "Danish Amin",
      qualification: "MSc Mathematics, PhD (Submitted)",
      designation: "Assistant Professor",
      experience: "2 YEARS OF TEACHING EXPERIENCE",
      image: assetsInfo.facultyDanishAminImg
    }
  ]
}

function FacultyPage() {
  return (
    <Layout>
      <PageHeader
        title="Our Distinguished Faculty"
        subtitle="Meet the academic leaders and mentors who shape the future at IMS."
        bgImage={assetsInfo.facultyPageHeaderImg}
      />

      <main className="faculty-page">
        <section className="container" style={{paddingTop: '100px'}}>
          
          {/* 1. Director Section */}
          <div className="faculty-category-section">
            <div className="category-title">
              <h2>Director IMS</h2>
            </div>
            <div className="director-container">
              <div className="director-card">
                <div className="img-protect-wrapper director-image-wrap">
                  <div className="img-shield" onContextMenu={(e) => e.preventDefault()}></div>
                  <img 
                    src={facultyData.director.image} 
                    alt={facultyData.director.name} 
                    className="director-image" 
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <div className="director-info">
                  <span className="designation">{facultyData.director.designation}</span>
                  <h3>{facultyData.director.name}</h3>
                  <p className="qualification">{facultyData.director.qualification}</p>
                  <div className="experience-box">
                    <p style={{fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '5px', opacity: 0.8}}>Total Experience</p>
                    <p style={{fontWeight: '600', fontSize: '1.1rem'}}>{facultyData.director.experience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Management Section */}
          <div className="faculty-category-section">
            <div className="category-title">
              <h2>Management Department</h2>
            </div>
            <div className="faculty-grid">
              {facultyData.management.map((member, index) => (
                <div className="faculty-card" key={index}>
                  <div className="img-protect-wrapper">
                    <div className="img-shield" onContextMenu={(e) => e.preventDefault()}></div>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="faculty-card-image" 
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <div className="faculty-card-content">
                    <span className="designation">{member.designation}</span>
                    <h4>{member.name}</h4>
                    <p className="qualification">{member.qualification}</p>
                    <div className="experience-badge">
                      <i className="fas fa-briefcase" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Computer Science Section */}
          <div className="faculty-category-section">
            <div className="category-title">
              <h2>Computer Science</h2>
            </div>
            <div className="faculty-grid">
              {facultyData.computerScience.map((member, index) => (
                <div className="faculty-card" key={index}>
                  <div className="img-protect-wrapper">
                    <div className="img-shield" onContextMenu={(e) => e.preventDefault()}></div>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="faculty-card-image" 
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <div className="faculty-card-content">
                    <span className="designation">{member.designation}</span>
                    <h4>{member.name}</h4>
                    <p className="qualification">{member.qualification}</p>
                    <div className="experience-badge">
                      <i className="fas fa-briefcase" />
                      <span>{member.experience}</span>
                    </div>
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

export default FacultyPage
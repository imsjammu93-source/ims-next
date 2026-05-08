import React from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import '@/assets/css/faculty.css'

export const metadata = {
  title: "Our Faculty | IMS Jammu",
  description: "Meet the distinguished faculty members of the Institute of Management Sciences, Jammu.",
}

const facultyData = {
  director: {
    name: "Dr. Meenakshi Sharma",
    qualification: "Ph.D. in Business Management, MBA (Operations)",
    designation: "DIRECTOR",
    experience: "16 Years (9 Years – Academic Experience, 7 Years – Corporate Experience)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
  },
  management: [
    {
      name: "Dr. Meenakshi Sharma",
      qualification: "Ph.D. in Business Management, MBA (Operations)",
      designation: "Director",
      experience: "16 Years (9 Years – Academic Experience, 7 Years - Corporate Experience)",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Mrs. Divya Jamwal",
      qualification: "MBA (HR and Marketing) B.Tech",
      designation: "Assistant Professor",
      experience: "8 Years",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Ms. Gurshish Kour",
      qualification: "MBA (Finance)",
      designation: "Assistant Professor",
      experience: "8 Years",
      image: "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Mrs. Era Sharma",
      qualification: "MBA (HR) B. Tech",
      designation: "Assistant Professor",
      experience: "3.5 Years (2.5 Years -- Corporate Experience, 1 year -- Teaching Experience)",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Mrs. Charu Katoch",
      qualification: "MBA(HR) MA (SOCIOLOGY) B.Ed",
      designation: "Assistant Professor",
      experience: "5 Years (Corporate Experience)",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Ms. Vanshika Sharma",
      qualification: "MBA (Finance) B. Com",
      designation: "Assistant Professor",
      experience: "1 Year",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Ms. Vanshika Gupta",
      qualification: "MBA (FINANCE AND OPERATIONS) B.COM",
      designation: "Assistant Professor",
      experience: "6 Months",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600"
    }
  ],
  computerScience: [
    {
      name: "MRS. SHEETAL SHARMA",
      qualification: "M.A ENGLISH, B.ED",
      designation: "ASSISTANT PROFESSOR",
      experience: "18 years of Teaching Experience",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "PRIYA GUPTA",
      qualification: "BCA, PGDCA, MCA",
      designation: "ASSISTANT PROFESSOR",
      experience: "9 YEARS OF TEACHING EXPERIENCE",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "MS. NISHA LANGEH",
      qualification: "BCA, MCA",
      designation: "ASSISTANT PROFESSOR",
      experience: "6 YEARS OF TEACHING EXPERIENCE",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Danish Amin",
      qualification: "MSc Mathematics, PhD (Submitted)",
      designation: "Assistant Professor",
      experience: "2 YEARS OF TEACHING EXPERIENCE",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
    }
  ]
}

function FacultyPage() {
  return (
    <Layout>
      <PageHeader
        title="Our Distinguished Faculty"
        subtitle="Meet the academic leaders and mentors who shape the future at IMS."
        bgImage="https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&q=80&w=1920"
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
                <img src={facultyData.director.image} alt={facultyData.director.name} className="director-image" />
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
                  <img src={member.image} alt={member.name} className="faculty-card-image" />
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
                  <img src={member.image} alt={member.name} className="faculty-card-image" />
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
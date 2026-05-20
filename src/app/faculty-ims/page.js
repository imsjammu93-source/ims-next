'use client';
import React, { useState, useEffect } from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import '@/assets/css/faculty.css'
import { assetsInfo } from '@/config/assetsInfo'
import { facultyData as staticFacultyData } from '@/config/faculityInfo'
import { getFaculty } from '@/lib/fetchData'

function FacultyPage() {
  const [managementList, setManagementList] = useState([]);
  const [csList, setCsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFaculty() {
      try {
        const data = await getFaculty(0); // Fetch only active faculty members
        if (data && data.length > 0) {
          const management = data.filter(mem => mem.department === 'management');
          const cs = data.filter(mem => mem.department === 'computerScience');
          
          setManagementList(management);
          setCsList(cs);
        } else {
          // Fallback to static CSV mapping if database is empty or not configured yet
          setManagementList(staticFacultyData.management);
          setCsList(staticFacultyData.computerScience);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic faculty data:", err);
        setManagementList(staticFacultyData.management);
        setCsList(staticFacultyData.computerScience);
      } finally {
        setLoading(false);
      }
    }

    loadFaculty();
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Our Distinguished Faculty"
        subtitle="Meet the academic leaders and mentors who shape the future at IMS."
        bgImage={assetsInfo.facultyPageHeaderImg}
      />

      <main className="faculty-page">
        <section className="container" style={{paddingTop: '100px'}}>
         
          {/* 2. Management Section */}
          {managementList.length > 0 && (
            <div className="faculty-category-section">
              <div className="category-title">
                <h2>Management Department</h2>
              </div>
              <div className="faculty-grid">
                {managementList.map((member, index) => (
                  <div className="faculty-card" key={member.id || index}>
                    <div className="img-protect-wrapper">
                      <div className="img-shield" onContextMenu={(e) => e.preventDefault()}></div>
                      <img 
                        src={member.image_url || member.image} 
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
          )}

          {/* 3. Computer Science Section */}
          {csList.length > 0 && (
            <div className="faculty-category-section">
              <div className="category-title">
                <h2>Computer Science</h2>
              </div>
              <div className="faculty-grid">
                {csList.map((member, index) => (
                  <div className="faculty-card" key={member.id || index}>
                    <div className="img-protect-wrapper">
                      <div className="img-shield" onContextMenu={(e) => e.preventDefault()}></div>
                      <img 
                        src={member.image_url || member.image} 
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
          )}

        </section>
      </main>
    </Layout>
  )
}

export default FacultyPage
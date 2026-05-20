"use client";

import React, { useState,useEffect } from 'react'
import Layout from '@/layoutComponents/Layout'
import PageHeader from '@/layoutComponents/PageHeader'
import QuickLinksCard from '@/components/QuickLinksCard'
import { contactInfo } from '@/config/contactInfo'
import '@/assets/css/admissions.css'
import { assetsInfo } from '@/config/assetsInfo';
import { getAdmissionSettings } from '@/lib/fetchData';

export default function AdmissionsPage() {
  const [status, setStatus] = useState('idle');
  const [settings, setSettings] = useState({ current_session: '2024-25' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAdmissionSettings();
        if (data && !Array.isArray(data)) {
          setSettings(data);
        }
      } catch (err) {
        console.error("Admissions page settings fetch failed:", err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        // Clear form after success
        setFormData({
          name: '',
          email: '',
          phone: '',
          course: '',
          message: ''
        });
      } else {
        setStatus('error');
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      alert("Failed to submit. Please check your connection.");
    }
  };

  return (
    <Layout>
      <PageHeader 
        title="Admissions are Open Now!!!" 
        subtitle="Start your career with IMS Jammu today."
        bgImage={assetsInfo.campusPageHeaderImg}
      />

      <main className="admissions-page">
        <section className="container admissions-main-section">
          <div className="admission-layout">
            
            {/* Left Column: Easy to Read Info */}
            <div className="admission-content">
              <div className="section-label" style={{justifyContent: 'flex-start'}}>Admission {settings.current_session}</div>
              <h2 className="section-title" style={{textAlign: 'left'}}>How to Join <span>IMS Jammu?</span></h2>
              <p className="section-desc" style={{textAlign: 'left', maxWidth: 'none', marginBottom: '40px'}}>
                We welcome students who want to learn and grow in the fields of Management and IT. Our admission process is very simple and easy for everyone.
              </p>

              {/* 3 Steps Process */}
              <div style={{marginBottom: '60px'}}>
                <h3 style={{marginBottom: '25px', color: 'var(--clr-navy)'}}>Easy 3-Step Process</h3>
                <div className="admission-info-list">
                  <div className="info-item">
                    <div className="info-icon">1</div>
                    <div className="info-text">
                      <h4>Fill the Enquiry Form</h4>
                      <p>Fill the form on the right side. Our team will call you to help with your questions.</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">2</div>
                    <div className="info-text">
                      <h4>Visit the Campus</h4>
                      <p>Come to our campus, see our labs and library, and meet our teachers.</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">3</div>
                    <div className="info-text">
                      <h4>Book Your Seat</h4>
                      <p>Submit your documents and pay the small registration fee to confirm your admission.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Section */}
              <div className="eligibility-container">
                <h3 style={{marginBottom: '20px', color: 'var(--clr-navy)'}}>Who can Apply?</h3>
                <div className="eligibility-grid">
                  <div className="info-text">
                    <p><strong>For BBA/BCA:</strong></p>
                    <p>You must have passed 12th class from a recognized board with at least 45% marks.</p>
                  </div>
                  <div className="info-text">
                    <p><strong>For MBA/MCA:</strong></p>
                    <p>You must have a Bachelor's Degree with 50% marks (45% for reserved category).</p>
                  </div>
                </div>
              </div>

              {/* Scholarship Info */}
              <div style={{marginBottom: '40px'}}>
                <h3 style={{marginBottom: '20px', color: 'var(--clr-navy)'}}>Scholarships for You</h3>
                <p className="section-desc" style={{textAlign: 'left', maxWidth: 'none'}}>
                  We believe every student deserves a good education. We provide special scholarships for:
                </p>
                <ul className="inst-bullets" style={{marginTop: '15px'}}>
                  <li>Students who did very well in their 12th class exams.</li>
                  <li>Students from low-income families.</li>
                  <li>Special discount for girl students to promote education.</li>
                  <li>Discount for students who are good at sports.</li>
                </ul>
              </div>

              {/* Contact Help */}
              <div style={{marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '30px'}}>
                <p><strong>Need help with your application?</strong></p>
                <p>Call us at: <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phone}</a> or Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
              </div>
            </div>

            {/* Right Column: Wider Form Card */}
            <aside className="sidebar">
              <div className="sidebar-sticky-wrapper">
                <div className="admission-form-card">
                  
                  {status === 'success' ? (
                    <div className="success-screen">
                      <div className="success-icon">
                        <i className="fas fa-check" />
                      </div>
                      <h4>Thank You!</h4>
                      <p>We have received your enquiry. One of our admission experts will call you very soon to help you.</p>
                      <button 
                        className="btn btn-primary btn-sm" 
                        style={{marginTop: '25px'}}
                        onClick={() => setStatus('idle')}
                      >
                        Send Another Enquiry
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3>Admission Open <span>Enquire Now!</span></h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label>Student Name (required)</label>
                          <input 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            placeholder="Enter full name"
                            required 
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group">
                          <label>Phone Number (required)</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            className="form-control" 
                            placeholder="Enter 10-digit number"
                            required 
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group">
                          <label>Email Address (optional)</label>
                          <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            placeholder="Enter email id"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group">
                          <label>Select Course (required)</label>
                          <select 
                            name="course" 
                            className="form-control" 
                            required
                            value={formData.course}
                            onChange={handleChange}
                          >
                            <option value="">-- Choose a Course --</option>
                            <option value="BBA">BBA</option>
                            <option value="MBA">MBA</option>
                            <option value="BCA">BCA</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label>Your Message or Question</label>
                          <textarea 
                            name="message" 
                            className="form-control" 
                            placeholder="Write your questions here..."
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                        </div>

                        <button 
                          type="submit" 
                          className="btn-submit" 
                          disabled={status === 'loading'}
                        >
                          {status === 'loading' ? (
                            <>
                              <i className="fas fa-spinner fa-spin" /> Sending...
                            </>
                          ) : (
                            'Submit Enquiry'
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>

                {/* Additional Quick Links */}
                <div style={{marginTop: '30px'}}>
                  <QuickLinksCard />
                </div>
              </div>
            </aside>

          </div>
        </section>
      </main>
    </Layout>
  )
}
'use client';
import React, { useState, useEffect } from 'react';
import Layout from '@/layoutComponents/Layout';
import PageHeader from '@/layoutComponents/PageHeader';
import { contactInfo } from '@/config/contactInfo';
import '@/assets/css/contact.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captcha, setCaptcha] = useState({ num1: null, num2: null, signature: '', timestamp: null, answer: '' });

  const fetchCaptcha = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setCaptcha({
          num1: data.num1,
          num2: data.num2,
          signature: data.signature,
          timestamp: data.timestamp,
          answer: ''
        });
      }
    } catch (err) {
      console.error("Failed to load captcha challenge:", err);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          num1: captcha.num1,
          num2: captcha.num2,
          signature: captcha.signature,
          timestamp: captcha.timestamp,
          captchaAnswer: captcha.answer
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        fetchCaptcha(); // Instantly fetch new captcha challenge for any future requests
      } else {
        setStatus('error');
        const errMsg = data.message || "Incorrect verification answer or challenge expired.";
        setErrorMessage(errMsg);
        alert(errMsg);
        fetchCaptcha();
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      const connMsg = "Submission failed. Please check your connection and try again.";
      setErrorMessage(connMsg);
      alert("Failed to submit. Please check your connection.");
    }
  };

  return (
    <Layout>
      <PageHeader 
        title="Contact Us" 
        subtitle="Connect with IMS Jammu's administration and academic departments."
        bgImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1920"
      />

      <main className="contact-page">
        <section className="container" style={{padding: '100px 0'}}>
          
          <div className="contact-layout">
            
            {/* LEFT: MAP & OFFICIAL INFO */}
            <div className="contact-visual-side">
              <div className="map-wrapper">
                <iframe 
                  src={contactInfo.mapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IMS Jammu Campus Location"
                ></iframe>
              </div>
              
              <div className="contact-info-overlay">
                <h3 className="cio-title">Institutional Office</h3>
                
                <div className="cio-item">
                  <div className="cio-icon"><i className="fas fa-map-marker-alt" /></div>
                  <div className="cio-text">
                    <h4>Campus Address</h4>
                    <p>{contactInfo.address}</p>
                  </div>
                </div>

                <div className="cio-item">
                  <div className="cio-icon"><i className="fas fa-phone-alt" /></div>
                  <div className="cio-text">
                    <h4>Admission Helpdesk</h4>
                    <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phone}</a>
                  </div>
                </div>

                <div className="cio-item" style={{marginBottom: 0}}>
                  <div className="cio-icon"><i className="fas fa-envelope" /></div>
                  <div className="cio-text">
                    <h4>General Inquiries</h4>
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: CONTACT FORM */}
            <div className="contact-form-side">
              <div className="cfs-header">
                <h2 className="cfs-title">Reach Out</h2>
                <p className="cfs-subtitle">Our academic counselors are available to assist you with admissions, course details, and campus tours.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleInputChange} required 
                      placeholder="e.g. John Doe"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange} required 
                      placeholder="john@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                      placeholder="+91 70000 00000"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Inquiry Subject</label>
                    <input 
                      type="text" name="subject" value={formData.subject} onChange={handleInputChange} required 
                      placeholder="e.g. MBA Admissions"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message Details</label>
                  <textarea 
                    name="message" value={formData.message} onChange={handleInputChange} required 
                    placeholder="Tell us how we can help you..."
                    rows="5"
                    className="form-textarea"
                  ></textarea>
                </div>

                {/* Security Verification (Captcha) */}
                <div className="form-group captcha-group">
                  <label className="form-label">Security Verification (required)</label>
                  <div className="captcha-container">
                    <span className="captcha-question">
                      {captcha.num1 !== null ? `${captcha.num1} + ${captcha.num2} =` : 'Loading...'}
                    </span>
                    <input 
                      type="number" 
                      name="captcha"
                      className="form-input captcha-input"
                      placeholder="?"
                      required
                      value={captcha.answer}
                      onChange={(e) => setCaptcha({ ...captcha, answer: e.target.value })}
                    />
                    <button 
                      type="button" 
                      className="captcha-refresh-btn" 
                      onClick={fetchCaptcha}
                      title="Refresh security challenge"
                      aria-label="Refresh security challenge"
                    >
                      <i className="fas fa-sync-alt" />
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="form-submit-btn"
                >
                  {status === 'loading' ? (
                    <><i className="fas fa-spinner fa-spin" /> Transmitting...</>
                  ) : (
                    <><i className="fas fa-paper-plane" /> Submit Inquiry</>
                  )}
                </button>

                {status === 'success' && (
                  <div className="status-toast success">
                    <i className="fas fa-check-double" style={{fontSize: '1.5rem'}} />
                    <span>Your inquiry has been successfully dispatched to our office.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="status-toast error">
                    <i className="fas fa-exclamation-triangle" style={{fontSize: '1.5rem'}} />
                    <span>{errorMessage || "Submission failed. Please check your connection and try again."}</span>
                  </div>
                )}
              </form>
            </div>

          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ContactPage;
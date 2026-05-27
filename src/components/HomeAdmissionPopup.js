'use client';

import React, { useState, useEffect } from 'react';
import { getAdmissionSettings } from '@/lib/fetchData';
import '@/assets/css/admissions.css';

export default function HomeAdmissionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [settings, setSettings] = useState({ show_popup: 0, current_session: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [captcha, setCaptcha] = useState({ num1: null, num2: null, signature: '', timestamp: null, answer: '' });

  const fetchCaptcha = async () => {
    try {
      const res = await fetch('/api/admissions');
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
    const fetchSettings = async () => {
      try {
        const data = await getAdmissionSettings();
        if (data && !Array.isArray(data)) {
          setSettings(data);
          // Only show if enabled by admin
          if (data.show_popup == 1) {
            setTimeout(() => setIsOpen(true), 2000);
          }
        }
      } catch (err) {
        console.error("Popup settings fetch failed:", err);
      }
    };
    fetchSettings();
    fetchCaptcha();
  }, []);

  // Disable body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch("/api/admissions", {
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
        setTimeout(() => {
          setIsOpen(false);
          setTimeout(() => setStatus('idle'), 500);
        }, 3000);
        
        setFormData({ name: '', email: '', phone: '', course: '', message: '' });
        fetchCaptcha(); // Load fresh equation immediately on success
      } else {
        setStatus('error');
        alert(data.message || "Incorrect verification answer or challenge expired.");
        fetchCaptcha();
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      alert("Failed to submit. Please check your connection.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admission-modal-root">
      {/* Dark Overlay */}
      <div className="admission-modal-overlay" onClick={closePopup} />
      
      {/* Modal Container */}
      <div className="admission-modal-wrapper">
        <div className="admission-modal-content">
          <button className="admission-modal-close" onClick={closePopup}>
            <i className="fas fa-times"></i>
          </button>
          
          <div className="admission-form-card modal-card-ui">
            <div className="modal-top-bar"></div>
            
            <div className="modal-header-section">
              <span className="modal-badge">Direct Admission {settings.current_session}</span>
              <h3>Enquiry Form</h3>
              <p>Please fill in your details and we will get back to you shortly.</p>
            </div>

            {status === 'success' ? (
              <div className="success-screen">
                <div className="success-icon">
                  <i className="fas fa-check" />
                </div>
                <h4>Sent Successfully!</h4>
                <p>Our team will contact you on your provided number soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form-layout">
                <div className="modal-form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      className="form-control" 
                      placeholder="Enter Name"
                      required 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      className="form-control" 
                      placeholder="Enter Mobile"
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Select Course</label>
                  <select 
                    name="course" 
                    className="form-control" 
                    required
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">-- Choose Course --</option>
                    <option value="BBA">BBA</option>
                    <option value="MBA">MBA</option>
                    <option value="BCA">BCA</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea 
                    name="message" 
                    className="form-control" 
                    placeholder="Briefly tell us your query"
                    rows="2"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Security Verification (Captcha) */}
                <div className="form-group captcha-group">
                  <label>Security Verification (required)</label>
                  <div className="captcha-container">
                    <span className="captcha-question">
                      {captcha.num1 !== null ? `${captcha.num1} + ${captcha.num2} =` : 'Loading...'}
                    </span>
                    <input 
                      type="number" 
                      name="captcha"
                      className="form-control captcha-input"
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
                  className="modal-submit-btn" 
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <><i className="fas fa-spinner fa-spin" /> Submitting...</>
                  ) : (
                    'Register Now'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

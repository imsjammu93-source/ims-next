'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import '@/assets/css/login.css';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(form.username, form.password);
    
    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.message || 'Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* Left Panel — Branding */}
      <div className="login-left">
        <div className="login-left__inner">
          <div className="login-logo">
            <div className="login-logo__icon">I</div>
            <div className="login-logo__text">
              <span>IMS Jammu</span>
              <span>Institute of Management Sciences</span>
            </div>
          </div>

          <div className="login-hero-text">
            <h1>Admin Portal</h1>
            <p>
              Manage your website content, blogs, events, and admissions from one 
              powerful and intuitive dashboard.
            </p>
          </div>

          <div className="login-features">
            <div className="login-feature">
              <div className="login-feature__icon"><i className="fas fa-blog" /></div>
              <span>Blog & Event Management</span>
            </div>
            <div className="login-feature">
              <div className="login-feature__icon"><i className="fas fa-user-graduate" /></div>
              <span>Admissions Control Panel</span>
            </div>
            <div className="login-feature">
              <div className="login-feature__icon"><i className="fas fa-shield-alt" /></div>
              <span>Secure Role-Based Access</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="login-bg-circle login-bg-circle--1" />
        <div className="login-bg-circle login-bg-circle--2" />
      </div>

      {/* Right Panel — Form */}
      <div className="login-right">
        <div className="login-form-card">
          <div className="login-form-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to access the admin panel</p>
          </div>

          {error && (
            <div className="login-error">
              <i className="fas fa-exclamation-circle" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="username">Username</label>
              <div className="login-input-wrap">
                <i className="fas fa-user" />
                <input
                  id="username"
                  type="text"
                  value={form.username}
                  onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrap">
                <i className="fas fa-lock" />
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? (
                <><i className="fas fa-spinner fa-spin" /> Signing In...</>
              ) : (
                <><i className="fas fa-sign-in-alt" /> Sign In</>
              )}
            </button>
          </form>

          <div className="login-footer-note">
            <i className="fas fa-lock" />
            Restricted access — Authorised personnel only
          </div>
        </div>
      </div>
    </div>
  );
}

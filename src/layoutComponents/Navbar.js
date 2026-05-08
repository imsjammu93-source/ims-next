'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname() || '/';
  return (
   
    <>
       <div id="utility-bar" role="banner">
  <div className="container">
    <div className="utility-bar__inner">
      {/* Contact Info */}
      <div className="utility-bar__contact">
        <a href="tel:+917006489200" aria-label="Call us">
          <i className="fas fa-phone-alt" /> +91 70064 89200
        </a>
        <a href="mailto:imsjammu93@gmail.com" aria-label="Email us">
          <i className="fas fa-envelope" /> imsjammu93@gmail.com
        </a>
        <a href="#" aria-label="College location">
          <i className="fas fa-map-marker-alt" /> Akhnoor Road, Jammu
        </a>
      </div>
      {/* Right: Socials + Portal */}
      <div className="utility-bar__right">
        <div className="utility-socials">
          <a href="https://www.facebook.com/imscollegejammu" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" aria-label="Twitter/X">
            <i className="fab fa-x-twitter" />
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram" />
          </a>
          <a href="#" aria-label="YouTube">
            <i className="fab fa-youtube" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        {/* <Link href="/career" className="btn-portal" id="student-portal-btn">
          <i className="fas fa-user-graduate" /> Career
        </Link> */}
      </div>
    </div>
  </div>
</div>
<nav id="navbar" role="navigation" aria-label="Main Navigation">
  <div className="container">
    <div className="navbar__inner">
      {/* Logo */}
      <Link href="/" className="navbar__logo" aria-label="IMS Jammu Home">
        <div className="logo-emblem">
          <img src="assets/images/Logo-IMS.png" alt="IMS Jammu" />
        </div>
      </Link>
      {/* Desktop Nav */}
      <ul className="navbar__nav" role="list">
        <li className="nav-item">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <a href="#" className={`nav-link ${pathname.startsWith('/about') ? 'active' : ''}`}>
            About <i className="fas fa-chevron-down" />
          </a>
          <div className="mega-menu" role="menu">
            {/* Left Col: Featured Image & Intro */}
            <div className="mega-col mega-col--span-2">
              <div className="mega-featured-card">
                <img
                  src="/assets/images/campus.jpg"
                  alt="IMS Jammu Campus"
                  loading="lazy"
                />
                <div className="mega-featured-content">
                  <h4>About IMS Jammu</h4>
                  <p>
                    Established in 1997, Institute of Management Sciences (IMS) Jammu is a pioneer private institute dedicated to shaping future leaders through academic excellence and industry-focused education.
                  </p>
                  <Link href="/about-ims" className="btn btn-primary btn-sm" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>
                    Read More <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Col 1: Leadership */}
            <div className="mega-col">
              <div className="mega-col__title">Leadership</div>
              
              <Link href="/chairman-msg.ims" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-user-tie" />
                </div>
                <div className="mega-item__text">
                  <h4>Chairman's Message</h4>
                  <p>Visionary leadership from Er. Vidhi S. Singh</p>
                </div>
              </Link>

              <Link href="/director-msg.ims" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-chalkboard-teacher" />
                </div>
                <div className="mega-item__text">
                  <h4>Director's Message</h4>
                  <p>Message from Dr. Meenakshi Sharma</p>
                </div>
              </Link>
                <Link href="/overview-ims" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-trophy" />
                </div>
                <div className="mega-item__text">
                  <h4>Overview JGEI</h4>
                  <p>Overview of Jammu Global Education Initiatives</p>
                </div>
              </Link>
            </div>

            {/* Right Col 2: Info */}
            <div className="mega-col">
              <div className="mega-col__title">Organization</div>

              <Link href="/vision-ims" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-bullseye" />
                </div>
                <div className="mega-item__text">
                  <h4>Vision &amp; Mission</h4>
                  <p>Our core values and future goals</p>
                </div>
              </Link>

              <Link href="/why-ims" className="mega-item" style={{background: 'var(--clr-gold-pale)', borderRadius: 'var(--radius-sm)'}}>
                <div className="mega-item__icon" style={{background: 'var(--clr-gold)', color: 'var(--clr-white)'}}>
                  <i className="fas fa-star" />
                </div>
                <div className="mega-item__text">
                  <h4>Why Choose IMS?</h4>
                  <p>Explore our unique advantages</p>
                </div>
              </Link>

              <Link href="/history" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-history" />
                </div>
                <div className="mega-item__text">
                  <h4>Our History</h4>
                  <p>25+ years of academic excellence</p>
                </div>
              </Link>

              <Link href="/administration-ims" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-sitemap" />
                </div>
                <div className="mega-item__text">
                  <h4>Administration</h4>
                  <p>Meet the team behind IMS Jammu</p>
                </div>
              </Link>
            </div>
          </div>
        </li>
        {/* ACADEMICS — Mega Menu */}
        <li className="nav-item">
          <a href="#" className={`nav-link ${pathname.startsWith('/academics') ? 'active' : ''}`}>
            Academics <i className="fas fa-chevron-down" />
          </a>
          <div className="mega-menu" role="menu">
            {/* Col 1: MBA */}
            <div className="mega-col">
              <div className="mega-col__title">Programs Offered</div>
              <Link href="/master-of-business-administration" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-briefcase" />
                </div>
                <div className="mega-item__text">
                  <h4>Master of Business Administration</h4>
                  <p>2-year postgraduate management programme</p>
                </div>
              </Link>
               <Link href="/bachelor-of-business-administration" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-graduation-cap" />
                </div>
                <div className="mega-item__text">
                  <h4>Bachelor of Business Administration</h4>
                  <p>3-year undergraduate business degree</p>
                </div>
              </Link>
                <Link href="/bachelor-of-computer-application" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-laptop-code" />
                </div>
                <div className="mega-item__text">
                  <h4>Bachelor of Computer Applications</h4>
                  <p>3-year undergraduate IT &amp; software degree</p>
                </div>
              </Link>
            </div>
            {/* Col 2: BBA */}
            <div className="mega-col">
              <Link href="/why-ims" className="mega-col__title" style={{display: 'block', borderBottom: '2px solid var(--clr-gold-pale)', paddingBottom: '10px', marginBottom: '10px'}}>
                Why IMS <i className="fas fa-external-link-alt" style={{fontSize: '0.6rem', marginLeft: '5px'}} />
              </Link>
              <Link href="/training-placement-cell-message" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-chart-line" />
                </div>
                <div className="mega-item__text">
                  <h4>Training &amp; Placement Cell</h4>
                  <p>Career training & placement support</p>
                </div>
              </Link>
              <Link href="/our-leading-recruiters" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-handshake" />
                </div>
                <div className="mega-item__text">
                  <h4>Leading Recruiters</h4>
                  <p>Top companies hire our students</p>
                </div>
              </Link>
                   <Link href="/alumni-ims" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-network-wired" />
                </div>
                <div className="mega-item__text">
                  <h4>Alumni Network</h4>
                  <p>Strong network across industries</p>
                </div>
              </Link>
              <div style={{marginTop: '15px', padding: '10px'}}>
                <Link href="/why-ims" className="btn btn-primary btn-sm" style={{width: '100%', fontSize: '0.7rem', padding: '10px'}}>
                  <i className="fas fa-star" /> Discover the IMS Edge
                </Link>
              </div>
            </div>
            {/* Col 3: BCA */}
            <div className="mega-col">
              <div className="mega-col__title">More</div>
              <Link href="/conference" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-calendar" />
                </div>
                <div className="mega-item__text">
                  <h4>Conferences</h4>
                  <p>Our Conferences and events</p>
                </div>
              </Link>
              <Link href="/faculty-ims" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-chalkboard-teacher" />
                </div>
                <div className="mega-item__text">
                  <h4>Faculty</h4>
                  <p>Faculty to handle various activities</p>
                </div>
              </Link>
                <Link href="/ims-in-news" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-newspaper" />
                </div>
                <div className="mega-item__text">
                  <h4>IMS in News</h4>
                  <p>News and updates about IMS</p>
                </div>
              </Link>
              {/* <Link href="/facilities" className="mega-item">
                <div className="mega-item__icon">
                  <i className="fas fa-book-open" />
                </div>
                <div className="mega-item__text">
                  <h4>Libraries &amp; Labs</h4>
                  <p>Library & Computer facility</p>
                </div>
              </Link> */}
            </div>
            {/* Col 4: Quick Links */}
            <div className="mega-col mega-col--links">
              <div className="mega-col__title">Quick Links</div>
              <ul>
                 <li>
                  <Link href="/admissions">Admissions</Link>
                </li>
                <li>
                  <Link href="/coming-soon">Downloads</Link>
                </li>
                <li>
                  <Link href="/coming-soon">Notices</Link>
                </li>
                <li>
                  <Link href="/coming-soon">Question Papers</Link>
                </li>
                {/* <li>
                  <a href="#">Exam Timetable</a>
                </li>
                <li>
                  <a href="#">Results &amp; Marksheets</a>
                </li>
                <li>
                  <a href="#">Prospectus Download</a>
                </li> */}
              </ul>
            </div>
          </div>
          {/* /mega-menu */}
        </li>
        {/* <li className="nav-item">
          <a href="#" className="nav-link">
            Facilities <i className="fas fa-chevron-down" />
          </a>
          <div className="dropdown-menu">
            <a href="#">
              <i className="fas fa-laptop-code" /> Computer Centre
            </a>
            <a href="#">
              <i className="fas fa-wifi" /> 24-Hr Internet
            </a>
            <a href="#">
              <i className="fas fa-book" /> Central Library
            </a>
            <a href="#">
              <i className="fas fa-chalkboard" /> Lecture Halls (AV)
            </a>
            <a href="#">
              <i className="fas fa-snowflake" /> AC Conference Hall
            </a>
            <a href="#">
              <i className="fas fa-table-tennis" /> Indoor Games
            </a>
          </div>
        </li> */}
        <li className="nav-item">
          <Link href="/blogs" className={`nav-link ${pathname === '/blogs' ? 'active' : ''}`}>
            Blogs
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/campus-life-ims" className={`nav-link ${pathname === '/gallery' ? 'active' : ''}`}>
            Campus Life
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/news-events" className={`nav-link ${pathname === '/news-events' ? 'active' : ''}`}>
            News &amp; Events
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/admissions" className={`nav-link ${pathname === '/admissions' ? 'active' : ''}`}>
            Admissions
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>
            Contact
          </Link>
        </li>
      </ul>
      {/* /navbar__nav */}
      {/* CTA */}
      <div className="navbar__actions">
        <Link href="/apply-now" className="btn btn-primary" id="apply-now-btn">
          <i className="fas fa-file-alt" /> Apply Now
        </Link>
      </div>
      {/* Hamburger */}
      <button
        className="hamburger"
        id="hamburger"
        aria-label="Open menu"
        aria-expanded="false"
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  </div>
</nav>

<div id="sidebar-overlay" className="sidebar-overlay" aria-hidden="true" />
<aside id="mobile-sidebar" aria-label="Mobile Navigation" role="dialog">
  <div className="sidebar-header">
    <div className="navbar__logo">
      <div className="logo-emblem">IMS</div>
      <div className="logo-text">
        <div className="logo-text__name">IMS Jammu</div>
        <div className="logo-text__tagline">Akhnoor Road, Jammu</div>
      </div>
    </div>
    <button
      className="sidebar-close"
      id="sidebar-close"
      aria-label="Close menu"
    >
      <i className="fas fa-times" />
    </button>
  </div>
  <nav className="sidebar-nav" role="navigation">
    <Link href="/">
      <i className="fas fa-home" /> Home
    </Link>
    <Link href="/why-ims">
      <i className="fas fa-star" /> Why Choose Us
    </Link>
    <Link href="/chairman-msg.ims">
      <i className="fas fa-user-tie" /> Chairman's Message
    </Link>
    <Link href="/director-msg.ims">
      <i className="fas fa-chalkboard-teacher" /> Director's Message
    </Link>
    <Link href="/gallery">
      <i className="fas fa-images" /> Gallery
    </Link>
    <Link href="/news-events">
      <i className="fas fa-newspaper" /> News &amp; Events
    </Link>
    <Link href="/contact">
      <i className="fas fa-map-marker-alt" /> Contact
    </Link>
    <Link
      href="/apply-now"
      style={{
        marginTop: 12,
        background: "var(--grad-gold)",
        color: "var(--clr-navy-dark)",
        borderRadius: 8
      }}
    >
      <i className="fas fa-file-alt" /> Apply Now
    </Link>
  </nav>
</aside>


    </>
  )
}
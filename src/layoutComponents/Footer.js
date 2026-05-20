'use client';
import { useState, useEffect } from 'react';
import { contactInfo } from '@/config/contactInfo'

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
    <footer id="footer" aria-label="Site Footer">
  <div className="footer-main">
    <div className="container">
      <div className="footer-grid">
        {/* Col 1: Brand */}
        <div className="footer-brand" data-aos="fade-up">
          <div className="navbar__logo" style={{ marginBottom: 20 }}>
            <img src="/assets/images/Logo-IMS.png" alt="IMS Jammu" style={{height: '60px'}} />
          </div>
          <p>
            A pioneer private college established in 1997, located at
            {contactInfo.address}. Offering MBA, BBA
            &amp; BCA under the Jamwal Group of Educational Institutions.
          </p>
          <ul className="footer-contact-list">
            <li>
              <a href={`tel:${contactInfo.phoneRaw}`}>
                <i className="fas fa-phone-alt" /> {contactInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contactInfo.email}`}>
                <i className="fas fa-envelope" /> {contactInfo.email}
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-map-marker-alt" /> {contactInfo.address}
              </a>
            </li>
          </ul>
        </div>
        {/* Col 2: Quick Links */}
        <div data-aos="fade-up" data-aos-delay={80}>
          <div className="footer-title">Quick Links</div>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/overview-ims">About IMS</a>
            </li>
            <li>
              <a href="/master-of-business-administration">MBA Programme</a>
            </li>
            <li>
              <a href="/bachelor-of-business-administration">BBA Programme</a>
            </li>
            <li>
              <a href="/bachelor-of-computer-application">BCA Programme</a>
            </li>
            <li>
              <a href="/faculty-ims">Faculty Members</a>
            </li>
            <li>
              <a href="/admissions">Admissions 2026</a>
            </li>
            <li>
              <a href="/why-ims">The IMS Advantage</a>
            </li>
          </ul>
        </div>
        <div data-aos="fade-up" data-aos-delay={140}>
          <div className="footer-title">Student Life</div>
          <ul className="footer-links">
            <li>
              <a href="/campus-life-ims">Campus Life</a>
            </li>
            <li>
              <a href="/faculty-ims">Our Faculty</a>
            </li>
            <li>
              <a href="/conference">Conferences</a>
            </li>
            <li>
              <a href="/alumni-ims">Alumni Network</a>
            </li>
            <li>
              <a href="/our-leading-recruiters">Our Recruiters</a>
            </li>
            <li>
              <a href="/admissions">Admissions 2026</a>
            </li>
          </ul>
        </div>
        {/* Col 4: Map */}
        <div data-aos="fade-up" data-aos-delay={200}>
          <div className="footer-title">Find Us</div>
          <div className="footer-map">
            <iframe 
              src={contactInfo.mapEmbedUrl}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="IMS Jammu Location Map"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /footer-main */}
  {/* Footer Bottom */}
  <div className="footer-bottom">
    <div className="container">
      <div className="footer-bottom__inner">
        <p className="footer-copy">
          © 2026 <a href="#">Institute of Management Sciences (IMS) Jammu</a>.
          All rights reserved. Designed &amp; Developed by{' '}
          <a
            href="https://www.ghatiwebsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--clr-gold)', fontWeight: '600' }}
          >
            Ghati Web Solutions
          </a>
          .
        </p>
        <div className="footer-socials">
          <a href={contactInfo.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f" />
          </a>
          <a href={contactInfo.socials.twitter} aria-label="Twitter/X">
            <i className="fab fa-x-twitter" />
          </a>
          <a href={contactInfo.socials.instagram} aria-label="Instagram">
            <i className="fab fa-instagram" />
          </a>
       
          <a href={contactInfo.socials.youtube} aria-label="YouTube">
            <i className="fab fa-youtube" />
          </a>
          <a href={contactInfo.socials.linkedin} aria-label="LinkedIn">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>


<button 
  id="back-to-top" 
  className={isVisible ? 'visible' : ''} 
  onClick={scrollToTop} 
  aria-label="Back to top"
>
  <i className="fas fa-chevron-up" />
</button>
    </>
  )
}

export default Footer
import React from 'react'

function Footer() {
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
            GurhaBrahamana (Patoli), Akhnoor Road, Jammu. Offering MBA, BBA
            &amp; BCA under the Jamwal Group of Educational Institutions.
          </p>
          <ul className="footer-contact-list">
            <li>
              <a href="tel:+917006489200">
                <i className="fas fa-phone-alt" /> +91 70064 89200
              </a>
            </li>
            <li>
              <a href="mailto:imsjammu93@gmail.com">
                <i className="fas fa-envelope" /> imsjammu93@gmail.com
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-map-marker-alt" /> GurhaBrahamana (Patoli),
                Akhnoor Road, Jammu
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
              <a href="/admissions">Admissions 2025</a>
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
              <a href="/admissions">Admissions 2025</a>
            </li>
          </ul>
        </div>
        {/* Col 4: Map */}
        <div data-aos="fade-up" data-aos-delay={200}>
          <div className="footer-title">Find Us</div>
          <div className="footer-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.516739365175!2d74.79381577566278!3d32.77855527366306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e8608e000b313%3A0x98de0438c993bca1!2sInstitute%20of%20Management%20Sciences%20(IMS)%2C%20Jammu!5e0!3m2!1sen!2sin!4v1778155226915!5m2!1sen!2sin" 
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
          © 2025 <a href="#">Institute of Management Sciences (IMS) Jammu</a>.
          All rights reserved. Crafted with ❤️ for excellence in management
          education. JGEI, Jammu.
        </p>
        <div className="footer-socials">
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
      </div>
    </div>
  </div>
</footer>


<button id="back-to-top" aria-label="Back to top">
  <i className="fas fa-chevron-up" />
</button>
    </>
  )
}

export default Footer
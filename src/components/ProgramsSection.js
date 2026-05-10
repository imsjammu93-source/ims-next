'use client';
import React from 'react';
import Link from 'next/link';
import { assetsInfo } from '@/config/assetsInfo';
function ProgramsSection() {
  const programs = [
    {
      id: "01",
      title: "MBA",
      fullName: "Master of Business Administration",
      desc: "Approved by AICTE and MHRD, Govt. of India. Affiliated with Jammu University. A 2-year postgraduate programme for future strategic business leaders.",
      features: ["AICTE Approved", "Management Quota", "60 Seats"],
      image: assetsInfo.mbaPageHeaderImg,
      link: "/master-of-business-administration",
      delay: 50
    },
    {
      id: "02",
      title: "BBA",
      fullName: "Bachelor of Business Administration",
      desc: "A 3-year professional degree programme affiliated with the University of Jammu, focusing on developing competent and socially sensitive global leaders.",
      features: ["Global Recognition", "Practical Training", "Seminars"],
      image: assetsInfo.bbaPageHeaderImg,
      link: "/bachelor-of-business-administration",
      delay: 120
    },
    {
      id: "03",
      title: "BCA",
      fullName: "Bachelor of Computer Applications",
      desc: "A 3-year technical programme recognised by J&K Govt. and affiliated with the University of Jammu, preparing graduates for the global IT industry.",
      features: ["24-Hr Internet", "Software Dev", "Modern Labs"],
      image: assetsInfo.bcaPageHeaderImg,
      link: "/bachelor-of-computer-application",
      delay: 200
    }
  ];

  return (
    <section id="our-wings" className="section" aria-labelledby="wings-title">
      <div className="container">
        <div className="text-center" data-aos="fade-up">
          <div className="section-label">Academic Structure</div>
          <h2 className="section-title" id="wings-title">
            Our Three <span>Degree Programmes</span>
          </h2>
          <p className="section-desc">
            IMS Jammu offers professionally recognised undergraduate and
            postgraduate programmes affiliated with the University of Jammu, 
            designed to equip students with global business and technology skills.
          </p>
        </div>
        <div className="wings-grid">
          {programs.map((prog, idx) => (
            <Link 
              key={idx} 
              href={prog.link} 
              className="wing-card" 
              data-aos="fade-up" 
              data-aos-delay={prog.delay}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="wing-card__img"
                style={{ backgroundImage: `url("${prog.image}")` }}
              />
              <div className="wing-card__overlay" />
              <div className="wing-card__content">
                <span className="wing-card__tag">Programme {prog.id}</span>
                <h3 className="wing-card__title">{prog.title}</h3>
                <div className="wing-card__grade">{prog.fullName}</div>
                <p className="wing-card__desc">{prog.desc}</p>
                <div className="wing-card__features">
                  {prog.features.map((feat, fIdx) => (
                    <span key={fIdx} className="wing-feature-tag">{feat}</span>
                  ))}
                </div>
                <div className="wing-card__cta" style={{ marginTop: '15px', color: 'var(--clr-gold)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Learn More <i className="fas fa-arrow-right" style={{ marginLeft: '5px', fontSize: '0.75rem' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramsSection;
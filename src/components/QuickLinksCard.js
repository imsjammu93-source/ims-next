import React from 'react';
import Link from 'next/link';
import '@/assets/css/quick-links.css';

const QuickLinksCard = () => {
  return (
    <div className="quick-links-card">
      {/* Group 1: Various Programs */}
      <div className="ql-group">
        <h4 className="ql-title"><i className="fas fa-graduation-cap" /> Various Programs</h4>
        <div className="ql-list">
          <Link href="/bachelor-of-computer-application" className="ql-link">
            <i className="fas fa-chevron-right" /> Bachelor of Computer Application
          </Link>
          <Link href="/bachelor-of-business-administration" className="ql-link">
            <i className="fas fa-chevron-right" /> Bachelor of Business Administration
          </Link>
          <Link href="/master-of-business-administration" className="ql-link">
            <i className="fas fa-chevron-right" /> Master of Business Administration
          </Link>
        </div>
      </div>

      {/* Group 2: Institution Links */}
      <div className="ql-group">
        <h4 className="ql-title"><i className="fas fa-university" /> Essential Links</h4>
        <div className="ql-list">
          <Link href="/overview-ims" className="ql-link">
            <i className="fas fa-chevron-right" /> Overview JGEI
          </Link>
          <Link href="/administration-ims" className="ql-link">
            <i className="fas fa-chevron-right" /> Administration
          </Link>
          <Link href="/about-ims" className="ql-link">
            <i className="fas fa-chevron-right" /> About IMS
          </Link>
          <Link href="/why-ims" className="ql-link">
            <i className="fas fa-chevron-right" /> Why IMS
          </Link>
        </div>
      </div>

      {/* Group 3: Training & Placement */}
      <div className="ql-group">
        <h4 className="ql-title"><i className="fas fa-briefcase" /> Placement Department</h4>
        <div className="ql-list">
          <Link href="/training-placement-cell-message" className="ql-link">
            <i className="fas fa-chevron-right" /> Training & Placement Cell
          </Link>
          <Link href="/our-leading-recruiters" className="ql-link">
            <i className="fas fa-chevron-right" /> Leading Recruiters
          </Link>
          <Link href="/alumni-ims" className="ql-link">
            <i className="fas fa-chevron-right" /> Alumni
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickLinksCard;

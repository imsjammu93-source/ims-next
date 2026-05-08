'use client';
import React from 'react';
import Link from 'next/link';

const PageHeader = ({
  title = "Page Title",
  subtitle = "",
  bgImage = "/assets/images/slider1.jpg", 
  breadcrumbs = [],
}) => {
  return (
    <div className="page-header-wrapper">
      <section className="page-header" aria-label="Page header">
        {/* Background Image Layer with Parallax Attachment */}
        {bgImage && (
          <div
            className="page-header__bg"
            style={{ backgroundImage: `url("${bgImage}")` }}
            aria-hidden="true"
          />
        )}

        {/* Sophisticated Dark/Navy Gradient Overlay */}
        <div className="page-header__overlay" aria-hidden="true" />

        {/* Premium Aurora Glow Effect */}
        <div className="page-header__shape page-header__shape--aurora" aria-hidden="true" />
        <div className="page-header__shape page-header__shape--dots" aria-hidden="true" />

        {/* Content */}
        <div className="container">
          <div className="page-header__inner">
            <h1
              className="page-header__title"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {subtitle && (
              <p className="page-header__subtitle">{subtitle}</p>
            )}
          </div>
        </div>
      </section>

      {/* Breadcrumbs - Positioned outside to break out of the clip-path and overlap */}
      {breadcrumbs.length > 0 && (
        <div className="page-header__breadcrumb-wrapper">
          <div className="container">
            <nav className="page-header__breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link href="/" className="page-header__breadcrumb-link">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <li className="page-header__breadcrumb-sep" aria-hidden="true">
                      <i className="fas fa-chevron-right"></i>
                    </li>
                    <li>
                      {index < breadcrumbs.length - 1 ? (
                        <Link href={item.link} className="page-header__breadcrumb-link">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="page-header__breadcrumb-current" aria-current="page">
                          {item.label}
                        </span>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
